import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6 bg-gray-100">
      <div className="my-auto flex flex-col items-center gap-4 text-center">
        <span className="text-9xl">📒</span>
        <h1 className="text-4xl font-bold">나만의 암기장</h1>
        <h2 className="text-2xl text-gray-600">어서오세요!</h2>
      </div>

      <div className="flex flex-col items-center gap-10 w-full">
        <Link href="/sign-up">
          <button className="btn btn-primary w-full max-w-xs text-lg">
            시작하기
          </button>
        </Link>

        <div className="flex gap-2 text-gray-700 pb-10">
          <span>이미 계정이 있나요?</span>
          <Link href="/login" className="text-primary hover:underline">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
