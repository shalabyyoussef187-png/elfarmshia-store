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
  const m = norm(query).match(/^(?:فيتامين|vitamin)\s+(\S+?)\s*(\d{1,2})?$/);
  if (!m) return null;
  const letter = VITAMIN_LETTERS[m[1]] || (/^[a-e]$|^k$/.test(m[1]) ? m[1] : null);
  if (!letter) return null;
  return new RegExp(`vitamin\\s*${letter}${m[2] ? "\\s*" + m[2] : ""}(?![a-z])`);
}

export function buildEntry(p) {
  return {
    id: p.id,
    name: p.name,
    price: p.price,
    img: p.imageThumbnailUrl || p.imageUrl || null,
    out: p.isAvailable === false || p.quantity === 0,
    n: norm(p.name),
    rest: norm([p.brand, p.category, (p.description || "").slice(0, 300)].join(" ")),
  };
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
    let best = -1;
    for (const tokens of variants) {
      if (!tokens.every((t) => p.n.includes(t) || p.rest.includes(t))) continue;
      const inName = tokens.every((t) => p.n.includes(t));
      const starts = tokens.some((t) => p.n.split(/[\s-]+/).some((w) => w.startsWith(t)));
      best = Math.max(best, (inName ? 4 : 0) + (starts ? 2 : 0) + (p.out ? 0 : 1));
    }
    if (best >= 0) hits.push({ p, score: best });
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
  return { items: near.slice(0, limit), approx: near.length > 0 };
}
