import { useEffect, useRef } from "react";
import clsx from "clsx";

interface ISingleOTPInput extends React.HTMLProps<HTMLInputElement> {
  focus: boolean;
  shouldAutoFocus?: boolean;
}

const SingleOTPInput: React.FC<ISingleOTPInput> = (props) => {
  const { focus, shouldAutoFocus, value, ...inputProps } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const mounted = useRef<boolean>(false);

  if (!mounted.current && shouldAutoFocus && focus && inputRef.current) {
    inputRef.current.focus();
  }

  useEffect(() => {
    if (inputRef.current && focus && mounted.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }

    mounted.current = true;
  }, [focus]);

  return (
    <input
      {...inputProps}
      ref={inputRef}
      value={value ? value : ""}
      maxLength={1}
      className={clsx(
        "inline-flex items-center justify-center",
        "m-1 h-10 w-10",
        "text-center",
        "rounded-md border border-gray-300 outline-none"
      )}
    />
  );
};

export default SingleOTPInput;
