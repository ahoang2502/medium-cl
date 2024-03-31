"use client";

import { UserButton } from "@clerk/nextjs";
import axios from "axios";
import { Loader2, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PiBellThin } from "react-icons/pi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { VscClose } from "react-icons/vsc";

import { useState } from "react";

export const NewStoryNavbar = () => {
  const router = useRouter();
  const [storyCreateLoading, setStoryCreateLoading] = useState(false);
  const [isBannerOpen, setIsBannerOpen] = useState(true);

  const createNewStory = async () => {
    try {
      setStoryCreateLoading(true);
      const response = await axios.post("/api/new-story");

      toast.success("Story created successfully!");
      router.push(`/story/${response.data.id}`);
    } catch (error) {
      console.log("🔴 [CREATE_NEW_STORY] ", error);

      toast.error("Couldn't create story. Please try again");
    } finally {
      setStoryCreateLoading(false);
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
            <button className="bg-[#0f730c] text-white font-sans text-sm rounded-full px-3 py-1 hover:opacity-90 duration-100 ease-in">
              Publish
            </button>

            <UserButton signInUrl="/" />
          </div>
        </div>
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
