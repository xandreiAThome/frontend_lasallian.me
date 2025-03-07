import { NavLink, redirect } from "react-router";
import Logo from "~/components/assets/logo.svg";
import { BookPlus } from "lucide-react";
import { Input } from "~/components/ui/input";
import PostCard from "~/components/homePageComponents/postCard";
import postData from "~/components/dummyData/postData";
import UserBannerCard from "~/components/userPageComponents/userBannerCard";
import OrgBannerCard from "~/components/userPageComponents/orgBannerCard";
import OrgPostCard from "~/components/homePageComponents/orgPostCard";

interface postsData {
  author: string;
  time: Date;
  views: number;
  content: string;
  profile: string;
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

export default function OrgProfilePage() {
  return (
    <div className="basis-[640px] flex flex-col gap-4 animate-fade-in">
      <OrgBannerCard />

      {postData.org.map(
        ({
          author,
          time,
          views,
          content,
          profile,
          reactions,
          comments,
          reposts,
          img,
          org,
          position,
          commentsList,
        }: postsData) => {
          if (author === "La Salle Computer Society")
            return (
              <OrgPostCard
                author={author}
                time={time}
                views={views}
                profile={profile}
                content={content}
                reactions={reactions}
                comments={comments}
                reposts={reposts}
                img={img}
                org={org}
                position={position}
                commentsList={commentsList}
                key={content}
              />
            );
        }
      )}
    </div>
  );
}
