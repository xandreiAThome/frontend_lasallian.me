import { useEffect, useState } from "react";
import { Form, Link, NavLink, useLoaderData } from "react-router";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import logo from "~/components/assets/logo.svg";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { cn } from "~/lib/utils";
import CreateButton from "../createPostComponents/CreateButton";

export default function MobileNav() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const loaderData = useLoaderData();

  useEffect(() => {
    const control = () => {
      console.log("Scroll event triggered");
    };

    window.addEventListener("scroll", control);

    return () => {
      window.removeEventListener("scroll", control);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-white border-b transition-transform duration-300 ease-in-out md:hidden",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <img className="ml-2 h-8" src={logo} alt="" />
        </div>

        {/* Mobile Menu */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
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
                    to="/orgs"
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
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
