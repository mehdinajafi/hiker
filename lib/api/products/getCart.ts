import { dbName } from "@/constants";
import { ICartItem } from "@/interfaces";
import mongoPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

interface IOptions {
  cartId: string;
}

const getCart = async ({ cartId }: IOptions) => {
  try {
    const db = await mongoPromise.db(dbName);
    const cart = await db
      .collection<ICartItem>("cart")
      .aggregate([
        {
          $match: {
            _id: new ObjectId(cartId),
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
          },
        },
      ])
      .toArray();
    return cart[0];
  } catch (error) {
    throw Error(`Something is wrong in getCart: ${error}`);
  }
};

export default getCart;
