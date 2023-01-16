import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import Logo from "@/components/Logo";
import TextField from "@/components/ui/TextField";
import Spinner from "@/components/ui/Spinner";
import ArrowRightIcon from "@/public/icons/arrow-right.svg";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
}
interface INewsLetterForm extends HTMLFormElement {
  readonly elements: FormElements;
}

const Footer = () => {
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
    <footer className="bg-black py-10">
      <div className="container grid grid-cols-12 gap-y-10">
        <div className="col-span-full sm:col-span-8 md:col-span-4 lg:col-span-6">
          <div className="[&_a]:border-gray-100 [&_a]:text-gray-100">
            <Logo />
          </div>
          <p className="text-subtitle2 mt-6 max-w-xs text-white sm:pr-4">
            Get out there & discover your next slope, mountain & destination!
          </p>
        </div>

        <div className="col-span-full sm:col-span-4 md:col-span-4 lg:col-span-3">
          <h2 className="heading-xl text-white">QUICK LINKS</h2>
          <ul className="text-subtitle2 mt-6 flex flex-col space-y-4">
            <ListItem herf="/equipment?category=1">Rucksacks & Bags</ListItem>
            <ListItem herf="/equipment?category=2">Kitbag</ListItem>
            <ListItem herf="/equipment?category=3">Stuff Sack</ListItem>
          </ul>
        </div>

        <div className="col-span-full sm:col-span-6 md:col-span-4 lg:col-span-3">
          <h2 className="heading-xl text-white">OUR NEWSLETTER</h2>
          <h3 className="mt-6 text-sm text-white">
            Subscribe to our newsletter
          </h3>
          <div className="mt-4">
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
          </div>
        </div>

        <p className="text-subtitle2 col-span-12 text-center text-gray-500 md:text-start">
          Copyright {new Date().getFullYear()} HIKER.
        </p>
      </div>
    </footer>
  );
};

// -------------------- ListItem -------------------- //
const ListItem: React.FC<{ children: React.ReactNode; herf: string }> = (
  props
) => (
  <li>
    <Link className="text-gray-200 hover:text-gray-400" href={props.herf}>
      {props.children}
    </Link>
  </li>
);

export default Footer;
