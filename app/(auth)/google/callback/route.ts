import db from "@/lib/db";
import { saveSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

const getAccessToken = async (code: string) => {
  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    client_secret: process.env.GOOGLE_CLIENT_SECRET!,
    redirect_uri: "http://localhost:3000/google/callback",
    code,
    grant_type: "authorization_code",
  }).toString();

  const accessTokenURL = `https://oauth2.googleapis.com/token?${accessTokenParams}`;
  const accessTokenResponse = await fetch(accessTokenURL, {
    method: "POST",
    headers: {
      Accept: "application/x-www-form-urlencoded",
    },
  });

  return await accessTokenResponse.json();
};

const getUserInfo = async (access_token: string) => {
  const response = await fetch(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: "no-cache",
    }
  );
  return await response.json();
};

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return new Response(null, {
      status: 400,
    });
  }

  const { error, access_token } = await getAccessToken(code);
  if (error) {
    return new Response(null, {
      status: 400,
    });
  }

  const { sub, name, email, picture } = await getUserInfo(access_token);

  const user = await db.user.findUnique({
    where: {
      google_id: sub,
    },
    select: {
      id: true,
    },
  });

  if (user) {
    await saveSession(user.id);
  } else {
    const newUser = await db.user.create({
      data: {
        username: name,
        email: email,
        google_id: sub,
        avatar: picture,
      },
      select: {
        id: true,
      },
    });

    await saveSession(newUser.id);
  }

  return redirect("/home");
}
