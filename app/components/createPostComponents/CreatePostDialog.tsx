import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Terminal,
  Images,
  CalendarDays,
  ChevronDown,
  Upload,
} from "lucide-react";
import { use, useState } from "react";
import postData from "~/components/dummyData/postData";
import { UploadImage } from "./uploadImage";
import { Textarea } from "../ui/textarea";
import { Form, useFetcher, useLoaderData, useRevalidator } from "react-router";
import { DialogClose } from "@radix-ui/react-dialog";
import type { authorInterface } from "~/lib/interfaces";

interface positionsData {
  org: string;
  position: string;
  orgColor: string;
  positionColor: string;
}

interface CreatePostButtonProps {
  setOpen: (open: boolean) => void;
}

interface loaderDataInterface {
  id: string;
  user: authorInterface;
}

export default function CreatePostButton({ setOpen }: CreatePostButtonProps) {
  const loaderData: loaderDataInterface = useLoaderData();

  // TEMP
  const positionsTEMP = [
    {
      org: "LSCS",
      position: "VP",
      orgColor: "#220088",
      positionColor: "#313131",
    },
    {
      org: "LSCS",
      position: "RND",
      orgColor: "#220088",
      positionColor: "#313131",
    },
    {
      org: "TLS",
      position: "WEB",
      orgColor: "#007D3F",
      positionColor: "#313131",
    },
    {
      org: "GDSC",
      position: "MKT",
      orgColor: "#FFCD05",
      positionColor: "#313131",
    },
  ];

  // TEMP
  const posDIVS = positionsTEMP.map(
    ({ org, position, orgColor, positionColor }: positionsData) => {
      return (
        <DropdownMenuRadioItem value={`${org}+${position}`}>
          <p
            style={{ backgroundColor: orgColor }}
            className=" text-white text-xs font-semibold px-2"
          >
            {org}
          </p>
          <p
            style={{ backgroundColor: positionColor }}
            className=" text-white text-xs font-semibold px-2"
          >
            {position}
          </p>
        </DropdownMenuRadioItem>
      );
    }
  );

  const [position, setPosition] = useState("LSCS+VP");
  const [textContent, setTextContent] = useState("hi");
  const [showImageUpload, setShowImageUpload] = useState(false);
  const fetcher = useFetcher();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    console.log("kkk", loaderData);

    // Format data as required by API
    const postData = {
      content: { text: formData.get("content") },
    };

    // Submit the formatted data
    fetcher.submit(
      { json: JSON.stringify(postData) },
      { method: "post", action: "/createPost" }
    );
    setOpen(false);
    const revalidator = useRevalidator();
    revalidator.revalidate();
  };

  return (
    <Dialog>
      {" "}
      <DialogTrigger asChild>
        <button className="flex gap-4 p-6 border-2 rounded-2xl hover:bg-slate-100 hover:rounded-2xl transition-all">
          <Terminal className="mr-2" size="36" />
          <div>
            <p className="text-justify text-xl font-bold">Post</p>
            <p className="text-justify">
              Share something publicly to
              <span className="font-bold">your</span> feed; doesn't need to be
              professional. This will not be shown to job recruiters.
            </p>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[640px] overflow-y-auto max-h-screen">
        <DialogHeader>
          <DialogTitle>
            <h1 className="text-2xl">Create Post</h1>
            <h4 className="text-base font-normal">
              Posting with{" "}
              <span className="font-bold">
                La Salle Computer Society - Vice President
              </span>
            </h4>
          </DialogTitle>
        </DialogHeader>{" "}
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4 py-4 flex-col">
            <div className="flex items-center">
              <img
                src={postData.individual[1].profile}
                alt="profile"
                width="36"
                height="36"
                className="rounded-full mr-4"
              />
              <div className="flex flex-col items-start">
                <div className="flex items-center">
                  <p className="text-lg font-bold mr-12">
                    {loaderData.user.info.name.first}{" "}
                    {loaderData.user.info.name.last}
                  </p>{" "}
                  <p className="px-2 bg-[#220088] text-white text-xs font-semibold">
                    {postData.individual[1].org}
                  </p>
                  <p className="px-2 bg-[#313131] text-white text-xs font-semibold mr-2">
                    {postData.individual[1].position}
                  </p>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button type="button">
                        <ChevronDown className="font-extrabold" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup
                        value={position}
                        onValueChange={setPosition}
                      >
                        {posDIVS}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="text-gray-400 text-xs">
                  {loaderData.user.info.username}
                </p>
              </div>
            </div>{" "}
            <Textarea
              name="content"
              id="content"
              placeholder="Type your message here"
              rows={4}
              className="bg-gray-100 rounded-2xl p-4 border-gray-200 border focus:outline-lasalle-green outline-none"
            >
              {textContent}
            </Textarea>
            {showImageUpload && <UploadImage />}
          </div>
          <DialogFooter className="sm:justify-between items-center">
            <div className="flex gap-4">
              {/* <UploadImage /> */}
              <button
                className="text-lasalle-green flex gap-2 hover:text-green-600 transition-all"
                onClick={() => {
                  setShowImageUpload(!showImageUpload);
                }}
                type="button"
              >
                <Images />
                <p>Add Media</p>
              </button>

              <button
                type="button"
                className="text-lasalle-green flex gap-2 hover:text-green-600 transition-all"
              >
                <CalendarDays />
                Tag Event
              </button>
            </div>
            <DialogClose asChild>
              <Button
                className="bg-lasalle-green rounded-3xl text-lg px-6"
                type="submit"
              >
                Post
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
