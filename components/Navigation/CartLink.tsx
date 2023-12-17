"use client";

import useSWR from "swr";
import Badge from "@/components/ui/Badge";
import useStore from "@/store";
import { ICart } from "@/interfaces";
import CartIcon from "@/public/icons/cart.svg";
import Link from "next/link";

const CartLink = () => {
  const cartId = useStore((store) => store.cart.id);
  const { data } = useSWR<{ cart: ICart }>(
    cartId ? `/api/cart?cartId=${cartId}` : null
  );

  return (
    <Link href="/cart">
      <Badge badgeContent={(data && data.cart && data.cart.totalQuantity) || 0}>
        <CartIcon className="h-5 w-5" />
      </Badge>
    </Link>
  );
};

export default CartLink;
