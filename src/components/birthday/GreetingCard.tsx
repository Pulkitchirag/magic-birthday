import { useState } from "react";
import { Button } from "@/components/ui/button";

interface GreetingCardProps {
  onNext: () => void;
}

export const GreetingCard = ({ onNext }: GreetingCardProps) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(onNext, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 animate-fade-in">
      <div className="max-w-md w-full text-center space-y-8">
        <h2 className="text-3xl md:text-4xl font-pacifico neon-glow mb-8">
          A Special Message
        </h2>

        <div 
          onClick={handleOpen}
          className={`relative w-80 h-[480px] mx-auto interactive-element transition-all duration-1000 ${
            isOpening ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-secondary to-primary rounded-3xl box-glow-purple p-8 flex flex-col items-center justify-center">
            <div className="text-6xl mb-6">🎈🎈🎈</div>
            <h3 className="text-3xl font-pacifico text-white mb-4">
              Happy Birthday
            </h3>
            <h3 className="text-3xl font-pacifico text-white mb-8">
              To You
            </h3>
            <p className="text-lg font-quicksand text-white/90 animate-pulse">
              Tap to Open
            </p>
          </div>
        </div>

        {!isOpening && (
          <Button 
            onClick={onNext}
            className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground font-quicksand font-bold text-lg px-8 py-6 rounded-full interactive-element transition-all hover:scale-105"
          >
            Next →
          </Button>
        )}
      </div>
    </div>
  );
};
