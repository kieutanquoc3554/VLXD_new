import { filterDebtByStatus } from "@/app/models/debtModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  if (!status) {
    return NextResponse.json(
      { message: "Trạng thái không hợp lệ!" },
      { status: 400 }
    );
  }
  try {
    const result = await filterDebtByStatus(status);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi máy chủ!", error: error.message },
      { status: 500 }
    );
  }
}
