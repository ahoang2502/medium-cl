import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { CiMedicalClipboard } from "react-icons/ci";
import React, { useEffect, useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import "./_components/NewStory.css";

type Props = {
  handleSave: () => void;
};

export const CodeBlock = ({ handleSave }: Props) => {
  const [language, setLanguage] = useState<string>("Javascript");
  const [code, setCode] = useState<string>("");
  const [highlightedCode, setHighlightedCode] = useState<string>("");

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLanguage(event.target.value);
  };

  const handleCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();

    setCode(event.currentTarget.value || "");
  };

  const handlePaste = async () => {
    try {
      const clipboardData = await navigator.clipboard.readText();

      setCode((prev) => prev + clipboardData);
    } catch (error) {
      console.log("🔴 [HANDLE_PASTE] ", error);
    }
  };

  useEffect(() => {
    const highlighted = hljs.highlight(code, {
      language,
      ignoreIllegals: true,
    }).value;

    setHighlightedCode(highlighted);
    handleSave();
  }, [language, code, highlightedCode]);

  return (
    <div className="w-full ">
      <div className="w-full relative bg-gray-50 rounded-sm p-5 focus:outline-none">
        <div className="mb-2">
          <select
            defaultValue={language}
            onChange={handleLanguageChange}
            contentEditable={false}
            className="bg-gray-100 border-dotted border-[2px] rounded-sm p-1 text-stone-700"
          >
            <option value="javascript">Javascript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>
        </div>

        <textarea
          contentEditable={false}
          className="focus:outline-none p-2 w-full "
          onChange={handleCodeChange}
        />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handlePaste}
                className="absolute top-5 right-2 cursor-pointer"
              >
                <CiMedicalClipboard size={20} />
              </button>
            </TooltipTrigger>

            <TooltipContent className="font-sans text-xs">
              Paste code
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div
          className={`language-${language} text-sm block overflow-auto p-3 focus:outline-none font-mono`}
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
          style={{ whiteSpace: "pre-wrap" }}
        />
      </div>

      <p data-p-placeholder="Write your text ..."></p>
    </div>
  );
};
