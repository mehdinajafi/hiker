import React, { useEffect, useRef } from "react";
import Fade from "@/components/ui/Fade";

interface IBackdrop {
  open: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

const Backdrop: React.FC<IBackdrop> = (props) => {
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
  }, []);

  return (
    <Fade
      in={props.open}
      appear={mounted.current}
      onClick={props.onClick}
      className="backdrop fixed inset-0 bg-[rgb(0,0,0,50%)]"
      aria-hidden="true"
    >
      {props.children}
    </Fade>
  );
};

export default Backdrop;
