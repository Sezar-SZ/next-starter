"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} type="submit" className={className}>
      {label}
    </button>
  );
}
