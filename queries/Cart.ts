import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import backend from "@/backend";
import { ICart, IProduct } from "@/interfaces";
import useStore from "@/store";

interface IAddToCart {
  productId: IProduct["_id"];
  cartId: string;
}

const addToCart = async ({ productId, cartId }: IAddToCart) => {
  const res = await backend(`/api/cart/add/${productId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cartId,
    }),
  });
  const data: { data: ICart } = await res.json();
  return data;
};

export const useAddToCart = () => {
  const { mutate } = useSWRConfig();
  const cartId = useStore((store) => store.cart.id);

  return useSWRMutation(
    "/api/cart/add",
    (_, { arg }) => addToCart({ productId: arg.productId, cartId }),
    {
      onSuccess(data) {
        mutate(
          `/api/cart?cartId=${cartId}`,
          (cartData) => {
            console.log(cartData);
          },
          {}
        );
      },
    }
  );
};
