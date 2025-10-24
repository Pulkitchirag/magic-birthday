import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface ConfettiRevealProps {
  onNext: () => void;
}

export const ConfettiReveal = ({ onNext }: ConfettiRevealProps) => {
  const [showWords, setShowWords] = useState(false);
  const words = ["You", "are", "a", "Cutiee"];

  useEffect(() => {
    const timer = setTimeout(() => setShowWords(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Confetti */}
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
                backgroundColor: ['#FF1493', '#9D4EDD', '#00F5FF', '#FFD700'][Math.floor(Math.random() * 4)],
              }}
            />
          </div>
        ))}
      </div>

      <div className="max-w-md w-full text-center space-y-12 relative z-10">
        {showWords && (
          <div className="flex flex-wrap justify-center gap-4">
            {words.map((word, index) => (
              <span
                key={index}
                className="text-5xl md:text-6xl font-pacifico neon-glow-purple inline-block"
                style={{
                  animation: `scale-in 0.5s ease-out ${index * 0.3}s both, float 3s ease-in-out ${index * 0.3}s infinite`,
                }}
              >
                {word}
              </span>
            ))}
          </div>
        )}

        <Button 
          onClick={onNext}
          className="mt-16 bg-secondary hover:bg-secondary/90 text-white font-quicksand font-bold text-lg px-8 py-6 rounded-full box-glow-purple interactive-element transition-all hover:scale-105"
        >
          Next →
        </Button>
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
