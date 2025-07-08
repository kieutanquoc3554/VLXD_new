import { getOverviewStatistic } from "@/app/models/statisticModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const result = await getOverviewStatistic();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Lỗi lấy thống kê tổng quan!",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
