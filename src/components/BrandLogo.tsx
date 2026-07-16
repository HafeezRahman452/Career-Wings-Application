import React from "react";

interface BrandLogoProps {
  className?: string;
  lightOnly?: boolean;
  layout?: "horizontal" | "stacked";
}

export default function BrandLogo({ 
  className = "", 
  lightOnly = false,
  layout = "horizontal" 
}: BrandLogoProps) {
  
  const isStacked = layout === "stacked";

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      {isStacked ? (
        // Stacked Layout (e.g. for footer or major screen showcases)
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-amber-50 to-blue-50 dark:from-slate-900 dark:to-slate-950 p-2 shadow-sm border border-amber-100 dark:border-slate-800">
            {/* Majestic Wing & Globe Emblem */}
            <svg 
              viewBox="0 0 100 100" 
              className="w-20 h-20 filter drop-shadow-[0_4px_6px_rgba(212,175,55,0.15)]"
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="42" stroke="#0047AB" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
              {/* Globe grid */}
              <ellipse cx="50" cy="50" rx="42" ry="16" stroke="#0047AB" strokeWidth="1" opacity="0.2" />
              <ellipse cx="50" cy="50" rx="16" ry="42" stroke="#0047AB" strokeWidth="1" opacity="0.2" />
              {/* Wing paths designed beautifully */}
              <path 
                d="M32 55C32 55 24 45 35 34C44 25 68 28 72 30C72 30 52 35 44 44C36 53 32 55 32 55Z" 
                fill="url(#gradient-gold)" 
              />
              <path 
                d="M26 62C26 62 18 52 30 40C39 30 64 32 68 34C68 34 47 40 39 49C31 58 26 62 26 62Z" 
                fill="url(#gradient-blue)" 
                opacity="0.9"
              />
              <path 
                d="M42 42L47 37L52 42L47 47L42 42Z" 
                fill="#F59E0B" 
                className="animate-pulse"
              />
              <defs>
                <linearGradient id="gradient-gold" x1="24" y1="30" x2="72" y2="55" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="50%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#FBBF24" />
                </linearGradient>
                <linearGradient id="gradient-blue" x1="18" y1="34" x2="68" y2="62" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#0047AB" />
                  <stop offset="100%" stopColor="#1E3A8A" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-black tracking-wider text-gray-950 dark:text-gray-900 font-sans uppercase">
              CAREER <span className="text-[#0047AB]">WINGS</span>
            </span>
            <span className="block text-xs font-extrabold tracking-[0.3em] text-[#F59E0B] uppercase mt-1">
              CONSULTANTS
            </span>
          </div>
        </div>
      ) : (
        // Horizontal Layout (e.g. for header navbar which matches perfectly)
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-amber-50 to-blue-50 dark:from-slate-900 dark:to-slate-950 p-1 border border-amber-100/70 dark:border-slate-800">
            {/* Wing Emblem */}
            <svg 
              viewBox="0 0 100 100" 
              className="w-9 h-9" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="44" stroke="#0047AB" strokeWidth="2" strokeDasharray="4 4" opacity="0.4" />
              {/* Outer Golden Wing */}
              <path 
                d="M30 58C30 58 20 45 32 32C42 21 68 25 74 27C74 27 52 32 43 43C34 54 30 58 30 58Z" 
                fill="url(#gradient-gold-h)" 
              />
              {/* Inner Blue Wing */}
              <path 
                d="M24 65C24 65 15 53 28 39C38 27 64 30 70 32C70 32 47 38 38 49C29 60 24 65 24 65Z" 
                fill="url(#gradient-blue-h)" 
                opacity="0.95"
              />
              <defs>
                <linearGradient id="gradient-gold-h" x1="20" y1="25" x2="74" y2="58" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#D4AF37" />
                </linearGradient>
                <linearGradient id="gradient-blue-h" x1="15" y1="30" x2="70" y2="65" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#0047AB" />
                  <stop offset="100%" stopColor="#1E3A8A" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-[15.5px] font-black tracking-wider text-gray-950 dark:text-gray-950 font-sans uppercase leading-none">
              CAREER <span className="text-[#0047AB] dark:text-[#0047AB]">WINGS</span>
            </span>
            <span className="text-[9.5px] font-extrabold tracking-[0.25em] text-[#F59E0B] uppercase mt-1 leading-none">
              CONSULTANTS
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

