import { Ellipsis, Images } from "lucide-react";
import { Input } from "~/components/ui/input";

export default function UserBannerCard() {
  return (
    <div className="bg-custom-postcard-white rounded-b-xl">
      <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
        <button type="button" className="flex gap-1">
          <Images className="text-lasalle-green" />
          <p className="font-semibold text-lasalle-green">Add Cover Photo</p>
        </button>
      </div>

      <div className="pb-6">
        <div className="relative flex p-6">
          <div className="w-32 h-32 lg:w-36 lg:h-36 rounded-full bg-gray-300 m-4 border-custom-bg-white border-4 absolute left-0 -top-20 flex justify-center items-center">
            <button type="button" className="flex flex-col items-center">
              <Images className="text-lasalle-green"></Images>
              <p className="text-lasalle-green font-bold">+ Display Photo </p>
            </button>
          </div>

          <div className="ml-auto w-[28rem]">
            <div className="flex justify-between">
              <p className="text-custom-text-black">
                Basic Account Information
              </p>

              <button type="button">
                <Ellipsis
                  className="text-custom-text-black"
                  size={24}
                ></Ellipsis>
              </button>
            </div>

            <div className="flex flex-col gap-2 w-96">
              <Input
                placeholder="@username"
                className="bg-slate-100"
                name="username"
              />
              <Input placeholder="Bio" className="bg-slate-100" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
