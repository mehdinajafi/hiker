import backend from "@/backend";
import { IPost } from "@/interfaces";

export const getPost = async ({ slug }: { slug: string }) => {
  const postRes = await backend(`/api/posts/${slug}`, {
    next: {
      revalidate: 60 * 60,
    },
  });
  const post: IPost = await postRes.json();

  return post;
};

export const getPosts = async () => {
  const postsRes = await backend("/api/posts", {
    next: {
      revalidate: 60 * 60,
    },
  });
  const posts: IPost[] = await postsRes.json();
  return posts;
};
