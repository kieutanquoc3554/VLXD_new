import { filterBillByDate } from "@/app/models/billModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");
    if (!date) {
      return NextResponse.json(
        {
          message: "Vui lòng cung cấp ngày (date) theo định dạng YYYY-MM-DD",
        },
        { status: 400 }
      );
    }
    const result = await filterBillByDate(date);
    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Lỗi server", error: error.message },
      { status: 500 }
    );
  }
}
