import React, { useState } from "react";
import { createPortal } from "react-dom";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";

interface IPortal {
  children: React.ReactNode;
}

const Portal: React.FC<IPortal> = (props) => {
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    setMountNode(document.body);
  }, []);

  return (
    <React.Fragment>
      {mountNode ? createPortal(props.children, mountNode) : mountNode}
    </React.Fragment>
  );
};

export default Portal;
