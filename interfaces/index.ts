import { ObjectId } from "mongodb";
import { NextPage as NextJSPage } from "next";

export interface IProduct {
  _id: ObjectId;
  id: number;
  status: "out_of_stock" | "marketable";
  images: {
    main: string;
    optimized: {
      type: string;
      url: string;
    }[];
  };
  title: string;
  description: string;
  rating: {
    count: number;
    rate: number;
  };
  category: ICategory;
  price: number;
  slug: string;
}

export interface ICategory {
  id: number;
  title: string;
}

export interface IPost {
  id: string;
  time: number;
  title: string;
  description: string;
  body: string;
  image: string;
  imageAlt: string;
  slug: string;
  author: {
    id: string;
    name: string;
  };
  headers: { id: string; title: string }[];
}

export interface ICartItem {
  _id: ObjectId;
  items: { productId: ObjectId; quantity: number }[];
}

export type NextPage<P = {}, IP = P> = NextJSPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};
