import NewPost from "@/app/_components/new-post";
import { db } from "@/server/db";
import { posts } from "@/server/db/schema";
import { desc, eq } from "drizzle-orm";
import Auth from "@/app/_components/auth";
import { markAsRead } from "@/server/actions";

export default async function HomePage({
  searchParams,
}: {
  searchParams?: { page?: string; q?: string };
}) {
  const unread = await db
    .select()
    .from(posts)
    .where(eq(posts.isRead, false))
    .orderBy(desc(posts.id));

  if (!unread) return <h1> Not found </h1>;

  return (
    <main className="flex min-h-screen w-full flex-col items-center gap-3 bg-gradient-to-b p-5">
      <Auth />
      <NewPost />
      <div className="w-full max-w-sm rounded-lg bg-gray-100 p-3">
        <Posts currentPosts={unread} withUnread />
      </div>
    </main>
  );
}

function Posts({
  currentPosts,
  withUnread,
}: {
  currentPosts: (typeof posts.$inferSelect)[];
  withUnread: boolean;
}) {
  if (currentPosts.length === 0) return <div> No posts </div>;

  return (
    <div>
      {currentPosts.map((p) => {
        const action = markAsRead.bind(null, p.id);
        return (
          <div key={p.id}>
            {p.id} {p.createdAt.toLocaleDateString()} {p.name ?? "Empty"}
            {withUnread && (
              <form>
                <button formAction={action}>
                  <b> Mark as read </b>
                </button>
              </form>
            )}
          </div>
        );
      })}
    </div>
  );
}
