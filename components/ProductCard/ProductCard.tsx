import StarIcon from "@/public/icons/star-fill.svg";
import Link from "next/link";

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
    <article className="h-full rounded-lg border border-gray-600">
      <Link href={`/equipment/${slug}`} className="flex h-full flex-col">
        <div className="px-4">
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
              className="mx-auto object-cover"
            />
          </picture>
        </div>
        <div className="flex grow flex-col gap-y-2 p-6 text-white">
          <h3 className="text-subtitle1 ellipsis-2 grow">{title}</h3>
          <div className="flex items-center gap-x-2">
            <StarIcon className="text-accent" aria-hidden />
            <span className="text-sm font-medium">
              {((rating.rate / 100) * 5).toFixed(1)}
            </span>
          </div>
          {status === "out_of_stock" && (
            <div className="text-subtitle1 text-gray-500">out of stock</div>
          )}
          {status === "marketable" && (
            <div className="text-subtitle1">£{Number(price).toFixed(2)}</div>
          )}
        </div>
      </Link>
    </article>
  );
};

export default ProductCard;
