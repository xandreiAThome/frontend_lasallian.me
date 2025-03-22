import { Ellipsis, Facebook, Instagram, Linkedin } from "lucide-react";
import { Form, redirect, useFetcher } from "react-router";
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
import api from "~/lib/api";
import axios from "axios";

export async function action({ request }: Route.ActionArgs) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  console.log("Token from URL:", token);
  const formData = await request.formData();

  // let profileImgLink = "";
  // let coverImgLink = "";
  // const profilePic = formData.get("profilepic");
  // const coverPic = formData.get("coverpic");
  // const profileImgFormData = new FormData();
  // if (profilePic) {
  //   profileImgFormData.append("image", profilePic);

  //   const imgResp = await api.post(
  //     `${process.env.OSS_KEY}upload`,
  //     profileImgFormData,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "multipart/form-data",
  //       },
  //     }
  //   );
  //   console.log("OSS resp: ", imgResp);
  //   profileImgLink = imgResp.data.image;
  // }

  // const coverImgFormData = new FormData();
  // if (coverPic) {
  //   coverImgFormData.append("image", coverPic);

  //   const imgResp = await api.post(
  //     `${process.env.OSS_KEY}upload`,
  //     coverImgFormData,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "multipart/form-data",
  //       },
  //     }
  //   );
  //   console.log("OSS resp: ", imgResp);
  //   coverImgLink = imgResp.data.image;
  // }

  const reqBody = {
    info: {
      name: {
        first: formData.get("first"),
        last: formData.get("last"),
      },
      username: formData.get("username"),
      batchid: formData.get("batchId"),
      program: formData.get("program"),
      bio: formData.get("bio"),
    },
    // vanity: { display_photo: profileImgLink, cover_photo: coverImgLink },
  };

  try {
    // Send to your API endpoint
    const response = await api.post(
      `${process.env.API_KEY}/user/setup`,
      reqBody,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("API response:", response.data);

    // let profileImgLink = "";
    // let coverImgLink = "";
    // const profilePic = formData.get("profilepic");
    // const coverPic = formData.get("coverpic");
    // const profileImgFormData = new FormData();
    // if (profilePic) {
    //   profileImgFormData.append("image", profilePic);

    //   const imgResp = await api.post(
    //     `${process.env.OSS_KEY}upload`,
    //     profileImgFormData,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }
    //   );
    //   console.log("OSS resp: ", imgResp);
    //   profileImgLink = imgResp.data.image;
    // }

    // const coverImgFormData = new FormData();
    // if (coverPic) {
    //   coverImgFormData.append("image", coverPic);

    //   const imgResp = await api.post(
    //     `${process.env.OSS_KEY}upload`,
    //     coverImgFormData,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }
    //   );
    //   console.log("OSS resp: ", imgResp);
    //   coverImgLink = imgResp.data.image;
    // }

    // const vanity: { display_photo?: string; cover_photo?: string } = {};
    // if (profileImgLink) {
    //   vanity.display_photo = profileImgLink;
    // }
    // if (coverImgLink) {
    //   vanity.cover_photo = coverImgLink;
    // }

    // const response2 = await api.put(
    //   `${process.env.API_KEY}/user`,
    //   { reqBody, vanity },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    // console.log("API response:", response.data);

    return redirect("/");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(" error:", error);
    } else {
      console.log("Unexpected error:", error);
    }
  }
}

export async function loader({ request }: Route.ActionArgs) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  if (!token) {
    redirect("/");
  }
}

// TODO: setup the input names and values
//       Make page responsive

export default function AccountSetup() {
  const fetcher = useFetcher();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);

    // Submit the formatted data
    fetcher.submit(formData, {
      method: "post",
      encType: "multipart/form-data",
    });
  };

  return (
    <div className="flex h-full bg-custom-bg-white justify-around">
      <div className="max-w-96 flex-col items-baseline justify-between hidden md:flex p-6">
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

      <main className="basis-[640px] flex items-center justify-center py-6">
        <Form
          onSubmit={handleSubmit}
          className="w-full h-fit bg-custom-postcard-white flex flex-col items-center justify-center rounded-2xl shadow-md"
        >
          <div className="pb-6">
            <div className="relative flex p-12">
              <div className="flex flex-col flex-1">
                <div className="flex justify-between">
                  <p className="text-custom-text-black font-semibold">
                    Basic Account Information
                  </p>

                  <button type="button">
                    <Ellipsis
                      className="text-custom-text-black"
                      size={24}
                    ></Ellipsis>
                  </button>
                </div>

                <div className="flex flex-col gap-2 flex-1 max-w-80">
                  <Input
                    placeholder="@username"
                    className="bg-slate-100"
                    name="username"
                    required
                  />
                  <Input
                    name="bio"
                    placeholder="Bio"
                    className="bg-slate-100"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col px-12 pb-2">
              <p className="text-custom-text-black">
                About <span className="font-bold">YOU!</span> Ipakita mo kung
                sino ka.
              </p>
              <div className="max-w-80 flex gap-2 flex-col">
                <Input
                  className="bg-slate-100 "
                  placeholder="First Name *"
                  name="first"
                  required
                ></Input>
                <Input
                  className="bg-slate-100 "
                  placeholder="Last Name *"
                  name="last"
                  required
                ></Input>
              </div>
            </div>

            <div className="flex gap-2 px-12 items-center">
              <Select name="batchId" required>
                <SelectTrigger className="w-20">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Id Number</SelectLabel>
                    <SelectItem value="120">120</SelectItem>
                    <SelectItem value="121">121</SelectItem>
                    <SelectItem value="122">122</SelectItem>
                    <SelectItem value="123">123</SelectItem>
                    <SelectItem value="124">124</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Input
                className="max-w-80 bg-slate-100"
                placeholder="Degree Program"
                name="program"
                required
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
                    className="bg-slate-100 max-w-80 pl-9"
                    placeholder="https://facebook.com/..."
                    name="facebook"
                  ></Input>
                  <Facebook className="absolute top-0 bottom-0 m-auto left-1 text-gray-500" />
                </div>

                <div className="flex relative">
                  <Input
                    className="bg-slate-100 max-w-80 pl-9"
                    placeholder="@juandelacruz..."
                    name="instagram"
                  ></Input>
                  <Instagram className="absolute top-0 bottom-0 m-auto left-1 text-gray-500" />
                </div>

                <div className="flex relative">
                  <Input
                    className="bg-slate-100 max-w-80 pl-9"
                    placeholder="https://linkedin.com/in/..."
                    name="linkedln"
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
                  required
                  name="policy"
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
                  required
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

      <div className="max-w-96 hidden lg:flex justify-center flex-col p-6">
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
