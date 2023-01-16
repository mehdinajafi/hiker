import type { NextApiRequest, NextApiResponse } from "next";
import subscribeToNewsletter from "@/lib/api/subscribeToNewsletter";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log(req.body);
    const { email } = JSON.parse(req.body);

    await subscribeToNewsletter({ email });
    res.json({ status: 200 });
  } catch (error) {
    throw Error(`subscribe-to-newsletter: ${error}`);
  }
};

export default handler;
