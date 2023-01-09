import { NextApiRequest, NextApiResponse } from "next";
import saveInformationInCart from "@/lib/api/products/saveInformationInCart";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { cartId, information } = JSON.parse(req.body);
    const cart = await saveInformationInCart({
      cartId,
      information,
    });
    res.json({ status: 200, cart });
  } catch (error) {
    throw Error(`Error in save information in cart: ${error}`);
  }
};

export default handler;
