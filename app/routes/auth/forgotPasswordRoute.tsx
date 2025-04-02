import axios from "axios";
import { useEffect, useState } from "react";
import { data, useFetcher, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import api from "~/lib/api";
import type { Route } from "./+types/RegisterRoute";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");

  const errors: {
    email?: string;
    emailRed?: string;
  } = {};

  const valid =
    typeof email === "string" ? email.match(/@dlsu\.edu\.ph$/) : null;

  if (!valid) {
    errors.email = "Invalid email address. Not a DLSU email";
    errors.emailRed = "bg-red-200";
  }

  if (Object.keys(errors).length > 0) {
    return data({ errors }, { status: 400 });
  }

  try {
    const response = await api.post(`${process.env.API_KEY}/resetpassword/create`, {
      email: email
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Password Reset Creation Error:",
        error.response?.data || error.message
      );
      return (error.response?.data)
    } else {
      console.error("Unexpected error:", error);
    }
  }
}

export default function ForgotPasswordRoute() {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const errors = fetcher.data?.errors
  const successMessage = fetcher.data?.message;
  const [ isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  
  useEffect(() => {
    if (fetcher.data?.errors === undefined && fetcher.data?.message) {
      setIsDialogOpen(true);
    }
  }, [fetcher.data]);

  return (
    <fetcher.Form
      method="post"
      className="bg-custom-postcard-white w-full md:w-3/5 p-8 shadow-lg rounded-md"
    >
      <div className="flex flex-col items-center">
        <p className="mb-4">Enter your email to receive a reset link.</p>
        <Input
          className={`bg-slate-50 mb-2 ${
            errors?.emailRed ? errors.emailRed : ""
          }`}
          type="email"
          name="email"
          placeholder="Email Address"
          required>
        </Input>
        {errors?.email ? (
          <em className="text-red-500 mt-1">{errors.email}</em>
        ) : null}
        <Button
          variant="link"
          className="m-4 font-semibold text-lasalle-green text-base"
          type="button"
          onClick={() => navigate("/")}>
          Already have an account?
        </Button>
      </div>
      <hr className="-mx-8" />
      <Button
        className="text-white w-full rounded-3xl mt-6 bg-lasalle-green text-lg h-12 self-center"
        type="submit">
        Send Reset Link
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {" "}
        <DialogTrigger className="flex justify-center w-full"></DialogTrigger>
        <DialogContent className="sm:max-w-[640px] overflow-y-auto max-h-screen justify-center">
          <DialogHeader>
            <DialogTitle>
              <h1 className="text-2xl">{successMessage? "Password reset link sent!" : "Something went wrong!"}</h1>
              <h4 className="text-base font-normal">
              {successMessage? "If your email is registered, you will be sent password reset instructions in your email": "An error occured"}
              </h4>
            </DialogTitle>
          </DialogHeader>{" "}
          <DialogFooter>
            <Button
              className="text-white w-full rounded-3xl mt-6 bg-lasalle-green text-lg h-12"
              onClick={() => setIsDialogOpen(false)}>
              OK!
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </fetcher.Form>
  );
}
