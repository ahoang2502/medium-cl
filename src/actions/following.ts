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

export const getFollowersCount = async (authorId: string) => {
  try {
    const followersCount = await db.following.aggregate({
      where: {
        followingId: authorId,
      },
      _count: true,
    });

    return {
      followersCount: JSON.parse(JSON.stringify(followersCount._count)),
    };
  } catch (error) {
    console.log("🔴 Error getting number of followers: ", error);
    return { followersCount: 0 };
  }
};
