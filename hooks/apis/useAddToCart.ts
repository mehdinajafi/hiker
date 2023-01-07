import { ICart, IProduct } from "@/interfaces";
import { useSWRConfig } from "swr";

interface IOptions {
  cartId: string | null;
  productId?: string;
  product?: IProduct;
}

const useAddToCart = () => {
  const { mutate } = useSWRConfig();

  const addToCart = async ({ cartId }: IOptions) => {
    await mutate(
      `/api/cart?cartId=${cartId}`,
      async (currentData: { cart: ICart } | undefined) => {
        if (currentData) {
          const newCart = { ...currentData.cart };
          newCart.totalQuantity += 1;
          return { status: 200, cart: newCart };
        }
      }
    );
  };

  return {
    addToCart,
  };
};

export default useAddToCart;
