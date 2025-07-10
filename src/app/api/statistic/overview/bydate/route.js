import { getOverviewRevenueByDate } from "@/app/models/statisticModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const result = await getOverviewRevenueByDate(startDate, endDate);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Có lỗi khi lấy thông tin thống kê",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
