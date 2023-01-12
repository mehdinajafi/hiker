import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import PageHeader from "@/components/PageHeader";
import ProductCard from "@/components/ProductCard";
import Filters from "@/components/EquipmentPage/Filters";
import ProductListHeader from "@/components/EquipmentPage/ProductListHeader";
import ProductsNotFound from "@/components/EquipmentPage/ProductsNotFound";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import getProducts from "@/lib/api/products/getProducts";
import { IProduct, NextPage } from "@/interfaces";
import clsx from "clsx";

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
    <>
      <Head>
        <title>Equipment - MNTN</title>
      </Head>

      <main className="container mb-16">
        <PageHeader>
          <PageHeader.Title>Equipment</PageHeader.Title>
          <PageHeader.Breadcrumbs>
            <PageHeader.Link href="/">Home</PageHeader.Link>
            <PageHeader.Link disabled>Equipment</PageHeader.Link>
          </PageHeader.Breadcrumbs>
        </PageHeader>

        <div className="mt-16 grid grid-cols-12 gap-y-5 sm:gap-x-5">
          {!isLargetThanLg && (
            <div className="col-span-12 block lg:hidden">
              <ProductListHeader />
            </div>
          )}

          {isLargetThanLg && (
            <div className="col-span-12 lg:col-span-3">
              <div className="h-min">
                <Filters />
              </div>
            </div>
          )}

          {products.length === 0 ? (
            <div className="col-span-12">
              <ProductsNotFound />
            </div>
          ) : (
            <div className="col-span-12 grid grid-cols-12 gap-4 border-gray-800 lg:col-span-9">
              {products.map((product) => (
                <div
                  key={product._id}
                  className={clsx(
                    "col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-3"
                  )}
                >
                  <ProductCard {...product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default EquipmentPage;
