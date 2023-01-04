import { NextApiRequest, NextApiResponse } from "next";
import addToCart from "@/lib/api/products/addToCart";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { cartId, productId } = JSON.parse(req.body);
    const cart = await addToCart({
      cartId: cartId,
      productId: productId,
    });
    res.json({ status: 200, cart });
  } catch (error) {
    throw Error(`Error in create new cart: ${error}`);
  }
};

export default handler;
