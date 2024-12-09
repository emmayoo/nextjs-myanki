"use client";

import { useRef, useState } from "react";
import Editor from "@/components/Editor";
import { OutputData } from "@editorjs/editorjs";
import { save } from "./actions";

export default function NoteAdd() {
  const [tags, setTags] = useState([{ id: 1, name: "test1" }]);
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [content, setContent] = useState<OutputData>();
  const title = useRef<HTMLInputElement>(null);

  const handleSelectTag = (tagId: number) => {
    if (selectedTagIds.includes(tagId)) {
      setSelectedTagIds((prev) => prev.filter((id) => id !== tagId));
    } else {
      setSelectedTagIds((prev) => [...prev, tagId]);
    }
  };

  const handleCreateTag = () => {
    if (!inputValue.trim()) return;

    const newTag = {
      id: Date.now() * -1,
      name: inputValue.trim(),
    };
    setTags((prev) => [...prev, newTag]);
    setSelectedTagIds((prev) => [...prev, newTag.id]);
    setInputValue("");
  };

  const handleDeleteSelectedTag = (tagId: number) => {
    setSelectedTagIds((prev) => prev.filter((id) => id !== tagId));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const filteredTags = tags.filter((tag) =>
      tag.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prev) =>
        prev === null ? 0 : Math.min(prev + 1, filteredTags.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prev) =>
        prev === null ? 0 : Math.max(prev - 1, 0)
      );
    } else if (e.key === "Enter" && !!highlightedIndex) {
      const tagToAdd = filteredTags[highlightedIndex];
      handleSelectTag(tagToAdd.id);
      setInputValue("");
      setHighlightedIndex(null);
    } else if (e.key === "Enter" && !highlightedIndex) {
      if (tags.every((tag) => tag.name.trim() !== inputValue.trim())) {
        handleCreateTag();
      } else {
        setInputValue("");
      }
      setHighlightedIndex(null);
    }
  };

  const handleClick = async () => {
    await save({
      title: title.current?.value ?? "",
      content: JSON.stringify(content),
      tags,
      selectedTagIds,
    });
  };

  return (
    <div className="w-full p-4 space-y-4 border border-gray-200 rounded-lg">
      <div className="space-y-2">
        <div className="flex">
          <input
            type="text"
            placeholder="태그를 검색하거나 추가하세요"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 px-3 py-2 border rounded-lg text-sm focus:ring focus:ring-blue-200"
          />
        </div>
        {inputValue && (
          <div className="mt-2 max-h-40 overflow-y-auto border border-gray-300 rounded-lg">
            {tags
              .filter((tag) =>
                tag.name.toLowerCase().includes(inputValue.toLowerCase())
              )
              .map((tag, index) => (
                <button
                  key={tag.id}
                  onClick={() => handleSelectTag(tag.id)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`block w-full text-left px-3 py-2 text-sm ${
                    highlightedIndex === index
                      ? "bg-blue-100 text-blue-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {tag.name}
                </button>
              ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="font-medium text-gray-700">선택된 태그</h3>
        <div className="flex flex-wrap gap-2">
          {tags
            .filter((tag) => selectedTagIds.includes(tag.id))
            .map((tag) => (
              <span
                key={tag.id}
                className="px-3 py-2 text-sm text-white bg-blue-500 rounded-lg flex items-center"
              >
                {tag.name}
                <button
                  onClick={() => handleDeleteSelectedTag(tag.id)}
                  className="ml-2 text-white hover:text-red-500"
                >
                  &times;
                </button>
              </span>
            ))}
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <input
          type="text"
          placeholder="제목"
          ref={title}
          className="flex-1 px-3 py-2 border rounded-lg text-sm focus:ring focus:ring-blue-200"
          required
        />
        <div className="flex-1 bg-gray-400 relative">
          <div className="w-full mx-14">
            <Editor setContent={setContent} />
          </div>
        </div>
      </div>

      <button onClick={handleClick}>추가</button>
    </div>
  );
}
