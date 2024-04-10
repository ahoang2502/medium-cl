"use client";

import { Story } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { AuthorDetails } from "./AuthorDetails";
import Image from "next/image";
import { Loader2, Plus } from "lucide-react";

type Props = {
  stories: Story[];
  totalDrafts?: number;
  totalPublished?: number;
  totalSaved?: number;
};

export const StoryPage = ({
  stories,
  totalDrafts,
  totalPublished,
  totalSaved,
}: Props) => {
  const [storyCreateLoading, setStoryCreateLoading] = useState(false);

  const pathname = usePathname();
  const path = pathname.split("/")[2];

  const router = useRouter();

  const handleUnpublish = async (storyId: string) => {
    try {
      const response = await axios.patch("/api/edit-story", { storyId });

      router.push(`/story/${response.data.id}`);
    } catch (error) {
      console.log("🔴 Error unpublishing story: ", error);
      toast.error("Something went wrong, please try again.");
    }
  };

  const createNewStory = async () => {
    try {
      setStoryCreateLoading(true);
      const response = await axios.post("/api/new-story");

      toast.success("Story created successfully!");
      router.push(`/story/${response.data.id}`);
    } catch (error) {
      console.log("🔴 [CREATE_NEW_STORY] ", error);

      toast.error("Couldn't create story. Please try again");
    } finally {
      setStoryCreateLoading(false);
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto mt-12">
      <div className="flex items-center justify-between ">
        <h1 className="text-[42px] font-semibold ">Your stories</h1>

        <button
          className="bg-[#1a8917] hover:opacity-90 px-4 rounded-full text-white text-sm py-[6px]"
          onClick={createNewStory}
          disabled={storyCreateLoading}
        >
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
          Drafts {totalDrafts}
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
          Published {totalPublished}
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
          Saved {totalSaved}
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

            return (
              <Link href={`/drafts/${story.id}`} key={story.id}>
                <div className="py-5 ">
                  <div className="text-xl font-semibold mb-5">{H1Element}</div>

                  <div className="flex items-center space-x-5">
                    <span className="text-sm opacity-60">
                      {new Date(story.updatedAt).toDateString()}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {path === "published" && (
        <div className="mt-5">
          {stories.map((story) => {
            const match = story.content?.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
            const stripHtmlTags = (htmlString: string) => {
              return htmlString.replace(/<[^>]*>/g, "");
            };

            const h1Element = match ? match[1] : "";
            const H1Element = stripHtmlTags(h1Element);

            return (
              <Link href={`/published/${story.id}`} key={story.id}>
                <div className="py-5 ">
                  <div className="text-xl font-semibold mb-5">{H1Element}</div>

                  <div className="flex items-center space-x-5">
                    <span className="text-sm opacity-60">
                      {new Date(story.updatedAt).toDateString()}
                    </span>

                    <button
                      onClick={() => handleUnpublish(story.id)}
                      className="px-5 py-1 text-sm rounded-full bg-zinc-500 hover:opacity-90 text-white"
                    >
                      Unpublish
                    </button>

                    {/* TODO: add delete functionality */}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {path === "saved" && (
        <div className="mt-5">
          {stories.map((story) => {
            const stripHtmlTags = (htmlString: string) => {
              return htmlString.replace(/<[^>]*>/g, "");
            };
            const match = story.content?.match(
              /<img[^>]*src=["']([^"']*)["'][^>]*>/
            );
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
            const first30Words = textWithoutHtml
              .split(/\s+/)
              .slice(0, 30)
              .join(" ");

            return (
              <Link
                href={`/saved/${story.id}`}
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
                    <div className="flex items-center justify-between mt-6">
                      {story.topics && (
                        <span className="bg-neutral-50 px-2 py-1 rounded-full text-[13px]">
                          {story.topics}
                        </span>
                      )}
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
            );
          })}
        </div>
      )}
    </div>
  );
};
