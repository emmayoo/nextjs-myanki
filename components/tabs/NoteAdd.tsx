"use client";

import { redirect } from "next/navigation";
import { useRef, useState } from "react";
import { OutputData } from "@editorjs/editorjs";
import Editor from "@/components/Editor";
import { TagType, save } from "@/app/(tabs)/note/add/actions";

interface NoteAddContentProps {
  tags: TagType[];
}

export default function NoteAddContent({ tags }: NoteAddContentProps) {
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [content, setContent] = useState<OutputData>();
  const title = useRef<HTMLInputElement>(null);

  const handleSelectTag = (tag: TagType) => {
    if (!selectedTags.some((t) => t.id === tag.id)) {
      setSelectedTags((prev) => [...prev, tag]);
    }
    setInputValue("");
  };

  const handleCreateTag = () => {
    const trimedValue = inputValue.trim();
    if (!trimedValue) return;

    const oldTag = tags.find((t) => t.tagname === trimedValue);

    const newTag = {
      id: oldTag ? oldTag.id : Date.now() * -1,
      tagname: trimedValue,
    };

    setSelectedTags((prev) => [...prev, newTag]);
    setInputValue("");
  };

  const handleDeleteSelectedTag = (tag: TagType) => {
    setSelectedTags((prev) => prev.filter((t) => t.id !== tag.id));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const filteredTags = tags.filter((tag) =>
      tag.tagname.toLowerCase().includes(inputValue.toLowerCase())
    );

    if (e.key === "ArrowDown") {
      setHighlightedIndex((prev) =>
        prev === null ? 0 : Math.min(prev + 1, filteredTags.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prev) =>
        prev === null ? 0 : Math.max(prev - 1, 0)
      );
    } else if (e.key === "Enter") {
      if (highlightedIndex !== null) {
        const tagToAdd = filteredTags[highlightedIndex];
        console.log(tagToAdd);
        handleSelectTag(tagToAdd);
        setInputValue("");
        setHighlightedIndex(null);
      } else {
        if (
          selectedTags.every((tag) => tag.tagname.trim() !== inputValue.trim())
        ) {
          handleCreateTag();
        } else {
          setInputValue("");
        }
      }
    } else {
      setHighlightedIndex(null);
    }
  };

  const handleClick = async () => {
    if (!title.current?.value.trim() || !content) {
      alert("제목과 본문은 필수입니다.");
      return;
    }

    await save({
      title: title.current?.value ?? "",
      content: JSON.stringify(content),
      selectedTags,
    });

    redirect("/home");
  };

  return (
    <div className="w-full p-4 space-y-4 border border-gray-200 rounded-lg">
      <div className="font-bold	text-lg">등록하기</div>
      <div className="space-y-2">
        <div className="flex">
          <input
            type="text"
            placeholder="태그를 입력/검색 후 엔터를 눌러 추가하세요"
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
                tag.tagname.toLowerCase().includes(inputValue.toLowerCase())
              )
              .map((tag, index) => (
                <button
                  key={tag.id}
                  onClick={() => handleSelectTag(tag)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`block w-full text-left px-3 py-2 text-sm ${
                    highlightedIndex === index
                      ? "bg-blue-100 text-blue-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {tag.tagname}
                </button>
              ))}
          </div>
        )}
      </div>
      <div className="space-y-2">
        <h3 className="font-medium text-gray-700">선택된 태그</h3>
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <span
              key={tag.id}
              className="px-3 py-2 text-sm text-white bg-blue-500 rounded-lg flex items-center"
            >
              {tag.tagname}
              <button
                onClick={() => handleDeleteSelectedTag(tag)}
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
        <div className="flex-1 border rounded-lg focus-within:ring focus-within:ring-blue-200">
          <div className="w-full mx-4">
            <Editor setContent={setContent} />
          </div>
        </div>
      </div>
      <button onClick={handleClick} className="btn btn-primary w-full">
        추가
      </button>
    </div>
  );
}
