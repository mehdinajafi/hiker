import clsx from "clsx";
import Navigation from "@/components/Navigation";
import TwitterIcon from "@/public/icons/twitter.svg";
import InstagramIcon from "@/public/icons/instagram.svg";
import ArrowDownIcon from "@/public/icons/arrow_down.svg";

const Header: React.FC = () => {
  return (
    <header className="relative">
      <div className="relative h-[500px] md:h-[762px]">
        <picture>
          <source srcSet="/images/header-bg.avif" type="image/avif" />
          <source srcSet="/images/header-bg.webp" type="image/webp" />
          <img
            src="/images/header-bg.jpg"
            alt="A mountain covered with fog."
            decoding="async"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-[-100px] md:object-top"
          />
        </picture>
      </div>
      <div className="absolute inset-0 bg-linear-gradient-1" />

      <div className="container absolute inset-x-0 top-0 p-4">
        <Navigation />

        <div className="relative mt-32 flex items-center justify-center">
          <div
            className={clsx(
              "left-0 mr-8 hidden items-center space-y-8 [writing-mode:vertical-lr]",
              "md:static md:flex md:flex-grow md:items-start lg:absolute lg:flex-grow-0"
            )}
          >
            <span className="text-lg text-white">Follow us</span>
            <a href="">
              <TwitterIcon />
            </a>
            <a href="">
              <InstagramIcon />
            </a>
          </div>

          <div className="flex max-w-[710px] flex-col">
            <div
              className={clsx(
                "flex items-center text-sm font-extrabold tracking-[0.375rem] text-yellow-400 md:text-base",
                "before:mr-3 before:h-px before:w-6 before:flex-shrink-0 before:bg-yellow-400 before:content-['_']"
              )}
            >
              A Hiking Guide
            </div>
            <h1 className="mt-6 font-serif text-3xl font-extrabold text-white md:text-5xl">
              Be prepared for the Mountains and beyond!
            </h1>
            <div className="mt-6 flex items-center space-x-8 font-bold text-white">
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
