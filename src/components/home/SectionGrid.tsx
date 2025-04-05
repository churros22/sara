
import { useNavigate } from "react-router-dom";
import { SectionData } from "@/data/homeSections";

interface SectionGridProps {
  sections: SectionData[];
}

const SectionGrid = ({ sections }: SectionGridProps) => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      {sections.map((section, index) => (
        <div 
          key={section.id}
          className="border-2 border-[#4CC9F0] rounded-lg overflow-hidden cursor-pointer hover:shadow-[0_0_15px_rgba(76,201,240,0.5)] transition-all duration-300"
          onClick={() => handleNavigate(`/${section.id}`)}
          style={{ 
            backgroundColor: "rgba(29, 53, 87, 0.8)",
            backdropFilter: "blur(4px)",
            animation: `fadeIn 0.5s ease-out forwards ${index * 0.15}s`
          }}
        >
          <div className="p-6 flex flex-col items-center text-center h-full">
            <div className="bg-[#1D3557] p-4 rounded-lg mb-4 border border-[#4CC9F0]/30 shadow-[0_0_10px_rgba(76,201,240,0.2)]">
              {section.icon}
            </div>
            <h3 className="text-2xl font-silkscreen text-[#4CC9F0] mb-2">{section.title}</h3>
            <p className="text-sm font-caveat text-white">{section.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SectionGrid;
