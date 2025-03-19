import { redirect } from "react-router";
import type { Route } from "./+types/deleteReactionPost";
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
    const postId = formData.get("postId") as string;

    // Send to your API endpoint
    const response = await api.delete(`${process.env.API_KEY}/reaction/post`, {
      data: { postid: postId },
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    console.log("API response:", response.data);
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
