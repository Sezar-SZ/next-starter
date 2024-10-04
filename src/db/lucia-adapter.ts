import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";

import db from ".";
import { users } from "./schema";
import sessions from "./schema/sessions";

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

export default adapter;
