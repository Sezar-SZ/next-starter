import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { lucia, validateRequest } from "~/auth";

export default async function AuthButton() {
  const { user } = await validateRequest();

  return user ? (
    <form action={logout}>
      <button>logout</button>
    </form>
  ) : (
    <Link href="/login">login</Link>
  );
}

export async function logout() {
  "use server";
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/");
}
