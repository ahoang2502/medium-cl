import { NextRequest, NextResponse } from "next/server";

import { db } from "@/app/prismadb";

export async function PATCH(req: NextRequest) {
  const { storyId } = await req.json();
  if (!storyId) throw new Error("Missing Story ID");

  const story = await db.story.findUnique({
    where: {
      id: storyId,
    },
  });
  if (!story) throw new Error("No story found");

  try {
    const updatedStory = await db.story.update({
      where: {
        id: story.id,
      },
      data: {
        publish: false,
      },
    });

    return NextResponse.json(updatedStory);
  } catch (error) {
    console.log("🔴 PATCH update_story ", error);
    return NextResponse.error();
  }
}
