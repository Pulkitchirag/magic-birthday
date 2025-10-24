import { useState } from "react";

interface GiftBoxProps {
  onNext: () => void;
}

export const GiftBox = ({ onNext }: GiftBoxProps) => {
  const [isShaking, setIsShaking] = useState(false);

  const handleTap = () => {
    setIsShaking(true);
    setTimeout(() => {
      onNext();
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 animate-fade-in">
      <div className="max-w-md w-full text-center space-y-8">
        <h2 className="text-3xl md:text-4xl font-pacifico neon-glow mb-8">
          One Last Thing...
        </h2>

        <div 
          onClick={handleTap}
          className={`relative w-64 h-64 mx-auto interactive-element ${
            isShaking ? 'animate-bounce' : ''
          }`}
        >
          {/* Gift Box */}
          <div className="relative">
            {/* Bow */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
              <div className="w-32 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-pink-500 to-pink-700 rounded-full"></div>
            </div>

            {/* Box */}
            <div className="w-64 h-64 bg-gradient-to-br from-primary to-pink-500 rounded-3xl box-glow relative overflow-hidden">
              {/* Ribbon vertical */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-full bg-gradient-to-b from-pink-300 to-pink-500"></div>
              {/* Ribbon horizontal */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-8 bg-gradient-to-r from-pink-300 to-pink-500"></div>
              
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"></div>
            </div>
          </div>
        </div>

        <p className="text-xl font-quicksand text-muted-foreground animate-pulse">
          Tap the gift 🎁
        </p>
      </div>
    </div>
  );
};
