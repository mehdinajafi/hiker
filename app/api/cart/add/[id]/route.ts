import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import Cart from "@/models/Cart";

export async function POST(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const productId = context.params.id;

    const { cartId } = await req.json();

    await db.connect();

    const cart = await Cart.findById(cartId);

    // If the cart is not found, create new cart and add product to it
    if (!cart) {
      const newCart = new Cart({
        items: [{ productId, quantity: 1 }],
      });

      const cart = await newCart.save();

      await db.disconnect();

      return {
        data: cart,
      };
    }

    // Check if product is exist in cart items, if exist increament its quantity
    let productExist = await Cart.findOneAndUpdate(
      { _id: cart._id, "items.productId": productId },
      {
        $inc: {
          "items.$.quantity": 1,
        },
      }
    );

    // Add product to cart
    if (!productExist) {
      await Cart.findOneAndUpdate(
        { _id: cart._id },
        {
          $addToSet: {
            items: {
              productId: productId,
              quantity: 1,
            },
          },
        }
      );
    }

    await db.disconnect();

    return NextResponse.json(
      {
        data: cart,
      },
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
