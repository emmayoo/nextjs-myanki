"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6 bg-gray-100">
      <div className="my-auto flex flex-col items-center gap-4 text-center">
        <span className="text-9xl">😢</span>
        <h1 className="text-4xl font-bold">오류가 발생했어요... :(</h1>
      </div>

      <div className="flex flex-col items-center gap-10 w-full">
        <button
          className="btn btn-primary w-full max-w-xs text-lg"
          onClick={() => reset()}
        >
          다시 시도하기
        </button>
      </div>
    </div>
  );
}
