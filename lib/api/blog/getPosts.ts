import db from "@/lib/db";
import Post from "@/models/Post";

const getPosts = async () => {
  try {
    await db.connect();
    const posts = await Post.find().select(
      "time title description image imageAlt slug"
    );
    await db.disconnect();
    return posts;
  } catch (error) {
    throw Error(`Something went wrong in getting posts: ${error}`);
  }
};

export default getPosts;
