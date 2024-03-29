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
