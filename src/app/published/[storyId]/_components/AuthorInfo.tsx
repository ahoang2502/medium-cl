"use client";

import { Story } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoMailOutline } from "react-icons/io5";
import { toast } from "sonner";

import { getFollowersCount, isFollowing } from "@/actions/following";
import { getStoriesByAuthor } from "@/actions/getStories";
import { getCurrentUserId } from "@/actions/user";
import { cn } from "@/lib/utils";
import { AuthorStoryCard } from "./AuthorStoryCard";

type Props = {
  authorFirstName: string | null;
  authorLastName: string | null;
  authorImage: string;
  authorEmail: string;
  publishedStory: Story;
};

export const AuthorInfo = ({
  authorFirstName,
  authorImage,
  authorEmail,
  authorLastName,
  publishedStory,
}: Props) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const [currentUserId, setCurrentUserId] = useState<string>();
  const [followersCount, setFollowersCount] = useState<number>(0);

  useEffect(() => {
    const fetchAuthorStories = async () => {
      try {
        const data = await getStoriesByAuthor(
          publishedStory.id,
          publishedStory.authorId
        );

        if (data.response) setStories(data.response);
      } catch (error) {
        console.log("Error getting stories by author");
        toast.error("Error getting stories");
      }
    };

    fetchAuthorStories();
  }, [publishedStory]);

  useEffect(() => {
    const fetchFollowingStatus = async () => {
      try {
        const res = await isFollowing(publishedStory.authorId);

        if (res?.isFollowing) setIsFollowed(res?.isFollowing);
      } catch (error) {
        console.log("🔴 Error fetching following status ", error);
      }
    };

    const fetchCurrentUserId = async () => {
      try {
        const userId = await getCurrentUserId();

        if (userId) setCurrentUserId(userId);
      } catch (error) {
        console.log("🔴 Error fetching current user ID ", error);
      }
    };

    const fetchFollowersCount = async () => {
      const res = await getFollowersCount(publishedStory.authorId);

      setFollowersCount(res.followersCount);
    };

    fetchFollowingStatus();
    fetchCurrentUserId();
    fetchFollowersCount();
  }, [publishedStory.authorId]);

  const handleFollow = async () => {
    setIsFollowed(!isFollowed);

    try {
      await axios.post("/api/following", { authorId: publishedStory.authorId });
    } catch (error) {
      toast.error("Could not follow author, please try again.");
      setIsFollowed(!isFollowed);
    }
  };

  return (
    <div className="bg-gray-50 py-10 ">
      <div className="max-w-[700px] mx-auto ">
        <Image
          src={authorImage}
          width={72}
          height={72}
          alt={`${authorFirstName} ${authorLastName}`}
          className="rounded-full"
        />

        <div className="flex items-center justify-between border-b-[1px] pb-4">
          <div className="">
            <p className="text-xl font-medium mt-5">
              Written by {authorFirstName} {authorLastName}
            </p>

            <p className="text-sm opacity-60 mt-1">
              {followersCount} {followersCount === 1 ? "follower" : "followers"}
            </p>
          </div>

          <div className="flex items-center space-x-4 ">
            <button
              onClick={handleFollow}
              className={cn(
                "py-2 bg-orange-600 hover:opacity-90 p-2 rounded-full text-sm text-white transition-all",
                isFollowed
                  ? "text-orange-600 bg-transparent border-orange-600 border px-4"
                  : "bg-orange-600 text-white px-4",
                currentUserId === publishedStory.authorId && "hidden"
              )}
            >
              {isFollowed ? "Following" : "Follow"}
            </button>

            <a
              href={`mailto:${authorEmail}`}
              className="py-2 px-4 bg-orange-600 hover:opacity-90 p-2 rounded-full text-sm text-white"
            >
              <IoMailOutline size={20} />
            </a>
          </div>
        </div>

        {stories.length !== 0 ? (
          <p className="text-sm py-5 font-medium">
            More from {authorFirstName} {authorLastName}
          </p>
        ) : (
          <p className="text-sm py-5 font-medium">
            No other stories from {authorFirstName} {authorLastName}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {stories.map((story, index) => (
            <AuthorStoryCard
              key={index}
              story={story}
              authorImage={authorImage}
              authorFirstName={authorFirstName}
              authorLastName={authorLastName}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
