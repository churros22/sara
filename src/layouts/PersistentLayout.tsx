
import { ReactNode, useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Props for the PersistentView component
 */
interface PersistentViewProps {
  path: string;
  children: ReactNode;
}

/**
 * PersistentView Component
 * Maintains component state even when navigating away from the page
 * Prevents unnecessary re-renders and page refreshes
 * 
 * @param {PersistentViewProps} props - Component props
 * @returns {ReactNode | null} - The persistent view or null
 */
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
        
        // Scroll to top when viewing this page
        window.scrollTo(0, 0);
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

  // Don't render anything until we visit this path for the first time
  if (!rendered) return null;

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

/**
 * PersistentLayout Component
 * Wrapper for the entire application that helps manage persistent views
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components
 * @returns {JSX.Element} - The persistent layout container
 */
export const PersistentLayout = ({ children }: { children: ReactNode }) => {
  // Store viewed paths for memory optimization
  const [viewedPaths, setViewedPaths] = useState<string[]>([]);
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Track visited paths for memory management
    if (!viewedPaths.includes(pathname)) {
      setViewedPaths(prev => [...prev, pathname]);
    }
    
    // Prevent browser from scrolling to previous position
    window.scrollTo(0, 0);
  }, [pathname, viewedPaths]);

  return (
    <div className="relative persistent-layout">
      {children}
    </div>
  );
};

export default PersistentView;
