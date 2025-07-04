import { getInventoryLogs } from "@/app/models/inventoryModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const result = await getInventoryLogs();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi khi hiển thị lịch sử kho!" },
      { status: 500 }
    );
  }
}
