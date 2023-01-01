import mongoPromise from "@/lib/mongodb";
import { dbName } from "@/constants";
import { IPost } from "@/interfaces";

const getPosts = async () => {
  try {
    const db = await mongoPromise.db(dbName);
    const posts = await db
      .collection<IPost[]>("posts")
      .find(
        {},
        {
          projection: {
            time: 1,
            title: 1,
            description: 1,
            image: 1,
            imageAlt: 1,
            slug: 1,
          },
        }
      )
      .toArray();
    return posts;
  } catch (error) {
    throw Error(`Something went wrong in getting posts: ${error}`);
  }
};

export default getPosts;
