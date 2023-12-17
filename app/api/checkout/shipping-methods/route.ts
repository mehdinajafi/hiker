import getShippingMethods from "@/lib/api/checkout/getShippingMethods";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const methods = await getShippingMethods();
    return NextResponse.json(
      { methods },
      {
        status: 200,
      }
    );
  } catch (error) {
    throw Error("Server Error!");
  }
};
