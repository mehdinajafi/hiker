import { NextPage as NextJSPage } from "next";

export interface IProduct {
  _id: string;
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
  _id: string;
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

export interface ICart {
  _id: string;
  totalQuantity: number;
  totalPrice: number;
  items: ICartItem[];
}

export interface ICartItem {
  _id: string;
  productId: string;
  product: IProduct;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export type NextPage<P = {}, IP = P> = NextJSPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};
