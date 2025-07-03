import { deleteInv } from "@/app/models/inventoryModel";
import { message } from "antd";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    await deleteInv(id);
    return NextResponse.json({ message: "Xoá thành công!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Lỗi khi xoá kho!",
        error: message.error,
      },
      { status: 500 }
    );
  }
}
