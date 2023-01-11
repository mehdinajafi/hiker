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
          information: {
            $first: "$information",
          },
          shippingId: {
            $first: "$shippingId",
          },
        },
      },
      {
        $lookup: {
          from: "shippingmethods",
          localField: "shippingId",
          foreignField: "_id",
          as: "shipment",
        },
      },
      {
        $addFields: {
          subTotalPrice: {
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
          shippingCost: {
            $reduce: {
              input: "$shipment",
              initialValue: 0,
              in: {
                $add: ["$$value", "$$this.price"],
              },
            },
          },
        },
      },
      {
        $addFields: {
          totalQuantity: { $sum: "$items.quantity" },
          totalPrice: {
            $sum: ["$subTotalPrice", "$shippingCost"],
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
