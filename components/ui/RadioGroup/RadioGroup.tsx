import * as RadixRadioGroup from "@radix-ui/react-radio-group";

interface IRadioGroup extends RadixRadioGroup.RadioGroupProps {
  children: React.ReactNode;
}

const RadioGroup: React.FC<IRadioGroup> = ({ children, ...rootProps }) => {
  return <RadixRadioGroup.Root {...rootProps}>{children}</RadixRadioGroup.Root>;
};

export default RadioGroup;
