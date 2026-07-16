import React, { useState } from "react";
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  GraduationCap, 
  MapPin, 
  Globe, 
  Phone, 
  FileText, 
  Sparkles, 
  Heart, 
  ChevronDown, 
  Compass, 
  BookOpen, 
  Briefcase, 
  Award, 
  ShieldCheck, 
  DollarSign, 
  ArrowRight, 
  HelpCircle, 
  FileCheck,
  Plane,
  Home,
  MessageCircle,
  Building,
  CheckCircle,
  Users,
  Database,
  Shield,
  Search
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { DESTINATIONS } from "../data/mockData";
import { Destination } from "../types";
import BrandLogo from "./BrandLogo";

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  savedCoursesCount: number;
  openSavedModal: () => void;
  openCounsellingModal: () => void;
  onSelectDestination?: (dest: Destination) => void;
  onSelectTestPrepTab?: (testId: string) => void;
  onSelectWorkVisa?: (workVisaId: string) => void;
  isAdminView?: boolean;
  setIsAdminView?: (v: boolean) => void;
  onOpenTour?: () => void;
}

export default function Navbar({
  currentTab,
  setCurrentTab,
  darkMode,
  toggleDarkMode,
  savedCoursesCount,
  openSavedModal,
  openCounsellingModal,
  onSelectDestination,
  onSelectTestPrepTab,
  onSelectWorkVisa,
  isAdminView,
  setIsAdminView,
  onOpenTour,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  // Mobile Accordion state
  const [mobileDestinationsOpen, setMobileDestinationsOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileIeltsOpen, setMobileIeltsOpen] = useState(false);
  const [mobileWorkVisaOpen, setMobileWorkVisaOpen] = useState(false);

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
    setActiveMegaMenu(null);
  };

  const handleTestPrepClick = (testId: string) => {
    if (onSelectTestPrepTab) {
      onSelectTestPrepTab(testId);
    }
    handleNavClick("tests");
  };

  const handleWorkVisaSelection = (visaId: string) => {
    if (onSelectWorkVisa) {
      onSelectWorkVisa(visaId);
      setActiveMegaMenu(null);
      setMobileMenuOpen(false);
    }
  };

  const handleCountrySelection = (destId: string) => {
    const match = DESTINATIONS.find((d) => d.id === destId);
    if (match && onSelectDestination) {
      onSelectDestination(match);
      setActiveMegaMenu(null);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header 
      className="sticky top-0 z-50 w-full shadow-lg bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 transition-colors"
      onMouseLeave={() => setActiveMegaMenu(null)}
    >
      {/* Top Utility Segment */}
      <div id="top-utility-bar" className="bg-[#0047AB] text-white py-2 text-xs font-semibold border-b border-blue-700/50">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex justify-between items-center">
          
          {/* Support call layout: full-width on mobile to center/distribute, floating inline on desktop */}
          <div className="flex items-center gap-2 w-full lg:w-auto justify-between lg:justify-start">
            <span className="flex items-center gap-1.5 text-amber-300 font-extrabold pr-2 text-[10.5px] sm:text-xs">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Support: <a href="tel:+919000119072" className="underline text-white hover:text-amber-200 font-black">+91 90001 19072</a>
            </span>
            
            {/* Quick seat booking trigger link on top right for mobile/tablets */}
            <span 
              onClick={openCounsellingModal}
              className="lg:hidden flex items-center gap-1 text-[10.5px] sm:text-xs text-amber-300 hover:text-amber-200 hover:underline transition-all cursor-pointer font-black"
            >
              <Globe className="h-3 w-3 text-emerald-400 animate-pulse shrink-0" />
              <span>Free Seat Booking</span>
            </span>
          </div>

          {/* Desktop/Wide Screens Only Miscellaneous Menu Links */}
          <div className="hidden lg:flex items-center space-x-6 ml-auto">

            <a 
              href="#about" 
              onClick={(e) => { e.preventDefault(); handleNavClick("about"); }}
              className={`hover:underline flex items-center gap-1 transition-all font-extrabold ${currentTab === "about" ? "text-amber-300 font-black" : "text-white/95 hover:text-white"}`}
            >
              <Compass className={`h-3.5 w-3.5 transition-all ${currentTab === "about" ? "text-amber-300" : "text-white/70"}`} /> About Us
            </a>
            <span className="h-3.5 w-px bg-white/30"></span>

            <a 
              href="#blog" 
              onClick={(e) => { e.preventDefault(); handleNavClick("blog"); }}
              className={`hover:underline flex items-center gap-1 transition-all font-extrabold ${currentTab === "blog" ? "text-amber-300 font-black" : "text-white/95 hover:text-white"}`}
            >
              <BookOpen className={`h-3.5 w-3.5 transition-all ${currentTab === "blog" ? "text-amber-300" : "text-white/70"}`} /> Blog & Resources
            </a>
            <span className="h-3.5 w-px bg-white/30"></span>

            <a 
              href="#post-resume" 
              onClick={(e) => { e.preventDefault(); handleNavClick("post-resume"); }}
              className={`hover:underline flex items-center gap-1 transition-all font-extrabold ${currentTab === "post-resume" ? "text-amber-300 font-black animate-pulse" : "text-white/95 hover:text-white"}`}
            >
              <FileText className={`h-3.5 w-3.5 transition-all ${currentTab === "post-resume" ? "text-amber-300" : "text-white/70"}`} /> Post Resume
            </a>
            <span className="h-3.5 w-px bg-white/30"></span>

            <a 
              href="#drive" 
              onClick={(e) => { e.preventDefault(); handleNavClick("drive"); }}
              className={`hover:underline flex items-center gap-1 transition-all font-extrabold ${currentTab === "drive" ? "text-amber-300 font-black animate-pulse" : "text-white/95 hover:text-white"}`}
            >
              <Database className={`h-3.5 w-3.5 transition-all ${currentTab === "drive" ? "text-amber-300" : "text-white/70"}`} /> Drive Vault
            </a>
            <span className="h-3.5 w-px bg-white/30"></span>

            <a 
              href="#news" 
              onClick={(e) => { e.preventDefault(); handleNavClick("news"); }}
              className={`hover:underline flex items-center gap-1 transition-all ${currentTab === "news" ? "text-amber-300 font-black animate-pulse" : "text-white/90 hover:text-white"}`}
            >
              <MessageCircle className={`h-3.5 w-3.5 transition-all ${currentTab === "news" ? "text-amber-300" : "text-white/70"}`} /> Student News
            </a>
            <span className="h-3.5 w-px bg-white/30"></span>
            
            <a 
              href="#community" 
              onClick={(e) => { 
                e.preventDefault(); 
                handleNavClick("community"); 
                if (setIsAdminView) setIsAdminView(false);
              }}
              className={`hover:underline flex items-center gap-1 transition-all ${currentTab === "community" && !isAdminView ? "text-amber-303 font-black bg-white/10 px-2.5 py-1 rounded-md" : "text-white/90 hover:text-white"}`}
            >
              <Users className={`h-4 w-4 transition-all ${currentTab === "community" && !isAdminView ? "text-amber-303" : "text-white/70"}`} /> Join Community
            </a>
            <span className="h-3.5 w-px bg-white/30"></span>

            <button 
              onClick={() => {
                handleNavClick("community");
                if (setIsAdminView) setIsAdminView(true);
              }} 
              className={`hover:underline flex items-center gap-1.5 transition-all font-extrabold ${currentTab === "community" && isAdminView ? "text-amber-303 font-black bg-white/10 px-2.5 py-1 rounded-md" : "text-white/90 hover:text-amber-200"}`}
            >
              <Database className={`h-3.5 w-3.5 shrink-0 transition-all ${currentTab === "community" && isAdminView ? "text-amber-303" : "text-white/70"}`} />
              <span>Admin</span>
            </button>
            <span className="h-3.5 w-px bg-white/30"></span>
            


            <span 
              onClick={openCounsellingModal}
              className="flex items-center gap-1 text-white hover:text-amber-200 hover:underline transition-all cursor-pointer font-bold"
            >
              <Globe className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
              <span>Free appointment</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Bar Navigation */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-2 flex items-center justify-between bg-[#ffffff] dark:bg-slate-900 transition-colors">
        
        {/* Core Crop corrected logo */}
        <div 
          onClick={() => handleNavClick("home")} 
          className="flex items-center gap-1 cursor-pointer flex-shrink-0 animate-fade-in"
        >
          <BrandLogo />
        </div>

        {/* Global Career Wings Mega Navigation (Desktop Header Mode) */}
        <nav className="hidden lg:flex items-center space-x-7 text-[13.5px] font-black text-gray-700 dark:text-slate-150 ml-auto">
          
          {/* Item 1: Destinations */}
          <button
            onMouseEnter={() => setActiveMegaMenu("destinations")}
            onClick={() => handleNavClick("destinations")}
            className={`flex items-center gap-1.5 py-1.5 transition-all outline-none focus:outline-none cursor-pointer ${
              activeMegaMenu === "destinations" || currentTab === "destinations" ? "text-[#0047AB] dark:text-blue-400" : "hover:text-[#0047AB] dark:hover:text-blue-400"
            }`}
          >
            <span>Destinations</span>
            <ChevronDown className={`h-4.5 w-4.5 text-gray-400 transition-transform ${activeMegaMenu === "destinations" ? "rotate-180 text-blue-500" : ""}`} />
          </button>
 
          {/* Item 2: Find courses */}
          <button
            onMouseEnter={() => setActiveMegaMenu("courses")}
            onClick={() => handleNavClick("search")}
            className={`flex items-center gap-1.5 py-1.5 transition-all outline-none focus:outline-none cursor-pointer ${
              activeMegaMenu === "courses" || currentTab === "search" || currentTab === "calculator" ? "text-[#0047AB] dark:text-blue-400" : "hover:text-[#0047AB] dark:hover:text-blue-400"
            }`}
          >
            <span>Explore Courses</span>
            <ChevronDown className={`h-4.5 w-4.5 text-gray-400 transition-transform ${activeMegaMenu === "courses" ? "rotate-180 text-blue-500" : ""}`} />
          </button>
 
          {/* Item 3: Student Services */}
          <button
            onMouseEnter={() => setActiveMegaMenu("services")}
            onClick={() => handleNavClick("services")}
            className={`flex items-center gap-1.5 py-1.5 transition-all outline-none focus:outline-none cursor-pointer ${
              activeMegaMenu === "services" || currentTab === "services" ? "text-[#0047AB] dark:text-blue-400" : "hover:text-[#0047AB] dark:hover:text-blue-400"
            }`}
          >
            <span>Student Essentials</span>
            <ChevronDown className={`h-4.5 w-4.5 text-gray-400 transition-transform ${activeMegaMenu === "services" ? "rotate-180 text-blue-500" : ""}`} />
          </button>
 
          {/* Item 4: Study Prep & Tests */}
          <button
            onMouseEnter={() => setActiveMegaMenu("tests")}
            onClick={() => handleNavClick("tests")}
            className={`flex items-center gap-1.5 py-1.5 transition-all outline-none focus:outline-none cursor-pointer ${
              activeMegaMenu === "tests" || currentTab === "tests" ? "text-[#0047AB] dark:text-blue-400" : "hover:text-[#0047AB] dark:hover:text-blue-400"
            }`}
          >
            <span>Test Preparation</span>
            <ChevronDown className={`h-4.5 w-4.5 text-gray-400 transition-transform ${activeMegaMenu === "tests" ? "rotate-180 text-blue-500" : ""}`} />
          </button>

          {/* Item 4b: Working Visa Dropdown */}
          <button
            onMouseEnter={() => setActiveMegaMenu("workvisas")}
            onClick={() => handleNavClick("work-visa")}
            className={`flex items-center gap-1.5 py-1.5 transition-all outline-none focus:outline-none cursor-pointer ${
              activeMegaMenu === "workvisas" || currentTab === "work-visa" ? "text-[#0047AB] dark:text-blue-400" : "hover:text-[#0047AB] dark:hover:text-blue-400"
            }`}
          >
            <span>Work Visa</span>
            <ChevronDown className={`h-4.5 w-4.5 text-gray-400 transition-transform ${activeMegaMenu === "workvisas" ? "rotate-180 text-blue-500" : ""}`} />
          </button>


          {/* Item 5: Compatibility Direct Link */}
          <button
            onClick={() => handleNavClick("eligibility")}
            className={`px-5 py-2 rounded-full border font-bold text-white transition-all hover:scale-[1.02] active:scale-95 ${
              currentTab === "eligibility"
                ? "bg-[#155dfc] border-[#155dfc] shadow-md shadow-blue-500/20"
                : "bg-[#155dfc] border-[#155dfc] hover:bg-[#0f4ed4] hover:border-[#0f4ed4] shadow-sm shadow-blue-500/10"
            }`}
          >
            Verify Admissions
          </button>
        </nav>

        {/* Global Side CTA Operations */}
        <div className="flex items-center space-x-3 md:space-x-4">
          
          {/* Drawer Menu Button for smaller screens */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 select-none transition-all duration-200 shadow-3xs cursor-pointer active:scale-95"
            aria-expanded={mobileMenuOpen}
          >
            <span className="text-[10px] font-black uppercase tracking-wider pl-1 font-sans">
              {mobileMenuOpen ? "Close" : "Menu"}
            </span>
            {mobileMenuOpen ? <X className="h-4 w-4 text-[#0047AB] dark:text-blue-400" /> : <Menu className="h-4 w-4 text-[#0047AB] dark:text-blue-400" />}
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. ADVANCED DESKTOP MEGA MENU OVERLAYS (FRAMER-MOTION DRIVEN) */}
      {/* ========================================================= */}
      <AnimatePresence>
        {activeMegaMenu && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 right-0 top-full bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-slate-800 shadow-2xl z-50 overflow-hidden hidden lg:block"
          >
            <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8">
              
              {/* CONTENT CASE 1: DESTINATIONS CAREER WINGS MEGA DIRECTORY */}
              {activeMegaMenu === "destinations" && (
                <div className="grid grid-cols-12 gap-8">
                  {/* Left Column: Grid of Countries */}
                  <div className="col-span-8 pr-6 border-r border-gray-100 dark:border-slate-800">
                    <h4 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-4">Study Destinations</h4>
                    <div className="grid grid-cols-3 gap-5">
                      {DESTINATIONS.map((dest) => (
                        <div 
                          key={dest.id}
                          onClick={() => handleCountrySelection(dest.id)}
                          className="flex items-center gap-3.5 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900 border border-transparent hover:border-slate-100 dark:hover:border-slate-800 cursor-pointer transition-all group"
                        >
                          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-gray-105 shadow-xs">
                            <img alt={dest.name} src={dest.flagImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          </div>
                          <div>
                            <h5 className="font-extrabold text-[#0047AB] dark:text-blue-400 text-sm group-hover:underline">{dest.name}</h5>
                            <p className="text-[10.5px] text-gray-400 dark:text-slate-400 line-clamp-1 font-semibold">QS Colleges &amp; Intakes</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Dynamic Value Card */}
                  <div className="col-span-4 flex flex-col justify-between bg-gradient-to-br from-blue-50/50 to-white dark:from-slate-900 dark:to-slate-950 p-6 rounded-3xl border border-blue-500/10">
                    <div className="space-y-3">
                      <div className="bg-blue-100 dark:bg-slate-800 p-2.5 rounded-2xl text-blue-600 dark:text-blue-400 w-fit">
                        <Compass className="h-6 w-6" />
                      </div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-base leading-snug">Need help choosing a Country?</h4>
                      <p className="text-xs text-gray-500 dark:text-slate-350 leading-relaxed font-semibold">
                        Every global city runs specific post-study immigration and grant allowances unique to candidate profiles. Try our automated check.
                      </p>
                    </div>
                    <button
                      onClick={() => handleNavClick("eligibility")}
                      className="mt-4 w-full bg-[#0047AB] hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-extrabold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      Verify Compatibility Now
                      <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform" />
                    </button>
                  </div>
                </div>
              )}

              {/* CONTENT CASE 2: DETAILED COURSE RESEARCH AND SEARCH */}
              {activeMegaMenu === "courses" && (
                <div className="grid grid-cols-12 gap-8">
                  {/* Left Column: Browse subjects */}
                  <div className="col-span-4 space-y-4">
                    <h4 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Browse by Field</h4>
                    <div className="space-y-1.5">
                      {[
                        "Computer Science & Information Tech",
                        "Business Administration & MBA",
                        "Data Analytics & Engineering",
                        "Social Sciences & Bio-medicine"
                      ].map((sub, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleNavClick("search")}
                          className="w-full text-left p-2.5 text-xs font-bold text-gray-700 dark:text-slate-300 hover:text-[#0047AB] dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl flex items-center justify-between group"
                        >
                          <span>{sub}</span>
                          <ArrowRight className="h-3.5 w-3.5 text-gray-350 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Center Column: Direct Tools */}
                  <div className="col-span-4 space-y-4 border-l border-r border-gray-100 dark:border-slate-800 px-6">
                    <h4 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Student Search Tools</h4>
                    <div className="space-y-3.5">
                      <div 
                        onClick={() => handleNavClick("search")}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <div className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 p-2 rounded-xl">
                          <Compass className="h-5 w-5" />
                        </div>
                        <div>
                          <h5 className="font-extrabold text-gray-900 dark:text-white text-xs group-hover:underline">Direct Course Searcher</h5>
                          <p className="text-[10px] text-gray-400">Database of 1,200+ partner files</p>
                        </div>
                      </div>

                      <div 
                        onClick={() => handleNavClick("calculator")}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <div className="bg-blue-50 dark:bg-blue-955/40 text-blue-600 dark:text-blue-400 p-2 rounded-xl">
                          <DollarSign className="h-5 w-5" />
                        </div>
                        <div>
                          <h5 className="font-extrabold text-gray-900 dark:text-white text-xs group-hover:underline">Cost of Living Calculator</h5>
                          <p className="text-[10px] text-gray-400">Analyze real-time rent &amp; bills</p>
                        </div>
                      </div>

                      <div 
                        onClick={() => handleNavClick("eligibility")}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <div className="bg-purple-50 dark:bg-purple-955/40 text-purple-600 dark:text-purple-400 p-2 rounded-xl">
                          <Award className="h-5 w-5" />
                        </div>
                        <div>
                          <h5 className="font-extrabold text-gray-900 dark:text-white text-xs group-hover:underline">Academic Scholarship Finder</h5>
                          <p className="text-[10px] text-gray-400">Match active merit waivers</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Visual Panel */}
                  <div className="col-span-4 bg-orange-50/50 dark:bg-slate-900/40 border border-orange-200/20 rounded-3xl p-6 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase w-fit tracking-wider">
                        Active Grants
                      </div>
                      <h4 className="font-extrabold text-gray-900 dark:text-white text-sm">Save Up to 100% Tuition Fees</h4>
                      <p className="text-[11px] text-gray-500 dark:text-slate-400 leading-normal font-semibold">
                        Our direct agreements allow us to negotiate custom scholarship budgets for premium high school and bachelors candidates.
                      </p>
                    </div>
                    <button
                      onClick={() => handleNavClick("search")}
                      className="mt-4 bg-[#0047AB] hover:bg-blue-700 text-white font-extrabold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2"
                    >
                      Browse Eligible Degrees
                    </button>
                  </div>
                </div>
              )}

              {/* CONTENT CASE 3: STUDENT SERVICES ESSENTIALS */}
              {activeMegaMenu === "services" && (
                <div className="grid grid-cols-12 gap-8">
                  {/* Column 1: Academic Support */}
                  <div className="col-span-4 space-y-4">
                    <h4 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Admissions &amp; Paperwork</h4>
                    <ul className="space-y-2 text-xs font-bold text-gray-650 dark:text-slate-300">
                      <li onClick={() => handleNavClick("university-finder")} className="flex items-center gap-2 text-orange-600 hover:text-orange-500 cursor-pointer p-1.5 rounded-xl bg-orange-50/50 dark:bg-slate-905 border border-dashed border-orange-200 mt-1 mb-2 font-black shadow-sm">
                        <Search className="h-4 w-4 text-orange-500" /> University Finder 🎯
                      </li>
                      <li onClick={() => handleNavClick("services")} className="flex items-center gap-2 hover:text-[#0047AB] dark:hover:text-blue-400 cursor-pointer p-1 rounded hover:bg-slate-50 dark:hover:bg-slate-900">
                        <FileText className="h-4 w-4 text-blue-500" /> Free Profile Evaluation Diagnostics
                      </li>
                      <li onClick={() => handleNavClick("services")} className="flex items-center gap-2 hover:text-[#0047AB] dark:hover:text-blue-400 cursor-pointer p-1 rounded hover:bg-slate-50 dark:hover:bg-slate-900">
                        <Award className="h-4 w-4 text-emerald-500" /> Professional SOP Polishing Assistance
                      </li>
                      <li onClick={() => handleNavClick("services")} className="flex items-center gap-2 hover:text-[#0047AB] dark:hover:text-blue-400 cursor-pointer p-1 rounded hover:bg-slate-50 dark:hover:bg-slate-900">
                        <CheckCircle className="h-4 w-4 text-purple-500" /> Letter of Recommendation (LOR) Reviews
                      </li>
                      <li onClick={() => handleNavClick("services")} className="flex items-center gap-2 hover:text-[#0047AB] dark:hover:text-blue-400 cursor-pointer p-1 rounded hover:bg-slate-50 dark:hover:bg-slate-900">
                        <FileCheck className="h-4 w-4 text-orange-500" /> Transcripts Certification Checklist
                      </li>
                      <li onClick={() => handleNavClick("drive")} className="flex items-center gap-2 text-emerald-600 hover:text-emerald-500 cursor-pointer p-1.5 rounded-xl bg-emerald-50/50 dark:bg-slate-950 border border-dashed border-emerald-200 mt-1 mb-2 font-black shadow-3xs">
                        <Database className="h-4 w-4 text-emerald-500 shrink-0" /> Google Drive Document Vault 🚀
                      </li>
                    </ul>
                  </div>

                  {/* Column 2: Practical Extras */}
                  <div className="col-span-4 space-y-4 border-l border-r border-gray-100 dark:border-slate-800 px-6">
                    <h4 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Student Living &amp; Finance</h4>
                    <ul className="space-y-2 text-xs font-bold text-gray-650 dark:text-slate-300">
                      <li onClick={() => handleNavClick("services")} className="flex items-center gap-2 hover:text-[#0047AB] dark:hover:text-blue-400 cursor-pointer p-1 rounded hover:bg-slate-50 dark:hover:bg-slate-900">
                        <DollarSign className="h-4 w-4 text-blue-500" /> Priority Educational Loans Support
                      </li>
                      <li onClick={() => handleNavClick("services")} className="flex items-center gap-2 hover:text-[#0047AB] dark:hover:text-blue-400 cursor-pointer p-1 rounded hover:bg-slate-50 dark:hover:bg-slate-900">
                        <ShieldCheck className="h-4 w-4 text-purple-500" /> Visa Interview Core Mock Training Rooms
                      </li>
                      <li onClick={() => handleNavClick("services")} className="flex items-center gap-2 hover:text-[#0047AB] dark:hover:text-blue-400 cursor-pointer p-1 rounded hover:bg-slate-50 dark:hover:bg-slate-900">
                        <Home className="h-4 w-4 text-teal-500" /> Global Student Accommodations &amp; Housing
                      </li>
                      <li onClick={() => handleNavClick("services")} className="flex items-center gap-2 hover:text-[#0047AB] dark:hover:text-blue-400 cursor-pointer p-1 rounded hover:bg-slate-50 dark:hover:bg-slate-900">
                        <Plane className="h-4 w-4 text-pink-500" /> Pre-Departure Briefings &amp; Airport Transits
                      </li>
                    </ul>
                  </div>

                  {/* Column 3: Counselling Promo */}
                  <div className="col-span-4 bg-blue-50/50 dark:bg-slate-900/60 rounded-3xl p-5 border border-blue-100 dark:border-slate-800 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h4 className="font-extrabold text-sm text-gray-950 dark:text-white">Need formal documentation review?</h4>
                      <p className="text-[11px] text-gray-500 dark:text-slate-400 leading-normal font-semibold">
                        Avoid costly administrative mistakes or visa issues. Drop your details to request an automated profile verification with senior CWC advisors.
                      </p>
                    </div>
                    <button 
                      onClick={openCounsellingModal}
                      className="mt-4 bg-[#0047AB] hover:bg-blue-700 text-white font-extrabold py-2.5 rounded-xl text-xs text-center flex items-center justify-center gap-1.5"
                    >
                      Book 1-on-1 Appointment
                    </button>
                  </div>
                </div>
              )}

              {/* CONTENT CASE 4: TEST PREPARATION HIERARCHICAL DIRECTORY */}
              {activeMegaMenu === "tests" && (
                <div className="grid grid-cols-5 gap-6">
                  
                  {/* Category 1: IELTS */}
                  <div className="space-y-4 bg-slate-50/50 dark:bg-slate-900/40 p-4 rounded-xl border border-gray-100 dark:border-slate-800 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 p-1.5 rounded-lg font-black text-xs">
                          IELTS
                        </div>
                        <h4 className="text-sm font-black text-gray-955 dark:text-white">IELTS</h4>
                      </div>
                      <ul className="space-y-2">
                        {[
                          "What is IELTS?",
                          "IELTS Training",
                          "Book an IELTS Test"
                        ].map((item, idx) => (
                          <li key={idx}>
                            <button
                              onClick={() => handleNavClick("prep-ielts")}
                              className="text-left text-xs font-bold text-gray-650 dark:text-slate-300 hover:text-[#0047AB] dark:hover:text-blue-400 hover:underline transition-colors flex items-center gap-1.5 cursor-pointer"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                              {item}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      onClick={() => handleTestPrepClick("ielts")}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-[10px] py-2 px-2.5 rounded-xl flex items-center justify-center gap-1 cursor-pointer transition-all hover:scale-[1.02] shadow-sm animate-pulse"
                    >
                      ⚡ Start Free Mock Test
                    </button>
                  </div>

                  {/* Category 2: PTE */}
                  <div className="space-y-4 bg-slate-50/50 dark:bg-slate-900/40 p-4 rounded-xl border border-gray-100 dark:border-slate-800 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 p-1.5 rounded-lg font-black text-xs">
                          PTE
                        </div>
                        <h4 className="text-sm font-black text-gray-955 dark:text-white">PTE</h4>
                      </div>
                      <ul className="space-y-2">
                        {[
                          "What is PTE?",
                          "PTE Coaching",
                          "Book a PTE Test"
                        ].map((item, idx) => (
                          <li key={idx}>
                            <button
                              onClick={() => handleNavClick("prep-pte")}
                              className="text-left text-xs font-bold text-gray-650 dark:text-slate-300 hover:text-[#0047AB] dark:hover:text-blue-400 hover:underline transition-colors flex items-center gap-1.5 cursor-pointer"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                              {item}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      onClick={() => handleTestPrepClick("pte")}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10px] py-2 px-2.5 rounded-xl flex items-center justify-center gap-1 cursor-pointer transition-all hover:scale-[1.02] shadow-sm animate-pulse"
                    >
                      ⚡ Start Free Mock Test
                    </button>
                  </div>

                  {/* Category 3: TOEFL */}
                  <div className="space-y-4 bg-slate-50/50 dark:bg-slate-900/40 p-4 rounded-xl border border-gray-100 dark:border-slate-800 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 p-1.5 rounded-lg font-black text-xs">
                          TOEFL
                        </div>
                        <h4 className="text-sm font-black text-gray-955 dark:text-white">TOEFL</h4>
                      </div>
                      <ul className="space-y-2">
                        {[
                          "What is TOEFL?",
                          "TOEFL Preparation",
                          "Book TOEFL Test"
                        ].map((item, idx) => (
                          <li key={idx}>
                            <button
                              onClick={() => handleNavClick("prep-toefl")}
                              className="text-left text-xs font-bold text-gray-650 dark:text-slate-300 hover:text-[#0047AB] dark:hover:text-blue-400 hover:underline transition-colors flex items-center gap-1.5 cursor-pointer"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                              {item}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      onClick={() => handleTestPrepClick("toefl")}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black text-[10px] py-2 px-2.5 rounded-xl flex items-center justify-center gap-1 cursor-pointer transition-all hover:scale-[1.02] shadow-sm animate-pulse"
                    >
                      ⚡ Start Free Mock Test
                    </button>
                  </div>

                  {/* Category 4: Duolingo */}
                  <div className="space-y-4 bg-slate-50/50 dark:bg-slate-900/40 p-4 rounded-xl border border-gray-100 dark:border-slate-800 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 p-1.5 rounded-lg font-black text-xs">
                          DET
                        </div>
                        <h4 className="text-sm font-black text-gray-955 dark:text-white">Duolingo</h4>
                      </div>
                      <ul className="space-y-2">
                        {[
                          "What is Duolingo?",
                          "Duolingo Preparation",
                          "Book Duolingo Test"
                        ].map((item, idx) => (
                          <li key={idx}>
                            <button
                              onClick={() => handleNavClick("prep-duolingo")}
                              className="text-left text-xs font-bold text-gray-650 dark:text-slate-300 hover:text-[#0047AB] dark:hover:text-blue-400 hover:underline transition-colors flex items-center gap-1.5 cursor-pointer"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                              {item}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      onClick={() => handleTestPrepClick("duolingo")}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white font-black text-[10px] py-2 px-2.5 rounded-xl flex items-center justify-center gap-1 cursor-pointer transition-all hover:scale-[1.02] shadow-sm animate-pulse"
                    >
                      ⚡ Start Free Mock Test
                    </button>
                  </div>

                  {/* Category 5: Spoken English */}
                  <div className="space-y-4 bg-blue-50/50 dark:bg-slate-900 p-4 rounded-xl border border-blue-100 dark:border-slate-800/80 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 p-1.5 rounded-lg font-black text-xs">
                          ESL
                        </div>
                        <h4 className="text-sm font-black text-gray-955 dark:text-white">Spoken English</h4>
                      </div>
                      <p className="text-[11px] text-gray-500 dark:text-slate-400 leading-normal font-semibold font-medium">
                        Master fluent communication skills, pronunciation accentuation, and face-to-face interview confidence.
                      </p>
                    </div>
                    <button
                      onClick={() => handleTestPrepClick("spoken")}
                      className="w-full bg-[#0047AB] hover:bg-blue-700 text-white font-extrabold py-2.5 px-3 rounded-xl text-xs text-center flex items-center justify-center gap-1 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
                    >
                      Join Free Masterclass
                    </button>
                  </div>
                </div>
              )}

              {/* CONTENT CASE 5: WORKING VISAS & PR PATHWAY */}
              {activeMegaMenu === "workvisas" && (
                <div className="grid grid-cols-12 gap-8">
                  {/* Left Column: List of Work Visas */}
                  <div className="col-span-8 pr-6 border-r border-gray-100 dark:border-slate-800">
                    <h4 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-4">Official Working Visas</h4>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { id: "poland", name: "Poland work visa", desc: "Schengen Career Entry" },
                        { id: "newzealand_work", name: "New Zealand work visa", desc: "Green List Careers" },
                        { id: "albania", name: "Albania work visa", desc: "Simplified Permits" },
                        { id: "canada_work", name: "Canada work visa", desc: "LMIA Sponsorship" },
                        { id: "aus_pr", name: "Australia PR", desc: "Points-Based GSM Class" },
                        { id: "uk_work", name: "UK work visa", desc: "Skilled Worker Route" },
                        { id: "aus_462", name: "AUS Skilled Visa 462", desc: "Work and Holiday Guide" }
                      ].map((visa) => (
                        <div 
                          key={visa.id}
                          onClick={() => handleWorkVisaSelection(visa.id)}
                          className="p-3 bg-slate-50/50 hover:bg-slate-50 dark:bg-slate-900/30 dark:hover:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl cursor-pointer transition-all group hover:scale-[1.01] active:scale-[0.99]"
                        >
                          <h5 className="font-extrabold text-[#0047AB] dark:text-blue-400 text-xs group-hover:underline">{visa.name}</h5>
                          <p className="text-[9.5px] text-gray-400 mt-0.5 font-bold uppercase tracking-wider">{visa.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Dynamic Counselling Box */}
                  <div className="col-span-4 bg-gradient-to-br from-blue-50/40 to-white dark:from-slate-900 dark:to-slate-950 p-6 rounded-3xl border border-blue-500/10 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="bg-emerald-100 dark:bg-emerald-950/40 text-emerald-650 p-2 rounded-xl w-fit">
                        <Briefcase className="h-5 w-5" />
                      </div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-xs sm:text-sm">Licensed Immigration Consultation</h4>
                      <p className="text-[10.5px] text-gray-400 dark:text-slate-350 leading-relaxed font-semibold">
                        Get direct eligibility answers regarding salaries, LMIA checks, ACS skill assessments, and Sponsor licenses.
                      </p>
                    </div>
                    <button
                      onClick={openCounsellingModal}
                      className="mt-4 bg-[#0047AB] hover:bg-blue-700 dark:bg-blue-600 text-white font-extrabold py-2.5 rounded-xl text-xs flex justify-center items-center gap-1.5 cursor-pointer"
                    >
                      Book Free Work Assessment
                    </button>
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* 3. RESPONSIVE MOBILE NAVIGATION DRAWERS                     */}
      {/* ========================================================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl py-4 px-4 flex flex-col space-y-4 max-h-[85vh] overflow-y-auto">
          
          {/* Menu Item 1 Accordion: Destinations */}
          <div className="border-b border-gray-100 dark:border-slate-800 pb-2">
            <button
              onClick={() => setMobileDestinationsOpen(!mobileDestinationsOpen)}
              className="w-full flex justify-between items-center py-2.5 text-sm font-black text-gray-700 dark:text-slate-200"
            >
              <span>Destinations</span>
              <ChevronDown className={`h-4.5 w-4.5 transition-transform ${mobileDestinationsOpen ? "rotate-180 text-blue-500" : ""}`} />
            </button>
            {mobileDestinationsOpen && (
              <div className="grid grid-cols-2 gap-2.5 pt-2 pl-2">
                {DESTINATIONS.map((dest) => (
                  <button
                    key={dest.id}
                    onClick={() => handleCountrySelection(dest.id)}
                    className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-left"
                  >
                    <img alt={dest.name} src={dest.flagImage} className="w-5 h-5 rounded-full object-cover shrink-0" />
                    <span className="text-xs font-bold text-gray-800 dark:text-slate-250">{dest.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Menu Item 2 Accordion: Explore Courses */}
          <div className="border-b border-gray-100 dark:border-slate-800 pb-2">
            <button
              onClick={() => setMobileCoursesOpen(!mobileCoursesOpen)}
              className="w-full flex justify-between items-center py-2.5 text-sm font-black text-gray-700 dark:text-slate-200"
            >
              <span>Explore Courses</span>
              <ChevronDown className={`h-4.5 w-4.5 transition-transform ${mobileCoursesOpen ? "rotate-180 text-blue-500" : ""}`} />
            </button>
            {mobileCoursesOpen && (
              <div className="flex flex-col gap-1.5 pt-2 pl-3">
                <button 
                  onClick={() => handleNavClick("search")}
                  className="text-left text-xs text-gray-500 dark:text-slate-300 py-1.5 font-bold hover:text-blue-500"
                >
                  • Course Searcher Database
                </button>
                <button 
                  onClick={() => handleNavClick("calculator")}
                  className="text-left text-xs text-gray-500 dark:text-slate-300 py-1.5 font-bold hover:text-blue-500"
                >
                  • Cost of Living Calculator
                </button>
                <button 
                  onClick={() => handleNavClick("eligibility")}
                  className="text-left text-xs text-gray-500 dark:text-slate-300 py-1.5 font-bold hover:text-blue-500"
                >
                  • Scholarship Finder
                </button>
              </div>
            )}
          </div>

          {/* Menu Item 3 Accordion: Essentials */}
          <div className="border-b border-gray-100 dark:border-slate-800 pb-2">
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="w-full flex justify-between items-center py-2.5 text-sm font-black text-gray-700 dark:text-slate-200"
            >
              <span>Student Essentials</span>
              <ChevronDown className={`h-4.5 w-4.5 transition-transform ${mobileServicesOpen ? "rotate-180 text-blue-500" : ""}`} />
            </button>
            {mobileServicesOpen && (
              <div className="flex flex-col gap-1.5 pt-2 pl-3">
                <button onClick={() => handleNavClick("university-finder")} className="text-left text-xs text-orange-600 dark:text-orange-400 py-1.5 font-black hover:text-orange-500 flex items-center gap-1">
                  • 🎯 University Finder
                </button>
                <button onClick={() => handleNavClick("drive")} className="text-left text-xs text-emerald-600 dark:text-emerald-400 py-1.5 font-black hover:text-emerald-500 flex items-center gap-1">
                  • 🚀 Google Drive Vault
                </button>
                <button onClick={() => handleNavClick("services")} className="text-left text-xs text-gray-500 dark:text-slate-300 py-1.5 font-bold hover:text-blue-500">
                  • Document Polish &amp; SOP templates
                </button>
                <button onClick={() => handleNavClick("services")} className="text-left text-xs text-gray-500 dark:text-slate-300 py-1.5 font-bold hover:text-blue-500">
                  • Study Education Loans Support
                </button>
                <button onClick={() => handleNavClick("services")} className="text-left text-xs text-gray-500 dark:text-slate-300 py-1.5 font-bold hover:text-blue-500">
                  • Student Visas MockPrep Training
                </button>
              </div>
            )}
          </div>

          {/* Menu Item 4 Accordion: Test Preparation */}
          <div className="border-b border-gray-100 dark:border-slate-800 pb-2">
            <button
              onClick={() => setMobileIeltsOpen(!mobileIeltsOpen)}
              className="w-full flex justify-between items-center py-2.5 text-sm font-black text-gray-700 dark:text-slate-200"
            >
              <span>Test Preparation</span>
              <ChevronDown className={`h-4.5 w-4.5 transition-transform ${mobileIeltsOpen ? "rotate-180 text-blue-500" : ""}`} />
            </button>
            {mobileIeltsOpen && (
              <div className="flex flex-col gap-5 pt-2 pl-3">
                
                {/* IELTS Subcategory */}
                <div className="space-y-2 border-l-2 border-blue-500/20 pl-3">
                  <h5 className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase">IELTS</h5>
                  <div className="flex flex-col gap-1.5 pl-1">
                    {["What is IELTS?", "IELTS Training", "Book an IELTS Test"].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleNavClick("prep-ielts")}
                        className="text-left text-[11px] text-gray-550 dark:text-slate-300 py-0.5 font-bold hover:text-blue-500"
                      >
                        • {item}
                      </button>
                    ))}
                    <button
                      onClick={() => handleTestPrepClick("ielts")}
                      className="mt-1 w-full max-w-[180px] bg-blue-600 hover:bg-blue-700 text-white font-black text-[9.5px] py-1.5 px-2 rounded-lg flex items-center justify-center gap-1 cursor-pointer"
                    >
                      ⚡ Start Free IELTS Mock
                    </button>
                  </div>
                </div>

                {/* PTE Subcategory */}
                <div className="space-y-2 border-l-2 border-emerald-500/20 pl-3">
                  <h5 className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase">PTE</h5>
                  <div className="flex flex-col gap-1.5 pl-1">
                    {["What is PTE?", "PTE Coaching", "Book a PTE Test"].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleNavClick("prep-pte")}
                        className="text-left text-[11px] text-gray-550 dark:text-slate-300 py-0.5 font-bold hover:text-emerald-500"
                      >
                        • {item}
                      </button>
                    ))}
                    <button
                      onClick={() => handleTestPrepClick("pte")}
                      className="mt-1 w-full max-w-[180px] bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[9.5px] py-1.5 px-2 rounded-lg flex items-center justify-center gap-1 cursor-pointer"
                    >
                      ⚡ Start Free PTE Mock
                    </button>
                  </div>
                </div>

                {/* TOEFL Subcategory */}
                <div className="space-y-2 border-l-2 border-purple-500/20 pl-3">
                  <h5 className="text-xs font-black text-purple-600 dark:text-purple-400 uppercase">TOEFL</h5>
                  <div className="flex flex-col gap-1.5 pl-1">
                    {["What is TOEFL?", "TOEFL Preparation", "Book TOEFL Test"].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleNavClick("prep-toefl")}
                        className="text-left text-[11px] text-gray-550 dark:text-slate-300 py-0.5 font-bold hover:text-purple-500"
                      >
                        • {item}
                      </button>
                    ))}
                    <button
                      onClick={() => handleTestPrepClick("toefl")}
                      className="mt-1 w-full max-w-[180px] bg-purple-600 hover:bg-purple-700 text-white font-black text-[9.5px] py-1.5 px-2 rounded-lg flex items-center justify-center gap-1 cursor-pointer"
                    >
                      ⚡ Start Free TOEFL Mock
                    </button>
                  </div>
                </div>

                {/* Duolingo Subcategory */}
                <div className="space-y-2 border-l-2 border-amber-500/20 pl-3">
                  <h5 className="text-xs font-black text-amber-600 dark:text-amber-500 uppercase">Duolingo</h5>
                  <div className="flex flex-col gap-1.5 pl-1">
                    {["What is Duolingo?", "Duolingo Preparation", "Book Duolingo Test"].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleNavClick("prep-duolingo")}
                        className="text-left text-[11px] text-gray-550 dark:text-slate-300 py-0.5 font-bold hover:text-amber-500"
                      >
                        • {item}
                      </button>
                    ))}
                    <button
                      onClick={() => handleTestPrepClick("duolingo")}
                      className="mt-1 w-full max-w-[180px] bg-amber-500 hover:bg-amber-600 text-white font-black text-[9.5px] py-1.5 px-2 rounded-lg flex items-center justify-center gap-1 cursor-pointer"
                    >
                      ⚡ Start Free Duolingo Mock
                    </button>
                  </div>
                </div>

                {/* Spoken English */}
                <div className="pl-3">
                  <button
                    onClick={() => handleTestPrepClick("spoken")}
                    className="w-full text-left text-xs font-black text-orange-605 dark:text-orange-400 uppercase hover:text-orange-500 flex items-center gap-1"
                  >
                    Spoken English Coaching ⚡ →
                  </button>
                </div>

              </div>
            )}
          </div>

          {/* Menu Item 4b Accordion: Working Visa */}
          <div className="border-b border-gray-100 dark:border-slate-800 pb-2">
            <button
              onClick={() => setMobileWorkVisaOpen(!mobileWorkVisaOpen)}
              className="w-full flex justify-between items-center py-2.5 text-sm font-black text-gray-700 dark:text-slate-200"
            >
              <span>Work Visa</span>
              <ChevronDown className={`h-4.5 w-4.5 transition-transform ${mobileWorkVisaOpen ? "rotate-180 text-blue-500" : ""}`} />
            </button>
            {mobileWorkVisaOpen && (
              <div className="flex flex-col gap-1.5 pt-2 pl-3">
                {[
                  { id: "poland", name: "Poland work visa" },
                  { id: "newzealand_work", name: "New Zealand work visa" },
                  { id: "albania", name: "Albania work visa" },
                  { id: "canada_work", name: "Canada work visa" },
                  { id: "aus_pr", name: "Australia PR" },
                  { id: "uk_work", name: "UK work visa" },
                  { id: "aus_462", name: "AUS Skilled Visa 462" }
                ].map((visa) => (
                  <button 
                    key={visa.id}
                    onClick={() => handleWorkVisaSelection(visa.id)}
                    className="text-left text-xs text-slate-500 dark:text-slate-350 py-1.5 font-bold hover:text-blue-500"
                  >
                    • {visa.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button 
            onClick={() => {
              handleNavClick("community");
              if (setIsAdminView) setIsAdminView(false);
            }}
            className={`w-full text-left py-2.5 text-sm font-black border-b border-gray-100 dark:border-slate-800 flex items-center gap-1.5 transition-all ${
              currentTab === "community" && !isAdminView ? "text-amber-600 dark:text-amber-400 font-extrabold" : "text-gray-700 dark:text-slate-200"
            }`}
          >
            <Users className="h-4 w-4 shrink-0 text-amber-500" />
            <span>Join Community</span>
          </button>

          <button 
            onClick={() => {
              handleNavClick("community");
              if (setIsAdminView) setIsAdminView(true);
            }}
            className={`w-full text-left py-2.5 text-sm font-black border-b border-gray-100 dark:border-slate-800 flex items-center gap-1.5 transition-all ${
              currentTab === "community" && isAdminView ? "text-amber-600 dark:text-amber-400 font-extrabold" : "text-gray-700 dark:text-slate-200"
            }`}
          >
            <Database className="h-4 w-4 shrink-0 text-amber-500" />
            <span>Admin 🛡️</span>
          </button>

          <button 
            onClick={() => handleNavClick("about")}
            className={`w-full text-left py-2.5 text-sm font-black border-b border-gray-100 dark:border-slate-800 flex items-center gap-1.5 transition-all ${
              currentTab === "about" ? "text-[#0047AB] dark:text-blue-400 font-extrabold" : "text-gray-700 dark:text-slate-200"
            }`}
          >
            <Compass className="h-4 w-4 shrink-0 text-indigo-500" />
            <span>About Us &amp; Trust</span>
          </button>

          <button 
            onClick={() => handleNavClick("blog")}
            className={`w-full text-left py-2.5 text-sm font-black border-b border-gray-100 dark:border-slate-800 flex items-center gap-1.5 transition-all ${
              currentTab === "blog" ? "text-[#0047AB] dark:text-blue-400 font-extrabold" : "text-gray-700 dark:text-slate-200"
            }`}
          >
            <BookOpen className="h-4 w-4 shrink-0 text-indigo-500" />
            <span>Blog &amp; Handbooks</span>
          </button>

          <button 
            onClick={() => handleNavClick("eligibility")}
            className="w-full text-left py-2.5 text-sm font-black text-gray-700 dark:text-slate-200 border-b border-gray-100 dark:border-slate-800"
          >
            Verify Admissions Eligibility
          </button>

          <button 
            onClick={() => handleNavClick("post-resume")}
            className="w-full text-left py-2.5 text-sm font-black text-blue-600 dark:text-blue-400 border-b border-gray-100 dark:border-slate-800 flex items-center gap-2"
          >
            <span>Post Resume &amp; ATS Scan 📄</span>
            <span className="bg-amber-100 text-amber-800 text-[9px] px-1.5 py-0.5 rounded font-mono font-black uppercase">NEW</span>
          </button>



          {/* Primary Mobile Trigger */}
          <div className="pt-4 flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); openCounsellingModal(); }}
              className="w-full py-3.5 bg-[#0047AB] dark:bg-blue-600 text-white font-extrabold rounded-2xl shadow-md text-center hover:bg-blue-700 text-sm"
            >
              Avail Free Appointment
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
