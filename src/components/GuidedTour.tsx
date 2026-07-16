import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  X, 
  Home, 
  Compass, 
  Search, 
  Briefcase, 
  BookOpen, 
  Users, 
  CheckCircle,
  Layers,
  Laptop
} from "lucide-react";

interface Step {
  title: string;
  tabKey: string;
  tabLabel: string;
  arabicHindiOverview: string;
  icon: React.ReactNode;
  mockVisual: React.ReactNode;
  badgeText: string;
  submenus?: string[];
}

interface GuidedTourProps {
  isOpen: boolean;
  onClose: () => void;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export default function GuidedTour({ isOpen, onClose, currentTab, setCurrentTab }: GuidedTourProps) {
  const [currentStep, setCurrentStep] = React.useState(0);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Define simplified highly polished steps that go through each major tab in the app with explicit live previews
  const steps: Step[] = [
    {
      title: "Main Header & Top Menu Bar",
      tabKey: "home",
      tabLabel: "Top Bar Home",
      arabicHindiOverview: "Welcome to the primary Top Menu Bar. Tap this home icon to navigate back to the central hub, where you can easily schedule direct consultations and coordinate counselor call-backs.",
      icon: <Home className="h-6 w-6 text-[#0047AB]" />,
      badgeText: "Primary Header Navigation",
      submenus: [
        "About Us (Our core mission, history & direct team credentials)",
        "Blog & Resources (University updates, prep tricks & guides)",
        "Post Resume (Instantly upload CV for direct job assessments)",
        "Student News (Real-time official policy and visa updates)",
        "Join Community (Connect with alumni & staff discussion circles)",
        "Admin Portal (Management of counseling entries & databases)"
      ],
      mockVisual: (
        <div className="bg-slate-950 text-white p-4 rounded-xl border border-slate-800 space-y-2.5 shadow-md">
          <div className="flex justify-between items-center bg-[#0047AB] px-3 py-1.5 rounded-md text-white text-[11px] font-bold tracking-wider">
            <span>💻 COOPERATIVE TOP BAR MENU</span>
            <span className="bg-emerald-500 text-[9px] rounded px-2 py-0.5 animate-pulse font-mono font-extrabold text-slate-950">LIVE</span>
          </div>
          <div className="bg-slate-900 border border-slate-850 p-3 rounded-lg flex items-center justify-between text-[11px]">
            <span className="font-semibold text-slate-200">Main Consultation Scheduler</span>
            <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-2.5 py-1 rounded">SCHEDULE NOW</span>
          </div>
        </div>
      )
    },
    {
      title: "Study Destinations & Sub-Bar Fees",
      tabKey: "destinations",
      tabLabel: "Destinations Menu",
      arabicHindiOverview: "Click 'Destinations' on the Top Bar Menu to view global options like the UK, Germany, and France. Selecting a destination reveals a detailed sub-bar outlining living costs, tuition levels, and step-by-step visa processes.",
      icon: <Compass className="h-6 w-6 text-blue-600" />,
      badgeText: "Main Top Bar Option",
      submenus: [
        "United Kingdom (UK college directory, cost of living & entry terms)",
        "Germany Desk (Blocked account guidance & free public universities)",
        "France Desk (Premium business schools & Schengen access)",
        "Other Global Desks: United States, Canada, Australia, Sweden, Poland, Albania, New Zealand"
      ],
      mockVisual: (
        <div className="bg-slate-950 text-white p-4 rounded-xl border border-slate-800 space-y-2.5 shadow-md">
          <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-extrabold">
            <div className="bg-[#0047AB]/25 border border-blue-500/40 p-2 rounded-lg text-blue-200">
              🇬🇧 United Kingdom
            </div>
            <div className="bg-slate-900 border border-slate-800 p-2 rounded-lg text-slate-300">
              🇩🇪 Germany Desk
            </div>
            <div className="bg-slate-900 border border-slate-800 p-2 rounded-lg text-slate-300">
              🇫🇷 France Desk
            </div>
          </div>
          <p className="text-[10px] text-slate-400 text-center font-medium">Includes comprehensive cost guides and customized application checklists.</p>
        </div>
      )
    },
    {
      title: "Interactive Course Finder & Search Sub-Bar",
      tabKey: "search",
      tabLabel: "Course Search",
      arabicHindiOverview: "Locate international programs easily. Choose 'Course Search' on the Top Menu Bar to query courses, filter by fields, and contrast program options on the dynamic results panel.",
      icon: <Search className="h-6 w-6 text-emerald-600" />,
      badgeText: "Search Sub-Bar Utility",
      submenus: [
        "Computer Science & Information Tech (Coding, AI, and Software Engineering)",
        "Business Administration & MBA (Global leadership & financial systems)",
        "Data Analytics & Engineering (Big data, network architectures, and cloud)",
        "Social Sciences & Bio-medicine (Clinical studies & public health)",
        "Direct Course Finder (Search tool indexing over 1,200+ partner files)",
        "Cost of Living Calculator (Evaluate local rentals, food, & utility bills)",
        "Academic Scholarship Finder (Evaluate active merit-based waivers)"
      ],
      mockVisual: (
        <div className="bg-slate-950 text-white p-4 rounded-xl border border-slate-800 space-y-2.5 shadow-md">
          <div className="flex gap-2 bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-[10.5px] text-slate-400">
            <span>🔎 Type to filter options... (e.g., Computer Science, Engineering, Business)</span>
          </div>
        </div>
      )
    },
    {
      title: "Student Essentials & Support Desk",
      tabKey: "services",
      tabLabel: "Essentials Sub-Bar",
      arabicHindiOverview: "Use the custom Accommodation Finder and student finance indicators. Open this middle essentials Sub-Bar console to access accommodation rates and real-time forex conversions.",
      icon: <Briefcase className="h-6 w-6 text-indigo-600" />,
      badgeText: "Middle Sub-Bar Console",
      submenus: [
        "University Finder 🎯 (Match active institutions to your profile)",
        "Free Profile Evaluation (Pre-screening academic assessments)",
        "SOP Polishing Support (Get statement of purpose professional reviews)",
        "LOR Reviews (Guidelines for writing recommendation letters)",
        "Priority Student Loans (Hassle-free student financial support)",
        "Visa Interview Mock Coaching (Interactive simulated sessions)",
        "Global Student Accommodations & Housing (Budget safe listings)",
        "Pre-Departure Briefings & Direct Airport Transits"
      ],
      mockVisual: (
        <div className="bg-slate-950 text-white p-4 rounded-xl border border-slate-800 space-y-2.5 shadow-md">
          <div className="flex justify-between items-center text-[10.5px] bg-[#0047AB]/10 p-2 rounded-lg border border-blue-900/30">
            <span className="font-semibold text-blue-300">🏠 Student Housing Locality Desk</span>
            <span className="text-emerald-400 font-bold font-mono text-[9px]">ONLINE</span>
          </div>
        </div>
      )
    },
    {
      title: "Test Preparation & Exam Mock Centre",
      tabKey: "tests",
      tabLabel: "Test Preparation Menu",
      arabicHindiOverview: "Access the dynamic Exam Preparation portal. Take online simulated practice exams including IELTS, TOEFL, and Duolingo components right from this dedicated Top Bar block.",
      icon: <BookOpen className="h-6 w-6 text-amber-600" />,
      badgeText: "Exam Prep Desk",
      submenus: [
        "IELTS Section (International English Language Testing System - What is IELTS, IELTS Training, Book an IELTS Test & Free Mock simulator)",
        "PTE Section (Pearson Test of English - What is PTE, PTE Coaching, Book a PTE Test & Free Mock simulator)",
        "TOEFL Section (Test of English as a Foreign Language - What is TOEFL, TOEFL Prep, Book TOEFL Test & Free Mock simulator)",
        "Duolingo Section (Duolingo English Test - What is Duolingo, Duolingo Prep, Book Duolingo Test & Free Mock simulator)",
        "Spoken English (Master fluent communication, accentuation, and interview rounds)"
      ],
      mockVisual: (
        <div className="bg-slate-950 text-white p-4 rounded-xl border border-slate-800 space-y-2.5 shadow-md">
          <div className="flex justify-between items-center bg-amber-950/20 p-2.5 rounded-lg border border-amber-950 text-[10.5px]">
            <span className="font-bold text-amber-400">📚 Practice Exam Mock Simulator</span>
            <span className="bg-amber-400 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded">START TEST</span>
          </div>
        </div>
      )
    },
    {
      title: "Work Visa & Skilled Pathways",
      tabKey: "work-visa",
      tabLabel: "Work Visa",
      arabicHindiOverview: "Discover official working permits, permanent residency (PR) assessments, LMIA sponsorships, and post-study employment transitions facilitated by legal specialists.",
      icon: <Briefcase className="h-6 w-6 text-teal-600" />,
      badgeText: "Skilled Work Desk",
      submenus: [
        "Poland Work Visa (Schengen direct career entry and visa permits)",
        "New Zealand Work Visa (Green List occupations fast track residency)",
        "Albania Work Visa (Simplified permits and seasonal jobs guide)",
        "Canada Work Visa (LMIA employer sponsorship and PNP pathways)",
        "Australia PR (General Skilled Migration - Points-based GSM visas)",
        "UK Work Visa (Skilled Worker route and local employer sponsorship)",
        "Australia Skilled Visa 462 (Work and Holiday arrangement details)",
        "Licensed Immigration Consultations & Eligibility diagnostics"
      ],
      mockVisual: (
        <div className="bg-slate-950 text-white p-4 rounded-xl border border-slate-800 space-y-2.5 shadow-md">
          <div className="flex justify-between items-center bg-teal-950/20 p-2.5 rounded-lg border border-teal-950 text-[10.5px]">
            <span className="font-bold text-teal-400">💼 Skilled Migration & Employment Visas</span>
            <span className="bg-teal-400 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded">VIEW JOBS</span>
          </div>
        </div>
      )
    },
    {
      title: "Admissions & Compliance Assessment",
      tabKey: "eligibility",
      tabLabel: "Eligibility Check",
      arabicHindiOverview: "Verify academic admission entry standards instantly. Supply your average percentage details to evaluate eligibility requirements directly from the Top Menu Bar panel.",
      icon: <CheckCircle className="h-6 w-6 text-teal-600" />,
      badgeText: "Top Bar Requirement Check",
      submenus: [
        "Direct Entry Assessment (Calculates average academic scores dynamically)",
        "English Requirement Analysis (IELTS / PTE / TOEFL waivers checker)",
        "Country-specific Visa Success Predictor (Estimate approval ratios)",
        "Direct Counselling Form Integration (One-click profile submission)"
      ],
      mockVisual: (
        <div className="bg-slate-950 text-white p-3.5 text-center rounded-xl border border-slate-800 shadow-md">
          <div className="bg-emerald-950/40 border border-[#0047AB]/50 p-2.5 rounded-lg text-emerald-400 text-[10.5px] font-bold">
            🎉 Academic Score Analysis Complete &bull; 92% Compliance Match
          </div>
        </div>
      )
    },
    {
      title: "Global Forum & Discussion Rooms",
      tabKey: "community",
      tabLabel: "Student Forum",
      arabicHindiOverview: "Read high-level visa announcements, verified rules, and feedback from alumni. Join discussion groups on the student forum to find guidelines and advice from administrators.",
      icon: <Users className="h-6 w-6 text-pink-600" />,
      badgeText: "Top Bar Student Community",
      submenus: [
        "Alumni Network Rooms (Connect with graduates from elite colleges)",
        "Visa Announcement Boards (Verified policy adjustments and bulletins)",
        "Administrative Support Desk (Direct staff feedback & ticket responses)",
        "Admin Management Panel (Audit and verify user application records)"
      ],
      mockVisual: (
        <div className="bg-slate-950 text-white p-3.5 rounded-xl border border-slate-800 shadow-md text-[10.5px]">
          <p className="text-[#0047AB] dark:text-blue-300 font-bold text-center">💬 Verified Global Student Announcement Board</p>
        </div>
      )
    }
  ];

  // Dynamically jump to the corresponding tab in the background app layout
  useEffect(() => {
    if (isOpen) {
      const activeStep = steps[currentStep];
      if (activeStep && currentTab !== activeStep.tabKey) {
        setCurrentTab(activeStep.tabKey);
      }
      
      // Auto-scroll the active tab button into the center of the scrollable container
      setTimeout(() => {
        if (scrollRef.current) {
          const activeBtn = scrollRef.current.children[currentStep] as HTMLElement;
          if (activeBtn) {
            activeBtn.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
              inline: "center"
            });
          }
        }
      }, 50);
    }
  }, [currentStep, isOpen]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onClose();
      setCurrentTab("home");
      setCurrentStep(0);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    onClose();
    setCurrentStep(0);
  };

  const activeStepData = steps[currentStep];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md select-none">
      {/* Click outside to cancel */}
      <div className="absolute inset-0 cursor-default" onClick={handleSkip} />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative bg-white dark:bg-slate-900 border-2 border-[#0047AB] dark:border-slate-800 rounded-3xl max-w-xl md:max-w-2xl w-full shadow-2xl z-20 flex flex-col transition-all overflow-hidden"
      >
        {/* UPPER BANNER */}
        <div className="bg-gradient-to-r from-[#0047AB] to-blue-800 px-6 py-4 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-xl text-amber-300">
              <Sparkles className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-200 block leading-tight">Interactive Guide</span>
              <h3 className="font-extrabold text-white text-base sm:text-lg tracking-tight">Step-by-Step Portal Tour</h3>
            </div>
          </div>
          <button 
            type="button"
            onClick={handleSkip} 
            className="p-1.5 rounded-full hover:bg-white/15 text-white/85 hover:text-white transition-all cursor-pointer flex items-center justify-center animate-none"
            title="Close Guide"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* TOP BAR / MENU BAR NAVIGATION CONTROLLER */}
        <div className="bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-850 p-3 space-y-1.5">
          <div className="flex items-center gap-1.5 px-1">
            <span className="h-2 w-2 rounded-full bg-[#0047AB] animate-ping shrink-0" />
            <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest font-mono">
              ★ Active Option Indicator (Top Menu Bar)
            </span>
          </div>
          
          <div ref={scrollRef} className="flex gap-1.5 overflow-x-auto scrollbar-none items-center justify-start p-1.5 bg-slate-100 dark:bg-slate-900 rounded-lg">
            {steps.map((s, idx) => {
              const isSelected = idx === currentStep;
              return (
                <button
                  key={s.tabKey}
                  type="button"
                  onClick={() => setCurrentStep(idx)}
                  className={`px-3 py-1.5 rounded-md text-xs font-extrabold transition-all shrink-0 cursor-pointer ${
                    isSelected 
                      ? "bg-[#0047AB] text-white shadow-sm ring-1 ring-blue-300" 
                      : "bg-white dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50"
                  }`}
                >
                  {s.tabLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* CORE PREVIEW & DIRECTIONS CONTAINER (SCROLLBAR DISABLED ON DESKTOP/LAPTOP/TABLET) */}
        <div className="p-5 sm:p-6 space-y-4 flex-1 max-h-[460px] md:max-h-[500px] overflow-y-auto scrollbar-none">
          
          <div className="flex items-center gap-3 bg-blue-50/40 dark:bg-slate-850/60 p-3.5 rounded-xl border border-blue-100/30 dark:border-slate-850">
            <div className="p-2 bg-white dark:bg-slate-900 rounded-lg text-[#0047AB] dark:text-blue-400 shrink-0 shadow-3xs">
              {activeStepData.icon}
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-[#0047AB] dark:text-blue-400 uppercase tracking-widest block font-mono">
                OPTION {currentStep + 1} OF {steps.length} &bull; {activeStepData.badgeText}
              </span>
              <h4 className="text-sm sm:text-base md:text-lg font-black text-slate-850 dark:text-white leading-none mt-1">
                {activeStepData.title}
              </h4>
            </div>
          </div>

          {/* Detailed Sub-Menus & Child Pages Block */}
          {activeStepData.submenus && activeStepData.submenus.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-850 p-4 rounded-xl space-y-2.5 shadow-3xs">
              <span className="text-[10px] font-black text-[#0047AB] dark:text-blue-400 uppercase tracking-widest block font-mono">
                📋 Included Sub-Menus & Child Pages:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                {activeStepData.submenus.map((submenu, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-start gap-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 px-3 py-2 rounded-lg shadow-3xs transition-all hover:border-blue-400/40 hover:bg-blue-50/5"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5 animate-pulse" />
                    <span className="leading-tight text-slate-800 dark:text-slate-200">{submenu}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Elegant Clear English Banner with increased High Visibility Font Size */}
          <div className="bg-[#FFFDF9] dark:bg-slate-900 border border-amber-300/40 p-4 sm:p-5 rounded-xl shadow-sm border-l-4 border-amber-500">
            <span className="text-[10px] font-extrabold text-amber-800 dark:text-amber-300 block mb-1 uppercase tracking-wider font-mono">
              💡 PORTAL DIRECTIVE GUIDE:
            </span>
            <p className="text-slate-900 dark:text-white text-sm sm:text-base md:text-lg leading-relaxed font-bold">
              {activeStepData.arabicHindiOverview}
            </p>
          </div>

        </div>

        {/* STEPPER STEP CONTROLLER FOOTER */}
        <div className="border-t border-slate-150 dark:border-slate-850 px-6 py-4 bg-slate-50 dark:bg-slate-950/40 flex justify-between items-center gap-3">
          <button
            type="button"
            onClick={handleSkip}
            className="text-slate-500 hover:text-red-500 dark:text-slate-450 dark:hover:text-red-400 text-xs sm:text-sm font-black cursor-pointer transition-all select-none uppercase tracking-wider"
          >
            Cancel / Skip
          </button>

          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={handlePrev}
                className="bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-black py-2 px-4 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-3xs"
              >
                <ArrowLeft className="h-4 w-4 text-slate-400" /> Back Option
              </button>
            )}

            <button
              type="button"
              onClick={handleNext}
              className="bg-[#0047AB] hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs sm:text-sm font-black py-2 px-4.5 rounded-lg flex items-center gap-1.5 shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-95 transition-all cursor-pointer select-none"
            >
              <span>{currentStep === steps.length - 1 ? "Finish & Explore ✓" : "Next Option"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
