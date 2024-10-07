"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

export function Pagination({ totalPages }: { totalPages: number }) {
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [currentPage, setCurrentPage] = useState(
    searchParams.get("page") ?? "1",
  );

  const handlePage = (direction: "prev" | "next") => {
    const params = new URLSearchParams(searchParams);
    const current = parseInt(params.get("page") ?? "1");
    if (current === 1 && direction === "prev") return;

    const next = direction === "next" ? current + 1 : current - 1;
    if (next < 1 || next > totalPages) return;

    startTransition(() => {
      setCurrentPage(next.toString());

      if (next == 1) {
        params.delete("page");
      } else {
        params.set("page", next.toString());
      }

      router.replace(`${pathName}?${params.toString()}`);
    });
  };

  if (totalPages <= 0) return null;

  return (
    <div className="grid w-full grid-cols-3 gap-2 p-1">
      <button
        disabled={currentPage === "1" || isPending}
        className="rounded-xl bg-slate-200 p-2 disabled:bg-gray-200 disabled:text-gray-400"
        onClick={() => handlePage("prev")}
      >
        prev
      </button>
      <h1 className="flex items-center justify-center text-center">{`Page ${currentPage} / ${totalPages}`}</h1>
      <button
        disabled={currentPage === totalPages.toString() || isPending}
        className="rounded-xl bg-slate-200 p-2 disabled:bg-gray-200 disabled:text-gray-400"
        onClick={() => handlePage("next")}
      >
        next
      </button>
    </div>
  );
}
