import React from "react";

import {
  getDraftStories,
  getPublishedStories,
  getSavedStories,
} from "@/actions/me";
import { StoryPage } from "../StoryPage";

const DraftsPage = async () => {
  const drafts = await getDraftStories();
  const publishedStories = await getPublishedStories();
  const savedStories = await getSavedStories();

  return (
    <div>
      <StoryPage
        stories={drafts.response}
        totalDrafts={drafts.response.length}
        totalPublished={publishedStories.response.length}
        totalSaved={savedStories.response.length}
      />
    </div>
  );
};

export default DraftsPage;
