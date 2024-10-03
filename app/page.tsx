"use client";

import Image from "next/image";
import { api } from "../convex/_generated/api";
import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import useUploadAndSaveTask from "@/lib/upload";
import { Button } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";
import { TrashIcon } from "lucide-react"; // Import TrashIcon
import { useRef, useState } from "react";

export default function Home() {
  const { data: tasks, isLoading } = useQuery(convexQuery(api.tasks.get, {}));
  const {
    FileInput,
    openFileDialog,
    handleFileChange,
    isLoading: isUploading,
  } = useUploadAndSaveTask();

  const currentTaskIdRef = useRef<string | null>(null);
  const [hoveredImageId, setHoveredImageId] = useState<string | null>(null);

  const handleUploadClick = (taskId: string) => {
    currentTaskIdRef.current = taskId;
    openFileDialog();
  };

  const handleFileInputChange = async (file: File) => {
    const taskId = currentTaskIdRef.current;
    if (taskId) {
      await handleFileChange(file, taskId);
    }
  };

  const { mutate: unlinkImage, isPending: isUnlinking } = useMutation({
    mutationFn: useConvexMutation(api.tasks.unlinkImage),
  });

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-6">
      <div className="flex flex-col gap-2 items-center">
        {tasks?.map(({ _id, text, fileUrl }) => (
          <div className="relative flex items-center gap-2" key={_id}>
            <span>{text}</span>
            <div
              onMouseEnter={() => setHoveredImageId(_id)}
              onMouseLeave={() => setHoveredImageId(null)}
            >
              {fileUrl ? (
                hoveredImageId === _id ? (
                  // Show Trash Icon when hovered
                  <Button
                    className="size-8 rounded-md"
                    onClick={() => unlinkImage({ taskId: _id })}
                    variant="destructive"
                    size="icon"
                    disabled={isUnlinking}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                ) : (
                  // Show Image when not hovered
                  <Image
                    src={fileUrl}
                    alt=""
                    className="size-8 rounded-md"
                    height={50}
                    width={50}
                  />
                )
              ) : (
                <div>
                  <FileInput
                    onChange={(file: File) => handleFileInputChange(file)} // Call new function
                  />
                  <Button
                    onClick={() => handleUploadClick(_id)} // Store task ID and open dialog
                    disabled={isUploading}
                    variant="outline"
                    size="icon"
                  >
                    <UploadIcon className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <>
            <Skeleton className="w-[120px] h-[24px] rounded-md" />
            <Skeleton className="w-[110px] h-[24px] rounded-md" />
            <Skeleton className="w-[130px] h-[24px] rounded-md" />
          </>
        )}
      </div>
      <ThemeSwitcher />
    </main>
  );
}
