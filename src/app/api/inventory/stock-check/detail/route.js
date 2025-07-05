import { getStockCheckReportsDetail } from "@/app/models/inventoryModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const created_time = searchParams.get("created_time");
    const created_by = searchParams.get("created_by");
    const data = await getStockCheckReportsDetail(created_time, created_by);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Lỗi khi lấy chi tiết phiếu kiểm kho!",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
