
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { AudioProvider, useAudio } from "./contexts/AudioContext";
import { preloadAssets } from "./utils/preload";
import PersistentView, { PersistentLayout } from "./layouts/PersistentLayout";
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

// ScrollToTop component to scroll to the top on route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// AuthGuard component to protect routes
const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const audio = useAudio();

  // Start preloading assets immediately
  useEffect(() => {
    preloadAssets();
  }, []);

  useEffect(() => {
    const hasAccess = localStorage.getItem("saraAccessGranted") === "true";
    if (!hasAccess && location.pathname !== "/") {
      navigate("/");
    }
    
    // Only handle cleanup on unmount
    return () => {
      if (!hasAccess) {
        audio.stopAndReset();
      }
    };
  }, [navigate, location, audio]);

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
