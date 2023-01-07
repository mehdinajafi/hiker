import mongoose from "mongoose";
import db from "@/lib/db";
import Cart from "@/models/Cart";

interface IOptions {
  cartId: string;
}

const getCart = async ({ cartId }: IOptions) => {
  try {
    await db.connect();
    const cart = await Cart.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(cartId),
        },
      },
      {
        $unwind: {
          path: "$items",
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "items.productId",
          foreignField: "_id",
          as: "items.product",
        },
      },
      {
        $unwind: {
          path: "$items.product",
        },
      },
      {
        $group: {
          _id: "$_id",
          items: {
            $push: "$items",
          },
        },
      },
      {
        $project: {
          items: 1,
          totalQuantity: { $sum: "$items.quantity" },
          totalPrice: {
            $reduce: {
              input: "$items",
              initialValue: 0,
              in: {
                $add: [
                  "$$value",
                  { $multiply: ["$$this.quantity", "$$this.product.price"] },
                ],
              },
            },
          },
        },
      },
    ]);
    await db.disconnect();
    return cart[0];
  } catch (error) {
    throw Error(`Something is wrong in getCart: ${error}`);
  }
};

export default getCart;
