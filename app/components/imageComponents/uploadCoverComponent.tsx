import { ArrowRightLeft, Images, X } from "lucide-react";
import React from "react";
import ImageUploading, { type ImageListType } from "react-images-uploading";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface uploadImageInterface {
  images: ImageListType;
  setImages: React.Dispatch<React.SetStateAction<ImageListType>>;
}

export default function UploadCover({
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
    <div className="flex w-full flex-col justify-center">
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
              <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                <button
                  type="button"
                  className="flex gap-2 w-full h-full justify-center items-center"
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  <Images className="text-lasalle-green"></Images>
                  <p className="text-lasalle-green font-bold">
                    Add Cover Photo
                  </p>
                </button>
              </div>
            )}

            {images[0] && (
              <div
                key={0}
                className="relative w-full h-48 bg-gray-300 flex items-center justify-center"
              >
                <img
                  src={images[0] && images[0].dataURL}
                  alt="cover photo"
                  className="w-full h-48 object-cover"
                />

                <button
                  type="button"
                  className="hover:text-green-600 transition-all absolute -top-6 left-0"
                  onClick={() => {
                    console.log(images[0]);
                    onImageRemove(0);
                  }}
                >
                  <X className="text-red-700 hover:text-red-500" />
                </button>

                <button
                  type="button"
                  className="hover:text-green-600 transition-all absolute -top-6 right-0 text-lasalle-green"
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
