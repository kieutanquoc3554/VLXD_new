import { deleteEmployee } from "@/app/models/employeeModel";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const { id } = await params;
  try {
    await deleteEmployee(id);
    return NextResponse.json({ message: "Đã xóa nhân viên!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Lỗi server!" }, { status: 500 });
  }
}
