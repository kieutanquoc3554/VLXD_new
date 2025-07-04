import { getAllImportSlips } from "@/app/models/inventoryModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const import_slips = await getAllImportSlips();
    return NextResponse.json(
      {
        message: "Lấy danh sách phiếu nhập thành công!",
        import_slips,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Lỗi khi lấy danh sách phiếu nhập",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
