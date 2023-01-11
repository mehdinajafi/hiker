import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import clsx from "clsx";
import format from "date-fns/format";
import PageHeader from "@/components/PageHeader";
import getPost from "@/lib/api/blog/getPost";
import { IPost, NextPage } from "@/interfaces";

interface IBlogPostPage {
  post: IPost;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const post = await getPost(params?.slug as string);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      params,
      post: JSON.parse(JSON.stringify(post)),
    },
  };
};

const BlogPostPage: NextPage<IBlogPostPage> = (props) => {
  const { post } = props;

  return (
    <>
      <Head>
        <title>{post.title} - MNTN </title>
      </Head>

      <main className="container mb-16">
        <PageHeader>
          <PageHeader.Breadcrumbs>
            <PageHeader.Link href="/">Home</PageHeader.Link>
            <PageHeader.Link href="/blog">Blog</PageHeader.Link>
            <PageHeader.Link disabled>{post.title}</PageHeader.Link>
          </PageHeader.Breadcrumbs>
        </PageHeader>

        <article className="grid grid-cols-12">
          <div className="col-span-12 mb-8">
            <h2 className="heading-5xl mt-4 font-serif text-accent">
              {post.title}
            </h2>
            <div className="text-subtitle1 mt-4">{post.author.name}</div>
            <time className="mt-2 inline-block text-gray-500">
              {format(post.time, "dd MMM yyyy")}
            </time>
          </div>

          <div className="col-span-12 md:col-span-8">
            <div className="overflow-hidden rounded-md">
              <Image
                src={post.image}
                alt={post.imageAlt}
                height={300}
                width={500}
                className="w-full object-cover"
              />
            </div>

            <div
              className={clsx(
                "prose-lg py-12",
                "prose-headings:font-serif prose-ul:list-disc",
                "prose-a:no-underline hover:prose-a:underline"
              )}
              dangerouslySetInnerHTML={{ __html: post.body }}
            />
          </div>

          <div className="col-span-4 hidden md:block">
            <div className="sticky top-8 pl-10">
              <h3 className="whitespace-nowrap text-2xl">Table of Contents</h3>
              <ul className="mt-4 flex flex-col space-y-4 text-base text-gray-600">
                {post.headers.map((header) => (
                  <li key={header.id}>
                    <a
                      href={"#" + header.id}
                      className="border-l-2 border-transparent pl-4 hover:border-white hover:text-white"
                    >
                      {header.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </main>
    </>
  );
};

export default BlogPostPage;
