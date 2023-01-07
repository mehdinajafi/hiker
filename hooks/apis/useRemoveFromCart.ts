import { useSWRConfig } from "swr";
import useStore from "@/store";
import { ICart } from "@/interfaces";

interface IOptions {
  productId: string;
}

const useRemoveFromCart = () => {
  const cartId = useStore((store) => store.cart.id);
  const { mutate } = useSWRConfig();

  const removeFromCart = async ({ productId }: IOptions) => {
    await mutate(
      `/api/cart?cartId=${cartId}`,
      async (currentData: { cart: ICart } | undefined) => {
        if (currentData) {
          const newCart = { ...currentData.cart };
          newCart.items = newCart.items.filter(
            (item) => item.productId !== productId
          );
          return { status: 200, cart: newCart };
        }
      }
    );
  };

  return {
    removeFromCart,
  };
};

export default useRemoveFromCart;
