
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

// Create a persistent query client for better caching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
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
    
    // Stop audio when user logs out
    return () => {
      if (!hasAccess) {
        audio.stopAndReset();
      }
    };
  }, [navigate, location, audio]);

  // Pause music when leaving Saratify page
  useEffect(() => {
    const prevPath = localStorage.getItem("prevPath");
    
    if (prevPath === "/saratify" && location.pathname !== "/saratify") {
      // Just pause when navigating away
      if (audio.isPlaying) {
        audio.setIsPlaying(false);
      }
    }
    
    localStorage.setItem("prevPath", location.pathname);
  }, [location.pathname, audio]);

  return (
    <PageTransition>
      {children}
    </PageTransition>
  );
};

const AppContent = () => {
  return (
    <>
      <ScrollToTop />
      <AuthGuard>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Home />} />
          <Route path="/saranterest" element={<Saranterest />} />
          <Route path="/googolu" element={<Googolu />} />
          <Route path="/saratify" element={<Saratify />} />
          <Route path="/saraprise" element={<Saraprise />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthGuard>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AudioProvider>
          <AppContent />
        </AudioProvider>
        <Toaster />
        <Sonner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
