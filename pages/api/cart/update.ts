import { NextApiRequest, NextApiResponse } from "next";
import updateCart from "@/lib/api/products/updateCart";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { cartId, productId, quantity } = JSON.parse(req.body);
    await updateCart({
      cartId,
      productId,
      quantity,
    });
    res.json({ status: 200 });
  } catch (error) {
    throw Error(`Error in update cart: ${error}`);
  }
};

export default handler;
