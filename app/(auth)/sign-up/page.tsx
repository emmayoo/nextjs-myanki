"use client";

import SocialLogin from "@/components/auth/social-login";
import Button from "@/components/Button";
import Input from "@/components/Input";
import React, { useActionState } from "react";
import { createUser } from "./actions";

export default function SignUp() {
  const [state, action] = useActionState(createUser, null);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="card w-96 bg-white shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">회원가입</h2>
          <form action={action}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">이름</span>
              </label>
              <Input
                type="text"
                name="username"
                placeholder="이름을 입력하세요"
                errors={state?.fieldErrors.username}
                required
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">이메일</span>
              </label>
              <Input
                type="email"
                name="email"
                placeholder="이메일을 입력하세요"
                errors={state?.fieldErrors.email}
                required
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">비밀번호</span>
              </label>
              <Input
                type="password"
                name="password"
                placeholder="비밀번호를 입력하세요"
                errors={state?.fieldErrors.password}
                required
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">비밀번호 확인</span>
              </label>
              <Input
                type="confirmPassword"
                name="confirmPassword"
                placeholder="비밀번호를 다시 입력하세요"
                errors={state?.fieldErrors.confirmPassword}
                required
              />
            </div>

            <div className="form-control mt-6">
              <Button text="회원가입" />
            </div>
          </form>

          <div className="divider">또는</div>
          <SocialLogin />

          <div className="text-center mt-4">
            <p className="text-sm">
              이미 계정이 있나요?{" "}
              <a href="/login" className="text-primary hover:underline">
                로그인
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
