import { getStoryById } from "@/actions/getStories";
import { NewStory } from "./NewStory";

const StoryIdPage = async ({ params }: { params: { storyId: string } }) => {
  const data = await getStoryById(params.storyId);

  return (
    <div className="max-w-[680px] mx-auto -mt-10">
      <NewStory
        storyId={params.storyId}
        storyContent={data?.response?.content}
      />
    </div>
  );
};

export default StoryIdPage;
