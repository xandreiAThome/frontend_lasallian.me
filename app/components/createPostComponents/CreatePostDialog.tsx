import { DialogClose } from "@radix-ui/react-dialog";
import { CalendarDays, Images } from "lucide-react";
import { useEffect, useState, type ReactElement } from "react";
import type { ImageListType } from "react-images-uploading";
import { Form, useFetcher, useLoaderData, useLocation } from "react-router";
import profileImgDefault from "~/components/assets/profile.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Textarea } from "../ui/textarea";
import BadgeDropDown from "./badgeDropdown";
import UploadImage from "./uploadImage";

/**
 * @param setOpen - useState setter for closing a previous dialog
 * @param buttonProp - html element to display for triggering this dialog
 */
interface CreatePostButtonProps {
  setOpen?: (open: boolean) => void; // for if this dialog is on top of another dialog
  buttonProp: ReactElement;
}

/**
 * @param setOpen - useState setter for closing a previous dialog
 * @param buttonProp - html element to display for triggering this dialog
 */
export default function CreatePostButton({
  setOpen,
  buttonProp,
}: CreatePostButtonProps) {
  const loaderData = useLoaderData();
  const author = loaderData.user;
  const location = useLocation();
  const [images, setImages] = useState<ImageListType>([]);

  // TODO: Ensure this is correct
  const userBadges = loaderData?.user?.vanity?.badges || [];

  // TODO: Badge
  const [selectedBadgeId, setSelectedBadgeId] = useState<string>("");
  const [postingAs, setPostingAs] = useState<string>("");
  const [textContent, setTextContent] = useState("");
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const fetcher = useFetcher();

  const updateSelectedBadgeId = (
    newBadgeId: string,
    badgeDescription: string
  ) => {
    console.log(`newBadgeId: ${newBadgeId}`);
    setSelectedBadgeId(newBadgeId);
    setPostingAs(badgeDescription);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);

    const image = images[0]?.file;
    console.log(image);

    // TODO: Append badge data
    formData.append("badge", selectedBadgeId);

    // Append data to FormData
    // formData.append("content", formData.get("content") as string);
    formData.append("location", location.pathname);
    if (image) {
      formData.append("image", image);
      console.log("lol", image);
    }
    if (setOpen) {
      setOpen(false);
    }

    // Submit the formatted data
    fetcher.submit(formData, {
      method: "post",
      action: "/createPost",
      encType: "multipart/form-data",
    });
  };

  useEffect(() => {
    async function getImg() {
      if (author?.vanity?.display_photo) {
        try {
          const response = await fetch(`${author.vanity.display_photo}`, {
            headers: {
              Authorization: `Bearer ${loaderData.userToken}`,
            },
            method: "get",
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const blob = await response.blob();
          setProfileImg(URL.createObjectURL(blob));
        } catch (error) {
          console.log("error:", error);
        }
      }
    }
    getImg();
  }, [author?.vanity?.display_photo]);

  // TODO: Integrate description
  return (
    <Dialog>
      {" "}
      <DialogTrigger asChild>{buttonProp}</DialogTrigger>
      <DialogContent className="sm:max-w-[640px] overflow-y-auto max-h-screen">
        <DialogHeader>
          <DialogTitle>
            <h1 className="text-2xl">Create Post</h1>
            <h4 className="text-base font-normal">
              Posting with{" "}
              <span className="font-bold">
                {postingAs ? postingAs : "no badge"}
              </span>
            </h4>
          </DialogTitle>
        </DialogHeader>{" "}
        <Form onSubmit={handleSubmit}>
          <div className="flex gap-4 py-4 flex-col">
            <div className="flex items-center">
              <Avatar className="w-10 h-10 mr-2">
                <AvatarImage alt="@shadcn" src={profileImg ?? undefined} />
                <AvatarFallback className="flex flex-col bg-gray-300">
                  <img src={profileImgDefault} alt="" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <div className="flex items-center">
                  <p className="text-lg font-bold mr-12">
                    {loaderData.user.info?.name.first}{" "}
                    {loaderData.user.info?.name.last}
                  </p>{" "}
                  <BadgeDropDown
                    badgeIds={userBadges}
                    callback={updateSelectedBadgeId}
                  />
                </div>
                <p className="text-gray-400 text-xs">
                  {loaderData.user.info?.username}
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
            {showImageUpload && (
              <UploadImage
                images={images}
                setImages={setImages}
                uploadButtonDiv={
                  <div>
                    <div className="flex gap-2">
                      <Images />
                      <p>Upload Image</p>
                    </div>

                    <p className="text-sm">or drag and drop</p>
                  </div>
                }
              />
            )}
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
        </Form>
      </DialogContent>
    </Dialog>
  );
}
