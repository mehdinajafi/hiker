import { GetServerSideProps } from "next";
import Head from "next/head";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import getPosts from "@/lib/api/blog/getPosts";
import { IPost, NextPage } from "@/interfaces";

interface IHomePage {
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

const HomePage: NextPage<IHomePage> = (props) => {
  return (
    <>
      <Head>
        <title>HIKER</title>
      </Head>

      <main className="container mb-20 flex flex-col gap-10 md:gap-32">
        <section className="mt-16">
          <h3 className="font-serif text-2xl font-semibold">Our Blog</h3>
          <div className="mt-6 grid grid-cols-12 gap-5">
            {props.posts.map((post) => (
              <div key={post._id} className="col-span-12 md:col-span-4">
                <PostCard {...post} />
              </div>
            ))}
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
