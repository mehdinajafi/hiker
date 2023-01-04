import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import useSWRMutation from "swr/mutation";
import useStore from "@/store";
import Divider from "@/components/ui/Divider";
import Alert from "@/components/ui/Alert";
import getProduct from "@/lib/api/products/getProduct";
import Button from "@/components/ui/Button";
import sendRequest from "@/utils/sendRequest";
import { IProduct } from "@/interfaces";
import PlusIcon from "@/public/icons/plus.svg";
import StarIcon from "@/public/icons/star-fill.svg";

interface IProductPage {
  product: IProduct;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const product = await getProduct(params?.slug as string);

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
};

const ProductPage: React.FC<IProductPage> = (props) => {
  const { product } = props;

  const setCartId = useStore((store) => store.setCartId);
  const cartId = useStore((store) => store.cart.id);

  const { trigger, isMutating } = useSWRMutation<{
    status: number;
    cart: { cartId: string };
  }>("/api/cart/add", sendRequest);

  const addToCart = async () => {
    const data = await trigger({
      cartId,
      productId: product._id,
    });

    if (!cartId && data) {
      setCartId(data.cart.cartId);
    }
  };

  return (
    <main className="mb-16 mt-5 md:my-32">
      <Head>
        <title>{product.title} - MNTN</title>
      </Head>

      <article className="container grid grid-cols-12 gap-y-10">
        <div className="col-span-12 row-start-2 md:col-span-4 md:row-start-1">
          <h2 className="heading-2xl">{product.title}</h2>

          <div className="mt-5 flex items-center text-sm">
            <StarIcon className="text-accent" aria-hidden />
            <span className="ml-2 font-medium">
              {((product.rating.rate / 100) * 5).toFixed(1)}
            </span>
            <span className="mx-2">-</span>
            <span className="text-gray-500">
              ({product.rating.count} reviews)
            </span>
          </div>

          <p className="mt-4 text-gray-500">{product.description}</p>

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

          <div className="mt-4">
            <Button
              color="gray"
              disabled={isMutating}
              startIcon={<PlusIcon width={24} height={24} />}
              onClick={addToCart}
              className="font-medium"
            >
              Add To Cart
            </Button>
          </div>
        </div>

        <div className="col-span-12 md:col-span-8">
          <div className="flex justify-center md:justify-end">
            <Image
              src={product.images.main}
              alt=""
              height={500}
              width={300}
              className="w-96"
            />
          </div>
        </div>
      </article>
    </main>
  );
};

export default ProductPage;
