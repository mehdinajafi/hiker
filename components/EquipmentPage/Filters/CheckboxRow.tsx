"use client";

import { useState } from "react";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Checkbox from "@/components/ui/Checkbox";
import Collapse from "@/components/ui/Collapse";
import Label from "@/components/ui/Label";
import ChevronDownIcon from "@/public/icons/chevron-down.svg";

interface IFilterOption {
  title: string;
  value: number;
}

interface IFilter {
  key: string;
  title: string;
  options: IFilterOption[];
}

interface ICheckboxRow {
  filter: IFilter;
  onChange?: () => void;
}

const CheckboxRow: React.FC<ICheckboxRow> = (props) => {
  const { filter, onChange } = props;

  const searchParams = useSearchParams()!;
  const [isCollapsed, setIsCollapsed] = useState(
    !Boolean(searchParams.get(filter.key))
  );

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <button
        onClick={toggleCollapse}
        className="flex w-full items-center justify-between py-4"
      >
        <span className="text-sm">{filter.title}</span>
        <ChevronDownIcon
          aria-hidden="true"
          className={clsx("transition-transform", !isCollapsed && "rotate-180")}
        />
      </button>

      {filter.options && (
        <Collapse in={!isCollapsed} appear={false}>
          <div className="flex flex-col space-y-4 pl-4 pt-1 pb-4">
            {filter.options.map((filterOption) => (
              <FilterCheckbox
                key={filterOption.value}
                filterKey={filter.key}
                filterOption={filterOption}
                onChange={onChange}
              />
            ))}
          </div>
        </Collapse>
      )}
    </>
  );
};

// --------------------- Single Checkbox --------------------- //
interface IFilterCheckbox {
  filterOption: IFilterOption;
  filterKey: string;
  onChange?: () => void;
}

const FilterCheckbox: React.FC<IFilterCheckbox> = (props) => {
  const { filterKey, filterOption, onChange } = props;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const filterValueStr = filterOption.value.toString();
  const isChecked = searchParams.getAll(filterKey).includes(filterValueStr);

  const handleOnChange = () => {
    const params = new URLSearchParams(searchParams);

    const filters = params.getAll(filterKey);

    const filterIndex = filters.findIndex(
      (filter) => filter === filterValueStr
    );

    if (filterIndex >= 0) {
      filters.splice(filterIndex, 1);
    } else {
      filters.push(filterValueStr);
    }

    params.delete(filterKey);

    filters.forEach((filter) => {
      params.append(filterKey, filter);
    });

    router.push(pathname + "?" + params.toString());

    if (onChange) {
      onChange();
    }
  };

  return (
    <Label
      control={
        <Checkbox checked={isChecked} onCheckedChange={handleOnChange} />
      }
      label={filterOption.title}
    />
  );
};

export default CheckboxRow;
