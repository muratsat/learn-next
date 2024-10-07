import { db } from "@/server/db";
import { posts } from "@/server/db/schema";
import { count } from "drizzle-orm";
import { type Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const imageSizes = [
    { width: 500, height: 600 },
    { width: 1000, height: 600 },
    { width: 1500, height: 600 },
  ];

  const totalPosts =
    (await db.select({ count: count() }).from(posts)).at(0)?.count ?? 0;

  return {
    title: `Total Posts: ${totalPosts}`,
    description: `Total Posts: ${totalPosts}`,
    openGraph: {
      images: imageSizes.map((size) => ({
        url: `https://via.placeholder.com/${size.width}x${size.height}?text=${totalPosts}`,
        width: size.width,
        height: size.height,
        alt: totalPosts.toString(),
      })),
    },
  };
}

export default async function Page() {
  const totalPosts =
    (await db.select({ count: count() }).from(posts)).at(0)?.count ?? 0;

  return (
    <div>
      <h1>Total Posts</h1>
      <p>{totalPosts}</p>
    </div>
  );
}
