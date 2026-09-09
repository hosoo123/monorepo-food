"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAdmin, isLoggedIn } from "@/lib/auth";
import { LoadingSpinner } from "@/app/_components/LoadingSpinner";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoggedIn()) {
        router.replace("/login");
        return;
      }

      if (!isAdmin()) {
        router.replace("/");
        return;
      }

      setAllowed(true);
    }, 0);

    return () => clearTimeout(timer);
  }, [router]);

  if (!allowed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-[#FAFAFA]">
        <LoadingSpinner className="h-8 w-8" />
        <p className="text-sm text-zinc-500">Checking access...</p>
      </div>
    );
  }

  return <>{children}</>;
}
