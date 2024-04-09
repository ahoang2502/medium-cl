"use client";

import { cn } from "@/lib/utils";
import { Story } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  stories: Story[];
  totalDrafts?: {
    _count: number;
  };
  totalPublished?: {
    _count: number;
  };
  totalSaved?: {
    _count: number;
  };
};

export const StoryPage = ({
  stories,
  totalDrafts,
  totalPublished,
  totalSaved,
}: Props) => {
  const pathname = usePathname();
  const path = pathname.split("/")[2];

  return (
    <div className="max-w-[1000px] mx-auto mt-12">
      <div className="flex items-center justify-between ">
        <h1 className="text-[42px] font-semibold ">Your stories</h1>

        <button className="bg-green-600 hover:opacity-90 px-4 rounded-full text-white text-sm">
          New story +
        </button>
      </div>

      <div className="flex items-center space-x-6 border-b-[1px] mt-2">
        <Link
          href="/me/drafts"
          className={cn(
            "text-sm pb-4",
            path === "drafts"
              ? "opacity-100 border-b-[1px] border-neutral-800"
              : "opacity-60"
          )}
        >
          {totalDrafts?._count}
        </Link>

        <Link
          href="/me/published"
          className={cn(
            "text-sm pb-4",
            path === "published"
              ? "opacity-100 border-b-[1px] border-neutral-800"
              : "opacity-60"
          )}
        >
          {totalPublished?._count}
        </Link>

        <Link
          href="/me/saved"
          className={cn(
            "text-sm pb-4",
            path === "saved"
              ? "opacity-100 border-b-[1px] border-neutral-800"
              : "opacity-60"
          )}
        >
          {totalSaved?._count}
        </Link>
      </div>

      {path === "drafts" && (
        <div className="mt-5">
          {stories.map((story) => {
            const match = story.content?.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
            const stripHtmlTags = (htmlString: string) => {
              return htmlString.replace(/<[^>]*>/g, "");
            };

            const h1Element = match ? match[1] : "";
            const H1Element = stripHtmlTags(h1Element);

            return <Link href={`/drafts/${story.id}`} key={story.id}></Link>;
          })}
        </div>
      )}
    </div>
  );
};
