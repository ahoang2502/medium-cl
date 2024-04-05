"use client";

import React, { useEffect, useState } from "react";

import { clapCountByUser, getClapCount } from "@/actions/clap";
import { PreviousComments } from "./PreviousComments";

export const RepliedComments = ({
  storyId,
  parentCommentId,
}: {
  storyId: string;
  parentCommentId: string;
}) => {
  const [userClaps, setUserClaps] = useState<number>();
  const [totalClaps, setTotalClaps] = useState<number>();

  useEffect(() => {
    const fetchClapCountsByUser = async () => {
      try {
        const claps = await clapCountByUser(storyId, parentCommentId);

        setUserClaps(claps);
      } catch (error) {
        console.log("Error fetching user claps");
      }
    };

    const fetchTotalClaps = async () => {
      try {
        const claps = await getClapCount(storyId, parentCommentId);

        setTotalClaps(claps);
      } catch (error) {
        console.log("Error fetching total claps");
      }
    };

    fetchClapCountsByUser();
    fetchTotalClaps();
  }, [storyId]);

  return (
    <div>
      <PreviousComments storyId={storyId} parentCommentId={parentCommentId} />
    </div>
  );
};
