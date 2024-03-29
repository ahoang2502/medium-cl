import React from "react";

import { NewStory } from "./NewStory";

const StoryIdPage = ({ params }: { params: { storyId: string } }) => {
  return (
    <div className="max-w-[680px] mx-auto mt-10">
      <NewStory />
    </div>
  );
};

export default StoryIdPage;
