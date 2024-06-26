"use client";

import { UserButton } from "@clerk/nextjs";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

import { Loader2, Search } from "lucide-react";
import { VscClose } from "react-icons/vsc";
import { PiBellThin } from "react-icons/pi";
import { CiBookmark } from "react-icons/ci";
import { Note } from "./icons/Note";

export const Navbar = () => {
  const router = useRouter();
  const [storyCreateLoading, setStoryCreateLoading] = useState(false);
  const [isBannerOpen, setIsBannerOpen] = useState(true);

  const [searchInput, setSearchInput] = useState<string>("");

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

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`/search?for=${searchInput}`);
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

            <div className="flex items-center bg-stone-100 rounded-full pl-3 pr-4">
              <Search
                size={20}
                className="opacity-50"
                onClick={() => router.push(`/search?for=${searchInput}`)}
              />
              <input
                type="text"
                placeholder="Search"
                className="focus:outline-none px-2 py-2 placeholder:text-sm text-sm bg-stone-100"
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleSearch}
              />
            </div>
          </div>

          <div className="flex items-center space-x-7">
            <button
              className="flex items-center space-x-2 opacity-70 hover:opacity-100 duration-100 ease-in cursor-pointer disabled:cursor-not-allowed disabled:hover:opacity-70"
              onClick={createNewStory}
              disabled={storyCreateLoading}
            >
              {storyCreateLoading ? (
                <Loader2 size={22} className="animate-spin" />
              ) : (
                <Note />
              )}
              <p className=" text-sm">Write</p>
            </button>

            <Link
              href="/me/drafts"
              className="flex items-center space-x-2 text-sm opacity-70"
            >
              <CiBookmark size={22} />
              Me
            </Link>

            <PiBellThin size={24} />

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
