"use client";

import { useFormStatus } from "react-dom";
import ArrowRightIcon from "@/public/icons/arrow-right.svg";
import Spinner from "../ui/Spinner";

const SubmitButton = () => {
  const formStatus = useFormStatus();

  return (
    <button
      type="submit"
      className="disabled:opacity-50"
      disabled={formStatus.pending}
    >
      {formStatus.pending ? (
        <Spinner />
      ) : (
        <ArrowRightIcon className="h-4 w-4" />
      )}
    </button>
  );
};

export default SubmitButton;
