import { Heart } from "lucide-react";
import { useState } from "react";
import { useFetcher } from "react-router";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";

interface ReactionsCardProps {
  reactions: number;
  commentId: string;
}

export default function ReactionsCommentCard({
  reactions,
  commentId,
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
  const fetcher = useFetcher();

  function handleReaction(emoji: string) {
    const formData = new FormData();
    setReaction(emoji);

    formData.append("commentId", commentId);
    formData.append("reaction", emoji);
    fetcher.submit(formData, {
      method: "post",
      action: "/editReactionComment",
    });

    setOpen(false);
  }

  function handleDefaultReaction() {
    const formData = new FormData();
    if (reaction) {
      setReaction("");
      formData.append("commentId", commentId);
      fetcher.submit(formData, {
        method: "post",
        action: "/deleteReactionComment",
      });
    } else {
      setReaction("❤️");
      formData.append("commentId", commentId);
      formData.append("reaction", "❤️");
      fetcher.submit(formData, {
        method: "post",
        action: "/sendReactionComment",
      });
    }
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
              <p className="text-base">{reaction}</p>
            ) : (
              <Heart className="h-[24px] w-[22px]" />
            )}
          </p>
          <button type="button" className="text-sm">
            <span className="font-bold">{formatter.format(reactions)} </span>
            reactions
          </button>
        </HoverCardTrigger>
        <HoverCardContent side="top" className="flex gap-2 justify-center">
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
