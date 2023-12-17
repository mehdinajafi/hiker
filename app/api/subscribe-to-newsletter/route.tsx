import { NextRequest, NextResponse } from "next/server";
import subscribeToNewsletter from "@/lib/api/subscribeToNewsletter";

export const POST = async (req: NextRequest) => {
  try {
    const { email } = await req.json();

    await subscribeToNewsletter({ email });

    return NextResponse.json(
      {},
      {
        status: 200,
      }
    );
  } catch (error) {
    throw Error(`subscribe-to-newsletter: ${error}`);
  }
};
