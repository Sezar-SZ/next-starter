"use server";

import { hash } from "argon2";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { PostgresError } from "postgres";

import { lucia } from "~/auth";
import db from "~/db";
import { users } from "~/db/schema";
import { insertUserSchema } from "~/db/schema/users";

export interface UserRegisterError {
  id?: string[] | undefined;
  email?: string[] | undefined;
  passwordHash?: string[] | undefined;
  password?: string[] | undefined;
}

interface ActionResult {
  error: UserRegisterError;
}

export async function register(
  _: any,
  formData: FormData,
): Promise<ActionResult> {
  const email = formData.get("email");
  const password = formData.get("password");

  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return {
      error: { password: ["Invalid password"] },
    };
  }

  const passwordHash = await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    parallelism: 1,
  });

  const userId = generateIdFromEntropySize(10);

  const user = insertUserSchema.safeParse({
    id: userId,
    email,
    passwordHash,
  });

  if (!user.success) {
    return {
      error: user.error.flatten().fieldErrors,
    };
  }

  try {
    await db.insert(users).values({
      id: userId,
      email: email as string,
      passwordHash,
      role: "user",
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  } catch (error) {
    console.log(error);

    if (error && Object.hasOwn(error, "code")) {
      const dbError = error as PostgresError;

      switch (dbError.code) {
        case "23505":
          console.log("welp");

          return {
            error: { email: ["account with this email already exists"] },
          };

        default:
          return {
            error: { id: ["Internal server error"] },
          };
      }
    }
  }

  return redirect("/");
}
