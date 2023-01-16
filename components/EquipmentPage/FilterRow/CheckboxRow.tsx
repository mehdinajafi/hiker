import { useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import Checkbox from "@/components/ui/Checkbox";
import Collapse from "@/components/ui/Collapse";
import Label from "@/components/ui/Label";
import useNextQueryParam from "@/hooks/useNextQueryParam";
import toggleQuery from "@/utils/toggleQuery";
import { IFilter, IFilterOption } from "@/interfaces";
import ChevronDownIcon from "@/public/icons/chevron-down.svg";

interface ICheckboxRow {
  filter: IFilter;
  onChange?: (query: Object) => void;
}

const CheckboxRow: React.FC<ICheckboxRow> = (props) => {
  const { filter, onChange } = props;
  const queryParam = useNextQueryParam(filter.filterKey);
  const [isCollapsed, setIsCollapsed] = useState(queryParam ? false : true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <button
        onClick={toggleCollapse}
        className="flex w-full items-center justify-between py-4"
      >
        <span className="text-sm">{filter.filterTitle}</span>
        <ChevronDownIcon
          aria-hidden="true"
          className={clsx("transition-transform", !isCollapsed && "rotate-180")}
        />
      </button>

      {filter.filterOptions && (
        <Collapse in={!isCollapsed} appear={false}>
          <div className="flex flex-col space-y-4 pl-4 pt-1 pb-4">
            {filter.filterOptions.map((filterOption) => (
              <FilterCheckbox
                key={filterOption.filterOptionId}
                filterKey={filter.filterKey}
                filterOption={filterOption}
                onChange={onChange}
                queryParam={queryParam}
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
  queryParam: any;
  filterOption: IFilterOption;
  filterKey: string;
  onChange?: (query: Object) => void;
}

const FilterCheckbox: React.FC<IFilterCheckbox> = (props) => {
  const { filterOption, filterKey, queryParam, onChange: onChangeProp } = props;

  const filterOptionId = String(filterOption.filterOptionId);

  const router = useRouter();

  const isChecked = () => {
    if (!queryParam) {
      return false;
    } else {
      if (typeof queryParam === "string") {
        return queryParam === filterOptionId;
      } else {
        return queryParam.includes(filterOptionId);
      }
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = {
      ...router.query,
      [filterKey]: toggleQuery(router.query[filterKey], filterOptionId),
    };

    router.push({
      query: newQuery,
    });

    if (onChangeProp) {
      onChangeProp(newQuery);
    }
  };

  return (
    <Label
      key={filterOption.filterOptionId}
      control={
        <Checkbox checked={isChecked()} onCheckedChange={handleOnChange} />
      }
      label={filterOption.filterOprionTitle}
    />
  );
};

export default CheckboxRow;
