import { NextResponse } from "next/server";
import {
  deleteCategory,
  getCategoryById,
  updateCategory,
} from "@/app/models/categoryModel";

export async function GET(req, { params }) {
  const { id } = await params;
  try {
    const category = await getCategoryById(id);
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi server!", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();
  const { name, description, disabled, deleted } = body;
  try {
    await updateCategory(id, name, description, disabled, deleted);
    return NextResponse.json(
      { message: "Cập nhật danh mục sản phẩm thành công!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi server", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    await deleteCategory(id);
    return NextResponse.json(
      { message: "Đã xoá danh mục thành công!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi server", error: error.message },
      { status: 500 }
    );
  }
}
