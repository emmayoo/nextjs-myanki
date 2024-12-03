"use client";

import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
}

export default function Button({ text }: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} className="btn btn-primary w-full">
      {pending ? (
        <span className="loading loading-dots loading-md"></span>
      ) : (
        text
      )}
    </button>
  );
}
