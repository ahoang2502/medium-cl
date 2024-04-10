"use server";

import { db } from "@/app/prismadb";
import { getCurrentUserId } from "./user";

export const getDraftStories = async () => {
  const userId = await getCurrentUserId();
  if (!userId) return { response: [] };

  try {
    const stories = await db.story.findMany({
      where: {
        publish: false,
        authorId: userId,
      },
    });

    return { response: stories };
  } catch (error) {
    console.log("🔴Error getting draft story: ", error);

    return { response: [] };
  }
};

export const getPublishedStories = async () => {
  const userId = await getCurrentUserId();
  if (!userId) return { response: [] };

  try {
    const stories = await db.story.findMany({
      where: {
        publish: true,
        authorId: userId,
      },
    });

    return { response: stories };
  } catch (error) {
    console.log("🔴Error getting published story: ", error);

    return { response: [] };
  }
};

export const getSavedStories = async () => {
  const userId = await getCurrentUserId();
  if (!userId) return { response: [] };

  try {
    const stories = await db.story.findMany({
      where: {
        publish: true,
        Saves: {
          some: {
            userId,
          },
        },
      },
    });

    return { response: stories };
  } catch (error) {
    console.log("🔴Error getting saved story: ", error);

    return { response: [] };
  }
};
