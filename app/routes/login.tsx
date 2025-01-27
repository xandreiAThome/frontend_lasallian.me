import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

export default function Login() {
  return (
    <div className="h-full flex justify-center items-center bg-custom-bg-white">
      <div className="flex-1 flex flex-col items-center">
        <div>
          <h1 className="text-lasalle-dark-green text-7xl">
            lasallian<span className="font-bold">.me</span>
          </h1>
          <p>
            <span className="text-lasalle-dark-green font-bold text-xl">
              YOUR{" "}
            </span>
            <span className="text-lasalle-green text-xl">
              Lasallian experience
            </span>
          </p>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center">
        <div className="bg-custom-postcard-white w-3/5 p-8 shadow-lg rounded-md">
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
          <Button className="text-white w-full rounded-3xl mt-6 bg-lasalle-green text-lg h-12">
            Create Account
          </Button>
        </div>
        <p className="text-slate-400 mt-6">
          lasallian<span className="font-bold">.me.</span> All Rights Reserved,
          2025.
        </p>
      </div>
    </div>
  );
}
