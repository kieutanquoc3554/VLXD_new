import {
  deleteSupplier,
  getSupplierById,
  updateSupplier,
} from "@/app/models/supplierModel";
import { message } from "antd";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = await params;
  try {
    const response = await getSupplierById(id);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi server!", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  const body = await req.json();
  const { name, phone, email, address } = body;
  const { id } = await params;
  try {
    const response = await updateSupplier(id, name, phone, email, address);
    if (response) {
      return NextResponse.json({ message: "Cập nhật thành công!" });
    } else {
      return NextResponse.json(
        { message: "Nhà cung cấp không tồn tại!" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi server!", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req, { params }) {
  const { id } = await params;
  try {
    const response = await deleteSupplier(id);
    if (response) {
      return NextResponse.json({ message: "Xoá thành công!" });
    } else {
      return NextResponse.json(
        { message: "Nhà cung cấp không tồn tại!" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi server!", error: error.message },
      { status: 500 }
    );
  }
}
