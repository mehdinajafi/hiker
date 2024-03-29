"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import FunnelIcon from "@/public/icons/funnel.svg";
import Drawer from "@/components/ui/Drawer";
import Filters from "../Filters";
import XIcon from "@/public/icons/x.svg";

const ProductListHeader: React.FC = () => {
  const [isFilterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const handleFilterDrawerOpen = () => {
    setFilterDrawerOpen(true);
  };

  const handleFilterDrawerClose = () => {
    setFilterDrawerOpen(false);
  };

  const handleChangeFilters = () => {
    handleFilterDrawerClose();
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
          <div className="flex items-center justify-between border-b border-gray-300 p-4">
            <h3 className="heading-xl">Filters</h3>
            <Button
              variant="text"
              color="gray"
              onClick={handleFilterDrawerClose}
            >
              <XIcon width={24} height={24} />
            </Button>
          </div>

          <div className="px-4">
            <Filters onChange={handleChangeFilters} />
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default ProductListHeader;
