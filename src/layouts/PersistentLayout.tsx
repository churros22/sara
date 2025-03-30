import { ReactNode, useState } from "react";
import { useLocation } from "react-router-dom";

interface PersistentViewProps {
  path: string;
  children: ReactNode;
}

const PersistentView = ({ path, children }: PersistentViewProps) => {
  const { pathname } = useLocation();
  const [rendered, setRendered] = useState(false);

  if (pathname === path && !rendered) {
    setRendered(true);
  }

  if (!rendered) return null;

  return (
    <div style={{ display: pathname === path ? "block" : "none" }}>
      {children}
    </div>
  );
};

export const PersistentLayout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default PersistentView;
