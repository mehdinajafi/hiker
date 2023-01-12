import Link from "next/link";
import Logo from "@/components/Logo";
import TextField from "@/components/ui/TextField";

const Footer = () => {
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
            <TextField label="Email" className="text-white" />
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
