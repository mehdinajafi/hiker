import Divider from "@/components/ui/Divider";
import SwitchRow from "./SwitchRow";
import CheckboxRow from "./CheckboxRow";

interface IFilters {
  onChange?: () => void;
}

const Filters: React.FC<IFilters> = ({ onChange }) => {
  return (
    <div className="">
      <CheckboxRow
        filter={{
          key: "category",
          title: "Categories",
          options: [
            {
              value: 1,
              title: "Rucksacks & Bags",
            },
            {
              value: 2,
              title: "Kitbag",
            },
            {
              value: 3,
              title: "Stuff Sack",
            },
          ],
        }}
        onChange={onChange}
      />

      <Divider />

      <SwitchRow
        filter={{ key: "inStock", title: "Only available items" }}
        onChange={onChange}
      />
    </div>
  );
};

export default Filters;
