import Editor from "@/components/Editor";
import HomeContent from "@/components/tabs/HomeContent";
import db from "@/lib/db";

export default async function Home() {
  const tags = await db.tag.findMany({
    select: {
      id: true,
      tagname: true,
    },
  });

  return (
    <div>
      <HomeContent
        tags={[
          { id: 1, tagname: "test1" },
          { id: 2, tagname: "test2" },
          { id: 3, tagname: "test3" },
        ]}
      />
      <Editor />
    </div>
  );
}
