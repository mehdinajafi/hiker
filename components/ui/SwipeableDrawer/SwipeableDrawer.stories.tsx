import { Meta } from "@storybook/react";
import { useState } from "react";
import SwipeableDrawer from ".";
import Button from "@/components/ui/Button";

type SwipeableDrawerType = typeof SwipeableDrawer;

const meta: Meta<SwipeableDrawerType> = {
  title: "Design System / Swipeable Drawer",
  component: SwipeableDrawer,
};

export default meta;

export const Default = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open</Button>

      <SwipeableDrawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        bleedingHeight={200}
      >
        <div className="bg-white pb-5 text-gray-800">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque autem
          nam veritatis corrupti enim vero iste. Temporibus dolore odit nihil
          commodi, eligendi autem quos aut sapiente repellat sint officia
          illum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
          autem nam veritatis corrupti enim vero iste. Temporibus dolore odit
          nihil commodi, eligendi autem quos aut sapiente repellat sint officia
          illum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
          autem nam veritatis corrupti enim vero iste. Temporibus dolore odit
          nihil commodi, eligendi autem quos aut sapiente repellat sint officia
          illum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
          autem nam veritatis corrupti enim vero iste. Temporibus dolore odit
          nihil commodi, eligendi autem quos aut sapiente repellat sint officia
          illum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
          autem nam veritatis corrupti enim vero iste. Temporibus dolore odit
          nihil commodi, eligendi autem quos aut sapiente repellat sint officia
          illum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
          autem nam veritatis corrupti enim vero iste. Temporibus dolore odit
          nihil commodi, eligendi autem quos aut sapiente repellat sint officia
          illum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
          autem nam veritatis corrupti enim vero iste. Temporibus dolore odit
          nihil commodi, eligendi autem quos aut sapiente repellat sint officia
          illum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
          autem nam veritatis corrupti enim vero iste. Temporibus dolore odit
          nihil commodi, eligendi autem quos aut sapiente repellat sint officia
          illum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
          autem nam veritatis corrupti enim vero iste. Temporibus dolore odit
          nihil commodi, eligendi autem quos aut sapiente repellat sint officia
          illum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
          autem nam veritatis corrupti enim vero iste. Temporibus dolore odit
          nihil commodi, eligendi autem quos aut sapiente repellat sint officia
          illum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
          autem nam veritatis corrupti enim vero iste. Temporibus dolore odit
          nihil commodi, eligendi autem quos aut sapiente repellat sint officia
          illum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
          autem nam veritatis corrupti enim vero iste. Temporibus dolore odit
          nihil commodi, eligendi autem quos aut sapiente repellat sint officia
          illum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
          autem nam veritatis corrupti enim vero iste. Temporibus dolore odit
          nihil commodi, eligendi autem quos aut sapiente repellat sint officia
          illum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
          autem nam veritatis corrupti enim vero iste. Temporibus dolore odit
          nihil commodi, eligendi autem quos aut sapiente repellat sint officia
          illum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
          autem nam veritatis corrupti enim vero iste. Temporibus dolore odit
          nihil commodi, eligendi autem quos aut sapiente repellat sint officia
          illum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
          autem nam veritatis corrupti enim vero iste. Temporibus dolore odit
          nihil commodi, eligendi autem quos aut sapiente repellat sint officia
          illum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
          autem nam veritatis corrupti enim vero iste. Temporibus dolore odit
          nihil commodi, eligendi autem quos aut sapiente repellat sint officia
          illum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
          autem nam veritatis corrupti enim vero iste. Temporibus dolore odit
          nihil commodi, eligendi autem quos aut sapiente repellat sint officia
          illum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
          autem nam veritatis corrupti enim vero iste. Temporibus dolore odit
          nihil commodi, eligendi autem quos aut sapiente repellat sint officia
          illum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
          autem nam veritatis corrupti enim vero iste. Temporibus dolore odit
          nihil commodi, eligendi autem quos aut sapiente repellat sint officia
          illum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
          autem nam veritatis corrupti enim vero iste. Temporibus dolore odit
          nihil commodi, eligendi autem quos aut sapiente repellat sint officia
          illum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
          autem nam veritatis corrupti enim vero iste. Temporibus dolore odit
          nihil commodi, eligendi autem quos aut sapiente repellat sint officia
          illum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
          autem nam veritatis corrupti enim vero iste. Temporibus dolore odit
          nihil commodi, eligendi autem quos aut sapiente repellat sint officia
          illum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
          autem nam veritatis corrupti enim vero iste. Temporibus dolore odit
          nihil commodi, eligendi autem quos aut sapiente repellat sint officia
          illum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
          autem nam veritatis corrupti enim vero iste. Temporibus dolore odit
          nihil commodi, eligendi autem quos aut sapiente repellat sint officia
          illum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
          autem nam veritatis corrupti enim vero iste. Temporibus dolore odit
          nihil commodi, eligendi autem quos aut sapiente repellat sint officia
          illum.
        </div>
      </SwipeableDrawer>
    </>
  );
};
