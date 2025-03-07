import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { ChevronDown, Ellipsis } from "lucide-react";
import type { postDataInterface } from "~/lib/interfaces";
import { useState } from "react";
import { Button } from "../ui/button";
import { useFetcher, useLoaderData } from "react-router";
import { DialogClose } from "@radix-ui/react-dialog";

interface positionsData {
  org: string;
  position: string;
  orgColor: string;
  positionColor: string;
}

export default function EditPostDialog(props: postDataInterface) {
  const loaderData = useLoaderData();
  // console.log("lo", loaderData);
  const [currPos, setCurrPos] = useState("LSCS+VP");
  const fetcher = useFetcher();
  const {
    title,
    content,
    media,
    type,
    visibility,
    meta,
    author,
    comments,
    _id,
  } = props;
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);

    // Format data as required by API
    const postData = {
      content: { text: formData.get("content") },
      id: _id,
    };

    // Submit the formatted data
    fetcher.submit(
      { json: JSON.stringify(postData) },
      { method: "post", action: "/editPost" }
    );
  };
  return (
    <>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger className="ml-auto text-gray-500">
            <button>
              <Ellipsis />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            <DialogTrigger>
              {loaderData.loggedInUserId === author._id && (
                <DropdownMenuItem className="w-full">Edit</DropdownMenuItem>
              )}
            </DialogTrigger>

            {loaderData.loggedInUserId === author._id && (
              <DropdownMenuItem className="text-red-500">
                Delete
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent className="sm:max-w-[640px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>
                <h1 className="text-2xl">Edit</h1>
                <h4 className="text-base font-normal">
                  Posting with{" "}
                  <span className="font-bold">
                    La Salle Computer Society - Vice President
                  </span>
                </h4>
              </DialogTitle>
            </DialogHeader>
            <div className="flex gap-4 py-4 flex-col">
              <div className="flex items-center">
                <img
                  src={author.vanity.display_photo}
                  alt="profile"
                  width="36"
                  height="36"
                  className="rounded-full mr-4"
                />
                <div className="flex flex-col items-start">
                  <div className="flex items-center">
                    <p className="text-lg font-bold mr-12">
                      {author.info.name.first} {author.info.name.last}
                    </p>
                    <p className="px-2 bg-[#220088] text-white text-xs font-semibold">
                      LSCS {/** TEMPORARY */}
                    </p>
                    <p className="px-2 bg-[#313131] text-white text-xs font-semibold mr-2">
                      VP {/** TEMPORARY */}
                    </p>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button>
                          <ChevronDown className="font-extrabold" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup
                          value={currPos}
                          onValueChange={setCurrPos}
                        >
                          {posDIVS}
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="text-gray-400 text-xs">
                    {author.info.username}
                  </p>
                </div>
              </div>{" "}
              <textarea
                name="content"
                id="content"
                placeholder="Type your message here"
                rows={5}
                className="bg-gray-100 rounded-2xl p-4 border-gray-200 border focus:outline-lasalle-green outline-none"
              >
                {content.text}
              </textarea>
            </div>
            <DialogFooter className="sm:justify-between items-center">
              <DialogClose asChild>
                <Button
                  className="bg-lasalle-green rounded-3xl text-lg px-6"
                  type="submit"
                >
                  Save
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
