import { NavLink, redirect } from "react-router";
import Logo from "~/components/assets/logo.svg";
import { BookPlus } from "lucide-react";
import { Input } from "~/components/ui/input";
import PostCard from "../homepage/postCard";
import postData from "~/components/dummyData/postData";
import UserBannerCard from "./userBannerCard";
import OrgBannerCard from "./orgBannerCard";
import OrgPostCard from "../homepage/orgPostCard";

interface postsData {
  author: string;
  time: Date;
  views: number;
  content: string;
  reactions: number;
  comments: number;
  reposts: number;
  img: string | null;
  org: string;
  position: string;
}

export default function OrgProfilePage() {
  return (
    <div className="basis-[640px] pt-6 flex flex-col gap-4">
      <OrgBannerCard />

      {postData.org.map(
        ({
          author,
          time,
          views,
          content,
          reactions,
          comments,
          reposts,
          img,
          org,
          position,
        }: postsData) => {
          return (
            <OrgPostCard
              author={author}
              time={time}
              views={views}
              content={content}
              reactions={reactions}
              comments={comments}
              reposts={reposts}
              img={img}
              org={org}
              position={position}
            />
          );
        }
      )}
    </div>
  );
}
