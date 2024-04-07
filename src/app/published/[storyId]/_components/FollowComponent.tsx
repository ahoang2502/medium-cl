"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import { isFollowing } from "@/actions/following";
import { cn } from "@/lib/utils";
import { getCurrentUserId } from "@/actions/user";

type Props = {
  authorId: string;
};

export const FollowComponent = ({ authorId }: Props) => {
  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const [currentUserId, setCurrentUserId] = useState<string>();

  useEffect(() => {
    const fetchFollowingStatus = async () => {
      try {
        const res = await isFollowing(authorId);

        if (res?.isFollowing) setIsFollowed(res?.isFollowing);
      } catch (error) {
        console.log("🔴 Error fetching following status ", error);
      }
    };

    const fetchCurrentUserId = async () => {
      try {
        const userId = await getCurrentUserId();

        if (userId) setCurrentUserId(userId);
      } catch (error) {
        console.log("🔴 Error fetching current user ID ", error);
      }
    };

    fetchFollowingStatus();
    fetchCurrentUserId();
  }, [authorId]);

  const handleFollow = async () => {
    setIsFollowed(!isFollowed);

    try {
      await axios.post("/api/following", { authorId });

      toast.success("Followed!");
    } catch (error) {
      toast.error("Could not follow author, please try again.");
      setIsFollowed(!isFollowed);
    }
  };

  return (
    <span
      className={cn(
        "cursor-pointer",
        isFollowed ? "text-zinc-400" : "text-[#1a8917] ",
        currentUserId === authorId && "hidden"
      )}
      onClick={handleFollow}
    >
      · {currentUserId !== authorId && isFollowed ? "Following" : "Follow"}
    </span>
  );
};
