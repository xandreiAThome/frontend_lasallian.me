import { NavLink, redirect } from "react-router";
import Logo from "~/components/assets/logo.svg";
import { BookPlus } from "lucide-react";
import { Input } from "~/components/ui/input";
import PostCard from "~/components/homePageComponents/postCard";
import postData from "~/components/dummyData/postData";
import UserBannerCard from "~/components/userPageComponents/userBannerCard";
import type { postDataInterface } from "~/lib/interfaces";
import type { Route } from "./+types/userProfileRoute";
import { getUserObject, getUserToken } from "~/.server/sessions";
import api from "~/lib/api";
import axios from "axios";

export async function loader({ request }: Route.LoaderArgs) {
  // Check if the user is already logged in
  const userToken = await getUserToken(request);
  const user = await getUserObject(request);

  try {
    const response = await api.get(`${process.env.API_KEY}/post/all`, {
      headers: {
        Authorization: `Bearer ${user?._id}`,
      },
    });

    // console.log(response.data);
    // console.log(response.data[10].author);
    return { data: response.data, user: user };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(" error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    return { data: [], user: user }; // Return a default value in case of error
  }
}
export default function UserProfilePage({ loaderData }: Route.ComponentProps) {
  if (!loaderData) {
    return <div>Loading...</div>; // Show a loading state if data is undefined
  }

  return (
    <div className="basis-[640px] flex flex-col gap-4">
      {loaderData.user && <UserBannerCard {...loaderData.user} />}

      {loaderData &&
        loaderData.data.map(
          (
            {
              title,
              content,
              media,
              type,
              visibility,
              meta,
              author,
              comments,
              _id,
            }: postDataInterface,
            index: number
          ) => {
            return (
              <PostCard
                key={index}
                title={title}
                content={content}
                media={media}
                type={type}
                visibility={visibility}
                meta={meta}
                author={author}
                comments={comments}
                _id={_id}
              />
            );
          }
        )}
    </div>
  );
}
