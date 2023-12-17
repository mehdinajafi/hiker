import { ProductsLoading } from "./Products";

const Loading = () => {
  return (
    <div className="container mt-8 mb-16">
      <div className="skeleton h-8 w-52" />
      <div className="skeleton mt-4 h-8 w-96" />

      <div className="mt-16 grid grid-cols-12">
        <div className="col-span-12 lg:col-span-3">
          <div className="skeleton h-5 w-40" />
        </div>
        <div className="col-span-12 lg:col-span-9">
          <ProductsLoading />
        </div>
      </div>
    </div>
  );
};

export default Loading;
