import Divider from "@/components/ui/Divider";
import Spinner from "@/components/ui/Spinner";
import { ICart } from "@/interfaces";
import Image from "next/image";

interface IOrderSummery {
  items?: ICart["items"];
  shippingCost?: ICart["shippingCost"] | null;
  subTotalPrice?: ICart["subTotalPrice"];
  totalPrice?: ICart["totalPrice"];
  hideShippingCost?: boolean;
}

const OrderSummery: React.FC<IOrderSummery> = (props) => {
  const { items, subTotalPrice, shippingCost, totalPrice } = props;

  if (!items || !subTotalPrice || !totalPrice) {
    return (
      <div className="flex flex-col items-center">
        <Spinner />
        <span className="mt-2">Loading Cart</span>
      </div>
    );
  }

  const renderShippingCost = () => {
    if (props.hideShippingCost) {
      return (
        <div className="text-xs text-gray-300">Calculated at next step</div>
      );
    } else if (shippingCost === null) {
      return (
        <div className="text-xs text-gray-300">Select shipping method</div>
      );
    } else if (shippingCost === 0) {
      return <div className="text-sm font-semibold">Free</div>;
    } else {
      return <div className="text-sm font-semibold">${shippingCost}</div>;
    }
  };

  return (
    <div className="flex flex-col">
      {items.map((cartItem) => (
        <div key={cartItem._id} className="flex items-center justify-between">
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
        <div className="text-sm font-semibold">${subTotalPrice}</div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-300">Shipping</div>
        {renderShippingCost()}
      </div>

      <div className="my-4">
        <Divider />
      </div>

      <div className="flex items-center justify-between">
        <div className="text-gray-100">Total</div>
        <div className="font-semibold">${totalPrice}</div>
      </div>
    </div>
  );
};

export default OrderSummery;
