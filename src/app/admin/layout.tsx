import { redirect } from "next/navigation";

import { validateRequest } from "~/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login?next=/admin");
  }
  if (user.role !== "admin") {
    return redirect("/");
  }

  return <>{children}</>;
}
