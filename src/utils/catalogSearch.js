// Shared product matching, used by the header suggestions and the products page,
// so both always agree.

const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";
const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

export const norm = (t) =>
  String(t || "")
    .toLowerCase()
    .replace(/[٠-٩]/g, (d) => String(ARABIC_DIGITS.indexOf(d)))
    .replace(/[۰-۹]/g, (d) => String(PERSIAN_DIGITS.indexOf(d)))
    .replace(/[\u064B-\u065F\u0670\u0640]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .trim();

// How Arabic speakers write the vitamin letters (spelled-out letter -> letter).
const VITAMIN_LETTERS = {
  دي: "d",
  سي: "c",
  اي: "e",
  ايه: "a",
  كي: "k",
  بي: "b",
};

// "فيتامين دي 3" -> the exact vitamin, i.e. "vitamin d3" (whole letter, not any "d").
// Returns a RegExp, or null when the query is not a spelled-out vitamin letter.
function vitaminPattern(query) {
  const q = norm(query);
  // "فيتامين دي 3", "vitamin d3", "دي 3", "d3", "b12"
  let m = q.match(/^(?:فيتامين|vitamin)\s+(\S+?)\s*(\d{1,2})?$/);
  let letter = null;
  let num = null;
  if (m) {
    letter = VITAMIN_LETTERS[m[1]] || (/^[a-ek]$/.test(m[1]) ? m[1] : null);
    num = m[2];
  } else if ((m = q.match(/^(دي|سي|اي|ايه|كي|بي)\s*(\d{1,2})$/))) {
    letter = VITAMIN_LETTERS[m[1]];
    num = m[2];
  } else if ((m = q.match(/^([a-ek])\s*(\d{1,2})$/))) {
    letter = m[1];
    num = m[2];
  }
  if (!letter) return null;
  return new RegExp(`vitamin\\s*${letter}${num ? "\\s*" + num : ""}(?![a-z])`);
}

// In brand/category/description text a word must START with the typed token
// (short tokens must be a whole word), so "دي" does not match inside other words.
function inRest(rest, t) {
  const words = rest.split(/[^a-z0-9\u0600-\u06FF]+/);
  return t.length <= 2 ? words.includes(t) : words.some((w) => w.startsWith(t));
}

export function buildEntry(p) {
  return {
    id: p.id,
    name: p.name,
    price: p.price,
    img: p.imageThumbnailUrl || p.imageUrl || null,
    out: p.isAvailable === false || p.quantity === 0,
    n: norm(p.name),
    b: norm(p.brand),
    rest: norm([p.brand, p.category, (p.description || "").slice(0, 300)].join(" ")),
    c: norm(p.category),
  };
}

// ---- Sound-alike matching: Arabic and English spellings of the same name share one key ----
// "برفكتيل" and "Perfectil" both become "brfktl" (vowels dropped, similar consonants merged).
const AR_KEY = {
  ب: "b", ت: "t", ط: "t", ث: "s", س: "s", ص: "s", ز: "s", ظ: "s", ذ: "s",
  د: "d", ض: "d", ر: "r", ل: "l", م: "m", ن: "n", ف: "f",
  ك: "k", ق: "k", ج: "k", غ: "k", خ: "k", ش: "x",
};

export function phonKey(word) {
  let w = norm(word);
  if (!w) return "";
  if (/[\u0600-\u06FF]/.test(w)) w = w.replace(/^ال(?=.{3})/, "");
  w = w
    .replace(/sh|ch/g, "x")
    .replace(/kh|gh|ck|qu/g, "k")
    .replace(/ph/g, "f")
    .replace(/th/g, "t")
    .replace(/x/g, "x")
    .replace(/c(?=[eiy])/g, "s")
    .replace(/[cgjq]/g, "k")
    .replace(/v/g, "f")
    .replace(/p/g, "b")
    .replace(/z/g, "s");
  let out = "";
  for (const ch of w) {
    const m = AR_KEY[ch];
    if (m) out += m;
    else if (/[a-z]/.test(ch)) out += ch;
    else if (/[0-9]/.test(ch)) out += ch;
  }
  out = out.replace(/[aeiouywh]/g, "").replace(/(.)\1+/g, "$1");
  return out;
}

const wordsOf = (t) => String(t || "").split(/[^a-z0-9\u0600-\u06FF]+/).filter(Boolean);

// Phonetic keys of the name words (and brand) of an entry, computed once per entry.
function keysOf(p) {
  if (!p.pk) {
    p.pk = [...new Set([...wordsOf(p.n), ...wordsOf(p.b)].map(phonKey).filter((k) => k.length >= 2))];
  }
  return p.pk;
}

// Score how well a query token (as a key) matches a product: 0 = no match.
function keyScore(p, tk) {
  let best = 0;
  for (const k of keysOf(p)) {
    if (k === tk) best = Math.max(best, 4);
    else if (tk.length >= 3 && k.startsWith(tk)) best = Math.max(best, 3);
    else if (tk.length >= 4 && editDistance(tk, k) <= (tk.length >= 8 ? 2 : 1)) best = Math.max(best, 2);
    else if (tk.length >= 5 && editDistance(tk, k.slice(0, tk.length)) <= 1) best = Math.max(best, 2);
  }
  return best;
}

function phoneticSearch(index, tokens) {
  const tks = tokens.map(phonKey).filter((k) => k.length >= 2);
  if (!tks.length) return [];
  const hits = [];
  for (const p of index) {
    let total = 0;
    let ok = true;
    for (const tk of tks) {
      const sc = keyScore(p, tk);
      if (!sc) {
        ok = false;
        break;
      }
      total += sc;
    }
    if (ok) hits.push({ p, score: total * 2 + (p.out ? 0 : 1) });
  }
  hits.sort((x, y) => y.score - x.score);
  return hits.map((h) => h.p);
}

// Last resort: the closest names by sound, so the list is never empty for a real attempt.
function closest(index, tokens, limit) {
  const tks = tokens.map(phonKey).filter((k) => k.length >= 2);
  if (!tks.length) return [];
  const scored = [];
  for (const p of index) {
    let sum = 0;
    for (const tk of tks) {
      let d = Infinity;
      for (const k of keysOf(p)) d = Math.min(d, editDistance(tk, k.slice(0, Math.max(tk.length, 3))));
      sum += d / Math.max(tk.length, 3);
    }
    const r = sum / tks.length;
    if (r < 0.25) scored.push({ p, r });
  }
  scored.sort((x, y) => x.r - y.r);
  return scored.slice(0, limit).map((h) => h.p);
}

export function editDistance(a, b) {
  const m = a.length;
  const n = b.length;
  const d = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 1; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[m][n];
}

// A word that names a product type: items in that department rank first,
// items that only mention the word in their name/description rank low.
const CONCEPTS = [
  { words: ["فيتامين", "فيتامينات", "vitamin", "vitamins", "مكمل", "مكملات", "supplement", "supplements"], cat: /فيتامين|مكمل|vitamin|supplement|تغذيه/ },
  { words: ["بروتين", "protein", "كرياتين", "creatine"], cat: /تغذيه الرياضيه|رياض|sport/ },
];
function conceptFor(tokens) {
  return CONCEPTS.find((c) => tokens.some((t) => c.words.includes(t))) || null;
}

export function searchIndex(index, query, limit = 6) {
  const pat = vitaminPattern(query);
  if (pat) {
    const vit = index.filter((p) => pat.test(p.n) || pat.test(p.rest));
    if (vit.length) {
      vit.sort((x, y) => (pat.test(y.n) ? 2 : 0) + (y.out ? 0 : 1) - ((pat.test(x.n) ? 2 : 0) + (x.out ? 0 : 1)));
      return { items: vit.slice(0, limit), approx: false };
    }
  }
  const variants = [norm(query).split(/\s+/).filter(Boolean)].filter((t) => t.length);
  if (!variants.length) return { items: [], approx: false };
  const hits = [];
  for (const p of index) {
    let best = -Infinity;
    for (const tokens of variants) {
      if (!tokens.every((t) => p.n.includes(t) || inRest(p.rest, t))) continue;
      const inName = tokens.every((t) => p.n.includes(t));
      const starts = tokens.some((t) => p.n.split(/[\s-]+/).some((w) => w.startsWith(t)));
      let sc = (inName ? 4 : 0) + (starts ? 2 : 0) + (p.out ? 0 : 1);
      const concept = conceptFor(tokens);
      if (concept) sc += concept.cat.test(p.c || "") ? 20 : -10;
      best = Math.max(best, sc);
    }
    if (best !== -Infinity) hits.push({ p, score: best });
  }
  if (hits.length) {
    hits.sort((x, y) => y.score - x.score);
    return { items: hits.slice(0, limit).map((h) => h.p), approx: false };
  }
  // Typos: compare each word of the query with the words of each name.
  const tokens = variants[0];
  const near = [];
  for (const p of index) {
    const words = p.n.split(/[^a-z0-9\u0600-\u06FF]+/).filter(Boolean);
    const ok = tokens.every((t) => {
      const lim = t.length >= 7 ? 2 : t.length >= 4 ? 1 : 0;
      return words.some(
        (w) => editDistance(t, w) <= lim || (t.length >= 4 && editDistance(t, w.slice(0, t.length)) <= lim)
      );
    });
    if (ok) near.push(p);
  }
  // Sound-alike (Arabic spelling of an English name, spelling variants, typos).
  const seen = new Set(near.map((p) => p.id));
  const sound = phoneticSearch(index, tokens).filter((p) => !seen.has(p.id));
  const merged = [...sound, ...near];
  if (merged.length) return { items: merged.slice(0, limit), approx: true };
  // Nothing matches: offer the closest names instead of an empty list.
  const close = closest(index, tokens, limit);
  return { items: close, approx: close.length > 0 };
}
