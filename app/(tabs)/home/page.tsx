import db from "@/lib/db";
import { getSession } from "@/lib/session";

export default async function Home() {
  const id = (await getSession()).id;
  const user = await db.user.findUnique({
    where: { id: Number(id) },
    select: { username: true },
  });
  return <h1>hello {user?.username}</h1>;
}
