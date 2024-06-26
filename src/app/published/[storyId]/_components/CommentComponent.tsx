"use client";

import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

import { BubbleChat } from "@/components/icons/BubbleChat";
import { cn } from "@/lib/utils";
import { IPreviousComments, PreviousComments } from "./PreviousComments";
import { getAllComments, numberOfComments } from "@/actions/comments";

type Props = {
  authorImage: string;
  authorFirstName: string | null;
  authorLastName: string | null;
  numberOfComments: number | null;
};

export const CommentComponent = ({
  authorFirstName,
  authorImage,
  authorLastName,
  numberOfComments,
}: Props) => {
  const [showSideComp, setShowSideComp] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [comments, setComments] = useState<IPreviousComments[]>([]);

  const pathname = usePathname();
  const storyId = pathname.split("/")?.[2] as string;

  const handleComment = async () => {
    try {
      await axios.post("/api/commentstory", {
        storyId,
        content,
      });

      setContent("");
    } catch (error) {
      console.log("🔴 Error handle_comment ", error);
      toast.error("Something went wrong, please try again.");
    }
  };

  useEffect(() => {
    const fetchPreviousComments = async () => {
      try {
        const result = await getAllComments(storyId);

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
    <div>
      <button
        onClick={() => setShowSideComp(!showSideComp)}
        className="flex items-center opacity-60"
      >
        <BubbleChat />

        <p className="text-sm">{numberOfComments}</p>
      </button>

      {/* Comment Sidebar */}
      <div
        className={cn(
          "h-screen fixed top-0 right-0 ring-0 w-[400px] shadow-xl bg-white z-20 duration-200 ease-linear transform overflow-y-scroll ",
          showSideComp ? "translate-x-0" : "translate-x-[450px]"
        )}
      >
        <div className="px-6 pt-6 flex items-center justify-between">
          <p className="font-medium ">Responses ({numberOfComments})</p>

          <span
            className="cursor-pointer opacity-60 scale-150"
            onClick={() => setShowSideComp(false)}
          >
            &times;
          </span>
        </div>

        <div className="mx-5 my-4 shadow-lg rounded-md">
          <div className="flex items-center space-x-3 px-3 pt-3">
            <Image
              src={authorImage}
              width={34}
              height={34}
              alt={authorFirstName || "user"}
              className="rounded-full"
            />

            <div className="text-sm">
              <p className="">
                {authorFirstName} {authorLastName}
              </p>
            </div>
          </div>

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
                onClick={handleComment}
                className="text-sm px-4 py-[6px] bg-[#1a8917] rounded-full text-white"
              >
                Respond
              </button>
            </div>
          </div>
        </div>

        <PreviousComments storyId={storyId} />
      </div>
    </div>
  );
};
