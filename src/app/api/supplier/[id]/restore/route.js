import { restoreSupplier } from "@/app/models/supplierModel";
import { message } from "antd";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const { id } = await params;
  try {
    const response = await restoreSupplier(id);
    if (response) {
      return NextResponse.json({ message: "Khôi phục thành công!" });
    } else {
      return NextResponse.json({ message: "Nhà cung cấp không tồn tại!" });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi server!", error: error.message },
      { status: 500 }
    );
  }
}
