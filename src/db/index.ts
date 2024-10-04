import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema/index";
import { env } from "~/env";

export const client = postgres(env.DATABASE_URL, {
  max: env.DB_MIGRATING ? 1 : undefined,
});
const db = drizzle(client, {
  schema,
});
export default db;
