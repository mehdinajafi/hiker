import React from "react";
import Head from "next/head";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProductCard from "@/components/ProductCard";
import Filters from "@/components/EquipmentPage/Filters";
import ProductListHeader from "@/components/EquipmentPage/ProductListHeader";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const product = {
  status: "marketable",
  images: {
    main: "/images/products/01.webp",
    optimized: [{ type: "image/webp", url: "/images/products/01.webp" }],
  },
  title: "Tupilak 37+",
  rating: {
    count: 379,
    rate: 93,
  },
  price: 200.0,
  slug: "Tupilak-37+",
};

const EquipmentPage = () => {
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

        <div className="col-span-12 grid grid-cols-12 gap-y-5 sm:gap-x-5 lg:col-span-9">
          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <ProductCard {...product} />
          </div>
          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <ProductCard {...product} />
          </div>
          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <ProductCard {...product} />
          </div>
          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <ProductCard {...product} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default EquipmentPage;
