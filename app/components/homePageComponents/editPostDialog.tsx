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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
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

interface editPostDialogInterface {
  isModal: boolean;
  postData: postDataInterface;
}

export default function EditPostDialog(props: editPostDialogInterface) {
  const loaderData = useLoaderData();
  // console.log("lo", loaderData);
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
  } = props.postData;
  const [currPos, setCurrPos] = useState("LSCS+VP");
  const [openDialog, setOpenDialog] = useState<string | null>(null);

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
  const handleDelete = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("delete");
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    console.log("form", formData);

    // Format data as required by API
    const postData = {
      id: _id,
    };

    // Submit the formatted data
    fetcher.submit(
      { json: JSON.stringify(postData) },
      { method: "post", action: "/deletePost" }
    );
  };

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
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="ml-auto text-gray-500" asChild>
          <button>
            <Ellipsis />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {loaderData.loggedInUserId === author._id && (
            <DropdownMenuItem
              className="w-full"
              onClick={() => setOpenDialog("edit")}
            >
              Edit
            </DropdownMenuItem>
          )}

          {loaderData.loggedInUserId === author._id && (
            <DropdownMenuItem
              className="w-full text-red-500"
              onClick={() => setOpenDialog("delete")}
            >
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog
        open={openDialog === "edit"}
        onOpenChange={(open) => {
          if (!open) setOpenDialog(null);
        }}
      >
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
                  name="save"
                >
                  Save
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={openDialog === "delete"}
        onOpenChange={(open) => {
          if (!open) setOpenDialog(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>
              <form onSubmit={handleDelete}>
                <button type="submit" name="delete">
                  Delete
                </button>
              </form>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
