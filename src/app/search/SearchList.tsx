"use client";

import { Story } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { getStoriesByTag } from "@/actions/getStories";
import { StoryItem } from "../_components/StoryItem";

export const SearchList = () => {
  const [filteredStories, setFilteredStories] = useState<Story[]>([]);

  const searchParams = useSearchParams();
  const searchValue = searchParams.get("for");

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await getStoriesByTag(searchValue || "All");

        setFilteredStories(res.stories);
      } catch (error) {
        console.log("🔴 Error fetch_stories: ", error);
      }
    };

    fetchStories();
  }, [searchParams]);

  return (
    <div>
      {filteredStories.length === 0 && (
        <div className="mt-6">
          <p className="text-zinc-500 text-sm">No stories found.</p>
        </div>
      )}

      {filteredStories.length !== 0 &&
        filteredStories.map((story) => (
          <StoryItem key={story.id} story={story} />
        ))}
    </div>
  );
};
