import postData from "~/components/dummyData/postData";
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
    </div>
  );
}
