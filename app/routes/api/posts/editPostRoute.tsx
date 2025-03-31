import { redirect } from "react-router";
import type { Route } from "./+types/editPostRoute";
import api from "~/lib/api";
import axios from "axios";
import { getUserToken } from "~/.server/sessions";

export async function action({ request }: Route.ActionArgs) {
  const userToken = await getUserToken(request);
  if (!userToken) {
    throw redirect("/");
  }

  const formData = await request.formData();
  const data = formData.get("json");

  if (!data || typeof data !== "string") {
    throw new Error("Data is not jsonstring ");
  }
  const postData = JSON.parse(data);

  const editPostData = {
    content: postData.content,
    title: "title",
  };

  // console.log("Form data:", editPostData);

  try {
    // Send to your API endpoint
    const response = await api.put(
      `${process.env.API_KEY}/post/${postData.id}`,
      editPostData,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("API response:", response.data);

    // return redirect(postData.location.pathname);
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
