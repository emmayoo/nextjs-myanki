"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Bars3Icon,
  HomeIcon as SolidHomeIcon,
  ChartPieIcon as SolidChartPieIcon,
  UserIcon as SolidUserIcon,
} from "@heroicons/react/24/solid";
import {
  HomeIcon as OutlineHomeIcon,
  ChartPieIcon as OutlineChartPieIcon,
  UserIcon as OutlineUserIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

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
            href="/home"
            className="w-10 h-10 p-2 rounded-md hover:bg-gray-600"
          >
            {pathname === "/home" ? <SolidHomeIcon /> : <OutlineHomeIcon />}
          </Link>
          <Link
            href="/score"
            className="w-10 h-10 p-2 rounded-md hover:bg-gray-600"
          >
            {pathname === "/score" ? (
              <SolidChartPieIcon className="w-7 h-7" />
            ) : (
              <OutlineChartPieIcon className="w-7 h-7" />
            )}
          </Link>
          <Link
            href="/profile"
            className="w-10 h-10 p-2 rounded-md hover:bg-gray-600"
          >
            {pathname === "/profile" ? (
              <SolidUserIcon className="w-7 h-7" />
            ) : (
              <OutlineUserIcon className="w-7 h-7" />
            )}
          </Link>
        </div>
      </div>
      {isOpen && (
        <div className="p-4">
          <div className="mt-20">
            <span>즐겨찾기</span>
            <nav>
              <ul>
                {["test1", "test2"].map((card, i) => (
                  <li key={i}>{card}</li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
