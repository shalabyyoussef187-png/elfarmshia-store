import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n/config";
import App from "./App.jsx";
import { loadCatalog } from "./services/api/products";

// Take over scroll restoration before the first render (the browser would restore too early).
if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";

// Start downloading the catalog at once so the home categories are ready sooner.
loadCatalog().catch(() => {});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
