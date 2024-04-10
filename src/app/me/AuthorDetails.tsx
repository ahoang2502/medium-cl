"use client";

import { User } from "@clerk/nextjs/server";
import { Story } from "@prisma/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { getUser } from "@/actions/user";

export const AuthorDetails = ({ story }: { story: Story }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser(story.authorId);
        setUser(user);
      } catch (error) {
        console.log("🔴 Error getting user", error);
      }
    };

    fetchUser();
  }, [story]);


  return (
    <div className="flex items-center space-x-2">
      <Image
        className="rounded-full"
        src={user?.imageUrl ? user.imageUrl : "/no-image.jpg"}
        width={24}
        height={24}
        alt="User Image"
      />
      <p className="text-sm">
        {user?.firstName} {user?.lastName}.{" "}
      </p>
      <p className="text-sm opacity-60">
        {new Date(story.updatedAt)
          .toDateString()
          .split(" ")
          .slice(1, 4)
          .join(" ")}
      </p>
    </div>
  );
};
