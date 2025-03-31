
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import Index from "./pages/Index";
import Home from "./pages/Home";
import { AudioProvider, useAudio } from "./contexts/AudioContext";
import { preloadAssets } from "./utils/preload";
import PersistentView, { PersistentLayout } from "./layouts/PersistentLayout";
import FloatingPlayer from "./components/FloatingPlayer";

// Lazy load less frequently accessed pages to improve performance
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

// ScrollToTop component to scroll to the top on route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Component to handle page transitions smoothly
const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  return (
    <div key={location.pathname} className="page-transition">
      {children}
    </div>
  );
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
      // Use replace to avoid back button issues
      navigate("/", { replace: true });
    }
    
    // Only handle cleanup on unmount
    return () => {
      if (!hasAccess) {
        audio.stopAndReset();
      }
    };
  }, [navigate, location, audio]);

  return (
    <PageTransition>
      {children}
    </PageTransition>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AudioProvider>
          <BrowserRouter>
            <PersistentLayout>
              <ScrollToTop />
              <AuthGuard>
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
                        <Suspense fallback={<div className="min-h-screen w-full flex items-center justify-center">Loading...</div>}>
                          <Saranterest />
                        </Suspense>
                      </PersistentView>
                    }
                  />
                  <Route
                    path="/googolu"
                    element={
                      <PersistentView path="/googolu">
                        <Suspense fallback={<div className="min-h-screen w-full flex items-center justify-center">Loading...</div>}>
                          <Googolu />
                        </Suspense>
                      </PersistentView>
                    }
                  />
                  <Route
                    path="/saratify"
                    element={
                      <PersistentView path="/saratify">
                        <Suspense fallback={<div className="min-h-screen w-full flex items-center justify-center">Loading...</div>}>
                          <Saratify />
                        </Suspense>
                      </PersistentView>
                    }
                  />
                  <Route
                    path="/saraprise"
                    element={
                      <PersistentView path="/saraprise">
                        <Suspense fallback={<div className="min-h-screen w-full flex items-center justify-center">Loading...</div>}>
                          <Saraprise />
                        </Suspense>
                      </PersistentView>
                    }
                  />
                  <Route path="*" element={
                    <Suspense fallback={<div className="min-h-screen w-full flex items-center justify-center">Loading...</div>}>
                      <NotFound />
                    </Suspense>
                  } />
                </Routes>
              </AuthGuard>
              <FloatingPlayer />
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
