import { Story } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import Select from "react-select";

import { getStoryById } from "@/actions/getStories";

type Props = {
  storyId: string;
  publishStory: (topics: string[]) => void;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  currentUserId: string;
  currentUserFirstName: string | null;
  currentUserLastName: string | null;
};

export const SaveStoryPopup = ({
  storyId,
  publishStory,
  currentUserFirstName,
  currentUserId,
  currentUserLastName,
  setShowPopup,
}: Props) => {
  const [story, setStory] = useState<Story>();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const topics = [
    { value: "Artificial Intelligence", label: "Artificial Intelligence" },
    { value: "Python", label: "Python" },
    { value: "Programming", label: "Programming" },
    { value: "Fashion", label: "Fashion" },
    { value: "World", label: "World" },
    { value: "Politics", label: "Politics" },
  ];

  useEffect(() => {
    const fetchStoryById = async () => {
      try {
        const result = await getStoryById(storyId);

        if (result.response) {
          setStory(result.response);
        }
      } catch (error) {
        console.log("🔴 Error fetching story by Id");
        toast.error("Error fetching story");
      }
    };

    fetchStoryById();
  }, []);

  if (!story) return null;

  // Image Src for Image preview
  const imageMatch = story.content!.match(
    /<img[^>]*src=["']([^"']*)["'][^>]*>/
  );
  const imgSrc = imageMatch ? imageMatch[1] : "";

  // H1 tag for heading
  const h1match = story.content!.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const h1Element = h1match ? h1match[1] : "";

  const stripHtmlTags = (htmlString: string) => {
    return htmlString.replace(/<[^>]*>/g, "");
  };

  const contentWithoutH1 = story.content!.replace(
    /<h1[^>]*>[\s\S]*?<\/h1>/g,
    ""
  );
  const textWithoutHtml = stripHtmlTags(contentWithoutH1);
  const first10Words = textWithoutHtml.split(/\s+/).slice(0, 10).join(" ");
  const h1elemntwithouttag = stripHtmlTags(h1Element);

  return (
    <div className="fixed bg-gray-50 w-full z-20 overflow-auto top-0 left-0 right-0 bottom-0 px-1">
      <span
        onClick={(e) => {
          e.preventDefault();

          setShowPopup(false);
        }}
        className="absolute top-4 right-6 text-3xl cursor-pointer"
      >
        &times;
      </span>

      <div className="max-w-[900px] mx-auto md:mt-28 mt-10 grid md:grid-cols-2 grid-cols-1 gap-14">
        <div className="max-md:hidden">
          <p className="font-semibold ">Story Preview</p>

          <div className="w-full h-[250px] bg-gray-100 rounded my-3 border-b-[1px]">
            {imgSrc && (
              <Image
                src={imgSrc}
                width={250}
                height={250}
                alt="preview image"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <h1 className="border-b-[1px] text-[18px] font-semibold py-2">
            {h1elemntwithouttag}
          </h1>

          <p className="border-b-[1px] py-2 text-sm text-neutral-500 pt-3">
            {first10Words}
          </p>

          <p className="font-medium text-xs pt-2 ">
            Note:{" "}
            <span className="font-normal text-neutral-500">
              Changes here will affect how your story appears in public places
              like Medium’s homepage and in subscribers’ inboxes — not the
              contents of the story itself.
            </span>
          </p>
        </div>

        <div className="">
          <p className="py-2 ">
            Publishing to:{" "}
            <span className="font-semibold">
              {currentUserFirstName} {currentUserLastName}
            </span>
          </p>

          <p className="text-sm pb-3 pt-1 ">
            Add or change topics (up to 5) so readers know what your story is
            about
          </p>

          <Select
            placeholder="tags"
            isMulti
            onChange={(selectedValues) => {
              const values = selectedValues as {
                value: string;
                label: string;
              }[];

              const stringValues = values.map((value) => value.value);

              setSelectedTopics(stringValues);
            }}
            isOptionDisabled={() => selectedTopics?.length >= 5}
            name="topics"
            options={topics}
            className="basic-multi-select "
            classNamePrefix="Add topics.."
          />

          <button
            onClick={() => publishStory(selectedTopics)}
            className="px-4 py-2 bg-[#0f730c] hover:opacity-90 transition ease-in rounded-full text-white text-sm mt-8 font-medium"
          >
            Publish now
          </button>
        </div>
      </div>
    </div>
  );
};
