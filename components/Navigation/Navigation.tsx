import { useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import Logo from "@/components/Logo";
import Drawer from "@/components/ui/Drawer";
import Badge from "@/components/ui/Badge";
import useStore from "@/store";
import { ICart } from "@/interfaces";
import TwitterIcon from "@/public/icons/twitter.svg";
import InstagramIcon from "@/public/icons/instagram.svg";
import MenuIcon from "@/public/icons/menu.svg";
import XIcon from "@/public/icons/x.svg";
import CartIcon from "@/public/icons/cart.svg";

const Navigation = () => {
  return (
    <section className="container flex items-center justify-between py-3">
      <div className="inline-flex md:hidden">
        <MobileMenu />
      </div>

      <div>
        <Logo />
      </div>

      <div className="hidden md:block">
        <DesktopNav />
      </div>

      <div className="inline-flex">
        <Cart />
      </div>
    </section>
  );
};

// ------------------------ Mobile Menu ------------------------ //
const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const onClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <button onClick={toggleMenu} className="text-white">
        <MenuIcon aria-hidden="true" width="24" height="24" />
      </button>

      <Drawer
        open={isMenuOpen}
        onClose={onClose}
        anchor="left"
        hide="md"
        fullWidth
        keepMounted
      >
        <div className="flex h-full flex-col bg-black px-4">
          <button
            onClick={toggleMenu}
            className="mt-2 flex items-center self-start py-2 text-gray-300"
          >
            <XIcon aria-hidden="true" width="24" height="24" />{" "}
            <span className="text-subtitle1 ml-2">Close</span>
          </button>

          <nav className="mt-16">
            <ul className="flex list-none flex-col space-y-8 text-2xl font-extrabold text-white">
              <li>
                <Link href="/equipment">Equipment</Link>
              </li>
              <li>
                <Link href="/about-us">About us</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
            </ul>
          </nav>

          <div className="mt-auto mb-8 flex items-center space-x-6 text-white">
            <div className="text-xl">Follow us</div>

            <div className="flex items-center space-x-4">
              <a href="">
                <TwitterIcon />
              </a>
              <a href="">
                <InstagramIcon />
              </a>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

// ------------------------ Desktop Nav ------------------------ //
const DesktopNav = () => {
  return (
    <ul className="flex list-none items-center space-x-10 text-lg">
      <li className="text-subtitle1 transition-colors hover:text-gray-200">
        <Link href="/equipment">Equipment</Link>
      </li>
      <li className="text-subtitle1 transition-colors hover:text-gray-200">
        <Link href="/about-us">About us</Link>
      </li>
      <li className="text-subtitle1 transition-colors hover:text-gray-200">
        <Link href="/blog">Blog</Link>
      </li>
    </ul>
  );
};

// ------------------------ Cart ------------------------ //
const Cart = () => {
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

export default Navigation;
