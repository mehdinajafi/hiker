import React, { useState } from "react";
import SingleOTPInput from "./Input";

interface IOTPInput {
  type: "text" | "tel" | "password";
  value: string;
  onChange: (value: string) => void;
  numInputs: number;
  shouldAutoFocus?: boolean;
}

// Keyboard key codes
const BACKSPACE = 8;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const DELETE = 46;
const SPACEBAR = 32;

const OTPInput: React.FC<IOTPInput> = (props) => {
  const {
    type = "tel",
    value,
    onChange: onChangeProp,
    numInputs = 4,
    shouldAutoFocus,
  } = props;

  const [activeInputIndex, setActiveInputIndex] = useState(0);

  const getOtpValue = () => (value ? value.toString().split("") : []);

  const otp = getOtpValue();

  const handleOTPChange = (otp: string[]) => {
    const newValue = otp.join("");
    onChangeProp(newValue);
  };

  const changeAtFocus = (value: string) => {
    const newOtp = getOtpValue();
    newOtp[activeInputIndex] = value[0];
    handleOTPChange(newOtp);
  };

  const isInputValueValid = (value: string) => {
    const isTypeValid =
      type === "tel" ? !isNaN(parseInt(value, 10)) : typeof value === "string";

    return isTypeValid && value.trim().length === 1;
  };

  const focusInput = (index: number) => {
    const activeIndex = Math.max(Math.min(numInputs - 1, index), 0);
    setActiveInputIndex(activeIndex);
  };

  const focusNextInput = () => {
    focusInput(activeInputIndex + 1);
  };

  const focusPrevInput = () => {
    focusInput(activeInputIndex - 1);
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === BACKSPACE || e.key === "Backspace") {
      e.preventDefault();
      changeAtFocus("");
      focusPrevInput();
    } else if (e.keyCode === DELETE || e.key === "Delete") {
      e.preventDefault();
      changeAtFocus("");
    } else if (e.keyCode === LEFT_ARROW || e.key === "ArrowLeft") {
      e.preventDefault();
      focusPrevInput();
    } else if (e.keyCode === RIGHT_ARROW || e.key === "ArrowRight") {
      e.preventDefault();
      focusNextInput();
    } else if (
      e.keyCode === SPACEBAR ||
      e.key === " " ||
      e.key === "Spacebar" ||
      e.key === "Space"
    ) {
      e.preventDefault();
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (isInputValueValid(value)) {
      changeAtFocus(value);
    }
  };

  const handleOnInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      focusNextInput();
    }
  };

  const handleOnFocus = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setActiveInputIndex(index);
    e.target.select();
  };

  const handleOnBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActiveInputIndex(-1);
  };

  return (
    <div className="flex items-center">
      {Array.from({ length: numInputs })
        .fill("")
        .map((_, index) => (
          <SingleOTPInput
            key={index}
            type={type}
            focus={activeInputIndex === index}
            shouldAutoFocus={shouldAutoFocus}
            value={otp[index]}
            onKeyDown={handleOnKeyDown}
            onFocus={(e) => handleOnFocus(e, index)}
            onBlur={handleOnBlur}
            onChange={handleOnChange}
            onInput={handleOnInput}
          />
        ))}
    </div>
  );
};

export default OTPInput;
