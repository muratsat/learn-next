import { db } from "@/server/db";
import { posts } from "@/server/db/schema";
import { eq } from "drizzle-orm";

import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const post = await db.query.posts.findFirst({
    where: eq(posts.id, parseInt(params.id)),
  });

  const imageSizes = [
    { width: 500, height: 600 },
    { width: 1000, height: 600 },
    { width: 1500, height: 600 },
  ];

  const title = post?.name ? post.name.substring(0, 10) : "Post not found";

  return {
    title: title,
    description: post?.name ?? "Post not found",
    openGraph: {
      images: imageSizes.map((size) => ({
        url: `https://via.placeholder.com/${size.width}x${size.height}?text=${title}`,
        width: size.width,
        height: size.height,
        alt: post?.name ?? "Post not found",
      })),
    },
  };
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await db.query.posts.findFirst({
    where: eq(posts.id, parseInt(params.id)),
  });

  if (!post) return <div>Post not found</div>;

  return (
    <main className="flex min-h-screen w-full flex-col items-center gap-3 bg-gradient-to-b p-5">
      <div className="w-full max-w-sm rounded-lg bg-gray-100 p-3">
        <h1>{post.name}</h1>
        <p>{post.createdAt.toLocaleDateString()}</p>
      </div>
    </main>
  );
}
