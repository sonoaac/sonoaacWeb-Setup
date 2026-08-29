import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

let pool: pg.Pool | null = null;
let db: any = null;

if (process.env.DATABASE_URL) {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  // A dropped/unreachable connection emits 'error' on the pool; if unhandled it
  // crashes the process. Log and keep serving — DB-backed routes degrade to stubs.
  pool.on("error", (err) => {
    console.error("Postgres pool error (continuing without DB):", err.message);
  });
  db = drizzle(pool, { schema });
} else {
  console.warn("DATABASE_URL not set. Running without a database.");
  // Mock db — storage layer returns stub data when db is null
  db = null;
}

export { pool, db };
