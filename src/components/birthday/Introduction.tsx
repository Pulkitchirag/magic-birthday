import { Button } from "@/components/ui/button";

interface IntroductionProps {
  onNext: () => void;
}

export const Introduction = ({ onNext }: IntroductionProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 animate-fade-in">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="text-8xl mb-8 animate-bounce">
          🐼
        </div>
        
        <h1 className="text-4xl md:text-5xl font-pacifico neon-glow mb-4">
          A Cutiepie was born today,
        </h1>
        <h2 className="text-3xl md:text-4xl font-pacifico neon-glow-purple">
          20 years ago!
        </h2>
        
        <p className="text-xl font-quicksand text-muted-foreground mt-6">
          Yes, it's <span className="text-neon-cyan font-bold">YOU!</span>
        </p>
        <p className="text-lg font-quicksand text-muted-foreground">
          A little surprise awaits you...
        </p>
        
        <Button 
          onClick={onNext}
          className="mt-8 bg-primary hover:bg-primary/90 text-white font-quicksand font-bold text-lg px-8 py-6 rounded-full box-glow interactive-element transition-all hover:scale-105"
        >
          🎁 Start the surprise!!!!
        </Button>
      </div>
    </div>
  );
};
