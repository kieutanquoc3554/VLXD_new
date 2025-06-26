import { suspendEmployee } from "@/app/models/employeeModel";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { id } = await params;
  const body = await req.json();
  const { suspended_permanently, suspended_until } = body;

  try {
    let suspendedUntil = null;
    if (!suspended_permanently && suspended_until) {
      suspendedUntil = new Date(suspended_until);
    }

    await suspendEmployee(id, suspendedUntil, suspended_permanently);

    return NextResponse.json(
      {
        message: "Nhân viên đã bị đình chỉ!",
        id,
        suspendedUntil,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi server", error: error.message },
      { status: 500 }
    );
  }
}
