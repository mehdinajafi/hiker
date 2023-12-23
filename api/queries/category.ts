"use server";

import prisma from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

export const getCategories = async () => {
  noStore();
  const categories = await prisma.category.findMany();
  return categories;
};
