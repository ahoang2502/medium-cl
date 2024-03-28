import { UserButton } from "@clerk/nextjs";
import { Bell, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PiBellThin } from "react-icons/pi";

export const Navbar = () => {
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
          <span className="flex items-center space-x-2 opacity-70 hover:opacity-100 duration-100 ease-in cursor-pointer">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-label="Write"
            >
              <path
                d="M14 4a.5.5 0 0 0 0-1v1zm7 6a.5.5 0 0 0-1 0h1zm-7-7H4v1h10V3zM3 4v16h1V4H3zm1 17h16v-1H4v1zm17-1V10h-1v10h1zm-1 1a1 1 0 0 0 1-1h-1v1zM3 20a1 1 0 0 0 1 1v-1H3zM4 3a1 1 0 0 0-1 1h1V3z"
                fill="currentColor"
              ></path>
              <path
                d="M17.5 4.5l-8.46 8.46a.25.25 0 0 0-.06.1l-.82 2.47c-.07.2.12.38.31.31l2.47-.82a.25.25 0 0 0 .1-.06L19.5 6.5m-2-2l2.32-2.32c.1-.1.26-.1.36 0l1.64 1.64c.1.1.1.26 0 .36L19.5 6.5m-2-2l2 2"
                stroke="currentColor"
              ></path>
            </svg>
            <p className=" text-sm">Write</p>
          </span>

          <PiBellThin size={24} />

          <UserButton signInUrl="/" />
        </div>
      </div>
    </nav>
  );
};
