"use server";

import backend from "@/backend";
import { IProduct } from "@/interfaces";
import { unstable_noStore as noStore } from "next/cache";

export interface IProductsFilters {
  categoryId?: string;
  inStock?: boolean;
}

export const getProducts = async (filters: IProductsFilters = {}) => {
  noStore();

  const searchParams = new URLSearchParams();

  if (filters.categoryId) {
    searchParams.set("categoryId", filters.categoryId);
  }

  if (filters.inStock) {
    searchParams.set("inStock", "1");
  }

  const response = await backend("/api/products?" + searchParams.toString());
  const data = await response.json();

  return data as { data: any[] };
};

export const getProduct = async (productId: string) => {
  noStore();

  const response = await backend(`/api/products/${productId}`);
  const data = await response.json();

  return data as { data: IProduct };
};
