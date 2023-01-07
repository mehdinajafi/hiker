import Image from "next/image";
import useSWRMutation from "swr/mutation";
import { toast } from "react-toastify";
import useStore from "@/store";
import QuantityInput from "@/components/CartPage/QuantityInput";
import CartRow from "@/components/CartPage/CartRow";
import Spinner from "@/components/ui/Spinner";
import useRemoveFromCart from "@/hooks/apis/useRemoveFromCart";
import useUpdateCartItem from "@/hooks/apis/useUpdateCartItem";
import sendRequest from "@/utils/sendRequest";
import { ICartItem } from "@/interfaces";
import TrashIcon from "@/public/icons/trash.svg";

interface ICartItemRow {
  number: number;
  cartItem: ICartItem;
}

const CartItemRow: React.FC<ICartItemRow> = (props) => {
  const { cartItem } = props;
  const cartId = useStore((store) => store.cart.id);
  const { removeFromCart } = useRemoveFromCart();
  const { updateCartItem } = useUpdateCartItem();

  const { trigger: triggerRemoveFromCart, isMutating: removingFromCart } =
    useSWRMutation("/api/cart/remove", sendRequest, {
      onSuccess: () => {
        removeFromCart({ productId: cartItem.productId });
        toast.success("Item deleted successfully.");
      },
    });

  const { trigger: triggerChangeQuantity, isMutating: changingQuantity } =
    useSWRMutation("/api/cart/update", sendRequest);

  const handleChangeQuantity = async (newValue: number) => {
    try {
      await triggerChangeQuantity(
        {
          cartId,
          productId: cartItem.productId,
          quantity: newValue,
        },
        {
          onSuccess: () => {
            updateCartItem({
              productId: cartItem.productId,
              quantity: newValue,
            });
          },
        }
      );
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      await triggerRemoveFromCart({
        cartId,
        productId: cartItem.productId,
      });
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <CartRow>
      <div className="col-span-3 row-span-2 sm:col-span-1">
        <div className="flex items-center">
          <div className="w-14">
            <Image
              src={cartItem.product.images.main}
              alt="product image"
              width={54}
              height={80}
              className="h-full w-full"
            />
          </div>

          <div className="ml-6 flex flex-col justify-between self-stretch sm:justify-center">
            <span className="text-base">{cartItem.product.title}</span>

            <div className="mt-2 block sm:hidden">
              <QuantityInput
                loading={changingQuantity}
                value={cartItem.quantity}
                onChange={handleChangeQuantity}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="hidden sm:flex sm:items-center sm:justify-center">
        ${cartItem.product.price}
      </div>
      <div className="hidden sm:flex sm:items-center">
        <QuantityInput
          loading={changingQuantity}
          value={cartItem.quantity}
          onChange={handleChangeQuantity}
        />
      </div>
      <div className="text-end sm:flex sm:items-center sm:justify-center">
        ${cartItem.quantity * cartItem.product.price}
      </div>
      <div className="flex items-end justify-end sm:items-center">
        <button
          onClick={handleRemoveFromCart}
          className="rounded-full p-2 text-error hover:bg-error-background"
        >
          {removingFromCart ? <Spinner /> : <TrashIcon className="h-5 w-5" />}
        </button>
      </div>
    </CartRow>
  );
};

export default CartItemRow;
