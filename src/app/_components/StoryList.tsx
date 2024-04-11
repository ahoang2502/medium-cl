"use client";

import { Story } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";

import { getStoriesByTag } from "@/actions/getStories";
import { AddTagsComp } from "./AddTagsComp";
import { cn } from "@/lib/utils";
import { StoryItem } from "./StoryItem";

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

        <Link
          href="/"
          className={cn(
            "pb-3",
            tag === null ? "border-b-[1px] border-neutral-950" : ""
          )}
        >
          For You
        </Link>

        {userTags.map((tagItem, index) => (
          <Link
            href={`/?tag=${tagItem.value}`}
            className={cn(
              "pb-3",
              tagItem.value === tag ? "border-b-[1px] border-neutral-950" : ""
            )}
            key={tagItem.label}
          >
            {tagItem.label}
          </Link>
        ))}
      </div>

      {filteredStories.length === 0 && (
        <div className="mt-6">
          <p className="text-zinc-500 text-sm">No stories found.</p>
        </div>
      )}

      {filteredStories.length !== 0 &&
        filteredStories.map((story) => (
          <StoryItem key={story.id} story={story} />
        ))}

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
