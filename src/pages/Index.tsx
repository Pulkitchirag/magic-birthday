import { useState, useEffect } from "react";
import { LoadingScreen } from "@/components/birthday/LoadingScreen";
import { Introduction } from "@/components/birthday/Introduction";
import { CakeStage } from "@/components/birthday/CakeStage";
import { ConfettiReveal } from "@/components/birthday/ConfettiReveal";
import { PhotoAlbum } from "@/components/birthday/PhotoAlbum";
import { GreetingCard } from "@/components/birthday/GreetingCard";
import { CardMessage } from "@/components/birthday/CardMessage";
import { GiftBox } from "@/components/birthday/GiftBox";
import { FinalMessage } from "@/components/birthday/FinalMessage";
import { Pennants } from "@/components/birthday/Pennants";
import { FloatingHearts } from "@/components/birthday/FloatingHearts";

const Index = () => {
  const [stage, setStage] = useState(1);

  useEffect(() => {
    if (stage === 1) {
      const timer = setTimeout(() => setStage(2), 3000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const resetJourney = () => setStage(2);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingHearts />
      {stage > 1 && <Pennants />}
      
      <div className="relative z-10">
        {stage === 1 && <LoadingScreen />}
        {stage === 2 && <Introduction onNext={() => setStage(3)} />}
        {stage === 3 && <CakeStage onNext={() => setStage(4)} />}
        {stage === 4 && <ConfettiReveal onNext={() => setStage(5)} />}
        {stage === 5 && <PhotoAlbum onNext={() => setStage(6)} />}
        {stage === 6 && <GreetingCard onNext={() => setStage(7)} />}
        {stage === 7 && <CardMessage onNext={() => setStage(8)} />}
        {stage === 8 && <GiftBox onNext={() => setStage(9)} />}
        {stage === 9 && <FinalMessage onReplay={resetJourney} />}
      </div>
    </div>
  );
};

export default Index;
