import { NavLink, redirect } from "react-router";
import Logo from "~/components/assets/logo.svg";
import { BookPlus } from "lucide-react";
import { Input } from "~/components/ui/input";
import PostCard from "./postCard";
import postData from "~/components/dummyData/postData";

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

export default function HomePage() {
  return (
    <div className="basis-[640px] pt-6 flex flex-col gap-4">
      <div className="bg-custom-postcard-white flex items-center px-6 rounded-xl py-4 shadow-lg">
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
