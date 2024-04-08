"use client";

import { useEffect, useState } from "react";

import { clapCountByUser } from "@/actions/clap";

type Props = {
  storyId: string;
  commentId?: string;
  totalClaps: number;
};

export const useClapCountsByUser = ({
  storyId,
  commentId,
  totalClaps,
}: Props) => {
  const [userClaps, setUserClaps] = useState<number>(totalClaps);

  useEffect(() => {
    const fetchClapCountsByUser = async () => {
      try {
        const claps = await clapCountByUser(storyId, commentId);

        setUserClaps(claps);
      } catch (error) {
        console.log("Error fetching user claps");
      }
    };

    fetchClapCountsByUser();
  }, [storyId]);

  return { userClaps, setUserClaps };
};
