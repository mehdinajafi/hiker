const Loading = () => {
  return (
    <div className="container mb-16 mt-5 grid grid-cols-3 gap-10 md:my-32">
      <div className="col-span-3 md:col-span-1">
        <div className="skeleton h-8 w-28" />

        <div className="skeleton mt-5 h-6 w-20" />

        <div className="skeleton mt-4 h-8 w-full" />
        <div className="skeleton mt-2 h-8 w-full" />
        <div className="skeleton mt-2 h-8 w-full" />
      </div>

      <div className="col-span-3 md:col-span-2">
        <div className="skeleton aspect-square w-full rounded-md" />
      </div>
    </div>
  );
};

export default Loading;
