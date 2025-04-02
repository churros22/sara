
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * Interface for each desktop device
 */
interface DesktopDevice {
  id: string;
  name: string;
  icon: string;
  description: string;
  route: string;
  position: string;
}

/**
 * DesktopEnvironment component
 * Renders a skeuomorphic desktop interface with interactive devices
 */
const DesktopEnvironment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [activeDevice, setActiveDevice] = useState<string | null>(null);
  const [isZooming, setIsZooming] = useState(false);
  const [lastVisited, setLastVisited] = useState<Record<string, boolean>>({});

  // Define desktop devices with their positions and routes
  const devices: DesktopDevice[] = [
    {
      id: "monitor",
      name: "Screen Monitor",
      icon: "💻",
      description: "Search anything on Googolu",
      route: "/googolu",
      position: "center-top"
    },
    {
      id: "ipod",
      name: "iPod Classic",
      icon: "🎵",
      description: "Listen to music on Saratify",
      route: "/saratify",
      position: "right"
    },
    {
      id: "phone",
      name: "Smartphone",
      icon: "📱",
      description: "Browse Saranterest",
      route: "/saranterest",
      position: "left"
    },
    {
      id: "gift",
      name: "Gift Box",
      icon: "🎁",
      description: "Open your Saraprise",
      route: "/saraprise",
      position: "bottom"
    }
  ];

  // Load last visited state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("desktopLastVisited");
    if (savedState) {
      setLastVisited(JSON.parse(savedState));
    }
  }, []);

  // Save last visited state to localStorage when it changes
  useEffect(() => {
    if (Object.keys(lastVisited).length > 0) {
      localStorage.setItem("desktopLastVisited", JSON.stringify(lastVisited));
    }
  }, [lastVisited]);

  /**
   * Handle device click
   * Initiates zoom animation and navigates to the device's route
   * @param device The selected device
   */
  const handleDeviceClick = (device: DesktopDevice) => {
    if (isZooming) return; // Prevent multiple clicks during animation
    
    setActiveDevice(device.id);
    setIsZooming(true);
    
    // Show toast notification
    toast({
      title: `Opening ${device.name}`,
      description: device.description,
    });

    // Update last visited state
    setLastVisited(prev => ({
      ...prev,
      [device.id]: true
    }));

    // Navigate after zoom animation completes
    setTimeout(() => {
      navigate(device.route);
      setIsZooming(false);
      setActiveDevice(null);
    }, 800);
  };

  /**
   * Get device styling based on position
   * @param position Position identifier
   * @returns CSS classes for positioning
   */
  const getDeviceStyles = (position: string): string => {
    switch (position) {
      case "center-top":
        return "absolute top-[10%] left-1/2 transform -translate-x-1/2 w-[60%] md:w-[50%] z-20";
      case "right":
        return "absolute top-1/2 right-[5%] transform -translate-y-1/2 w-[25%] md:w-[20%] z-10";
      case "left":
        return "absolute top-1/2 left-[5%] transform -translate-y-1/2 w-[25%] md:w-[20%] z-10";
      case "bottom":
        return "absolute bottom-[10%] left-1/2 transform -translate-x-1/2 w-[20%] md:w-[15%] z-10";
      default:
        return "";
    }
  };

  return (
    <div className="relative w-full h-[80vh] bg-gradient-to-b from-sara-pixel6/30 to-sara-pixel6/10 rounded-xl overflow-hidden border-4 border-sara-pixel3 shadow-2xl">
      {/* Desktop background with subtle texture */}
      <div className="absolute inset-0 bg-[url('/assets/images/desktop-texture.png')] bg-cover opacity-10"></div>
      
      {/* Ambient screen glare effect */}
      <div className="absolute top-0 right-0 w-full h-full bg-white/5 rounded-full filter blur-3xl animate-pulse-gentle pointer-events-none"></div>
      
      {/* Scanline effect for retro feel */}
      <div className="absolute inset-0 bg-scanlines opacity-10 pointer-events-none"></div>

      {/* Desktop devices */}
      {devices.map((device) => (
        <motion.div
          key={device.id}
          className={`${getDeviceStyles(device.position)} cursor-pointer transition-all`}
          whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
          whileTap={{ scale: 0.98 }}
          animate={{
            scale: activeDevice === device.id ? [1, 1.2, 1.5] : 1,
            opacity: activeDevice && activeDevice !== device.id ? [1, 0.5, 0] : 1,
          }}
          transition={{ duration: 0.8 }}
          onClick={() => handleDeviceClick(device)}
        >
          <div className={`device-container ${device.id}-device relative`}>
            {/* Device frame with shadow and reflection */}
            <div className="relative bg-sara-pixelBg rounded-xl overflow-hidden border-4 border-sara-pixel4 shadow-lg">
              {/* Device indicator for previously visited */}
              {lastVisited[device.id] && (
                <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-green-500 animate-pulse z-20"></div>
              )}
              
              {/* Device screen/display */}
              <div className="aspect-video md:aspect-auto p-4 flex flex-col items-center justify-center bg-gradient-to-br from-sara-pixel2/30 via-sara-pixel3/20 to-sara-pixel4/30">
                <span className="text-3xl md:text-5xl mb-2">{device.icon}</span>
                <h3 className="text-sm md:text-base font-press text-sara-pixel5 text-center">{device.name}</h3>
                <p className="text-xs md:text-sm text-sara-pixel4 text-center mt-1 hidden md:block">{device.description}</p>
              </div>
              
              {/* Glass reflection effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Desktop decorative elements */}
      <div className="absolute bottom-4 left-4 text-xs text-sara-pixel4 font-press">
        SaraOS v1.0
      </div>
      
      <div className="absolute bottom-4 right-4 text-xs text-sara-pixel4 font-press">
        {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
};

export default DesktopEnvironment;
