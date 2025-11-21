import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useRef } from "react";

const queryClient = new QueryClient();

const App = () => {
  // GLOBAL AUDIO
  const audioRef = useRef<HTMLAudioElement | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        {/* GLOBAL AUDIO ELEMENT (never unmounts) */}
        <audio
          ref={audioRef}
          id="global-audio"
          src="/music/Blue.mp3"
          preload="auto"
        />

        {/* PASS AUDIO REF TO ALL SCREENS */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index audioRef={audioRef} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
