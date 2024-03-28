import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Navbar = () => {
  return (
    <div className="px-8 py-2 border-b-[1px] ">
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
    </div>
  );
};
