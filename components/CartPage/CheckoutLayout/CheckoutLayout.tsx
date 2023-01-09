import Image from "next/image";
import useSWR from "swr";
import Divider from "@/components/ui/Divider";
import useStore from "@/store";
import { ICart } from "@/interfaces";

interface ICheckoutLayout {
  children: React.ReactNode;
  hideShippingCost?: boolean;
}

const CheckoutLayout: React.FC<ICheckoutLayout> = (props) => {
  const cartId = useStore((store) => store.cart.id);
  const { data } = useSWR<{ cart: ICart }>(
    cartId ? `/api/cart?cartId=${cartId}` : null
  );

  return (
    <div className="mt-8 grid grid-cols-12 gap-8">
      <div className="col-span-12 md:col-span-7">{props.children}</div>

      <div className="col-span-12 border-l border-gray-700 pl-8 md:col-span-5">
        {data && data.cart && (
          <div className="flex flex-col">
            {data.cart.items.map((cartItem) => (
              <div
                key={cartItem._id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <div className="w-12">
                    <Image
                      src={cartItem.product.images.main}
                      alt={cartItem.product.title}
                      width={66}
                      height={66}
                      className="w-full"
                    />
                  </div>

                  <div className="ml-5">
                    <div className="text-sm font-semibold">
                      {cartItem.product.title}
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      Quantity: {cartItem.quantity}
                    </div>
                  </div>
                </div>
                <div className="font-semibold">
                  ${cartItem.quantity * cartItem.product.price}
                </div>
              </div>
            ))}

            <div className="my-4">
              <Divider />
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-300">Subtotal</div>
              <div className="text-sm font-semibold">
                ${data.cart.subTotalPrice}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-300">Shipping</div>
              {props.hideShippingCost || !data.cart.shippingCost ? (
                <div className="text-xs text-gray-300">
                  Calculated at next step
                </div>
              ) : (
                <div className="text-sm font-semibold">
                  ${data.cart.shippingCost}
                </div>
              )}
            </div>

            <div className="my-4">
              <Divider />
            </div>

            <div className="flex items-center justify-between">
              <div className="text-gray-100">Total</div>
              <div className="font-semibold">${data.cart.totalPrice}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutLayout;
