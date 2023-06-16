"use client";

import { useState } from "react";
import Link from "next/link";
import Drawer from "@/components/ui/Drawer";
import TwitterIcon from "@/public/icons/twitter.svg";
import InstagramIcon from "@/public/icons/instagram.svg";
import MenuIcon from "@/public/icons/menu.svg";
import XIcon from "@/public/icons/x.svg";

const PageLink: React.FC<{
  onClick: () => void;
  href: string;
  children: React.ReactNode;
}> = (props) => (
  <li className="heading-xl text-white">
    <Link href={props.href} onClick={props.onClick}>
      {props.children}
    </Link>
  </li>
);

const MobileDrawer = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const onClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <button onClick={toggleMenu}>
        <MenuIcon aria-hidden="true" width="24" height="24" />
      </button>

      <Drawer
        open={isMenuOpen}
        onClose={onClose}
        anchor="left"
        hide="md"
        keepMounted
      >
        <div className="flex h-full flex-col bg-black px-4">
          <button
            onClick={toggleMenu}
            className="mt-2 flex items-center self-start py-2 text-gray-300"
          >
            <XIcon aria-hidden="true" width="24" height="24" />{" "}
            <span className="text-subtitle2 ml-2">Close</span>
          </button>

          <nav className="mt-16">
            <ul className="flex list-none flex-col space-y-8">
              <PageLink href="/equipment" onClick={onClose}>
                Equipment
              </PageLink>
              <PageLink href="/about-us" onClick={onClose}>
                About us
              </PageLink>
              <PageLink href="/blog" onClick={onClose}>
                Blog
              </PageLink>
            </ul>
          </nav>

          <div className="mt-auto mb-8 flex items-center space-x-6 text-white">
            <div className="text-subtitle1">Follow us</div>

            <div className="flex items-center space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <TwitterIcon />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <InstagramIcon />
              </a>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default MobileDrawer;
