import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import useStore from "@/store";
import PageHeader from "@/components/PageHeader";
import CheckoutLayout from "@/components/CartPage/CheckoutLayout";
import InformationTable from "@/components/CartPage/InformationTable";
import OrderSummery from "@/components/CartPage/OrderSummery";
import Button from "@/components/ui/Button";
import RadioGroup from "@/components/ui/RadioGroup";
import Label from "@/components/ui/Label";
import ChevronLeftIcon from "@/public/icons/chevron-left.svg";
import { ICart } from "@/interfaces";

type PaymentMethods = "paypal" | "credit-card";

const CheckoutPage = () => {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethods>("paypal");

  const cartId = useStore((store) => store.cart.id);

  const { data: cartData } = useSWR<{
    cart: ICart;
  }>(cartId ? `/api/cart?cartId=${cartId}` : null);

  if (cartData && cartData.cart.shipment?.length === 0) {
    router.push("/cart/shipping");
  }

  const handlePaymentMethodChange = (method: PaymentMethods) => {
    setPaymentMethod(method);
  };

  return (
    <>
      <Head>
        <title>Payment - MNTN</title>
      </Head>

      <main className="container mt-8 mb-20">
        <PageHeader>
          <PageHeader.Title>Payment</PageHeader.Title>
          <PageHeader.Breadcrumbs>
            <PageHeader.Link>Home</PageHeader.Link>
            <PageHeader.Link href="/cart">Cart</PageHeader.Link>
            <PageHeader.Link href="/cart/information">
              Information
            </PageHeader.Link>
            <PageHeader.Link href="/cart/shipping">Shipping</PageHeader.Link>
            <PageHeader.Link disabled>Payment</PageHeader.Link>
          </PageHeader.Breadcrumbs>
        </PageHeader>

        <CheckoutLayout
          orderSummery={
            <OrderSummery
              items={cartData?.cart.items}
              subTotalPrice={cartData?.cart.subTotalPrice}
              totalPrice={cartData?.cart.totalPrice}
              shippingCost={cartData?.cart.shippingCost}
            />
          }
        >
          {cartData?.cart.information && (
            <InformationTable
              information={cartData?.cart.information}
              shipment={cartData.cart.shipment}
            />
          )}

          <fieldset className="mt-8">
            <legend className="mb-4 font-bold">Pay with</legend>

            <div className="rounded-md border border-gray-500">
              <RadioGroup
                value={paymentMethod}
                onValueChange={handlePaymentMethodChange}
              >
                <div className="flex items-center border-b border-gray-500 last-of-type:border-b-0">
                  <Label
                    control={<RadioGroup.Radio value="paypal" />}
                    label="Paypal"
                    className="grow p-4"
                  />
                </div>

                <div className="flex items-center border-b border-gray-500 last-of-type:border-b-0">
                  <Label
                    control={<RadioGroup.Radio value="credit-card" />}
                    label="Credit Card"
                    className="grow p-4"
                  />
                </div>
              </RadioGroup>
            </div>
          </fieldset>

          <div className="mt-8 flex items-center justify-between">
            <Button
              type="button"
              startIcon={<ChevronLeftIcon />}
              color="primary"
              variant="text"
              href="/cart/shipping"
            >
              Return to shipping
            </Button>

            <Button type="submit" color="primary">
              Pay
            </Button>
          </div>
        </CheckoutLayout>
      </main>
    </>
  );
};

export default CheckoutPage;
