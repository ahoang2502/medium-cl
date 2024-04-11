"use client";

import axios from "axios";
import React, { useState } from "react";
import Select from "react-select";
import { toast } from "sonner";
import { topics } from "../story/[storyId]/_components/SaveStoryPopup";

type Props = {
  allTopics: {
    value: string;
    label: string;
  }[];
  userTags: {
    value: string;
    label: string;
  }[];
  setShowPopUp: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddTagsComp = ({ allTopics, setShowPopUp, userTags }: Props) => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [userSelectedTags, setUserSelectedTags] = useState<
    {
      value: string;
      label: string;
    }[]
  >(userTags);

  const addTags = async () => {
    try {
      await axios.post("/api/topics", {
        tag: selectedTopics,
      });

      window.location.reload();
      toast.success("Tags added successfully");
    } catch (error) {
      console.log("🔴 Error adding tags");
    }
  };

  return (
    <div className="fixed bg-gray-50 w-full z-20 overflow-auto top-0 left-0 right-0 bottom-0">
      <span
        onClick={(e) => {
          e.preventDefault();
          setShowPopUp(false);
        }}
        className="absolute top-4 right-6 text-3xl cursor-pointer"
      >
        &times;
      </span>
      <div className="max-w-[900px] mx-auto md:mt-28 mt-10 w-full">
        <div>
          <Select
            placeholder="tags"
            isMulti
            defaultValue={userSelectedTags}
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
            className="basic-multi-select"
            classNamePrefix="Add a topic ..."
          />

          <button
            onClick={() => addTags()}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-full text-white text-sm mt-8"
          >
            Add tags
          </button>
        </div>
      </div>
    </div>
  );
};
