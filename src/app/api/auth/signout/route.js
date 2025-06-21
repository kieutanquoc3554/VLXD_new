import { deleteSession } from "@/models/employeeModel";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    if (token) {
      await deleteSession(token);
    }
    const response = NextResponse.json(
      { message: "Đăng xuất thành công!" },
      { status: 200 }
    );
    response.cookies.set("token", "", {
      path: "/",
      maxAge: 0,
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi server", error: error.message },
      { status: 500 }
    );
  }
}
