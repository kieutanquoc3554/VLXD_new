import { createSupplier, getAllSuppliers } from "@/app/models/supplierModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const response = await getAllSuppliers();
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ message: "Lỗi server!" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, phone, email, address } = body;
    try {
      await createSupplier(name, phone, email, address);
      return NextResponse.json(
        { message: "Thêm nhà cung cấp thành công!" },
        { status: 201 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Lỗi server!", error: error.message },
        { status: 500 }
      );
    }
  } catch (error) {}
}
