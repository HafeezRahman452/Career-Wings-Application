import React from "react";
import { 
  Compass, 
  Home, 
  Search, 
  GraduationCap, 
  PhoneCall, 
  ArrowLeft, 
  BookOpen, 
  MapPin, 
  FileQuestion,
  HelpCircle,
  Building2
} from "lucide-react";

interface NotFoundPageProps {
  onNavigateHome: () => void;
  onNavigateSearch: () => void;
  onNavigateDestinations: () => void;
  onNavigateEdu: () => void;
  onBookCounselling: (reason?: string) => void;
  currentAttemptedPath?: string;
}

export default function NotFoundPage({
  onNavigateHome,
  onNavigateSearch,
  onNavigateDestinations,
  onNavigateEdu,
  onBookCounselling,
  currentAttemptedPath
}: NotFoundPageProps) {
  return (
    <div id="page-not-found" className="min-h-[75vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors">
      <div className="max-w-3xl w-full text-center space-y-8">
        
        {/* Visual 404 Graphic */}
        <div className="relative inline-block">
          <div className="text-8xl sm:text-9xl font-black tracking-widest text-slate-200 dark:text-slate-800 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative p-5 bg-gradient-to-tr from-[#0047AB] to-indigo-600 rounded-3xl shadow-xl shadow-blue-500/20 text-white animate-bounce duration-1000">
              <Compass className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
            </div>
          </div>
        </div>

        {/* Heading and Description */}
        <div className="space-y-3 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-150 dark:border-blue-900/50 text-[#0047AB] dark:text-blue-400 text-xs font-black uppercase tracking-wider">
            <FileQuestion className="h-3.5 w-3.5" />
            <span>Page or Pathway Not Found</span>
          </div>
          
          <h1 className="text-2.5xl sm:text-4xl font-black text-gray-950 dark:text-white tracking-tight">
            Looks Like You've Wandered Off The Campus Map!
          </h1>
          
          <p className="text-sm sm:text-base text-gray-500 dark:text-slate-400 font-medium leading-relaxed">
            The page you are looking for may have been relocated, renamed, or is currently undergoing an intake update. Don't worry, your study abroad journey is right on track.
          </p>

          {currentAttemptedPath && (
            <p className="text-xs text-gray-400 dark:text-slate-500 font-mono bg-slate-100 dark:bg-slate-850 py-1.5 px-3 rounded-lg inline-block">
              Requested: <span className="text-rose-500 font-bold">{currentAttemptedPath}</span>
            </p>
          )}
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0047AB] hover:bg-blue-700 text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            <Home className="h-4 w-4" />
            <span>Return to Home</span>
          </button>

          <button
            onClick={() => onBookCounselling("Help finding correct page or overseas program")}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 text-gray-800 dark:text-slate-200 border border-gray-200 dark:border-slate-800 font-extrabold text-sm shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <PhoneCall className="h-4 w-4 text-emerald-600" />
            <span>Talk to a Counsellor</span>
          </button>
        </div>

        {/* Suggested Pathways Grid */}
        <div className="pt-6 border-t border-gray-150 dark:border-slate-800 text-left">
          <p className="text-xs font-black uppercase tracking-wider text-gray-400 dark:text-slate-500 mb-4 text-center">
            Or Explore These Popular Destinations & Portals:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-2xl mx-auto">
            <button
              onClick={onNavigateSearch}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-md transition-all text-left group cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-1.5">
                <div className="p-2 bg-blue-50 dark:bg-blue-950/60 rounded-xl text-[#0047AB] dark:text-blue-400 group-hover:scale-110 transition-transform">
                  <Search className="h-4 w-4" />
                </div>
                <h4 className="text-xs font-black text-gray-900 dark:text-white">Find Courses</h4>
              </div>
              <p className="text-[11px] text-gray-400 dark:text-slate-500 font-medium">
                Search 1000+ university intakes, fees & scholarships.
              </p>
            </button>

            <button
              onClick={onNavigateDestinations}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-md transition-all text-left group cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-1.5">
                <div className="p-2 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                  <GraduationCap className="h-4 w-4" />
                </div>
                <h4 className="text-xs font-black text-gray-900 dark:text-white">Top Countries</h4>
              </div>
              <p className="text-[11px] text-gray-400 dark:text-slate-500 font-medium">
                USA, UK, Canada, Australia, Germany & Ireland guides.
              </p>
            </button>

            <button
              onClick={onNavigateEdu}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-md transition-all text-left group cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-1.5">
                <div className="p-2 bg-indigo-50 dark:bg-indigo-950/60 rounded-xl text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                  <Building2 className="h-4 w-4" />
                </div>
                <h4 className="text-xs font-black text-gray-900 dark:text-white">Career Wings Edu</h4>
              </div>
              <p className="text-[11px] text-gray-400 dark:text-slate-500 font-medium">
                CWC Group brands, visas & education funding wings.
              </p>
            </button>
          </div>
        </div>

        {/* Support Help Footnote */}
        <div className="pt-2 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-slate-400 font-medium">
          <MapPin className="h-3.5 w-3.5 text-blue-600 shrink-0" />
          <span>Need immediate assistance? Visit our Dilsukhnagar / Chaitanyapuri office or call <strong>+91 90521 41168</strong></span>
        </div>

      </div>
    </div>
  );
}
