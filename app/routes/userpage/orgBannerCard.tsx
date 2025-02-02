import {
  BadgeInfo,
  Ellipsis,
  ExternalLink,
  Facebook,
  House,
  Images,
  Instagram,
  Linkedin,
  UserRound,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export default function OrgBannerCard() {
  const lol =
    "https://scontent.fmnl37-1.fna.fbcdn.net/v/t39.30808-6/462689548_937370231755893_3437674587473298092_n.png?stp=dst-png_s960x960&_nc_cat=109&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeFLL2prEC1nJZXDstDXEOn8jpvq_CYPt2uOm-r8Jg-3a5HUT2lqMMpaSbhsqA6Af9Dz4BMfU7ofnXW0i2wOO_i8&_nc_ohc=OrznZH9cwhUQ7kNvgE1aN0L&_nc_zt=23&_nc_ht=scontent.fmnl37-1.fna&_nc_gid=ADJcTr_86BOn_ihmfN5OS7L&oh=00_AYBgmK7SJxj-gEyC920-Ifl5xzZOujgdS1fjGI7X1sW4eA&oe=67A49DF8";
  return (
    <div className="bg-custom-postcard-white rounded-b-xl flex flex-col">
      <div
        className={`w-full h-56 bg-gray-300 flex items-center justify-center bg-center bg-cover bg-[url(${lol})]`}
      ></div>

      <div className="">
        <div className="relative flex px-6 py-4">
          <div className="w-32 h-32 lg:w-36 lg:h-36 rounded-full bg-gray-300 m-4 border-custom-bg-white border-4 absolute left-0 -top-20 flex justify-center items-center">
            <img
              src="https://scontent.fmnl3-1.fna.fbcdn.net/v/t39.30808-6/462565143_937343991758517_3934195989556103177_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGGbE7Od2YXhbz9jf3eIuqarIUjDCvDYLmshSMMK8Nguc3iKvUacKK6cpIGTPMga9YV-e6q8B5gSJX6wv4WJQIj&_nc_ohc=OjgONZiRuRYQ7kNvgGgZDct&_nc_zt=23&_nc_ht=scontent.fmnl3-1.fna&_nc_gid=A2cv8zhImmDfn3rpo5xa-oA&oh=00_AYCUAK0P2aHKGID5eWeiIXF3vxrYf-dYJiTQdZ8eNh1-HQ&oe=67A4A2A4"
              alt=""
              className="rounded-full"
            />
          </div>

          <div className="pl-36 flex flex-col flex-grow">
            <div className="flex justify-between">
              <p className=" text-xl font-bold">La Salle Computer Society</p>

              <button type="button" className="ml-auto">
                <Ellipsis
                  className="text-custom-text-black"
                  size={24}
                ></Ellipsis>
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <p className="">
                <span className="px-2 bg-[#220088] text-white text-sm font-semibold">
                  CSO
                </span>
                <span className="px-2 bg-[#313131] text-white text-sm font-semibold">
                  #2
                </span>
              </p>
            </div>

            <div className="flex gap-4">
              <p className="text-sm">
                <span className="font-bold">204</span> Officers
              </p>
              <p className="text-sm">
                <span className="font-bold">784</span> Members
              </p>
              <p className="text-sm">
                <span className="font-bold">5.4k</span> Followers
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col px-6 gap-2 pb-4">
        <p className="text-sm italic">
          Living Yesterday's Vision, Setting Today's Trends, Inspiring
          Tomorrow's Leaders.
        </p>

        <div className="text-sm flex gap-2">
          <span className="flex items-center gap-1">
            <BadgeInfo size="16" />
            1985
          </span>
          <span className="flex items-center gap-1">
            <House size="16" />
            CCS
          </span>
          <span className="flex items-center gap-1">
            <Linkedin size="16" />
            <span className="text-lasalle-green font-semibold">dlsulscs</span>
          </span>
          <span className="flex items-center gap-1">
            <Instagram size="16" />
            <span className="text-lasalle-green font-semibold">dlsu_lscs</span>
          </span>
          <span className="flex items-center gap-1">
            <Facebook size="16" />
            <span className="text-lasalle-green font-semibold">
              La Salle Computer Society
            </span>
          </span>
        </div>
        <span className="flex items-center gap-1 font-bold">
          <UserRound size={16} />
          Council of Student Organizations
        </span>
        <span className="flex gap-1 items-center">
          <ExternalLink size={16} />
          <span className="text-lasalle-green font-semibold">
            www.dlsu-lscs.org
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
