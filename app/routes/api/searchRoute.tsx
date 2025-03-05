import { useSearchParams } from "react-router";
import type { Route } from "./+types/searchRoute";

export async function loader({ request }: Route.ActionArgs) {
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
