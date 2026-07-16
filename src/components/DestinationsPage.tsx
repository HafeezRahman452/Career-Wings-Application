import React, { useState } from "react";
import { DESTINATIONS } from "../data/mockData";
import { Destination } from "../types";
import { 
  Compass, 
  MapPin, 
  Globe, 
  DollarSign, 
  Languages, 
  GraduationCap, 
  ArrowRight, 
  CheckCircle,
  Building,
  Award,
  Search,
  BookOpen,
  Calendar,
  Layers
} from "lucide-react";

interface DestinationsPageProps {
  onSelectDestination: (dest: Destination) => void;
  onBookCounselling: (destinationName: string) => void;
}

type FilterType = "all" | "qs" | "stayback" | "budget";

export default function DestinationsPage({
  onSelectDestination,
  onBookCounselling
}: DestinationsPageProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
  };

  // Advanced Filtering
  const filteredDests = DESTINATIONS.filter((dest) => {
    // Search query search match
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dest.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    if (activeFilter === "all") return true;
    if (activeFilter === "qs") {
      // Return destination with high-rank universities (e.g. at least one under ranking 30)
      return dest.popularUniversities.some(uni => uni.ranking <= 30);
    }
    if (activeFilter === "stayback") {
      // Benefits mention stay-back / work permit
      return dest.benefits.some(b => b.toLowerCase().includes("stay-back") || b.toLowerCase().includes("work rights") || b.toLowerCase().includes("work permit"));
    }
    if (activeFilter === "budget") {
      // Lower budget (e.g., average cost of living is under 1,500 or European free tuition has lower cost)
      return dest.averageCostOfLiving.toLowerCase().includes("500") || dest.averageCostOfLiving.toLowerCase().includes("1,000") || dest.averageCostOfLiving.toLowerCase().includes("1,200");
    }
    return true;
  });

  return (
    <div className="bg-[#FCFAF7] dark:bg-slate-950 min-h-screen pb-24 transition-colors">
      
      {/* Page Header Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0047AB] via-[#041D44] to-[#011430] text-white py-16 sm:py-24">
        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center space-y-6 animate-fade-in">
          <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold text-[11px] uppercase tracking-widest px-4.5 py-1.5 rounded-full inline-block shadow-lg shadow-orange-500/20">
            CWC - ISO 9001 Approved • Est. 2016
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white max-w-4xl mx-auto">
            Choose Your Target <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-300 bg-clip-text text-transparent">Overseas Education Destination</span> with Trusted Experts
          </h1>
          <p className="text-gray-250 text-sm sm:text-base max-w-2xl mx-auto font-medium">
            Discover premier education hubs, stay-back entitlements, and customized university offerings. Career Wings is your certified partner for smooth visas and direct entry clearances.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8">
            {[
              { label: "Partner Institutions", value: "1,200+" },
              { label: "Active Scholarships", value: "AU$5K - 100%" },
              { label: "Min IELTS Accept", value: "5.5 Bands" },
              { label: "Post-Study Permits", value: "Up to 4 Yrs" }
            ].map((stat, sIdx) => (
              <div key={sIdx} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center shadow-lg hover:border-white/20 transition-all">
                <p className="text-2xl sm:text-3xl font-black text-amber-400">{stat.value}</p>
                <p className="text-[11px] text-gray-300 font-bold uppercase tracking-wider mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Hub Navigation tools */}
      <div className="container mx-auto px-4 max-w-7xl -mt-8 relative z-20">
        <div className="bg-white dark:bg-slate-900 rounded-[30px] shadow-2xl border border-gray-150/45 dark:border-slate-800 p-6 sm:p-8 space-y-6 transition-colors">
          
          {/* Controls: Search and Filters Bar */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#FAF8F4] dark:bg-slate-950 p-4 rounded-2xl border border-gray-150/40 dark:border-slate-800/80">
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {[
                { type: "all", label: "All Destinations" },
                { type: "qs", label: "Top QS Rank Sites" },
                { type: "stayback", label: "Stay-back Permits" },
                { type: "budget", label: "Budget Friendly" }
              ].map((pill) => (
                <button
                  key={pill.type}
                  onClick={() => handleFilterChange(pill.type as FilterType)}
                  className={`px-4 py-2.5 rounded-xl font-black text-xs transition-all pointer-events-auto cursor-pointer ${
                    activeFilter === pill.type 
                      ? "bg-[#0047AB] text-white shadow-md shadow-blue-500/20" 
                      : "bg-white dark:bg-slate-900 text-gray-600 dark:text-slate-350 hover:bg-gray-100 dark:hover:bg-slate-850 border border-slate-200/50 dark:border-slate-800"
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* Smart Search Bar */}
            <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search country benefits..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F4] dark:bg-slate-900 border border-gray-300 dark:border-slate-800 rounded-xl text-xs font-bold text-gray-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Destinations Detailed Cards Listings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
            {filteredDests.length > 0 ? (
              filteredDests.map((dest) => (
                <div 
                  key={dest.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/50 hover:border-[#0047AB]/30 dark:border-slate-850 shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-1.5 duration-300 overflow-hidden flex flex-col justify-between"
                >
                  {/* Top Image Section */}
                  <div className="h-56 relative overflow-hidden group">
                    <img 
                      alt={`${dest.name} - Study Abroad consultants programs by Career Wings Consultants`} 
                      title={`${dest.name} - Study Abroad Consultants & Best Visa Agency Services`}
                      src={dest.bgImage} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    
                    {/* Header info */}
                    <div className="absolute bottom-4 left-5 right-5 flex justify-between items-end">
                      <div className="flex items-center gap-3">
                        <img 
                          alt={`${dest.name} flag - Career Wings Consultants Best Visa Agency`} 
                          title={`${dest.name} study visa guidance by Career Wings Consultants Study Abroad Consultants`}
                          src={dest.flagImage} 
                          className="w-10 h-10 rounded-full border border-white/80 object-cover" 
                        />
                        <div>
                          <h3 className="text-xl font-extrabold text-white leading-tight">{dest.name}</h3>
                          <p className="text-xs text-blue-300 font-bold">Best Visa Agency Support</p>
                        </div>
                      </div>
                      
                      {/* Cost metrics */}
                      <span className="bg-white/10 backdrop-blur-md text-[10.5px] font-black text-white px-3 py-1.5 rounded-lg border border-white/15">
                        {dest.averageCostOfLiving.split("/")[0]}
                      </span>
                    </div>
                  </div>

                  {/* Body Info Grid */}
                  <div className="p-6 space-y-6 flex-grow flex flex-col justify-between">
                    <div className="space-y-4">
                      <p className="text-xs text-gray-500 dark:text-slate-400 font-semibold leading-relaxed">
                        {dest.description}
                      </p>

                      {/* Benefits Highlights */}
                      <div className="space-y-2">
                        <h4 className="text-[11px] font-black uppercase text-gray-400 dark:text-slate-500 tracking-wider flex items-center gap-1">
                          <CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> Key Student Entitlements
                        </h4>
                        <div className="space-y-1.5 Pl-1">
                          {dest.benefits.slice(0, 2).map((b, bIdx) => (
                            <div key={bIdx} className="flex gap-2 items-start text-[11px] font-bold text-gray-700 dark:text-slate-350">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5"></span>
                              <span>{b}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Partners Showcase */}
                      <div className="space-y-2.5">
                        <h4 className="text-[11px] font-black uppercase text-gray-400 dark:text-slate-500 tracking-wider flex items-center gap-1">
                          <GraduationCap className="h-3.5 w-3.5 text-blue-500" /> Popular Partner Universities
                        </h4>
                        <div className="grid grid-cols-2 gap-3.5">
                          {dest.popularUniversities.map((uni) => (
                            <div key={uni.id} className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-gray-100 dark:border-slate-800 text-[10px] space-y-1 flex flex-col justify-between">
                              <p className="font-extrabold text-gray-900 dark:text-slate-200 line-clamp-1">{uni.name}</p>
                              <div className="flex items-center justify-between font-semibold text-[9px] text-gray-400">
                                <span className="text-blue-600 dark:text-blue-400">Rank #{uni.ranking}</span>
                                <span className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-extrabold px-1 rounded">{uni.scholarshipAvailable.split(" ")[0]}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom CTA Block */}
                    <div className="pt-6 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between gap-4 mt-4">
                      <div className="text-[10px] text-gray-400 dark:text-slate-500 font-semibold">
                        <p>IELTS benchmarks:</p>
                        <p className="font-bold text-gray-700 dark:text-slate-300 text-[11px]">{dest.ieltsRequirement}</p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => onSelectDestination(dest)}
                          className="px-4 py-2 rounded-xl text-xs font-bold border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 pointer-events-auto cursor-pointer"
                        >
                          Full Details
                        </button>
                        <button
                          onClick={() => onBookCounselling(dest.name)}
                          className="bg-[#0047AB] hover:bg-blue-700 text-white font-black text-xs px-4 py-2 rounded-xl shadow-md flex items-center gap-1 pointer-events-auto cursor-pointer"
                        >
                          Counselling <ArrowRight className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-16 space-y-4">
                <Globe className="h-12 w-12 text-gray-300 mx-auto" />
                <h3 className="font-bold text-gray-900 dark:text-white text-base">No destinations match your filters</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">Try typing a different keyword or resetting your filter requirements.</p>
                <button
                  onClick={() => { setActiveFilter("all"); setSearchQuery(""); }}
                  className="bg-[#0047AB] text-white px-5 py-2 rounded-xl text-xs font-bold"
                >
                  Reset Options
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
