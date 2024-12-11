"use server";

import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export type TagType = { id: number; tagname: string };

type SaveFnArgs = {
  title: string;
  content: string;
  selectedTags: TagType[];
};

type TxType = Omit<
  PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;

const saveTag = async (tx: TxType, tagname: string) =>
  await tx.tag.create({ data: { tagname }, select: { id: true } });

export const save = async ({ title, content, selectedTags }: SaveFnArgs) => {
  const { orgTags, newTags } = selectedTags.reduce(
    (acc, t) => {
      if (t.id < 0) acc["newTags"].push(t);
      else acc["orgTags"].push(t);
      return acc;
    },
    { orgTags: [], newTags: [] } as { [key in string]: TagType[] }
  );

  const session = await getSession();

  await db.$transaction(async (tx) => {
    const note = await tx.note.create({
      data: {
        title,
        content,
        userId: session.id!,
      },
      select: {
        id: true,
      },
    });

    const newTagIds = await Promise.all(
      newTags.map((t) => saveTag(tx, t.tagname))
    );

    const allTagIds = [
      ...orgTags.map((t) => t.id),
      ...newTagIds.map((t) => t.id),
    ];

    await tx.noteTag.createMany({
      data: allTagIds.map((id) => ({ noteId: note.id, tagId: id })),
    });
  });

  await db.$disconnect();
};

export const getTags = async () => {
  return await db.tag.findMany({
    select: {
      id: true,
      tagname: true,
    },
  });
};
