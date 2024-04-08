import Link from "next/link";
import React from "react";

import { getPublishedStoryById } from "@/actions/getStories";
import { Navbar } from "@/components/Navbar";
import { getUser } from "@/actions/user";
import { StoryDetails } from "./_components/StoryDetails";
import { AuthorInfo } from "./_components/AuthorInfo";
import { isSaved } from "@/actions/save";

const PublishedStoryDetailsPage = async ({
  params,
}: {
  params: {
    storyId: string;
  };
}) => {
  const publishedStory = await getPublishedStoryById(params.storyId);

  if (!publishedStory.response)
    return (
      <div className="h-screen">
        <Navbar />

        <div className="flex flex-col items-center justify-center h-[500px]">
          <h1 className="text-6xl font-semibold">404</h1>
          <div className="mt-5 text-zinc-700">
            Story not found.{" "}
            <Link href="/" className=" hover:text-black">
              <span className="underline">Back home </span>→
            </Link>
          </div>
        </div>
      </div>
    );

  const author = await getUser(publishedStory.response?.authorId);

  return (
    <div>
      <Navbar />

      <StoryDetails
        authorFirstName={author.firstName}
        authorImage={author.imageUrl}
        authorLastName={author.lastName}
        publishedStory={publishedStory.response}
      />

      <AuthorInfo
        authorFirstName={author.firstName}
        authorImage={author.imageUrl}
        authorLastName={author.lastName}
        authorEmail={author.emailAddresses[0].emailAddress}
        publishedStory={publishedStory.response}
      />
    </div>
  );
};

export default PublishedStoryDetailsPage;
