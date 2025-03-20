import { redirect } from "react-router";
import type { Route } from "./+types/editUserProfileRoute";
import api from "~/lib/api";
import axios from "axios";
import { getUserToken } from "~/.server/sessions";

export async function action({ request }: Route.ActionArgs) {
  const userToken = await getUserToken(request);
  if (!userToken) {
    throw redirect("/");
  }

  const formData = await request.formData();
  const JSONdata = formData.get("json");

  let profileImgLink = formData.get("profilepicURL")?.toString() || "";
  let coverImgLink = formData.get("coverpicURL")?.toString() || "";
  const profilePic = formData.get("profilepic");
  const coverPic = formData.get("coverpic");
  const profileImgFormData = new FormData();
  if (profilePic) {
    profileImgFormData.append("image", profilePic);

    const imgResp = await api.post(
      `${process.env.OSS_KEY}upload`,
      profileImgFormData,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("OSS resp: ", imgResp);
    profileImgLink = imgResp.data.image;
  }

  const coverImgFormData = new FormData();
  if (coverPic) {
    coverImgFormData.append("image", coverPic);

    const imgResp = await api.post(
      `${process.env.OSS_KEY}upload`,
      coverImgFormData,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("OSS resp: ", imgResp);
    coverImgLink = imgResp.data.image;
  }

  if (!JSONdata || typeof JSONdata !== "string") {
    throw new Error("Data is not jsonstring ");
  }
  const data = JSON.parse(JSONdata);
  const location = data.location;
  console.log("k", data.info);
  const vanity: { display_photo?: string; cover_photo?: string } = {};
  if (profileImgLink) {
    vanity.display_photo = profileImgLink;
  }
  if (coverImgLink) {
    vanity.cover_photo = coverImgLink;
  }
  try {
    // Send to your API endpoint
    const response = await api.put(
      `${process.env.API_KEY}/user`,
      {
        info: data.info,
        vanity: { display_photo: profileImgLink, cover_photo: coverImgLink },
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("API response:", response.data);

    // return redirect(location.pathname || "/homepage");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(" error:", error.response?.data || error.message);
    } else {
      console.log("Unexpected error:", error);
    }
  }
}

export async function loader() {
  return redirect("/homepage");
}
