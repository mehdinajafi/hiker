import { NextApiRequest, NextApiResponse } from "next";
import getCart from "@/lib/api/products/getCart";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const cartId = req.query.cartId as string;
    const cart = await getCart({ cartId });
    res.json({ status: 200, cart });
  } catch (error) {
    throw Error(`Error in create new cart: ${error}`);
  }
};

export default handler;
