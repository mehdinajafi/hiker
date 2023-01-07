import db from "@/lib/db";
import Cart from "@/models/Cart";

interface IOptions {
  cartId: string;
  productId: string;
}

const removeFromCart = async ({ cartId, productId }: IOptions) => {
  try {
    await db.connect();
    await Cart.findByIdAndUpdate(cartId, {
      $pull: {
        items: {
          productId,
        },
      },
    });
    await db.disconnect();
  } catch (error) {
    throw Error(`Error in removeFromCart in mongodb: ${error}`);
  }
};

export default removeFromCart;
