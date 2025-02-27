import { Input } from "~/components/ui/input";
import { data, Form, redirect, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { useFetcher } from "react-router";
import type { Route } from "./+types/RegisterRoute";
import api from "~/lib/api";
import axios from "axios";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const pass = formData.get("password");
  const confirmPass = formData.get("confirm-password");

  const errors: {
    email?: string;
    password?: string;
    emailRed?: string;
    passRed?: string;
    confirmRed?: string;
    emailUsed?: string;
  } = {};

  const valid =
    typeof email === "string" ? email.match(/@dlsu\.edu\.ph$/) : null;

  const validPass =
    typeof pass === "string"
      ? pass.match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        )
      : null;

  if (!valid) {
    errors.email = "Invalid email address. Not a DLSU email";
    errors.emailRed = "bg-red-200";
  }

  if (!validPass) {
    errors.password =
      "Password must contain one uppercase, lowercase, number and special character";
    errors.passRed = "bg-red-200";
    return data({ errors }, { status: 400 });
  }

  if (pass !== confirmPass) {
    errors.password = "Password do not match";
    errors.confirmRed = "bg-red-200";
  }

  if (Object.keys(errors).length > 0) {
    return data({ errors }, { status: 400 });
  }

  if (Object.keys(errors).length > 0) {
    return data({ errors }, { status: 400 });
  }

  try {
    const response = await api.post(`${process.env.API_KEY}/user/register`, {
      credentials: {
        email: email,
        password: pass,
      },
    });

    console.log("Registration successful:", response.data);
    return redirect("/verify");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Registration error:",
        error.response?.data || error.message
      );
      if (error.response?.data.error === "Email already registered") {
        errors.emailUsed = "Email already used, try another email";
        return data({ errors }, { status: 400 });
      }
    } else {
      console.error("Unexpected error:", error);
    }
    // Handle error appropriately
    return { error: "Registration failed. Please try again." };
  }
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
          className={`bg-slate-50 mb-6 ${
            errors?.emailRed ? errors.emailRed : ""
          }`}
          type="email"
          name="email"
          placeholder="Email Address"
          required
        ></Input>
        {errors?.email ? (
          <em className="text-red-500 -mt-6">{errors.email}</em>
        ) : null}
        {errors?.emailUsed ? (
          <em className="text-red-500 -mt-6">{errors.emailUsed}</em>
        ) : null}
        <Input
          className={`bg-slate-50 mb-4 ${
            errors?.passRed ? errors.passRed : ""
          }`}
          type="password"
          name="password"
          placeholder="Password"
          required
        ></Input>
        <Input
          className={`bg-slate-50 ${
            errors?.confirmRed ? errors.confirmRed : ""
          }`}
          type="password"
          name="confirm-password"
          placeholder="Confirm Password"
          required
        ></Input>
        {errors?.password ? (
          <em className="text-red-500">{errors?.password}</em>
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
