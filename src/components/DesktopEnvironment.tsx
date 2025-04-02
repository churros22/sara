
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useTransform } from "framer-motion";
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
  rotation: { x: number; y: number; z: number };
}

/**
 * DesktopEnvironment component
 * Renders a 3D immersive desktop interface with interactive devices
 * that zoom and transform in 3D space
 */
const DesktopEnvironment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [activeDevice, setActiveDevice] = useState<string | null>(null);
  const [isZooming, setIsZooming] = useState(false);
  const [lastVisited, setLastVisited] = useState<Record<string, boolean>>({});
  const desktopRef = useRef<HTMLDivElement>(null);
  
  // Motion values for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Transform desktop based on mouse position for subtle 3D effect
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  // Define desktop devices with their positions, routes and 3D rotations
  const devices: DesktopDevice[] = [
    {
      id: "monitor",
      name: "Screen Monitor",
      icon: "💻",
      description: "Search anything on Googolu",
      route: "/googolu",
      position: "center-top",
      rotation: { x: -10, y: 0, z: 0 }
    },
    {
      id: "ipod",
      name: "iPod Classic",
      icon: "🎵",
      description: "Listen to music on Saratify",
      route: "/saratify",
      position: "right",
      rotation: { x: 0, y: -25, z: 5 }
    },
    {
      id: "phone",
      name: "Smartphone",
      icon: "📱",
      description: "Browse Saranterest",
      route: "/saranterest",
      position: "left",
      rotation: { x: 0, y: 25, z: -5 }
    },
    {
      id: "gift",
      name: "Gift Box",
      icon: "🎁",
      description: "Open your Saraprise",
      route: "/saraprise",
      position: "bottom",
      rotation: { x: 15, y: 0, z: 0 }
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
   * Handle mouse movement for 3D effect
   * Creates parallax and perspective effects based on cursor position
   */
  const handleMouseMove = (event: React.MouseEvent) => {
    if (!desktopRef.current || isZooming) return;
    
    const rect = desktopRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  /**
   * Reset mouse position when mouse leaves the component
   */
  const handleMouseLeave = () => {
    if (isZooming) return;
    // Animate back to center position
    mouseX.set(0);
    mouseY.set(0);
  };

  /**
   * Handle device click
   * Initiates 3D zoom animation and navigates to the device's route
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
        return "absolute top-[15%] left-1/2 transform -translate-x-1/2 w-[60%] md:w-[50%] z-20";
      case "right":
        return "absolute top-1/2 right-[8%] transform -translate-y-1/2 w-[25%] md:w-[22%] z-10";
      case "left":
        return "absolute top-1/2 left-[8%] transform -translate-y-1/2 w-[25%] md:w-[22%] z-10";
      case "bottom":
        return "absolute bottom-[12%] left-1/2 transform -translate-x-1/2 w-[20%] md:w-[18%] z-10";
      default:
        return "";
    }
  };

  /**
   * Get 3D transform style for device
   * Creates realistic perspective and rotation
   */
  const getDeviceTransform = (device: DesktopDevice) => {
    const { rotation } = device;
    
    // Base transform for all devices
    let transform = `perspective(1200px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`;
    
    // Additional transforms for active device during zoom
    if (activeDevice === device.id) {
      transform = `perspective(2000px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale3d(1.5, 1.5, 1.5)`;
    }
    
    return transform;
  };

  return (
    <motion.div 
      ref={desktopRef}
      className="relative w-full h-[80vh] overflow-hidden rounded-xl"
      style={{ 
        rotateX, 
        rotateY,
        perspective: 1200,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Desktop environment with realistic wooden texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-sara-pixel6/30 to-sara-pixel6/10 rounded-xl overflow-hidden border-4 border-sara-pixel3 shadow-2xl"
        style={{ 
          transformStyle: "preserve-3d",
          perspective: "1200px",
          transform: "rotateX(10deg)"
        }}>
        
        {/* Desktop background with wood texture */}
        <div className="absolute inset-0 bg-[url('/assets/images/desktop-texture.png')] bg-cover opacity-30"
          style={{ transformStyle: "preserve-3d", transform: "translateZ(-5px)" }}></div>
        
        {/* Ambient light effect */}
        <div className="absolute top-0 right-0 w-full h-full bg-white/10 rounded-full filter blur-3xl animate-pulse-gentle pointer-events-none"
          style={{ transformStyle: "preserve-3d", transform: "translateZ(5px)" }}></div>
        
        {/* Shadow underneath the desktop */}
        <div className="absolute -bottom-10 left-0 right-0 h-20 bg-black/20 filter blur-xl mx-10 rounded-full"></div>
        
        {/* Scanline effect for retro feel */}
        <div className="absolute inset-0 bg-scanlines opacity-10 pointer-events-none"></div>

        {/* 3D desktop lighting effect */}
        <div className="absolute inset-0 bg-gradient-radial from-white/30 via-transparent to-transparent opacity-70"
          style={{ transformStyle: "preserve-3d", transform: "translateZ(10px)" }}></div>
      </div>

      {/* Desktop devices */}
      {devices.map((device) => (
        <motion.div
          key={device.id}
          className={`${getDeviceStyles(device.position)} cursor-pointer transition-all`}
          style={{ 
            transformStyle: "preserve-3d",
            transform: getDeviceTransform(device),
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          }}
          whileHover={{ 
            scale: 1.05, 
            filter: "brightness(1.1)",
            boxShadow: "0 15px 30px rgba(0,0,0,0.3)",
          }}
          whileTap={{ scale: 0.98 }}
          animate={{
            opacity: activeDevice && activeDevice !== device.id ? [1, 0.5, 0] : 1,
            scale: activeDevice === device.id ? [1, 1.2, 1.5] : 1,
            z: activeDevice === device.id ? [0, 50, 100] : 0,
          }}
          transition={{ 
            duration: 0.8,
            ease: [0.19, 1, 0.22, 1] // Exponential ease out for realistic motion
          }}
          onClick={() => handleDeviceClick(device)}
          data-device-id={device.id}
        >
          <div className={`device-container ${device.id}-device relative`}>
            {/* Device frame with 3D shadow and reflection */}
            <div className="relative bg-sara-pixelBg rounded-xl overflow-hidden border-4 border-sara-pixel4 shadow-lg"
              style={{ 
                transformStyle: "preserve-3d",
                boxShadow: "0 10px 25px rgba(0,0,0,0.2), inset 0 1px 3px rgba(255,255,255,0.3)"
              }}>
              {/* Device indicator for previously visited */}
              {lastVisited[device.id] && (
                <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-green-500 animate-pulse z-20"
                  style={{ transformStyle: "preserve-3d", transform: "translateZ(5px)" }}></div>
              )}
              
              {/* Device screen/display */}
              <div className="aspect-video md:aspect-auto p-4 flex flex-col items-center justify-center bg-gradient-to-br from-sara-pixel2/30 via-sara-pixel3/20 to-sara-pixel4/30">
                <span className="text-3xl md:text-5xl mb-2"
                  style={{ transformStyle: "preserve-3d", transform: "translateZ(10px)" }}>{device.icon}</span>
                <h3 className="text-sm md:text-base font-press text-sara-pixel5 text-center"
                  style={{ transformStyle: "preserve-3d", transform: "translateZ(8px)" }}>{device.name}</h3>
                <p className="text-xs md:text-sm text-sara-pixel4 text-center mt-1 hidden md:block"
                  style={{ transformStyle: "preserve-3d", transform: "translateZ(6px)" }}>{device.description}</p>
              </div>
              
              {/* Glass reflection effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none"
                style={{ transformStyle: "preserve-3d", transform: "translateZ(15px)" }}></div>
                
              {/* 3D button/control elements specific to each device */}
              {device.id === "monitor" && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-sara-pixel3/60 rounded-sm"
                  style={{ transformStyle: "preserve-3d", transform: "translateZ(3px)" }}></div>
              )}
              
              {device.id === "ipod" && (
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-sara-pixel5/20 rounded-full"
                  style={{ transformStyle: "preserve-3d", transform: "translateZ(4px)" }}></div>
              )}
              
              {device.id === "phone" && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-sara-pixel4/30 rounded-full border border-sara-pixel4/50"
                  style={{ transformStyle: "preserve-3d", transform: "translateZ(5px)" }}></div>
              )}
            </div>
          </div>
        </motion.div>
      ))}

      {/* 3D desktop decorative elements */}
      <div className="absolute bottom-4 left-4 text-xs text-sara-pixel4 font-press"
        style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }}>
        SaraOS v1.0
      </div>
      
      <div className="absolute bottom-4 right-4 text-xs text-sara-pixel4 font-press"
        style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }}>
        {new Date().toLocaleTimeString()}
      </div>
      
      {/* 3D desk accessories like pencil, coffee cup, etc. */}
      <div className="absolute bottom-6 right-10 text-2xl transform rotate-12"
        style={{ transformStyle: "preserve-3d", transform: "translateZ(25px) rotate(12deg)" }}>
        ✏️
      </div>
      
      <div className="absolute bottom-8 left-16 text-2xl"
        style={{ transformStyle: "preserve-3d", transform: "translateZ(30px)" }}>
        ☕
      </div>
    </motion.div>
  );
};

export default DesktopEnvironment;
