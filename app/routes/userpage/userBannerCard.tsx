import {
  Ellipsis,
  Images,
  BadgeInfo,
  House,
  Linkedin,
  Instagram,
  Facebook,
  UserRound,
  ExternalLink,
} from "lucide-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

export default function UserBannerCard() {
  return (
    <div className="bg-custom-postcard-white rounded-b-xl flex flex-col">
      <div className="w-full h-56 bg-gray-300 flex items-center justify-center bg-center bg-cover bg-[url(https://media.licdn.com/dms/image/v2/D5622AQEsK-oYd5t4kw/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1731159674567?e=1741219200&v=beta&t=9JwhuJS7mHnFRLGm0RWZTnCvKU-sTloY2hPatPBm5sM)]"></div>

      <div className="">
        <div className="relative flex px-6 py-4">
          <div className="w-32 h-32 lg:w-36 lg:h-36 rounded-full bg-gray-300 m-4 border-custom-bg-white border-4 absolute left-0 -top-20 flex justify-center items-center">
            <img
              src="https://media.licdn.com/dms/image/v2/D5603AQGX6mTlbYpJ1Q/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1724656907874?e=1744243200&v=beta&t=pSFTZRJhVVUqZ1RMqZyaieh6TzH0qAE49KIUIa4xoLE"
              alt=""
              className="rounded-full"
            />
          </div>

          <div className="pl-36 flex flex-col flex-grow">
            <div className="flex justify-between">
              <p className=" text-xl font-bold">Sean Denzel Robenta (zel)</p>

              <button type="button" className="ml-auto">
                <Ellipsis
                  className="text-custom-text-black"
                  size={24}
                ></Ellipsis>
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-lg text-gray-400">@zelkimm23</p>
              <div className="flex gap-2 flex-wrap">
                <p className="">
                  <span className="px-2 bg-[#220088] text-white text-sm font-semibold">
                    LSCS
                  </span>
                  <span className="px-2 bg-[#313131] text-white text-sm font-semibold">
                    VP
                  </span>
                </p>

                <p>
                  <span className="px-2 bg-[#220088] text-white text-sm font-semibold">
                    LSCS
                  </span>
                  <span className="px-2 bg-[#313131] text-white text-sm font-semibold">
                    RND
                  </span>
                </p>
                <p>
                  {" "}
                  <span className="px-2 bg-[#FFCD05] text-white text-sm font-semibold">
                    GDSC
                  </span>
                  <span className="px-2 bg-[#313131] text-white text-sm font-semibold">
                    MKT
                  </span>
                </p>
                <p>
                  <span className="px-2 bg-lasalle-green text-white text-sm font-semibold">
                    TLS
                  </span>
                  <span className="px-2 bg-[#313131] text-white text-sm font-semibold">
                    WEB
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col px-6 gap-2 pb-4">
        <div className="flex gap-2">
          <p className="text-sm">
            <span className="font-bold">3.6k</span> Followers
          </p>
          <p className="text-sm">
            <span className="font-bold">386</span> Followers
          </p>
        </div>

        <p className="text-sm italic">
          Hindi ko alam ano ilalagay sa bio kaya i2 nlng
        </p>

        <div className="text-sm flex gap-4 flex-wrap">
          <span className="flex items-center gap-1">
            <BadgeInfo size="16" />
            123
          </span>
          <span className="flex items-center gap-1">
            <House size="16" />
            CCS
          </span>
          <span className="flex items-center gap-1">
            <Linkedin size="16" />
            <span className="text-lasalle-green font-semibold">sdyr</span>
          </span>
          <span className="flex items-center gap-1">
            <Instagram size="16" />
            <span className="text-lasalle-green font-semibold">seandvv</span>
          </span>
          <span className="flex items-center gap-1">
            <Facebook size="16" />
            <span className="text-lasalle-green font-semibold">
              Sean Denzel Yu Robenta
            </span>
          </span>
        </div>
        <span className="flex items-center gap-1 font-bold">
          <UserRound size={16} />
          BS Computer Science, Major in Software Technology
        </span>
        <span className="flex gap-1 items-center">
          <ExternalLink size={16} />
          <span className="text-lasalle-green font-semibold">robenta.tech</span>
        </span>
        <div className="flex gap-2 mt-2">
          <Button className="bg-lasalle-green rounded-3xl text-lg font-bold">
            + Follow
          </Button>
          <Button
            variant="outline"
            className="rounded-3xl text-lasalle-green text-lg font-bold"
          >
            Message
          </Button>
        </div>
      </div>
    </div>
  );
}
