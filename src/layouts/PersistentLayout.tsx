
import { ReactNode, useRef } from "react";
import { useLocation } from "react-router-dom";

export const PersistentLayout = ({ children }: { children: ReactNode }) => {
  return <div className="relative">{children}</div>;
};

export default PersistentLayout;
