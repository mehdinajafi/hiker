import { ObjectId } from "mongodb";
import mongoPromise from "@/lib/mongodb";
import { dbName } from "@/constants";
import { ICartItem } from "@/interfaces";

interface IOptions {
  cartId: ObjectId;
  productId: ObjectId;
}

const addToCart = async ({ cartId, productId }: IOptions) => {
  try {
    const db = await mongoPromise.db(dbName);

    let update = await db.collection<ICartItem>("cart").findOneAndUpdate(
      { _id: new ObjectId(cartId), "items.productId": new ObjectId(productId) },
      {
        $inc: {
          "items.$.quantity": 1,
        },
      }
    );

    if (!update.value) {
      update = await db.collection<ICartItem>("cart").findOneAndUpdate(
        { _id: new ObjectId(cartId) },
        {
          $push: {
            items: { productId: new ObjectId(productId), quantity: 1 },
          },
        },
        { upsert: true }
      );
    }

    return { cartId: update.lastErrorObject?.upserted || update.value?._id };
  } catch (error) {
    throw Error(`Error in addToCart in mongodb: ${error}`);
  }
};

export default addToCart;
