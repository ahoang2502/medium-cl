import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/app/prismadb";

export async function POST(request: NextRequest) {
  const { userId }: { userId: string | null } = auth();
  if (!userId) {
    return NextResponse.json("User not present");
  }

  try {
    const { authorId } = await request.json();

    const existingFollow = await db.following.findFirst({
      where: {
        followingId: authorId,
        followerId: userId,
      },
    });

    if (existingFollow) {
      // If already saved, delete the existing save
      await db.following.delete({
        where: {
          id: existingFollow.id,
        },
      });

      return NextResponse.json({ message: "Unfollowed!" });
    } else {
      const newFollow = await db.following.create({
        data: {
          followingId: authorId,
          followerId: userId,
        },
      });

      return NextResponse.json(newFollow);
    }
  } catch (error) {
    console.error("Error: ", error);
    return NextResponse.error();
  }
}
