import { BookPlus } from "lucide-react";
import PostCard from "~/components/homePageComponents/postCard";
import axios from "axios";
import api from "~/lib/api";
import profileImg from "~/components/assets/profile.jpg";
import type { Route } from "./+types/homePageRoute";
import { getUserObject, getUserToken } from "~/.server/sessions";
import type { postDataInterface } from "~/lib/interfaces";
import CreatePostButton from "~/components/createPostComponents/CreatePostDialog";

export async function loader({ request }: Route.LoaderArgs) {
  // Check if the user is already logged in
  const userToken = await getUserToken(request);
  const userObj = await getUserObject(request);
  // console.log("jaengibg", userObj);
  // if (!userToken) {
  //   throw redirect("/");
  // }

  try {
    const response = await api.get(`${process.env.API_KEY}/post/all`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    // console.log(response.data);
    // console.log("????", response.data[10].author);
    return {
      postData: response.data,
      loggedInUserId: userObj?._id,
      user: userObj,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(" error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
  }
}

export default function HomePage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="basis-[640px] pt-6 flex flex-col gap-4 animate-fade-in">
      <div className="bg-custom-postcard-white flex items-center px-6 rounded-xl py-4 shadow-lg w-full">
        <img
          alt="profile"
          width="42"
          height="42"
          className="rounded-full mr-4"
          src={
            loaderData?.user?.vanity?.display_photo
              ? loaderData?.user.vanity.display_photo
              : profileImg
          }
        />

        <CreatePostButton
          buttonProp={
            <button className="hover:bg-slate-100 flex p-2 bg-gray-200 rounded-3xl text-base items-center px-4 w-full text-gray-500">
              <BookPlus className="mr-2" />
              <p>
                How's{" "}
                <span className="bg-bold text-gray-600 font-bold"> YOUR </span>{" "}
                day Lasallian Achiever?
              </p>
            </button>
          }
        />
      </div>
      {loaderData?.postData &&
        loaderData.postData.map((props: postDataInterface, index: number) => {
          return <PostCard {...props} />;
        })}
    </div>
  );
}
