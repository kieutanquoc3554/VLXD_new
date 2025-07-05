import { searchOrder } from "@/app/models/orderModel";
import { message } from "antd";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const searchTerm = searchParams.get("searchTerm");
    const orderDate = searchParams.get("order_date");
    if (!searchTerm && !orderDate) {
      return NextResponse.json(
        { message: "Không có từ khoá tìm kiếm!" },
        { status: 400 }
      );
    }
    const result = await searchOrder({ searchTerm, orderDate });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Lỗi server, không thể tìm kiếm!",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
