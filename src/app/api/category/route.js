import { createCategory, getAllCategories } from "@/app/models/categoryModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await getAllCategories();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi server!", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const body = await req.json();
  const { name, description } = body;
  try {
    await createCategory(name, description);
    return NextResponse.json(
      { message: "Thêm danh mục sản phẩm thành công!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi server!", error: error.message },
      { status: 500 }
    );
  }
}
