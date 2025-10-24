export const Pennants = () => {
  const colors = ['#FF1493', '#9D4EDD', '#00F5FF', '#FFD700', '#FF6B9D', '#A855F7'];
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-16 overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 1200 80" preserveAspectRatio="none">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* String/rope */}
        <line x1="0" y1="10" x2="1200" y2="10" stroke="#FFD700" strokeWidth="2" />
        
        {/* Pennants */}
        {[...Array(12)].map((_, i) => {
          const x = i * 100 + 50;
          const color = colors[i % colors.length];
          
          return (
            <g key={i}>
              <polygon
                points={`${x},10 ${x-30},10 ${x},60 ${x+30},10`}
                fill={color}
                filter="url(#glow)"
                opacity="0.9"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};
