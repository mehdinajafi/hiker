import Divider from "@/components/ui/Divider";
import FilterRow from "@/components/EquipmentPage/FilterRow";
import { IFilter } from "@/interfaces";

interface IFilters {
  filters?: IFilter[];
}

const Filters: React.FC<IFilters> = (props) => {
  const { filters } = props;

  return (
    <div className="">
      <FilterRow
        filterType="checkbox"
        filterTitle="Categories"
        filterKey="category"
        filterOptions={[
          {
            filterOptionId: 1,
            filterOprionTitle: "Rucksacks & Bags",
          },
          {
            filterOptionId: 2,
            filterOprionTitle: "Kitbag",
          },
          {
            filterOptionId: 3,
            filterOprionTitle: "Stuff Sack",
          },
        ]}
      />

      <Divider />

      <FilterRow
        filterType="switch"
        filterTitle="Only available items"
        filterKey="has_selling_stock"
        filterOptions={null}
      />
    </div>
  );
};

export default Filters;
