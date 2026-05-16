import { onCLS, onFCP, onLCP, onTTFB, onINP, Metric } from 'web-vitals';

// Report to console (development only)
const sendToConsole = (metric: Metric) => {
    console.log(`[Web Vitals] ${metric.name}: ${metric.value} (${metric.rating})`);
};

// Report to an analytics endpoint (e.g., /api/vitals)
const sendToAnalytics = async (metric: Metric) => {
    try {
        await fetch('/api/vitals', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: metric.name,
                value: metric.value,
                rating: metric.rating,
                delta: metric.delta,
                id: metric.id,
                navigationType: metric.navigationType,
            }),
        });
    } catch (err) {
        console.warn('Failed to send web vitals', err);
    }
};

// Report to Sentry (if already integrated)
const sendToSentry = (metric: Metric) => {
    if (window.Sentry) {
        window.Sentry.addBreadcrumb({
            category: 'web-vitals',
            message: `${metric.name}: ${metric.value} (${metric.rating})`,
            level: metric.rating === 'poor' ? 'warning' : 'info',
        });
    }
};

// Choose reporter based on environment
const reporter = (metric: Metric) => {
    if (import.meta.env.DEV) {
        sendToConsole(metric);
    }
    if (import.meta.env.PROD) {
        sendToAnalytics(metric);
        // sendToSentry(metric);
    }
};

// Initialize all web vitals
export const reportWebVitals = () => {
    onCLS(reporter);
    onFCP(reporter);
    onLCP(reporter);
    onTTFB(reporter);
    onINP(reporter); // Interaction to Next Paint (Chrome 108+)
};
