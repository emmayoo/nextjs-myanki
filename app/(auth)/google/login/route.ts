import { NextResponse } from "next/server";

export async function GET() {
  const baseURL = "https://accounts.google.com/o/oauth2/v2/auth";
  const params = {
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: "http://localhost:3000/google/callback",
    response_type: "code",
    scope: "email profile",
  };
  const formattedParams = new URLSearchParams(params).toString();

  return NextResponse.json({ url: `${baseURL}?${formattedParams}` });
}
