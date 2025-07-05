import { getOrderById, updateOrderStatus } from "@/app/models/orderModel";
import { message } from "antd";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const orders = await getOrderById(id);
    const currentStatus = orders[0].status;
    if (currentStatus === "Completed") {
      return NextResponse.json(
        {
          message: "Không thể huỷ đơn hàng đã hoàn thành",
        },
        { status: 400 }
      );
    }
    const result = await updateOrderStatus(id, "Cancelled");
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi server!", error: error.message },
      { status: 500 }
    );
  }
}
