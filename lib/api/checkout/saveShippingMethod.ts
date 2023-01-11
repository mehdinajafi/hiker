import Cart from "@/models/Cart";
import getCart from "../products/getCart";

interface IOptions {
  cartId: string;
  methodId: string;
}

const saveShippingMethod = async ({ cartId, methodId }: IOptions) => {
  try {
    await Cart.updateOne(
      { _id: cartId },
      {
        $set: {
          shippingId: methodId,
        },
      }
    );
    const cart = await getCart({ cartId });
    return cart;
  } catch (error) {
    throw Error(`saveShippingMethod: ${error}`);
  }
};

export default saveShippingMethod;
