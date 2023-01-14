import Head from "next/head";
import useSWR from "swr";
import useStore from "@/store";
import CartTable from "@/components/CartPage/CartTable";
import ClientSide from "@/components/ClientSide";
import Button from "@/components/ui/Button";
import PageHeader from "@/components/PageHeader";
import { ICart } from "@/interfaces";

const CartPage = () => {
  const cartId = useStore((store) => store.cart.id);

  const { data, isLoading, error } = useSWR<{ status: number; cart: ICart }>(
    cartId ? `/api/cart?cartId=${cartId}` : null
  );

  return (
    <>
      <Head>
        <title>HIKER</title>
      </Head>

      <main className="container mb-20">
        <PageHeader>
          <PageHeader.Title>Equipment</PageHeader.Title>
          <PageHeader.Breadcrumbs>
            <PageHeader.Link href="/">Home</PageHeader.Link>
            <PageHeader.Link disabled>Cart</PageHeader.Link>
          </PageHeader.Breadcrumbs>
        </PageHeader>

        <div className="mt-8 grid grid-cols-12 gap-y-10 md:gap-10">
          <div className="col-span-12">
            <ClientSide>
              <CartTable data={data} isLoading={isLoading} error={error} />
            </ClientSide>
          </div>

          {data && data.cart && data.cart.items.length !== 0 && (
            <div className="col-span-12 md:col-span-3">
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
