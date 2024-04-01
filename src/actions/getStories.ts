"use server";

import { db } from "@/app/prismadb";

export const getStoryById = async (storyId: string) => {
  if (!storyId) throw new Error("Story ID is missing");

  try {
    const storyById = await db.story.findUnique({
      where: {
        id: storyId,
      },
    });

    return { response: storyById };
  } catch (error) {
    return { error: "🔴 Error getting story by Id" };
  }
};
