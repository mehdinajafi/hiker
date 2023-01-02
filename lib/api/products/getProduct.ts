import { dbName } from "@/constants";
import { IProduct } from "@/interfaces";
import mongoPromise from "@/lib/mongodb";

const getProduct = async (slug: string | string[]) => {
  try {
    const db = await mongoPromise.db(dbName);
    const product = await db.collection<IProduct>("products").findOne({ slug });
    return product;
  } catch (error) {
    throw Error(`Something went wrong in getting product: ${error}`);
  }
};

export default getProduct;
