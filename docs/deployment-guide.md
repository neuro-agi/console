# Deployment Guide: Neuro Integration

This guide provides instructions for deploying the SaaS console with the Neuro integration.

## 1. Environment Variables

The following environment variables are crucial for the Neuro integration. Ensure they are configured correctly in your deployment environment (e.g., Vercel, Kubernetes, Docker).

*   `AUTH_SECRET`: Your NextAuth.js secret.
*   `POSTGRES_URL`: Connection string for your PostgreSQL database.
*   `NEURO_API_BASE_URL`: The base URL for the external Neuro API (e.g., `http://localhost:8080/v1`). This is used by the backend proxy.
*   `NEURO_API_KEY`: Your API key for authenticating with the Neuro API. **Keep this secure and do not expose it to the frontend.**
*   `NEXT_PUBLIC_NEURO_API_BASE_URL`: The public-facing base URL for the Neuro API proxy within your application (e.g., `/api/neuro`). This is used by the frontend to make requests.
*   `NEXT_PUBLIC_ENABLE_NEURO_FEATURES`: A feature flag to enable or disable the new Neuro-integrated UI components. Set to `true` to enable, `false` to disable.

## 2. Database Migrations

The Neuro integration introduces new database tables (`reasoning_events` and `evaluations`). You must run database migrations after deploying the new code.

### For Local Development:

1.  Generate migrations:
    ```bash
    npm drizzle-kit generate
    ```
2.  Run migrations:
    ```bash
    npm tsx lib/db/migrate.ts
    ```

### For Production Deployment:

Integrate the migration step into your CI/CD pipeline. For Vercel deployments, you might run this as a build step or a separate deployment hook.

## 3. Feature Flag Management

The `NEXT_PUBLIC_ENABLE_NEURO_FEATURES` environment variable acts as a feature flag for the Neuro integration.

*   **Staged Rollout:** Initially, you might deploy with `NEXT_PUBLIC_ENABLE_NEURO_FEATURES=false` to ensure the core application remains stable. Once confident, you can switch it to `true` to enable the new features for users.
*   **Rollback:** If issues arise with the new features, setting `NEXT_PUBLIC_ENABLE_NEURO_FEATURES=false` and redeploying will revert the UI to its previous state without the Neuro components.

## 4. Message Bus and Consumers (Conceptual)

For a production environment, it is recommended to set up a message bus (e.g., Kafka, AWS Kinesis, Google Cloud Pub/Sub) and dedicated consumers for logging, monitoring, and evaluation processing.

*   **Real-time Consumer:** For aggregating metrics for the monitoring dashboard.
*   **Archive Consumer:** For storing raw event data in object storage (e.g., AWS S3) for long-term retention and auditing.

These consumers would typically be deployed as separate services and configured to consume messages from the message bus that the Next.js application publishes to.

## 5. Deployment Steps (General)

1.  **Build the Application:** Ensure your CI/CD pipeline builds the Next.js application.
2.  **Run Database Migrations:** Execute the Drizzle migrations against your production database.
3.  **Deploy to Platform:** Deploy the built application to your chosen platform (e.g., Vercel, Kubernetes).
4.  **Configure Environment Variables:** Set all required environment variables in your deployment platform.
5.  **Monitor:** Closely monitor the application after deployment for any errors or unexpected behavior.
