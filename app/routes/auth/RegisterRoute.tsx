import { Input } from "~/components/ui/input";
import { data, Form, redirect, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { useFetcher } from "react-router";
import type { Route } from "./+types/RegisterRoute";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const pass = formData.get("password");
  const confirmPass = formData.get("confirm");

  const errors: { email?: string; password?: string } = {};

  const re = /@dlsu\.edu\.ph$/;
  const valid = typeof email === "string" ? email.match(re) : null;
  console.log(valid);
  if (!valid) {
    errors.email = "Invalid email address. Not a DLSU email";
  }

  if (pass !== confirmPass) {
    errors.password = "Password do not match";
  }

  if (Object.keys(errors).length > 0) {
    return data({ errors }, { status: 400 });
  }

  return redirect("/verify");
}

export default function RegisterRoute() {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  let errors = fetcher.data?.errors;
  return (
    <fetcher.Form
      method="post"
      className="bg-custom-postcard-white w-full md:w-3/5 p-8 shadow-lg rounded-md"
    >
      <div className="flex flex-col items-center">
        <Input
          className="bg-slate-50 mb-6"
          type="email"
          name="email"
          placeholder="Email Address"
          required
        ></Input>
        {errors?.email ? (
          <em className="text-red-500 -mt-4">{errors.email}</em>
        ) : null}
        <Input
          className="bg-slate-50 mb-4"
          type="password"
          name="password"
          placeholder="Password"
          required
        ></Input>
        <Input
          className="bg-slate-50"
          type="password"
          name="confirm-password"
          placeholder="Confirm Password"
          required
        ></Input>
        {errors?.password ? (
          <em className="text-red-500">{errors.password}</em>
        ) : null}
        <Button
          variant="link"
          className="m-4 font-semibold text-lasalle-green text-base"
          type="button"
          onClick={() => {
            navigate("/");
          }}
        >
          Already have an account?
        </Button>
      </div>
      <hr className="-mx-8" />
      <Button
        className="text-white w-full rounded-3xl mt-6 bg-lasalle-green text-lg h-12"
        type="submit"
      >
        Create Account
      </Button>
    </fetcher.Form>
  );
}
