import Link from "next/link";
import Divider from "@/components/ui/Divider";
import { ICartInformation, IShippingMethod } from "@/interfaces";

interface IInformationTable {
  information: ICartInformation;
  shipment?: IShippingMethod[];
}

const InformationTable: React.FC<IInformationTable> = (props) => {
  const { information, shipment } = props;

  const addComma = (text?: string) => {
    if (!text) return "";
    return ", " + text;
  };

  const shipTo =
    information.address +
    addComma(information.address2) +
    addComma(information.postalCode) +
    addComma(information.city) +
    addComma(information.country);

  return (
    <div role="table" className="rounded-md border border-gray-300 px-4">
      <InformationRow
        label="Contact"
        content={information.emailOrPhoneNumber}
        href="/cart/information"
      />
      <Divider />
      <InformationRow
        label="Ship to"
        content={shipTo}
        href="/cart/information"
      />
      {shipment && (
        <>
          <Divider />
          <InformationRow
            label="Method"
            content={shipment.reduce(
              (acc, cur) => acc + cur.title + " - $" + cur.price,
              ""
            )}
            href="/cart/shipping"
          />
        </>
      )}
    </div>
  );
};

// ------------------ Information Row ------------------ //
interface IInformationRow {
  label: string;
  content: string;
  href: string;
}

const InformationRow: React.FC<IInformationRow> = (props) => {
  const { label, content, href } = props;

  return (
    <div
      role="row"
      className="grid grid-cols-12 grid-rows-[min-content_1fr] py-4 sm:grid-rows-1"
    >
      <div
        role="rowheader"
        className="col-span-6 mb-2 text-sm text-gray-500 sm:col-span-3 sm:mb-0"
      >
        {label}
      </div>

      <div className="col-span-6 text-end text-xs text-primary-dark sm:col-span-2">
        <Link href={href}>Change</Link>
      </div>

      <div
        role="cell"
        className="col-span-full text-sm sm:col-span-7 sm:col-start-4 sm:row-start-1"
      >
        {content}
      </div>
    </div>
  );
};

export default InformationTable;
