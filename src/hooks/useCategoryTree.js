import { useEffect, useState } from "react";
import { loadCatalog } from "../services/api/products";
import { buildTree, summarize } from "../utils/categoryTree";

const KEY = "catTree-v1";
let memo = null;

function readCache() {
  if (memo) return memo;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) memo = JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return memo;
}

// Returns { tree, products, ready }. The tree shows at once from the last visit,
// then refreshes when the catalog arrives.
export function useCategoryTree() {
  const [tree, setTree] = useState(() => readCache());
  const [products, setProducts] = useState(null);

  useEffect(() => {
    let off = false;
    loadCatalog()
      .then((all) => {
        if (off) return;
        const s = summarize(buildTree(all));
        memo = s;
        setTree(s);
        setProducts(all);
        try {
          localStorage.setItem(KEY, JSON.stringify(s));
        } catch {
          /* storage full: ignore */
        }
      })
      .catch(() => {});
    return () => {
      off = true;
    };
  }, []);

  return { tree, products, ready: !!products };
}
