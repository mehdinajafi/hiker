import { Suspense } from "react";
import { Metadata } from "next";
import Filters from "@/components/EquipmentPage/Filters";
import ProductListHeader from "@/components/EquipmentPage/ProductListHeader";
import PageHeader from "@/components/PageHeader";
import Products, { ProductsLoading } from "./Products";

interface IEquipmentPage {
  searchParams: {
    category?: string | string[];
    inStock?: string | string[];
  };
}

export const metadata: Metadata = {
  title: "Equipment - HIKER",
};

const EquipmentPage = async ({ searchParams }: IEquipmentPage) => {
  return (
    <main className="container mb-16">
      <PageHeader>
        <PageHeader.Title>Equipment</PageHeader.Title>
        <PageHeader.Breadcrumbs>
          <PageHeader.Link href="/">Home</PageHeader.Link>
          <PageHeader.Link disabled>Equipment</PageHeader.Link>
        </PageHeader.Breadcrumbs>
      </PageHeader>

      <div className="mt-16 grid grid-cols-12 gap-y-5 sm:gap-x-5">
        <div className="col-span-12 lg:col-span-3">
          <div className="block lg:hidden">
            <ProductListHeader />
          </div>
          <div className="hidden h-min lg:block">
            <Filters />
          </div>
        </div>

        <div className="col-span-12 lg:col-span-9">
          <Suspense fallback={<ProductsLoading />}>
            {/* @ts-expect-error Server Component */}
            <Products searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </main>
  );
};

export default EquipmentPage;
