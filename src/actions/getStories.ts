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
