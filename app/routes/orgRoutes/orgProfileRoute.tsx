import postData from "~/components/dummyData/postData";
import OrgBannerCard from "~/components/userPageComponents/orgBannerCard";
import type { Route } from "./+types/orgProfileRoute";
import OrgPostCard from "~/components/homePageComponents/orgPostCard";
import api from "~/lib/api";
import { getUserObject, getUserToken } from "~/.server/sessions";
import axios from "axios";
import type { orgDataInterface } from "~/lib/interfaces";

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

export async function loader({ request, params }: Route.LoaderArgs) {
  const userToken = await getUserToken(request);
  const userCookieObj = await getUserObject(request);
  try {
    const response = await api.get(
      `${process.env.API_KEY}/org/${params.orgId}`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    console.log(response.data);

    return {
      orgProfile: response.data.data,
      userToken: userToken,
      user: userCookieObj,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(" error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    return { user: userCookieObj, userToken: userToken }; // Return a default value in case of error
  }
}

export default function OrgProfilePage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="basis-[640px] flex flex-col gap-4 animate-fade-in">
      <OrgBannerCard {...loaderData.orgProfile} />
    </div>
  );
}
