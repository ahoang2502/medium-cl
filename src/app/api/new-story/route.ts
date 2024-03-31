import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/app/prismadb";

export async function POST(req: NextRequest) {
  const { userId }: { userId: string | null } = auth();
  if (!userId) throw new Error("Unauthorized. Missing user ID");

  try {
    const newStory = await db.story.create({
      data: {
        authorId: userId,
      },
    });

    return NextResponse.json(newStory);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();

  const { userId }: { userId: string | null } = auth();
  if (!userId) throw new Error("Unauthorized. Missing user ID");

  const { storyId, content } = body;
  if (!storyId || !content) throw new Error("Missing fields");

  const story = await db.story.findUnique({
    where: {
      id: storyId,
    },
  });

  if (!story) throw new Error("Story not found");

  try {
    await db.story.update({
      where: {
        id: story.id,
      },
      data: {
        content: content,
      },
    });

    return NextResponse.json("Successfully saved the story");
  } catch (error) {
    console.log("🔴 [PATCH_NEW_STORY] ", error);

    return NextResponse.error();
  }
}
