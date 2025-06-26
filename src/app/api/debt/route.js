import { getAllDebts } from "@/app/models/debtModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const debt = await getAllDebts();
    return NextResponse.json(debt);
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi server!", error: error.message },
      { status: 200 }
    );
  }
}
