"use server";

import db from "@/lib/db";

type SaveFnArgs = {
  title: string;
  content: string;
  tags: { id: number; name: string }[];
  selectedTagIds: number[];
};

const saveTag = async (name: string) =>
  await db.tag.create({ data: { tagname: name }, select: { id: true } });

const saveNoteTag = async (noteId: number, tagId: number) =>
  await db.noteTag.create({ data: { noteId, tagId } });

export const save = async ({
  title,
  content,
  tags,
  selectedTagIds,
}: SaveFnArgs) => {
  const note = await db.note.create({
    data: {
      title,
      content,
    },
    select: {
      id: true,
    },
  });

  if (!note) throw Error("노트 생성 중 오류. TODO");

  const newTagNames = tags
    .filter((tag) => selectedTagIds.includes(tag.id) && tag.id < 0)
    .map((t) => t.name);

  const newTags = await Promise.all(newTagNames.map((n) => saveTag(n)));
  const allTags = [
    ...selectedTagIds.filter((i) => i > 0),
    ...newTags.map((t) => t.id),
  ];

  await Promise.all(allTags.map((n) => saveNoteTag(note.id, n)));
};
