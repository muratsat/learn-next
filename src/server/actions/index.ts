"use server";
import { db } from "@/server/db";
import { posts } from "@/server/db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export async function addPost(
  formData: FormData,
): Promise<{ success: false; message: string } | { success: true }> {
  // await new Promise((r) => setTimeout(r, 2000));
  console.log("Server actions add post");

  const userCookie = cookies().get("user");

  if (userCookie?.value !== "murat")
    return { success: false, message: "unauthorized" };

  await db.insert(posts).values({
    name: formData.get("name")?.toString(),
  });

  revalidatePath("/", "layout");

  return { success: true };
}

export async function markAsRead(postId: number) {
  await db.update(posts).set({ isRead: true }).where(eq(posts.id, postId));

  revalidatePath("/");
}
