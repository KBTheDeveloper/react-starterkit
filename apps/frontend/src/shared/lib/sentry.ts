import { useEffect } from "react";

import * as Sentry from "@sentry/react";
import { reactRouterV7BrowserTracingIntegration as BrowserIntegration } from "@sentry/react";
import {
  createBrowserRouter,
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from "react-router-dom";

import isDevelopment from "./utils";

export default () => {
  if (isDevelopment()) return;

  if (!import.meta.env.VITE_SENTRY_DSN) {
    // eslint-disable-next-line no-console
    console.warn("Sentry DSN missing – skipping init");
    return;
  }

  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.MODE,
    integrations: [
      new BrowserIntegration({
        createBrowserRouter,
        createRoutesFromChildren,
        matchRoutes,
        useLocation,
        useNavigationType,
        useEffect,
      }),
    ],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
};
