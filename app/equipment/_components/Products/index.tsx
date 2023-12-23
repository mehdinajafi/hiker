import ProductsNotFound from "@/components/EquipmentPage/ProductsNotFound";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/api/queries/product";
import searchParams from "@/utils/searchParams";

const Products = async () => {
  const urlSearchParams = searchParams();

  const products = await getProducts({
    categoryId: urlSearchParams.get("category"),
    inStock: urlSearchParams.get("inStock") === "1" ? true : false,
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
