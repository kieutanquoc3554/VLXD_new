import {
  deleteCustomer,
  getCustomerById,
  restoreCustomer,
  updateCustomer,
} from "@/app/models/customerModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = await params;
  try {
    const customer = await getCustomerById(id);
    return NextResponse.json(customer);
  } catch (error) {
    return NextResponse.json({ message: "Lỗi server!" }, { status: 500 });
  }
}

export async function POST(req, { params }) {
  const { id } = await params;
  try {
    await restoreCustomer(id);
    return NextResponse.json(
      { message: "Khôi phục thành công!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi server!", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  const body = await req.json();
  const { id } = await params;
  const { name, phone, email, address } = body;
  try {
    await updateCustomer(id, name, phone, email, address);
    return NextResponse.json(
      { message: "Cập nhật thông tin khách hàng thành công!" },
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
  const { id } = await params;
  try {
    await deleteCustomer(id);
    return NextResponse.json({ message: "Xoá thành công!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Lỗi server!" }, { status: 500 });
  }
}
