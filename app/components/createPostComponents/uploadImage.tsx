import { Images, X } from "lucide-react";
import React from "react";
import ImageUploading, { type ImageListType } from "react-images-uploading";

interface uploadImageInterface {
  images: ImageListType;
  setImages: React.Dispatch<React.SetStateAction<ImageListType>>;
  uploadButtonDiv: React.ReactElement;
}

export default function UploadImage({
  images,
  setImages,
  uploadButtonDiv,
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
    <div className="App">
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

          <div className="text-lasalle-green flex gap-2">
            <div className="w-full">
              <button
                type="button"
                style={isDragging ? { color: "red" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
                className="flex gap-2 w-full h-24 flex-col bg-gray-50 rounded-md items-center justify-center hover:text-green-600 transition-all"
              >
                {uploadButtonDiv}
              </button>

              {imageList.map((image, index) => (
                <div key={index} className="relative mt-2">
                  <img src={image.dataURL} alt="" width="200" />

                  <button
                    type="button"
                    className="hover:text-green-600 transition-all absolute top-0"
                    onClick={() => {
                      onImageRemove(index);
                    }}
                  >
                    <X />
                  </button>
                </div>
              ))}

              {images.length > 1 && (
                <button
                  type="button"
                  className="hover:text-green-600 transition-all"
                  onClick={onImageRemoveAll}
                >
                  Remove all images
                </button>
              )}
            </div>
          </div>
        )}
      </ImageUploading>
    </div>
  );
}
