import { findProductByName } from "@/app/models/productModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");
    if (!name) {
      return NextResponse.json(
        { message: "Tên sản phẩm là bắt buộc!" },
        { status: 400 }
      );
    }
    const product = await findProductByName(name);
    if (product) {
      return NextResponse.json({ exist: true, product });
    } else {
      return NextResponse.json({ exist: false });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi server!", error: error.message },
      { status: 500 }
    );
  }
}
