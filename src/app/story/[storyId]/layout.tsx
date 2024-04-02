import React from "react";

import { getCurrentUser } from "@/actions/user";
import { NewStoryNavbar } from "./_components/NewStoryNavbar";

type Props = {
  children: React.ReactNode;
  params: {
    storyId: string;
  };
};

const NewStoryLayout = async ({ children, params }: Props) => {
  const user = await getCurrentUser();

  return (
    <>
      <NewStoryNavbar
        storyId={params.storyId}
        currentUserId={user.id}
        currentUserFirstName={user.firstName}
        currentUserLastName={user.lastName}
      />
      {children}
    </>
  );
};

export default NewStoryLayout;
