export function LocationPinIcon({ size = 40, color = '#00B2A9' }) {
  return (
    <svg 
      xmlns="http://w3.org" 
      viewBox="0 0 100 100" 
      width={size} 
      height={size} 
    >
      {/* Outer Glow / Drop Shadow Shadow Effect */}
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15" />
      </filter>

      <g filter="url(#shadow)">
        {/* White Outer Border Shape */}
        <path 
          d="M 50 12 
             C 27 12, 17 31, 17 50 
             C 17 65, 38 80, 50 88 
             C 62 80, 83 65, 83 50 
             C 83 31, 73 12, 50 12 Z" 
          fill="#FFFFFF" 
        />

        {/* Sharp Inner Teal Pin Shape */}
        <path 
          d="M 50 20 
             C 32 20, 25 35, 25 50 
             C 25 62, 42 75, 50 80 
             C 58 75, 75 62, 75 50 
             C 75 35, 68 20, 50 20 Z" 
          fill={color} 
        />

        {/* Center White Dot */}
        <circle cx="50" cy="45" r="10" fill="#FFFFFF" />
      </g>
    </svg>
  );
};