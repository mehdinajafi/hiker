import db from "@/lib/db";
import Product from "@/models/Product";

const getProduct = async (slug: string | string[]) => {
  try {
    await db.connect();
    const product = await Product.findOne({ slug });
    await db.disconnect();
    return product;
  } catch (error) {
    throw Error(`Something went wrong in getting product: ${error}`);
  }
};

export default getProduct;
