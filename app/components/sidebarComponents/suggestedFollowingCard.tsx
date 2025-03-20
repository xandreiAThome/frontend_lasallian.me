import { Button } from "~/components/ui/button";
import { useNavigate } from "react-router";
import profileImgDefault from "~/components/assets/profile.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface followingData {
  name: string;
  userName: string;
  profile: string;
}

export default function SuggestedFollowingCard({
  name,
  userName,
  profile,
}: followingData) {
  const navigate = useNavigate();
  return (
    <div className="flex p-2 items-center">
      <button
        onClick={() => {
          navigate("/userprofile");
        }}
      >
        <Avatar className="w-10 h-10 mr-2">
          <AvatarImage alt="@shadcn" />
          <AvatarFallback className="flex flex-col bg-gray-300">
            <img src={profileImgDefault} alt="" />
          </AvatarFallback>
        </Avatar>
      </button>
      <div className="mr-2">
        <div className="flex flex-col items-start">
          <button
            onClick={() => {
              navigate("userprofile");
            }}
            className="text-base font-bold p-0 text-black"
          >
            {name}
          </button>
          <div className="text-sm text-gray-400">{userName}</div>
        </div>
      </div>
      <Button
        className="ml-auto text-lasalle-green text-base"
        variant={"ghost"}
      >
        + Follow
      </Button>
    </div>
  );
}
