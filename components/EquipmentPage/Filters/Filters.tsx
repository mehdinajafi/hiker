import Divider from "@/components/ui/Divider";
import FilterRow from "@/components/EquipmentPage/FilterRow";
import IFilter from "@/components/EquipmentPage/interfaces/Filter";

interface IActiveFilters {
  [key: IFilter["filterKey"]]: string;
}

interface IFilters {
  filters?: IFilter[];
}

const Filters: React.FC<IFilters> = (props) => {
  const { filters } = props;

  return (
    <>
      <h3 className="heading-xl pl-4 pt-5 text-white">Filters</h3>
      <div className="px-4 py-4">
        <FilterRow
          filterType="checkbox"
          filterTitle="Categories"
          filterKey="category"
          filterOptions={[
            {
              filterOptionId: 1,
              filterOprionTitle: "Sleeping Bags",
            },
            {
              filterOptionId: 2,
              filterOprionTitle: "Rucksacks & Bags",
            },
            {
              filterOptionId: 3,
              filterOprionTitle: "Sleeping Bags",
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
    </>
  );
};

export default Filters;
