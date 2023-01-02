import { dbName } from "@/constants";
import { IPost } from "@/interfaces";
import mongoPromise from "@/lib/mongodb";

const getPost = async (slug: string | string[]) => {
  try {
    const db = await mongoPromise.db(dbName);
    const post = await db.collection<IPost>("posts").findOne({ slug });
    return post;
  } catch (error) {
    throw Error(`Something went wrong in getting post: ${error}`);
  }
};

export default getPost;
