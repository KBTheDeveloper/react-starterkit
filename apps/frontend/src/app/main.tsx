import React from "react";

import ReactDOM from "react-dom/client";

import "@shared/lib/i18n"; // 👈 import i18n
import "antd/dist/reset.css";
import "@shared/styles/tailwind.css";
import initSentry from "@shared/lib/sentry";
import reportWebVitals from "@shared/lib/webVitals";

import App from "../App";

initSentry();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
