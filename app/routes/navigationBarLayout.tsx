import { NavLink, Outlet, redirect } from "react-router";
import Logo from "~/components/assets/logo.svg";
import { Button } from "~/components/ui/button";
import OrgSideBarCard from "./sidebarComponents/orgSideBarCard";

export default function NavBar() {
  return (
    <div className="flex h-full bg-custom-bg-white justify-center gap-12">
      <nav className="w-96hidden lg:block p-8">
        <img src={Logo} alt="logo" className="h-16 ml-2" />
        <div>
          <ul className="text-2xl flex flex-col items-start gap-4 font-medium mt-32">
            <li className="hover:bg-slate-200 hover:rounded-2xl">
              <NavLink
                className={({ isActive, isPending, isTransitioning }) =>
                  [
                    isActive ? "text-lasalle-green" : "",
                    "hover:bg-slate-200 hover:rounded-2xl px-2 py-1",
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
                    "hover:bg-slate-200 hover:rounded-2xl px-2 py-1",
                  ].join(" ")
                }
                to="/homepage"
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive, isPending, isTransitioning }) =>
                  [
                    isActive ? "text-lasalle-green" : "",
                    "hover:bg-slate-200 hover:rounded-2xl px-2 py-1",
                  ].join(" ")
                }
                to="/homepage"
              >
                Notifications
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive, isPending, isTransitioning }) =>
                  [
                    isActive ? "text-lasalle-green" : "",
                    "hover:bg-slate-200 hover:rounded-2xl px-2 py-1",
                  ].join(" ")
                }
                to="/homepage"
              >
                Organizations
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive, isPending, isTransitioning }) =>
                  [
                    isActive ? "text-lasalle-green" : "",
                    "hover:bg-slate-200 hover:rounded-2xl px-2 py-1",
                  ].join(" ")
                }
                to="/homepage"
              >
                Messages
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive, isPending, isTransitioning }) =>
                  [
                    isActive ? "text-lasalle-green" : "",
                    "hover:bg-slate-200 hover:rounded-2xl px-2 py-1",
                  ].join(" ")
                }
                to="/homepage"
              >
                Settings
              </NavLink>
            </li>
            <li className="hover:bg-slate-200 hover:rounded-2xl px-2 py-1">
              Logout
            </li>{" "}
            <Button className="bg-lasalle-green rounded-3xl text-lg h-12 px-12">
              + Create
            </Button>
          </ul>
        </div>
      </nav>

      <main className="">
        <Outlet />
      </main>

      <div className="w-96 bg-custom-bg-white hidden md:block p-8">
        <OrgSideBarCard />
      </div>
    </div>
  );
}
