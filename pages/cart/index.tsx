import Head from "next/head";
import Link from "next/link";
import useSWR from "swr";
import useStore from "@/store";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CartTable from "@/components/CartPage/CartTable";
import ClientSide from "@/components/ClientSide";
import Button from "@/components/ui/Button";
import { ICart } from "@/interfaces";

const CartPage = () => {
  const cartId = useStore((store) => store.cart.id);

  const { data, isLoading, error } = useSWR<{ status: number; cart: ICart }>(
    cartId ? `/api/cart?cartId=${cartId}` : null
  );

  return (
    <>
      <Head>
        <title>MNTN</title>
      </Head>

      <main className="container mb-20">
        <div className="mt-8">
          <h2 className="heading-2xl text-white">Equipment</h2>
          <div className="mt-4 text-gray-500">
            <Breadcrumbs>
              <Link href="/" className="text-gray-200">
                Home
              </Link>
              <div>Cart</div>
            </Breadcrumbs>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-12 gap-y-10 md:gap-10">
          <div className="col-span-12">
            <ClientSide>
              <CartTable data={data} isLoading={isLoading} error={error} />
            </ClientSide>
          </div>

          {data && data.cart && data.cart.items.length !== 0 && (
            <div className="col-span-3">
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between">
                  <div className="text-base">Total Items:</div>
                  <div className="ml-4 text-2xl font-bold">
                    {data.cart.totalQuantity}
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="text-base">Total Price:</div>
                  <div className="ml-4 text-2xl font-bold">
                    ${data.cart.subTotalPrice}
                  </div>
                </div>

                <div>
                  <Button color="primary" href="/cart/information">
                    Checkout
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default CartPage;
