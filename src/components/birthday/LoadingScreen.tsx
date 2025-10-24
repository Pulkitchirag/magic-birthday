export const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="relative w-32 h-32 mb-8">
        <div className="absolute inset-0 rounded-full border-8 border-neon-pink/30 animate-pulse"></div>
        <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-neon-pink border-r-neon-cyan animate-spin"></div>
      </div>
      <h2 className="text-2xl md:text-3xl font-pacifico neon-glow text-center">
        Crafting your special moment...
      </h2>
    </div>
  );
};
