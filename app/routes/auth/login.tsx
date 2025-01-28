import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import CreateAccountCard from "./createAccountCard";
import VerifyCard from "./verifyCard";
import Logo from "~/components/ui/logo.svg";

export default function Login() {
  return (
    <div className="h-full flex justify-center items-center bg-custom-bg-white">
      <div className="flex-1 flex flex-col items-center">
        <img src={Logo} alt="logo" />
      </div>
      <div className="flex-1 flex flex-col items-center">
        <VerifyCard />
        <p className="text-slate-400 mt-6">
          lasallian<span className="font-bold">.me.</span> All Rights Reserved,
          2025.
        </p>
      </div>
    </div>
  );
}
