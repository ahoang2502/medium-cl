"use client";

import { Story } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { AuthorDetails } from "../me/AuthorDetails";
import { ClapComponent } from "../published/[storyId]/_components/ClapComponent";
import { SaveComponent } from "../published/[storyId]/_components/SaveComponent";
import { useClapCountsByUser } from "@/hooks/useClapCountsByUser";
import { getClapCount } from "@/actions/clap";
import { isSaved } from "@/actions/save";

type Props = {
  story: Story;
};

export const StoryItem = ({ story }: Props) => {
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
  const match = story.content?.match(/<img[^>]*src=["']([^"']*)["'][^>]*>/);
  const imgSrc = match ? match[1] : "";
  const h1match = story.content?.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);

  const h1Element = h1match ? h1match[1] : "";
  const H1Element = stripHtmlTags(h1Element);

  // Remove <h1> tags from the content
  const contentWithoutH1 = story.content!.replace(
    /<h1[^>]*>[\s\S]*?<\/h1>/g,
    ""
  );

  // Use stripHtmlTags to remove HTML tags from the entire content
  const textWithoutHtml = stripHtmlTags(contentWithoutH1);

  // Split the text into words and select the first 10
  const first30Words = textWithoutHtml.split(/\s+/).slice(0, 30).join(" ");

  return (
    <div className="mt-5">
      <Link
        href={`/story/${story.id}`}
        key={story.id}
        className="my-8 border-b-[1px] pb-10 border-neutral-100 "
      >
        <AuthorDetails story={story} />

        <div className="grid md:grid-cols-4 gap-10 grid-cols-2">
          <div className="md:col-span-3">
            <h1 className="text-xl font-bold py-3">{H1Element}</h1>
            <p className="max-md:hidden text-neutral-600 font-serif">
              {first30Words} ...
            </p>
            <div className="flex items-center space-x-5 mt-6">
              {story.topics && (
                <span className="bg-neutral-200 px-2 py-1 rounded-full text-[13px]">
                  {story.topics}
                </span>
              )}

              <ClapComponent
                storyId={story.id}
                userClaps={userClaps}
                clapCount={totalClaps}
              />

              <SaveComponent savedStatus={savedStatus} storyId={story.id} />
            </div>
          </div>
          <Image
            width={200}
            height={200}
            src={imgSrc ? imgSrc : "/no-image.jpg"}
            alt="Story Image"
          />
        </div>
      </Link>
    </div>
  );
};
