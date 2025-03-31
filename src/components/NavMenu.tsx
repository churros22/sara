
import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Home, Search, Music, Gift, Image } from "lucide-react";

const NavMenu = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <NavigationMenu className="fixed bottom-0 left-0 w-full z-20 bg-black/80 backdrop-blur-md border-t border-white/10 px-2 py-1 sm:py-2">
      <NavigationMenuList className="w-full flex justify-around">
        <MenuItem 
          path="/home"
          icon={<Home size={18} />}
          label="Home"
          active={isActive("/home")}
        />
        <MenuItem 
          path="/saranterest"
          icon={<Image size={18} />}
          label="Pics"
          active={isActive("/saranterest")}
        />
        <MenuItem 
          path="/googolu"
          icon={<Search size={18} />}
          label="Search"
          active={isActive("/googolu")}
        />
        <MenuItem 
          path="/saratify"
          icon={<Music size={18} />}
          label="Music"
          active={isActive("/saratify")}
        />
        <MenuItem 
          path="/saraprise"
          icon={<Gift size={18} />}
          label="Gift"
          active={isActive("/saraprise")}
        />
      </NavigationMenuList>
    </NavigationMenu>
  );
};

interface MenuItemProps {
  path: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}

const MenuItem = ({ path, icon, label, active }: MenuItemProps) => {
  return (
    <NavigationMenuItem>
      <Link
        to={path}
        className={cn(
          "group flex flex-col items-center px-2 py-1 rounded-md transition-colors",
          active ? "text-blue-400" : "text-white/70 hover:text-blue-300"
        )}
      >
        <div className={cn(
          "mb-1 transition-transform group-hover:scale-110",
          active ? "scale-110" : ""
        )}>
          {icon}
        </div>
        <span className="text-xs font-pixel">{label}</span>
        
        {active && (
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-0.5 absolute bottom-0.5"></div>
        )}
      </Link>
    </NavigationMenuItem>
  );
};

export default NavMenu;
