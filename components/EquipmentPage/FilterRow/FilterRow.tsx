import React from "react";
import SwitchRow from "./SwitchRow";
import CheckboxRow from "./CheckboxRow";
import { IFilter } from "@/interfaces";

const FilterRow: React.FC<IFilter> = (props) => {
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
