import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (req: Request) => {
  try {
    const categories = await prisma.category.findMany();

    return NextResponse.json(
      { data: categories },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }
};
