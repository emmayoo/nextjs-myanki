import { UserIcon } from "@heroicons/react/16/solid";

export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">My Account</h1>
      <div className="flex items-center space-x-4 mb-6">
        <div className="avatar">
          <UserIcon className="w-16 rounded-full" />
        </div>
        <div className="animate-pulse *:rounded-md flex flex-col gap-2">
          <div className="bg-neutral-700 h-5 w-40" />
          <div className="bg-neutral-700 h-5 w-40" />
        </div>
      </div>
    </div>
  );
}
