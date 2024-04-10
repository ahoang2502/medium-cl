import React from "react";

import { StoryPage } from "../StoryPage";
import {
  getDraftStories,
  getPublishedStories,
  getSavedStories,
} from "@/actions/me";

const SavedPage = async () => {
  const drafts = await getDraftStories();
  const publishedStories = await getPublishedStories();
  const savedStories = await getSavedStories();

  return (
    <div>
      <StoryPage
        stories={savedStories.response}
        totalDrafts={drafts.response.length}
        totalPublished={publishedStories.response.length}
        totalSaved={savedStories.response.length}
      />
    </div>
  );
};

export default SavedPage;
