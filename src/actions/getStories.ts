"use server";

import { db } from "@/app/prismadb";

export const getStoryById = async (storyId: string) => {
  if (!storyId) throw new Error("Story ID is missing");

  try {
    const storyById = await db.story.findUnique({
      where: {
        id: storyId,
        publish: false,
      },
    });

    return { response: storyById };
  } catch (error) {
    return { error: "🔴 Error getting story by Id" };
  }
};

export const getPublishedStoryById = async (storyId: string) => {
  if (!storyId) throw new Error("Story ID is missing");

  try {
    const storyById = await db.story.findUnique({
      where: {
        id: storyId,
        publish: true,
      },
    });

    return { response: storyById };
  } catch (error) {
    return { error: "🔴 Error getting story by Id" };
  }
};

export const getStoriesByAuthor = async (storyId: string, authorId: string) => {
  try {
    const authorStories = await db.story.findMany({
      where: {
        authorId,
        NOT: {
          id: storyId,
        },
        publish: true,
      },
    });

    return { response: authorStories };
  } catch (error) {
    console.log("🔴 Error getting stories by author ", error);

    return { error: "🔴 Error getting stories by author" };
  }
};

export const getUniqueTopics = async () => {
  try {
    const allStoriesWithTopics = await db.story.findMany({
      select: {
        topics: true,
      },
    });

    const uniqueTopics = Array.from(
      new Set(allStoriesWithTopics.flatMap((story) => story.topics))
    );

    const formattedData = uniqueTopics.map((topic) => ({
      value: topic,
      label: topic,
    }));

    return { response: formattedData };
  } catch (error) {
    console.log("🔴 Error getting topics: ", error);

    return { response: [] };
  }
};

export const getStoriesByTag = async (tag: string) => {
  try {
    if (tag === "All") {
      const allStories = await db.story.findMany({
        where: {
          publish: true,
        },
      });

      return { stories: allStories };
    }

    const taggedStories = await db.story.findMany({
      where: {
        topics: {
          has: tag,
        },
        publish: true,
      },
    });

    return { stories: taggedStories };
  } catch (error) {
    console.log("🔴 Error get_stories_by_tag: ", error);

    return { stories: [] };
  }
};
