import { BookPlus } from "lucide-react";
import PostCard from "./postCard";
import postData from "~/components/dummyData/postData";
import OrgPostCard from "./orgPostCard";

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

interface orgPost {
  author: string;
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

export default function HomePage() {
  return (
    <div className="basis-[640px] pt-6 flex flex-col gap-4">
      <div className="bg-custom-postcard-white flex items-center px-6 rounded-xl py-4 shadow-lg w-full">
        <img
          src="https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"
          alt="profile"
          width="42"
          height="42"
          className="rounded-full mr-4"
        />
        <button className="hover:bg-slate-100 flex p-2 bg-gray-200 rounded-3xl text-base items-center px-4 w-full text-gray-500">
          <BookPlus className="mr-2" />
          <p>
            How's{" "}
            <span className="bg-bold text-gray-600 font-bold"> YOUR </span> day
            Lasallian Achiever?
          </p>
        </button>
      </div>

      {postData.individual.map(
        ({
          author,
          username,
          profile,
          time,
          views,
          content,
          reactions,
          comments,
          reposts,
          img,
          org,
          position,
          commentsList,
        }: postData) => {
          return (
            <PostCard
              key={username}
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
        }: orgPost) => {
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
            />
          );
        }
      )}
    </div>
  );
}
