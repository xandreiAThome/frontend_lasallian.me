import { Button } from "~/components/ui/button";
import { useNavigate } from "react-router";

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
        <img
          src={profile}
          alt="profile"
          width="36"
          height="36"
          className="rounded-full mr-4"
        />
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
