"use client";
import { useFormState } from "react-dom";

import Form from "../../components/auth/form";
import { SubmitButton } from "../../components/auth/submit-button";
import { register, type UserRegisterError } from "./action";

const initialState = {
  error: {} as UserRegisterError,
};

export default function Page() {
  const [state, formAction] = useFormState(register, initialState);

  return (
    <div className="mx-auto mt-14 flex max-w-screen-md flex-col items-center justify-center border py-24">
      <form
        action={formAction}
        className="flex w-72 flex-col items-center gap-6"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="email">email</label>
          <input required name="email" id="email" className="border" />
          {state.error.email && <p>{state.error.email}</p>}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            required
            type="text"
            name="password"
            id="password"
            className="border"
          />
          {state.error.password && <p>{state.error.password}</p>}
        </div>
        <SubmitButton
          label="Register"
          className="border bg-gray-50 px-6 py-1 disabled:border-black disabled:bg-gray-300"
        />
      </form>
    </div>
  );
}
