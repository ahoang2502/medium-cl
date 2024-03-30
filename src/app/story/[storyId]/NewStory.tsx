"use client";

import MediumEditor from "medium-editor";
import "medium-editor/dist/css/medium-editor.css";
import "medium-editor/dist/css/themes/default.css";
import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { BsPlusLg } from "react-icons/bs";
import { IoCodeOutline, IoImageOutline } from "react-icons/io5";
import { RiMoreFill } from "react-icons/ri";

import { cn } from "@/lib/utils";
import { ImageComp } from "./ImageComp";
import "./_components/NewStory.css";
import { Divider } from "./Divider";

export const NewStory = () => {
  const [openTools, setOpenTools] = useState<boolean>(false);
  const [buttonPosition, setButtonPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });

  const contentEditableRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
          x = rect.left + window.screenX;
          y = rect.top + window.scrollY - 115;
        }
      }
    }

    return { x, y };
  };

  const insertImageComp = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      setOpenTools(false);

      const localImageUrl = URL.createObjectURL(file);

      const ImageComponent = <ImageComp imageUrl={localImageUrl} file={file} />;

      const wrapperDiv = document.createElement("div");
      const root = createRoot(wrapperDiv);

      root.render(ImageComponent);
      contentEditableRef.current?.appendChild(wrapperDiv);
    }
  };

  const insertDivider = () => {
    const DividerComponent = <Divider />;

    setOpenTools(false);

    const wrapperDiv = document.createElement("div");
    const root = createRoot(wrapperDiv);

    root.render(DividerComponent);
    contentEditableRef.current?.appendChild(wrapperDiv);
  };

  useEffect(() => {
    const handleInput = () => {
      const { x, y } = getCaretPosition();

      setButtonPosition({ top: y, left: -50 });
    };

    contentEditableRef.current?.addEventListener("input", handleInput);
  }, []);

  useEffect(() => {
    if (typeof window?.document !== "undefined") {
      const editor = new MediumEditor(".editable", {
        elementsContainer: document.getElementById("container") as HTMLElement,
        toolbar: {
          buttons: [
            "bold",
            "italic",
            "underline",
            "anchor",
            "h1",
            "h2",
            "h3",
            "quote",
          ],
        },
        placeholder: { text: "" },
      });

      return () => {
        editor.destroy();
      };
    }
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
              "border-[1px] border-green-700 rounded-full block p-[6px] ease-linear duration-100 bg-white cursor-pointer",
              openTools ? "scale-100 visible" : "scale-0 invisible"
            )}
            onClick={insertImageComp}
          >
            <IoImageOutline className="text-green-700/80" />

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileInputChange}
            />
          </span>

          <span
            className={cn(
              "border-[1px] border-green-700 rounded-full block p-[6px] ease-linear duration-100 delay-75 bg-white cursor-pointer",
              openTools ? "scale-100 visible" : "scale-0 invisible"
            )}
            onClick={insertDivider}
          >
            <RiMoreFill className="text-green-700/80" />
          </span>

          <span
            className={cn(
              "border-[1px] border-green-700 rounded-full block p-[6px] ease-linear duration-100 delay-100 bg-white cursor-pointer",
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
