"use client";

import { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function PasswordUpdate() {
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  return (
    <div className="mb-6">
      <button
        className="btn btn-primary w-full mb-4"
        onClick={() => setShowPasswordChange(!showPasswordChange)}
      >
        {showPasswordChange ? "비밀번호 변경 닫기" : "비밀번호 변경 열기"}
      </button>
      {showPasswordChange && (
        <form className="space-y-4">
          <Input
            type="password"
            name="password"
            placeholder="현재 비밀번호"
            className="input input-bordered w-full"
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="새 비밀번호"
            className="input input-bordered w-full"
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="새 비밀번호 확인"
            className="input input-bordered w-full"
            required
          />
          <Button text="비밀번호 변경" />
        </form>
      )}
    </div>
  );
}
