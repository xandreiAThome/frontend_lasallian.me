import { Heart } from "lucide-react";
import { useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";

interface ReactionsCardProps {
  reactions: number;
  position?: "top" | "right" | "bottom" | "left";
}

export default function ReactionsPostCard({
  reactions,
  position,
}: ReactionsCardProps) {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  const [open, setOpen] = useState(false);
  const reactionsList = [
    { name: "heart", emoji: "❤️" },
    { name: "clap", emoji: "👏" },
    { name: "laugh", emoji: "😂" },
    { name: "sad", emoji: "😢" },
    { name: "angry", emoji: "😡" },
  ];
  const [reaction, setReaction] = useState("");

  function handleReaction(emoji: string) {
    setReaction(emoji);
    setOpen(false);
  }

  function handleDefaultReaction() {
    reaction ? setReaction("") : setReaction("❤️");
  }
  return (
    <>
      <HoverCard open={open} onOpenChange={setOpen}>
        <HoverCardTrigger
          className="flex items-center hover:bg-slate-200 px-2 hover:rounded-md cursor-pointer"
          onClick={handleDefaultReaction}
        >
          <p className="mr-2 ">
            {reaction ? (
              <p className="text-xl">{reaction}</p>
            ) : (
              <Heart className="h-[28px] w-[27.45px]" />
            )}
          </p>
          <button type="button" className="text-sm">
            <span className="font-bold">{formatter.format(reactions)} </span>
            reactions
          </button>
        </HoverCardTrigger>
        <HoverCardContent
          side={position ?? "top"}
          className="flex gap-2 justify-center z-[1000] overflow-visible"
        >
          {reactionsList.map(({ name, emoji }) => {
            return (
              <button
                className="text-2xl transition-all hover:scale-125"
                onClick={() => {
                  handleReaction(emoji);
                }}
              >
                {emoji}
              </button>
            );
          })}
        </HoverCardContent>
      </HoverCard>
    </>
  );
}
