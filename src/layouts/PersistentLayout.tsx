
import { ReactNode, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// Store scroll positions for each route
const scrollPositions = new Map<string, number>();

export const PersistentLayout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Save scroll position when leaving a route
  useEffect(() => {
    return () => {
      if (contentRef.current) {
        scrollPositions.set(pathname, window.scrollY);
      }
    };
  }, [pathname]);

  // Restore scroll position when entering a route
  useEffect(() => {
    const savedPosition = scrollPositions.get(pathname);
    if (savedPosition !== undefined) {
      setTimeout(() => {
        window.scrollTo(0, savedPosition);
      }, 0);
    }
  }, [pathname]);

  return <div ref={contentRef} className="relative">{children}</div>;
};

export default PersistentLayout;
