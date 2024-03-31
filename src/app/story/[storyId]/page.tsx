import { NewStory } from "./NewStory";

const StoryIdPage = ({ params }: { params: { storyId: string } }) => {
  return (
    <div className="max-w-[680px] mx-auto mt-10">
      <NewStory storyId={params.storyId} />
    </div>
  );
};

export default StoryIdPage;
