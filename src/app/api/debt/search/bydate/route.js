import { filterDebtByDate } from "@/app/models/debtModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
  if (!date) {
    return NextResponse.json(
      { message: "Thiếu ngày giờ tìm kiếm!" },
      { status: 400 }
    );
  }
  try {
    const result = await filterDebtByDate(date);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi máy chủ!", error: error.message },
      { status: 500 }
    );
  }
}
