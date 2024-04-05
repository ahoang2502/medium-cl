"use client";

import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export const CommentArea = ({ commentId }: { commentId: string }) => {
  const [content, setContent] = useState<string>();

  const pathname = usePathname();
  const storyId = pathname.split("/")?.[2] as string;

  const replyToComment = async () => {
    try {
      await axios.post("/api/replycomments", {
        storyId,
        content,
        parentCommentId: commentId,
      });

      setContent("");
    } catch (error) {
      console.log("🔴 Error reply_to_comment ", error);
      toast.error("Something went wrong, please try again.");
    }
  };

  return (
    <div className="m-4 shadow-md ">
      <textarea
        placeholder="What are your thoughts?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-[100px] p-3 focus:outline-none placeholder:text-sm text-sm mt-3 placeholder:text-stone-300/80"
      />

      <div className="flex flex-row-reverse p-3">
        <div className="flex items-center space-x-4">
          <button onClick={() => setContent("")} className="text-sm">
            Cancel
          </button>

          <button
            onClick={replyToComment}
            className="text-sm px-4 py-[6px] bg-[#1a8917] rounded-full text-white"
          >
            Respond
          </button>
        </div>
      </div>
    </div>
  );
};
