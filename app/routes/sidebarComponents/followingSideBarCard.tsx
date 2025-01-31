import { Divide, Ellipsis } from "lucide-react";
import orgData from "~/components/dummyData/orgData";
import OrgCard from "./orgCard";
import suggestedFollower from "~/components/dummyData/suggestedFollower";
import SuggestedFollowingCard from "./suggestedFollowingCard";

interface followingData {
  name: string;
  userName: string;
}

export default function FollowingSideBar() {
  return (
    <div className="w-full bg-custom-postcard-white py-2 rounded-lg">
      <div className="flex justify-between pb-2 px-4">
        <h3 className="text-sm">
          <span className="font-bold text-gray-500">Your </span>
          <span className="text-gray-400">suggested following</span>
        </h3>
      </div>
      <hr />
      <div className="flex flex-col">
        {suggestedFollower.map(({ name, userName }: followingData) => {
          return (
            <>
              <SuggestedFollowingCard name={name} userName={userName} />
              <hr />
            </>
          );
        })}
      </div>
    </div>
  );
}
