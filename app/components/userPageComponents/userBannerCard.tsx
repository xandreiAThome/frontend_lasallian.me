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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import type { authorInterface } from "~/lib/interfaces";
import EditUserInfoDialog from "./editUserInfoDialog";
import profileImg from "~/components/assets/profile.jpg";

export default function UserBannerCard(props: authorInterface) {
  const { vanity, info, meta, _id } = props;
  return (
    <div className="bg-custom-postcard-white rounded-b-xl flex flex-col">
      <div className="w-full h-56 bg-gray-300 flex items-center justify-center bg-center bg-cover bg-[url(https://media.licdn.com/dms/image/v2/D5622AQEsK-oYd5t4kw/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1731159674567?e=1741219200&v=beta&t=9JwhuJS7mHnFRLGm0RWZTnCvKU-sTloY2hPatPBm5sM)]"></div>

      <div className="">
        <div className="relative flex px-6 py-4">
          <div className="w-32 h-32 lg:w-36 lg:h-36 rounded-full bg-gray-300 m-4 border-custom-bg-white border-4 absolute left-0 -top-20 flex justify-center items-center">
            <img
              src={vanity.display_photo ? vanity.display_photo : profileImg}
              alt=""
              className="rounded-full"
            />
          </div>

          <div className="pl-36 flex flex-col flex-grow">
            <div className="flex justify-between">
              <p className=" text-xl font-bold">
                {info.name.first} {info.name.last}
              </p>

              <EditUserInfoDialog {...props} />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-lg text-gray-400">{info.username}</p>
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

        <p className="text-sm italic">{info.bio}</p>

        <div className="text-sm flex gap-4 flex-wrap">
          <span className="flex items-center gap-1">
            <BadgeInfo size="16" />
            {info.batchid}
          </span>
          <span className="flex items-center gap-1">
            <House size="16" />
            CCS {/**TODO */}
          </span>
          <span className="flex items-center gap-1">
            <Linkedin size="16" />
            <span className="text-lasalle-green font-semibold">
              <a href={info.links.linkedin || ""}>sdyr</a>
            </span>
          </span>
          <span className="flex items-center gap-1">
            <Instagram size="16" />
            <span className="text-lasalle-green font-semibold">
              <a href={info.links.instagram || ""}>seandvv</a>
            </span>
          </span>
          <span className="flex items-center gap-1">
            <Facebook size="16" />
            <span className="text-lasalle-green font-semibold">
              <a href={info.links.facebook || ""}>
                {info.name.first} {info.name.first}
              </a>
            </span>
          </span>
        </div>
        <span className="flex items-center gap-1 font-bold">
          <UserRound size={16} />
          {info.program}
        </span>
        <span className="flex gap-1 items-center">
          <ExternalLink size={16} />
          <span className="text-lasalle-green font-semibold">
            <a href={info.links.other ? info.links.other[0] : ""}>
              robenta.tech
            </a>
          </span>
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
