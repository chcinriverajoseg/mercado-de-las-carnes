// Íconos minimalistas por categoría, usados como acento visual en las cards
// mientras no hay fotos reales de producto.

export function CategoryIcon({ id, className }) {
  const common = { className, viewBox: "0 0 44 44", fill: "none", xmlns: "http://www.w3.org/2000/svg" };

  switch (id) {
    case "vacuno":
      return (
        <svg {...common}>
          <path d="M12 20 Q6 14 10 9 Q13 7 15 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M32 20 Q38 14 34 9 Q31 7 29 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <ellipse cx="22" cy="24" rx="13" ry="11" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="17" cy="22" r="1.6" fill="currentColor" />
          <circle cx="27" cy="22" r="1.6" fill="currentColor" />
          <path d="M18 28 Q22 31 26 28" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "cerdo":
      return (
        <svg {...common}>
          <ellipse cx="22" cy="23" rx="14" ry="11" stroke="currentColor" strokeWidth="1.8" />
          <ellipse cx="22" cy="24" rx="6" ry="4.5" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="19.5" cy="24" r="0.9" fill="currentColor" />
          <circle cx="24.5" cy="24" r="0.9" fill="currentColor" />
          <path d="M11 17 Q8 13 12 12 Q15 12 14 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M33 17 Q36 13 32 12 Q29 12 30 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "pollo":
      return (
        <svg {...common}>
          <circle cx="22" cy="19" r="9" stroke="currentColor" strokeWidth="1.8" />
          <path d="M22 10 V6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M18 6 Q22 3 26 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="25" cy="17" r="1.3" fill="currentColor" />
          <path d="M29 20 L34 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M14 30 Q22 36 30 30" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "fiambreria":
      return (
        <svg {...common}>
          <circle cx="16" cy="18" r="9" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="16" cy="18" r="4" stroke="currentColor" strokeWidth="1.2" />
          <rect x="24" y="24" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.6" transform="rotate(-8 24 24)" />
        </svg>
      );
    case "abarrotes":
      return (
        <svg {...common}>
          <path d="M9 16 H35 L32 34 H12 Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M14 16 V12 Q14 7 22 7 Q30 7 30 12 V16" stroke="currentColor" strokeWidth="1.8" />
          <line x1="12" y1="22" x2="32" y2="22" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
    case "empanadas":
      return (
        <svg {...common}>
          <path d="M6 22 Q22 8 38 22 Q22 36 6 22 Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M13 22 Q22 16 31 22" stroke="currentColor" strokeWidth="1.3" strokeDasharray="2.5 3" />
        </svg>
      );
    default:
      return null;
  }
}
