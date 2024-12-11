import HomeContent from "@/components/tabs/HomeContent";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { notFound } from "next/navigation";
import { getSession } from "@/lib/session";

const getNoteList = async () => {
  const session = await getSession();
  if (!session) return notFound();
  const notes = await db.note.findMany({
    where: {
      userId: session.id!,
    },

    include: {
      NoteTag: {
        include: {
          tag: true,
        },
      },
    },
  });
  return notes;
};

export type NoteListType = Prisma.PromiseReturnType<typeof getNoteList>;

export default async function Home() {
  const notes = await getNoteList();

  const tagIds = notes.flatMap((n) => n.noteTags.map((t) => t.tagId));

  const tags = await db.tag.findMany({
    where: {
      id: {
        in: tagIds,
      },
    },
    select: {
      id: true,
      tagname: true,
    },
  });

  return (
    <div>
      <HomeContent tags={tags} notes={notes} />
    </div>
  );
}
