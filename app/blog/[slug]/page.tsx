import clsx from "clsx";
import { format } from "date-fns";
import PageHeader from "@/components/PageHeader";
import BlurImage from "@/components/ui/BlurImage";
import { getPost } from "@/api/queries/post";

type PageProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: PageProps) {
  const post = await getPost({ slug: params.slug });

  return {
    title: `${post.data.title} | HIKER`,
  };
}

const BlogPostPage = async ({ params }: PageProps) => {
  const post = await getPost({ slug: params.slug });

  return (
    <main className="container mb-16">
      <PageHeader>
        <PageHeader.Breadcrumbs>
          <PageHeader.Link href="/">Home</PageHeader.Link>
          <PageHeader.Link href="/blog">Blog</PageHeader.Link>
          <PageHeader.Link disabled>{post.data.title}</PageHeader.Link>
        </PageHeader.Breadcrumbs>
      </PageHeader>

      <article className="grid grid-cols-12">
        <div className="col-span-12 mb-8">
          <h2 className="heading-5xl mt-4 font-serif text-primary">
            {post.data.title}
          </h2>
          <div className="mt-4 text-sm">
            {post.data.author.firstName} {post.data.author.lastName}
          </div>
          <time className="mt-2 inline-block text-sm text-gray-500">
            {format(new Date(post.data.createdAt), "dd MMM yyyy")}
          </time>
        </div>

        <div className="col-span-12 md:col-span-8">
          <div className="overflow-hidden rounded-md">
            <BlurImage
              src={post.data.image}
              alt={post.data.imageAlt}
              height={300}
              width={500}
              className="w-full object-cover"
            />
          </div>

          <div
            className={clsx(
              "prose-lg py-12",
              "prose-headings:font-serif prose-ul:list-disc",
              "prose-a:text-primary-dark prose-a:no-underline hover:prose-a:underline"
            )}
            dangerouslySetInnerHTML={{ __html: post.data.body }}
          />
        </div>

        <div className="col-span-4 hidden md:block">
          {/* <div className="sticky top-8 pl-10">
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
          </div> */}
        </div>
      </article>
    </main>
  );
};

export default BlogPostPage;
