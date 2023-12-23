import { IProductsFilters } from "@/api/queries/product";
import { ISearchParams } from "@/interfaces";

const generatePageFilters = (searchParams: ISearchParams) => {
  const filters: IProductsFilters = {};

  if (searchParams.category) {
    filters.categoryId = Number(
      Array.isArray(searchParams.category)
        ? searchParams.category[0]
        : searchParams.category
    );
  }

  if (searchParams.inStock === "1") {
    filters.inStock = true;
  }

  return filters;
};

export default generatePageFilters;
