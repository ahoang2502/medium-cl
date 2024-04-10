"use client";

import { Story } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import { getStoriesByTag } from "@/actions/getStories";
import { AddTagsComp } from "./AddTagsComp";

type Props = {
  allTopics: {
    value: string;
    label: string;
  }[];
  userTags: {
    value: string;
    label: string;
  }[];
};

export const StoryList = ({ allTopics, userTags }: Props) => {
  const [filteredStories, setFilteredStories] = useState<Story[]>([]);
  const [showPopUp, setShowPopUp] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await getStoriesByTag(tag || "All");

        setFilteredStories(res.stories);
      } catch (error) {
        console.log("🔴 Error fetch_stories: ", error);
      }
    };

    fetchStories();
  }, [searchParams]);

  return (
    <div>
      <div className="flex items-center space-x-6 border-b-[1px] text-sm opacity-60">
        <span className="pb-3 " onClick={() => setShowPopUp(!showPopUp)}>
          <AiOutlinePlus size={22} />
        </span>
      </div>

      {showPopUp && (
        <AddTagsComp
          allTopics={allTopics}
          setShowPopUp={setShowPopUp}
          userTags={userTags}
        />
      )}
    </div>
  );
};
