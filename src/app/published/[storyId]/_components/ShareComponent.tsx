"use client";

import { ShareIcon } from "@/components/icons/ShareIcon";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export const ShareComponent = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const pathname = usePathname();

  return (
    <div className="relative">
      <button className="" onClick={() => setShowPopup(!showPopup)}>
        <ShareIcon />
      </button>

      {showPopup && (
        <div className="w-[250px] h-[100px] rounded-md shadow-lg absolute bottom-12 -left-20 ">
          <input
            className="overflow-hidden p-2 m-2 border-[1px] rounded-md bg-gray-100 w-full"
            value={`${process.env.NEXT_PUBLIC_URL}${pathname}`}
          />

          <button
            onClick={() =>
              navigator.clipboard.writeText(
                `${process.env.NEXT_PUBLIC_URL}${pathname}`
              )
            }
            className="text-center w-full py-2"
          >
            Copy link
          </button>
        </div>
      )}
    </div>
  );
};
