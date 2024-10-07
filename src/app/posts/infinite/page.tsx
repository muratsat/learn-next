import NewPost from "@/app/_components/new-post";
import { posts } from "@/server/db/schema";
import { notFound } from "next/navigation";
import Auth from "@/app/_components/auth";
import { getPosts } from "@/server/data";

export default async function HomePage({
  searchParams,
}: {
  searchParams?: { page?: string; q?: string };
}) {
  const limit = 6;
  const page = parseInt(searchParams?.page ?? "1");
  if (isNaN(page)) return notFound();

  return (
    <main className="flex min-h-screen w-full flex-col items-center gap-3 bg-gradient-to-b p-5">
      <Auth />
      <NewPost />
      <div className="w-full max-w-sm rounded-lg bg-gray-100 p-3">
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
    <div>
      {currentPosts.map((p) => (
        <div key={p.id}>
          {p.id} {p.createdAt.toLocaleDateString()} {p.name ?? "Empty"}
        </div>
      ))}
    </div>
  );
}
