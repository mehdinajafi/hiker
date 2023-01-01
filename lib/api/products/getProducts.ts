import mongoPromise from "@/lib/mongodb";
import { IProduct } from "@/interfaces";
import { dbName } from "@/constants";

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

    const client = await mongoPromise;
    const products = await client
      .db(dbName)
      .collection<IProduct>("products")
      .find({ ...filters })
      .toArray();
    return products;
  } catch (error) {
    throw Error(`Something went wrong in getting products: ${error}`);
  }
};

export default getProducts;
