import { redirect } from "react-router";
import type { Route } from "./+types/editReactionComment";
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
    const commentId = formData.get("commentId") as string;
    const reaction = formData.get("reaction") as string;

    // Send to your API endpoint
    const response = await api.put(
      `${process.env.API_KEY}/reaction/comment`,
      { commentid: commentId, reaction: reaction },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("API response:", response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(" error:", error);
    } else {
      console.log("Unexpected error:", error);
    }
  }
}

export async function loader() {
  return redirect("/homepage");
}
