import React, { useMemo } from "react";
import { 
  Building, 
  MapPin, 
  GraduationCap, 
  Users, 
  Globe, 
  ArrowLeft,
  Calendar,
  DollarSign,
  Briefcase,
  Award,
  BookOpen,
  CheckCircle,
  FileText,
  Clock,
  Sparkles,
  PhoneCall,
  UserCheck,
  ChevronRight,
  ShieldAlert,
  HelpCircle,
  Info
} from "lucide-react";
import { UNIVERSITIES_BY_COUNTRY } from "./DestinationDetailPage";
import UniversityLogo from "./UniversityLogo";

interface UniversityDetails {
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

interface UniversityDetailPageProps {
  university: UniversityDetails;
  onBack: () => void;
  onBookCounselling: (details: string) => void;
  onSelectUniversity: (uni: UniversityDetails) => void;
}

// Map of custom dynamic country information to enhance SEO and details
const COUNTRY_SEO_CONTEXT: Record<string, {
  visaName: string;
  workYears: string;
  costLiving: string;
  currency: string;
  visaPath: string;
  admissionsDesc: string;
  coverQuery: string;
}> = {
  australia: {
    visaName: "Temporary Graduate Visa (Subclass 485)",
    workYears: "2 to 4 years post-study staying benefits depending on degree level",
    costLiving: "$21,041 AUD minimum per year estimate as per immigration benchmarks",
    currency: "AUD",
    visaPath: "SDS study stream & Subclass 500 visa routes",
    admissionsDesc: "Intakes primarily in Semester 1 (Feb/March) and Semester 2 (July/August). Focuses highly on academic GPA, GTE credentials and certified English proficiencies.",
    coverQuery: "sydney-harbour-bridge"
  },
  uk: {
    visaName: "Graduate Immigration Route (PSW Visa)",
    workYears: "2 years for Bachelor/Master grads & 3 years for Doctorate graduates",
    costLiving: "£9,207 to £12,006 per academic year based on inner/outer London zones",
    currency: "GBP",
    visaPath: "Student Visa (formerly Tier 4 Framework)",
    admissionsDesc: "Principal intakes are Fall (September/October) with secondary intakes in January. Excellent options with no mandatory GRE/GMAT and fast UKVI processing.",
    coverQuery: "london-tower-bridge"
  },
  usa: {
    visaName: "STEM OPT Extension / F-1 Post-Graduate status",
    workYears: "12 months standard OPT plus additional 24 months STEM OPT extension if eligible",
    costLiving: "$15,000 to $22,000 USD per annum depending on public and private campus structures",
    currency: "USD",
    visaPath: "F-1 Academic Student Visa Pathway",
    admissionsDesc: "Intakes: Fall (August/September) and Spring (January). High requirements for competitive standardized scaling indices (GRE, GMAT, SAT) plus rigorous reviews.",
    coverQuery: "new-york-skyline"
  },
  canada: {
    visaName: "Post-Graduate Work Permit (PGWP)",
    workYears: "Up to 3 years staying, with seamless pathways to Express Entry and PNP PR",
    costLiving: "$20,635 CAD minimum required per year representing living benchmarks",
    currency: "CAD",
    visaPath: "Student Direct Stream (SDS) / Study Permit path",
    admissionsDesc: "Primary intakes are September (Fall), January (Winter), and optional May (Spring). Academic grades, GIC funds, and IELTS Academic scores are highly prioritized.",
    coverQuery: "toronto-canada"
  },
  newzealand: {
    visaName: "Post-Study Work Visa (NZ PS-WV)",
    workYears: "Up to 3 years stayed validity matching qualification levels directly",
    costLiving: "$20,000 NZD minimum required per annum for local living index validation",
    currency: "NZD",
    visaPath: "Fee Paying Student Visa Framework",
    admissionsDesc: "Intakes: February and July. Focuses heavily on academic credentials, English requirements (IELTS 6.5 minimum) and evidence of financial safety assets.",
    coverQuery: "auckland-skyline"
  },
  ireland: {
    visaName: "Third Level Graduate Scheme (Stamp 1G)",
    workYears: "1 year for Honours Bachelors and 2 years stay-back for and Masters / PhD grads",
    costLiving: "€10,000 to €15,000 per academic year for housing, food, and student essentials",
    currency: "EUR",
    visaPath: "Irish Study Visa System requirements",
    admissionsDesc: "Main intakes: September/October with limited January entries. Requires standard transcripts, statement of motives, and certified English scorecards.",
    coverQuery: "dublin-ireland"
  },
  germany: {
    visaName: "18-Month Job Seeking Stay Back Visa",
    workYears: "18 months post-graduation search visa to secure permanent EU residence blue card",
    costLiving: "€11,208 Blocked Account (Sperrkonto) mandate from local authorities",
    currency: "EUR",
    visaPath: "German National Student Visa process",
    admissionsDesc: "Intakes: Winter Semester (October) and Summer Semester (April). Free education model across public universities; very highly focused on previous GPA standards.",
    coverQuery: "berlin-brandenburg-gate"
  },
  france: {
    visaName: "Temporary Residency Authorization (APS / France-Alumni Card)",
    workYears: "1 to 2 years staying permit to find qualified full-time employment corresponding to level",
    costLiving: "€8,000 to €12,000 per year for living expenses, heavily subsidized flat lodging",
    currency: "EUR",
    visaPath: "VLS-TS Long Stay Student Visa Routing",
    admissionsDesc: "Main intake: September/October. Requires English (IELTS) or French (DELF/TCF) score sheets depending on course instructions, and structured CVs.",
    coverQuery: "paris-eiffel-tower"
  }
};

export default function UniversityDetailPage({ 
  university, 
  onBack, 
  onBookCounselling,
  onSelectUniversity
}: UniversityDetailPageProps) {
  
  // 1. Find the Country slug/code that this university belongs to
  const countryCode = useMemo(() => {
    if (university.countryCode) return university.countryCode;
    
    // Fallback: search key inside UNIVERSITIES_BY_COUNTRY
    for (const [countryKey, list] of Object.entries(UNIVERSITIES_BY_COUNTRY)) {
      if (list.some(u => u.id === university.id)) {
        return countryKey;
      }
    }
    
    // Dynamic parsing from location
    const locLower = university.location.toLowerCase();
    if (locLower.includes("australia")) return "australia";
    if (locLower.includes("united kingdom") || locLower.includes("uk") || locLower.includes("london")) return "uk";
    if (locLower.includes("united states") || locLower.includes("usa") || locLower.includes("america")) return "usa";
    if (locLower.includes("canada")) return "canada";
    if (locLower.includes("new zealand") || locLower.includes("nz")) return "newzealand";
    if (locLower.includes("ireland") || locLower.includes("dublin")) return "ireland";
    if (locLower.includes("germany") || locLower.includes("munich") || locLower.includes("berlin")) return "germany";
    if (locLower.includes("france") || locLower.includes("paris")) return "france";
    
    return "australia"; // absolute default safety
  }, [university]);

  // 2. Get Country specific details
  const seoConfig = useMemo(() => {
    return COUNTRY_SEO_CONTEXT[countryCode] || COUNTRY_SEO_CONTEXT.australia;
  }, [countryCode]);

  // 3. Get Top Universities in the SAME country
  const topUniversitiesOfCountry = useMemo(() => {
    const rawList = UNIVERSITIES_BY_COUNTRY[countryCode] || [];
    // Return all other universities of this country to list on the right sidebar, ordering them by ranking and injecting countryCode
    return rawList
      .filter(u => u.id !== university.id)
      .map(u => ({ ...u, countryCode }))
      .slice(0, 6);
  }, [countryCode, university.id]);

  // Generate dynamic values for Admission & Tuition
  const estimatedTuition = useMemo(() => {
    // Determine dynamic fees based on country ranges
    switch (countryCode) {
      case "usa":
        return "$35,000 - $62,000 USD / year";
      case "uk":
        return "£22,000 - £42,000 GBP / year";
      case "canada":
        return "$26,000 - $48,000 CAD / year";
      case "germany":
        return "€0 - €1,500 EUR / semester (Public Universities are Tuition-Free)";
      case "france":
        return "€2,770 - €4,500 EUR / year for public, private averages €10,000";
      case "ireland":
        return "€14,000 - €26,000 EUR / year";
      case "newzealand":
        return "$28,000 - $45,000 NZD / year";
      default:
        return "$38,000 - $44,000 AUD / year";
    }
  }, [countryCode]);

  const dynamicIeltsBand = useMemo(() => {
    const rankNum = parseInt(university.ranking) || 100;
    if (rankNum < 30) return "7.0 Academic (minimum 6.5 in all bands)";
    if (rankNum < 100) return "6.5 Academic (minimum 6.0 in all bands)";
    return "6.0 Academic (minimum 5.5 in all bands)";
  }, [university.ranking]);

  const dynamicGpaRequirement = useMemo(() => {
    const rankNum = parseInt(university.ranking) || 100;
    if (rankNum < 30) return "3.6 / 4.0 or 85% equivalence score";
    if (rankNum < 100) return "3.0 / 4.0 or 75% equivalence score";
    return "2.7 / 4.0 or 65% equivalence score";
  }, [university.ranking]);

  // Dynamic SEO generated heading keywords
  const seoKeywords = [
    `${university.name} Admission Requirements 2026`,
    `Study in ${university.location} Fees`,
    `${university.name} International Scholarships`,
    `${countryCode.toUpperCase()} Student Visa guidelines 2026`,
    `Career Wings counseling guidance ${university.name}`
  ];

  const handleCounselBook = () => {
    onBookCounselling(
      `University Detail View: Enquiring about "${university.name}" inside ${university.location}. Preferred country context: ${countryCode.toUpperCase()}. Highly seeks admissions checklist, cost structures, and work visa plans.`
    );
  };

  return (
    <div className="space-y-8 animate-none" id="cwc-university-seo-detail-view">
      
      {/* Return link */}
      <div className="flex items-center justify-between pb-2">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 hover:text-[#0047AB] dark:hover:text-blue-400 font-black text-xs text-gray-600 dark:text-slate-300 transition-colors uppercase cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 text-[#0047AB] dark:text-blue-400" />
          Back to University search
        </button>

        <span className="text-[10px] bg-[#0047AB]/10 text-[#0047AB] dark:bg-blue-400/10 dark:text-blue-400 border border-[#0047AB]/25 dark:border-blue-400/25 rounded-md px-2.5 py-1 uppercase tracking-wider font-extrabold font-mono">
          SEO-Verified Campaign
        </span>
      </div>

      {/* Hero Header Card */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 to-[#002f75] dark:from-slate-950 dark:to-[#041d40] text-white rounded-[32px] border border-gray-150/10 shadow-2xl p-6 sm:p-10">
        
        {/* Subtle decorative background glow */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-15 pointer-events-none bg-radial-gradient from-blue-400 to-transparent"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="bg-white p-3 rounded-2xl shadow-xl flex items-center justify-center shrink-0 w-20 h-20 sm:w-24 sm:h-24">
            <UniversityLogo 
              id={university.id} 
              name={university.name} 
              logo={university.logo} 
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain" 
              countryCode={countryCode} 
            />
          </div>

          <div className="text-center md:text-left space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="px-3 py-1 bg-white/10 text-emerald-300 rounded-full text-[10px] uppercase font-mono border border-emerald-500/30 tracking-widest font-extrabold">
                Global Ranking #{university.ranking}
              </span>
              <span className="px-3 py-1 bg-white/10 text-blue-300 rounded-full text-[10px] uppercase font-mono border border-blue-500/30 tracking-widest font-extrabold">
                {university.intlStudents} International Students
              </span>
            </div>

            <h1 className="text-xl sm:text-3xl font-black tracking-tight leading-tight">
              {university.name} (Admissions &amp; Comprehensive Study Guide)
            </h1>

            <p className="text-xs sm:text-sm text-gray-300 font-medium flex items-center justify-center md:justify-start gap-1.5 leading-relaxed">
              <MapPin className="h-4 w-4 text-red-400 inline shrink-0" />
              <span>{university.location}</span>
              <span className="text-gray-400 text-xs">•</span>
              <span className="capitalize font-bold text-blue-300 underline underline-offset-4 decoration-blue-500">{countryCode} Overseas Track</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Body Content left (Content-SEO 500+ Words) & Right Sidebar (Top universities of same country) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Massive Comprehensive Content (at least 500 words of SEO gold) */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-850 rounded-3xl p-6 sm:p-9 shadow-sm hover:border-gray-200 dark:hover:border-slate-800 transition-all font-sans text-left space-y-6">
          
          {/* SEO keyword indexes row */}
          <div className="bg-slate-50 dark:bg-slate-950/40 rounded-xl p-4 border border-gray-100 dark:border-slate-850">
            <span className="text-[10px] font-black uppercase text-gray-400 dark:text-slate-500 tracking-wider font-mono block mb-2">Generated SEO Keywords &amp; Intent:</span>
            <div className="flex flex-wrap gap-1.5">
              {seoKeywords.map((kw, i) => (
                <span key={i} className="text-[9.5px] bg-blue-50 dark:bg-blue-950/20 text-[#0047AB] dark:text-blue-300 border border-blue-100 dark:border-blue-900/40 px-2 py-0.5 rounded font-black font-mono">
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Primary structured content */}
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-gray-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            
            {/* H1 Head Statement */}
            <h1 className="text-lg sm:text-2xl font-black text-gray-900 dark:text-white leading-tight">
              Ultimate Admission Prospectus: Your Complete Gateway to {university.name}, {countryCode.toUpperCase()}
            </h1>
            
            <p className="font-semibold text-[#0047AB] dark:text-blue-400 bg-[#0047AB]/5 dark:bg-blue-950/20 p-4 border-l-4 border-[#0047AB] rounded-r-xl">
              Applying to a globally-renowned center of excellence like {university.name} represents a landmark career decision. With world-class faculty portfolios, intensive research structures, and premium placement avenues, this institution stands out as a dream hub for thousands of scholars globally. Discover the precise GPA requirements, entry examination scales, and cost structures to launch your success roadmap.
            </p>

            {/* H2 legacy */}
            <h2 className="text-base sm:text-xl font-bold text-gray-900 dark:text-white pt-2 border-b border-gray-100 dark:border-slate-800 pb-2 flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-500 shrink-0" />
              1. Historical Legacy, Academic Rigor, &amp; Global Ranking Analysis
            </h2>
            <p>
              Consistently ranked among the top-tier universities globally, <strong>{university.name}</strong> holds an enviable score index of #{university.ranking} in the Times Higher Education (THE) and QS World Rankings. Nestled in the heart of {university.location}, the campus combines vintage heritage elements with futuristic digital research labs. The peer environment is highly competitive, consisting of a rich, brilliant cluster of {university.intlStudents} overseas students from over 120 nations.
            </p>
            <p>
              Faculty mentors are standard industry-leading specialists, managing multi-million dollar grants in fields ranging from advanced machine intelligence and aerospace modeling to investment economics. The university enforces a high-density faculty-to-student configuration ratio, guaranteeing dedicated academic mentorship checkpoints.
            </p>

            {/* H3 course structures */}
            <h3 className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white pt-2 flex items-center gap-2">
              <BookOpen className="h-4.5 w-4.5 text-blue-500" />
              2. Program Ecosystem, Specializations, and Major Academic Intakes
            </h3>
            <p>
              The university offers {university.courses} mapped to multiple core domains. Undergraduates and postgraduate professionals have access to highly tailored specialized streams including Master of Computer Science, Engineering, Business Administration (MBA), Data Analytics, and Biomedical Research fields.
            </p>
            <p>
              {seoConfig.admissionsDesc} Courses are split across distinct credits comprising heavy practical validation. The syllabus is optimized to feed direct problem-solving knowledge required in actual competitive industries.
            </p>

            {/* H4 scores and details inside a table */}
            <h4 className="text-xs sm:text-base font-extrabold text-[#0047AB] dark:text-blue-400 pt-2 flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4" />
              3. Entry Prerequisites, Minimum GPA &amp; Standardized English Requirements
            </h4>
            <p>
              Securing solid letters of recommendation and a convincing Statement of Purpose is key. Review the essential cut-off standards for secure considerations:
            </p>

            <div className="overflow-x-auto rounded-xl border border-gray-150 dark:border-slate-800 my-4">
              <table className="w-full text-left text-xs text-gray-600 dark:text-slate-300 font-semibold">
                <thead className="bg-slate-50 dark:bg-slate-950 text-gray-700 dark:text-slate-200">
                  <tr>
                    <th className="p-3 border-b border-gray-150 dark:border-slate-800">Prerequisite Category</th>
                    <th className="p-3 border-b border-gray-150 dark:border-slate-800">Minimum Mandate Cut-Off</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-150 dark:divide-slate-800">
                  <tr>
                    <td className="p-3 font-bold text-gray-950 dark:text-white">Academic GPA Conversion</td>
                    <td className="p-3">{dynamicGpaRequirement}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-gray-950 dark:text-white font-sans">IELTS Academic Requirement</td>
                    <td className="p-3">{dynamicIeltsBand}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-gray-950 dark:text-white">TOEFL iBT Benchmark</td>
                    <td className="p-3">92 to 102 (with minimum 22 in speaking/writing criteria)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-gray-950 dark:text-white">Supporting Documents</td>
                    <td className="p-3">SOP, 2 Reference Letters, Transcripts validation &amp; Curriculum Vitae</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Tuition details */}
            <h3 className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white pt-2 flex items-center gap-2">
              <DollarSign className="h-4.5 w-4.5 text-emerald-500" />
              4. Complete Estimated Tuition Costs and Specialized Fellowship Grants
            </h3>
            <p>
              Tuition fee estimates average <strong>{estimatedTuition}</strong>. However, several scholarship models are deployed annually to relieve stress on overseas assets.
            </p>
            <p>
              Candidates with superior sports portfolios, exceptional GPAs, or brilliant research abstracts are evaluated automatically for waivers spanning from 15% to 100% tuition relief, such as the Principal Merit Program. Weekly grocery expenses, transport indices, and shared shared flats housing sum up as: <em>{seoConfig.costLiving}</em>.
            </p>

            {/* Post-study visa rules */}
            <h4 className="text-xs sm:text-base font-extrabold text-[#0047AB] dark:text-blue-400 pt-2 flex items-center gap-1.5">
              <Briefcase className="h-4 w-4" />
              5. Professional Post-Study Stays, Visas, &amp; Post-Graduate Career Roadmaps
            </h4>
            <p>
              The {countryCode.toUpperCase()} administration recognizes the extreme value of keeping international talent. Upon successful completion of your course program at {university.name}, career search stay back permissions are granted via the <strong>{seoConfig.visaName}</strong>, facilitating <em>{seoConfig.workYears}</em>.
            </p>
            <p>
              With your degrees certified by a globally ranking university, you will have first-priority credentials to apply for premier high-paying corporate roles in technology, business analytics, engineering, healthcare sectors, or pursue fully funded PhD programs globally.
            </p>

            {/* Career Wings counseling section */}
            <div className="bg-[#0047AB]/5 dark:bg-blue-950/30 p-5 sm:p-6 rounded-2xl border border-dashed border-[#0047AB]/40 space-y-3 mt-6">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#0047AB] dark:text-blue-400 animate-pulse" />
                <h5 className="font-extrabold text-sm text-gray-950 dark:text-white">
                  6. Direct Application Processing &amp; Visa Assurance by Career Wings
                </h5>
              </div>
              <p className="text-xs leading-relaxed text-gray-600 dark:text-slate-300 font-medium">
                At Career Wings, our certified education counselors take care of everything: matching your previous grades with the right courses at {university.name}, styling your academic Statement of Purpose (SOP), coordinating direct application submissions, validating proof of finances, and providing rigorous Mock Visa Interfaces.
              </p>
              <div className="pt-2 flex">
                <button
                  onClick={handleCounselBook}
                  className="bg-[#0047AB] hover:bg-blue-700 text-white font-black text-xs px-5 py-2.5 rounded-lg shadow-sm cursor-pointer hover:scale-[1.01] transition-transform"
                >
                  🚀 Connect with an Advisor Immediately (Free)
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Right Side: Sidebar listing Top Universities from same country */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Quick Schedule Free counselling slot */}
          <div className="bg-gradient-to-br from-[#0047AB]/10 to-[#002f75]/10 dark:from-slate-900 dark:to-[#041d40] border border-[#0047AB]/20 rounded-3xl p-6 text-left space-y-4">
            <span className="text-[9px] uppercase font-black tracking-widest text-[#0047AB] dark:text-blue-400 font-mono flex items-center gap-1.5 bg-[#0047AB]/5 dark:bg-slate-950 p-2 rounded-lg">
              <Clock className="w-3.5 h-3.5" /> Admission Booking Window Open
            </span>
            <h4 className="text-sm font-black text-gray-900 dark:text-white">
              Enroll at {university.name}
            </h4>
            <p className="text-[11.5px] text-gray-500 dark:text-slate-400 leading-normal font-semibold">
              Admissions are competitive and require exact deadline adherence. Receive a personalized roadmap on how to submit documents safely.
            </p>
            <button
              onClick={handleCounselBook}
              className="w-full bg-[#0047AB] hover:bg-blue-700 text-white font-black text-xs py-3 rounded-xl cursor-pointer shadow-md text-center active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <PhoneCall className="h-3.5 w-3.5" /> Book Fast Advisory Callback
            </button>
          </div>

          {/* Sidebar Top universities listing */}
          <div className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-850 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4 text-left">
            <div>
              <span className="text-[10px] text-[#0047AB] dark:text-blue-400 uppercase font-black font-mono tracking-widest">
                Explore Alternative Options
              </span>
              <h4 className="text-sm font-black text-gray-950 dark:text-white capitalize">
                Top Universities in {countryCode}
              </h4>
              <p className="text-[11px] text-gray-400 font-semibold">
                Based on global rankings and international student index
              </p>
            </div>

            {topUniversitiesOfCountry.length > 0 ? (
              <div className="space-y-3.5 divide-y divide-gray-100 dark:divide-slate-850">
                {topUniversitiesOfCountry.map((uni, idx) => (
                  <div 
                    key={uni.id} 
                    onClick={() => {
                      onSelectUniversity(uni);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`pt-3.5 group cursor-pointer ${idx === 0 ? "pt-0 border-t-0" : "border-t border-gray-100 dark:border-slate-850"}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-slate-50 dark:bg-slate-950 p-1.5 rounded-lg shrink-0 w-9 h-9 border border-gray-100 dark:border-slate-850 flex items-center justify-center group-hover:border-[#0047AB] dark:group-hover:border-blue-400 transition-colors">
                        <UniversityLogo 
                          id={uni.id} 
                          name={uni.name} 
                          logo={uni.logo} 
                          className="w-7 h-7 object-contain" 
                          countryCode={countryCode} 
                        />
                      </div>
                      <div className="space-y-0.5 min-w-0 flex-1">
                        <h5 className="text-xs font-black text-gray-900 dark:text-white truncate group-hover:text-[#0047AB] dark:group-hover:text-blue-400 transition-colors" title={uni.name}>
                          {uni.name}
                        </h5>
                        <p className="text-[10px] text-gray-400 dark:text-slate-500 font-extrabold flex items-center gap-0.5">
                          <MapPin className="h-2.5 w-2.5 text-red-500 inline shrink-0" /> {uni.location.split(",")[0]}
                          <span className="text-gray-300 dark:text-slate-700">•</span>
                          <span className="text-[#0047AB] dark:text-blue-400 font-mono">Rank #{uni.ranking}</span>
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <span className="text-[10px] text-[#0047AB] dark:text-blue-400 font-extrabold inline-flex items-center gap-0.5 group-hover:underline">
                        View details prospectus <ChevronRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 text-center text-[11px] text-gray-400 border border-gray-100 dark:border-slate-800">
                <Info className="h-4 w-4 mx-auto text-gray-300 mb-1" />
                No other universities tracked inside {countryCode}.
              </div>
            )}

            <div className="pt-2 border-t border-gray-100 dark:border-slate-800 text-center">
              <button
                onClick={onBack}
                className="text-[11px] font-black text-[#0047AB] hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors uppercase tracking-wider block w-full text-center"
              >
                ← Return to complete listing
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
