import { redirect } from "react-router";
import type { Route } from "./+types/createPostRoute";
import api from "~/lib/api";
import axios from "axios";
import { getUserToken } from "~/.server/sessions";

export async function loader() {
  return redirect("/homepage");
}

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

  try {
    // Parse the JSON string into an object
    const postData = JSON.parse(data);

    console.log("Form data:", postData);

    // Send to your API endpoint
    const response = await api.post(`${process.env.API_KEY}/post`, postData, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    });

    console.log("API response:", response.data);

    return redirect("/homepage");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(" error:", error.response?.data || error.message);
    } else {
      console.log("Unexpected error:", error);
    }
  }
}
