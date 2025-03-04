import { Ellipsis } from "lucide-react";
import { useNavigate } from "react-router";

interface Props {
  img: string;
  orgName: string;
  position: string;
  positionColor: string;
  positionTextColor: string;
  subPosition: string;
  subPositionColor: string;
}
// TODO
export default function OrgCard({
  img,
  orgName,
  position,
  positionColor,
  positionTextColor,
  subPosition,
  subPositionColor,
}: Props) {
  const navigate = useNavigate();
  return (
    <div className="flex p-4 items-center">
      <img
        src={img}
        alt="logo"
        sizes="50"
        className="rounded-full hover:cursor-pointer mr-6"
        onClick={() => {
          navigate("orgprofile");
        }}
      />

      <div className="mr-2">
        <button
          onClick={() => {
            navigate("orgprofile");
          }}
          className="text-lg font-bold text-justify"
        >
          {orgName}
        </button>
        <div className="flex ">
          <div
            style={{ color: positionTextColor, backgroundColor: positionColor }}
            className="px-1 text-sm font-bold"
          >
            {position}
          </div>
          <div
            style={{ color: subPositionColor }}
            className="bg-gray-600 px-1 text-sm font-bold"
          >
            {subPosition}
          </div>
        </div>
      </div>
      <button className="ml-auto">
        <Ellipsis className="text-gray-400" />
      </button>
    </div>
  );
}
