import ProductsNotFound from "@/components/EquipmentPage/ProductsNotFound";
import ProductCard from "@/components/ProductCard";
import { ISearchParams } from "@/interfaces";
import { getProducts } from "@/api/queries/product";
import getFirstString from "@/utils/getFirstString";

interface IProducts {
  searchParams: ISearchParams;
}

const Products = async ({ searchParams }: IProducts) => {
  const products = await getProducts({
    categoryId: getFirstString(searchParams.category),
    inStock: getFirstString(searchParams.inStock) === "1" ? true : false,
  });

  if (products.data.length === 0) {
    return <ProductsNotFound />;
  }

  return (
    <div className="grid grid-cols-12 gap-4">
      {products.data.map((product) => (
        <div
          key={product.id}
          className="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-3"
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default Products;
