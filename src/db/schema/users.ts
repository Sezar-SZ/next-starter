import { date, pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const userRoles = pgEnum("role", ["admin", "user"]);

const users = pgTable("user", {
  id: text("id").primaryKey(),
  email: text("email").unique().notNull(),
  password_hash: text("password").notNull(),
  role: userRoles("role").notNull().default("user"),
  created_at: date("created_at").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;

export const insertUserSchema = createInsertSchema(users, {
  id: (schema) => schema.id,
  email: (schema) => schema.email.email({ message: "invalid email." }),
  password_hash: (schema) => schema.password_hash,
});

export default users;
