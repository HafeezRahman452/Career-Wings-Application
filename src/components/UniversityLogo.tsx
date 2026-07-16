import React, { useState, useEffect } from "react";

interface UniversityLogoProps {
  id: string;
  name: string;
  logo: string;
  className?: string;
  countryCode?: string;
}

const COUNTRY_FLAGS: Record<string, string> = {
  australia: "🇦🇺",
  uk: "🇬🇧",
  usa: "🇺🇸",
  canada: "🇨🇦",
  newzealand: "🇳🇿",
  ireland: "🇮🇪",
  germany: "🇩🇪",
  france: "🇫🇷"
};

export default function UniversityLogo({ id, name, logo, className = "", countryCode }: UniversityLogoProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  // Clear state when logo URL changes
  useEffect(() => {
    setImgFailed(false);
    setImgLoaded(false);
  }, [logo]);

  // Compute initials
  const initials = (() => {
    const cleanName = name.replace(/(The|University\s+of|and|for|\([^)]*\))/gi, "").trim();
    const parts = cleanName.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  })();

  // Prestigious university-specific academic styles
  const styles = (() => {
    const key = id.toLowerCase();
    
    if (key.includes("melbourne")) {
      return { bg: "#002147", border: "#E4B429", text: "#FFFFFF", emblem: "star" };
    }
    if (key.includes("sydney")) {
      return { bg: "#D61C23", border: "#E4B429", text: "#FFFFFF", emblem: "laurel" };
    }
    if (key.includes("unsw")) {
      return { bg: "#FFC627", border: "#222222", text: "#222222", emblem: "crest" };
    }
    if (key.includes("anu") || key.includes("national")) {
      return { bg: "#0A2540", border: "#C5A059", text: "#FFFFFF", emblem: "book" };
    }
    if (key.includes("monash")) {
      return { bg: "#000000", border: "#00AEEF", text: "#FFFFFF", emblem: "globe" };
    }
    if (key.includes("queensland") || key.includes("uq")) {
      return { bg: "#490E50", border: "#F7BF47", text: "#FFFFFF", emblem: "laurel" };
    }
    if (key.includes("uwa") || key.includes("western")) {
      return { bg: "#003087", border: "#E4B429", text: "#FFFFFF", emblem: "crown" };
    }
    if (key.includes("adelaide")) {
      return { bg: "#102F54", border: "#E4B429", text: "#FFFFFF", emblem: "star" };
    }
    if (key.includes("uts") || key.includes("technology")) {
      return { bg: "#000033", border: "#00ACCD", text: "#FFFFFF", emblem: "crest" };
    }
    if (key.includes("macquarie")) {
      return { bg: "#7A1A40", border: "#E4B429", text: "#FFFFFF", emblem: "laurel" };
    }
    if (key.includes("rmit")) {
      return { bg: "#00205B", border: "#E4002B", text: "#FFFFFF", emblem: "crest" };
    }
    if (key.includes("wollongong")) {
      return { bg: "#0C2340", border: "#D1A153", text: "#FFFFFF", emblem: "globe" };
    }
    if (key.includes("qut")) {
      return { bg: "#004B87", border: "#F1F2F2", text: "#FFFFFF", emblem: "crown" };
    }
    if (key.includes("deakin")) {
      return { bg: "#004F71", border: "#E35205", text: "#FFFFFF", emblem: "globe" };
    }
    if (key.includes("oxford")) {
      return { bg: "#002147", border: "#CBA135", text: "#FFFFFF", emblem: "book" };
    }
    if (key.includes("cambridge")) {
      return { bg: "#A3C1AD", border: "#002147", text: "#002147", emblem: "crown" };
    }
    if (key.includes("imperial")) {
      return { bg: "#002147", border: "#D2AD5B", text: "#FFFFFF", emblem: "star" };
    }
    if (key.includes("ucl") || key.includes("college")) {
      return { bg: "#500778", border: "#8F999E", text: "#FFFFFF", emblem: "laurel" };
    }
    if (key.includes("edinburgh")) {
      return { bg: "#002147", border: "#BD3132", text: "#FFFFFF", emblem: "crest" };
    }
    if (key.includes("manchester")) {
      return { bg: "#660099", border: "#FFCC00", text: "#FFFFFF", emblem: "crown" };
    }
    if (key.includes("kcl") || key.includes("kings")) {
      return { bg: "#990000", border: "#003366", text: "#FFFFFF", emblem: "laurel" };
    }
    if (key.includes("mit")) {
      return { bg: "#A31F34", border: "#8A8B8C", text: "#FFFFFF", emblem: "crest" };
    }
    if (key.includes("harvard")) {
      return { bg: "#A41C30", border: "#D4AF37", text: "#FFFFFF", emblem: "book" };
    }
    if (key.includes("stanford")) {
      return { bg: "#8C1515", border: "#F2C411", text: "#FFFFFF", emblem: "star" };
    }
    if (key.includes("caltech")) {
      return { bg: "#FF6C2F", border: "#FFFFFF", text: "#FFFFFF", emblem: "star" };
    }
    if (key.includes("berkeley")) {
      return { bg: "#003262", border: "#FDB515", text: "#FFFFFF", emblem: "crest" };
    }
    if (key.includes("columbia")) {
      return { bg: "#6CADDE", border: "#1D2A44", text: "#FFFFFF", emblem: "crown" };
    }
    if (key.includes("ucla")) {
      return { bg: "#2774AE", border: "#FFD100", text: "#FFFFFF", emblem: "crown" };
    }
    if (key.includes("nyu")) {
      return { bg: "#57068C", border: "#FFFFFF", text: "#FFFFFF", emblem: "laurel" };
    }
    if (key.includes("bu") || key.includes("boston")) {
      return { bg: "#CC0000", border: "#FFFFFF", text: "#FFFFFF", emblem: "crest" };
    }
    if (key.includes("toronto")) {
      return { bg: "#002A5C", border: "#E31837", text: "#FFFFFF", emblem: "book" };
    }
    if (key.includes("mcgill")) {
      return { bg: "#ED1B2F", border: "#FFFFFF", text: "#FFFFFF", emblem: "crest" };
    }
    if (key.includes("ubc") || key.includes("columbia")) {
      return { bg: "#002145", border: "#EDD59E", text: "#FFFFFF", emblem: "globe" };
    }
    if (key.includes("mcmaster")) {
      return { bg: "#7A003C", border: "#FDBF57", text: "#FFFFFF", emblem: "star" };
    }
    if (key.includes("alberta")) {
      return { bg: "#007C41", border: "#FFC72C", text: "#FFFFFF", emblem: "laurel" };
    }
    if (key.includes("auckland")) {
      return { bg: "#002E5F", border: "#E4B429", text: "#FFFFFF", emblem: "crest" };
    }
    if (key.includes("wellington")) {
      return { bg: "#004F39", border: "#E1B21F", text: "#FFFFFF", emblem: "star" };
    }
    if (key.includes("tcd") || key.includes("trinity")) {
      return { bg: "#003366", border: "#F1BC31", text: "#FFFFFF", emblem: "crest" };
    }
    if (key.includes("ucc") || key.includes("cork")) {
      return { bg: "#990000", border: "#C5A059", text: "#FFFFFF", emblem: "crest" };
    }
    if (key.includes("tum") || key.includes("munich")) {
      return { bg: "#0065BD", border: "#FFFFFF", text: "#FFFFFF", emblem: "crest" };
    }
    if (key.includes("heidelberg")) {
      return { bg: "#9E1B1B", border: "#BC9B6A", text: "#FFFFFF", emblem: "crown" };
    }
    if (key.includes("psl")) {
      return { bg: "#0F182F", border: "#DDB54A", text: "#FFFFFF", emblem: "crest" };
    }
    if (key.includes("sorbonne")) {
      return { bg: "#1E3A8A", border: "#E4B429", text: "#FFFFFF", emblem: "star" };
    }

    // Hash name to get a stable, beautiful academic theme
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colorOptions = [
      { bg: "#1E3A8A", border: "#F59E0B", text: "#FFFFFF", emblem: "book" },   
      { bg: "#7F1D1D", border: "#FBBF24", text: "#FFFFFF", emblem: "laurel" }, 
      { bg: "#065F46", border: "#34D399", text: "#FFFFFF", emblem: "globe" },  
      { bg: "#111827", border: "#9CA3AF", text: "#FFFFFF", emblem: "crest" },  
      { bg: "#4C1D95", border: "#A78BFA", text: "#FFFFFF", emblem: "crown" },  
      { bg: "#1E293B", border: "#38BDF8", text: "#FFFFFF", emblem: "star" },   
      { bg: "#312E81", border: "#F43F5E", text: "#FFFFFF", emblem: "crest" }   
    ];
    const index = Math.abs(hash) % colorOptions.length;
    return colorOptions[index];
  })();

  const renderEmblem = () => {
    const color = styles.border;
    switch (styles.emblem) {
      case "book":
        return (
          <svg className="w-3.5 h-3.5 opacity-80" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
            <path d="M6 6h10M6 10h10" />
          </svg>
        );
      case "crown":
        return (
          <svg className="w-3.5 h-3.5 opacity-80" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
            <path d="M5 20h14" strokeLinecap="round" />
          </svg>
        );
      case "star":
        return (
          <svg className="w-3.5 h-3.5 opacity-80" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        );
      case "globe":
        return (
          <svg className="w-3.5 h-3.5 opacity-80" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20M12 2a14.5 14.5 0 0 1 0 20M2 12h20" />
          </svg>
        );
      case "laurel":
      default:
        return (
          <svg className="w-3.5 h-3.5 opacity-80" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 3a9 9 0 0 0 12 0v18a9 9 0 0 0-12 0" />
            <path d="M12 6h.01M12 12h.01M12 18h.01" />
          </svg>
        );
    }
  };

  return (
    <div 
      className={`w-12 h-12 rounded-xl p-0.5 flex items-center justify-center bg-white shadow-2xs shrink-0 relative transition-transform duration-300 group-hover:scale-105 border border-gray-150 dark:border-slate-850 ${className}`}
      style={{ overflow: "visible" }}
    >
      <div className="w-full h-full rounded-[10px] overflow-hidden flex items-center justify-center relative bg-white dark:bg-slate-900">
        {(!imgLoaded || imgFailed) && (
          <div 
            style={{ backgroundColor: styles.bg }}
            className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-1 select-none transition-opacity duration-300"
          >
            <div 
              style={{ borderColor: styles.border }}
              className="absolute inset-1 border-2 border-dashed opacity-25 rounded-[8px]"
            />
            <div className="mb-0.5 scale-90">{renderEmblem()}</div>
            <span 
              style={{ color: styles.text }}
              className="text-[12px] font-black tracking-tight uppercase"
            >
              {initials}
            </span>
          </div>
        )}

        {!imgFailed && (
          <img 
            src={logo} 
            alt={name}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgFailed(true)}
            referrerPolicy="no-referrer"
            className={`w-10 h-10 object-contain z-10 transition-opacity duration-300 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
          />
        )}
      </div>

    </div>
  );
}
