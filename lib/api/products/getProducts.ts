import db from "@/lib/db";
import Product from "@/models/Product";
import { IProduct } from "@/interfaces";

interface IOptions {
  category?: string | string[];
  inStock?: string | string[];
}

interface IFilter {
  "category.id"?: {
    $in: number | number[];
  };
  status?: IProduct["status"];
}

const getProducts = async (options: IOptions) => {
  try {
    let filters: IFilter = {};

    if (options.category) {
      filters["category.id"] = {
        $in:
          typeof options.category === "string"
            ? [Number(options.category)]
            : options.category.map((id) => Number(id)),
      };
    }

    if (options.inStock && options.inStock === "1") {
      filters.status = "marketable";
    }

    await db.connect();
    const products = await Product.find({ ...filters });
    await db.disconnect();

    return products;
  } catch (error) {
    throw Error(`Something went wrong in getting products: ${error}`);
  }
};

export default getProducts;
