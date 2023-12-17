import Divider from "@/components/ui/Divider";
import Alert from "@/components/ui/Alert";
import BlurImage from "@/components/ui/BlurImage";
import AddToCartButton from "./_components/AddToCartButton";
import { getProduct } from "@/queries/Product";
import StarIcon from "@/public/icons/star-fill.svg";

interface IProps {
  params: { slug: string };
}

export const generateMetadata = async ({ params }: IProps) => {
  const product = await getProduct({ slug: params.slug });

  return {
    title: product.title + " | HIKER",
  };
};

const ProductPage = async ({ params }: IProps) => {
  const product = await getProduct({ slug: params.slug });

  return (
    <main className="container mb-16 mt-5 md:my-32">
      <article className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="col-span-1">
          <div className="flex justify-center">
            <BlurImage
              src={product.images.main}
              alt=""
              height={500}
              width={300}
              className="w-96"
            />
          </div>
        </div>

        <div className="col-span-1">
          <h2 className="heading-2xl">{product.title}</h2>

          <div className="mt-5 flex items-center">
            <StarIcon className="text-yellow-500" aria-hidden />
            <span className="ml-2 text-base font-medium">
              {((product.rating.rate / 100) * 5).toFixed(1)}
            </span>
            <span className="ml-2 text-sm text-gray-500">
              ({product.rating.count} reviews)
            </span>
          </div>

          <p className="mt-4">{product.description}</p>

          <div className="my-4">
            <Divider />
          </div>

          {product.status === "out_of_stock" && (
            <Alert severity="warning">
              This product is not available right now.
            </Alert>
          )}
          {product.status === "marketable" && (
            <div className="text-xl font-bold">
              £{Number(product.price).toFixed(2)}
            </div>
          )}
          {product.status === "marketable" && (
            <div className="mt-4">
              <AddToCartButton productId={product._id} />
            </div>
          )}
        </div>
      </article>
    </main>
  );
};

export default ProductPage;
