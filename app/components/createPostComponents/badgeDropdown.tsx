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
}

export default function BadgeDropDown({
    badgeIds,
    callback,
}: BadgeDropDownProps) {
    const [selectedBadge, setSelectedBadge] = useState<string>()

    const badgeDIVS = badgeIds.map(
        ({ main_title, sub_title, main_color, sub_color, main_text_color, sub_text_color }: badgeInterface) => {
            return (
              <DropdownMenuRadioItem value={`${main_title}+${sub_title}`}>
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
        <p
          className={`px-2 text-white text-xs font-semibold ${
            selectedBadge ? 'bg-[#220088]' : 'bg-[#313131]'
          }`}
        >
          {selectedBadge ? selectedBadge : 'Select'}
        </p>
        <p
          className={`px-2 text-white text-xs font-semibold mr-2 ${
            selectedBadge ? 'bg-[#220088]' : 'bg-[#313131]'
          }`}
        >
          {selectedBadge ? 'Badge' : 'Badge'}
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button type="button">
              <ChevronDown className="font-extrabold" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Your Badges</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioItem value="" onSelect={() => handleBadgeChange("")}>
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