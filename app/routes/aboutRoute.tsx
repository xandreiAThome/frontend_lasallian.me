import { Link2, Undo2 } from "lucide-react";
import { Link, useNavigate, useNavigation } from "react-router";
import Logo from "~/components/assets/logo.svg";
import { Button } from "~/components/ui/button";
import ej from "~/components/assets/ej.jpg";
import adrian from "~/components/assets/adrian.jpg";
import xan from "~/components/assets/xan.jpg";

export default function AboutRoute() {
  const navigation = useNavigation();
  return (
    <div
      className={`h-full flex flex-col animate-fade-in ${
        navigation.state === "loading" ? "animate-fade-out" : ""
      }`}
    >
      <header className="shadow-md py-4 px-12 flex justify-between ">
        <img src={Logo} alt="logo" className="h-12" />
        <Link
          className="text-lasalle-green text-lg flex items-center gap-2 hover:text-green-500"
          to="/homepage"
        >
          <Undo2 />
        </Link>
      </header>
      <main className="flex-1 flex justify-center flex-col items-center gap-12">
        <div>
          <h1 className="text-6xl text-lasalle-green">
            lasallian.
            <span className="font-medium text-lasalle-dark-green">me </span>
            team
          </h1>
          {/* <h2 className="text-lasalle-green text-4xl">Team</h2> */}
          <h3 className="text-lasalle-green text-xl">
            Delivering{" "}
            <span className="font-medium text-lasalle-dark-green">YOUR</span>{" "}
            Lasallian experience.
          </h3>
        </div>
        <div className="flex gap-24 mb-24">
          <div className="flex items-center flex-col justify-center">
            <img
              src="https://media.licdn.com/dms/image/v2/D5603AQGX6mTlbYpJ1Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1724656907827?e=1747267200&v=beta&t=VnfeoHxGRvQwIyouMRySHDt4MaUMFW9VLHAztYJrPds"
              alt=""
              className="rounded-full h-40 mb-4"
            />
            <p className="text-lasalle-dark-green text-xl font-bold">
              Sean Denzel Robenta
            </p>
            <p className="text-lasalle-green text-xl">UI/UX Lead</p>
          </div>
          <div className="flex items-center flex-col justify-center">
            <img src={ej} alt="" className="rounded-full h-40 mb-4" />
            <p className="text-lasalle-dark-green text-xl font-bold">
              Edwin Sadiarin Jr.
            </p>
            <p className="text-lasalle-green text-xl">Backend Lead</p>
          </div>
          <div className="flex items-center flex-col justify-center">
            <img src={xan} alt="" className="rounded-full h-40 mb-4" />
            <p className="text-lasalle-dark-green text-xl font-bold">
              Ellexandrei Esponilla
            </p>
            <p className="text-lasalle-green text-xl">Frontend Lead</p>
          </div>
          <div className="flex items-center flex-col justify-center">
            <img src={adrian} alt="" className="rounded-full h-40 mb-4" />
            <p className="text-lasalle-dark-green text-xl font-bold">
              Adrian Rafael Bernandino
            </p>
            <p className="text-lasalle-green text-xl">Fullstack Developer</p>
          </div>
        </div>
        <a
          href="https://zel.kim/refs"
          className="text-3xl text-lasalle-green border-b-2 border-lasalle-green hover:border-green-500 hover:text-green-500 flex items-center gap-2"
        >
          <Link2 />
          References
        </a>
      </main>
      <footer className="">
        <p className="text-center p-2 text-gray-400">
          lasallian.me. All Rights Reserved, 2025.
        </p>
      </footer>
    </div>
  );
}
