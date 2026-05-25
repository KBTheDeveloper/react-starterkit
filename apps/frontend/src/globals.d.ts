import * as Sentry from "@sentry/react";

declare module "*.css";

interface Window {
  Sentry?: typeof Sentry;
}
