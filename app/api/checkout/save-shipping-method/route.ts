import saveShippingMethod from "@/lib/api/checkout/saveShippingMethod";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { cartId, methodId } = await req.json();

    const cart = await saveShippingMethod({ cartId, methodId });

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
