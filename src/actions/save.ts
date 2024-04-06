"use server";

import { db } from "@/app/prismadb";
import { getCurrentUserId } from "./user";

export const isSaved = async (storyId: string) => {
  const userId = getCurrentUserId();
  if (!userId) throw new Error("User not found.");

  try {
    const saved = await db.save.findFirst({
      where: {
        storyId,
        userId,
      },
    });

    return { status: !!saved };
  } catch (error) {
    console.log("Error checking save status");

    return { status: false };
  }
};
