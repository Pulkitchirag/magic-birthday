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

        {/* Teddy Animation Instead of Tenor */}
        <div className="relative inline-block animate-scale-in">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-64 h-64 object-contain mx-auto drop-shadow-xl"
            src="/assets/bear1.mp4"
          />
          <div className="absolute -top-8 right-8 text-5xl animate-pulse">
            ❤️
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-pacifico neon-glow">
            Lots of love for you ❤️
          </h2>

          <p className="text-2xl font-quicksand neon-glow-purple">
            Once again, Happy Birthday my Universe!💞💝
          </p>

          <p className="text-xl font-quicksand text-muted-foreground">
            Hope you loved your surprise 🎉
          </p>
          <p className="text-xl font-quicksand text-muted-foreground">
            I Love you Soooo much! 🐼💕
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
