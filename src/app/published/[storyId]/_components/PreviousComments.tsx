"use client";

import { Clap, Comment } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import { getAllComments } from "@/actions/comments";
import { UserBadge } from "./UserBadge";

export interface IPreviousComments extends Comment {
  replies: Comment[];
  Clap: Clap[];
}

export const PreviousComments = ({
  storyId,
  parentCommentId,
}: {
  storyId: string;
  parentCommentId?: string;
}) => {
  const [comments, setComments] = useState<IPreviousComments[]>([]);

  useEffect(() => {
    const fetchPreviousComments = async () => {
      try {
        const result = await getAllComments(storyId, parentCommentId);

        if (result && result.response) {
          setComments(result.response);
        } else {
          console.log(result.error);
          toast.error("Error fetching previous comments");
        }
      } catch (error) {
        console.log("🔴 Error fetching comments ", error);
        toast.error("Error fetching previous comments");
      }
    };

    fetchPreviousComments();
  }, []);

  return (
    <div className="mt-10 border-t-[1px] ">
      {comments.map((comment, index) => {
        const clapCounts = comment.Clap.map((clap) => clap.clapCount);
        const totalClaps = clapCounts.reduce((acc, curr) => acc + curr, 0);

        return (
          <div
            key={index}
            className="m-4 mt-5 py-4 border-b-[1px] border-neutral-100"
          >
            <UserBadge userId={comment.userId} createdAt={comment.createdAt} />
          </div>
        );
      })}
    </div>
  );
};
