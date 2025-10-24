export const FloatingHearts = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute text-2xl opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${10 + Math.random() * 10}s`,
          }}
        >
          <div className="animate-float-up">
            {['💕', '💖', '💗', '💝'][Math.floor(Math.random() * 4)]}
          </div>
        </div>
      ))}
      
      <style>{`
        @keyframes float-up {
          0% {
            transform: translateY(100vh) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100px) scale(1);
            opacity: 0;
          }
        }
        .animate-float-up {
          animation: float-up linear infinite;
        }
      `}</style>
    </div>
  );
};
