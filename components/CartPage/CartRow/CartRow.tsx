import clsx from "clsx";

interface ICartRow {
  head?: boolean;
  className?: string;
  children: React.ReactNode;
}

const CartRow: React.FC<ICartRow> = ({ children, head, className }) => {
  return (
    <div
      className={clsx(
        "grid-cols-4 grid-rows-2",
        "sm:grid-cols-[2fr_1fr_5rem_1fr_2.5rem] sm:grid-rows-1",
        "border-b pb-4 text-base",
        {
          "hidden border-gray-500 font-bold sm:grid": head,
          "mt-4 grid border-gray-300": !head,
        },
        className
      )}
    >
      {children}
    </div>
  );
};

export default CartRow;
