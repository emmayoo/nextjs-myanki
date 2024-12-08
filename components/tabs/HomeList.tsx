import db from "@/lib/db";

interface HomeListProps {
  tags: number[];
}

export default async function HomeList({ tags }: HomeListProps) {
  const noteTags = await db.noteTag.findMany({
    where: {
      tagId: {
        in: tags,
      },
    },
    select: {
      noteId: true,
    },
  });

  const uniqueNoteIds = [...new Set(noteTags.map((nt) => nt.noteId))];

  const notes = await db.note.findMany({
    where: {
      id: {
        in: uniqueNoteIds,
      },
    },
    include: {
      tags: true,
    },
  });
  console.log(notes);

  return <div></div>;
}
