import Head from "next/head";
import Link from "next/link";
import clsx from "clsx";
import { NextPageWithLayout } from "@/pages/_app";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ArrowDownIcon from "@/public/icons/arrow_down.svg";

const HomePage: NextPageWithLayout = () => {
  return (
    <main className="container mb-20 flex flex-col gap-10 md:gap-32">
      <Head>
        <title>MNTN</title>
      </Head>

      <Row
        number="01"
        tagline="GEt Started"
        heading="What level of  hiker are you?"
        body="Determining what level of hiker you are can be an important tool when planning future hikes. This hiking level guide will help you plan hikes according to different hike ratings set by various websites like All Trails and Modern Hiker. What type of hiker are you - novice, moderate, advanced moderate, expert, or expert backpacker? "
        href="/posts/1"
        imageName="01"
        imageAlt="Mountaineering runs on the mountain."
        reverse
      />
      <Row
        number="02"
        tagline="Hiking Essentials"
        heading="Picking the right Hiking Gear!"
        body="The nice thing about beginning hiking is that you don’t really need any special gear, you can probably get away with things you already have.
          Let’s start with clothing. A typical mistake hiking beginners make is wearing jeans and regular clothes, which will get heavy and chafe wif they get sweaty or wet."
        href="/posts/2"
        imageName="02"
        imageAlt="A man standing in front of a mountain."
      />
      <Row
        number="03"
        tagline="where you go is the key"
        heading="Understand Your Map & Timing"
        body="To start, print out the hiking guide and map. If it’s raining, throw them in a Zip-Lock bag. Read over the guide, study the map, and have a good idea of what to expect. I like to know what my next landmark is as I hike. For example, I’ll read the guide and know that say, in a mile, I make a right turn at the junction.."
        href="/posts/3"
        imageName="03"
        imageAlt="Someone is holding a compass on the mountain."
        reverse
      />
    </main>
  );
};

HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <>
      <Header />
      {page}
      <Footer />
    </>
  );
};

export default HomePage;

// --------------------------- Row --------------------------- //
interface IRow {
  number: string;
  tagline: string;
  heading: string;
  body: string;
  href: string;
  imageName: string;
  imageAlt: string;
  reverse?: boolean;
}

const Row: React.FC<IRow> = (props) => {
  const { number, tagline, heading, body, href, imageName, imageAlt, reverse } =
    props;

  return (
    <div className="grid grid-cols-12 items-center gap-x-0 md:gap-x-10">
      <div
        className={clsx("col-span-12 row-start-1 md:col-span-6", {
          "md:col-start-7": reverse,
          "md:col-start-1": !reverse,
        })}
      >
        <picture>
          <source srcSet={"/images/" + imageName + ".avif"} type="image/avif" />
          <source srcSet={"/images/" + imageName + ".webp"} type="image/webp" />
          <img
            src={"/images/" + imageName + ".jpg"}
            alt={imageAlt}
            width={566}
            height={720}
            className="w-full"
          />
        </picture>
      </div>

      <div
        className={clsx("col-span-12 md:col-span-6", {
          "md:col-start-1": reverse,
          "md:col-start-7": !reverse,
        })}
      >
        <span className="absolute text-8xl font-bold text-white opacity-10">
          {number}
        </span>
        <div
          className={clsx(
            "text-overline mt-10 flex items-center text-accent",
            "before:mr-3 before:h-px before:w-6 before:flex-shrink-0 before:bg-accent before:content-['_']"
          )}
        >
          {tagline}
        </div>
        <h4 className="heading-2xl mt-3 text-white">{heading}</h4>
        <p className="text-body2 mt-4 max-w-md text-white">{body}</p>
        <Link
          href={href}
          className="mt-4 flex items-center space-x-4 text-accent"
        >
          <span className="text-subtitle2">read more</span>
          <ArrowDownIcon className="rotate-[270deg]" />
        </Link>
      </div>
    </div>
  );
};
