import { useRouter } from "next/router";
import Switch from "@/components/ui/Switch";
import useNextQueryParam from "@/hooks/useNextQueryParam";
import { IFilter } from "@/interfaces";

interface ISwitchRow {
  filter: IFilter;
  onChange?: (query: Object) => void;
}

const SwitchRow: React.FC<ISwitchRow> = (props) => {
  const { filter, onChange: onChangeProp } = props;
  const router = useRouter();
  const queryParam = useNextQueryParam(filter.filterKey);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = filter.filterKey;

    const newQuery = {
      ...router.query,
      [key]: router.query[key] ? [] : "1",
    };

    router.push({
      query: newQuery,
    });

    if (onChangeProp) {
      onChangeProp(newQuery);
    }
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
        id={filter.filterKey}
        checked={Boolean(queryParam)}
        onCheckedChange={(e) => handleOnChange(e)}
      />
    </div>
  );
};

export default SwitchRow;
