import { Link } from "react-router";

export default function OrgRoute() {
  return (
    <div className="basis-[640px] flex flex-col gap-4 animate-fade-in">
      <div className="pt-12">
        <h1 className="text-3xl text-lasalle-green pb-4">
          <span className="text-lasalle-dark-green font-bold">Your</span>{" "}
          organizations
        </h1>

        <div className="w-64 bg-custom-postcard-white h-60 rounded-xl">
          <Link to={"/orgprofile"}>
            <div className="w-64 h-40"></div>
            <div className="p-2">
              <h1 className="text-lasalle-green font-semibold text-md">
                La Salle Computer Society
              </h1>
              <p className="text-gray-500 text-xs">
                Living Yesterday's Vision; Setting Today's
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
