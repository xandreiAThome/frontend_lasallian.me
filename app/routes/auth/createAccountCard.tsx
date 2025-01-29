import { Input } from "~/components/ui/input";
import { Form, redirect, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";

export default function CreateAccountCard() {
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
        <Button
          variant="link"
          className="m-4 font-semibold text-lasalle-green text-base"
        >
          Forgot Password?
        </Button>
      </div>
      <hr className="-mx-8" />
      <Button
        className="text-white w-full rounded-3xl mt-6 bg-lasalle-green text-lg h-12"
        type="submit"
      >
        Create Account
      </Button>
    </Form>
  );
}
