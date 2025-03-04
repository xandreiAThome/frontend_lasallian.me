import { NavLink, redirect } from "react-router";
import Logo from "~/components/assets/logo.svg";
import { BookPlus } from "lucide-react";
import { Input } from "~/components/ui/input";
import PostCard from "~/components/homePageComponents/postCard";
import postData from "~/components/dummyData/postData";
import UserBannerCard from "~/components/userPageComponents/userBannerCard";
interface postData {
  author: string;
  username: string;
  profile: string;
  time: Date;
  views: number;
  content: string;
  reactions: number;
  comments: number;
  reposts: number;
  img: string | null;
  org: string;
  position: string;
  commentsList: {
    profile: { author: string; profile: string };
    reactions: number;
    comments: number;
    time: Date;
    content: string;
  }[];
}

export default function UserProfilePage() {
  return (
    <div className="basis-[640px] flex flex-col gap-4">
      <UserBannerCard />

      {postData.individual.map(
        ({
          author,
          username,
          time,
          views,
          profile,
          content,
          reactions,
          comments,
          reposts,
          img,
          org,
          position,
          commentsList,
        }: postData) => {
          if (author === "zel")
            return (
              <PostCard
                key={content}
                author={author}
                username={username}
                profile={profile}
                time={time}
                views={views}
                content={content}
                reactions={reactions}
                comments={comments}
                reposts={reposts}
                img={img}
                org={org}
                position={position}
                commentsList={commentsList}
              />
            );
        }
      )}
    </div>
  );
}
