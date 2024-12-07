import db from "@/lib/db";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { UserIcon } from "@heroicons/react/24/solid";
import PasswordUpdate from "@/components/tabs/ProfileDetail";
import { logOut } from "./actions";

export default async function Profile() {
  const session = await getSession();

  if (!session.id) {
    await session.destroy();
    redirect("/");
  }

  const user = await db.user.findUnique({
    where: { id: session.id },
    select: {
      username: true,
      email: true,
      google_id: true,
      phone: true,
      avatar: true,
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">My Account</h1>
      <div className="flex items-center space-x-4 mb-6">
        <div className="avatar">
          <UserIcon className="w-16 rounded-full" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">{user?.username}</h2>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>

      <PasswordUpdate />

      <hr className="my-6 border-gray-300" />
      <div>
        <form action={logOut}>
          <button className="btn btn-error w-full">로그아웃</button>
        </form>
      </div>
    </div>
  );
}
