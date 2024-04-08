"use client";

import { Comment } from "@prisma/client";
import React, { useEffect, useState } from "react";

import { clapCountByUser, getClapCount } from "@/actions/clap";
import { ClapComponent } from "./ClapComponent";
import { IPreviousComments } from "./PreviousComments";
import { BubbleChat } from "@/components/icons/BubbleChat";
import { RepliedComments } from "./RepliedComments";
import { CommentArea } from "./CommentArea";
import { useClapCountsByUser } from "@/hooks/useClapCountsByUser";

type Props = {
  storyId: string;
  comment: IPreviousComments;
  totalClaps: number;
};

export const UserEngagement = ({ storyId, comment, totalClaps }: Props) => {
  const [showCommentArea, setShowCommentArea] = useState<boolean>(false);
  const [showRepliedComments, setShowRepliedComments] =
    useState<boolean>(false);
  const { userClaps } = useClapCountsByUser({
    commentId: comment.id,
    storyId,
    totalClaps,
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <ClapComponent
            storyId={storyId}
            clapCount={totalClaps}
            commentId={comment.id}
            userClaps={userClaps || 0}
          />

          {comment.replies.length > 0 && (
            <button
              onClick={() => setShowRepliedComments(!showRepliedComments)}
              className="text-sm opacity-80 flex items-center space-x-2"
            >
              <BubbleChat />
              {comment.replies.length} replies
            </button>
          )}

          <div className="">
            <button
              onClick={() => setShowCommentArea(!showCommentArea)}
              className="text-sm opacity-80"
            >
              Reply
            </button>
          </div>
        </div>
      </div>

      {showRepliedComments && (
        <RepliedComments
          storyId={comment.storyId}
          parentCommentId={comment.id}
        />
      )}

      {showCommentArea && (
        <div className="border-l-[3px] ml-5">
          <CommentArea commentId={comment.id} />
        </div>
      )}
    </div>
  );
};
