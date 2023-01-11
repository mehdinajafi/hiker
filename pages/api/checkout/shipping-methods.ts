import { NextApiRequest, NextApiResponse } from "next";
import getShippingMethods from "@/lib/api/checkout/getShippingMethods";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const methods = await getShippingMethods();
    res.json({ status: 200, methods });
  } catch (error) {
    throw Error(`Error in get shipping methods: ${error}`);
  }
};

export default handler;
