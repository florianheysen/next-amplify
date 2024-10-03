import { useState } from "react";
import { useS3Upload } from "next-s3-upload";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api"; // Adjust path based on your project

export default function useUploadAndSaveTask() {
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

  const saveTaskUrl = useMutation(api.tasks.saveImage);

  const handleFileChange = async (file: File, taskId: any) => {
    try {
      setIsLoading(true);
      const { url } = await uploadToS3(file);
      await saveTaskUrl({ taskId, url });
      console.log("File uploaded and URL saved successfully.");
      setIsLoading(false);
    } catch (error) {
      setUploadError("Failed to upload the file or save the URL.");
      setIsLoading(false);
      console.error(error);
    }
  };

  return {
    FileInput,
    openFileDialog,
    handleFileChange,
    uploadError,
    isLoading,
  };
}
