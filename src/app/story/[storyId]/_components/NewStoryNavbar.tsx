"use client";

import { UserButton } from "@clerk/nextjs";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { VscClose } from "react-icons/vsc";
import { toast } from "sonner";
import { useState } from "react";

import { SaveStoryPopup } from "./SaveStoryPopup";

type Props = {
  storyId: string;
  currentUserId: string;
  currentUserFirstName: string | null;
  currentUserLastName: string | null;
};

export const NewStoryNavbar = ({
  storyId,
  currentUserFirstName,
  currentUserId,
  currentUserLastName,
}: Props) => {
  const router = useRouter();
  const [isBannerOpen, setIsBannerOpen] = useState(true);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const publishStory = async (topics: string[]) => {
    try {
      const response = await axios.patch("/api/publish-new-story", {
        storyId,
        topics,
      });

      toast.success("Story published successfully!");
      router.push(`/published/${response.data.id}`);
    } catch (error) {
      console.log("🔴 [publish_story] ", error);

      toast.error("Error publishing this story. Please try again.");
    }
  };

  return (
    <div className="">
      <nav className="px-8 py-2 border-b-[1px] ">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/">
              <Image
                src="/medium-icon.svg"
                alt="medium-logo"
                width={40}
                height={40}
              />
            </Link>
          </div>

          <div className="flex items-center space-x-7">
            <button
              className="bg-[#0f730c] text-white font-sans text-sm rounded-full px-3 py-1 hover:opacity-90 duration-100 ease-in"
              onClick={() => setShowPopup(!showPopup)}
            >
              Publish
            </button>

            <UserButton signInUrl="/" />
          </div>
        </div>

        {showPopup && (
          <SaveStoryPopup
            setShowPopup={setShowPopup}
            storyId={storyId}
            publishStory={publishStory}
            currentUserFirstName={currentUserFirstName}
            currentUserId={currentUserId}
            currentUserLastName={currentUserLastName}
          />
        )}
      </nav>

      {isBannerOpen && (
        <div className="bg-stone-200/40 py-3 relative">
          <p className="text-center font-sans text-sm text-ink">
            ✨ Get unlimited access to the best of Medium for less than $1/week.
          </p>

          <span
            className="absolute top-0 right-4 translate-y-1/2 cursor-pointer text-zinc-500 hover:text-zinc-900 transition"
            onClick={() => setIsBannerOpen(false)}
          >
            <VscClose size={20} />
          </span>
        </div>
      )}
    </div>
  );
};
