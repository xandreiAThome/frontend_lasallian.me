import { redirect, useSearchParams } from "react-router";
import type { Route } from "./+types/searchRoute";
import { getUserToken } from "~/.server/sessions";

export async function loader({ request }: Route.ActionArgs) {
  const userToken = await getUserToken(request);
  if (!userToken) {
    throw redirect("/");
  }

  const url = new URL(request.url);
  const query = url.searchParams.get("q");
  console.log("data: ", query);
}

export default function Search() {
  return (
    <>
      <div>HELLO SERACH</div>
    </>
  );
}
