import { Input } from "~/components/ui/input";
import {
  data,
  redirect,
  useFetcher,
  useNavigate,
  useNavigation,
} from "react-router";
import { Button } from "~/components/ui/button";
import type { Route } from "./+types/loginRoute";
import axios from "axios";
import api from "~/lib/api";
import { createUserSession, getUserToken } from "~/.server/sessions";
import { Loader2 } from "lucide-react";

export async function loader({ request }: Route.LoaderArgs) {
  // Check if the user is already logged in
  const sessionToken = await getUserToken(request);
  if (sessionToken) {
    return redirect("/homepage");
  }
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const pass = formData.get("password");
  let sessionResponse: Response;
  const errorsUI: {
    accountNotExist?: string;
    password?: string;
  } = {};

  try {
    const response = await api.post(`${process.env.API_KEY}/user/login`, {
      credentials: {
        email: email,
        password: pass,
      },
    });

    // console.log("Login successful:", response.data);

    // create session
    try {
      sessionResponse = await createUserSession({
        request,
        userId: response.data.user._id,
        userToken: response.data.session_token,
        user: response.data.user,
        remember: true,
        redirectUrl: "/homepage",
      });

      if (!sessionResponse) {
        throw new Error("An error occurred while creating the session");
      }
    } catch (error) {
      if (error instanceof Error) {
        return { error: error.message };
      }

      return { error: "An unknown error occurred" };
    }

    return sessionResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Login error:", error.response?.data || error.message);
      if (error.response?.data.error === "Invalid password.") {
        errorsUI.password = "Incorrect Password";
      } else if (error.response?.data.error === "Account not found.") {
        errorsUI.accountNotExist = "Account doesnt exist";
      }

      return data({ errorsUI }, { status: 400 });
    } else {
      console.error("Unexpected error:", error);
    }
    // Handle error appropriately
    return { error: "Login failed. Please try again." };
  }
}

export default function LoginRoute() {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const navigation = useNavigation();
  let errors = fetcher.data?.errorsUI;
  return (
    <>
      <fetcher.Form
        method="post"
        className="bg-custom-postcard-white w-full md:w-3/5 p-8 shadow-lg rounded-md"
      >
        <div className="flex flex-col items-center">
          <Input
            className={`bg-slate-50 mb-6 ${
              errors?.accountNotExist ? "bg-red-200" : ""
            }`}
            type="email"
            name="email"
            placeholder="Email Address"
            required
          ></Input>
          {errors?.accountNotExist ? (
            <em className="text-red-500 -mt-6">{errors.accountNotExist}</em>
          ) : null}
          <Input
            className={`bg-slate-50 ${errors?.password ? "bg-red-200" : ""}`}
            type="password"
            name="password"
            placeholder="Password"
            required
          ></Input>

          {errors?.password ? (
            <em className="text-red-500">{errors.password}</em>
          ) : null}

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
          {navigation.state === "loading" && (
            <Loader2 className="animate-spin h-" />
          )}
          {navigation.state === "submitting" && (
            <Loader2 className="animate-spin h-" />
          )}
          Login
        </Button>
      </fetcher.Form>
    </>
  );
}
