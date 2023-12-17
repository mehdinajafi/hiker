"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "@/components/ui/Spinner";
import TextField from "@/components/ui/TextField";
import ArrowRightIcon from "@/public/icons/arrow-right.svg";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
}
interface INewsLetterForm extends HTMLFormElement {
  readonly elements: FormElements;
}

const FooterForm = () => {
  const [formIsLoading, setFormIsLoading] = useState(false);

  const handleNewsLetterFormSubmit = async (
    e: React.FormEvent<INewsLetterForm>
  ) => {
    e.preventDefault();
    const form = e.currentTarget;
    let email = form.elements.email.value;

    if (email && email.trim() === "") {
      toast.error("Please enter a valid email address");
    } else {
      setFormIsLoading(true);

      try {
        await fetch("/api/subscribe-to-newsletter", {
          method: "POST",
          body: JSON.stringify({ email }),
        });
        toast.success("Your email has been successfully registered.");
      } catch (error) {
        toast.error("Something went wrong! try again.");
      } finally {
        setFormIsLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleNewsLetterFormSubmit}>
      <TextField
        name="email"
        type="email"
        label="Email"
        className="text-white"
        endAdornment={
          formIsLoading ? (
            <Spinner />
          ) : (
            <button type="submit">
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          )
        }
      />
    </form>
  );
};

export default FooterForm;
