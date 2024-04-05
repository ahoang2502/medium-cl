"use server";

import { db } from "@/app/prismadb";

export const getAllComments = async (
  storyId: string,
  parentCommentId?: string
) => {
  if (!storyId) throw new Error("Missing story ID");

  try {
    if (!parentCommentId) {
      const comments = await db.comment.findMany({
        where: {
          storyId,
          parentCommentId: null,
        },
        include: {
          Clap: true,
          replies: true,
        },
      });

      return { response: comments };
    }

    const comments = await db.comment.findMany({
      where: {
        storyId,
        parentCommentId,
      },
      include: {
        Clap: true,
        replies: true,
      },
    });

    return { response: comments };
  } catch (error) {
    console.log("🔴 Error getting story comments ", error);

    return { error: "Error getting story comments" };
  }
};

export const numberOfComments = async (storyId: string) => {
  try {
    const commentsNo = await db.comment.aggregate({
      where: {
        storyId,
      },
      _count: true,
    });

    return { response: commentsNo._count || 0 };
  } catch (error) {
    console.log("Error getting number of comments: ", error);

    return { error: "Error getting number of comments" };
  }
};
