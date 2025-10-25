import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface CardMessageProps {
  onNext: () => void;
}

export const CardMessage = ({ onNext }: CardMessageProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Placeholder audio URL - replace with actual song
  const songUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
  const songName = "Happy Birthday Special";
  const artistName = "For You";

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    if (audioRef.current) {
      const vol = value[0];
      audioRef.current.volume = vol / 100;
      setVolume(vol);
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, duration);
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 animate-fade-in">
      <div className="max-w-2xl w-full text-center space-y-8">
        <h2 className="text-3xl md:text-4xl font-pacifico neon-glow mb-8">
          A Special Message
        </h2>

        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {/* Left half - Music Player */}
          <div className="bg-gradient-to-br from-secondary to-primary rounded-3xl box-glow-purple p-6 h-[500px] flex flex-col justify-between">
            {/* Album Art / Image Slot */}
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden box-glow">
              <img 
                src="https://placehold.co/400x400/9D4EDD/ffffff?text=Album+Art"
                alt="Album Art"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Song Info - Spotify Style */}
            <div className="space-y-2 text-white">
              <h3 className="text-xl font-pacifico truncate">
                {songName}
              </h3>
              <p className="text-white/80 font-quicksand text-sm">
                {artistName}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <Slider
                value={[currentTime]}
                max={duration || 100}
                step={0.1}
                onValueChange={handleSeek}
                className="cursor-pointer"
              />
              <div className="flex justify-between text-xs text-white/70 font-quicksand">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={skipBackward}
                className="interactive-element hover:scale-110 transition-transform text-white hover:bg-white/20"
              >
                <SkipBack className="h-4 w-4" />
              </Button>

              <Button
                variant="default"
                size="icon"
                onClick={togglePlayPause}
                className="w-12 h-12 rounded-full bg-white text-primary hover:bg-white/90 interactive-element hover:scale-110 transition-all"
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" fill="currentColor" />
                ) : (
                  <Play className="h-5 w-5" fill="currentColor" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={skipForward}
                className="interactive-element hover:scale-110 transition-transform text-white hover:bg-white/20"
              >
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-white/80" />
              <Slider
                value={[volume]}
                max={100}
                step={1}
                onValueChange={handleVolumeChange}
                className="cursor-pointer"
              />
              <span className="text-xs text-white/70 w-8">{volume}%</span>
            </div>

            {/* Hidden Audio Element */}
            <audio
              ref={audioRef}
              src={songUrl}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
            />
          </div>

          {/* Right half - Message */}
          <div className="bg-card rounded-3xl box-glow p-8 h-[500px] flex items-center">
            <div className="text-left space-y-4 font-quicksand">
              <p className="text-lg leading-relaxed">
                Hey there, Birthday Star! ✨
              </p>
              <p className="text-lg leading-relaxed">
                On this special day, I want you to know how incredibly amazing you are. 
                Your smile lights up every room, and your kindness touches every heart.
              </p>
              <p className="text-lg leading-relaxed">
                Here's to another year of adventures, laughter, and making beautiful memories together!
              </p>
              <p className="text-xl font-bold neon-glow-purple mt-6">
                You deserve all the happiness in the world! 💖
              </p>
            </div>
          </div>
        </div>

        <Button 
          onClick={onNext}
          className="mt-8 bg-primary hover:bg-primary/90 text-white font-quicksand font-bold text-lg px-8 py-6 rounded-full box-glow interactive-element transition-all hover:scale-105"
        >
          Next →
        </Button>
      </div>
    </div>
  );
};
