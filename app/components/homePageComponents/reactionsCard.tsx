import { Heart } from "lucide-react";
import { useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";

interface ReactionsCardProps {
  reactions: number;
}

export default function ReactionsCard({ reactions }: ReactionsCardProps) {
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
  return (
    <>
      <HoverCard open={open} onOpenChange={setOpen}>
        <HoverCardTrigger
          className="flex items-center hover:bg-slate-200 px-2 hover:rounded-md cursor-pointer"
          onClick={() => {
            reaction ? setReaction("") : setReaction("❤️");
          }}
        >
          <p className="mr-2 ">
            {reaction ? (
              <p className="text-xl">{reaction}</p>
            ) : (
              <Heart className="h-[28px] w-[27.45px]" />
            )}
          </p>
          <p className="text-sm">
            <span className="font-bold">{formatter.format(reactions)} </span>
            reactions
          </p>
        </HoverCardTrigger>
        <HoverCardContent side="top" className="flex gap-2 justify-center">
          {reactionsList.map(({ name, emoji }) => {
            return (
              <button
                className="text-2xl transition-all hover:scale-125"
                onClick={() => {
                  setReaction(emoji);
                  setOpen(false);
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
