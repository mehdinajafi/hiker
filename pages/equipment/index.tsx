import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProductCard from "@/components/ProductCard";
import Filters from "@/components/EquipmentPage/Filters";
import ProductListHeader from "@/components/EquipmentPage/ProductListHeader";
import ProductsNotFound from "@/components/EquipmentPage/ProductsNotFound";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import getProducts from "@/lib/api/products/getProducts";
import { IProduct, NextPage } from "@/interfaces";

interface IEquipmentPage {
  products: IProduct[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const products = await getProducts({
    category: query.category,
    inStock: query.has_selling_stock,
  });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
};

const EquipmentPage: NextPage<IEquipmentPage> = (props) => {
  const { products } = props;
  const [isLargetThanLg] = useMediaQuery("(min-width: 1024px)");

  return (
    <main>
      <Head>
        <title>Equipment - MNTN</title>
      </Head>

      <div className="container mt-14">
        <h2 className="heading-5xl text-white">Equipment</h2>
        <div className="mt-4 text-gray-500">
          <Breadcrumbs>
            <Link href="/" className="text-gray-200">
              Home
            </Link>
            <div>Equipment</div>
          </Breadcrumbs>
        </div>
      </div>

      <div className="container my-16 grid grid-cols-12 gap-y-5 sm:gap-x-5">
        {!isLargetThanLg && (
          <div className="col-span-12 block lg:hidden">
            <ProductListHeader />
          </div>
        )}

        {isLargetThanLg && (
          <div className="col-span-12 lg:col-span-3">
            <div className="h-min rounded-lg border border-gray-600">
              <Filters />
            </div>
          </div>
        )}

        <div className="col-span-12 grid grid-cols-12 gap-y-5 xs:gap-x-5 lg:col-span-9">
          {products.length === 0 ? (
            <div className="col-span-12">
              <ProductsNotFound />
            </div>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="col-span-12 xs:col-span-6 md:col-span-4"
              >
                <ProductCard {...product} />
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default EquipmentPage;
