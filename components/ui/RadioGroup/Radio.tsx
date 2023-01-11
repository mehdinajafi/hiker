import * as RadixRadioGroup from "@radix-ui/react-radio-group";
import clsx from "clsx";

interface IItem extends RadixRadioGroup.RadioGroupItemProps {
  children?: React.ReactNode;
}

const Item: React.FC<IItem> = ({ children, ...radixProps }) => {
  return (
    <RadixRadioGroup.Item
      {...radixProps}
      className={clsx(
        "inline-flex h-5 w-5 shrink-0 rounded-full",
        "border-accent-dark",
        "data-[state=unchecked]:border-2",
        "data-[state=checked]:border-[6px]",
        "focus-visible:outline-none",
        "transition-[border-width]",
        radixProps.className
      )}
    >
      {children}
    </RadixRadioGroup.Item>
  );
};

export default Item;
