import removeFromCart from "@/lib/api/products/removeFromCart";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { cartId, productId } = await req.json();

    await removeFromCart({
      cartId,
      productId,
    });

    return NextResponse.json(
      {
        message: "Product removed successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    throw Error("Server Error!");
  }
};
