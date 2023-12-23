import { NextPage as NextJSPage } from "next";

export interface ISearchParams {
  [x: string]: string | string[] | undefined;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  isOutOfStock: boolean;
}

export interface ICategory {
  id: number;
  name: string;
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
