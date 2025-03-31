
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Saranterest from "./pages/Saranterest";
import Googolu from "./pages/Googolu";
import Saratify from "./pages/Saratify";
import Saraprise from "./pages/Saraprise";
import NotFound from "./pages/NotFound";
import { AudioProvider, useAudio } from "./contexts/AudioContext";
import { preloadAssets } from "./utils/preload";
import PersistentView, { PersistentLayout } from "./layouts/PersistentLayout";

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
      navigate("/");
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
