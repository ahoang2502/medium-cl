import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/app/prismadb";

export async function POST(req: NextRequest) {
  const { userId }: { userId: string | null } = auth();
  if (!userId) return NextResponse.json("User not found");

  try {
    const { tag } = await req.json();

    const topic = await db.topics.findFirst({
      where: {
        userId,
      },
    });

    if (!topic) {
      const newTopic = await db.topics.create({
        data: {
          userId,
          selectedTopics: tag,
        },
      });

      return NextResponse.json("Added new tags successfully!");
    }

    const updatedTopic = await db.topics.update({
      where: {
        id: topic.id,
      },
      data: {
        selectedTopics: tag,
      },
    });

    return NextResponse.json("Added tags successfully!");
  } catch (error) {
    console.log("🔴 Error adding tags: ", error);

    return NextResponse.error();
  }
}
