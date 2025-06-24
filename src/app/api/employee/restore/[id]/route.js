import { restoreEmployee } from "@/models/employeeModel";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const { id } = await params;
  try {
    await restoreEmployee(id);
    return NextResponse.json(
      { message: "Khôi phục thành công!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi server!", error: error.message },
      { status: 500 }
    );
  }
}
