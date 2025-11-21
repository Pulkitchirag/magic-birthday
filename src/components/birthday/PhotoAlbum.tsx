import { useState } from "react";
import { Button } from "@/components/ui/button";

interface PhotoAlbumProps {
  onNext: () => void;
}

export const PhotoAlbum = ({ onNext }: PhotoAlbumProps) => {
  const [currentCard, setCurrentCard] = useState(0);
  
  const photos = [
    "/photos/6.jpg",
    "/photos/4.jpg",
    "/photos/7.jpg",
    "/photos/8.jpg",
    "/photos/9.jpg",
    "/photos/10.jpg",
    "/photos/11.jpg",
    "/photos/12.jpg",
  ];

  const handleSwipe = () => {
    if (currentCard < photos.length - 1) {
      setCurrentCard(currentCard + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 animate-fade-in">
      <div className="max-w-md w-full text-center space-y-8">
        <h2 className="text-3xl md:text-4xl font-pacifico neon-glow-cyan mb-8">
          Some Sweet Moments
        </h2>
        <p className="text-lg font-quicksand text-muted-foreground mb-6">
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

        <Button 
          onClick={onNext}
          className="mt-8 bg-primary hover:bg-primary/90 text-white font-quicksand font-bold text-lg px-8 py-6 rounded-full box-glow interactive-element transition-all hover:scale-105"
        >
          Open My Message
        </Button>
      </div>
    </div>
  );
};
