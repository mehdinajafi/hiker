import getCart from "@/lib/api/products/getCart";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const cartId = searchParams.get("cartId");

    if (!cartId) throw Error("Cart id is required!");

    const cart = await getCart({ cartId });

    return NextResponse.json(
      { cart: cart || null },
      {
        status: 200,
      }
    );
  } catch (error) {
    throw Error("Server error!");
  }
};
