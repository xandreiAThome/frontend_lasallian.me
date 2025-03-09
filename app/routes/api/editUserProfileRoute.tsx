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

  if (!JSONdata || typeof JSONdata !== "string") {
    throw new Error("Data is not jsonstring ");
  }
  const data = JSON.parse(JSONdata);
  const location = data.location;
  console.log("k", data.info);
  try {
    // Send to your API endpoint
    const response = await api.put(
      `${process.env.API_KEY}/user`,
      { info: data.info },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("API response:", response.data);

    return redirect(location.pathname || "/homepage");
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
