import { hash } from "argon2";
import { generateIdFromEntropySize } from "lucia";

import db from "~/db";
import { users } from "~/db/schema";
import { env } from "~/env";

async function seedAdminUser() {
  const adminEmail = env.ADMIN_EMAIL;
  const adminPassword = env.ADMIN_PASSWORD;

  const existingAdmin = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, adminEmail),
  });

  if (!existingAdmin) {
    const hashedPassword = await hash(adminPassword);
    await db
      .insert(users)
      .values({
        id: generateIdFromEntropySize(10),
        email: adminEmail,
        passwordHash: hashedPassword,
        role: "admin",
      })
      .execute();
  } else throw new Error("Admin already exists.");
}

await seedAdminUser();
console.log("done.");
process.exit();
