import { db } from "@/app/prismadb";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 400 });

  try {
    const body = await req.json();
    const { storyId, content, parentCommentId } = body;

    if (!storyId || !content || !parentCommentId)
      throw new Error("Missing data");

    const existingStory = await db.story.findUnique({
      where: {
        id: storyId,
      },
    });
    if (!existingStory) throw new Error("Story not found");

    await db.comment.create({
      data: {
        userId,
        storyId,
        content,
        parentCommentId,
      },
    });

    return NextResponse.json("Commented successfully");
  } catch (error) {
    console.log("🔴 Error POST_commentStory ", error);
    return NextResponse.error();
  }
}
