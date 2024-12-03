import SocialLogin from "@/components/auth/social-login";
import Link from "next/link";
export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="card w-96 bg-white shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">로그인</h2>
          <form>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">이메일</span>
              </label>
              <input
                type="email"
                placeholder="이메일을 입력하세요"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">비밀번호</span>
              </label>
              <input
                type="password"
                placeholder="비밀번호를 입력하세요"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary w-full max-w-lg">
                로그인
              </button>
            </div>
          </form>

          <div className="divider">또는</div>
          <SocialLogin />

          <div className="text-center mt-4">
            <p className="text-sm">
              계정이 없으신가요?{" "}
              <Link href="/sign-up" className="text-primary hover:underline">
                회원가입
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
