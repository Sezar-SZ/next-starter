import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

import users from "./users";

const sessions = pgTable("session", {
  id: text().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export type Session = typeof sessions.$inferSelect;

export default sessions;
