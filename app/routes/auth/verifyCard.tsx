import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Form } from "react-router";

export default function VerifyCard() {
  return (
    <Form
      method="post"
      className="bg-custom-postcard-white w-3/5 p-8 shadow-lg rounded-md"
    >
      <Input
        className="bg-slate-50 mb-6 mt-6"
        type="email"
        placeholder="Email Address"
      ></Input>
      <p className="mb-6">
        We will send you a <span className="font-bold">verification email</span>
        . You can setup your account details after verifying.
      </p>

      <hr className="-mx-8" />
      <div className="flex flex-col justify-center">
        <Button
          variant="link"
          className="font-semibold mt-4 text-slate-500 text-base align-middle"
        >
          Already have an Account?
        </Button>
        <Button
          className="text-white w-full rounded-3xl mt-4 bg-lasalle-green text-lg h-12"
          type="submit"
        >
          Create Account
        </Button>
      </div>
    </Form>
  );
}
