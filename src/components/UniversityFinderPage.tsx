import React, { useState, useMemo, useEffect } from "react";
import { 
  Building, 
  Search, 
  MapPin, 
  GraduationCap, 
  Users, 
  Globe, 
  Heart, 
  Info, 
  ChevronRight, 
  ChevronLeft,
  X, 
  ArrowLeft, 
  CheckCircle2, 
  SlidersHorizontal,
  Calendar,
  DollarSign,
  Briefcase,
  HelpCircle,
  FileText
} from "lucide-react";
import { UNIVERSITIES_BY_COUNTRY } from "./DestinationDetailPage";
import UniversityLogo from "./UniversityLogo";

interface University {
  id: string;
  name: string;
  location: string;
  logo: string;
  ranking: string;
  intlStudents: string;
  courses: string;
  detailsUrl: string;
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

interface UniversityFinderPageProps {
  onBack: () => void;
  onBookCounselling: (details: string) => void;
  initialCountry?: string;
  onSelectUniversity?: (uni: any) => void;
}

// Interactive admissions and courses mocked intelligently per university
const ADDITIONAL_INFO_MOCK: Record<string, {
  intakes: string[];
  gpaReq: string;
  ieltsReq: string;
  approxFees: string;
  popularPrograms: string[];
  scholarships: string;
}> = {
  melbourne: {
    intakes: ["February Semester", "July Semester"],
    gpaReq: "3.2 / 4.0",
    ieltsReq: "6.5 Academic (no band below 6.0)",
    approxFees: "$43,500 AUD / year",
    popularPrograms: ["Master of Information Technology", "Master of Engineering (Computer)", "Master of Management (Finance)"],
    scholarships: "Melbourne Chancellor's Scholarship provides 100% flat tuition relief"
  },
  sydney: {
    intakes: ["February Semester", "July Semester"],
    gpaReq: "3.1 / 4.0",
    ieltsReq: "6.5 Academic (no band below 6.0)",
    approxFees: "$44,000 AUD / year",
    popularPrograms: ["Master of Data Science", "Master of Business Administration", "MSc in Health Technology"],
    scholarships: "Vice-Chancellor's International Scholarship (up to $40,000 AUD)"
  },
  anu: {
    intakes: ["February Semester", "July Semester"],
    gpaReq: "3.2 / 4.0",
    ieltsReq: "6.5 Academic (no band below 6.0)",
    approxFees: "$39,500 AUD / year",
    popularPrograms: ["Master of Business Administration", "MSc in computer Science", "Master of Advanced Computing", "Master of Public Health"],
    scholarships: "Up to $10,000 AUD flat grant based on entry merit score"
  },
  unsw: {
    intakes: ["February (T1)", "June (T2)", "September (T3)"],
    gpaReq: "3.0 / 4.0",
    ieltsReq: "6.5 Academic (no band below 6.0)",
    approxFees: "$41,000 AUD / year",
    popularPrograms: ["BSc in Data Science", "Master of Engineering Science", "Master of Professional Accounting"],
    scholarships: "UNSW Future of Change scholarship covers up to 20% tuition fee waiver"
  },
  uq: {
    intakes: ["February Semester", "July Semester"],
    gpaReq: "3.0 / 4.0",
    ieltsReq: "6.5 Academic (no band below 6.0)",
    approxFees: "$38,400 AUD / year",
    popularPrograms: ["Master of Biotechnology", "Master of Information Technology", "MBA Executive Program"],
    scholarships: "UQ High Achiever Global Scholarship (Flat $10,000 AUD)"
  },
  adelaide: {
    intakes: ["February Semester", "July Semester"],
    gpaReq: "2.8 / 4.0",
    ieltsReq: "6.5 Academic (no band below 6.0)",
    approxFees: "$36,200 AUD / year",
    popularPrograms: ["Master of Cyber Security", "Bachelor of Engineering (Hons)", "Master of Finance"],
    scholarships: "Global Citizens Scholarship offers 15% to 30% flat tuition support"
  },
  oxford: {
    intakes: ["October Quarter"],
    gpaReq: "3.8 / 4.0",
    ieltsReq: "7.5 Academic (no band below 7.0)",
    approxFees: "£36,000 GBP / year",
    popularPrograms: ["MSc in Advanced Computer Science", "Oxford MBA", "MSc in Social Data Science"],
    scholarships: "Clarendon Fund (Full Postgraduate Tuition & Living Stipend)"
  },
  cambridge: {
    intakes: ["October Quarter"],
    gpaReq: "3.8 / 4.0",
    ieltsReq: "7.5 Academic (no band below 7.0)",
    approxFees: "£35,000 GBP / year",
    popularPrograms: ["MPhil in Machine Learning", "MPhil in Finance and Economics", "MBA Program"],
    scholarships: "Gates Cambridge Scholarship (Fully Funded with annual allowance)"
  },
  mit: {
    intakes: ["September (Fall)"],
    gpaReq: "3.9 / 4.0",
    ieltsReq: "7.5 Academic (no band below 7.0)",
    approxFees: "$56,500 USD / year",
    popularPrograms: ["MS in Electrical Engineering & CS", "MIT Sloan MBA", "MS in Analytics"],
    scholarships: "MIT Graduate Fellowship & Assistantships (Fully Funded tuition + stipend)"
  },
  harvard: {
    intakes: ["September (Fall)"],
    gpaReq: "3.8 / 4.0",
    ieltsReq: "7.5 Academic (no band below 7.0)",
    approxFees: "$55,000 USD / year",
    popularPrograms: ["Harvard MBA", "MS in Computational Science", "MS in Data Science"],
    scholarships: "Harvard Committee on General Scholarships (Varying flat grants)"
  },
  ucl: {
    intakes: ["September intake only"],
    gpaReq: "3.5 / 4.0",
    ieltsReq: "7.0 Academic (no band below 6.5)",
    approxFees: "£28,500 GBP / year",
    popularPrograms: ["MSc in Advanced Software Engineering", "MSc Management", "BSc Economics"],
    scholarships: "UCL Global Undergraduate Scholarship (varies up to full waiver)"
  },
  manchester: {
    intakes: ["September Semester"],
    gpaReq: "3.2 / 4.0",
    ieltsReq: "6.5 Academic (no band below 6.0)",
    approxFees: "£25,400 GBP / year",
    popularPrograms: ["MSc in Data Science", "MSc Finance & Investment", "BSc Aerospace Engineering"],
    scholarships: "Manchester Great Scholarships (Flat £10,000 grant)"
  },
  edinburgh: {
    intakes: ["September Semester"],
    gpaReq: "3.4 / 4.0",
    ieltsReq: "7.0 Academic (no band below 6.5)",
    approxFees: "£26,900 GBP / year",
    popularPrograms: ["MSc Computer Science", "MSc Renewable Energy", "MSc High Performance Computing"],
    scholarships: "Edinburgh Global Scholarship Support (Flat £5,000 flat discount)"
  },
  stanford: {
    intakes: ["September Quarter"],
    gpaReq: "3.8 / 4.0",
    ieltsReq: "7.5 Academic (no band below 7.0)",
    approxFees: "$52,000 USD / year",
    popularPrograms: ["MS in Computer Science", "Stanford MBA Program", "MS in Civil & Environmental Engineering"],
    scholarships: "Knight-Hennessy Scholars Program (Provides Full-Funding & Stipend)"
  },
  nyu: {
    intakes: ["September (Fall)", "January (Spring)"],
    gpaReq: "3.3 / 4.0",
    ieltsReq: "7.0 Academic (no band below 6.5)",
    approxFees: "$49,800 USD / year",
    popularPrograms: ["MS in Business Analytics", "Master of Computer Science (Tandon)", "MS in Cyber Security"],
    scholarships: "Tandon School of Engineering Merit Scholarship (up to $20,000/yr)"
  },
  bu: {
    intakes: ["September (Fall)", "January (Spring)"],
    gpaReq: "3.0 / 4.0",
    ieltsReq: "6.5 Academic (no band below 6.0)",
    approxFees: "$46,500 USD / year",
    popularPrograms: ["MS in Computer Information Systems", "MS in Applied Business Analytics", "MBA Program"],
    scholarships: "BU Trustee Scholarship covers full tuition waivers for prime candidates"
  },
  toronto: {
    intakes: ["September (Fall)"],
    gpaReq: "3.5 / 4.0",
    ieltsReq: "7.0 Academic (no band below 6.5)",
    approxFees: "$45,000 CAD / year",
    popularPrograms: ["MSc in Applied Computing", "Master of Finance", "Master of Engineering (Aerospace)"],
    scholarships: "Lester B. Pearson International Scholarship (Full Coverage for high merit)"
  },
  mcgill: {
    intakes: ["September (Fall)"],
    gpaReq: "3.4 / 4.0",
    ieltsReq: "6.5 Academic (no band below 6.0)",
    approxFees: "$39,800 CAD / year",
    popularPrograms: ["Master of Business Administration", "M.Eng in Electrical Engineering", "MSc Experimental Medicine"],
    scholarships: "McGill Entrance Scholarship Scheme (ranging up to $12,000 CAD)"
  },
  ubc: {
    intakes: ["September (Fall)", "January (Spring)"],
    gpaReq: "3.2 / 4.0",
    ieltsReq: "6.5 Academic (no band below 6.0)",
    approxFees: "$38,500 CAD / year",
    popularPrograms: ["Master of Data Science", "Master of Advanced Materials Engineering", "BSc Cognitive Systems"],
    scholarships: "International Major Entrance Scholarship (varies based on profile)"
  },
  auckland: {
    intakes: ["FebruarySemester", "July Semester"],
    gpaReq: "3.0 / 4.0",
    ieltsReq: "6.5 Academic (no band below 6.0)",
    approxFees: "$39,000 NZD / year",
    popularPrograms: ["Master of Engineering Studies", "Master of Management", "Master of Professional Accounting"],
    scholarships: "University of Auckland International Student Excellence Scholarship ($10,000 NZD)"
  },
  tcd: {
    intakes: ["September Semester"],
    gpaReq: "3.3 / 4.0",
    ieltsReq: "6.5 Academic (no band below 6.0)",
    approxFees: "€24,500 EUR / year",
    popularPrograms: ["MSc in Computer Science (Data Science)", "MSc in Finance", "MBA Program"],
    scholarships: "Trinity College Dublin Global Excellence Postgraduate Scholarship (Up to €5,000 EUR)"
  }
};

const DEFAULT_ADDITIONAL_INFO = {
  intakes: ["January/February", "September/October"],
  gpaReq: "3.0 / 4.0 (Or equivalent 65% in University studies)",
  ieltsReq: "6.5 Academic overall (no band below 6.0)",
  approxFees: "€0 (Public Universities in Germany) or €3,000 EUR / semester",
  popularPrograms: ["MSc in Software Engineering", "Master's of Data Science", "MBA International Business"],
  scholarships: "DAAD Merit Scholarships & Local State Tuition waiver exemptions available"
};

export default function UniversityFinderPage({
  onBack,
  onBookCounselling,
  initialCountry = "all",
  onSelectUniversity
}: UniversityFinderPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(initialCountry);
  const [selectedRanking, setSelectedRanking] = useState("all"); // "all", "top50", "top100"
  const [selectedIntake, setSelectedIntake] = useState("all"); // "all", "spring", "fall"
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeUniDetail, setActiveUniDetail] = useState<University | null>(null);

  // Sorting & Pagination States
  const [sortBy, setSortBy] = useState("rank-asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Convert map to flat list
  const allUniversities = useMemo(() => {
    let list: University[] = [];
    Object.entries(UNIVERSITIES_BY_COUNTRY).forEach(([countryId, unis]) => {
      unis.forEach((u) => {
        list.push({
          ...u,
          // Store country identifier for filtering
          id: u.id,
          detailsUrl: "", // Reset/Remove IDP link to keep purely local
          countryCode: countryId
        });
      });
    });
    return list;
  }, []);

  // Filtered List based on criteria
  const filteredUnis = useMemo(() => {
    return allUniversities.filter((uni) => {
      // Country Filter
      if (selectedCountry !== "all") {
        const uniLocationLower = uni.location.toLowerCase();
        let targetMatch = selectedCountry.toLowerCase();
        if (targetMatch === "uk") targetMatch = "united kingdom";
        if (targetMatch === "usa") targetMatch = "united states";
        if (targetMatch === "newzealand") targetMatch = "new zealand";
        
        if (!uniLocationLower.includes(targetMatch)) {
          return false;
        }
      }

      // Search Query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesName = uni.name.toLowerCase().includes(query);
        const matchesLocation = uni.location.toLowerCase().includes(query);
        if (!matchesName && !matchesLocation) {
          return false;
        }
      }

      // Ranking Filter
      if (selectedRanking !== "all") {
        const rankNum = parseInt(uni.ranking, 10);
        if (isNaN(rankNum)) return true;
        if (selectedRanking === "top55") {
          return rankNum <= 55;
        }
        if (selectedRanking === "top100") {
          return rankNum <= 100;
        }
      }

      return true;
    });
  }, [allUniversities, selectedCountry, searchQuery, selectedRanking]);

  // Combined Sort with Filter
  const sortedAndFilteredUnis = useMemo(() => {
    const list = [...filteredUnis];
    list.sort((a, b) => {
      if (sortBy === "rank-asc") {
        const rA = parseInt(a.ranking, 10) || 9999;
        const rB = parseInt(b.ranking, 10) || 9999;
        return rA - rB;
      }
      if (sortBy === "rank-desc") {
        const rA = parseInt(a.ranking, 10) || 0;
        const rB = parseInt(b.ranking, 10) || 0;
        return rB - rA;
      }
      if (sortBy === "name-asc") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "name-desc") {
        return b.name.localeCompare(a.name);
      }
      if (sortBy === "students-desc") {
        const sA = parseInt(a.intlStudents.replace(/,|[^\d]/g, ""), 10) || 0;
        const sB = parseInt(b.intlStudents.replace(/,|[^\d]/g, ""), 10) || 0;
        return sB - sA;
      }
      return 0;
    });
    return list;
  }, [filteredUnis, sortBy]);

  // Reset page to 1 when search or filter triggers
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCountry, selectedRanking]);

  // Paginated List
  const paginatedUnis = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedAndFilteredUnis.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedAndFilteredUnis, currentPage]);

  const totalPages = Math.ceil(sortedAndFilteredUnis.length / itemsPerPage);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  const getAdditionalInfo = (uniId: string) => {
    return ADDITIONAL_INFO_MOCK[uniId] || DEFAULT_ADDITIONAL_INFO;
  };

  return (
    <div className="bg-[#FCFAF7] dark:bg-slate-950 min-h-screen pb-16 md:pb-24 transition-colors">
      
      {/* Search Header Banner */}
      <div className="bg-gradient-to-br from-[#0047AB] to-[#0a2f7c] text-white py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-[1440px] space-y-6">
          
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-all text-xs font-black shrink-0 tracking-wide uppercase"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Explorations
          </button>

          <div className="space-y-3">
            <span className="text-amber-300 text-xs font-black tracking-widest uppercase block animate-pulse">
              100% Free Verification & Registration Portal
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight max-w-4xl">
              Find Your Perfect Global University Match
            </h1>
            <p className="text-sm md:text-base text-blue-100 max-w-2xl font-medium leading-relaxed">
              Explore accredited institutions, trace official structural guidelines, review live tuition schemes, and apply with zero consulting charge.
            </p>
          </div>
        </div>
      </div>

      {/* Main Filter & Grid Container */}
      <div className="container mx-auto px-4 max-w-[1440px] mt-8 md:mt-12">
        <div className="grid grid-cols-12 gap-8">
          
          {/* Static Sidebar Filter Panel for large screens */}
          <aside className="col-span-12 lg:col-span-3 bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 rounded-3xl p-6 h-fit space-y-6 shadow-sm">
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 dark:text-slate-500 tracking-wider uppercase">Filter Directory</span>
              <SlidersHorizontal className="h-4.5 w-4.5 text-gray-400" />
            </div>

            {/* Country Selector */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wider">
                Study Destination
              </h4>
              <div className="flex flex-col gap-1.5">
                {[
                  { id: "all", label: "🪐 All Destinations" },
                  { id: "australia", label: "🇦🇺 Australia" },
                  { id: "uk", label: "🇬🇧 United Kingdom" },
                  { id: "usa", label: "🇺🇸 United States" },
                  { id: "canada", label: "🇨🇦 Canada" },
                  { id: "newzealand", label: "🇳🇿 New Zealand" },
                  { id: "ireland", label: "🇮🇪 Ireland" },
                  { id: "germany", label: "🇩🇪 Germany" },
                  { id: "france", label: "🇫🇷 France" }
                ].map((country) => (
                  <button
                    key={country.id}
                    onClick={() => setSelectedCountry(country.id)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                      selectedCountry === country.id 
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400 border border-blue-200/40" 
                        : "text-gray-650 hover:bg-slate-50 hover:text-gray-950 dark:text-slate-350 dark:hover:bg-slate-850"
                    }`}
                  >
                    <span>{country.label}</span>
                    {selectedCountry === country.id && (
                      <CheckCircle2 className="h-4 w-4 text-[#0047AB] dark:text-blue-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-100 dark:border-slate-800" />

            {/* Rankings Range Selector */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wider">
                World Rank Group
              </h4>
              <div className="flex flex-col gap-1.5">
                {[
                  { id: "all", label: "Every Accredited Rank" },
                  { id: "top55", label: "Top 55 Globally" },
                  { id: "top100", label: "Top 100 Globally" }
                ].map((rankOpt) => (
                  <button
                    key={rankOpt.id}
                    onClick={() => setSelectedRanking(rankOpt.id)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                      selectedRanking === rankOpt.id 
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400 border border-blue-200/40" 
                        : "text-gray-650 hover:bg-slate-50 hover:text-gray-950 dark:text-slate-350 dark:hover:bg-slate-850"
                    }`}
                  >
                    <span>{rankOpt.label}</span>
                    {selectedRanking === rankOpt.id && (
                      <CheckCircle2 className="h-4 w-4 text-[#0047AB]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Info Badge */}
            <div className="bg-amber-50/70 border border-amber-100 rounded-2xl p-4 space-y-2">
              <h5 className="text-[11px] font-black text-amber-800 uppercase tracking-wider flex items-center gap-1">
                <Info className="h-3.5 w-3.5" /> Career Wings FastLane
              </h5>
              <p className="text-[11px] text-amber-700 leading-relaxed font-semibold">
                Universities marked with the FastLane badge offer priority offer-letter decisions within 24 to 72 hours of complete file filing.
              </p>
            </div>

          </aside>

          {/* Directory Content Area */}
          <main className="col-span-12 lg:col-span-9 space-y-6">
            
            {/* Top Toolbar Container */}
            <div className="bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 rounded-3xl p-4 sm:p-5 flex flex-col xl:flex-row gap-4 items-center justify-between shadow-xs">
              
              {/* Left Side: Search Bar & Stats */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:max-w-xl">
                <div className="relative w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search university name, cities, or states..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-10 py-3 bg-slate-50 hover:bg-slate-100/60 focus:bg-white rounded-2xl border border-gray-200/60 dark:border-slate-800 dark:bg-slate-950 text-xs sm:text-sm text-gray-800 dark:text-white placeholder-gray-450 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-semibold"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 font-bold"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <div className="text-xs select-none font-bold text-gray-550 dark:text-slate-400 shrink-0 whitespace-nowrap">
                  Showing <span className="text-[#0047AB] dark:text-blue-400 font-extrabold">{sortedAndFilteredUnis.length}</span> institutions
                </div>
              </div>

              {/* Right Side: Sorting select block right of search */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full xl:w-auto xl:justify-end">
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-2 rounded-2xl border border-gray-200/60 dark:border-slate-800 text-xs font-bold text-gray-750 dark:text-slate-350 w-full sm:w-auto justify-between shadow-2xs">
                  <span className="text-gray-400 whitespace-nowrap">Sort By:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent focus:outline-none cursor-pointer text-gray-800 dark:text-white font-extrabold"
                  >
                    <option value="rank-asc" className="dark:bg-slate-900 text-slate-800 dark:text-slate-200">🏆 World Ranking (Best First)</option>
                    <option value="rank-desc" className="dark:bg-slate-900 text-slate-800 dark:text-slate-200">🏆 World Ranking (Lowest First)</option>
                    <option value="name-asc" className="dark:bg-slate-900 text-slate-800 dark:text-slate-200">🔤 Alphabetical (A to Z)</option>
                    <option value="name-desc" className="dark:bg-slate-900 text-slate-800 dark:text-slate-200">🔤 Alphabetical (Z to A)</option>
                    <option value="students-desc" className="dark:bg-slate-900 text-slate-800 dark:text-slate-200">👥 Intl Students (Highest First)</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-2 rounded-2xl border border-gray-200/60 dark:border-slate-800 text-xs font-bold text-gray-750 dark:text-slate-350 xl:hidden w-full sm:w-auto justify-between shadow-2xs">
                  <span className="text-gray-450 whitespace-nowrap">Rank Group:</span>
                  <select
                    value={selectedRanking}
                    onChange={(e) => setSelectedRanking(e.target.value)}
                    className="bg-transparent focus:outline-none cursor-pointer text-gray-800 dark:text-white font-extrabold"
                  >
                    <option value="all" className="dark:bg-slate-900 text-slate-800 dark:text-slate-200">All Rankings</option>
                    <option value="top55" className="dark:bg-slate-900 text-slate-800 dark:text-slate-200">Top 55 Globally</option>
                    <option value="top100" className="dark:bg-slate-900 text-slate-800 dark:text-slate-200">Top 100 Globally</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Universities Grid */}
            {paginatedUnis.length > 0 ? (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginatedUnis.map((uni) => {
                    const isFav = favorites.includes(uni.id);
                    return (
                      <div 
                        key={uni.id} 
                        className="bg-white dark:bg-slate-900 border border-gray-150/80 dark:border-slate-800/80 rounded-3xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 relative group"
                      >
                        <div className="space-y-4">
                          {/* FastLane badge line */}
                          <div className="flex justify-between items-center">
                            <span className="bg-[#006e67] text-white text-[10.5px] font-black uppercase tracking-wider px-2.5 py-1 rounded flex items-center gap-1">
                              FastLane <Info className="h-3.5 w-3.5 shrink-0" />
                            </span>
                            <div className="flex items-center gap-2">
                              {/* Country Flag representation right next to the heart - wrapped in circular emblem */}
                              {uni.countryCode && COUNTRY_FLAGS[uni.countryCode] && (
                                <div 
                                  title={uni.location}
                                  className="w-7 h-7 rounded-full bg-slate-50 dark:bg-slate-800 border border-gray-150 dark:border-slate-700 flex items-center justify-center shadow-3xs hover:scale-105 active:scale-95 transition-all select-none"
                                >
                                  <span className="text-[14px] leading-none select-none">
                                    {COUNTRY_FLAGS[uni.countryCode]}
                                  </span>
                                </div>
                              )}
                              <button 
                                type="button"
                                onClick={() => toggleFavorite(uni.id)}
                                className="text-gray-300 hover:text-rose-500 hover:scale-110 active:scale-95 transition-all cursor-pointer p-1"
                              >
                                <Heart className={`h-5 w-5 ${isFav ? "fill-rose-500 text-rose-500" : "text-gray-300"}`} />
                              </button>
                            </div>
                          </div>

                          {/* University Logo Shield with overlaid country flag */}
                          <UniversityLogo id={uni.id} name={uni.name} logo={uni.logo} countryCode={uni.countryCode} />

                          {/* Institution Name */}
                          <div className="space-y-1">
                            <h4 className="text-sm font-black text-gray-955 dark:text-white tracking-tight line-clamp-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors h-10">
                              {uni.name}
                            </h4>
                            <p className="text-[11px] text-gray-400 font-extrabold flex items-center gap-1 uppercase tracking-wider">
                              <MapPin className="h-3 w-3 text-red-500" /> {uni.location}
                            </p>
                            <button
                              type="button"
                              onClick={() => {
                                if (onSelectUniversity) {
                                  onSelectUniversity(uni);
                                } else {
                                  setActiveUniDetail(uni);
                                }
                              }}
                              className="text-[#0047AB] dark:text-blue-400 text-xs font-black inline-flex items-center gap-0.5 hover:underline pt-1 cursor-pointer"
                            >
                              View all courses <ChevronRight className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          <div className="border-t border-gray-100 dark:border-slate-800 my-4" />

                          {/* Specifications */}
                          <div className="space-y-2 text-xs">
                            <div className="flex items-center gap-3 text-gray-600 dark:text-slate-300 font-semibold">
                              <GraduationCap className="h-4 w-4 text-[#0047AB] dark:text-blue-400 shrink-0" />
                              <span>THE World Ranking: {uni.ranking}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600 dark:text-slate-300 font-semibold">
                              <Users className="h-4 w-4 text-orange-500 shrink-0" />
                              <span>International students: {uni.intlStudents}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600 dark:text-slate-300 font-semibold">
                              <Globe className="h-4 w-4 text-emerald-500 shrink-0" />
                              <span>{uni.courses}</span>
                            </div>
                          </div>
                        </div>

                        {/* View details button at bottom */}
                        <div className="pt-6">
                          <button 
                            onClick={() => {
                              if (onSelectUniversity) {
                                onSelectUniversity(uni);
                              } else {
                                setActiveUniDetail(uni);
                              }
                            }}
                            className="block w-full border border-gray-200 hover:border-[#0047AB] dark:border-slate-800 dark:hover:border-blue-400 text-gray-750 dark:text-slate-300 hover:text-[#0047AB] dark:hover:text-blue-400 font-black text-xs text-center py-3 rounded-xl transition-all hover:bg-blue-50/20 cursor-pointer active:scale-98"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pagination bar at bottom */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-gray-150/80 dark:border-slate-800 rounded-3xl p-5 shadow-sm mt-4">
                    <div className="text-xs font-bold text-gray-400 dark:text-slate-500">
                      Showing <span className="text-gray-800 dark:text-slate-200 font-extrabold">
                        {Math.min((currentPage - 1) * itemsPerPage + 1, sortedAndFilteredUnis.length)} - {Math.min(currentPage * itemsPerPage, sortedAndFilteredUnis.length)}
                      </span> of <span className="text-[#0047AB] dark:text-blue-400 font-extrabold">{sortedAndFilteredUnis.length}</span> items
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`flex items-center justify-center p-2.5 rounded-xl border border-gray-200 dark:border-slate-800 transition-all cursor-pointer ${
                          currentPage === 1 
                            ? "text-gray-300 dark:text-slate-700 cursor-not-allowed bg-slate-50/50 dark:bg-slate-950/20" 
                            : "text-gray-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850"
                        }`}
                      >
                        <ChevronLeft className="h-4.5 w-4.5" />
                      </button>

                      <div className="flex items-center gap-1.5">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                          if (totalPages > 6 && Math.abs(currentPage - p) > 2 && p !== 1 && p !== totalPages) {
                            if (p === 2 || p === totalPages - 1) {
                              return <span key={p} className="text-gray-450 px-1 select-none text-xs">...</span>;
                            }
                            return null;
                          }

                          return (
                            <button
                              key={p}
                              onClick={() => setCurrentPage(p)}
                              className={`w-9 h-9 text-xs font-black rounded-xl transition-all flex items-center justify-center cursor-pointer ${
                                currentPage === p
                                  ? "bg-[#0047AB] text-white shadow-xs"
                                  : "text-gray-700 hover:bg-slate-50 border border-transparent hover:border-gray-150 dark:text-slate-350 dark:hover:bg-slate-850"
                              }`}
                            >
                              {p}
                            </button>
                          );
                        })}
                      </div>

                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`flex items-center justify-center p-2.5 rounded-xl border border-gray-200 dark:border-slate-800 transition-all cursor-pointer ${
                          currentPage === totalPages 
                            ? "text-gray-300 dark:text-slate-700 cursor-not-allowed bg-slate-50/50 dark:bg-slate-950/20" 
                            : "text-gray-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850"
                        }`}
                      >
                        <ChevronRight className="h-4.5 w-4.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800 rounded-3xl p-12 text-center max-w-lg mx-auto space-y-4">
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-950/40 rounded-full flex items-center justify-center mx-auto text-blue-600 dark:text-blue-400">
                  <Building className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-black text-gray-955 dark:text-white">No active matches found</h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-semibold">
                  We couldn't locate any listings matching your search: "{searchQuery}". Try modifying your study destination or check other ranking modules.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCountry("all");
                    setSelectedRanking("all");
                  }}
                  className="bg-[#0047AB] hover:bg-blue-800 text-white text-xs font-black px-4 py-2.5 rounded-xl transition-all"
                >
                  Reset Active Filters
                </button>
              </div>
            )}

          </main>
        </div>
      </div>

      {/* University Detail Drawer/Modal */}
      {activeUniDetail && (
        <div className="fixed inset-0 bg-gray-950/60 backdrop-blur-xs z-50 flex justify-end transition-opacity duration-300">
          
          {/* Modal Backdrop closer */}
          <div className="absolute inset-0" onClick={() => setActiveUniDetail(null)} />

          {/* Drawer container body */}
          <div className="relative w-full max-w-lg md:max-w-xl bg-white dark:bg-slate-950 h-full flex flex-col justify-between shadow-2xl z-10 animate-slide-left overflow-y-auto">
            
            <div className="p-6 md:p-8 space-y-6">
              
              {/* Header Close Row */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold tracking-widest text-[#0047AB] dark:text-blue-400 uppercase bg-blue-50 dark:bg-blue-950/20 px-3 py-1 rounded">
                  University Stat Sheet
                </span>
                <button 
                  onClick={() => setActiveUniDetail(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors cursor-pointer p-1 shrink-0 rounded-full hover:bg-slate-100 dark:hover:bg-slate-850"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Institution Title Area */}
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <UniversityLogo id={activeUniDetail.id} name={activeUniDetail.name} logo={activeUniDetail.logo} className="w-14 h-14" countryCode={activeUniDetail.countryCode} />
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-gray-955 dark:text-white tracking-tight leading-tight">
                      {activeUniDetail.name}
                    </h3>
                    <p className="text-xs text-gray-400 font-extrabold flex items-center gap-1 uppercase tracking-wider">
                      <MapPin className="h-3 w-3 text-red-500" /> {activeUniDetail.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="bg-[#006e67] text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                    FastLane Enabled
                  </span>
                  <span className="bg-orange-500 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                    Global Rank #{activeUniDetail.ranking}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-100 dark:border-slate-850" />

              {/* Course details & Admission expectations inside mock layout */}
              <div className="space-y-5">
                
                <h4 className="text-xs font-black text-gray-950 dark:text-white uppercase tracking-wider">
                  Requirement Profile
                </h4>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-900/40 border border-gray-100 dark:border-slate-900 rounded-2xl p-4 space-y-1">
                    <span className="text-[10px] text-gray-400 dark:text-slate-500 uppercase tracking-widest font-black block">Average GPA Block</span>
                    <span className="text-sm font-black text-gray-800 dark:text-slate-200">
                      {getAdditionalInfo(activeUniDetail.id).gpaReq}
                    </span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/40 border border-gray-100 dark:border-slate-900 rounded-2xl p-4 space-y-1">
                    <span className="text-[10px] text-gray-400 dark:text-slate-500 uppercase tracking-widest font-black block">Language Metric</span>
                    <span className="text-sm font-black text-[#0047AB] dark:text-blue-400">
                      {getAdditionalInfo(activeUniDetail.id).ieltsReq}
                    </span>
                  </div>
                </div>

                {/* Fees and active intake seasons */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-slate-850 flex items-center justify-center text-[#0047AB] dark:text-blue-400 shrink-0">
                      <DollarSign className="h-4.5 w-4.5" />
                    </div>
                    <div className="space-y-0.5">
                      <h5 className="text-[11.5px] font-extrabold text-gray-950 dark:text-white uppercase tracking-wider leading-none">Approximate Tuition Fee</h5>
                      <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed font-semibold">
                        {getAdditionalInfo(activeUniDetail.id).approxFees}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-slate-850 flex items-center justify-center text-[#0047AB] dark:text-blue-400 shrink-0">
                      <Calendar className="h-4.5 w-4.5" />
                    </div>
                    <div className="space-y-0.5">
                      <h5 className="text-[11.5px] font-extrabold text-gray-950 dark:text-white uppercase tracking-wider leading-none">Primary Admissions Intakes</h5>
                      <span className="text-xs text-gray-500 dark:text-slate-400 font-semibold leading-relaxed">
                        {getAdditionalInfo(activeUniDetail.id).intakes.join(" • ")}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-slate-850 flex items-center justify-center text-[#0047AB] dark:text-blue-400 shrink-0">
                      <HelpCircle className="h-4.5 w-4.5" />
                    </div>
                    <div className="space-y-0.5">
                      <h5 className="text-[11.5px] font-extrabold text-gray-950 dark:text-white uppercase tracking-wider leading-none">Scholarships &amp; Merit Awards</h5>
                      <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed font-semibold">
                        {getAdditionalInfo(activeUniDetail.id).scholarships}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 dark:border-slate-850" />

                {/* Popular accredited courses */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black text-gray-955 dark:text-white uppercase tracking-wider">
                    High-Sought Programs Offered
                  </h4>
                  <ul className="grid grid-cols-1 gap-2">
                    {getAdditionalInfo(activeUniDetail.id).popularPrograms.map((prog, pIn) => (
                      <li key={pIn} className="flex items-center gap-2.5 text-xs text-gray-600 dark:text-slate-300 font-semibold bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-gray-100/50 dark:border-slate-900">
                        <span className="w-2 h-2 rounded-full bg-[#0047AB] dark:bg-blue-400" />
                        <span>{prog}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

            </div>

            {/* Sticky Actions Footer inside drawer */}
            <div className="p-6 md:p-8 border-t border-gray-100 dark:border-slate-850 bg-white dark:bg-slate-950 sticky bottom-0 space-y-3">
              <button
                onClick={() => {
                  setActiveUniDetail(null);
                  onBookCounselling(
                    `Enquiring about admission, GPA requirements (${getAdditionalInfo(activeUniDetail.id).gpaReq}), and scholarships for "${activeUniDetail.name}" in ${activeUniDetail.location}.`
                  );
                }}
                className="w-full py-4 bg-[#0047AB] hover:bg-blue-800 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-md active:scale-98 cursor-pointer transition-all text-center block"
              >
                Pre-Screen Profile For Free
              </button>
              <button
                onClick={() => setActiveUniDetail(null)}
                className="w-full py-3 text-gray-500 hover:text-gray-700 text-xs font-extrabold text-center block"
              >
                Close Sheets
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
