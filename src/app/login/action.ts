"use server";

import { verify } from "argon2";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import { lucia } from "~/auth";
import db from "~/db";

const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export async function login(_: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password") as string;
  const next = formData.get("next") as string;

  const parsedData = loginSchema.safeParse({ email, password });

  if (!parsedData.success) {
    return {
      error: "Incorrect email or password",
    };
  }

  const existingUser = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email as string),
  });

  if (!existingUser) {
    return {
      error: "Incorrect email or password",
    };
  }

  const validPassword = await verify(existingUser.password_hash, password);

  if (!validPassword) {
    return {
      error: "Incorrect email or password",
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect(next);
}
