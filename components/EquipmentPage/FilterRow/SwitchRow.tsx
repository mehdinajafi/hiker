import React from "react";
import { useRouter } from "next/router";
import Switch from "@/components/ui/Switch";
import useNextQueryParam from "@/hooks/useNextQueryParam";
import { IFilter } from "@/interfaces";

interface ISwitchRow {
  filter: IFilter;
}

const SwitchRow: React.FC<ISwitchRow> = (props) => {
  const { filter } = props;
  const router = useRouter();
  const queryParam = useNextQueryParam(filter.filterKey);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = filter.filterKey;

    router.push({
      query: {
        ...router.query,
        [key]: router.query[key] ? [] : "1",
      },
    });
  };

  return (
    <div className="flex items-center justify-between py-4">
      <label
        htmlFor={filter.filterKey}
        className="user-select-none grow cursor-pointer text-sm"
      >
        {filter.filterTitle}
      </label>

      <Switch
        defaultChecked={Boolean(queryParam)}
        id={filter.filterKey}
        onCheckedChange={(e) => handleOnChange(e)}
      />
    </div>
  );
};

export default SwitchRow;
