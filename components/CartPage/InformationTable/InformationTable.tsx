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
    <div role="table" className="rounded-md border border-gray-500 px-4">
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
    <div role="row" className="flex items-center py-4">
      <div className="flex grow items-center text-sm">
        <div role="rowheader" className="basis-28 text-gray-400">
          {label}
        </div>
        <div role="cell">{content}</div>
      </div>

      <div className="ml-2 text-xs text-accent-dark">
        <Link href={href}>Change</Link>
      </div>
    </div>
  );
};

export default InformationTable;
