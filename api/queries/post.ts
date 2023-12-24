import backend from "@/backend";
import { IPost } from "@/interfaces";

export const getPost = async ({ slug }: { slug: string }) => {
  const postRes = await backend(`/api/posts/${slug}`, {
    next: {
      revalidate: 60 * 60,
      tags: ["post", slug],
    },
  });
  const post = await postRes.json();

  return post as { data: IPost };
};

export const getPosts = async () => {
  const postsRes = await backend("/api/posts", {
    next: {
      revalidate: 60 * 60,
      tags: ["posts"],
    },
  });
  const posts = await postsRes.json();
  return posts as { data: IPost[] };
};
