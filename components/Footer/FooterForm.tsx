"use client";

import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import TextField from "@/components/ui/TextField";
import { subscribeToNewsletter } from "@/api/actions/subscribeToNewsletter";
import SubmitButton from "./SubmitButton";

const FooterForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(subscribeToNewsletter, null);
  const formStatus = state?.status;
  const formToast = state?.toast;

  // useEffect(() => {
  //   if (formRef.current && formStatus === "success") {
  //     formRef.current?.reset();
  //   }
  // }, [formStatus]);

  useEffect(() => {
    if (formStatus === "success") {
      toast(formToast?.title);
    } else {
      toast.error(formToast?.title);
    }
  }, [formToast?.id, formToast?.title, formStatus]);

  return (
    <form ref={formRef} action={formAction}>
      <TextField
        name="email"
        label="Email"
        className="text-white"
        endAdornment={<SubmitButton />}
      />
    </form>
  );
};

export default FooterForm;
