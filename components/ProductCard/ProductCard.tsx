import Link from "next/link";
import clsx from "clsx";
import StarIcon from "@/public/icons/star-fill.svg";

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
  const { images, title, rating, price, slug, status } = props;

  return (
    <article
      className={clsx(
        "h-full rounded-md",
        "border border-gray-800 transition-[border-color] hover:border-gray-600"
      )}
    >
      <Link
        href={`/equipment/${slug}`}
        className="grid grid-cols-12 items-center"
      >
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

        <div className="col-span-8 flex h-full flex-col p-4 sm:col-span-12">
          <h3 className="ellipsis-2 grow text-base font-bold">{title}</h3>

          <div className="mt-auto flex items-center justify-between sm:mt-4 sm:flex-row-reverse">
            <div className="flex items-center gap-x-2">
              <StarIcon className="text-accent" aria-hidden />
              <span className="text-xs">
                {((rating.rate / 100) * 5).toFixed(1)}
              </span>
            </div>

            <div className="text-sm font-medium">
              {status === "out_of_stock" ? (
                <span className="text-gray-500">out of stock</span>
              ) : (
                <span className="text-gray-200">
                  ${Number(price).toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ProductCard;
