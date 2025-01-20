# Operator Runbook: Neuro Integration

This document provides guidance for operators on managing the Neuro integration within the SaaS console.

## 1. Adding New Metrics to Monitoring

To add new metrics to the monitoring dashboard, follow these steps:

1.  **Identify the Metric Source:** Determine where the new metric originates (e.g., Neuro API response, internal calculation, message bus event).
2.  **Update Backend API (if necessary):** If the metric needs to be aggregated or processed on the backend, update the relevant API route (e.g., `/api/neuro/monitor/events`) or create a new one to expose the metric.
3.  **Update Drizzle Schema (if necessary):** If the new metric needs to be persisted, update the `lib/db/schema.ts` file to include the new field in `reasoningEvents` or `evaluations` tables, and run Drizzle migrations.
4.  **Update Real-time Consumer (Conceptual):** If using a message bus, ensure the real-time consumer is updated to extract and aggregate the new metric into your time-series database (e.g., Prometheus, InfluxDB).
5.  **Update Frontend Components:**
    *   Modify `lib/data/neuro.ts` to fetch the new metric.
    *   Update `components/groups/monitor/columns.tsx` to display the new metric in the data table.
    *   Create or update relevant chart components in `app/monitor/page.tsx` to visualize the new metric.

## 2. Managing Alerts

Alerts are configured in your chosen alerting system (e.g., Prometheus Alertmanager, PagerDuty).

### 2.1. Alert Rules

Refer to the alerting system's documentation for how to define and modify alert rules. The following are examples of alert rules for the Neuro integration:

*   **Latency Alert:** `p95(neuro_reasoning_latency_ms) > 2 * baseline_p95(neuro_reasoning_latency_ms) for 10 minutes`
*   **Faithfulness Alert:** `average(neuro_evaluation_faithfulness_score) < 0.7 for 100 events`
*   **Cost Spike Alert:** `sum(neuro_reasoning_cost) > 5 * baseline_sum(neuro_reasoning_cost) for 10 minutes`

### 2.2. Silencing Alerts

To temporarily disable an alert (e.g., during maintenance), use the silencing mechanism provided by your alerting system.

### 2.3. Adding New Alert Actions

To add new actions (e.g., sending notifications to a new Slack channel, creating a ticket in a different issue tracker) when an alert fires, configure the alerting system's notification channels and routing rules.

## 3. Rotating API Keys

To rotate the `NEURO_API_KEY`:

1.  **Generate New Key:** Obtain a new API key from your Neuro API provider.
2.  **Update Environment Variables:**
    *   **Local Development:** Update the `NEURO_API_KEY` in your local `.env.local` file.
    *   **Deployment Environment:** Update the `NEURO_API_KEY` environment variable in your deployment platform (e.g., Vercel, Kubernetes secrets, AWS Secrets Manager).
3.  **Restart Services:** Restart all services that use the `NEURO_API_KEY` to ensure they pick up the new key. This typically includes the Next.js application and any backend workers.

## 4. Feature Flag Management

The Neuro integration uses a feature flag (`NEXT_PUBLIC_ENABLE_NEURO_FEATURES`) for staged rollouts.

*   **Enable/Disable:** Set `NEXT_PUBLIC_ENABLE_NEURO_FEATURES=true` to enable the new Neuro features, or `false` to disable them.
*   **Deployment:** Update this environment variable in your deployment platform and redeploy the application to apply the change.
