
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense, useState } from "react";
import { AudioProvider, useAudio } from "./contexts/AudioContext";
import { preloadAssets } from "./utils/preload";
import PersistentView, { PersistentLayout } from "./layouts/PersistentLayout";
import { Skeleton } from "./components/ui/skeleton";

// Lazy load pages for better performance and reduced initial bundle size
const Index = lazy(() => import("./pages/Index"));
const Home = lazy(() => import("./pages/Home"));
const Saranterest = lazy(() => import("./pages/Saranterest"));
const Googolu = lazy(() => import("./pages/Googolu"));
const Saratify = lazy(() => import("./pages/Saratify"));
const Saraprise = lazy(() => import("./pages/Saraprise"));
const NotFound = lazy(() => import("./pages/NotFound"));

/**
 * Create a persistent query client for better caching
 * This helps maintain state between page navigations
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (replacing cacheTime)
      refetchOnWindowFocus: false,
    },
  },
});

/**
 * Loading component for suspense
 * Displays while lazy-loaded components are being fetched
 */
const PageLoader = () => (
  <div className="min-h-screen w-full flex items-center justify-center bg-sara-pixelBg">
    <div className="w-32 h-32">
      <Skeleton className="w-full h-full bg-sara-pixel3/20 animate-pulse-gentle rounded-none" />
    </div>
  </div>
);

/**
 * ScrollToTop component 
 * Ensures page scrolls to top on route changes
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

/**
 * PageTransition component
 * Handles smooth transitions between pages
 */
const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  
  // Apply fade transition on route change
  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, [location.pathname]);
  
  return (
    <div 
      key={location.pathname} 
      className={`page-transition ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ transition: 'opacity 0.3s ease' }}
    >
      {children}
    </div>
  );
};

/**
 * AuthGuard component
 * Protects routes and handles access control
 */
const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const audio = useAudio();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  // Start preloading assets immediately
  useEffect(() => {
    preloadAssets();
  }, []);

  // Check authorization status
  useEffect(() => {
    const hasAccess = localStorage.getItem("saraAccessGranted") === "true";
    setIsAuthorized(hasAccess);
    
    if (!hasAccess && location.pathname !== "/") {
      navigate("/", { replace: true }); // Use replace to prevent back button issues
    }
    
    // Only handle cleanup on unmount
    return () => {
      if (!hasAccess) {
        audio.stopAndReset();
      }
    };
  }, [navigate, location, audio]);

  // Show loading state while checking authorization
  if (isAuthorized === null && location.pathname !== "/") {
    return <PageLoader />;
  }

  return (
    <PageTransition>
      {children}
    </PageTransition>
  );
};

/**
 * Main App component
 * Sets up the application structure and routing
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AudioProvider>
          <BrowserRouter>
            <PersistentLayout>
              <ScrollToTop />
              <AuthGuard>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route
                      path="/home"
                      element={
                        <PersistentView path="/home">
                          <Home />
                        </PersistentView>
                      }
                    />
                    <Route
                      path="/saranterest"
                      element={
                        <PersistentView path="/saranterest">
                          <Saranterest />
                        </PersistentView>
                      }
                    />
                    <Route
                      path="/googolu"
                      element={
                        <PersistentView path="/googolu">
                          <Googolu />
                        </PersistentView>
                      }
                    />
                    <Route
                      path="/saratify"
                      element={
                        <PersistentView path="/saratify">
                          <Saratify />
                        </PersistentView>
                      }
                    />
                    <Route
                      path="/saraprise"
                      element={
                        <PersistentView path="/saraprise">
                          <Saraprise />
                        </PersistentView>
                      }
                    />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </AuthGuard>
            </PersistentLayout>
            <Toaster />
            <Sonner />
          </BrowserRouter>
        </AudioProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
