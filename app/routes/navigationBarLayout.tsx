import { Search } from "lucide-react";
import {
  Form,
  NavLink,
  Outlet,
  redirect,
  useLocation,
  useNavigation,
} from "react-router";
import { getUserId, getUserObject, getUserToken } from "~/.server/sessions";
import Logo from "~/components/assets/logo.svg";
import CreateButton from "~/components/createPostComponents/CreateButton";
import FollowingSideBar from "~/components/sidebarComponents/followingSideBarCard";
import OrgSideBarCard from "~/components/sidebarComponents/orgSideBarCard";
import { Input } from "~/components/ui/input";
import type { Route } from "./+types/navigationBarLayout";

export async function loader({ request }: Route.LoaderArgs) {
  // Check if the user is already logged in
  const userToken = await getUserToken(request);
  const user = await getUserObject(request);
  if (!userToken) {
    throw redirect("/");
  }
  const userId = await getUserId(request);
  // console.log("ahuwegba", userId);
  return { loggedInUserId: userId, user: user, userToken: userToken };
}

export default function NavBar({ loaderData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const location = useLocation();

  return (
    <div className="flex h-full bg-custom-bg-white justify-evenly gap-2 overflow-y-auto">
      <nav className="max-w-96 hidden lg:flex py-8 flex-col items-end sticky top-0">
        <img src={Logo} alt="logo" className="h-12" />
        <div>
          <ul className="text-2xl flex flex-col items-start gap-4 font-medium mt-32">
            <li className="hover:bg-slate-200 hover:rounded-2xl">
              <NavLink
                className={({ isActive, isPending, isTransitioning }) =>
                  [
                    isActive ? "text-lasalle-green" : "",
                    "hover:bg-slate-200 hover:rounded-2xl px-4 py-1 transition-all",
                  ].join(" ")
                }
                to="/homepage"
              >
                Feed
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive, isPending, isTransitioning }) =>
                  [
                    isActive ? "text-lasalle-green" : "",
                    "hover:bg-slate-200 hover:rounded-2xl px-4 py-1 transition-all",
                  ].join(" ")
                }
                to={`/userprofile/${loaderData.loggedInUserId}`}
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive, isPending, isTransitioning }) =>
                  [
                    isActive ? "text-lasalle-green" : "",
                    "hover:bg-slate-200 hover:rounded-2xl px-4 py-1 transition-all",
                  ].join(" ")
                }
                to="/todo"
              >
                Notifications
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive, isPending, isTransitioning }) =>
                  [
                    isActive ? "text-lasalle-green" : "",
                    "hover:bg-slate-200 hover:rounded-2xl px-4 py-1 transition-all",
                  ].join(" ")
                }
                to="/orgprofile"
              >
                Organizations
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive, isPending, isTransitioning }) =>
                  [
                    isActive ? "text-lasalle-green" : "",
                    "hover:bg-slate-200 hover:rounded-2xl px-4 py-1 transition-all",
                  ].join(" ")
                }
                to="/todo"
              >
                Messages
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive, isPending, isTransitioning }) =>
                  [
                    isActive ? "text-lasalle-green" : "",
                    "hover:bg-slate-200 hover:rounded-2xl px-4 py-1 transition-all",
                  ].join(" ")
                }
                to="/about"
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive, isPending, isTransitioning }) =>
                  [
                    isActive ? "text-lasalle-green" : "",
                    "hover:bg-slate-200 hover:rounded-2xl px-4 py-1 transition-all",
                  ].join(" ")
                }
                to="/todo"
              >
                Settings
              </NavLink>
            </li>
            <li>
              <Form
                action="/logout"
                method="post"
                className="flex px-4 hover:bg-slate-200 hover:rounded-2xl"
              >
                <button type="submit">Logout</button>
              </Form>
            </li>
            <CreateButton />
          </ul>
        </div>
      </nav>

      <main
        className={`max-w-[640px] w-full ${
          navigation.state === "loading" ? "animate-fade-out" : ""
        }`}
      >
        <Outlet />
      </main>

      <div className="basis-96 bg-custom-bg-white hidden md:flex md:flex-col py-8 gap-6 sticky top-0 self-start">
        {location.pathname !== "/createorg" && (
          <>
            <Form method="get" action="/search">
              <div className="flex relative">
                <Input
                  type="text"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      e.currentTarget.form?.requestSubmit();
                    }
                  }}
                  className="bg-custom-postcard-white pl-12 max-w-full rounded-3xl h-11"
                  placeholder="Search..."
                  required
                  name="query"
                ></Input>
                <button type="submit">
                  <Search className="absolute top-0 bottom-0 m-auto left-4 text-gray-500" />
                </button>
              </div>
            </Form>

            <OrgSideBarCard />
            <FollowingSideBar />
            <p className="text-gray-400 text-center">
              lasallian.<span className="font-bold">me</span> • All Rights
              Reserved 2025{" "}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
