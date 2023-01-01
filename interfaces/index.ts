import { NextPage as NextJSPage } from "next";

export interface IProduct {
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

export type NextPage<P = {}, IP = P> = NextJSPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};
