import { useEffect, useState } from "react";
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
    badgeIds: string[];
}

export default function BadgeDropDown({
    badgeIds
}: BadgeDropDownProps) {

    const [badges, setBadges] = useState<badgeInterface[]>([])
    const [selectedBadge, setSelectedBadge] = useState<string>()

    const fetchBadgeData = async () => {
        try {
            const response = await fetch(`${process.env.API_KEY}/badge/array`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ids: badgeIds }), // Send the array of badge IDs in the request body
            });

            if (!response.ok) {
                throw new Error('Failed to fetch badge')
            }

            const data = await response.json();
            setBadges(data.badge);
        } catch (err) {
            console.error('Failed to fetch badges. Please try again.');
        }
    };

    useEffect(() => {
        fetchBadgeData();
    }, []);

    const badgeDIVS = badges.map(
        ({ main_title, sub_title, main_color, sub_color }: badgeInterface) => {
            return (
              <DropdownMenuRadioItem value={`${main_title}+${sub_title}`}>
                <p
                  style={{ backgroundColor: main_color }}
                  className=" text-white text-xs font-semibold px-2"
                >
                  {main_title}
                </p>
                <p
                  style={{ backgroundColor: sub_color }}
                  className=" text-white text-xs font-semibold px-2"
                >
                  {sub_title}
                </p>
              </DropdownMenuRadioItem>
            );
        }
    )

    return (
        <>
        <p className="px-2 bg-[#220088] text-white text-xs font-semibold">
                    Select
                  </p>
                  <p className="px-2 bg-[#313131] text-white text-xs font-semibold mr-2">
                    Badge
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
                      <DropdownMenuRadioGroup
                        value={selectedBadge}
                        onValueChange={setSelectedBadge}
                      >
                        {badgeDIVS}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  </>
    )
}