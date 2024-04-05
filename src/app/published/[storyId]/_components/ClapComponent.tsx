"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Clapped } from "@/components/icons/Clapped";
import { NotClap } from "@/components/icons/NotClap";
import { cn } from "@/lib/utils";

type Props = {
  storyId: string;
  clapCount: number;
  commentId?: string;
  userClaps: number;
};

export const ClapComponent = ({
  storyId,
  clapCount,
  commentId,
  userClaps,
}: Props) => {
  const [currentClaps, setCurrentClaps] = useState<number>(clapCount);
  const [currentClapsByUser, setCurrentClapsByUser] =
    useState<number>(userClaps);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    setCurrentClapsByUser(userClaps);
    setCurrentClaps(clapCount)
  }, [clapCount, userClaps]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowPopup(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [showPopup]);

  const clapStoryOrComment = async () => {
    if (currentClapsByUser >= 50) {
      setShowPopup(true);

      return;
    }

    setCurrentClaps((prev) => prev + 1);
    setCurrentClapsByUser(currentClapsByUser + 1);
    setShowPopup(true);

    try {
      if (!commentId) {
        await axios.post("/api/clap", { storyId });
      } else {
        await axios.post("/api/clapcomment", { storyId, commentId });
      }
    } catch (error) {
      console.log("🔴 Error clap_story_or_comment ", error);
      toast.error("Something went wrong, please try again!");

      setCurrentClaps((prev) => prev - 1);
      setCurrentClapsByUser((prev) => prev - 1);
    }
  };

  return (
    <button onClick={clapStoryOrComment} className="flex items-center relative">
      <span
        className={cn(
          "absolute, bottom-10, w-[40px] h-[40px] bg-black rounded-full shadow-2xl shadow-neutral-300 text-white flex items-center justify-center duration-75 ease-in",
          showPopup
            ? "scale-100 bottom-10 opacity-100 translate-y-0"
            : "scale-0 opacity-0 translate-y-8"
        )}
      >
        {currentClapsByUser}
      </span>

      {userClaps || currentClapsByUser > 0 ? <NotClap /> : <Clapped />}

      <p className="text-sm opacity-60">{currentClaps}</p>
    </button>
  );
};
