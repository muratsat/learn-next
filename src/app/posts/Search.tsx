"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function Search() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  const handleChange = (newSearchQuery: string) => {
    setQuery(newSearchQuery);

    const params = new URLSearchParams(searchParams);

    if (newSearchQuery === "") {
      params.delete("q");
    } else {
      params.set("q", newSearchQuery);
    }

    router.replace(`${pathName}?${params.toString()}`);
  };

  return (
    <div className="flex w-full flex-row justify-between gap-2 p-1">
      <input value={query} onChange={(e) => handleChange(e.target.value)} />
    </div>
  );
}
