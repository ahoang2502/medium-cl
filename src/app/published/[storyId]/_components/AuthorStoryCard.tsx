"use client";

import { Story } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { ClapComponent } from "./ClapComponent";
import { SaveComponent } from "./SaveComponent";
import { useClapCountsByUser } from "@/hooks/useClapCountsByUser";
import { getClapCount } from "@/actions/clap";
import { isSaved } from "@/actions/save";
import { getFollowersCount } from "@/actions/following";

type Props = {
  story: Story;
  authorImage: string;
  authorFirstName: string | null;
  authorLastName: string | null;
};

export const AuthorStoryCard = ({
  story,
  authorImage,
  authorFirstName,
  authorLastName,
}: Props) => {
  const { userClaps } = useClapCountsByUser({
    storyId: story.id,
    totalClaps: 0,
  });

  const [totalClaps, setTotalClaps] = useState<number>(0);
  const [savedStatus, setSavedStatus] = useState<boolean>(false);
  

  useEffect(() => {
    const fetchTotalClaps = async () => {
      try {
        const claps = await getClapCount(story.id);

        setTotalClaps(claps);
      } catch (error) {
        console.log("Error fetching total claps");
      }
    };

    const fetchSavedStatus = async () => {
      const res = await isSaved(story.id);

      setSavedStatus(res.status);
    };

    

    fetchTotalClaps();
    fetchSavedStatus();
    
  }, [story.id]);

  const stripHtmlTags = (htmlString: string) => {
    return htmlString.replace(/<[^>]*>/g, "");
  };
  const match = story.content!.match(/<img[^>]*src=["']([^"']*)["'][^>]*>/);
  const imgSrc = match ? match[1] : "";
  const h1match = story.content!.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);

  const h1Element = h1match ? h1match[1] : "";

  const finalh1Element = stripHtmlTags(h1Element);
  // Use stripHtmlTags to remove HTML tags
  const textWithoutHtml = stripHtmlTags(story.content!);

  // Split the text into words and select the first 20
  const first10Words = textWithoutHtml.split(/\s+/).slice(0, 10).join(" ");

  return (
    <Link href={`/published/${story.id}`}>
      <Image
        src={imgSrc ? imgSrc : "/no-image/jpg"}
        width={250}
        height={200}
        alt="thumbnail"
      />

      <div className="flex items-center space-x-2 mt-5 ">
        <Image src={authorImage} width={20} height={20} alt="author" />

        <p className="text-xs font-medium">
          {authorFirstName} {authorLastName}
        </p>
      </div>

      <p className="font-bold mt-4">{finalh1Element}</p>
      <p className="mt-2 text-sm text-neutral-500">{first10Words}...</p>

      <div className="flex items-center justify-between mt-3 ">
        <div className="flex items-center space-x-4">
          <ClapComponent
            storyId={story.id}
            userClaps={userClaps}
            clapCount={totalClaps}
          />
          <SaveComponent savedStatus={savedStatus} storyId={story.id} />
        </div>
      </div>
    </Link>
  );
};
