import { NextResponse } from "next/server";
import { createCustomer, getAllCustomers } from "../../models/customerModel";

export async function GET(req) {
  try {
    const customer = await getAllCustomers();
    return NextResponse.json(customer);
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi server!", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const body = await req.json();
  const { name, phone, email, address } = body;
  try {
    const response = await createCustomer(name, phone, email, address);
    return NextResponse.json({ message: response }, { status: 201 });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return NextResponse.json({ message: "Số điện thoại đã tồn tại" });
    }
    return NextResponse.json(
      { message: "Lỗi server!", error: error.message },
      { status: 500 }
    );
  }
}
