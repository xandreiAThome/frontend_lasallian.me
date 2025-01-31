import { Ellipsis } from "lucide-react";

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
  return (
    <div className="flex p-4 items-center">
      <img
        src={img}
        alt="logo"
        width="50"
        height="50"
        className="mr-6 rounded-full"
      />
      <div className="mr-2">
        <h1 className="text-lg font-bold">{orgName}</h1>
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
