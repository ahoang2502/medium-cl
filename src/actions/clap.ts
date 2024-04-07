"use server";

import { db } from "@/app/prismadb";
import { getCurrentUserId } from "./user";

export const getClapCount = async (storyId: string, commentId?: string) => {
  try {
    if (!commentId) {
      const clap = await db.clap.aggregate({
        where: {
          storyId,
          commentId: null,
        },
        _sum: {
          clapCount: true,
        },
      });

      return clap._sum?.clapCount || 0;
    }

    const clap = await db.clap.aggregate({
      where: {
        storyId,
        commentId,
      },
      _sum: {
        clapCount: true,
      },
    });

    return clap._sum?.clapCount || 0;
  } catch (error) {
    console.log("🔴 Error get_clap_count ", error);

    return 0;
  }
};

export const clapCountByUser = async (storyId: string, commentId?: string) => {
  const userId = await getCurrentUserId();
  if (!userId) throw new Error("Missing user ID");

  try {
    if (!commentId) {
      const clap = await db.clap.aggregate({
        where: {
          storyId,
          userId,
          commentId: null,
        },
        _sum: {
          clapCount: true,
        },
      });

      return JSON.parse(JSON.stringify(clap._sum?.clapCount || 0));
    }

    const clap = await db.clap.aggregate({
      where: {
        storyId,
        userId,
        commentId,
      },
      _sum: {
        clapCount: true,
      },
    });

    return JSON.parse(JSON.stringify(clap._sum?.clapCount || 0));
  } catch (error) {
    console.log("🔴 Error get_clap_count ", error);

    return 0;
  }
};
