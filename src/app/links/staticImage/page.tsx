import { env } from "@/env";
import { db } from "@/server/db";
import { posts } from "@/server/db/schema";
import { count } from "drizzle-orm";
import { type Metadata } from "next";
import { headers } from "next/headers";

const getBaseUrl = () => {
  const headerstList = headers();
  const host = headerstList.get("host");
  const prefix = env.NODE_ENV === "production" ? "https://" : "http://";

  return prefix + host;
};

export async function generateMetadata(): Promise<Metadata> {
  const title = "hello";

  return {
    title: title,
    description: title,
    openGraph: {
      images: [
        {
          url: `${getBaseUrl()}/metadata.png`,
          width: 1000,
          height: 600,
          alt: title,
        },
      ],
    },
  };
}

export default async function PreviewImage() {
  const totalPosts =
    (await db.select({ count: count() }).from(posts)).at(0)?.count ?? 0;

  return (
    <div>
      <h1>Total Posts</h1>
      <p>{totalPosts}</p>
    </div>
  );
}
