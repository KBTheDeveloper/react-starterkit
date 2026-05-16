import * as Sentry from '@sentry/react';
import { reactRouterV6BrowserTracingIntegration } from '@sentry/react';
import { isDevelopment } from './utils';

export const initSentry = () => {
    if (isDevelopment()) return;

    if (!import.meta.env.VITE_SENTRY_DSN) {
        console.warn('Sentry DSN missing – skipping init');
        return;
    }

    Sentry.init({
        dsn: import.meta.env.VITE_SENTRY_DSN,
        environment: import.meta.env.MODE,
        integrations: [new reactRouterV6BrowserTracingIntegration()],
        tracesSampleRate: 1.0,
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,
    });
};
