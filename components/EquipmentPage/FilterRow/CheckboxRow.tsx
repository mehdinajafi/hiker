import React, { useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import Checkbox from "@/components/ui/Checkbox";
import Collapse from "@/components/ui/Collapse";
import useNextQueryParam from "@/hooks/useNextQueryParam";
import toggleQuery from "@/utils/toggleQuery";
import IFilter from "../interfaces/Filter";
import ChevronDownIcon from "@/public/icons/chevron-down.svg";

interface ICheckboxRow {
  filter: IFilter;
}

const CheckboxRow: React.FC<ICheckboxRow> = (props) => {
  const { filter } = props;
  const router = useRouter();
  const queryParam = useNextQueryParam(filter.filterKey);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const isChecked = (id: string | number) => {
    const idStr = String(id);
    if (!queryParam) {
      return;
    } else {
      if (typeof queryParam === "string") {
        return queryParam === idStr;
      } else {
        return queryParam.includes(idStr);
      }
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string | number
  ) => {
    const key = filter.filterKey;

    router.push({
      query: {
        ...router.query,
        [key]: toggleQuery(router.query[key], String(id)),
      },
    });
  };

  return (
    <>
      <button
        onClick={toggleCollapse}
        className="flex w-full items-center justify-between py-4 text-white"
      >
        <span className="text-sutitle2">{filter.filterTitle}</span>
        <ChevronDownIcon
          aria-hidden="true"
          className={clsx("transition-transform", !isCollapsed && "rotate-180")}
        />
      </button>

      <Collapse in={!isCollapsed}>
        <div className="flex flex-col space-y-4 pb-4">
          {filter.filterOptions &&
            filter.filterOptions.map((filterOption) => (
              <div
                key={filterOption.filterOptionId}
                className="flex items-center space-x-2"
              >
                <Checkbox
                  defaultChecked={isChecked(filterOption.filterOptionId)}
                  id={String(filterOption.filterOptionId)}
                  onCheckedChange={(e) =>
                    handleOnChange(e, filterOption.filterOptionId)
                  }
                />
                <label
                  htmlFor={String(filterOption.filterOptionId)}
                  className="user-select-none text-white"
                >
                  {filterOption.filterOprionTitle}
                </label>
              </div>
            ))}
        </div>
      </Collapse>
    </>
  );
};

export default CheckboxRow;
