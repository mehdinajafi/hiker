import Link from "next/link";
import clsx from "clsx";
import BlurImage from "@/components/ui/BlurImage";

interface IProductCard {
  product: any;
}

const ProductCard: React.FC<IProductCard> = (props) => {
  const product = props.product;

  return (
    <article
      className={clsx(
        "h-full rounded-md",
        "border border-gray-300 transition-[border-color] hover:border-gray-400"
      )}
    >
      <Link
        href={`/equipment/${product.id}`}
        className="group grid grid-cols-12"
      >
        <div className="col-span-4 p-4 sm:col-span-12">
          <BlurImage
            src={product.image}
            alt={product.name + " image"}
            width={200}
            height={295}
            className="mx-auto h-auto sm:h-44 sm:w-auto"
          />
        </div>

        <div className="col-span-8 flex flex-col p-4 sm:col-span-12 sm:items-center">
          <h3 className="ellipsis-2 text-subtitle1">{product.name}</h3>

          <div className="text-subtitle2 mt-2">
            {product.isOutOfStock && (
              <span className="text-gray-500">out of stock</span>
            )}

            {!product.isOutOfStock && (
              <span className="text-gray-800">
                ${Number(product.price).toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ProductCard;
