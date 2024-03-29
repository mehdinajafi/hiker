import { Metadata } from "next";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import { getPosts } from "@/queries/Blog";

export const metadata: Metadata = {
  title: "HIKER",
};

const HomePage = async () => {
  const posts = await getPosts();

  return (
    <main className="mb-20 -mt-16">
      <Header />

      <section className="container mt-16">
        <h3 className="font-serif text-2xl font-semibold">Our Blog</h3>
        <div className="mt-6 grid grid-cols-12 gap-5">
          {posts.map((post: any) => (
            <div key={post._id} className="col-span-12 md:col-span-4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
