import { Ellipsis } from "lucide-react";
import orgData from "~/components/dummyData/orgData";
import OrgCard from "./orgCard";

interface OrgData {
  img: string;
  orgName: string;
  position: string;
  positionColor: string;
  positionTextColor: string;
  subPosition: string;
  subPositionColor: string;
}

export default function OrgSideBarCard() {
  return (
    <div className="w-full bg-custom-postcard-white py-2 rounded-lg">
      <div className="flex justify-between pb-2 px-4">
        <h3 className="text-sm">
          <span className="font-bold text-gray-500">Your </span>
          <span className="text-gray-400">organizations...</span>
        </h3>
        <button>
          <Ellipsis className="text-gray-400" />
        </button>
      </div>
      <hr />
      <div className="flex flex-col">
        {orgData.map(
          ({
            img,
            orgName,
            position,
            positionColor,
            positionTextColor,
            subPosition,
            subPositionColor,
          }: OrgData) => {
            console.log(img);
            return (
              <>
                <OrgCard
                  img={img}
                  orgName={orgName}
                  position={position}
                  positionColor={positionColor}
                  positionTextColor={positionTextColor}
                  subPosition={subPosition}
                  subPositionColor={subPositionColor}
                />
                <hr />
              </>
            );
          }
        )}
      </div>
    </div>
  );
}
