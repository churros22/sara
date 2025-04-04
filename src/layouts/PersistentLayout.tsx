
import { ReactNode, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// Store scroll positions for each route
const scrollPositions = new Map<string, number>();

export const PersistentLayout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Save scroll position when leaving a route
  useEffect(() => {
    const saveScroll = () => {
      scrollPositions.set(pathname, window.scrollY);
    };

    // Save position both on unmount and when scrolling
    window.addEventListener('scroll', saveScroll, { passive: true });
    
    return () => {
      saveScroll();
      window.removeEventListener('scroll', saveScroll);
    };
  }, [pathname]);

  // Restore scroll position when entering a route
  useEffect(() => {
    const savedPosition = scrollPositions.get(pathname);
    if (savedPosition !== undefined) {
      // Use requestAnimationFrame for smoother behavior and try multiple times
      // to ensure the restoration happens after all content is rendered
      let attempts = 0;
      const maxAttempts = 5;
      
      const tryScrollRestore = () => {
        window.scrollTo(0, savedPosition);
        attempts++;
        
        if (window.scrollY !== savedPosition && attempts < maxAttempts) {
          requestAnimationFrame(tryScrollRestore);
        }
      };
      
      requestAnimationFrame(tryScrollRestore);
    }
  }, [pathname]);

  return <div ref={contentRef} className="relative">{children}</div>;
};

export default PersistentLayout;
