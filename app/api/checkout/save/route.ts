import saveInformationInCart from "@/lib/api/products/saveInformationInCart";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { cartId, information } = await req.json();
    const cart = await saveInformationInCart({
      cartId,
      information,
    });

    return NextResponse.json(
      {
        cart,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    throw Error("Server Error!");
  }
};
