interface ICheckoutLayout {
  children: React.ReactNode;
  orderSummery: React.ReactNode;
}

const CheckoutLayout: React.FC<ICheckoutLayout> = (props) => {
  return (
    <div className="mt-8 grid grid-cols-12 gap-8">
      <div className="col-span-12 md:col-span-7">{props.children}</div>

      <div className="col-span-12 border-l border-gray-700 pl-8 md:col-span-5">
        {props.orderSummery}
      </div>
    </div>
  );
};

export default CheckoutLayout;
