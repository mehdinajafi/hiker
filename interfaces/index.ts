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
  subTotalPrice: number;
  shippingCost: number;
  items: ICartItem[];
  information?: ICartInformation;
  shippingId?: number;
  shipment?: IShippingMethod[];
}

export interface ICartItem {
  _id: string;
  productId: string;
  product: IProduct;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface ICartInformation {
  emailOrPhoneNumber: string;
  country: string;
  firstName: string;
  lastName: string;
  address: string;
  address2: string;
  city: string;
  province: string;
  postalCode: string;
}

export interface IShippingMethod {
  _id: number;
  title: string;
  price: number;
  description: string;
}

export type NextPage<P = {}, IP = P> = NextJSPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};
