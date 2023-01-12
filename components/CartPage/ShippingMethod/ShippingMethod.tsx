import Label from "@/components/ui/Label";
import RadioGroup from "@/components/ui/RadioGroup";
import { IShippingMethod } from "@/interfaces";

interface ICShippingMethod {
  method: IShippingMethod;
}

const ShippingMethod: React.FC<ICShippingMethod> = (props) => {
  const { _id, title, description, price } = props.method;

  return (
    <div className="flex border-b border-gray-300 last-of-type:border-0">
      <Label
        control={<RadioGroup.Radio value={_id.toString()} />}
        label={
          <span className="flex">
            <span className="flex grow flex-col">
              <span className="text-sm">{title}</span>
              <span className="mt-1 text-xs text-gray-500">{description}</span>
            </span>
            <span className="text-sm font-semibold">${price}</span>
          </span>
        }
        className="grow p-4"
      />
    </div>
  );
};

export default ShippingMethod;
