import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import UploadProfile from "./uploadProfileComponent";
import type { ImageListType } from "react-images-uploading";
import { Images, ImageUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { DialogClose } from "@radix-ui/react-dialog";

interface uploadImageInterface {
  images: ImageListType;
  setImages: React.Dispatch<React.SetStateAction<ImageListType>>;
  defaultImage: string | null;
}

export default function UploadProfileDialog(props: uploadImageInterface) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="w-32 h-32 lg:w-36 lg:h-36 rounded-full bg-gray-300 m-4 border-custom-bg-white border-4 absolute left-0 -top-20 flex justify-center items-center">
            <button type="button" className="flex flex-col items-center">
              <Avatar className="w-32 h-32 lg:w-36 lg:h-36 rounded-full bg-gray-300 m-4 border-custom-bg-white border-4">
                <AvatarImage
                  alt="@shadcn"
                  src={
                    props.images[0]?.dataURL || props.defaultImage || undefined
                  }
                />
                <AvatarFallback className="flex flex-col bg-gray-300">
                  <Images className="text-lasalle-green"></Images>
                  <p className="text-lasalle-green font-bold">
                    + Display Photo
                  </p>
                </AvatarFallback>
              </Avatar>
              <ImageUp className="bg-lasalle-green right-0 absolute text-white rounded-full p-2 bottom-0 h-8 w-8 z-50" />
            </button>
          </div>
        </DialogTrigger>

        <DialogContent className="flex justify-center items-center flex-col">
          <DialogTitle>
            <h3 className="text-xl">Edit Profile Picture</h3>
          </DialogTitle>
          <UploadProfile
            images={props.images}
            setImages={props.setImages}
            defaultImage={props.defaultImage}
          ></UploadProfile>
          <DialogClose>
            <Button>Save</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}
