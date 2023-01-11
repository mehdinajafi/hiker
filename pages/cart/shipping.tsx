import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import clsx from "clsx";
import useStore from "@/store";
import PageHeader from "@/components/PageHeader";
import CheckoutLayout from "@/components/CartPage/CheckoutLayout";
import InformationTable from "@/components/CartPage/InformationTable";
import ShippingMethod from "@/components/CartPage/ShippingMethod";
import RadioGroup from "@/components/ui/RadioGroup";
import OrderSummery from "@/components/CartPage/OrderSummery";
import { ICart, IShippingMethod } from "@/interfaces";
import Button from "@/components/ui/Button";
import ChevronLeftIcon from "@/public/icons/chevron-left.svg";
import Spinner from "@/components/ui/Spinner";
import Alert from "@/components/ui/Alert";
import sendRequest from "@/utils/sendRequest";

const CheckoutPage = () => {
  const router = useRouter();
  const cartId = useStore((store) => store.cart.id);

  const [shippingId, setShippingId] = useState("");
  const [shippingCost, setShippingCost] = useState<number | null>(null);

  const {
    data: cartData,
    isLoading: cartDataIsLoading,
    mutate: mutateCartData,
  } = useSWR<{
    cart: ICart;
  }>(cartId ? `/api/cart?cartId=${cartId}` : null);

  const {
    data: shippingData,
    isLoading: shippingIsLoading,
    error: shippingDataError,
    mutate: mutateShippingData,
    isValidating: shippingDataIsValidating,
  } = useSWR<{
    methods: IShippingMethod[];
  }>("/api/checkout/shipping-methods");

  const { trigger, isMutating: methodIsMutating } = useSWRMutation(
    "/api/checkout/save-shipping-method",
    sendRequest,
    {
      onSuccess: async (data) => {
        await mutateCartData(data);
      },
    }
  );

  const handleChangeShippingMethod = (id: string) => {
    if (shippingData?.methods) {
      const method = shippingData.methods.find(
        (method) => method._id === Number(id)
      );
      if (method) {
        setShippingCost(method.price);
        setShippingId(id);
      }
    }
  };

  const goToPaymentStep = async () => {
    await trigger({
      cartId,
      methodId: shippingId,
    });
    router.push("/cart/payment");
  };

  return (
    <>
      <Head>
        <title>Shipping - MNTN</title>
      </Head>

      <main className="container mb-20">
        <PageHeader>
          <PageHeader.Title>Shipping</PageHeader.Title>
          <PageHeader.Breadcrumbs>
            <PageHeader.Link>Home</PageHeader.Link>
            <PageHeader.Link href="/cart">Cart</PageHeader.Link>
            <PageHeader.Link href="/cart/information">
              Information
            </PageHeader.Link>
            <PageHeader.Link disabled>Shipping</PageHeader.Link>
          </PageHeader.Breadcrumbs>
        </PageHeader>

        <CheckoutLayout
          orderSummery={
            <OrderSummery
              items={cartData?.cart.items}
              subTotalPrice={cartData?.cart.subTotalPrice}
              totalPrice={
                cartData?.cart.subTotalPrice
                  ? cartData.cart.subTotalPrice + (shippingCost || 0)
                  : cartData?.cart.subTotalPrice
              }
              shippingCost={shippingCost}
            />
          }
        >
          {cartData?.cart.information && (
            <InformationTable information={cartData?.cart.information} />
          )}

          <fieldset className="mt-8">
            <legend className="mb-4 font-bold">Select shipping method</legend>
            {shippingDataError && (
              <Alert severity="error">
                <div className="">
                  Something went wrong in geting shipping methods!
                </div>
                <div className="mt-2">
                  <Button
                    color="error"
                    disabled={shippingDataIsValidating}
                    onClick={() => mutateShippingData()}
                  >
                    Reload
                  </Button>
                </div>
              </Alert>
            )}
            {shippingIsLoading && (
              <div className="flex h-36 w-full flex-col items-center justify-center rounded-md border border-gray-500">
                <Spinner />
                <span className="mt-4 text-sm">
                  Get available shipping rates...
                </span>
              </div>
            )}
            {shippingData && (
              <RadioGroup
                value={shippingId}
                onValueChange={handleChangeShippingMethod}
              >
                <div className="rounded-md border border-gray-500">
                  {shippingData.methods.map((method) => (
                    <ShippingMethod key={method._id} method={method} />
                  ))}
                </div>
              </RadioGroup>
            )}
          </fieldset>

          <div
            className={clsx(
              "mt-8 flex flex-col justify-between space-y-6",
              "sm:flex-row-reverse sm:items-center sm:space-y-0"
            )}
          >
            <Button
              type="submit"
              color="primary"
              disabled={methodIsMutating || !shippingId}
              onClick={goToPaymentStep}
            >
              Continue to payment
            </Button>

            <Button
              type="button"
              startIcon={<ChevronLeftIcon />}
              color="primary"
              variant="text"
              href="/cart/information"
            >
              Return to information
            </Button>
          </div>
        </CheckoutLayout>
      </main>
    </>
  );
};

export default CheckoutPage;
