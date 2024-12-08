"use client";

import { PlusIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { useState } from "react";

interface HomeContentProps {
  tags: { id: number; tagname: string }[];
}

export default function HomeContent({ tags }: HomeContentProps) {
  const [selectedTags, setSelectedTags] = useState(tags.map((t) => t.id));
  const [selectedDateFilter, setSelectedDateFilter] = useState("전체");
  const [isCustomDateOpen, setIsCustomDateOpen] = useState(false);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const dateFilters = ["전체", "하루", "일주일"];

  const toggleTagSelection = (tagId: number) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((t) => t !== tagId) : [...prev, tagId]
    );
  };

  const handleDateFilterClick = (filter: string) => {
    setSelectedDateFilter(filter);
    setIsCustomDateOpen(false);
    setDateRange({ start: "", end: "" });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div className="p-4 space-y-4 border border-gray-200 rounded-lg">
        <div className="flex items-center">
          <span className="w-16 font-medium text-gray-700">태그</span>
          <div className="flex flex-wrap gap-2">
            {tags.length > 0
              ? tags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => toggleTagSelection(tag.id)}
                    className={`px-3 py-2 border rounded-lg text-sm ${
                      selectedTags.includes(tag.id)
                        ? "bg-blue-500 text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {tag.tagname}
                  </button>
                ))
              : "tag가 없습니다. (기본 태그 출력)"}
          </div>
        </div>

        <div className="flex items-center">
          <span className="w-16 font-medium text-gray-700">날짜</span>
          <div className="flex gap-2">
            {dateFilters.map((type) => (
              <button
                key={type}
                onClick={() => handleDateFilterClick(type)}
                className={`px-3 py-2 border rounded-lg text-sm ${
                  selectedDateFilter === type
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {type}
              </button>
            ))}
            <button
              onClick={() => setIsCustomDateOpen(true)}
              className={`px-3 py-2 border rounded-lg text-sm ${
                selectedDateFilter === "맞춤 날짜"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              맞춤 날짜
            </button>
          </div>
        </div>

        {isCustomDateOpen && (
          <div className="flex items-center mt-4">
            <span className="w-16"></span>
            <div className="flex items-center gap-4">
              <input
                type="date"
                name="start"
                value={dateRange.start}
                onChange={handleDateChange}
                className="px-2 py-1 border rounded-lg text-sm"
              />
              ~
              <input
                type="date"
                name="end"
                value={dateRange.end}
                onChange={handleDateChange}
                className="px-2 py-1 border rounded-lg text-sm"
              />
              <button onClick={() => setSelectedDateFilter("맞춤 날짜")}>
                검색
              </button>
            </div>
          </div>
        )}
      </div>
      {/* <HomeList tags={selectedTags} /> */}
      <Link
        href="/note/add"
        className="bg-gray-600 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-gray-400"
      >
        <PlusIcon className="size-10" />
      </Link>
    </div>
  );
}
