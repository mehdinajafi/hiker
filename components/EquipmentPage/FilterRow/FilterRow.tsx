import React from "react";
import IFilter from "@/components/EquipmentPage/interfaces/Filter";
import SwitchRow from "./SwitchRow";
import CheckboxRow from "./CheckboxRow";

interface IFilterRow extends IFilter {}

const FilterRow: React.FC<IFilterRow> = (props) => {
  const { filterType, filterKey, filterTitle, filterOptions } = props;

  if (filterType === "switch") {
    return (
      <SwitchRow
        filter={{ filterKey, filterTitle, filterOptions, filterType }}
      />
    );
  }

  return (
    <CheckboxRow
      filter={{ filterKey, filterTitle, filterOptions, filterType }}
    />
  );
};

export default FilterRow;
