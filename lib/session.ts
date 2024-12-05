import { cookies } from "next/headers";
import { getIronSession, SessionOptions } from "iron-session";

interface SessionContent {
  id?: number;
}

export const getSession = async () => {
  return await getIronSession<SessionContent>(await cookies(), {
    cookieName: "myanki",
    password: process.env.COOKIE_PASSWORD,
  } as SessionOptions);
};

export const saveSession = async (id: number) => {
  const session = await getSession();
  session.id = id;
  await session.save();
};
