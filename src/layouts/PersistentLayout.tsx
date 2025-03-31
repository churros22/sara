
import { ReactNode, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface PersistentViewProps {
  path: string;
  children: ReactNode;
}

const PersistentView = ({ path, children }: PersistentViewProps) => {
  const { pathname } = useLocation();
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    // Set rendered to true only once when we first visit this path
    if (pathname === path && !rendered) {
      setRendered(true);
    }
  }, [pathname, path, rendered]);

  if (!rendered) return null;

  // Use visibility style instead of removing from DOM
  return (
    <div style={{ 
      display: pathname === path ? "block" : "none",
      height: pathname === path ? "auto" : "0",
      overflow: pathname === path ? "visible" : "hidden"
    }}>
      {children}
    </div>
  );
};

export const PersistentLayout = ({ children }: { children: ReactNode }) => {
  return <div className="relative">{children}</div>;
};

export default PersistentView;
