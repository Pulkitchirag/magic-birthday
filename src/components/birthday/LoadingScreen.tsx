import { useState, useEffect } from "react";

export const LoadingScreen = () => {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="relative w-32 h-32 mb-8">
        <div className="absolute inset-0 rounded-full border-8 border-neon-pink/30 animate-pulse"></div>
        <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-neon-pink border-r-neon-cyan animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl font-pacifico neon-glow">{countdown}</span>
        </div>
      </div>
      <h2 className="text-2xl md:text-3xl font-pacifico neon-glow text-center">
        Preparing your gift...
      </h2>
    </div>
  );
};
