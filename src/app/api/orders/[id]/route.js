import { getOrderById } from "@/app/models/orderModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const data = await getOrderById(id);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi khi lấy đơn hàng!", error: error.message },
      { status: 500 }
    );
  }
}
