import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
  "/": true,
  "/login": true,
  "/sign-up": true,
  "/google/login": true,
  "/google/callback": true,
};

export async function middleware(request: NextRequest) {
  const exists = publicOnlyUrls[request.nextUrl.pathname];

  const session = await getSession();
  if (!session.id && !exists) {
    return NextResponse.redirect(new URL("/", request.url));
  } else if (session.id && exists) {
    return NextResponse.redirect(new URL("/home", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
