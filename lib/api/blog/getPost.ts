import db from "@/lib/db";
import Post from "@/models/Post";

const getPost = async (slug: string | string[]) => {
  try {
    await db.connect();
    const post = await Post.findOne({ slug });
    await db.disconnect();
    return post;
  } catch (error) {
    throw Error(`Something went wrong in getting post: ${error}`);
  }
};

export default getPost;
