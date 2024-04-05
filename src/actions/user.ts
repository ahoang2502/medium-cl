"use server";

import { auth, clerkClient } from "@clerk/nextjs";

export const getCurrentUserId = () => {
  const { userId } = auth();

  return userId;
};

export const getCurrentUser = async () => {
  const { userId } = auth();
  if (!userId) throw new Error("Missing user ID");

  const user = await clerkClient.users.getUser(userId);

  return user;
};

export const getUser = async (userId: string) => {
  if (!userId) throw new Error("Invalid user ID");

  const user = await clerkClient.users.getUser(userId);

  return JSON.parse(JSON.stringify(user));
};
