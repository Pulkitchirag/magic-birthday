import { useEffect, useRef, useState } from "react";
import { LoadingScreen } from "@/components/birthday/LoadingScreen";
import { Introduction } from "@/components/birthday/Introduction";
import { CakeStage } from "@/components/birthday/CakeStage";
import { BalloonsStage } from "@/components/birthday/BalloonsStage";
import { PhotoAlbum } from "@/components/birthday/PhotoAlbum";
import { GreetingCard } from "@/components/birthday/GreetingCard";
import { CardMessage } from "@/components/birthday/CardMessage";
import { GiftBox } from "@/components/birthday/GiftBox";
import { FinalMessage } from "@/components/birthday/FinalMessage";
import { Pennants } from "@/components/birthday/Pennants";
import { FloatingHearts } from "@/components/birthday/FloatingHearts";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [stage, setStage] = useState<number>(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  // Attempt to play audio (safely)
  const tryPlay = async () => {
    setUserInteracted(true);
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (err) {
      // Browser blocked autoplay — we'll wait for explicit user action
      setIsPlaying(false);
    }
  };

  // Toggle play/pause
  const togglePlay = async () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Volume helper (optional)
  const setVolume = (v: number) => {
    if (!audioRef.current) return;
    audioRef.current.volume = Math.min(1, Math.max(0, v));
  };

  // Start stage 2 automatically after loading screen
  useEffect(() => {
    if (stage === 1) {
      const timer = setTimeout(() => setStage(2), 3000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  // When user moves forward via any onNext, we try to play the audio
  // We'll create a wrapper so all children calls go through this
  const goTo = (nextStage: number) => {
    // mark user interacted and attempt play
    tryPlay();
    setStage(nextStage);
  };

  const resetJourney = () => {
    setStage(2);
    // keep music playing if it already was
  };

  // Make sure audio pauses when user leaves the page (cleanup)
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else if (userInteracted && isPlaying) {
        // try to resume silently (may be blocked)
        audioRef.current?.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [userInteracted, isPlaying]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-pink-50 to-white">
      <FloatingHearts />
      {stage > 1 && <Pennants />}

      {/* Centralized audio element (placed at top-level so it persists across stages) */}
      <audio
        ref={audioRef}
        src="/music/Blue.mp3"
        preload="auto"
        loop
      />

      {/* Left-side compact audio control (positioned fixed so it appears near giftbox) */}
      <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-50">
        <div className="flex flex-col items-center space-y-2 bg-white/70 backdrop-blur-sm p-3 rounded-2xl shadow-lg">
          <button
            onClick={togglePlay}
            className="w-12 h-12 rounded-full flex items-center justify-center text-2xl bg-rose-500 text-white drop-shadow-md"
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? "⏸" : "▶️"}
          </button>

          <div className="text-sm text-center text-muted-foreground max-w-[120px]">
            {isPlaying ? "Playing — Blue.mp3" : "Music paused"}
          </div>

          {/* small volume slider (optional) */}
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            defaultValue={0.6}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-24"
            aria-label="Volume"
          />

          {/* If audio hasn't started due to autoplay rules, show a friendly 'Start music' button */}
          {!userInteracted && (
            <Button onClick={tryPlay} size="sm" className="mt-1">
              Start music
            </Button>
          )}
        </div>
      </div>

      <div className="relative z-10">
        {stage === 1 && <LoadingScreen />}
        {stage === 2 && <Introduction onNext={() => goTo(3)} />}
        {stage === 3 && <CakeStage onNext={() => goTo(4)} />}
        {stage === 4 && <BalloonsStage onNext={() => goTo(5)} />}
        {stage === 5 && <PhotoAlbum onNext={() => goTo(6)} />}
        {stage === 6 && (
          // GreetingCard used to contain an <audio /> element — remove that and rely on the centralized audio here.
          <GreetingCard onNext={() => goTo(7)} />
        )}
        {stage === 7 && <CardMessage onNext={() => goTo(8)} />}
        {stage === 8 && <GiftBox onNext={() => goTo(9)} />}
        {stage === 9 && <FinalMessage onReplay={resetJourney} />}
      </div>
    </div>
  );
};

export default Index;
