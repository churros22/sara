
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Saranterest from "./pages/Saranterest";
import Googolu from "./pages/Googolu";
import Saratify from "./pages/Saratify";
import Saraprise from "./pages/Saraprise";
import NotFound from "./pages/NotFound";
import DockedPlayer from "./components/DockedPlayer";
import { AudioProvider } from "./hooks/use-audio-context";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
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

// AuthGuard component to protect routes
const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const hasAccess = localStorage.getItem("saraAccessGranted") === "true";
    if (!hasAccess && location.pathname !== "/") {
      navigate("/", { replace: true });
    }
  }, [navigate, location]);

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <AudioProvider>
          <Toaster />
          <Sonner />
          <ScrollToTop />
          <AuthGuard>
            <div className="page-transition">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/home" element={<Home />} />
                <Route path="/saranterest" element={<Saranterest />} />
                <Route path="/googolu" element={<Googolu />} />
                <Route path="/saratify" element={<Saratify />} />
                <Route path="/saraprise" element={<Saraprise />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <DockedPlayer />
          </AuthGuard>
        </AudioProvider>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
