import db from "@/lib/db";
import Cart from "@/models/Cart";

interface IOptions {
  cartId: string;
  productId: string;
  quantity: number;
}

const updateCart = async ({ cartId, productId, quantity }: IOptions) => {
  try {
    await db.connect();
    await Cart.updateOne(
      { _id: cartId, "items.productId": productId },
      {
        $set: { "items.$.quantity": quantity },
      }
    );
    await db.disconnect();
  } catch (error) {
    throw Error(`Error in updateCart in mongodb: ${error}`);
  }
};

export default updateCart;
