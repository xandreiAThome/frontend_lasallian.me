import { useState } from "react";
import type { badgeInterface } from "~/lib/interfaces";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import {
  ChevronDown,
} from "lucide-react";

type BadgeDropDownProps = {
    badgeIds: badgeInterface[];
    callback: (selectedBadgeId: string) => void;  // To let the parent know which badge is selected
    defaultSelected?: string;
}

export default function BadgeDropDown({
    badgeIds,
    callback,
    defaultSelected,
}: BadgeDropDownProps) {
    const [selectedBadge, setSelectedBadge] = useState<string>(defaultSelected ? defaultSelected : "")

    // Find the selected badge, if any, to apply the same styles to the "No Badge" option
    const selectedBadgeData = badgeIds.find(badge => badge._id === selectedBadge);
    const selectedBadgeDisplay = selectedBadgeData ? (
      <>
      <p
        style={{ backgroundColor: selectedBadgeData.main_color, color: selectedBadgeData.main_text_color }}
        className="text-xs font-semibold px-2"
      >
        {selectedBadgeData.main_title}
      </p>
      <p
        style={{ backgroundColor: selectedBadgeData.sub_color, color: selectedBadgeData.sub_text_color }}
        className="text-xs font-semibold px-2"
      >
        {selectedBadgeData.sub_title}
      </p>
      </>
     ) : (<p className="text-xs font-semibold px-2 text-center text-gray-500">No Badge</p>);

    const badgeDIVS = badgeIds.map(
        ({ _id, main_title, sub_title, main_color, sub_color, main_text_color, sub_text_color }: badgeInterface) => {
            return (
              <DropdownMenuRadioItem value={`${_id}`}>
                <p
                  style={{ backgroundColor: main_color, color: main_text_color }}
                  className="text-xs font-semibold px-2"
                >
                  {main_title}
                </p>
                <p
                  style={{ backgroundColor: sub_color, color: sub_text_color }}
                  className="text-xs font-semibold px-2"
                >
                  {sub_title}
                </p>
              </DropdownMenuRadioItem>
            );
        }
    )

    const handleBadgeChange = (selectedBadgeId: string) => {
      setSelectedBadge(selectedBadgeId);
      callback(selectedBadgeId);
    }

    return (
        <>
        {selectedBadgeDisplay}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button type="button">
              <ChevronDown className="font-extrabold" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Your Badges</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioItem value="" key="" onSelect={() => handleBadgeChange("")}>
            <p className="text-xs font-semibold px-2 text-center text-gray-500">No Badge</p>
          </DropdownMenuRadioItem>
            <DropdownMenuRadioGroup
              value={selectedBadge}
              onValueChange={handleBadgeChange}
            >
              {badgeDIVS}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        </>
    )
}