import React from "react";
import { NewStoryNavbar } from "./NewStoryNavbar";

const NewStoryLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NewStoryNavbar />
      {children}
    </>
  );
};

export default NewStoryLayout;
