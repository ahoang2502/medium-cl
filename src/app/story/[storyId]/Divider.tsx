import React from "react";
import { RiMoreFill } from "react-icons/ri";

import "./_components/NewStory.css";

export const Divider = () => {
  return (
    <div className="py-3 w-full">
      <div
        className="text-center flex items-center justify-center"
        contentEditable={false}
      >
        <RiMoreFill />
      </div>

      <p data-p-placeholder="Write your text"></p>
    </div>
  );
};
