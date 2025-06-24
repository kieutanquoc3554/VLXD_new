import { updateEmployee } from "@/models/employeeModel";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const { id } = params;
  const body = await req.json();
  const { name, role, phone, email } = body;
  try {
    const response = await updateEmployee(id, name, role, phone, email);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi server!", error: error.message },
      { status: 500 }
    );
  }
}
