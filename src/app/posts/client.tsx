"use client";

import { serverAction } from "./actions";

export default function ClientComponent() {
  return (
    <form
      action={async () => {
        const response = await serverAction();
        const summary = `
        Server time: ${response.serverTime}
        Latest post: ${response.post?.name ?? "No post"}
        `;
        alert(summary);
      }}
    >
      <button
        className="rounded-xl bg-slate-200 p-2 disabled:bg-gray-200 disabled:text-gray-400"
        type="submit"
      >
        Invoke server action from client
      </button>
    </form>
  );
}
