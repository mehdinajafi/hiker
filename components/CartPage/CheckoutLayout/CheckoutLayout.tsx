import clsx from "clsx";

interface ICheckoutLayout {
  children: React.ReactNode;
  orderSummery: React.ReactNode;
}

const CheckoutLayout: React.FC<ICheckoutLayout> = (props) => {
  return (
    <div className="mt-8 grid grid-cols-12 gap-y-8 md:gap-8">
      <div className="col-span-12 md:col-span-7">{props.children}</div>

      <div
        className={clsx(
          "col-span-12 row-start-1",
          "md:col-span-5 md:row-auto md:border-l md:border-gray-300 md:pl-8"
        )}
      >
        {props.orderSummery}
      </div>
    </div>
  );
};

export default CheckoutLayout;
