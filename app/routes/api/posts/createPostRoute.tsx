import { redirect } from "react-router";
import type { Route } from "./+types/createPostRoute";
import api from "~/lib/api";
import axios from "axios";
import { getUserToken } from "~/.server/sessions";

export async function action({ request }: Route.ActionArgs) {
  const userToken = await getUserToken(request);
  if (!userToken) {
    throw redirect("/");
  }

  const formData = await request.formData();

  try {
    // Parse the JSON string into an object

    const postData = formData.get("content");
    console.log(postData);
    const location: string = (formData.get("location") as string) || "";
    const image = formData.get("image");
    console.log("Form data:", formData);
    let imgLink: string | undefined;

    const imageFormData = new FormData();
    if (image) {
      imageFormData.append("image", image);

      const imgResp = await api.post(
        `${process.env.OSS_KEY}/upload`,
        imageFormData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("OSS resp: ", imgResp);
      imgLink = imgResp.data.image;
    }

    // Send to your API endpoint
    const response = await api.post(
      `${process.env.API_KEY}/post`,
      { content: { text: postData }, media: imgLink ? [imgLink] : [] },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("API response:", response.data);

    return redirect(location || "/homepage");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error:", error.response?.data || error.message);
    } else {
      console.log("Unexpected error:", error);
    }
  }
  return redirect("/homepage");
}

export async function loader() {
  return redirect("/homepage");
}
