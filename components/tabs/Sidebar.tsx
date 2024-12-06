"use client";

import Link from "next/link";
import { useState } from "react";

import { Bars3Icon } from "@heroicons/react/24/solid";
import { ChartPieIcon, UserIcon } from "@heroicons/react/24/outline";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`h-full bg-gray-800 text-white transition-transform ${
        isOpen ? "w-64" : "w-0"
      }`}
    >
      <div className="absolute top-4 left-4 w-56 flex justify-between items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gray-600 text-white p-2 rounded-md"
        >
          <Bars3Icon className="size-6 " />
        </button>

        <div className="flex">
          <Link
            href="/profile"
            className="w-10 h-10 p-2 rounded-md hover:bg-gray-600"
          >
            <UserIcon />
          </Link>
          <Link
            href="/score"
            className="w-10 h-10 p-2 rounded-md hover:bg-gray-600"
          >
            <ChartPieIcon />
          </Link>
        </div>
      </div>
      {isOpen && (
        <div className="p-4">
          <div className="mt-12">
            <Link href="/home" className="py-2 px-4 hover:bg-gray-700">
              Home
            </Link>
          </div>

          <nav>
            <ul>
              {["test1", "test2"].map((card, i) => (
                <li key={i}>{card}</li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
