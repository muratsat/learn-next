"use client";

import { addPost } from "@/server/actions";
import { useFormStatus } from "react-dom";

export default function NewPost() {
  const createNewPost = async (formData: FormData) => {
    const result = await addPost(formData);
    if (!result.success) alert(result.message);
  };

  const SubmitButton = () => {
    const { pending } = useFormStatus();

    return (
      <button
        className="rounded-xl bg-slate-200 p-2 disabled:bg-gray-200 disabled:text-gray-400"
        type="submit"
        disabled={pending}
      >
        post
      </button>
    );
  };

  return (
    <form
      action={createNewPost}
      className="flex w-full max-w-sm flex-col gap-3 rounded-lg bg-gray-100 p-4"
    >
      <input className="rounded-lg border border-gray-300 p-1" name="name" />
      <SubmitButton />
    </form>
  );
}
