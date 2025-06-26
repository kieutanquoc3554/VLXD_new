import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const publicPaths = ["/login", "/register", "/"];
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }
  const token = request.cookies.get("token")?.value;
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/products",
    "/categories",
    "/suppliers",
    "/customer",
    "/inventory",
    "/employee",
    "/order",
    "/cat",
    "/debt",
    "/bill",
  ],
};
