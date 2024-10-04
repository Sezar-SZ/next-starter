import { redirect } from "next/navigation";

import { validateRequest } from "~/auth";

export default async function Page() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login?next=/dashboard");
  }

  return <div>Hello, {user.email}</div>;
}
