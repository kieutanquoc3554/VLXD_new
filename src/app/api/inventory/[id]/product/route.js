import { getProductById } from "@/app/models/inventoryModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const product = await getProductById(id);
    if (!product) {
      return NextResponse.json(
        {
          message: "Không tìm thấy sản phẩm trong kho!",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Lỗi tìm kiếm sản phẩm trong kho",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
