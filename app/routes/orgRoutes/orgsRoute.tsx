import { Link, useLoaderData } from "react-router";
import type { Route } from "./+types/orgsRoute";
import api from "~/lib/api";
import { getUserObject, getUserToken } from "~/.server/sessions";
import axios from "axios";
import type { orgDataInterface } from "~/lib/interfaces";
import { useEffect, useState } from "react";

export async function loader({ request }: Route.LoaderArgs) {
  // Check if the user is already logged in
  const userToken = await getUserToken(request);
  const userObj = await getUserObject(request);
  // console.log("jaengibg", userObj);
  // if (!userToken) {
  //   throw redirect("/");
  // }

  try {
    const response = await api.get(`${process.env.API_KEY}/user/orgs`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    console.log(response.data.organizations);

    return {
      orgs: response.data.organizations,
      loggedInUserId: userObj?._id,
      user: userObj,
      userToken: userToken,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(" error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
  }
  return { loggedInUserId: userObj?._id, user: userObj, userToken: userToken };
}

export default function OrgRoute({ loaderData }: Route.ComponentProps) {
  return (
    <div className="basis-[640px] flex flex-col gap-4 animate-fade-in">
      <div className="pt-12">
        <h1 className="text-3xl text-lasalle-green pb-4">
          <span className="text-lasalle-dark-green font-bold">Your</span>{" "}
          organizations
        </h1>

        <div className="flex flex-wrap gap-8 gap-y-8">
          {loaderData?.orgs &&
            loaderData.orgs.map((props: orgDataInterface) => {
              return <OrgCard {...props} />;
            })}
        </div>
      </div>
    </div>
  );
}

function OrgCard({ info, vanity, _id }: orgDataInterface) {
  const [coverImg, setCoverImg] = useState<string | null>(null);
  const loaderData = useLoaderData();
  useEffect(() => {
    async function getImg() {
      if (vanity.display_photo) {
        try {
          const response = await fetch(`${vanity.cover_photo}`, {
            headers: {
              Authorization: `Bearer ${loaderData.userToken}`,
            },
            method: "get",
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const blob = await response.blob();
          setCoverImg(URL.createObjectURL(blob));
        } catch (error) {
          console.log("error:", error);
        }
      }
    }
    getImg();
  }, [vanity.display_photo]);

  return (
    <div className="w-64 bg-custom-postcard-white h-44 rounded-xl">
      <Link to={`/orgprofile/${_id}`}>
        <div className="w-64 h-24 bg-gray-300">
          <img src={coverImg ?? ""} alt="" />
        </div>
        <div className="p-2">
          <h1 className="text-lasalle-green font-semibold text-md">
            {info.name}
          </h1>
          <p className="text-gray-500 text-xs">{info.bio}</p>
        </div>
      </Link>
    </div>
  );
}
