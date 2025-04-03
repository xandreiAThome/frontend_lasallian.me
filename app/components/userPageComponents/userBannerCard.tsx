import {
  BadgeInfo,
  Facebook,
  House,
  Instagram,
  Linkedin,
  UserRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLoaderData, useLocation } from "react-router";
import profileImgDefault from "~/components/assets/profile.jpg";
import { Button } from "~/components/ui/button";
import BadgeIcon from "~/components/userPageComponents/badgeIcon";
import type { authorInterface } from "~/lib/interfaces";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import EditUserInfoDialog from "./editUserInfoDialog";

export default function UserBannerCard(props: authorInterface) {
  const { vanity, info, meta, _id } = props;
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [coverImg, setCoverImg] = useState<string | null>(null);
  const loaderData = useLoaderData();
  const location = useLocation();

  useEffect(() => {
    async function getImg() {
      if (vanity.display_photo) {
        try {
          const response = await fetch(`${vanity.display_photo}`, {
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
      } else {
        setProfileImg(null);
      }

      if (vanity.cover_photo) {
        try {
          const response = await fetch(`${vanity.cover_photo}`, {
            headers: {
              Authorization: `Bearer ${loaderData.userToken}`,
            },
            method: "get",
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const blob = await response.blob();
          setCoverImg(URL.createObjectURL(blob));
        } catch (error) {
          console.log("error:", error);
        }
      } else {
        setCoverImg(null);
      }
    }
    getImg();
  }, [vanity.cover_photo, vanity.display_photo, location.pathname]);

  return (
    <div className="bg-custom-postcard-white rounded-b-xl flex flex-col">
      <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
        {coverImg && (
          <img src={coverImg} alt="" className="w-full h-48 object-cover" />
        )}
      </div>

      <div className="">
        <div className="relative flex px-6 py-4">
          <div className="w-32 h-32 lg:w-36 lg:h-36 rounded-full bg-gray-300 m-4 border-custom-bg-white border-4 absolute left-0 -top-20 flex justify-center items-center">
            <Avatar className="w-32 h-32 lg:w-36 lg:h-36 rounded-full bg-gray-300 m-4 border-custom-bg-white border-4 ">
              <AvatarImage alt="@shadcn" src={profileImg ?? ""} />
              <AvatarFallback className="flex flex-col bg-gray-300">
                <img src={profileImgDefault} alt="" />
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="pl-36 flex flex-col flex-grow">
            <div className="flex justify-between">
              <p className=" text-xl font-bold">
                {info.name.first} {info.name.last}
              </p>

              <EditUserInfoDialog
                author={props}
                coverPic={coverImg}
                profilePic={profileImg}
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-lg text-gray-400">{info.username}</p>
              <div className="flex gap-2 flex-wrap">
                <BadgeIcon badgeInfo={loaderData.userProfile.vanity.badges} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col px-6 gap-2 pb-4">
        <div className="flex gap-3">
          <p className="text-sm">
            <span className="font-bold">0</span> Followers
          </p>
          <p className="text-sm">
            <span className="font-bold">0</span> Following
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
              <a href={info.links.linkedin || ""}>placeholder</a>
            </span>
          </span>
          <span className="flex items-center gap-1">
            <Instagram size="16" />
            <span className="text-lasalle-green font-semibold">
              <a href={info.links.instagram || ""}>placeholder</a>
            </span>
          </span>
          <span className="flex items-center gap-1">
            <Facebook size="16" />
            <span className="text-lasalle-green font-semibold">
              <a href={info.links.facebook || ""}>
                {info.name.first} {info.name.last}
              </a>
            </span>
          </span>
        </div>
        <span className="flex items-center gap-1 font-bold">
          <UserRound size={16} />
          {info.program}
        </span>
        {/* <span className="flex gap-1 items-center">
          <ExternalLink size={16} />
          <span className="text-lasalle-green font-semibold">
            <a href={info.links.other ? info.links.other[0] : ""}>
              robenta.tech
            </a>
          </span>
        </span> */}
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
