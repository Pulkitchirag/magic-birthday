import { Button } from "@/components/ui/button";

interface CardMessageProps {
  onNext: () => void;
}

export const CardMessage = ({ onNext }: CardMessageProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 animate-fade-in">
      <div className="max-w-2xl w-full text-center space-y-8">
        <h2 className="text-3xl md:text-4xl font-pacifico neon-glow mb-8">
          A Special Message
        </h2>

        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {/* Left half */}
          <div className="bg-gradient-to-br from-secondary to-primary rounded-3xl box-glow-purple p-8 h-[500px] flex items-center justify-center">
            <div className="text-6xl">🎊</div>
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
