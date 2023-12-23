"use server";

import { unstable_noStore as noStore } from "next/cache";
import backend from "@/backend";
import { ICategory } from "@/interfaces";

export const getCategories = async () => {
  noStore();
  const response = await backend("/api/categories");
  const data = await response.json();
  return data as { data: ICategory[] };
};
