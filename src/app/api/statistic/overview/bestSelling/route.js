import { getBestSellingProduct } from "@/app/models/statisticModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const statistic = await getBestSellingProduct();
    return NextResponse.json(statistic, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Lỗi lấy danh sách sản phẩm bán chạy",
      },
      { status: 500 }
    );
  }
}
