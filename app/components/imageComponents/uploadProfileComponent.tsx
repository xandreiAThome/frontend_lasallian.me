import { ArrowRightLeft, Images, X } from "lucide-react";
import React from "react";
import ImageUploading, { type ImageListType } from "react-images-uploading";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface uploadImageInterface {
  images: ImageListType;
  setImages: React.Dispatch<React.SetStateAction<ImageListType>>;
}

export default function UploadProfile({
  images,
  setImages,
}: uploadImageInterface) {
  const maxNumber = 1;

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(images, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <div className="flex flex-col justify-center">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <>
            {!images[0] && (
              // <div className="">
              //   <div className="w-full">
              // <button
              //   type="button"
              //   style={isDragging ? { color: "red" } : undefined}
              //   onClick={onImageUpload}
              //   {...dragProps}
              //   className="flex gap-2 w-full h-24 flex-col bg-gray-50 rounded-md items-center justify-center hover:text-green-600 transition-all"
              // >
              //       <div className="bg-gray-300 h-full flex items-center flex-col justify-center">
              //         <Images />
              //         <p>Add Profile</p>
              //       </div>
              //     </button>
              //   </div>
              // </div>
              <div className="w-32 h-32 lg:w-36 lg:h-36 rounded-full bg-gray-300 m-4 border-custom-bg-white border-4  flex justify-center items-center">
                <button
                  type="button"
                  className="flex flex-col items-center"
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  <Images className="text-lasalle-green"></Images>
                  <p className="text-lasalle-green font-bold">
                    + Display Photo{" "}
                  </p>
                </button>
              </div>
            )}

            {images[0] && (
              <div key={0} className="relative mt-2">
                <Avatar className="w-32 h-32 lg:w-36 lg:h-36 rounded-full bg-gray-300 m-4 border-custom-bg-white border-4 ">
                  <AvatarImage
                    alt="@shadcn"
                    src={images[0] && images[0].dataURL}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <button
                  type="button"
                  className="hover:text-green-600 transition-all absolute top-0"
                  onClick={() => {
                    onImageRemove(0);
                  }}
                >
                  <X />
                </button>

                <button
                  type="button"
                  className="hover:text-green-600 transition-all absolute top-0 right-0 text-lasalle-green"
                  onClick={() => onImageUpdate(0)}
                >
                  <ArrowRightLeft />
                </button>
              </div>
            )}
          </>
        )}
      </ImageUploading>
    </div>
  );
}
