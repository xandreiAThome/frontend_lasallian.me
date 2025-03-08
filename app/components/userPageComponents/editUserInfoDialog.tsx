import { Ellipsis, Images, Linkedin, Instagram, Facebook } from "lucide-react";
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
import { useState } from "react";

export default function EditUserInfoDialog(props: authorInterface) {
  const { vanity, info, meta, _id } = props;
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="ml-auto text-gray-500" asChild>
          <button>
            <Ellipsis />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="w-full"
            onClick={() => setOpenDialog("edit")}
          >
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem
            className="w-full text-red-500"
            onClick={() => setOpenDialog("delete")}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog
        open={openDialog === "edit"}
        onOpenChange={(open) => {
          if (!open) setOpenDialog(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="h-full w-full bg-custom-postcard-white flex flex-col">
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
                      defaultValue={info.username}
                    />
                    <Input
                      placeholder="Bio"
                      className="bg-slate-100"
                      defaultValue={info.bio}
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
                    defaultValue={info.name.first}
                  ></Input>
                  <Input
                    className="bg-slate-100 "
                    placeholder="Last Name *"
                    defaultValue={info.name.last}
                  ></Input>
                </div>
              </div>

              <div className="flex gap-2 px-12 items-center">
                <Select defaultValue={info.batchid}>
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
                  value={info.program}
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
                    ></Input>
                    <Facebook className="absolute top-0 bottom-0 m-auto left-1 text-gray-500" />
                  </div>

                  <div className="flex relative">
                    <Input
                      className="bg-slate-100 max-w-80 pl-9"
                      placeholder="@juandelacruz..."
                      defaultValue={info.links.instagram}
                    ></Input>
                    <Instagram className="absolute top-0 bottom-0 m-auto left-1 text-gray-500" />
                  </div>

                  <div className="flex relative">
                    <Input
                      className="bg-slate-100 max-w-80 pl-9"
                      placeholder="https://linkedin.com/in/..."
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
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
