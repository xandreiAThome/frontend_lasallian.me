import { useState } from "react";
import type { badgeInterface } from "~/lib/interfaces";

type BadgeIconProps = {
    badgeInfo: badgeInterface[];
}

export default function BadgeIcon({
    badgeInfo
}: BadgeIconProps) {
    const [hoveredBadge, setHoveredBadge] = useState<string | null>(null);
    return (
        <>
        {badgeInfo.map((badge) => {
            return (
                <div
                    className="relative"
                    key={badge._id}
                    onMouseOver={() => setHoveredBadge(badge._id)}
                    onMouseOut={() => setHoveredBadge(null)}
                >
                    <p className="">
                    <span className={`px-2 text-sm font-semibold`}
                            style={{ backgroundColor: badge.main_color, color: badge.main_text_color}}>
                        {badge.main_title}
                    </span>
                    <span className={`px-2 bg-[${badge.sub_color}] text-sm font-semibold`}
                            style={{ backgroundColor: badge.sub_color, color: badge.sub_text_color}}>
                        {badge.sub_title}
                    </span>
                    </p>
                    {hoveredBadge === badge._id && (
                        <div
                            className="absolute top-0 left-0 mt-2 px-2 text-sm font-semibold border rounded shadow-lg z-10"
                            style={{
                                backgroundColor: badge.main_color,
                                color: badge.main_text_color,
                                maxWidth: "500px"
                            }}
                        >
                        <p>{badge.description}</p>
                        </div>
                    )}
                </div>
            )
        })}
        </>
    )
}
