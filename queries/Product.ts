import backend from "@/backend";
import { IProduct } from "@/interfaces";

interface IGetProductsFilters {
  category?: string | string[];
  inStock?: string | string[];
}

export const getProducts = async (filters: IGetProductsFilters) => {
  const searchParams = new URLSearchParams();

  if (filters.category) {
    if (Array.isArray(filters.category)) {
      filters.category.forEach((category) => {
        searchParams.append("category", category);
      });
    } else {
      searchParams.set("category", filters.category);
    }
  }

  if (filters.inStock) {
    if (Array.isArray(filters.inStock)) {
      filters.inStock.forEach((inStock) => {
        searchParams.append("inStock", inStock);
      });
    } else {
      searchParams.set("inStock", filters.inStock);
    }
  }

  const productsRes = await backend(
    "/api/products" + "?" + searchParams.toString(),
    {
      cache: "no-store",
    }
  );
  const products: IProduct[] = await productsRes.json();
  return products;
};
