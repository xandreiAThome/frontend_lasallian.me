import { Ellipsis, Facebook, Images, Instagram, Linkedin } from "lucide-react";
import { Form, redirect } from "react-router";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import Logo from "~/components/assets/logo.svg";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import type { Route } from "./+types/accountSetupRoute";

export async function clientAction({ request }: Route.ClientActionArgs) {
  let formData = await request.formData();
  console.log(formData);
  return redirect("/homepage");
}

// TODO: setup the input names and values
//       Make page responsive

export default function AccountSetup() {
  return (
    <div className="flex h-full bg-custom-bg-white justify-around">
      <div className="basis-80 max-w-96 flex-col items-baseline justify-between hidden md:flex p-6">
        <img src={Logo} alt="logo" className="h-16" />
        <div>
          <h1 className="text-2xl text-lasalle-dark-green font-bold">
            setup your account!
          </h1>
          <p className="text-2xl text-lasalle-green">
            let other archers know who they're dealing with.
          </p>
        </div>
        <div>
          <h1 className="text-2xl text-lasalle-dark-green font-bold">
            invest in yourself!
          </h1>
          <p className="text-2xl text-lasalle-green">
            have an archive of the things you did during your time in
            univeristy!
          </p>
        </div>
      </div>

      <main className="flex justify-center py-6">
        <Form
          method="post"
          className="w-[640px] shrink-0 h-full bg-custom-postcard-white flex flex-col"
        >
          <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
            <button type="button" className="flex gap-1">
              <Images className="text-lasalle-green" />
              <p className="font-semibold text-lasalle-green">
                Add Cover Photo
              </p>
            </button>
          </div>
          <div className="pb-6">
            <div className="relative flex p-6">
              <div className="w-32 h-32 lg:w-36 lg:h-36 rounded-full bg-gray-300 m-4 border-custom-bg-white border-4 absolute left-0 -top-20 flex justify-center items-center">
                <button type="button" className="flex flex-col items-center">
                  <Images className="text-lasalle-green"></Images>
                  <p className="text-lasalle-green font-bold">
                    + Display Photo{" "}
                  </p>
                </button>
              </div>

              <div className="ml-auto w-[28rem]">
                <div className="flex justify-between">
                  <p className="text-custom-text-black">
                    Basic Account Information
                  </p>

                  <button type="button">
                    <Ellipsis
                      className="text-custom-text-black"
                      size={24}
                    ></Ellipsis>
                  </button>
                </div>

                <div className="flex flex-col gap-2 w-96">
                  <Input
                    placeholder="@username"
                    className="bg-slate-100"
                    name="username"
                  />
                  <Input placeholder="Bio" className="bg-slate-100" />
                </div>
              </div>
            </div>

            <div className="flex flex-col px-12 pb-2">
              <p className="text-custom-text-black">
                About <span className="font-bold">YOU!</span> Ipakita mo kung
                sino ka.
              </p>
              <div className="w-96 flex gap-2 flex-col">
                <Input
                  className="bg-slate-100 "
                  placeholder="First Name *"
                ></Input>
                <Input
                  className="bg-slate-100 "
                  placeholder="Last Name *"
                ></Input>
              </div>
            </div>

            <div className="flex gap-2 px-12 items-center">
              <Select>
                <SelectTrigger className="w-20">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Id Number</SelectLabel>
                    <SelectItem value="apple">120</SelectItem>
                    <SelectItem value="banana">121</SelectItem>
                    <SelectItem value="blueberry">122</SelectItem>
                    <SelectItem value="grapes">123</SelectItem>
                    <SelectItem value="pineapple">124</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Input
                className="w-96 bg-slate-100"
                placeholder="Degree Program"
              ></Input>
            </div>

            <div className="px-12 py-4">
              <p className="text-custom-text-black">
                <span className="font-bold">MORE</span>. Link other accounts to
                boost reach! (optional)
              </p>
              <div className="flex gap-2 flex-col">
                <div className="flex relative">
                  <Input
                    className="bg-slate-100 w-96 pl-9"
                    placeholder="https://facebook.com/..."
                  ></Input>
                  <Facebook className="absolute top-0 bottom-0 m-auto left-1 text-gray-500" />
                </div>

                <div className="flex relative">
                  <Input
                    className="bg-slate-100 w-96 pl-9"
                    placeholder="@juandelacruz..."
                  ></Input>
                  <Instagram className="absolute top-0 bottom-0 m-auto left-1 text-gray-500" />
                </div>

                <div className="flex relative">
                  <Input
                    className="bg-slate-100 w-96 pl-9"
                    placeholder="https://linkedin.com/in/..."
                  ></Input>
                  <Linkedin className="absolute top-0 bottom-0 m-auto left-1 text-gray-500" />
                </div>
              </div>
            </div>

            <div className="px-12 flex flex-col items-baseline gap-2">
              <Button
                type="submit"
                className="bg-lasalle-green rounded-2xl text-base py-5 px-16"
              >
                Complete Registratrion
              </Button>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="terms"
                  className="outline-lasalle-green"
                ></Checkbox>
                <label htmlFor="terms">
                  I agree to the Privacy Policy and the Terms of Use.
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="terms"
                  name="terms"
                  value="true"
                  className="outline-lasalle-green"
                ></Checkbox>
                <label htmlFor="terms">
                  I agree to receive email marketing from lasallian.me.
                </label>
              </div>
            </div>
          </div>
        </Form>
      </main>

      <div className="basis-80 max-w-96 hidden lg:flex justify-center flex-col p-6">
        <h1 className="text-lasalle-dark-green font-bold text-2xl">
          your data is safe with us!
        </h1>
        <p className="text-lasalle-green text-2xl">
          We wont save what you dont want us to save.
        </p>
      </div>
    </div>
  );
}
