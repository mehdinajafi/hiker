import clsx from "clsx";
import ProductsNotFound from "@/components/EquipmentPage/ProductsNotFound";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/queries/Product";

interface IProducts {
  searchParams: any;
}

export const ProductsLoading = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="skeleton h-[9.375rem] rounded-md md:h-[18.75rem]"
        />
      ))}
    </div>
  );
};

const Products = async ({ searchParams }: IProducts) => {
  const products = await getProducts(searchParams);

  return (
    <div className="grid grid-cols-12 gap-4">
      {products.length === 0 && (
        <div className="col-span-12">
          <ProductsNotFound />
        </div>
      )}

      {products.map((product) => (
        <div
          key={product._id}
          className={clsx(
            "col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-3"
          )}
        >
          <ProductCard {...product} />
        </div>
      ))}
    </div>
  );
};

export default Products;
