import { NextApiRequest, NextApiResponse } from "next";
import saveShippingMethod from "@/lib/api/checkout/saveShippingMethod";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { cartId, methodId } = JSON.parse(req.body);
    const cart = await saveShippingMethod({ cartId, methodId });
    res.json({ status: 200, cart });
  } catch (error) {
    throw Error(`Error in get shipping methods: ${error}`);
  }
};

export default handler;
