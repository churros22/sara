
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
    <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      {sections.map((section, index) => (
        <div 
          key={section.id}
          className="border-2 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 max-w-xs mx-auto w-full"
          onClick={() => handleNavigate(`/${section.id}`)}
          style={{ 
            backgroundColor: `rgba(29, 53, 87, 0.7)`,
            backdropFilter: "blur(4px)",
            borderColor: section.color,
            boxShadow: `0 0 15px ${section.color}30`,
            animation: `fadeIn 0.5s ease-out forwards ${index * 0.15}s`
          }}
        >
          <div className="p-4 flex flex-col items-center text-center h-full">
            <div className="p-3 rounded-lg mb-4 border shadow-md"
                 style={{ 
                   backgroundColor: `${section.color}20`,
                   borderColor: `${section.color}40` 
                 }}>
              {section.icon}
            </div>
            <h3 className="text-xl font-silkscreen mb-2" style={{ color: section.color }}>{section.title}</h3>
            <p className="text-sm font-caveat text-white">{section.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SectionGrid;
