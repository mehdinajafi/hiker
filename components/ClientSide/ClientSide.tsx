import { useEffect, useState } from "react";

interface IClientSide {
  children: React.ReactNode;
}

const ClientSide: React.FC<IClientSide> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <></>;
  }

  return <>{children}</>;
};

export default ClientSide;
