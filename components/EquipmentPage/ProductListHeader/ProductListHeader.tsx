import { useState } from "react";
import Button from "@/components/ui/Button";
import FunnelIcon from "@/public/icons/funnel.svg";
import Drawer from "@/components/ui/Drawer";
import Filters from "../Filters";
import { IFilter } from "@/interfaces";
import XIcon from "@/public/icons/x.svg";

interface IProductListHeader {
  filters?: IFilter[];
}

const ProductListHeader: React.FC<IProductListHeader> = (props) => {
  const { filters } = props;

  const [isFilterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const handleFilterDrawerOpen = () => {
    setFilterDrawerOpen(true);
  };

  const handleFilterDrawerClose = () => {
    setFilterDrawerOpen(false);
  };

  return (
    <div>
      <Button
        color="gray"
        startIcon={<FunnelIcon />}
        onClick={handleFilterDrawerOpen}
      >
        Filters
      </Button>

      <Drawer
        open={isFilterDrawerOpen}
        onClose={handleFilterDrawerClose}
        hide="lg"
      >
        <div className="h-full w-72 bg-background">
          <div className="flex items-center justify-between border-b border-gray-500 p-4">
            <h3 className="text-lg font-bold">Filters</h3>
            <Button
              variant="text"
              color="gray"
              onClick={handleFilterDrawerClose}
            >
              <XIcon width={24} height={24} />
            </Button>
          </div>

          <div className="px-4">
            <Filters filters={filters} />
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default ProductListHeader;
