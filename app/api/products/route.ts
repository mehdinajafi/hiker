import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const categoryId = searchParams.get("categoryId");
    const inStock = Boolean(searchParams.get("inStock"));

    const filters: Prisma.ProductWhereInput = {};

    if (categoryId) {
      filters.category = {
        is: {
          id: Number(categoryId),
        },
      };
    }

    if (inStock) {
      filters.stockQuantity = {
        not: 0,
      };
    }

    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        image: true,
        category: true,
        isOutOfStock: true,
      },
      where: filters,
    });

    return NextResponse.json(
      {
        data: products,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error!" },
      {
        status: 500,
      }
    );
  }
};
