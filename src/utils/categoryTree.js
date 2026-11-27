// Builds the category tree from the product `category` values ("Parent - Child - Leaf").
const SEP = " - ";

export const pathToUrl = (path) => "/browse/" + path.map(encodeURIComponent).join("/");

function newNode(name, path) {
  return { name, path, count: 0, children: new Map(), direct: [], pics: [], brands: new Set() };
}

// Keep the tree small enough to cache: only what the tiles show.
export function buildTree(products) {
  const root = newNode("", []);
  for (const p of products) {
    if (!p.category) continue;
    const parts = String(p.category).split(SEP).map((s) => s.trim()).filter(Boolean);
    if (!parts.length) continue;
    const pic = p.imageThumbnailUrl || p.imageUrl || null;
    const brand = p.brand || "";
    const ok = p.isAvailable !== false && p.quantity !== 0;
    let node = root;
    node.count += 1;
    parts.forEach((name, i) => {
      let child = node.children.get(name);
      if (!child) {
        child = newNode(name, parts.slice(0, i + 1));
        node.children.set(name, child);
      }
      child.count += 1;
      if (pic && ok && child.pics.length < 4 && !child.brands.has(brand)) {
        child.pics.push(pic);
        child.brands.add(brand);
      }
      node = child;
    });
    node.direct.push(p);
  }
  return root;
}

// Plain, cacheable summary: { name, path, count, pics, children: [...] }
export function summarize(node) {
  return {
    name: node.name,
    path: node.path,
    count: node.count,
    pics: node.pics,
    children: [...node.children.values()]
      .sort((a, b) => b.count - a.count)
      .map(summarize),
  };
}

export function findNode(summary, path) {
  let node = summary;
  for (const name of path) {
    node = node?.children?.find((c) => c.name === name);
    if (!node) return null;
  }
  return node;
}
