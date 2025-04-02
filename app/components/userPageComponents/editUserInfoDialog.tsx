import { Ellipsis, Linkedin, Instagram, Facebook } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import type { authorInterface } from "~/lib/interfaces";
import { useEffect, useState } from "react";
import { Form, useFetcher, useLoaderData, useLocation } from "react-router";
import UploadCoverDialog from "../imageComponents/uploadCoverDialog";
import type { ImageListType } from "react-images-uploading";
import UploadProfileDialog from "../imageComponents/uploadProfileDialog";

interface editUserInfoInterface {
  author: authorInterface;
  profilePic: string | null;
  coverPic: string | null;
}

export default function EditUserInfoDialog(props: editUserInfoInterface) {
  const { vanity, info, meta, _id } = props.author;
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const fetcher = useFetcher();
  const location = useLocation();
  const loaderData = useLoaderData();
  const [profileImg, setProfileImg] = useState<ImageListType>([]);
  const [coverImg, setCoverImg] = useState<ImageListType>([]);
  const [username, setUsername] = useState("");
  useEffect(() => setUsername(info.username), [info.username]);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    // Remove the "@" if the input is empty
    if (value === "@") {
      setUsername("");
      return;
    }

    // Ensure the username always starts with "@"
    if (!value.startsWith("@")) {
      setUsername("@" + value.replace("@", ""));
    } else {
      setUsername(value);
    }
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);

    // Append data to FormData
    // formData.append("content", formData.get("content") as string);
    const jsonData = {
      info: {
        username: formData.get("username"),
        bio: formData.get("bio"),
        name: {
          first: formData.get("first"),
          last: formData.get("last"),
        },

        batchid: formData.get("batchid"),
        program: formData.get("program"),
        links: {
          facebook: formData.get("facebook"),
          instagram: formData.get("instagram"),
          linkedin: formData.get("linkedln"),
        },
      },
      location: location,
    };

    formData.append("json", JSON.stringify(jsonData));

    const profilePic = profileImg[0]?.file;
    const coverPic = coverImg[0]?.file;
    if (profilePic) {
      formData.append("profilepic", profilePic);
    } else if (vanity.display_photo) {
      formData.append("profilepicURL", vanity.display_photo);
    }

    if (coverPic) {
      formData.append("coverpic", coverPic);
    } else if (vanity.cover_photo) {
      formData.append("coverpicURL", vanity.cover_photo);
    }

    setOpenDialog(null);

    // Submit the formatted data
    fetcher.submit(formData, {
      method: "post",
      action: "/editUserProfile",
      encType: "multipart/form-data",
    });
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="ml-auto text-gray-500" asChild>
          <button>
            <Ellipsis />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {loaderData.loggedInUserId === loaderData.user._id && (
            <DropdownMenuItem
              className="w-full"
              onClick={() => setOpenDialog("edit")}
            >
              Edit
            </DropdownMenuItem>
          )}

          {/* <DropdownMenuItem
            className="w-full text-red-500"
            onClick={() => setOpenDialog("delete")}
          >
            Delete
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog
        open={openDialog === "edit"}
        onOpenChange={(open) => {
          if (!open) setOpenDialog(null);
        }}
      >
        <DialogContent className="min-w-[640px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <Form
            className="h-full w-full bg-custom-postcard-white flex flex-col"
            onSubmit={handleSubmit}
          >
            <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
              <UploadCoverDialog
                setImages={setCoverImg}
                images={coverImg}
                defaultImage={props.coverPic}
              />
            </div>
            <div className="pb-6">
              <div className="relative flex p-6">
                <UploadProfileDialog
                  images={profileImg}
                  setImages={setProfileImg}
                  defaultImage={props.profilePic}
                />

                <div className="pl-36 flex flex-col flex-1">
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

                  <div className="flex flex-col gap-2 flex-1 max-w-80">
                    <Input
                      placeholder="@username"
                      className="bg-slate-100"
                      name="username"
                      autoComplete="off"
                      value={username}
                      defaultValue={info.username}
                      onChange={handleUsernameChange}
                      required
                    />
                    <Input
                      placeholder="Bio"
                      className="bg-slate-100"
                      defaultValue={info.bio}
                      autoComplete="off"
                      name="bio"
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
                    autoComplete="off"
                    defaultValue={info.name.first}
                    required
                  ></Input>
                  <Input
                    className="bg-slate-100 "
                    placeholder="Last Name *"
                    name="last"
                    autoComplete="off"
                    defaultValue={info.name.last}
                    required
                  ></Input>
                </div>
              </div>

              <div className="flex gap-2 px-12 items-center">
                <Select defaultValue={info.batchid} name="batchid" required>
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
                  defaultValue={info.program}
                  required
                ></Input>
              </div>

              <div className="px-12 py-4">
                <p className="text-custom-text-black">
                  <span className="font-bold">MORE</span>. Link other accounts
                  to boost reach! (optional)
                </p>
                <div className="flex gap-2 flex-col">
                  <div className="flex relative">
                    <Input
                      className="bg-slate-100 max-w-80 pl-9"
                      placeholder="https://facebook.com/..."
                      defaultValue={info.links.facebook}
                      name="facebook"
                      autoComplete="off"
                    ></Input>
                    <Facebook className="absolute top-0 bottom-0 m-auto left-1 text-gray-500" />
                  </div>

                  <div className="flex relative">
                    <Input
                      className="bg-slate-100 max-w-80 pl-9"
                      placeholder="@juandelacruz..."
                      name="instagram"
                      autoComplete="off"
                      defaultValue={info.links.instagram}
                    ></Input>
                    <Instagram className="absolute top-0 bottom-0 m-auto left-1 text-gray-500" />
                  </div>

                  <div className="flex relative">
                    <Input
                      className="bg-slate-100 max-w-80 pl-9"
                      placeholder="https://linkedin.com/in/..."
                      name="linkedln"
                      autoComplete="off"
                      defaultValue={info.links.linkedin}
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
                  Save
                </Button>
              </div>
            </div>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
