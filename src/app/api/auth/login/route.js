import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { format } from "date-fns";
import {
  getEmployeeByEmail,
  createSession,
  getEmployeeByToken,
} from "@/models/employeeModel";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const storeCookie = await cookies();
    const token = storeCookie.get("token")?.value;
    const user = await getEmployeeByToken(token);
    if (!user) {
      return NextResponse.json({ message: "Chưa đăng nhập" }, { status: 401 });
    }
    return NextResponse.json({ name: user.name });
  } catch (error) {
    return NextResponse.json({ message: "Lỗi server!" }, { status: 500 });
  }
}

export async function POST(req) {
  const isProduction = process.env.NODE_ENV === "production";
  try {
    const body = await req.json();
    const { email, password } = body;

    const now = new Date();
    const employee = await getEmployeeByEmail(email);
    if (!employee) {
      return NextResponse.json(
        { message: "Email không tồn tại" },
        { status: 400 }
      );
    }

    if (employee.suspended_permanently) {
      return NextResponse.json(
        { message: "Tài khoản bị đình chỉ vĩnh viễn." },
        { status: 403 }
      );
    }

    if (employee.suspended_until && new Date(employee.suspended_until) > now) {
      const suspendedUntil = format(
        new Date(employee.suspended_until),
        "dd/MM/yyyy HH:mm"
      );
      return NextResponse.json(
        { message: `Tài khoản bị đình chỉ đến ${suspendedUntil}` },
        { status: 403 }
      );
    }

    const isMatch = await bcrypt.compare(password, employee.password_hash);
    console.log("Mật khẩu khớp:", isMatch);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Mật khẩu không đúng" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: employee.id, role: employee.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    await createSession(
      employee.id,
      token,
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    );

    const res = NextResponse.json({ message: "Đăng nhập thành công!" });

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: isProduction,
      maxAge: 7 * 24 * 60 * 60,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
    });

    return res;
  } catch (error) {
    console.error("Lỗi login:", error);
    return NextResponse.json(
      { message: "Lỗi server", error: String(error) },
      { status: 500 }
    );
  }
}
