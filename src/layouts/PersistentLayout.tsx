import { ReactNode, useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

interface PersistentViewProps {
  path: string;
  children: ReactNode;
}

const PersistentView = ({ path, children }: PersistentViewProps) => {
  const { pathname } = useLocation();
  const [rendered, setRendered] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set rendered to true only once when we first visit this path
    if (pathname === path && !rendered) {
      setRendered(true);
    }

    // Optimize DOM when switching between routes
    if (contentRef.current) {
      if (pathname === path) {
        // When this view is active, ensure it's visible and fully accessible
        contentRef.current.style.display = "block";
        contentRef.current.style.height = "auto";
        contentRef.current.style.overflow = "visible";
        contentRef.current.style.opacity = "1";
        contentRef.current.style.pointerEvents = "all";
      } else {
        // When not active, hide it but keep in DOM
        contentRef.current.style.display = "none";
        contentRef.current.style.height = "0";
        contentRef.current.style.overflow = "hidden";
        contentRef.current.style.opacity = "0";
        contentRef.current.style.pointerEvents = "none";
      }
    }
  }, [pathname, path, rendered]);

  if (!rendered) return null;

  // Use visibility style instead of removing from DOM
  return (
    <div 
      ref={contentRef}
      style={{ 
        display: pathname === path ? "block" : "none",
        height: pathname === path ? "auto" : "0",
        overflow: pathname === path ? "visible" : "hidden",
        opacity: pathname === path ? "1" : "0",
        pointerEvents: pathname === path ? "all" : "none",
        transition: "opacity 0.2s ease-out"
      }}
      data-path={path}
      className="persistent-view"
    >
      {children}
    </div>
  );
};

export const PersistentLayout = ({ children }: { children: ReactNode }) => {
  // Store viewed paths for memory optimization
  const [viewedPaths, setViewedPaths] = useState<string[]>([]);
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Track visited paths for memory management
    if (!viewedPaths.includes(pathname)) {
      setViewedPaths(prev => [...prev, pathname]);
    }
  }, [pathname, viewedPaths]);

  return (
    <div className="relative persistent-layout">
      {children}
    </div>
  );
};

export default PersistentView;
