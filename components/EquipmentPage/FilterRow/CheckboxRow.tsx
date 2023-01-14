import { useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import Checkbox from "@/components/ui/Checkbox";
import Collapse from "@/components/ui/Collapse";
import Label from "@/components/ui/Label";
import useNextQueryParam from "@/hooks/useNextQueryParam";
import toggleQuery from "@/utils/toggleQuery";
import ChevronDownIcon from "@/public/icons/chevron-down.svg";
import { IFilter } from "@/interfaces";

interface ICheckboxRow {
  filter: IFilter;
  onChange?: (query: Object) => void;
}

const CheckboxRow: React.FC<ICheckboxRow> = (props) => {
  const { filter, onChange: onChangeProp } = props;
  const router = useRouter();
  const queryParam = useNextQueryParam(filter.filterKey);
  const [isCollapsed, setIsCollapsed] = useState(queryParam ? false : true);

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
    const newQuery = {
      ...router.query,
      [key]: toggleQuery(router.query[key], String(id)),
    };

    if (onChangeProp) {
      onChangeProp(newQuery);
    }

    router.push({
      query: newQuery,
    });
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
              <Label
                key={filterOption.filterOptionId}
                control={
                  <Checkbox
                    defaultChecked={isChecked(filterOption.filterOptionId)}
                    onCheckedChange={(e) =>
                      handleOnChange(e, filterOption.filterOptionId)
                    }
                  />
                }
                label={filterOption.filterOprionTitle}
              />
            ))}
          </div>
        </Collapse>
      )}
    </>
  );
};

export default CheckboxRow;
