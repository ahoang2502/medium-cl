import { UserButton } from "@clerk/nextjs";
import axios from "axios";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PiBellThin } from "react-icons/pi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Note } from "./icons/Note";

export const Navbar = () => {
  const router = useRouter();

  const createNewStory = async () => {
    try {
      const response = await axios.post("/api/new-story");

      toast.success("Story created successfully!");
      router.push(`/story/${response.data.id}`);
    } catch (error) {
      console.log("🔴 [CREATE_NEW_STORY] ", error);

      toast.error("Couldn't create story. Please try again");
    }
  };

  return (
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
            <Search size={20} className="opacity-50" />
            <input
              type="text"
              placeholder="Search"
              className="focus:outline-none px-2 py-2 placeholder:text-sm text-sm bg-stone-100"
            />
          </div>
        </div>

        <div className="flex items-center space-x-7">
          <span
            className="flex items-center space-x-2 opacity-70 hover:opacity-100 duration-100 ease-in cursor-pointer"
            onClick={createNewStory}
          >
            <Note />
            <p className=" text-sm">Write</p>
          </span>

          <PiBellThin size={24} />

          <UserButton signInUrl="/" />
        </div>
      </div>
    </nav>
  );
};
