import { NavLink, redirect } from "react-router";
import Logo from "~/components/assets/logo.svg";
import { BookPlus } from "lucide-react";
import { Input } from "~/components/ui/input";
import PostCard from "../homepage/postCard";
import postData from "~/components/dummyData/postData";
import UserBannerCard from "./userBannerCard";

interface Data {
  author: string;
  username: string;
  time: Date;
  views: string;
  content: string;
  reactions: number;
  comments: number;
  reposts: number;
  img: string | null;
  org: string;
  position: string;
}

export default function UserProfilePage() {
  return (
    <div className="basis-[640px] pt-6 flex flex-col gap-4">
      <UserBannerCard />

      {postData.individual.map(
        ({
          author,
          username,
          time,
          views,
          content,
          reactions,
          comments,
          reposts,
          img,
          org,
          position,
        }: Data) => {
          return (
            <PostCard
              key={username}
              author={author}
              username={username}
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
