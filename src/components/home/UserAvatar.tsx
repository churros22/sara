
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import AnimatedWrap from "@/components/AnimatedWrap";

const UserAvatar = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-6 relative ">
        <div className="absolute inset-0 rounded-full bg-[#4CC9F0] blur-lg opacity-70 animate-pulse-gentle"></div>
        <Avatar className="w-11 h-11 border-2 border-[#4CC9F0] animate-glow ">
          <AvatarImage src="/lovable-uploads/6ce3c4f5-4273-48e0-82f0-c8022f62c515.png" alt="Sara" className="object-cover" />
          <AvatarFallback className="bg-[#1D3557] text-[#4CC9F0]">S</AvatarFallback>
        </Avatar>
      </div>
      <h1 className="text-5xl sm:text-7xl font-bold mb-4 text-[#4CC9F0] animate-fade-in"
          style={{ textShadow: "0 0 15px rgba(76, 201, 240, 0.6)" }}>
        Hi Sara!
      </h1>
      
      <div className="w-32 h-1 bg-[#4CC9F0] mx-auto my-3 rounded-full shadow-[0_0_10px_rgba(76,201,240,0.8)]"></div>
      
      <AnimatedWrap animation="fade-in">
        <div className="mt-6 text-center">
          <h2 className="text-2xl font-silkscreen text-white mb-2">Welcome 🎉</h2>
          <p className="text-l font-caveat text-[#A3F7BF] italic">
            Feel free por favor, mi casa is your casa
          </p>
        </div>
      </AnimatedWrap>
    </div>
  );
};

export default UserAvatar;
