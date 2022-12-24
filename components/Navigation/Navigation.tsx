import { useState } from "react";
import Link from "next/link";
import { m } from "framer-motion";
import Logo from "@/components/Logo";
import Drawer from "@/components/ui/Drawer";
import AccountIcon from "@/public/icons/account.svg";
import TwitterIcon from "@/public/icons/twitter.svg";
import InstagramIcon from "@/public/icons/instagram.svg";

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
        <AccountManager />
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
      {/* Button has a higher z-index than the drawer */}
      <button onClick={toggleMenu} className="relative z-[1201]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#fff"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <m.line
            animate={{ y2: isMenuOpen ? 18 : 6 }}
            x1="5"
            y1="6"
            x2="19"
            y2="6"
          />
          {!isMenuOpen && <line x1="5" y1="12" x2="19" y2="12" />}
          <m.line
            animate={{ y2: isMenuOpen ? 6 : 18 }}
            x1="5"
            y1="18"
            x2="19"
            y2="18"
          />
        </svg>
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
          <nav className="pt-32">
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
    <ul className="flex list-none items-center space-x-10 text-lg text-white">
      <li className="transition-colors hover:text-gray-200">
        <Link href="/equipment">Equipment</Link>
      </li>
      <li className="transition-colors hover:text-gray-200">
        <Link href="/about-us">About us</Link>
      </li>
      <li className="transition-colors hover:text-gray-200">
        <Link href="/blog">Blog</Link>
      </li>
    </ul>
  );
};

// ------------------------ Account Manager ------------------------ //
const AccountManager = () => {
  return (
    <button className="flex items-center space-x-2 text-white">
      <AccountIcon />
      <span className="hidden sm:inline">Account</span>
    </button>
  );
};

export default Navigation;
