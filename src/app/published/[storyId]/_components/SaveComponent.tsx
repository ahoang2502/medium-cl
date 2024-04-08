"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import { NotSave } from "@/components/icons/NotSave";
import { Saved } from "@/components/icons/Saved";

type Props = {
  storyId: string;
  savedStatus: boolean;
};

export const SaveComponent = ({ storyId, savedStatus }: Props) => {
  const [currentSaveStatus, setCurrentSaveStatus] =
    useState<boolean>(savedStatus);

  const handleSave = async () => {
    setCurrentSaveStatus(!currentSaveStatus);

    try {
      await axios.post("/api/save", {
        storyId,
      });
    } catch (error) {
      console.log("Error saving story, please try again");
      setCurrentSaveStatus(!currentSaveStatus);

      toast.error("Error saving story, please try again");
    }
  };

  useEffect(() => {
    setCurrentSaveStatus(savedStatus);
  }, [savedStatus]);

  return (
    <button
      className="flex items-center"
      onClick={(e) => {
        e.preventDefault();
        
        handleSave();
      }}
    >
      {currentSaveStatus ? <Saved /> : <NotSave />}
    </button>
  );
};
