import {
  getEmployeeByEmail,
  getEmployeeByPhone,
  createEmployee,
} from "@/app/models/employeeModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, role, phone, email, password } = body;
    const existingEmployee = await getEmployeeByEmail(email);
    if (existingEmployee) {
      return NextResponse.json(
        { message: "Email đã tồn tại!" },
        { status: 400 }
      );
    }
    const existingPhone = await getEmployeeByPhone(phone);
    if (existingPhone) {
      return NextResponse.json(
        { message: "Số điện thoại đã tồn tại" },
        { status: 400 }
      );
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    await createEmployee(name, role, phone, email, passwordHash);
    return NextResponse.json(
      { message: "Đăng ký thành công!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi server!", error: error.message },
      { status: 500 }
    );
  }
}
