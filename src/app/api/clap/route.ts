import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/app/prismadb";

export async function POST(req: NextRequest) {
  const { userId } = auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 400 });

  try {
    const { storyId } = await req.json();

    const existingStory = await db.story.findUnique({
      where: {
        id: storyId,
      },
    });

    if (!existingStory)
      return new NextResponse("Story not found", { status: 404 });

    const clapped = await db.clap.findFirst({
      where: {
        storyId,
        userId,
      },
    });

    if (clapped && clapped.clapCount < 50) {
      await db.clap.update({
        where: {
          id: clapped.id,
        },
        data: {
          clapCount: clapped.clapCount + 1,
        },
      });

      return NextResponse.json("Updated");
    } else {
      const clapStory = await db.clap.create({
        data: {
          userId,
          storyId: existingStory.id,
          clapCount: 1,
        },
      });

      return NextResponse.json("Clap created");
    }
  } catch (error) {
    console.log("🔴 Error clap_POST ", error);

    return NextResponse.error();
  }
}
