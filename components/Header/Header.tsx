import clsx from "clsx";
import Navigation from "@/components/Navigation";
import TwitterIcon from "@/public/icons/twitter.svg";
import InstagramIcon from "@/public/icons/instagram.svg";
import ArrowDownIcon from "@/public/icons/arrow_down.svg";
import HeaderBG from "@/public/images/header-bg.jpg";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <header className="relative">
      <div className="relative h-[500px] md:h-[762px]">
        <Image
          src={HeaderBG}
          alt="A mountain covered with fog."
          decoding="async"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-[-100px] md:object-top"
        />
      </div>

      <div className="absolute inset-x-0 top-0">
        <Navigation />

        <div className="container relative mt-32 flex items-center justify-center">
          <div
            className={clsx(
              "left-4 mr-8 hidden items-center space-y-8 [writing-mode:vertical-lr]",
              "md:static md:flex md:flex-grow md:items-start lg:absolute lg:flex-grow-0"
            )}
          >
            <span className="whitespace-nowrap text-lg">Follow us</span>
            <a href="">
              <TwitterIcon />
            </a>
            <a href="">
              <InstagramIcon />
            </a>
          </div>

          <div className="flex max-w-[710px] flex-col">
            <h1 className="font-serif text-3xl font-extrabold md:text-5xl">
              Be prepared for the Mountains and beyond!
            </h1>
            <div className="mt-6 flex items-center space-x-8 font-bold">
              <span className="text-base md:text-lg">scroll down</span>
              <ArrowDownIcon />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
