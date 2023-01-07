import { useSWRConfig } from "swr";
import useStore from "@/store";
import { ICart } from "@/interfaces";

interface IOptions {
  productId: string;
  quantity: number;
}

const useUpdateCartItem = () => {
  const cartId = useStore((store) => store.cart.id);
  const { mutate } = useSWRConfig();

  const updateCartItem = ({ productId, quantity }: IOptions) => {
    mutate(
      `/api/cart?cartId=${cartId}`,
      async (currentData: { cart: ICart } | undefined) => {
        if (currentData) {
          const newCart = { ...currentData.cart };
          const item = newCart.items.find(
            (item) => item.productId === productId
          );
          if (item) {
            item.quantity = quantity;
          }
          return { status: 200, cart: newCart };
        }
      }
    );
  };

  return {
    updateCartItem,
  };
};

export default useUpdateCartItem;
