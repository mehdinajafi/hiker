import Link from "next/link";
import Logo from "@/components/Logo";

const Footer = () => {
  return (
    <footer className="container grid grid-cols-12 gap-y-10 pb-10">
      <div className="col-span-full sm:col-span-4 md:col-span-5 lg:col-span-6">
        <Logo />
        <p className="text-subtitle2 mt-6 max-w-xs text-white sm:pr-4">
          Get out there & discover your next slope, mountain & destination!
        </p>
      </div>

      <div className="col-span-full sm:col-span-5 md:col-span-4 lg:col-span-4">
        <h2 className="heading-xl text-accent">More on The Blog</h2>
        <ul className="text-subtitle2 mt-6 flex flex-col space-y-4 text-white">
          <li>
            <Link href="/about-us">About MNTN</Link>
          </li>
          <li>
            <Link href="/contributors">Contributors & Writers</Link>
          </li>
          <li>
            <Link href="/write-for-us">Write For Us</Link>
          </li>
          <li>
            <Link href="/contact-us">Contact Us</Link>
          </li>
          <li>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </li>
        </ul>
      </div>

      <div className="col-span-full sm:col-span-3 lg:col-span-2">
        <h2 className="heading-xl text-accent">More on MNTN</h2>
        <ul className="text-subtitle2 mt-6 flex flex-col space-y-4 text-white">
          <li>
            <Link href="/about-us">The Team</Link>
          </li>
          <li>
            <Link href="/jobs">Jobs</Link>
          </li>
          <li>
            <Link href="/press">Press</Link>
          </li>
        </ul>
      </div>

      <p className="text-subtitle2 col-span-12 text-center text-gray-500 md:text-start">
        Copyright 2022 MNTN.
      </p>
    </footer>
  );
};

export default Footer;
