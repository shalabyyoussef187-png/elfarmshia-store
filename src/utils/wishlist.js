import { useSyncExternalStore } from "react";

// Wishlist saved on the device (no login). Stores a small snapshot per product.
const KEY = "pharma-wishlist";
const listeners = new Set();

// Real catalog ids are UUIDs. Items saved from the old demo products (ids like "1", "2") are dropped.
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const read = () => {
  try {
    const list = JSON.parse(localStorage.getItem(KEY) || "[]");
    const clean = list.filter((p) => UUID.test(String(p._id || p.id)));
    if (clean.length !== list.length) localStorage.setItem(KEY, JSON.stringify(clean));
    return clean;
  } catch {
    return [];
  }
};

let cache = read();
const emit = () => listeners.forEach((l) => l());
const subscribe = (cb) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};
const getSnapshot = () => cache;

const idOf = (p) => String(p._id || p.id);

export const toggleWishlist = (product) => {
  const id = idOf(product);
  if (cache.some((p) => idOf(p) === id)) {
    cache = cache.filter((p) => idOf(p) !== id);
  } else {
    const { name, price, image, originalPrice, discount, isAvailable, inStock, brand, description, descriptionAr } = product;
    cache = [
      ...cache,
      { id, name, price, image, originalPrice, discount, isAvailable, inStock, brand, description, descriptionAr },
    ];
  }
  localStorage.setItem(KEY, JSON.stringify(cache));
  emit();
};

export const useWishlist = () => {
  const items = useSyncExternalStore(subscribe, getSnapshot);
  return {
    items,
    count: items.length,
    has: (product) => items.some((p) => idOf(p) === idOf(product)),
  };
};
