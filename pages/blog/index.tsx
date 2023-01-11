import { GetServerSideProps } from "next";
import Head from "next/head";
import PostCard from "@/components/PostCard";
import PageHeader from "@/components/PageHeader";
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
    <>
      <Head>
        <title>MNTN - Blog</title>
      </Head>

      <main className="container mb-16">
        <PageHeader>
          <PageHeader.Title>Blog</PageHeader.Title>
          <PageHeader.Breadcrumbs>
            <PageHeader.Link href="/">Home</PageHeader.Link>
            <PageHeader.Link disabled>Blog</PageHeader.Link>
          </PageHeader.Breadcrumbs>
        </PageHeader>

        <div className="mt-16 grid grid-cols-12 gap-y-10 gap-x-0 md:gap-x-10">
          {posts.map((post) => (
            <div key={post._id} className="col-span-12 lg:col-span-6">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default BlogPage;
