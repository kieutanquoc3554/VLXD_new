import { getAllStockCheckReports } from "@/app/models/inventoryModel";
import { message } from "antd";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const data = await getAllStockCheckReports();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Lỗi khi lấy danh sách báo cáo kiểm kho!",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
