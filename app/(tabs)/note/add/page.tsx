import NoteAddContent from "@/components/tabs/NoteAdd";
import { getTags } from "./actions";

export default async function NoteAdd() {
  const tags = await getTags();

  return <NoteAddContent tags={tags} />;
}
