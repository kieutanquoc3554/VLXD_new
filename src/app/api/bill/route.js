import { getAllBill } from "@/models/billModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const bill = await getAllBill();
    return NextResponse.json(bill, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi server!", error: error.message },
      { status: 200 }
    );
  }
}
