import { ObjectId } from "mongodb";
import mongoPromise from "@/lib/mongodb";
import { dbName } from "@/constants";

interface IOptions {
  cartId: string;
  productId: string;
}

const removeFromCart = async ({ cartId, productId }: IOptions) => {
  try {
    const db = await mongoPromise.db(dbName);
    await db.collection("cart").updateOne(
      {
        _id: new ObjectId(cartId),
      },
      {
        $pull: {
          items: {
            productId: new ObjectId(productId),
          },
        },
      }
    );
  } catch (error) {
    throw Error(`Error in removeFromCart in mongodb: ${error}`);
  }
};

export default removeFromCart;
