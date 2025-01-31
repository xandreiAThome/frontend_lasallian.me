import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import CreateAccountCard from "./createAccountCard";
import VerifyCard from "./verifyCard";
import Logo from "~/components/assets/logo.svg";
import type { Route } from "./+types/loginRoute";
import { redirect } from "react-router";

// TEMP
export async function clientAction({ request }: Route.ClientActionArgs) {
  await console.log("go to setup");
  return redirect("/setup");
}

export default function Login() {
  return (
    <div className="h-full flex justify-center items-center bg-custom-bg-white md:flex-row flex-col">
      <div className="md:flex-1 flex flex-col items-center justify-center basis-96">
        <img src={Logo} alt="logo" />
      </div>
      <div className="md:flex-1 flex flex-col items-center basis-[40rem]">
        <CreateAccountCard />
        <p className="text-slate-400 mt-6">
          lasallian<span className="font-bold">.me.</span> All Rights Reserved,
          2025.
        </p>
      </div>
    </div>
  );
}
