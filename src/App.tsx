
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense, useState } from "react";
import { AudioProvider, useAudio } from "./contexts/AudioContext";
import { preloadAssets } from "./utils/preload";
import PersistentLayout from "./layouts/PersistentLayout";
import { Skeleton } from "./components/ui/skeleton";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Home = lazy(() => import("./pages/Home"));
const Saranterest = lazy(() => import("./pages/Saranterest"));
const Googolu = lazy(() => import("./pages/Googolu"));
const Saratify = lazy(() => import("./pages/Saratify"));
const Saraprise = lazy(() => import("./pages/Saraprise"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Create a persistent query client for better caching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (replacing cacheTime)
      refetchOnWindowFocus: false,
    },
  },
});

// Loading component for suspense
const PageLoader = () => (
  <div className="min-h-screen w-full flex items-center justify-center bg-sara-pixelBg">
    <div className="w-32 h-32">
      <Skeleton className="w-full h-full bg-sara-pixel3/20 animate-pulse-gentle rounded-none" />
    </div>
  </div>
);

// Modified ScrollToTop component that only scrolls on initial page load or specific routes
const ScrollToTop = () => {
  const { pathname } = useLocation();
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    // Only scroll to top on initial page load or when navigating to root
    if (initialLoad || pathname === "/") {
      window.scrollTo(0, 0);
      setInitialLoad(false);
    }
  }, [pathname, initialLoad]);

  return null;
};

// Dedicated loading screen for transition from login to home
const LoadingTransition = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000); // 2 second loading screen
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-sara-pixel6 via-sara-pixelBg to-sara-pixel1">
      <div className="text-center">
        <div className="w-24 h-24 border-4 border-t-transparent border-sara-pixel3 rounded-full animate-spin mx-auto mb-6"></div>
        <p className="text-xl font-press text-sara-pixel5 animate-pulse-gentle">Loading Sara's World...</p>
        <p className="mt-4 text-sm text-sara-pixel4">Preparing your adventure...</p>
      </div>
    </div>
  );
};

// AuthGuard component to protect routes
const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const audio = useAudio();
  const [isLoading, setIsLoading] = useState(false);
  const [showHome, setShowHome] = useState(false);

  // Start preloading assets immediately
  useEffect(() => {
    preloadAssets();
  }, []);

  useEffect(() => {
    const hasAccess = localStorage.getItem("saraAccessGranted") === "true";
    
    // If accessing home from login page, show loading transition
    if (hasAccess && location.pathname === "/home" && !showHome) {
      setIsLoading(true);
      // The loading state will be cleared by the LoadingTransition component
    } else if (!hasAccess && location.pathname !== "/") {
      navigate("/");
    }
    
    // Only handle cleanup on unmount
    return () => {
      if (!hasAccess) {
        audio.stopAndReset();
      }
    };
  }, [navigate, location, audio, showHome]);

  // Handler for when loading transition completes
  const handleLoadingComplete = () => {
    setIsLoading(false);
    setShowHome(true);
  };

  // If we're in the loading state, show the loading screen
  if (isLoading) {
    return <LoadingTransition onComplete={handleLoadingComplete} />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AudioProvider>
          <BrowserRouter>
            <ScrollToTop />
            <AuthGuard>
              <PersistentLayout>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/saranterest" element={<Saranterest />} />
                    <Route path="/googolu" element={<Googolu />} />
                    <Route path="/saratify" element={<Saratify />} />
                    <Route path="/saraprise" element={<Saraprise />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </PersistentLayout>
            </AuthGuard>
            <Toaster />
            <Sonner />
          </BrowserRouter>
        </AudioProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
