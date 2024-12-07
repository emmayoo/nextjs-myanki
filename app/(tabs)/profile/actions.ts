"use server";

import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export const logOut = async () => {
  const session = await getSession();
  await session.destroy();
  redirect("/");
};
