import { useEffect, useState } from "react";

import { imageUpload } from "@/actions/cloudinary";
import './_components/NewStory.css'

export const ImageComp = ({
  imageUrl,
  file,
}: {
  imageUrl: string;
  file: File;
}) => {
  const [currentImageUrl, setCurrentImageUrl] = useState<string>(imageUrl);

  const updateImageUrl = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      imageUpload(formData).then((secureImageUrl) =>
        setCurrentImageUrl(secureImageUrl)
      );
    } catch (error) {
      console.log("🔴 [UPLOAD_IMAGE] ", error);
    }
  };

  useEffect(() => {
    updateImageUrl();
  }, [imageUrl]);

  return (
    <div className="py-3 ">
      <div className="">
        <img
          src={currentImageUrl}
          alt="image"
          className="max-w-full h-[450px]"
        />

        <div className="text-center text-sm max-w-md mx-auto">
          <p
            className=""
            data-p-placeholder="What's the caption for your image? "
          ></p>
        </div>
      </div>

      <p className="" data-p-placeholder="..."></p>
    </div>
  );
};
