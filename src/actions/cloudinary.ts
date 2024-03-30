import axios from "axios";

export const imageUpload = async (formData: FormData) => {
  const file = formData.get("file") as File;

  formData.append(
    "upload_preset",
    `${process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}`
  );

  if (!file) {
    throw new Error("Image not found");
  }

  const cloudinaryUploadUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`;

  try {
    const response = await axios.post(cloudinaryUploadUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.url;
  } catch (error) {
    console.log("🔴 [IMAGE_UPLOAD] ", error);

    throw error;
  }
};
