"use client";

import { toast } from "react-toastify";
import Button from "@/components/ui/Button";
import useStore from "@/store";
import { useAddToCart } from "@/queries/Cart";
import PlusIcon from "@/public/icons/plus.svg";
import { IProduct } from "@/interfaces";

interface IAddToCartButton {
  productId: IProduct["_id"];
}

const AddToCartButton: React.FC<IAddToCartButton> = ({ productId }) => {
  const setCartId = useStore((store) => store.setCartId);
  const cartId = useStore((store) => store.cart.id);

  const addToCart = useAddToCart();

  const handleAddToCart = async () => {
    try {
      const data = await addToCart.trigger({ productId });

      if (!cartId && data) {
        setCartId(data.cart.cartId);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <Button
      color="primary"
      disabled={addToCart.isMutating}
      startIcon={<PlusIcon className="h-6 w-6" />}
      onClick={handleAddToCart}
      className="font-medium"
    >
      Add To Cart
    </Button>
  );
};

export default AddToCartButton;
