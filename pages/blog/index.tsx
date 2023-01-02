import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import getPosts from "@/lib/api/blog/getPosts";
import { IPost, NextPage } from "@/interfaces";

interface IBlogPage {
  posts: IPost[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const posts = await getPosts();

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
};

const BlogPage: NextPage<IBlogPage> = (props) => {
  const { posts } = props;

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
        {posts.map((post) => (
          <div key={post.id} className="col-span-12 lg:col-span-6">
            <PostCard {...post} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default BlogPage;
