"use server";

import { db } from "@/app/prismadb";
import { getCurrentUserId } from "./user";

export const getSelectedTopics = async () => {
  const userId = await getCurrentUserId();
  if (!userId) throw new Error("User not found");

  try {
    const tags = await db.topics.findFirst({
      where: {
        userId,
      },
      select: {
        selectedTopics: true,
      },
    });

    const formattedData = tags?.selectedTopics.map((topic) => ({
      value: topic,
      label: topic,
    }));

    return { tags: formattedData || [] };
  } catch (error) {
    console.log("🔴 Error get_selected_topics: ", error);

    return { tags: [] };
  }
};
