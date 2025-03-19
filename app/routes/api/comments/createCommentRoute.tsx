import { redirect } from "react-router";
import api from "~/lib/api";
import axios from "axios";
import type { Route } from "./+types/createCommentRoute";
import { getUserToken } from "~/.server/sessions";

export async function action({ request }: Route.ActionArgs) {
  const userToken = await getUserToken(request);
  if (!userToken) {
    throw redirect("/");
  }

  const formData = await request.formData();
  console.log("data", formData);

  try {
    // Parse the JSON string into an object

    const content = formData.get("content");
    const post_id = formData.get("post_id");

    const location: string = (formData.get("location") as string) || "";

    // Send to your API endpoint
    const response = await api.post(
      `${process.env.API_KEY}/comment`,
      { content, post_id },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("API response:", response.data);

    // return redirect(location || "/homepage");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error:", error.response?.data || error.message);
    } else {
      console.log("Unexpected error:", error);
    }
  }
  // return redirect("/homepage");
}

export async function loader() {
  return redirect("/homepage");
}
