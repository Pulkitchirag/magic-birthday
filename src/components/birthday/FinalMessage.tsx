import { Button } from "@/components/ui/button";

interface FinalMessageProps {
  onReplay: () => void;
}

export const FinalMessage = ({ onReplay }: FinalMessageProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 animate-fade-in relative overflow-hidden">
      {/* Falling confetti */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-fall"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 20}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          >
            {['⭐', '✨', '💫', '🌟'][Math.floor(Math.random() * 4)]}
          </div>
        ))}
      </div>

      <div className="max-w-md w-full text-center space-y-8 relative z-10">
        {/* Character popping out */}
        <div className="relative inline-block animate-scale-in">
          <div className="text-9xl">
            📦
          </div>
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-8xl animate-bounce">
            🐼
          </div>
          <div className="absolute -top-8 right-8 text-5xl animate-pulse">
            ❤️
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-pacifico neon-glow">
            Lots of love for you ❤️
          </h2>
          
          <p className="text-2xl font-quicksand neon-glow-purple">
            Once again, Happy Birthday!
          </p>
          
          <p className="text-xl font-quicksand text-muted-foreground">
            Hope you loved your surprise 🎉
          </p>
        </div>

        <Button 
          onClick={onReplay}
          className="mt-12 bg-accent hover:bg-accent/90 text-accent-foreground font-quicksand font-bold text-lg px-8 py-6 rounded-full interactive-element transition-all hover:scale-105"
        >
          ↻ Replay
        </Button>
      </div>

      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
      `}</style>
    </div>
  );
};
