"use server";

import { db } from "@/server/db";
import { posts } from "@/server/db/schema";
import { desc } from "drizzle-orm";

export async function serverAction() {
  console.log("hello from server");

  const serverTime = new Date().toLocaleTimeString();

  console.log("serverTime", serverTime);

  const post = await db.query.posts.findFirst({
    orderBy: desc(posts.id),
  });

  return {
    serverTime,
    post,
  };
}
