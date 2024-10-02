"use client";

import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "../convex/_generated/api";
import { Skeleton } from "@/components/ui/skeleton";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

export default function Home() {
  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery(convexQuery(api.tasks.get, {}));

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
    </main>
  );
}
