"use server";
import { db } from "@/server/db";
import { posts } from "@/server/db/schema";
import { desc, eq } from "drizzle-orm";
import { cookies } from "next/headers";

export async function getPosts({
  limit,
  page,
}: {
  limit: number;
  page: number;
}): Promise<
  | { success: false; message: string }
  | { success: true; data: (typeof posts.$inferSelect)[] }
> {
  // await new Promise((r) => setTimeout(r, 1000));
  // const userCookie = cookies().get("user");
  // if (!userCookie?.value) return { success: false, message: "unauthorized" };

  const postsBatch = await db.query.posts.findMany({
    orderBy: desc(posts.createdAt),
    limit: limit,
    offset: limit * (page - 1),
  });

  return {
    success: true,
    data: postsBatch,
  };
}

export async function getUnread(): Promise<
  | { success: false; message: string }
  | { success: true; data: (typeof posts.$inferSelect)[] }
> {
  const userCookie = cookies().get("user");
  if (!userCookie?.value) return { success: false, message: "unauthorized" };

  const unread = await db
    .update(posts)
    .set({ isRead: true })
    .where(eq(posts.isRead, false))
    .returning();

  return {
    success: true,
    data: unread,
  };
}
