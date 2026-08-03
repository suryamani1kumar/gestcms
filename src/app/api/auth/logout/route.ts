import { NextResponse } from "next/server";

export async function GET() {
  return handleLogout();
}

export async function POST() {
  return handleLogout();
}

function handleLogout() {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });

  // Clear the token cookie
  response.cookies.set("token", "", {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
