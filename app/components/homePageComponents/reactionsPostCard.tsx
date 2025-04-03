import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useFetcher, useLocation } from "react-router";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import type { reactionPostInterface } from "~/lib/interfaces";

interface ReactionsCardProps {
  reactions: number;
  position?: "top" | "right" | "bottom" | "left";
  postId: string;
  currUserReact: reactionPostInterface | undefined;
}

export default function ReactionsPostCard({
  reactions,
  position,
  postId,
  currUserReact,
}: ReactionsCardProps) {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const reactionsList = [
    { name: "heart", emoji: "❤️" },
    { name: "clap", emoji: "👏" },
    { name: "laugh", emoji: "😂" },
    { name: "sad", emoji: "😢" },
    { name: "angry", emoji: "😡" },
  ];

  const [reaction, setReaction] = useState(
    currUserReact ? currUserReact.type : ""
  );
  useEffect(() => {
    setReaction(currUserReact ? currUserReact.type : "");
  }, [currUserReact, location.pathname]);

  const fetcher = useFetcher();

  function handleReaction(emoji: string) {
    const formData = new FormData();
    setReaction(emoji);

    formData.append("postId", postId);
    formData.append("reaction", emoji);
    fetcher.submit(formData, { method: "post", action: "/sendReactionPost" });

    setOpen(false);
  }

  function handleDefaultReaction() {
    const formData = new FormData();
    if (reaction) {
      setReaction("");
      formData.append("postId", postId);
      fetcher.submit(formData, {
        method: "post",
        action: "/deleteReactionPost",
      });
    } else {
      setReaction("❤️");
      formData.append("postId", postId);
      formData.append("reaction", "❤️");
      fetcher.submit(formData, { method: "post", action: "/sendReactionPost" });
    }
  }

  return (
    <>
      <HoverCard open={open} onOpenChange={setOpen}>
        <HoverCardTrigger
          className="flex items-center hover:bg-slate-200 px-2 hover:rounded-md cursor-pointer select-none"
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
