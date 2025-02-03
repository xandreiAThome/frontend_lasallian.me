import Logo from "~/components/assets/logo.svg";
import { Outlet } from "react-router";

// TEMP

export default function Login() {
  return (
    <div className="h-full flex items-center bg-custom-bg-white md:flex-row flex-col">
      <div className="md:flex-1 flex flex-col items-center justify-center basis-96">
        <img src={Logo} alt="logo" />
      </div>
      <div className="md:flex-1 flex flex-col items-center basis-[40rem]">
        <Outlet />
        <p className="text-slate-400 mt-6">
          lasallian<span className="font-bold">.me.</span> All Rights Reserved,
          2025.
        </p>
      </div>
    </div>
  );
}
