import { getAllEmployees } from "@/app/models/employeeModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const employees = await getAllEmployees();
    return NextResponse.json(employees, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi server", error: error.message },
      { status: 500 }
    );
  }
}
