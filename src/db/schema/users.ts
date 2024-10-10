import { date, pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const userRoles = pgEnum("role", ["admin", "user"]);

const users = pgTable("user", {
  id: text().primaryKey(),
  email: text().unique().notNull(),
  passwordHash: text().notNull(),
  role: userRoles().notNull().default("user"),
  created_at: date().defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;

export const insertUserSchema = createInsertSchema(users, {
  id: (schema) => schema.id,
  email: (schema) => schema.email.email({ message: "invalid email." }),
  passwordHash: (schema) => schema.passwordHash,
});

export default users;
