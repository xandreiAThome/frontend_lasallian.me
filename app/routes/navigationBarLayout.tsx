import { NavLink, Outlet, redirect } from "react-router";
import Logo from "~/components/assets/logo.svg";
import { Button } from "~/components/ui/button";
import OrgSideBarCard from "./sidebarComponents/orgSideBarCard";
import FollowingSideBar from "./sidebarComponents/followingSideBarCard";
import CreateButton from "~/routes/createpost/CreateButton";

export default function NavBar() {
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
                to="/userprofile"
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
                to="/todo"
              >
                Settings
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
                Logout
              </NavLink>
            </li>{" "}
            <CreateButton />
          </ul>
        </div>
      </nav>

      <main className="max-w-[640px] flex-1">
        <Outlet />
      </main>

      <div className="basis-96 bg-custom-bg-white hidden md:flex md:flex-col py-8 gap-6 sticky top-0 self-start">
        <OrgSideBarCard />
        <FollowingSideBar />
        <p className="text-gray-400 text-center">
          lasallian.<span className="font-bold">me</span> • All Rights Reserved
          2025{" "}
        </p>
      </div>
    </div>
  );
}
