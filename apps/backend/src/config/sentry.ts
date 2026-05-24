import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

export const initSentry = () => {
  if (!process.env.SENTRY_DSN) {
    console.warn("Sentry DSN not provided – skipping initialization");
    return;
  }

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || "development",
    integrations: [nodeProfilingIntegration()],
    tracesSampleRate: 1.0, // adjust in production
    profilesSampleRate: 1.0,
  });
};

export default Sentry;
