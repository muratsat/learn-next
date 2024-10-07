import NewPost from "@/app/_components/new-post";
import { db } from "@/server/db";
import { posts } from "@/server/db/schema";
import { count } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Pagination } from "./Pagination";
import Auth from "@/app/_components/auth";
import { getPosts } from "@/server/data";
import Link from "next/link";

export default async function HomePage({
  searchParams,
}: {
  searchParams?: { page?: string; q?: string };
}) {
  const limit = 6;
  const page = parseInt(searchParams?.page ?? "1");
  if (isNaN(page)) return notFound();

  const totalPosts =
    (await db.select({ count: count() }).from(posts)).at(0)?.count ?? 0;

  return (
    <main className="flex min-h-screen w-full flex-col items-center gap-3 bg-gradient-to-b p-5">
      <Link
        href="/"
        className="rounded-xl bg-slate-200 p-2 disabled:bg-gray-200 disabled:text-gray-400"
      >
        Home
      </Link>
      <Auth />
      <NewPost />
      <div className="w-full max-w-sm rounded-lg bg-gray-100 p-3">
        <Pagination totalPages={Math.ceil(totalPosts / limit)} />
        <CurrentPosts {...{ limit, page }} />
      </div>
    </main>
  );
}

async function CurrentPosts({ limit, page }: { limit: number; page: number }) {
  const postsBatch = await getPosts({ limit, page });
  if (!postsBatch.success) return <h1> {postsBatch.message} </h1>;

  return <Posts currentPosts={postsBatch.data} />;
}

function Posts({
  currentPosts,
}: {
  currentPosts: (typeof posts.$inferSelect)[];
}) {
  if (currentPosts.length === 0) return <div> No posts </div>;

  return (
    <div className="flex flex-col gap-2 py-3">
      {currentPosts.map((p) => (
        <Link
          key={p.id}
          href={`/posts/${p.id}`}
          className="rounded-lg border border-gray-300 bg-stone-50 p-2 hover:border-black"
        >
          {p.id} {p.createdAt.toLocaleDateString()} {p.name ?? "Empty"}
        </Link>
      ))}
    </div>
  );
}
