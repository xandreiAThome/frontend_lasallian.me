import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import type { ImageListType } from "react-images-uploading";
import { Images } from "lucide-react";
import { Button } from "../ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import UploadCover from "./uploadCoverComponent";

interface uploadImageInterface {
  images: ImageListType;
  setImages: React.Dispatch<React.SetStateAction<ImageListType>>;
}

export default function UploadCoverDialog(props: uploadImageInterface) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
            <button
              type="button"
              className="flex flex-col w-full h-48 items-center justify-center"
            >
              {props.images[0] ? (
                <img
                  src={props.images[0] && props.images[0].dataURL}
                  alt="cover photo"
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="flex gap-2">
                  <Images className="text-lasalle-green"></Images>
                  <p className="text-lasalle-green font-bold">
                    Add Cover Photo
                  </p>
                </div>
              )}
            </button>
          </div>
        </DialogTrigger>

        <DialogContent className="flex min-w-[640px] justify-center items-center flex-col">
          <DialogTitle>
            <h3 className="text-xl mb-4">Edit Cover Photo</h3>
          </DialogTitle>
          <UploadCover
            images={props.images}
            setImages={props.setImages}
          ></UploadCover>
          <DialogClose>
            <Button>Save</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}
