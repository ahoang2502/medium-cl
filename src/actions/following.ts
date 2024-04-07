"use server";

import { db } from "@/app/prismadb";
import { getCurrentUserId } from "./user";

export const isFollowing = async (authorId: string) => {
  const currentUserId = await getCurrentUserId();
  if (!currentUserId) return;

  try {
    const isFollowing = await db.following.findFirst({
      where: {
        followingId: authorId,
        followerId: currentUserId,
      },
    });

    return { isFollowing: !!isFollowing };
  } catch (error) {
    return { isFollowing: false };
  }
};
