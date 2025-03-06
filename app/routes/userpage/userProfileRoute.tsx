import { NavLink, redirect } from "react-router";
import Logo from "~/components/assets/logo.svg";
import { BookPlus } from "lucide-react";
import { Input } from "~/components/ui/input";
import PostCard from "~/components/homePageComponents/postCard";
import postData from "~/components/dummyData/postData";
import UserBannerCard from "~/components/userPageComponents/userBannerCard";
import type { postDataInterface } from "~/lib/interfaces";
import type { Route } from "./+types/userProfileRoute";
import { getUserId } from "~/.server/sessions";
import api from "~/lib/api";
import axios from "axios";

export async function loader({ request }: Route.LoaderArgs) {
  // Check if the user is already logged in
  const userId = await getUserId(request);
  if (!userId) {
    throw redirect("/");
  }

  try {
    const response = await api.get(`${process.env.API_KEY}/post/all`, {
      headers: {
        Authorization: `Bearer ${userId}`,
      },
    });

    console.log(response.data);
    console.log(response.data[10].author);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(" error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
  }
}

export default function UserProfilePage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="basis-[640px] flex flex-col gap-4">
      <UserBannerCard />

      {loaderData &&
        loaderData.map(
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
              />
            );
          }
        )}
    </div>
  );
}
