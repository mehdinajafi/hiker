import { NextApiRequest, NextApiResponse } from "next";
import removeFromCart from "@/lib/api/products/removeFromCart";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { cartId, productId } = JSON.parse(req.body);
    await removeFromCart({
      cartId,
      productId,
    });
    res.json({ status: 200 });
  } catch (error) {
    throw Error(`Error in remove product from cart: ${error}`);
  }
};

export default handler;
