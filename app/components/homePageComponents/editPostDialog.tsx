import { DialogClose } from "@radix-ui/react-dialog";
import { Ellipsis } from "lucide-react";
import { useState } from "react";
import { useFetcher, useLoaderData } from "react-router";
import profileImg from "~/components/assets/profile.jpg";
import BadgeDropDown from "~/components/createPostComponents/badgeDropdown";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import type { badgeInterface, postDataInterface } from "~/lib/interfaces";
import { Button } from "../ui/button";

export default function EditPostDialog(props: postDataInterface) {
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
    badge,
    comments,
    _id,
  } = props;
  // Badge Data
  const userBadges = loaderData.user.vanity.badges;
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const [selectedBadgeId, setSelectedBadgeId] = useState<string>(
    badge ? badge._id : ""
  );
  const [postingAs, setPostingAs] = useState<string>(
    badge
      ? (() => {
          if (
            userBadges.find(
              (userBadge: badgeInterface) => userBadge._id === badge._id
            )
          ) {
            return badge.description;
          } else {
            return "No Badge";
          }
        })()
      : "No Badge"
  ); //IIFE daw pala to, the more you know :)

  // badge ? console.log(`Selected Badge on edit: ${badge._id}`) : console.log(`No badge on this post`);

  const updateSelectedBadgeId = (
    newBadgeId: string,
    badgeDescription: string
  ) => {
    console.log(`newBadgeId: ${newBadgeId}`);
    setSelectedBadgeId(newBadgeId);
    setPostingAs(badgeDescription);
  };

  const handleDelete = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("delete");
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    console.log("form", formData);

    // Format data as required by API
    const postData = {
      id: _id,
      location: location,
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
      location: location,
      badge: selectedBadgeId,
    };

    console.log("NUWIAFHAHAHAHA");

    // Submit the formatted data
    fetcher.submit(
      { json: JSON.stringify(postData) },
      { method: "post", action: "/editPost" }
    );
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="ml-auto text-gray-500" asChild>
          <button>
            <Ellipsis />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {loaderData.loggedInUserId === author._id && (
            <>
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
            </>
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
                  Posting with <span className="font-bold">{postingAs}</span>
                </h4>
              </DialogTitle>
            </DialogHeader>
            <div className="flex gap-4 py-4 flex-col">
              <div className="flex items-center">
                <img
                  src={author.vanity.display_photo || profileImg}
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
                    <BadgeDropDown
                      badgeIds={userBadges}
                      callback={updateSelectedBadgeId}
                      defaultSelected={badge ? badge._id : ""}
                    />
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
                defaultValue={content.text}
              ></textarea>
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
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete the post and cannot be undone.
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
