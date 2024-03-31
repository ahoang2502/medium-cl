import React from "react";
import { NewStoryNavbar } from "./NewStoryNavbar";

const NewStoryLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <NewStoryNavbar />
      {children}
    </div>
  );
};

export default NewStoryLayout;
