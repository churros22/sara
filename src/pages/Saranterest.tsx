
import { useNavigate } from "react-router-dom";
import ImageGrid from "@/components/ImageGrid";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowLeft, Bell, MessageCircle, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Saranterest = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { toast } = useToast();

  // Preload images with proper dimensions
  const dummyImages = [
    { id: "1", src: "./assets/images/sara_1.jpg", alt: "Sara image 1" },
    { id: "2", src: "./assets/images/sara_2.jpg", alt: "Sara image 2" },
    { id: "3", src: "./assets/images/sara_3.jpg", alt: "Sara image 3" },
    { id: "4", src: "./assets/images/sara_4.jpg", alt: "Sara image 4" },
    { id: "5", src: "./assets/images/sara_5.jpg", alt: "Sara image 5" },
    { id: "7", src: "./assets/images/sara_7.jpg", alt: "Sara image 7" },
    { id: "8", src: "./assets/images/sara_8.jpg", alt: "Sara image 8" },
    { id: "9", src: "./assets/images/sara_22.jpg", alt: "Sara image 9" },
    { id: "10", src: "./assets/images/sara_23.jpg", alt: "Sara image 10" },
    { id: "11", src: "./assets/images/sara_24.jpg", alt: "Sara image 11" },
    { id: "12", src: "./assets/images/sara_25.jpg", alt: "Sara image 12" },

  ];

  // Pinterest categories (for decoration)
  const categories = ["Turkish", "Crochet", "Vintage", "Travel", "Food", "Fashion", "Art"];

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Pinterest-style header */}
      <div className="sticky top-0 z-10 bg-white shadow-sm px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => navigate("/home")}
            className="p-2 rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={isMobile ? 20 : 24} />
          </button>
          
          {/* Logo with pixel art styling - Changed "P" to "S" */}
          <div className="flex items-center">
            <svg className="w-8 h-8 text-red-600" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" fill="currentColor"/>
            </svg>
            <span className="ml-1 text-xl font-vt323 font-bold text-red-600">aranterest</span>
          </div>
          
          {/* Pinterest Icons - Removed search bar */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all">
              <Bell size={isMobile ? 18 : 20} className="text-gray-700" />
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all">
              <MessageCircle size={isMobile ? 18 : 20} className="text-gray-700" />
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all">
              <User size={isMobile ? 18 : 20} className="text-gray-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Pinterest category chips */}
      <div className="bg-white border-b py-3 px-4 overflow-x-auto scrollbar-none">
        <div className="flex space-x-2 min-w-max">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="px-3 py-1.5 rounded-full bg-gray-100 text-sm text-black font-vt323 whitespace-nowrap hover:bg-gray-200 cursor-pointer transition-all"
              style={{ 
                border: '1px solid #000',
                boxShadow: '1px 1px 0 #000'
              }}
            >
              {category}
            </div>
          ))}
        </div>
      </div>

      {/* Pinterest-style content with pixel art decorations */}
      <div className="container mx-auto py-6 px-4">
        <div className="bg-white rounded-2xl p-4 relative">
          <div className="absolute -inset-1 -z-10 bg-gradient-to-r from-sara-retro1/10 via-sara-retro3/10 to-sara-retro5/10 blur-sm"></div>
          <ImageGrid images={dummyImages} />
        </div>
      </div>
    </div>
  );
};

export default Saranterest;
