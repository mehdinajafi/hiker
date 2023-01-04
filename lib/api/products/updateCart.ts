import { ObjectId } from "mongodb";
import mongoPromise from "@/lib/mongodb";
import { dbName } from "@/constants";

interface IOptions {
  cartId: string;
  productId: string;
  quantity: number;
}

const updateCart = async ({ cartId, productId, quantity }: IOptions) => {
  try {
    const db = await mongoPromise.db(dbName);
    await db.collection("cart").updateOne(
      { _id: new ObjectId(cartId), "items.productId": new ObjectId(productId) },
      {
        $set: { "items.$.quantity": quantity },
      }
    );
  } catch (error) {
    throw Error(`Error in updateCart in mongodb: ${error}`);
  }
};

export default updateCart;
