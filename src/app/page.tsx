import Link from "next/link";
import Auth from "./_components/auth";
import ClientComponent from "./posts/client";

export default async function HomePage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-3 bg-gradient-to-b p-5">
      <Auth />
      <Link
        href="/posts"
        className="rounded-xl bg-slate-200 p-2 disabled:bg-gray-200 disabled:text-gray-400"
      >
        Posts
      </Link>

      <ClientComponent />
    </div>
  );
}
