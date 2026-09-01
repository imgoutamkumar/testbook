

export const ColorfulSimpleFlower = ({ className }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Top-Right Petal: Rose/Peach */}
    <path d="M50 50 C50 20, 90 10, 90 50 C90 70, 70 50, 50 50 Z" fill="url(#grad-rose)" opacity="0.85"/>
    {/* Bottom-Right Petal: Purple/Pink */}
    <path d="M50 50 C80 50, 90 90, 50 90 C30 90, 50 70, 50 50 Z" fill="url(#grad-purple)" opacity="0.85"/>
    {/* Bottom-Left Petal: Blue/Teal */}
    <path d="M50 50 C50 80, 10 90, 10 50 C10 30, 30 50, 50 50 Z" fill="url(#grad-blue)" opacity="0.85"/>
    {/* Top-Left Petal: Amber/Yellow */}
    <path d="M50 50 C20 50, 10 10, 50 10 C70 10, 50 30, 50 50 Z" fill="url(#grad-amber)" opacity="0.85"/>
    
    {/* Bright Center Dot */}
    <circle cx="50" cy="50" r="6" fill="#ffffff" opacity="0.9" />

    <defs>
      <linearGradient id="grad-rose" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f43f5e" /> {/* Rose */}
        <stop offset="100%" stopColor="#fb923c" /> {/* Orange */}
      </linearGradient>
      <linearGradient id="grad-purple" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" /> {/* Violet */}
        <stop offset="100%" stopColor="#d946ef" /> {/* Fuchsia */}
      </linearGradient>
      <linearGradient id="grad-blue" x1="100%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#3b82f6" /> {/* Blue */}
        <stop offset="100%" stopColor="#2dd4bf" /> {/* Teal */}
      </linearGradient>
      <linearGradient id="grad-amber" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" /> {/* Amber */}
        <stop offset="100%" stopColor="#fcd34d" /> {/* Yellow */}
      </linearGradient>
    </defs>
  </svg>
);




