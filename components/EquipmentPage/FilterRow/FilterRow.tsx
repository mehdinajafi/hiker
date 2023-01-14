import SwitchRow from "./SwitchRow";
import CheckboxRow from "./CheckboxRow";
import { IFilter } from "@/interfaces";

interface IFilterRow extends IFilter {
  onChange?: (query: Object) => void;
}

const FilterRow: React.FC<IFilterRow> = (props) => {
  const { filterType, filterKey, filterTitle, filterOptions, onChange } = props;

  if (filterType === "switch") {
    return (
      <SwitchRow
        filter={{ filterKey, filterTitle, filterOptions, filterType }}
        onChange={onChange}
      />
    );
  }

  return (
    <CheckboxRow
      filter={{ filterKey, filterTitle, filterOptions, filterType }}
      onChange={onChange}
    />
  );
};

export default FilterRow;
