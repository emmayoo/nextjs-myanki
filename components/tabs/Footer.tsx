"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon as SolidHomeIcon,
  ChartPieIcon as SolidChartPieIcon,
  UserIcon as SolidUserIcon,
} from "@heroicons/react/24/solid";
import {
  HomeIcon as OutlineHomeIcon,
  ChartPieIcon as OutlineChartPieIcon,
  UserIcon as OutlineUserIcon,
} from "@heroicons/react/24/outline";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-800 text-white flex justify-around py-4 lg:hidden">
      <Link href="/home" className="flex flex-col items-center gap-px">
        {pathname === "/home" ? (
          <SolidHomeIcon className="w-7 h-7" />
        ) : (
          <OutlineHomeIcon className="w-7 h-7" />
        )}
        <span>홈</span>
      </Link>
      <Link href="/score" className="flex flex-col items-center gap-px">
        {pathname === "/score" ? (
          <SolidChartPieIcon className="w-7 h-7" />
        ) : (
          <OutlineChartPieIcon className="w-7 h-7" />
        )}
        <span>통계</span>
      </Link>
      <Link href="/profile" className="flex flex-col items-center gap-px">
        {pathname === "/profile" ? (
          <SolidUserIcon className="w-7 h-7" />
        ) : (
          <OutlineUserIcon className="w-7 h-7" />
        )}
        <span>계정</span>
      </Link>
    </footer>
  );
}
