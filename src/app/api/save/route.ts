import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/app/prismadb";

export async function POST(request: NextRequest) {
  const { userId }: { userId: string | null } = auth();
  if (!userId) {
    return NextResponse.json("User not present");
  }

  try {
    const { storyId } = await request.json();

    const storyExist = await db.story.findUnique({
      where: {
        id: storyId,
      },
    });

    if (!storyExist) {
      throw new Error("Story does not exist");
    }

    const savedCheck = await db.save.findFirst({
      where: {
        storyId,
        userId,
      },
    });

    if (savedCheck) {
      // If already saved, delete the existing save
      await db.save.delete({
        where: {
          id: savedCheck.id,
        },
      });

      return NextResponse.json({ message: "Story removed from saved stories" });
    } else {
      // If not saved, save the story
      const saveStory = await db.save.create({
        data: {
          userId,
          storyId: storyExist.id,
        },
      });

      return NextResponse.json(saveStory);
    }
  } catch (error) {
    console.error("Error: ", error);
    return NextResponse.error();
  }
}
