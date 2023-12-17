import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import PostCard from "@/components/PostCard";
import { getPosts } from "@/queries/Blog";

export const metadata: Metadata = {
  title: "Blog | HIKER",
};

const BlogPage = async () => {
  const posts = await getPosts();

  return (
    <main className="container mb-16">
      <PageHeader>
        <PageHeader.Title>Blog</PageHeader.Title>
        <PageHeader.Breadcrumbs>
          <PageHeader.Link href="/">Home</PageHeader.Link>
          <PageHeader.Link disabled>Blog</PageHeader.Link>
        </PageHeader.Breadcrumbs>
      </PageHeader>

      <div className="mt-16 grid grid-cols-12 gap-5">
        {posts.map((post) => (
          <div key={post._id} className="col-span-12 md:col-span-6">
            <PostCard {...post} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default BlogPage;
