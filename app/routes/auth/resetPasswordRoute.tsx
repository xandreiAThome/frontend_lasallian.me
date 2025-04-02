import axios from 'axios';
import { useEffect, useState } from 'react';
import { data, useFetcher, useLoaderData, useNavigate, useParams } from 'react-router';
import { Button } from '~/components/ui/button';
import { Input } from "~/components/ui/input";
import api from "~/lib/api";
import type { Route } from '../+types/accountSetupRoute';


export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const token = formData.get("resetPasswordId");
    const pass = formData.get("password");
    const confirmPass = formData.get("confirm-password");
  
    const errors: {
      password?: string;
      passRed?: string;
      confirmRed?: string;
    } = {};
  
    const validPass =
      typeof pass === "string"
        ? pass.match(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          )
        : null;
    
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

    // Resetting password
    try {
      const response = await api.post(`${process.env.API_KEY}/resetpassword`, {
        token: token,
        password: pass
      });
  
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Password Reset Error",
          error.response?.data || error.message
        );
      } else {
        console.error("Unexpected error:", error);
      }
    }
}

export async function loader({ params }: Route.LoaderArgs) {
  try {
    const { resetPasswordId } = params;

    const response = await api.get(`${process.env.API_KEY}/resetpassword/${resetPasswordId}`)
    if (response.status !== 200) {
      console.log("invalid id reset pass");
      return response.data;
    } else {
      return response.data;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        error.response?.data
      );
      return {error: error.response?.data}
    } else {
      console.error("Unexpected error:", error);
    }
  } 
}


export default function ResetPassword() {
    const fetcher = useFetcher();
    const navigate = useNavigate();
    const loaderData = useLoaderData();
    const [validStatus, setValidStatus] = useState<boolean>(true);
    const { resetPasswordId } = useParams<{resetPasswordId: string}>();
    const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog visibility
    const errors = fetcher.data?.errors;

    // Function to open the dialog
    const openDialog = () => {
        setIsDialogOpen(true);
    };
    
    useEffect(() => {
      // Only set validStatus to false if there is an error and it hasn't been set before
      if (loaderData?.error && validStatus) {
        setValidStatus(false);  // Update state only once
      }
    }, [loaderData, validStatus]);
  
    useEffect(() => {
      // Redirect if validStatus is false
      if (validStatus === false) {
        navigate('/');
      }
    }, [validStatus, navigate]);
  
    if (validStatus === false) {
      // Optionally render a loading or error state until the redirect happens
      return <div>Redirecting...</div>;
    }

    return (
        <fetcher.Form
            method="post"
            className="bg-custom-postcard-white w-full md:w-3/5 p-8 shadow-lg rounded-md"
        >
            <div className="flex flex-col items-center">
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
            </div>
            <hr className="-mx-8" />
            <Button
            className="text-white w-full rounded-3xl mt-6 bg-lasalle-green text-lg h-12"
            type="submit"
            >
            Reset Password
            </Button>

            <Input type="hidden" name="resetPasswordId" value={resetPasswordId}/>
        </fetcher.Form>
    );
}