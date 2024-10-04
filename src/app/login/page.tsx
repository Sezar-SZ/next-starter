"use client";
import { useSearchParams } from "next/navigation";
import { useFormState } from "react-dom";

import Form from "../../components/auth/form";
import { SubmitButton } from "../../components/auth/submit-button";
import { login } from "./action";

const initialState = {
  error: "",
};

export default function Page() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/";
  const [state, formAction] = useFormState(login, initialState);

  return (
    <div className="mx-auto mt-14 flex max-w-screen-md flex-col items-center justify-center border py-24">
      <form
        action={formAction}
        className="flex w-72 flex-col items-center gap-6"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="email">email</label>
          <input required name="email" id="email" className="border" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            required
            type="password"
            name="password"
            id="password"
            className="border"
          />
        </div>

        <input type="hidden" name="next" value={next} />

        <SubmitButton
          label="Login"
          className="border bg-gray-50 px-6 py-1 disabled:border-black disabled:bg-gray-600"
        />
        {state.error && <p>{state.error}</p>}
      </form>
    </div>
  );
}
