"use client";

import { User } from "@clerk/nextjs/server";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { getUser } from "@/actions/user";

type Props = {
  userId: string;
  createdAt: Date;
};

export const UserBadge = ({ userId, createdAt }: Props) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser(userId);

        if (user) setUser(user);
      } catch (error) {
        console.log("🔴 Error fetching user ", error);
      }
    };

    fetchUser();
  }, [userId]);

  const calculateDaysAgo = (createdAt: Date) => {
    const currentDate = new Date();
    const createdDate = new Date(createdAt);

    const timeDifference: number =
      currentDate.getTime() - createdDate.getTime();

    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 24));

    return daysAgo;
  };

  return (
    <div className="px-4 text-sm">
      <div className="flex items-center space-x-3">
        <Image
          src={user?.imageUrl ? user.imageUrl : "/no-image.jpg"}
          alt={user?.username || "user"}
          width={34}
          height={34}
          className="rounded-full object-cover"
          priority
        />

        <div className="">
          <p className="">
            {user?.firstName} {user?.lastName}
          </p>

          <p className="text-xs opacity-60">{calculateDaysAgo(createdAt)} days ago</p>
        </div>
      </div>
    </div>
  );
};
