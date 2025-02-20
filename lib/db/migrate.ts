import { loadEnvConfig } from "@next/env";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

async function main() {
  const dev = process.env.NODE_ENV !== "production";
  loadEnvConfig("./", dev);

  const client = new Client({
    connectionString: process.env.POSTGRES_URL,
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();

  const db = drizzle(client);
  await migrate(db, { migrationsFolder: "lib/db/drizzle" });

  await client.end();
  console.log("✅ Migrations complete");
}

main().catch((err) => {
  console.error("❌ Migration failed", err);
  process.exit(1);
});
