import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request, context: { params: { id: string } }) {
  try {
    const productId = context.params.id;

    const product = await prisma.product.findFirst({
      where: {
        id: Number(productId),
      },
    });

    return NextResponse.json(
      { data: product },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }
}
