export default function Form({
  action,
  children,
}: Readonly<{
  action: (payload: FormData) => void;

  children: React.ReactNode;
}>) {
  return (
    <form action={action} className="flex w-72 flex-col items-center gap-6">
      {children}
    </form>
  );
}
