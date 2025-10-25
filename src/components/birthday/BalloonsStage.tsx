import { useState } from "react";
import { Button } from "@/components/ui/button";

interface BalloonsStageProps {
  onNext: () => void;
}

export const BalloonsStage = ({ onNext }: BalloonsStageProps) => {
  const [poppedBalloons, setPoppedBalloons] = useState<number[]>([]);
  const words = ["U", "are", "my", "Favourite"];
  const balloonColors = ["#FF1493", "#9D4EDD", "#00F5FF", "#FFD700"];

  const popBalloon = (index: number) => {
    if (!poppedBalloons.includes(index)) {
      setPoppedBalloons([...poppedBalloons, index]);
    }
  };

  const allPopped = poppedBalloons.length === 4;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Confetti after all balloons popped */}
      {allPopped && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: balloonColors[Math.floor(Math.random() * 4)],
                }}
              />
            </div>
          ))}
        </div>
      )}

      <div className="max-w-4xl w-full text-center space-y-12 relative z-10">
        <h2 className="text-3xl font-pacifico neon-glow mb-8">
          Pop the Balloons!
        </h2>

        {/* Balloons */}
        <div className="flex justify-center items-start gap-8 md:gap-12 mb-12">
          {[0, 1, 2, 3].map((index) => (
            <div key={index} className="relative flex flex-col items-center">
              {/* Thread - now more visible and realistic */}
              <div className="w-1 h-40 bg-gradient-to-b from-gray-600 via-gray-500 to-gray-400 mb-2" style={{
                boxShadow: "0 0 2px rgba(0,0,0,0.3)"
              }}></div>
              
              {/* Balloon or Word in same position */}
              <div className="relative flex items-center justify-center" style={{ minHeight: "120px", minWidth: "100px" }}>
                {poppedBalloons.includes(index) ? (
                  <div className="text-4xl md:text-5xl font-pacifico neon-glow-purple animate-scale-in">
                    {words[index]}
                  </div>
                ) : (
                  <button
                    onClick={() => popBalloon(index)}
                    className="relative cursor-pointer transform transition-all hover:scale-110 interactive-element"
                  >
                    {/* Balloon */}
                    <div
                      className="w-20 h-24 md:w-24 md:h-28 rounded-full shadow-lg animate-float"
                      style={{
                        backgroundColor: balloonColors[index],
                        animation: `float 3s ease-in-out ${index * 0.3}s infinite`,
                        boxShadow: `0 0 20px ${balloonColors[index]}80`,
                      }}
                    >
                      {/* Balloon shine */}
                      <div className="absolute top-2 left-3 w-4 h-6 bg-white/30 rounded-full"></div>
                    </div>
                    {/* Balloon knot */}
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-4"
                      style={{
                        backgroundColor: balloonColors[index],
                        clipPath: "polygon(50% 0%, 0% 50%, 50% 100%, 100% 50%)",
                      }}
                    ></div>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {allPopped && (
          <Button 
            onClick={onNext}
            className="mt-16 bg-secondary hover:bg-secondary/90 text-white font-quicksand font-bold text-lg px-8 py-6 rounded-full box-glow-purple interactive-element transition-all hover:scale-105 animate-scale-in"
          >
            Next →
          </Button>
        )}
      </div>

      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
      `}</style>
    </div>
  );
};
