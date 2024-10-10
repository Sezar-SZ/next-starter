import { drizzle } from "drizzle-orm/connect";

import { env } from "~/env";

import * as schema from "./schema/index";

const db = await drizzle("postgres-js", {
  schema,
  connection: { url: env.DATABASE_URL },
});

export default db;
