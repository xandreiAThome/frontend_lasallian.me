import { Button } from "~/components/ui/button";

interface followingData {
  name: string;
  userName: string;
}

export default function SuggestedFollowingCard({
  name,
  userName,
}: followingData) {
  return (
    <div className="flex p-2 items-center">
      <img
        src="https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"
        alt="logo"
        width="36"
        height="36"
        className="mx-2 rounded-full"
      />
      <div className="mr-2">
        <div className="flex flex-col">
          <h1 className="text-base font-bold">{name}</h1>
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
