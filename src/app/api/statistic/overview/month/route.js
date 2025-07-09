import { getOverviewRevenueByMonth } from "@/app/models/statisticModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const statistic = await getOverviewRevenueByMonth();
    return NextResponse.json(statistic, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Lỗi tra cứu doanh thu theo tháng!",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
