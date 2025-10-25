import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PhotoAlbumProps {
  onNext: () => void;
}

export const PhotoAlbum = ({ onNext }: PhotoAlbumProps) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const photos = [
    "https://placehold.co/400x600/AA33AA/ffffff?text=Sweet+Moment+1",
    "https://placehold.co/400x600/9D4EDD/ffffff?text=Sweet+Moment+2",
    "https://placehold.co/400x600/FF1493/ffffff?text=Sweet+Moment+3",
    "https://placehold.co/400x600/00F5FF/333333?text=Sweet+Moment+4",
    "https://placehold.co/400x600/FFD700/333333?text=Sweet+Moment+5",
    "https://placehold.co/400x600/A855F7/ffffff?text=Sweet+Moment+6",
  ];

  // Placeholder audio URL - replace with actual song
  const songUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
  const songName = "Happy Birthday Special";
  const artistName = "For You";

  const handleSwipe = () => {
    if (currentCard < photos.length - 1) {
      setCurrentCard(currentCard + 1);
    }
  };

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
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 animate-fade-in">
      <h2 className="text-3xl md:text-4xl font-pacifico neon-glow-cyan mb-8 text-center">
        Some Sweet Moments
      </h2>

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
        {/* Left side - Music Player */}
        <div className="bg-card rounded-3xl p-6 box-glow space-y-6">
          {/* Album Art / Image Slot */}
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden box-glow-purple">
            <img 
              src="https://placehold.co/400x400/9D4EDD/ffffff?text=Album+Art"
              alt="Album Art"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Song Info - Spotify Style */}
          <div className="space-y-2">
            <h3 className="text-2xl font-pacifico neon-glow truncate">
              {songName}
            </h3>
            <p className="text-muted-foreground font-quicksand">
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
            <div className="flex justify-between text-xs text-muted-foreground font-quicksand">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={skipBackward}
              className="interactive-element hover:scale-110 transition-transform"
            >
              <SkipBack className="h-5 w-5" />
            </Button>

            <Button
              variant="default"
              size="icon"
              onClick={togglePlayPause}
              className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 box-glow interactive-element hover:scale-110 transition-all"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" fill="currentColor" />
              ) : (
                <Play className="h-6 w-6" fill="currentColor" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={skipForward}
              className="interactive-element hover:scale-110 transition-transform"
            >
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3">
            <Volume2 className="h-4 w-4 text-muted-foreground" />
            <Slider
              value={[volume]}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
              className="cursor-pointer"
            />
            <span className="text-xs text-muted-foreground w-8">{volume}%</span>
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

        {/* Right side - Photo Album */}
        <div className="w-full text-center space-y-6">
          <p className="text-lg font-quicksand text-muted-foreground">
            (Swipe the cards)
          </p>

          <div className="relative h-[500px] flex items-center justify-center">
            {photos.map((photo, index) => (
              <div
                key={index}
                onClick={handleSwipe}
                className={`absolute interactive-element transition-all duration-500 ${
                  index === currentCard 
                    ? 'z-20 scale-100 opacity-100 rotate-0' 
                    : index < currentCard
                    ? 'z-10 scale-95 opacity-0 -translate-x-full rotate-12'
                    : 'z-10 scale-90 opacity-50'
                }`}
                style={{
                  transform: `translateX(${(index - currentCard) * 20}px) translateY(${(index - currentCard) * 10}px) rotate(${(index - currentCard) * 5}deg)`,
                }}
              >
                <div className="bg-card rounded-3xl p-4 box-glow">
                  <img 
                    src={photo} 
                    alt={`Memory ${index + 1}`}
                    className="w-80 h-[450px] object-cover rounded-2xl"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Button 
        onClick={onNext}
        className="mt-8 bg-primary hover:bg-primary/90 text-white font-quicksand font-bold text-lg px-8 py-6 rounded-full box-glow interactive-element transition-all hover:scale-105"
      >
        Open My Message
      </Button>
    </div>
  );
};
