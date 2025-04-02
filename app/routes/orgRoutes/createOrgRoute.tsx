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
import type { Route } from "./+types/createOrgRoute";
import api from "~/lib/api";
import axios from "axios";
import { useState } from "react";
import UploadCoverDialog from "~/components/imageComponents/uploadCoverDialog";
import type { ImageListType } from "react-images-uploading";
import UploadProfileDialog from "~/components/imageComponents/uploadProfileDialog";
import { Textarea } from "~/components/ui/textarea";

export async function action({ request }: Route.ActionArgs) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  console.log("Token from URL:", token);
  const formData = await request.formData();

  let profileImgLink = "";
  let coverImgLink = "";
  const profilePic = formData.get("profilepic");
  const coverPic = formData.get("coverpic");
  const profileImgFormData = new FormData();
  if (profilePic) {
    profileImgFormData.append("image", profilePic);

    const imgResp = await api.post(
      `${process.env.OSS_KEY}upload`,
      profileImgFormData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("OSS resp: ", imgResp);
    profileImgLink = imgResp.data.image;
  }

  const coverImgFormData = new FormData();
  if (coverPic) {
    coverImgFormData.append("image", coverPic);

    const imgResp = await api.post(
      `${process.env.OSS_KEY}upload`,
      coverImgFormData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("OSS resp: ", imgResp);
    coverImgLink = imgResp.data.image;
  }

  const reqBody = {
    info: {
      name: formData.get("orgname"),
      acronym: formData.get("acronym"),
      bio: formData.get("bio"),
      office: formData.get("office"),
      college: formData.get("college"),
    },
    vanity: { display_photo: profileImgLink, cover_photo: coverImgLink },
  };

  try {
    // Send to your API endpoint
    const response = await api.post(`${process.env.API_KEY}/org`, reqBody, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("API response:", response.data);
    return redirect("/orgs");
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

export default function CreateOrg() {
  const fetcher = useFetcher();
  const [username, setUsername] = useState("");
  const [coverImg, setCoverImg] = useState<ImageListType>([]);
  const [profileImg, setProfileImg] = useState<ImageListType>([]);

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
    <main className="basis-[640px] flex items-center justify-center py-6">
      <Form
        onSubmit={handleSubmit}
        className="w-full h-fit bg-custom-postcard-white flex flex-col items-center justify-center rounded-2xl shadow-md"
      >
        <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
          <UploadCoverDialog
            setImages={setCoverImg}
            images={coverImg}
            defaultImage={null}
          />
        </div>

        <div className="pb-6 w-full">
          <div className="relative flex p-6">
            <UploadProfileDialog
              images={profileImg}
              setImages={setProfileImg}
              defaultImage={null}
            />

            <div className="pl-36 flex flex-col flex-1">
              <div className="flex justify-between">
                <p className="text-custom-text-black font-semibold">
                  Basic Organization Information
                </p>

                <button type="button">
                  <Ellipsis
                    className="text-custom-text-black"
                    size={24}
                  ></Ellipsis>
                </button>
              </div>

              <div className="flex flex-col gap-2 flex-1 max-w-96">
                <Input
                  placeholder="Full organization name"
                  className="bg-slate-100"
                  name="orgname"
                  required
                />
                <Input
                  name="acronym"
                  placeholder="Acronym (ex: LSCS, JEMA)"
                  className="bg-slate-100"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col px-12 pb-2">
            <p className="text-custom-text-black">Bio</p>
            <div className="flex gap-2 flex-col">
              <Textarea
                className="bg-slate-100"
                cols={20}
                rows={4}
                placeholder="short description of your org"
                name="bio"
              ></Textarea>
            </div>
          </div>

          <div className="flex gap-2 px-12 items-center">
            <div>
              <label htmlFor="office">Office</label>
              <Select name="office">
                <SelectTrigger className="w-96">
                  <SelectValue placeholder="Select an Office" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Office</SelectLabel>
                    <SelectItem value="120">
                      Council of Student Organization
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="college">College</label>
              <Select name="college">
                <SelectTrigger className="w-20">
                  <SelectValue placeholder="Select a College" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>College</SelectLabel>
                    <SelectItem value="CCS">CCS</SelectItem>
                    <SelectItem value="CLA">CLA</SelectItem>
                    <SelectItem value="COS">COS</SelectItem>
                    <SelectItem value="BAGCED">BAGCED</SelectItem>
                    <SelectItem value="GCOE">GCOE</SelectItem>
                    <SelectItem value="SOE">SOE</SelectItem>
                    <SelectItem value="COB">COB</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
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
            <p>
              Note that the creation of organizations will require{" "}
              <span className="text-lasalle-green font-bold">approval</span> and
              checking of validity. Please contact{" "}
              <span className="text-lasalle-green font-bold">
                moderation@lasallian.me
              </span>{" "}
              after creating to streamline validation.
            </p>
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
            <Button
              type="submit"
              className="bg-lasalle-green rounded-2xl text-base py-5 px-16 w-full"
            >
              Create Organization
            </Button>
          </div>
        </div>
      </Form>
    </main>
  );
}
