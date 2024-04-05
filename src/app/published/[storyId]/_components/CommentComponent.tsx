"use client";

import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

type Props = {
  authorImage: string;
  authorFirstName: string | null;
  authorLastName: string | null;
};

export const CommentComponent = ({
  authorFirstName,
  authorImage,
  authorLastName,
}: Props) => {
  const [showSideComp, setShowSideComp] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");

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

  return <div></div>;
};
