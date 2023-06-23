"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Switch from "@/components/ui/Switch";

interface ISwitchRow {
  filter: {
    key: string;
    title: string;
  };
  onChange?: () => void;
}

const SwitchRow: React.FC<ISwitchRow> = (props) => {
  const { filter, onChange } = props;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const handleOnChange = () => {
    const filterKey = filter.key;

    const params = new URLSearchParams(searchParams);
    if (params.has(filterKey)) {
      params.delete(filterKey);
    } else {
      params.set(filterKey, "1");
    }

    router.push(pathname + "?" + params.toString());

    if (onChange) {
      onChange();
    }
  };

  return (
    <div className="flex items-center justify-between py-4">
      <label
        htmlFor={filter.key}
        className="user-select-none grow cursor-pointer text-sm"
      >
        {filter.title}
      </label>

      <Switch
        id={filter.key}
        checked={searchParams.has(filter.key)}
        onCheckedChange={handleOnChange}
      />
    </div>
  );
};

export default SwitchRow;
