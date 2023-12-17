import Link from "next/link";
import Logo from "@/components/Logo";
import MobileDrawer from "./MobileDrawer";
import CartLink from "./CartLink";

const Navigation = () => {
  return (
    <nav className="container relative z-20 flex items-center justify-between py-3">
      <div className="inline-flex md:hidden">
        <MobileDrawer />
      </div>

      <Logo />

      <div className="hidden md:block">
        <ul className="flex list-none items-center space-x-10 text-lg">
          <li className="text-subtitle1 transition-colors hover:text-gray-600">
            <Link href="/equipment">Equipment</Link>
          </li>
          <li className="text-subtitle1 transition-colors hover:text-gray-600">
            <Link href="/about-us">About us</Link>
          </li>
          <li className="text-subtitle1 transition-colors hover:text-gray-600">
            <Link href="/blog">Blog</Link>
          </li>
        </ul>
      </div>

      <div className="inline-flex">
        <CartLink />
      </div>
    </nav>
  );
};

export default Navigation;
