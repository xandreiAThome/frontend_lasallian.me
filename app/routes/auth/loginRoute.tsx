import { Input } from "~/components/ui/input";
import { Form, redirect, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import type { Route } from "./+types/loginRoute";

export async function clientAction({ request }: Route.ClientActionArgs) {
  await console.log("go to setup");
  return redirect("/homepage");
}

export default function LoginRoute() {
  const navigate = useNavigate();
  return (
    <Form
      method="post"
      className="bg-custom-postcard-white w-full md:w-3/5 p-8 shadow-lg rounded-md"
    >
      <div className="flex flex-col items-center">
        <Input
          className="bg-slate-50 mb-6"
          type="email"
          placeholder="Email Address"
        ></Input>
        <Input
          className="bg-slate-50"
          type="password"
          placeholder="Password"
        ></Input>

        <div className="mt-4">
          <Button
            variant="link"
            className="font-semibold text-lasalle-green text-base"
            type="button"
          >
            Forgot Password?
          </Button>
          <Button
            variant="link"
            className="font-semibold text-lasalle-green text-base"
            type="button"
            onClick={() => {
              navigate("/register");
            }}
          >
            Don't have an account?
          </Button>
        </div>
      </div>
      <hr className="-mx-8" />
      <Button
        className="text-white w-full rounded-3xl mt-6 bg-lasalle-green text-lg h-12"
        type="submit"
      >
        Login
      </Button>
    </Form>
  );
}
