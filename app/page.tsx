"use client";
import { api } from "../convex/_generated/api";
import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";

import { useAction } from "convex/react";

import { Skeleton } from "@/components/ui/skeleton";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

import { useState } from "react";
import { useS3Upload } from "next-s3-upload";

export default function Home() {
  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery(convexQuery(api.tasks.get, {}));

  const saveImage = useAction(api.files.saveImage);

  const [imageUrl, setImageUrl] = useState("");
  const { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

  const handleFileChange = async (file: File) => {
    /* let { url } = await uploadToS3(file); */
    console.log("file", file);
    const image = saveImage({ filename: file.name, filetype: file.type });
    console.log("image", image);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-6">
      <div className="flex flex-col gap-2 items-center">
        {tasks?.map(({ _id, text }) => <div key={_id}>{text}</div>)}
        {isLoading && (
          <>
            <Skeleton className="w-[120px] h-[24px] rounded-md" />
            <Skeleton className="w-[110px] h-[24px] rounded-md" />
            <Skeleton className="w-[130px] h-[24px] rounded-md" />
          </>
        )}
      </div>
      <ThemeSwitcher />
      <div>
        <FileInput onChange={handleFileChange} />

        <button onClick={openFileDialog}>Upload file</button>

        {imageUrl && <img src={imageUrl} />}
      </div>
    </main>
  );
}
