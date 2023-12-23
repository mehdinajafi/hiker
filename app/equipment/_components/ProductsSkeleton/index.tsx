const ProductsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="skeleton h-[9.375rem] rounded-md md:h-[18.75rem]"
        />
      ))}
    </div>
  );
};

export default ProductsSkeleton;
