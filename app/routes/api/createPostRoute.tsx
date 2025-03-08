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
  const JSONdata = formData.get("json");

  if (!JSONdata || typeof JSONdata !== "string") {
    throw new Error("Data is not jsonstring ");
  }
  const data = JSON.parse(JSONdata);

  try {
    // Parse the JSON string into an object

    const postData = data.content;
    const location = data.location;
    // console.log("Form data:", postData);
    console.log("location", location);

    // Send to your API endpoint
    const response = await api.post(
      `${process.env.API_KEY}/post`,
      { content: postData },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("API response:", response.data);
    return redirect(location.pathname);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(" error:", error.response?.data || error.message);
    } else {
      console.log("Unexpected error:", error);
    }
  }
  return redirect("/homepage");
}

export async function loader() {
  return redirect("/homepage");
}
