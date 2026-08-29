// Database is intentionally disabled.
//
// The app runs fully DB-less: `server/storage.ts` returns stub data whenever
// `db` is null, so PC-parts, quotes, and tickets are non-persistent. This keeps
// deploys independent of any Postgres / storage integration. To re-enable,
// restore a Pool here from `process.env.DATABASE_URL` and run `npm run db:push`.

const pool: any = null;
const db: any = null;

export { pool, db };
