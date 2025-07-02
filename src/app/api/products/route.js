import { createProduct, getAllProducts } from "@/app/models/productModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const products = await getAllProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi server!", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const body = await req.json();
  try {
    const {
      name,
      category_id,
      supplier_id,
      import_price,
      price,
      stock_quantity,
      unit,
      description,
      image_url,
    } = body;
    const product = {
      name,
      category_id,
      supplier_id,
      import_price,
      price,
      stock_quantity,
      unit,
      description,
      image_url,
    };
    const result = await createProduct(product);
    return NextResponse.json(
      {
        message: "Thêm sản phẩm thành công!",
        product_id: result,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi server!", error: error.message },
      { status: 500 }
    );
  }
}
