import { useState } from "react";
import { Button } from "@/components/ui/button";

interface CakeStageProps {
  onNext: () => void;
}

export const CakeStage = ({ onNext }: CakeStageProps) => {
  const [isLit, setIsLit] = useState(false);

  const handleLight = () => {
    setIsLit(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 animate-fade-in">
      <div className="max-w-md w-full text-center space-y-8">
        {isLit && (
          <h1 className="text-4xl md:text-5xl font-pacifico neon-glow mb-8 animate-scale-in">
            Happy Birthday, Cutiepie! 🎉
          </h1>
        )}
        
        <div className="relative inline-block">
          {/* Cake */}
          <div className="relative">
            {/* Candle */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-4 bg-red-600 h-16 rounded-t-sm">
              {isLit && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                  <div className="w-6 h-8 bg-gradient-to-t from-yellow-500 via-orange-500 to-red-500 rounded-full animate-pulse blur-sm"></div>
                  <div className="absolute inset-0 w-6 h-8 bg-gradient-to-t from-yellow-400 via-orange-400 to-red-400 rounded-full animate-bounce"></div>
                </div>
              )}
            </div>
            
            {/* Top icing */}
            <div className="bg-white h-8 w-64 rounded-t-full"></div>
            
            {/* Cake layers */}
            <div className="bg-gradient-to-b from-amber-900 to-amber-950 h-12 w-64"></div>
            <div className="bg-white h-4 w-64"></div>
            <div className="bg-gradient-to-b from-amber-900 to-amber-950 h-12 w-64"></div>
            <div className="bg-white h-4 w-64"></div>
            <div className="bg-gradient-to-b from-amber-900 to-amber-950 h-12 w-64 rounded-b-lg"></div>
          </div>
        </div>
        
        <Button 
          onClick={isLit ? onNext : handleLight}
          className="mt-12 bg-primary hover:bg-primary/90 text-white font-quicksand font-bold text-lg px-8 py-6 rounded-full box-glow interactive-element transition-all hover:scale-105"
        >
          {isLit ? "Pop the Balloons →" : "🕯️ Light the Candle"}
        </Button>
      </div>
    </div>
  );
};
