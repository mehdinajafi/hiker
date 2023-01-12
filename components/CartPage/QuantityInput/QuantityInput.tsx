import clsx from "clsx";
import Spinner from "@/components/ui/Spinner/Spinner";

interface IQuantityInput {
  /**
   * If `true` show loading instead of value.
   */
  loading: boolean;
  /**
   * Value of Input.
   */
  value: number;
  /**
   * Callback called when value is changed.
   * @param value
   * @returns void
   */
  onChange: (value: number) => void;
  /**
   * Maximum value of input. When `value` reaches `max` increament button will be disabled.
   */
  max?: number;
}

const QuantityInput: React.FC<IQuantityInput> = (props) => {
  const { loading, value, onChange, max } = props;

  const handleIncreament = () => {
    onChange(value + 1);
  };

  const handleDecrease = () => {
    onChange(value - 1);
  };

  return (
    <div
      className={clsx(
        "flex w-20 items-center justify-between",
        "rounded-md border border-gray-300"
      )}
    >
      <button
        disabled={value === 1 || loading}
        onClick={handleDecrease}
        className="px-2 py-1 disabled:text-gray-500"
      >
        -
      </button>

      <div className="text-sm">
        {loading ? <Spinner /> : <span>{value}</span>}
      </div>

      <button
        disabled={max === value || loading}
        onClick={handleIncreament}
        className="px-2 py-1 disabled:text-gray-500"
      >
        +
      </button>
    </div>
  );
};

export default QuantityInput;
