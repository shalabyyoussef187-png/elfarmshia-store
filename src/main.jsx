import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n/config";
import App from "./App.jsx";
import { loadCatalog } from "./services/api/products";

// Start downloading the catalog at once so the home categories are ready sooner.
loadCatalog().catch(() => {});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
