import db from "@/lib/db";
import Cart from "@/models/Cart";
import { ICartInformation } from "@/interfaces";
import getCart from "./getCart";

interface IOptions {
  cartId: string;
  information: ICartInformation;
}

const saveInformationInCart = async ({ cartId, information }: IOptions) => {
  try {
    await db.connect();
    await Cart.updateOne(
      { _id: cartId },
      {
        $set: {
          information,
        },
      }
    );
    const cart = await getCart({ cartId });
    await db.disconnect();
    return cart;
  } catch (error) {
    throw Error(`Error in saveInformationInCart function: ${error}`);
  }
};

export default saveInformationInCart;
