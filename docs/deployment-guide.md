# Deployment Guide

This guide provides instructions for deploying the SaaS console.

## 1. Environment Variables

The following environment variables are crucial for the application. Ensure they are configured correctly in your deployment environment (e.g., Vercel, Kubernetes, Docker).

*   `AUTH_SECRET`: Your NextAuth.js secret.
*   `POSTGRES_URL`: Connection string for your PostgreSQL database.

## 2. Database Migrations

You must run database migrations after deploying the new code.

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

## 3. Deployment Steps (General)

1.  **Build the Application:** Ensure your CI/CD pipeline builds the Next.js application.
2.  **Run Database Migrations:** Execute the Drizzle migrations against your production database.
3.  **Deploy to Platform:** Deploy the built application to your chosen platform (e.g., Vercel, Kubernetes).
4.  **Configure Environment Variables:** Set all required environment variables in your deployment platform.
5.  **Monitor:** Closely monitor the application after deployment for any errors or unexpected behavior.