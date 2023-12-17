import updateCart from "@/lib/api/products/updateCart";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { cartId, productId, quantity } = await req.json();

    await updateCart({
      cartId,
      productId,
      quantity,
    });

    return NextResponse.json(
      {
        message: "Cart updated successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    throw Error("Server Error!");
  }
};
