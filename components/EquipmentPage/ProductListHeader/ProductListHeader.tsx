import { useState } from "react";
import Button from "@/components/ui/Button";
import IFilter from "../interfaces/Filter";
import FunnelIcon from "@/public/icons/funnel.svg";
import Drawer from "@/components/ui/Drawer";
import Filters from "../Filters";

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
        <div className="h-full bg-background">
          <Filters filters={filters} />
        </div>
      </Drawer>
    </div>
  );
};

export default ProductListHeader;
