import { checkAuth } from "@/app/middleware/authMiddleware";
import { NextResponse } from "next/server";

export async function GET(req) {
  const auth = await checkAuth();
  if (auth.user) {
    return NextResponse.json(auth.user);
  } else {
    return NextResponse.json({ message: "Chưa đăng nhập!" });
  }
}
