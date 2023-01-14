import Link from "next/link";
import clsx from "clsx";

interface IProductCard {
  status: "out_of_stock" | "marketable";
  /**
   * Urls of images.
   * At least `main` must be defined.
   * `optimized` is for other image formats like avif, webp,..
   */
  images: {
    main: string;
    optimized?: { type: string; url: string }[];
  };
  title: string;
  rating: {
    count: number;
    rate: number;
  };
  price: number;
  slug: string;
}

const ProductCard: React.FC<IProductCard> = (props) => {
  const { images, title, price, slug, status } = props;

  return (
    <article
      className={clsx(
        "h-full rounded-md",
        "border border-gray-300 transition-[border-color] hover:border-gray-400"
      )}
    >
      <Link href={`/equipment/${slug}`} className="group grid grid-cols-12">
        <div className="col-span-4 p-4 sm:col-span-12">
          <picture>
            {images.optimized &&
              images.optimized.map((image) => (
                <source key={image.url} srcSet={image.url} type={image.type} />
              ))}
            <img
              src={images.main}
              alt={title}
              loading="lazy"
              width={200}
              height={295}
              className="mx-auto h-auto sm:h-44 sm:w-auto"
            />
          </picture>
        </div>

        <div className="col-span-8 flex flex-col p-4 sm:col-span-12 sm:items-center">
          <h3 className="ellipsis-2 text-subtitle1">{title}</h3>

          <div className="text-subtitle2 mt-2">
            {status === "out_of_stock" ? (
              <span className="text-gray-500">out of stock</span>
            ) : (
              <span className="text-gray-800">${Number(price).toFixed(2)}</span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ProductCard;
