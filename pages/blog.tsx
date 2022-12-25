import Head from "next/head";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

const post = {
  time: 1671957358231,
  title: "What level of  hiker are you?",
  description:
    "Determining what level of hiker you are can be an important tool when planning future hikes....",
  image: "/images/header-bg.avif",
  imageAlt: "Mountaineering runs on the mountain.",
  slug: "/blog/what-level-of-hiker-are-you-?",
};

const BlogPage = () => {
  return (
    <main>
      <Head>
        <title>MNTN - Blog</title>
      </Head>

      <div className="container mt-14">
        <h2 className="heading-5xl text-white">Blog</h2>
        <div className="mt-4 text-gray-500">
          <Breadcrumbs>
            <Link href="/" className="text-gray-200">
              Home
            </Link>
            <div className="">Blog</div>
          </Breadcrumbs>
        </div>
      </div>

      <div className="container my-16 grid grid-cols-12 gap-y-10 gap-x-0 md:gap-x-10">
        <div className="col-span-12 lg:col-span-6">
          <PostCard {...post} />
        </div>

        <div className="col-span-12 lg:col-span-6">
          <PostCard {...post} />
        </div>

        <div className="col-span-12 lg:col-span-6">
          <PostCard {...post} />
        </div>
      </div>
    </main>
  );
};

export default BlogPage;
