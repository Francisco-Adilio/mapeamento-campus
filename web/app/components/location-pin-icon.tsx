export function LocationPinIcon({ size = 40, color = '#00B2A9', isHere = false }) {
  return (
    <svg 
      xmlns="http://w3.org" 
      viewBox="-10 -15 120 145"
      width={size} 
      height={size * 1.3} 
    >
      <defs>
        <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.25" />
        </filter>

        {/* Mantemos o CSS e as animações fixas */}
        <style>{`
          @keyframes dramaticBounce {
            0%, 100% { transform: translateY(0) scaleY(1) scaleX(1); }
            40% { transform: translateY(-16px) scaleY(1.05) scaleX(0.95); }
            50% { transform: translateY(-14px) scaleY(1) scaleX(1); }
          }
          @keyframes pulseOne {
            0% { r: 4; opacity: 1; stroke-width: 4; }
            100% { r: 35; opacity: 0; stroke-width: 1; }
          }
          @keyframes pulseTwo {
            0% { r: 4; opacity: 0; stroke-width: 4; }
            30% { opacity: 0.8; }
            100% { r: 35; opacity: 0; stroke-width: 1; }
          }
          
          /* As animações só rodam se a classe correspondente estiver ativa */
          .bounce-active {
            transform-origin: 50px 88px;
            animation: dramaticBounce 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
          }
          .ring-1-active {
            transform-origin: 50px 88px;
            animation: pulseOne 1.4s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
          }
          .ring-2-active {
            transform-origin: 50px 88px;
            animation: pulseTwo 1.4s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
            animation-delay: 0.4s;
          }
        `}</style>
      </defs>

      {/* Elementos de pulso renderizados condicionalmente com as classes corretas */}
      {isHere && (
        <g>
          <circle className="ring-1-active" cx="50" cy="88" r="4" fill="none" stroke={color} />
          <circle className="ring-2-active" cx="50" cy="88" r="4" fill="none" stroke={color} />
        </g>
      )}

      {/* Adiciona dinamicamente a classe de bounce baseada no estado isHere */}
      <g className={isHere ? "bounce-active" : ""} filter="url(#shadow)">
        <path 
          d="M 50 12 C 27 12, 17 31, 17 50 C 17 65, 38 80, 50 88 C 62 80, 83 65, 83 50 C 83 31, 73 12, 50 12 Z" 
          fill="#FFFFFF" 
        />
        <path 
          d="M 50 20 C 32 20, 25 35, 25 50 C 25 62, 42 75, 50 80 C 58 75, 75 62, 75 50 C 75 35, 68 20, 50 20 Z" 
          fill={color} 
        />
        <circle cx="50" cy="45" r="10" fill="#FFFFFF" />
      </g>
    </svg>
  );
}