import { NextResponse } from "next/server";
import db from "@/lib/db";
import Product from "@/models/Product";
import { IProduct } from "@/interfaces";

interface IFilter {
  "category.id"?: {
    $in: number | number[];
  };
  status?: IProduct["status"];
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);

    const filters: IFilter = {};

    const inStock = searchParams.get("inStock");
    const categoryIds = searchParams.getAll("category");

    if (inStock && inStock === "1") {
      filters.status = "marketable";
    }

    if (categoryIds.length) {
      filters["category.id"] = {
        $in: categoryIds.map((id) => Number(id)),
      };
    }

    await db.connect();
    const products = await Product.find({ ...filters });
    await db.disconnect();

    return NextResponse.json(products, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }
}
