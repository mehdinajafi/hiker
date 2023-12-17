import { NextResponse } from "next/server";
import Product from "@/models/Product";
import db from "@/lib/db";

export async function GET(req: Request, context: { params: { slug: string } }) {
  try {
    const slug = context.params.slug;

    await db.connect();
    const product = await Product.findOne({ slug });
    await db.disconnect();

    return NextResponse.json(product, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }
}
