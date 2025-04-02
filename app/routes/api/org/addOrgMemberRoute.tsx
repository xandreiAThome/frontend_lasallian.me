import { redirect } from "react-router";
import type { Route } from "./+types/addOrgMemberRoute";
import api from "~/lib/api";
import axios from "axios";
import { getUserToken } from "~/.server/sessions";

export async function action({ request }: Route.ActionArgs) {
  const userToken = await getUserToken(request);
  if (!userToken) {
    throw redirect("/");
  }
}

export async function loader() {
  return redirect("/homepage");
}
