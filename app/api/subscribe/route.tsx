import { z } from "zod";
import prisma from "@/lib/prisma";

const schema = z.string().email();

export const POST = async (req: Request) => {
  try {
    const { email } = await req.json();

    const validation = schema.safeParse(email);

    if (!validation.success) {
      return Response.json({ message: "Invalid email." }, { status: 400 });
    }

    await prisma.newsletterSubscriber.create({
      data: {
        email,
      },
    });

    return Response.json(
      { message: "You are successfully subscribed." },
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json({ message: "Server Error!" }, { status: 500 });
  }
};
