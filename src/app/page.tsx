import { Navbar } from "@/components/Navbar";
import { StoryList } from "./StoryList";
import { getUniqueTopics } from "@/actions/getStories";
import { getSelectedTopics } from "@/actions/topics";

export default async function Home() {
  const allTopics = await getUniqueTopics();
  const userTags = await getSelectedTopics();

  return (
    <main>
      <Navbar />

      <div className="max-w-[1100px] mx-auto px-5 mt-12">
        <StoryList allTopics={allTopics.response} userTags={userTags.tags} />
      </div>
    </main>
  );
}
