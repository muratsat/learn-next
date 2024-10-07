import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export default async function Auth() {
  const login = async () => {
    "use server";
    cookies().set("user", "murat");
    revalidatePath("/");
  };

  const logout = async () => {
    "use server";
    cookies().delete("user");
    revalidatePath("/");
  };

  return (
    <form className="space-x-3">
      <button
        className="rounded-xl bg-slate-200 p-2 disabled:bg-gray-200 disabled:text-gray-400"
        formAction={login}
        type="submit"
      >
        log in
      </button>
      <button
        className="rounded-xl bg-slate-200 p-2 disabled:bg-gray-200 disabled:text-gray-400"
        formAction={logout}
        type="submit"
      >
        log out
      </button>
    </form>
  );
}
