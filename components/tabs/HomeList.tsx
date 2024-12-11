import { useEffect, useState } from "react";
import { NoteListType } from "@/app/(tabs)/home/page";
import { formatDate } from "@/lib/utils";

interface HomeListProps {
  notes: NoteListType;
}

export default function HomeList({ notes }: HomeListProps) {
  const [selected, setSelected] = useState<{ [key: number]: boolean }>({});

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.currentTarget.checked;
    const obj = {} as { [key: number]: boolean };
    for (const s in selected) {
      obj[s] = isChecked;
    }
    setSelected(obj);
  };

  const handleSelectItem = (id: number) => {
    setSelected((i) => ({ ...i, [id]: !selected[id] }));
  };

  useEffect(() => {
    const s = notes.reduce((acc, n) => {
      acc[n.id] = false;
      return acc;
    }, {} as { [key: number]: boolean });
    setSelected(s);
  }, [notes]);

  return (
    <div className="overflow-x-auto pt-6">
      <table className="table">
        <thead>
          <tr>
            <th>
              <label>
                <input
                  onChange={handleSelectAll}
                  checked={notes.every((item) => selected[item.id])}
                  type="checkbox"
                  className="checkbox"
                />
              </label>
            </th>
            <th>제목</th>
            <th>생성 날짜</th>
            <th>태그</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((item) => (
            <tr
              key={item.id}
              className={selected[item.id] ? "bg-gray-100" : ""}
            >
              <th>
                <label>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={selected[item.id] ?? false}
                    onChange={() => handleSelectItem(item.id)}
                  />
                </label>
              </th>
              <td>{item.title}</td>
              <td>{formatDate(item.created_at)}</td>
              <td>
                {item.noteTags.map((i) => (
                  <div key={i.tagId}>{i.tag.tagname}</div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
