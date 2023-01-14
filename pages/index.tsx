import Head from "next/head";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import { NextPage } from "@/interfaces";

const post = {
  time: 1671957358231,
  title: "What level of  hiker are you?",
  description:
    "Determining what level of hiker you are can be an important tool when planning future hikes....",
  image: "/images/header-bg.jpg",
  imageAlt: "Mountaineering runs on the mountain.",
  slug: "what-level-of-hiker-are-you-?",
};

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>MNTN</title>
      </Head>

      <main className="container mb-20 flex flex-col gap-10 md:gap-32">
        <section className="mt-16">
          <h3 className="font-serif text-2xl font-semibold">Our Blog</h3>
          <div className="mt-6 grid grid-cols-12 gap-5">
            <div className="col-span-12 md:col-span-4">
              <PostCard {...post} />
            </div>
            <div className="col-span-12 md:col-span-4">
              <PostCard {...post} />
            </div>
            <div className="col-span-12 md:col-span-4">
              <PostCard {...post} />
            </div>
          </div>
        </section>
      </main>
    </>
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
