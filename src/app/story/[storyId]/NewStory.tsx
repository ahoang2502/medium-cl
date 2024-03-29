"use client";

import { useEffect, useRef, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { IoCodeOutline, IoImageOutline } from "react-icons/io5";
import { RiMoreFill } from "react-icons/ri";

import { cn } from "@/lib/utils";
import "./_components/NewStory.css";

export const NewStory = () => {
  const [openTools, setOpenTools] = useState<boolean>(false);
  const [buttonPosition, setButtonPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });

  const contentEditableRef = useRef<HTMLDivElement | null>(null);

  const getCaretPosition = () => {
    let x = 0;
    let y = 0;

    const isSupported = typeof window.getSelection !== "undefined";
    if (isSupported) {
      const selection = window.getSelection() as Selection;

      if (selection?.rangeCount > 0) {
        const range = selection.getRangeAt(0).cloneRange();

        const rect = range.getClientRects()[0];
        if (rect) {
          x = rect.left;
          y = rect.top + window.scrollY - 110;
        }
      }
    }

    return { x, y };
  };

  useEffect(() => {
    const handleInput = () => {
      const { x, y } = getCaretPosition();

      setButtonPosition({ top: y, left: -50 });
    };

    contentEditableRef.current?.addEventListener("input", handleInput);
  }, []);

  return (
    <main id="container" className="max-w-[800px] mx-auto relative mt-8">
      <div
        id="editable"
        contentEditable
        suppressContentEditableWarning
        ref={contentEditableRef}
        className="editable font-inria outline-none focus:outline-none max-w-[800px] prose"
        style={{ whiteSpace: "pre-line" }}
      >
        <h3
          className="font-inriaBold text-5xl"
          data-h3-placeholder="Title"
        ></h3>

        <p className="text-xl mt-4" data-p-placeholder="Tell your story..."></p>
      </div>

      {/* Tools */}
      <div
        className={cn("z-10", buttonPosition.top === 0 ? "hidden" : "")}
        style={{
          position: "absolute",
          top: buttonPosition.top,
          left: buttonPosition.left,
        }}
      >
        <button
          id="tooltip"
          className="border-[1px] border-neutral-500 p-1 rounded-full inline-block "
          onClick={() => setOpenTools(!openTools)}
        >
          <BsPlusLg
            size={20}
            className={cn("duration-300 ease-linear", openTools && "rotate-45")}
          />
        </button>

        <div
          id="tool"
          className={cn(
            "flex items-center space-x-3 absolute top-0 left-14 ",
            openTools ? "visible" : "invisible"
          )}
        >
          <span
            className={cn(
              "border-[1px] border-green-700 rounded-full block p-[6px] ease-linear duration-100 bg-white",
              openTools ? "scale-100 visible" : "scale-0 invisible"
            )}
          >
            <IoImageOutline className="text-green-700/80" />

            <input type="file" accept="image/*" style={{ display: "none" }} />
          </span>

          <span
            className={cn(
              "border-[1px] border-green-700 rounded-full block p-[6px] ease-linear duration-100 delay-75 bg-white",
              openTools ? "scale-100 visible" : "scale-0 invisible"
            )}
          >
            <RiMoreFill className="text-green-700/80" />
          </span>

          <span
            className={cn(
              "border-[1px] border-green-700 rounded-full block p-[6px] ease-linear duration-100 delay-100 bg-white",
              openTools ? "scale-100 visible" : "scale-0 invisible"
            )}
          >
            <IoCodeOutline className="text-green-700/80" />
          </span>
        </div>
      </div>
    </main>
  );
};
