import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

interface GreetingCardProps {
  onNext: () => void;
}

export const GreetingCard = ({ onNext }: GreetingCardProps) => {
  const [isOpening, setIsOpening] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleOpen = () => {
    setIsOpening(true);

    // Play music
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }

    setTimeout(onNext, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 animate-fade-in bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900">

      {/* ACTUAL AUDIO */}
      <audio
        ref={audioRef}
        src="/music/Blue.mp3"
        preload="auto"
      />

      <div className="max-w-md w-full text-center space-y-8 relative">

        <h2 className="text-3xl md:text-4xl font-pacifico neon-glow mb-8 text-white">
          A Special Message
        </h2>

        <div
          onClick={handleOpen}
          className={`relative w-80 h-[480px] mx-auto interactive-element transition-all duration-1000 ${
            isOpening ? "scale-110 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center border border-white/20">
            <div className="text-6xl mb-6">🎈🎈🎈</div>

            <h3 className="text-3xl font-pacifico text-white mb-4">
              Happiest Birthday
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
            className="mt-6 bg-white/20 hover:bg-white/30 text-white font-bold px-8 py-4 rounded-full border border-white/30"
          >
            Next →
          </Button>
        )}
      </div>
    </div>
  );
};
