import React, { useState } from "react";
import { 
  GraduationCap, 
  Building2, 
  ArrowRight, 
  Globe, 
  CheckCircle2, 
  ShieldCheck, 
  PhoneCall, 
  FileText, 
  Compass, 
  Briefcase, 
  DollarSign, 
  Sparkles, 
  Award, 
  Layers, 
  Target, 
  Users, 
  BookOpen, 
  ChevronRight,
  TrendingUp,
  Landmark,
  Plane
} from "lucide-react";

interface CareerWingsEduPageProps {
  onBack: () => void;
  onBookCounselling: (details: string) => void;
  onNavigateTab?: (tabId: string) => void;
}

export default function CareerWingsEduPage({ onBack, onBookCounselling, onNavigateTab }: CareerWingsEduPageProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "structure" | "study-abroad" | "visas" | "funding" | "work-permits">("overview");

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      el.classList.add("ring-4", "ring-[#0047AB]/50", "rounded-3xl", "transition-all", "duration-700");
      setTimeout(() => {
        el.classList.remove("ring-4", "ring-[#0047AB]/50");
      }, 2500);
    }
  };

  return (
    <div className="bg-[#FCFAF7] dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Top Corporate Status Bar */}
      <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-950 text-white py-3.5 px-4 sm:px-8 md:px-12 text-xs font-mono border-b border-blue-900/30 flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Corporate Group
          </span>
          <span className="tracking-wide text-blue-200 font-bold">
            CWC Consulting Services India Private Limited
          </span>
          <span className="text-white/40 hidden md:inline">•</span>
          <span className="text-amber-300 text-[11px] hidden md:inline font-semibold">
            Career Wings Consultants &amp; Career Wings Edu Consultants
          </span>
        </div>
        <button
          onClick={onBack}
          className="text-xs text-blue-300 hover:text-white underline cursor-pointer shrink-0 ml-4 font-bold"
        >
          ← Back to Home
        </button>
      </div>

      {/* Hero Header Section */}
      <section className="relative overflow-hidden py-14 sm:py-20 bg-gradient-to-b from-blue-50/70 via-[#FCFAF7] to-white dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-950 border-b border-gray-150 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 flex flex-col lg:flex-row items-center gap-12">
          
          <div className="flex-1 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-[#0047AB]/10 text-[#0047AB] dark:bg-blue-950/60 dark:text-blue-300 border border-[#0047AB]/20 px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-wider">
              <Building2 className="h-4 w-4 text-[#0047AB] dark:text-blue-400" />
              <span>CWC Consulting Services India Private Limited</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white leading-[1.18] tracking-tight">
              Building Pathways for <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#0047AB] via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Global Education, Funding &amp; International Careers
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              <strong>CWC Consulting Services India Private Limited</strong> is the parent company and central corporate entity supporting our growing portfolio of international education, student visa, funding, work permit, and career-related services.
            </p>

            <p className="text-sm text-slate-650 dark:text-slate-400 leading-relaxed">
              With a structured business model and specialised service brands, CWC Consulting Services India Private Limited brings together expertise across international education and overseas career solutions. Our group operates through two sister concern brands, <strong>Career Wings Consultants</strong> and <strong>Career Wings Edu Consultants</strong>, which primarily focus on Study Abroad and Student Visa services.
            </p>

            <div className="flex flex-wrap gap-4 pt-3">
              <button
                onClick={() => onBookCounselling("Inquiry for Career Wings Edu Consultants / Study Abroad & Visa Services")}
                className="bg-[#0047AB] hover:bg-blue-700 text-white font-black px-7 py-3.5 rounded-xl text-sm flex items-center gap-2.5 shadow-lg shadow-blue-500/20 transition-all cursor-pointer hover:-translate-y-0.5"
              >
                <span>Consult Career Wings Edu</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <a
                href="#group-structure"
                className="bg-white dark:bg-slate-900 hover:bg-gray-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-gray-250 dark:border-slate-700 font-extrabold px-6 py-3.5 rounded-xl text-sm flex items-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <Layers className="h-4 w-4 text-[#0047AB]" />
                <span>Explore Group Structure</span>
              </a>
            </div>
          </div>

          {/* Quick Highlight Box with SEO Image */}
          <div className="w-full lg:w-[460px] bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl relative">
            <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=900"
                alt="Career Wings Edu Consultants - Global University Study Abroad Admissions and Student Visa Consultancy"
                className="w-full h-full object-cover"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-4">
                <span className="text-white text-xs font-bold font-mono tracking-wide drop-shadow-md">
                  CWC Group • International Study &amp; Career Architecture
                </span>
              </div>
              <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-700 to-indigo-700 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                Corporate Model
              </div>
            </div>

            <div className="p-6 sm:p-7 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/60 rounded-2xl border border-blue-100 dark:border-blue-900/50">
                  <ShieldCheck className="h-5 w-5 text-[#0047AB]" />
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900 dark:text-white">
                    One Parent Company
                  </h3>
                  <span className="text-xs font-bold text-gray-500 dark:text-slate-400">Two Education Brands. Multiple International Services.</span>
                </div>
              </div>
              
              <p className="text-xs text-gray-650 dark:text-slate-400 leading-relaxed font-medium">
                CWC Consulting Services India Private Limited also extends its services into education funding, financial assistance, international work permits, and overseas career opportunities, creating a broader platform for individuals planning their future abroad.
              </p>

              <div className="space-y-2.5 pt-3 border-t border-gray-100 dark:border-slate-800 text-xs">
                <div className="flex items-start gap-2 font-bold text-gray-800 dark:text-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>CWC Consulting Services India Pvt Ltd (Parent Company)</span>
                </div>
                <div className="flex items-start gap-2 font-bold text-gray-800 dark:text-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Career Wings Consultants (Sister Concern - Study Abroad &amp; Visas)</span>
                </div>
                <div className="flex items-start gap-2 font-bold text-gray-800 dark:text-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Career Wings Edu Consultants (Sister Concern - Study Abroad &amp; Visas)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Quick-Navigation Sub-Bar */}
      <div className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 py-3 px-4 sm:px-8 md:px-12 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-[10px] font-black uppercase text-gray-400 dark:text-slate-500 shrink-0 hidden sm:inline tracking-wider mr-1">
              Edu Directory:
            </span>
            <button
              onClick={() => scrollToSection("group-structure")}
              className="px-3 py-1.5 rounded-lg text-xs font-black bg-slate-100 hover:bg-blue-50 hover:text-[#0047AB] dark:bg-slate-800 dark:hover:bg-blue-950/60 dark:hover:text-blue-300 text-slate-700 dark:text-slate-300 transition-all shrink-0 cursor-pointer"
            >
              🏛️ Group Structure
            </button>
            <button
              onClick={() => scrollToSection("edu-study-abroad")}
              className="px-3 py-1.5 rounded-lg text-xs font-black bg-blue-50 text-[#0047AB] hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-300 dark:hover:bg-blue-900/70 transition-all shrink-0 cursor-pointer"
            >
              🎓 1. Study Abroad
            </button>
            <button
              onClick={() => scrollToSection("edu-student-visa")}
              className="px-3 py-1.5 rounded-lg text-xs font-black bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300 dark:hover:bg-emerald-900/70 transition-all shrink-0 cursor-pointer"
            >
              🛂 2. Student Visas
            </button>
            <button
              onClick={() => scrollToSection("edu-education-funding")}
              className="px-3 py-1.5 rounded-lg text-xs font-black bg-amber-50 text-amber-800 hover:bg-amber-100 dark:bg-amber-950/60 dark:text-amber-300 dark:hover:bg-amber-900/70 transition-all shrink-0 cursor-pointer"
            >
              💰 3. Education Funding
            </button>
            <button
              onClick={() => scrollToSection("edu-work-permits")}
              className="px-3 py-1.5 rounded-lg text-xs font-black bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:text-indigo-300 dark:hover:bg-indigo-900/70 transition-all shrink-0 cursor-pointer"
            >
              💼 4. Work Permits
            </button>
            <button
              onClick={() => scrollToSection("edu-processes")}
              className="px-3 py-1.5 rounded-lg text-xs font-black bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all shrink-0 cursor-pointer"
            >
              🔄 How It Works
            </button>
          </div>

          <button
            onClick={() => onBookCounselling("Career Wings Edu - Direct Inquiry")}
            className="hidden md:flex items-center gap-1.5 bg-[#0047AB] hover:bg-blue-700 text-white font-extrabold px-3.5 py-1.5 rounded-lg text-xs shrink-0 cursor-pointer shadow-xs"
          >
            <span>Talk to Advisor</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Group Structure Section */}
      <section id="group-structure" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-8 md:px-12 space-y-12 scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[#0047AB] dark:text-blue-400 font-black text-xs uppercase tracking-widest block">
            ORGANISATIONAL ARCHITECTURE
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-950 dark:text-white">
            Our Group Structure
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-400 font-medium">
            Under the parent company structure, our specialised brands serve different aspects of the international education and overseas career journey.
          </p>
        </div>

        {/* Corporate Hierarchy Diagram */}
        <div className="space-y-8">
          {/* Parent Company Card */}
          <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white p-7 sm:p-9 rounded-3xl shadow-xl border border-blue-800/40 relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div className="space-y-1">
                <span className="bg-amber-500 text-slate-950 font-black text-[11px] px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                  Parent Company
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white pt-2">
                  CWC Consulting Services India Private Limited
                </h3>
              </div>
              <div className="text-xs font-mono text-blue-200 bg-white/10 px-4 py-2 rounded-xl w-fit">
                Corporate • Financial • Operational • Strategy
              </div>
            </div>
            
            <p className="text-sm text-blue-100/90 leading-relaxed font-medium pt-5">
              CWC Consulting Services India Private Limited provides the overall corporate, financial, operational, and strategic framework for our business activities. It directly oversees corporate management, funding assistance, work permit services, and international career solutions.
            </p>
          </div>

          {/* Down Connector */}
          <div className="flex justify-center -my-3">
            <div className="h-8 w-0.5 bg-blue-400 dark:bg-blue-600"></div>
          </div>

          {/* Two Sister Concerns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Sister Concern 1: Career Wings Consultants */}
            <div className="bg-white dark:bg-slate-900 border border-blue-150 dark:border-slate-800 rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-all space-y-5">
              <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800"
                  alt="Career Wings Consultants - Overseas Education, Global University Admissions, and Campus Counselling"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-4">
                  <span className="text-white text-xs font-bold drop-shadow">
                    International Admissions &amp; University Shortlisting
                  </span>
                </div>
              </div>
              <div className="p-7 pt-2 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="bg-blue-50 text-[#0047AB] dark:bg-blue-950/80 dark:text-blue-300 text-xs font-black px-3 py-1 rounded-full uppercase">
                    Sister Concern
                  </span>
                  <Building2 className="h-5 w-5 text-[#0047AB]" />
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-950 dark:text-white">
                    Career Wings Consultants
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-slate-400 font-semibold mt-1">
                    Focuses primarily on international education &amp; student admissions.
                  </p>
                </div>

                <div className="space-y-2.5 pt-2">
                  <p className="text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                    Key Service Wings:
                  </p>
                  {[
                    "Study Abroad counselling",
                    "University and course selection",
                    "Student admissions",
                    "Student visa assistance",
                    "Application and documentation support",
                    "Pre-departure guidance",
                    "International education opportunities"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-gray-700 dark:text-slate-300 font-medium">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-slate-800">
                  <button
                    onClick={() => onBookCounselling("Career Wings Consultants: University Admissions & Study Abroad")}
                    className="w-full bg-[#0047AB]/10 hover:bg-[#0047AB] text-[#0047AB] hover:text-white font-extrabold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Connect with Career Wings Consultants</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Sister Concern 2: Career Wings Edu Consultants */}
            <div className="bg-white dark:bg-slate-900 border-2 border-indigo-200 dark:border-indigo-900/60 rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-all space-y-5 relative">
              <div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow">
                Edu Division
              </div>
              <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800"
                  alt="Career Wings Edu Consultants - Student Visa Guidance, Overseas University Documentation & Pre-departure"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-4">
                  <span className="text-white text-xs font-bold drop-shadow">
                    Student Visa Advisory &amp; Documentation Coordination
                  </span>
                </div>
              </div>
              <div className="p-7 pt-2 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="bg-indigo-50 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 text-xs font-black px-3 py-1 rounded-full uppercase">
                    Sister Concern
                  </span>
                  <GraduationCap className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-950 dark:text-white">
                    Career Wings Edu Consultants
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-slate-400 font-semibold mt-1">
                    Focuses primarily on international education and student visa services.
                  </p>
                </div>

                <div className="space-y-2.5 pt-2">
                  <p className="text-xs font-bold text-indigo-900 dark:text-indigo-300 uppercase tracking-wider">
                    Support Across:
                  </p>
                  {[
                    "Overseas education counselling",
                    "University applications",
                    "Course selection",
                    "Student visa guidance",
                    "Documentation assistance",
                    "Admission process coordination",
                    "Pre-departure support"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-gray-700 dark:text-slate-300 font-medium">
                      <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-slate-800">
                  <button
                    onClick={() => onBookCounselling("Career Wings Edu Consultants: Visa Guidance & University Applications")}
                    className="w-full bg-gradient-to-r from-[#0047AB] to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <span>Connect with Career Wings Edu Consultants</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Areas of Business */}
      <section className="py-16 sm:py-20 bg-white dark:bg-slate-900 border-t border-b border-gray-150 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[#0047AB] dark:text-blue-400 font-black text-xs uppercase tracking-widest block">
              COMPREHENSIVE SERVICES PORTFOLIO
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-950 dark:text-white">
              Our Core Areas of Business
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-400 font-medium">
              Structured assistance spanning student admissions, visa compliance, education funding, work permits, and global career opportunities.
            </p>
          </div>

          <div className="space-y-8">
            
            {/* Area 1: Study Abroad Services */}
            <div id="edu-study-abroad" className="bg-[#FCFAF7] dark:bg-slate-950 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-xs overflow-hidden scroll-mt-24 transition-all">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-8 p-6 sm:p-8 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-blue-100 dark:bg-blue-950 text-[#0047AB] dark:text-blue-300 rounded-2xl">
                        <BookOpen className="h-6 w-6" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#0047AB] dark:text-blue-400 uppercase tracking-wider">Business Wing 1</span>
                        <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                          1. Study Abroad Services
                        </h3>
                      </div>
                    </div>
                    <span className="text-xs font-bold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full w-fit">
                      Career Wings Consultants &amp; Career Wings Edu Consultants
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-700 dark:text-slate-300 leading-relaxed font-medium">
                    Through Career Wings Consultants and Career Wings Edu Consultants, we assist students who wish to pursue higher education in international destinations. Our objective is to provide students with a structured process from initial counselling through admission and visa preparation.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                    {[
                      "Initial student counselling",
                      "Academic profile assessment",
                      "Course and university selection",
                      "Country selection guidance",
                      "Application preparation",
                      "University application coordination",
                      "Offer letter assistance",
                      "Documentation support",
                      "Student visa guidance",
                      "Financial documentation guidance",
                      "Pre-departure assistance"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-gray-150 dark:border-slate-800 font-medium">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#0047AB] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Interactive Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-150 dark:border-slate-800">
                    {onNavigateTab && (
                      <>
                        <button
                          onClick={() => onNavigateTab("search")}
                          className="bg-[#0047AB] hover:bg-blue-700 text-white font-black px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-transform hover:scale-[1.02]"
                        >
                          <Compass className="h-3.5 w-3.5" />
                          <span>Search 1,200+ Courses &amp; Universities →</span>
                        </button>
                        <button
                          onClick={() => onNavigateTab("destinations")}
                          className="bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-gray-250 dark:border-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer transition-all"
                        >
                          <Globe className="h-3.5 w-3.5 text-blue-600" />
                          <span>Explore Study Destinations (USA, UK, Canada...)</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-4 relative min-h-[220px] lg:min-h-full bg-slate-100 dark:bg-slate-850">
                  <img
                    src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800"
                    alt="Study Abroad Higher Education Classrooms, Lectures, and Degree Pathways"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-5">
                    <p className="text-white text-xs font-semibold drop-shadow">
                      Direct admissions for Bachelor's, Master's &amp; STEM specializations across USA, UK, Canada, Australia &amp; Europe.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Area 2: Student Visa Services */}
            <div id="edu-student-visa" className="bg-[#FCFAF7] dark:bg-slate-950 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-xs overflow-hidden scroll-mt-24 transition-all">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-4 order-2 lg:order-1 relative min-h-[220px] lg:min-h-full bg-slate-100 dark:bg-slate-850">
                  <img
                    src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800"
                    alt="International Travel, Passports, and Student Visa Documentation"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-5">
                    <p className="text-white text-xs font-semibold drop-shadow">
                      Meticulous visa documentation, mock interview clearance, and embassy biometric scheduling.
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-8 order-1 lg:order-2 p-6 sm:p-8 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-2xl">
                        <Plane className="h-6 w-6" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Business Wing 2</span>
                        <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                          2. Student Visa Services
                        </h3>
                      </div>
                    </div>
                    <span className="text-xs font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded-full w-fit">
                      Compliance &amp; Procedural Support
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-700 dark:text-slate-300 leading-relaxed font-medium">
                    Our education brands support students with the documentation and procedural requirements associated with student visa applications. Depending on the destination and individual circumstances, our services may include:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                    {[
                      "Student visa documentation checklist",
                      "Application preparation support",
                      "Financial documentation guidance",
                      "Statement & supporting document coordination",
                      "Visa application process guidance",
                      "Interview preparation where applicable",
                      "Biometrics guidance",
                      "Pre-departure assistance"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-gray-150 dark:border-slate-800 font-medium">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Interactive Action Button */}
                  <div className="flex flex-wrap gap-3 pt-3 border-t border-gray-150 dark:border-slate-800">
                    {onNavigateTab && (
                      <button
                        onClick={() => onNavigateTab("services")}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-transform hover:scale-[1.02]"
                      >
                        <ShieldCheck className="h-3.5 w-3.5" />
                        <span>Open Student Visa &amp; Documentation Portal →</span>
                      </button>
                    )}
                    <button
                      onClick={() => onBookCounselling("Student Visa Documentation & Interview Assessment")}
                      className="bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-gray-250 dark:border-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <PhoneCall className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Book Free Visa File Verification</span>
                    </button>
                  </div>

                  <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 text-[11px] text-amber-900 dark:text-amber-200 font-semibold">
                    * Note: Visa decisions remain subject to the applicable immigration authorities and their assessment of each application.
                  </div>
                </div>
              </div>
            </div>

            {/* Area 3: Education Funding Assistance */}
            <div id="edu-education-funding" className="bg-[#FCFAF7] dark:bg-slate-950 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-xs overflow-hidden scroll-mt-24 transition-all">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-8 p-6 sm:p-8 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 rounded-2xl">
                        <DollarSign className="h-6 w-6" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Business Wing 3</span>
                        <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                          3. Education Funding Assistance
                        </h3>
                      </div>
                    </div>
                    <span className="text-xs font-bold bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-full w-fit">
                      CWC Consulting Services India Pvt Ltd
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-700 dark:text-slate-300 leading-relaxed font-medium">
                    CWC Consulting Services India Private Limited also works in the area of education funding and financial assistance for students planning overseas education. We assist eligible students in understanding available funding options and coordinating the required financial documentation.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                    {[
                      "Education loan guidance",
                      "Funding requirement assessment",
                      "Financial documentation support",
                      "Loan application coordination",
                      "Co-applicant and sponsor documentation guidance",
                      "Financial planning for overseas education",
                      "Coordination with relevant financial service providers"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-gray-150 dark:border-slate-800 font-medium">
                        <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Interactive Action Button */}
                  <div className="flex flex-wrap gap-3 pt-3 border-t border-gray-150 dark:border-slate-800">
                    {onNavigateTab && (
                      <button
                        onClick={() => onNavigateTab("calculator")}
                        className="bg-amber-600 hover:bg-amber-700 text-white font-black px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-transform hover:scale-[1.02]"
                      >
                        <DollarSign className="h-3.5 w-3.5" />
                        <span>Open Cost of Living &amp; Loan Calculator →</span>
                      </button>
                    )}
                    <button
                      onClick={() => onBookCounselling("Education Funding & Loan Coordination")}
                      className="bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-gray-250 dark:border-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Landmark className="h-3.5 w-3.5 text-amber-600" />
                      <span>Request Bank Loan Pre-Check</span>
                    </button>
                  </div>

                  <div className="p-3.5 bg-slate-100 dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 text-[11px] text-gray-650 dark:text-slate-400 font-semibold">
                    * Note: Funding approval depends on the eligibility criteria and assessment of the respective financial institution or funding provider.
                  </div>
                </div>

                <div className="lg:col-span-4 relative min-h-[220px] lg:min-h-full bg-slate-100 dark:bg-slate-850">
                  <img
                    src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800"
                    alt="Study Abroad Education Loan and Financial Documentation Assistance by CWC Consulting Services"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-5">
                    <p className="text-white text-xs font-semibold drop-shadow">
                      Transparent education loan evaluation, sponsor affidavits, and sanctioned letter documentation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Area 4 & 5: Work Permits & International Careers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Area 4: Work Permits */}
              <div id="edu-work-permits" className="bg-[#FCFAF7] dark:bg-slate-950 rounded-3xl border border-gray-200 dark:border-slate-800 overflow-hidden shadow-xs space-y-4 scroll-mt-24 transition-all">
                <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
                    alt="International Corporate Work Permits and Skilled Employment Visas by CWC Group"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-4">
                    <span className="text-white text-xs font-bold drop-shadow">
                      Global Corporate Placement &amp; Employment Authorization
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-7 pt-2 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 rounded-xl">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Business Wing 4</span>
                      <h4 className="text-lg font-black text-gray-900 dark:text-white">
                        4. International Work Permit Services
                      </h4>
                    </div>
                  </div>

                  <p className="text-xs text-gray-650 dark:text-slate-400 leading-relaxed font-medium">
                    CWC Consulting Services India Private Limited also provides support for individuals exploring international employment and work permit opportunities.
                  </p>

                  <div className="space-y-2 pt-1">
                    {[
                      "Overseas employment opportunity guidance",
                      "Country and job category information",
                      "Employer or opportunity coordination",
                      "Work permit process guidance",
                      "Documentation assistance",
                      "Application coordination",
                      "Pre-departure guidance"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-700 dark:text-slate-300 font-medium">
                        <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Interactive Action Button */}
                  <div className="pt-2 border-t border-gray-150 dark:border-slate-800">
                    {onNavigateTab && (
                      <button
                        onClick={() => onNavigateTab("work-visa-detail")}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-transform hover:scale-[1.01]"
                      >
                        <Briefcase className="h-3.5 w-3.5" />
                        <span>Explore Official Work Visas Directory →</span>
                      </button>
                    )}
                  </div>

                  <p className="text-[10px] text-gray-500 pt-1 italic">
                    * Work permit eligibility, employment approval, and immigration decisions depend on applicable laws and destination government authorities.
                  </p>
                </div>
              </div>

              {/* Area 5: International Careers */}
              <div id="edu-careers" className="bg-[#FCFAF7] dark:bg-slate-950 rounded-3xl border border-gray-200 dark:border-slate-800 overflow-hidden shadow-xs space-y-4 scroll-mt-24 transition-all">
                <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800"
                    alt="International Career Pathways for Students and Working Professionals by Career Wings"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-4">
                    <span className="text-white text-xs font-bold drop-shadow">
                      International Careers for Students &amp; Experienced Talents
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-7 pt-2 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 rounded-xl">
                      <Globe className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">Business Wing 5</span>
                      <h4 className="text-lg font-black text-gray-900 dark:text-white">
                        5. International Career Opportunities
                      </h4>
                    </div>
                  </div>

                  <p className="text-xs text-gray-650 dark:text-slate-400 leading-relaxed font-medium">
                    Our broader objective is to support individuals at different stages of their international career journey:
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800">
                      <h5 className="text-xs font-bold text-blue-700 dark:text-blue-400">For Students:</h5>
                      <p className="text-xs text-gray-600 dark:text-slate-400 mt-0.5">
                        This may begin with overseas education, global university enrollment, and post-study opportunities.
                      </p>
                    </div>

                    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800">
                      <h5 className="text-xs font-bold text-indigo-700 dark:text-indigo-400">For Professionals:</h5>
                      <p className="text-xs text-gray-600 dark:text-slate-400 mt-0.5">
                        It may involve international employment, skilled visas, and legal work permit opportunities.
                      </p>
                    </div>

                    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800">
                      <h5 className="text-xs font-bold text-amber-700 dark:text-amber-400">Financial &amp; Funding Support:</h5>
                      <p className="text-xs text-gray-600 dark:text-slate-400 mt-0.5">
                        For eligible applicants, financial assistance can help address financial requirements associated with overseas education.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* How Our Group Works (Flow Chart) */}
      <section id="edu-processes" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-8 md:px-12 space-y-12 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[#0047AB] dark:text-blue-400 font-black text-xs uppercase tracking-widest block">
            STRUCTURED CLIENT JOURNEYS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-950 dark:text-white">
            How Our Group Works
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-400 font-medium">
            Our business structure allows each brand to maintain a specialised focus while operating within the broader framework of CWC Consulting Services India Private Limited.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Flow 1: Student Path */}
          <div className="bg-white dark:bg-slate-900 border border-blue-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
            <div className="border-b border-gray-100 dark:border-slate-800 pb-3">
              <span className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider">Stream 1</span>
              <h4 className="text-lg font-black text-gray-900 dark:text-white">Student Pathway</h4>
              <p className="text-xs text-gray-500 dark:text-slate-400 font-medium">Career Wings Consultants / Career Wings Edu Consultants</p>
            </div>

            <div className="space-y-3 relative">
              {[
                { title: "Study Abroad Counselling", desc: "Initial profiling & country roadmap" },
                { title: "University & Course Selection", desc: "Shortlisting aligned with student goals" },
                { title: "Admission Application", desc: "SOP, LOR & portal filings" },
                { title: "Offer Letter Receipt", desc: "Conditional/Unconditional offers" },
                { title: "Student Visa Assistance", desc: "Financials, visa forms & interview prep" },
                { title: "Pre-Departure Support", desc: "Briefing, accommodation & ticketing" }
              ].map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 text-left">
                  <div className="h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-950 text-[#0047AB] dark:text-blue-300 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-gray-900 dark:text-white">{step.title}</h5>
                    <p className="text-[11px] text-gray-500 dark:text-slate-400">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Flow 2: Education Funding Support */}
          <div className="bg-white dark:bg-slate-900 border border-amber-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
            <div className="border-b border-gray-100 dark:border-slate-800 pb-3">
              <span className="text-[10px] font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider">Stream 2</span>
              <h4 className="text-lg font-black text-gray-900 dark:text-white">Education Funding Support</h4>
              <p className="text-xs text-gray-500 dark:text-slate-400 font-medium">For eligible students requiring financial assistance</p>
            </div>

            <div className="space-y-3">
              {[
                { title: "Education Funding Support", desc: "Guidance on options available" },
                { title: "Financial Assessment", desc: "Audit of collateral, family income & budget" },
                { title: "Funding / Loan Coordination", desc: "Direct liaison with lending partners" },
                { title: "Financial Documentation", desc: "Sanction letter & disbursement support" }
              ].map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 text-left">
                  <div className="h-6 w-6 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-gray-900 dark:text-white">{step.title}</h5>
                    <p className="text-[11px] text-gray-500 dark:text-slate-400">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Flow 3: International Career Support */}
          <div className="bg-white dark:bg-slate-900 border border-indigo-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
            <div className="border-b border-gray-100 dark:border-slate-800 pb-3">
              <span className="text-[10px] font-black uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">Stream 3</span>
              <h4 className="text-lg font-black text-gray-900 dark:text-white">International Career Support</h4>
              <p className="text-xs text-gray-500 dark:text-slate-400 font-medium">For individuals seeking overseas employment</p>
            </div>

            <div className="space-y-3">
              {[
                { title: "International Career Support", desc: "Category assessment and profile audit" },
                { title: "Job / Employer Opportunity", desc: "Sponsorship & employer coordination" },
                { title: "Work Permit Process", desc: "Legal framework adherence" },
                { title: "Documentation & Application", desc: "Labor certification & work permits" },
                { title: "Pre-Departure Guidance", desc: "Travel & overseas onboarding assistance" }
              ].map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 text-left">
                  <div className="h-6 w-6 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-gray-900 dark:text-white">{step.title}</h5>
                    <p className="text-[11px] text-gray-500 dark:text-slate-400">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* A Specialised Approach & Four Key Principles */}
      <section className="py-16 sm:py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="bg-blue-500/20 text-blue-300 font-black text-xs px-3.5 py-1 rounded-full uppercase tracking-wider">
              OPERATIONAL EXCELLENCE
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black">
              A Specialised Approach &amp; Service Philosophy
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed">
              We understand that international education and overseas employment involve multiple stages, documents, financial requirements, and regulatory processes. Our group follows a structured approach designed to provide clients with clear information and organised assistance at each relevant stage.
            </p>
          </div>

          {/* 4 Key Principles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-3xl space-y-3">
              <div className="p-3 bg-blue-600/20 text-blue-400 w-fit rounded-2xl">
                <Target className="h-6 w-6" />
              </div>
              <h4 className="text-base font-black text-white">Professional Guidance</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                We provide structured guidance based on the applicant’s academic, financial, professional, and destination-specific requirements.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-3xl space-y-3">
              <div className="p-3 bg-emerald-600/20 text-emerald-400 w-fit rounded-2xl">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h4 className="text-base font-black text-white">Process Transparency</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                We aim to communicate applicable requirements, documentation, timelines, service processes, and responsibilities clearly.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-3xl space-y-3">
              <div className="p-3 bg-amber-600/20 text-amber-400 w-fit rounded-2xl">
                <Layers className="h-6 w-6" />
              </div>
              <h4 className="text-base font-black text-white">Structured Operations</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our teams follow defined processes for counselling, applications, documentation, financial coordination, and immigration-related services.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-3xl space-y-3">
              <div className="p-3 bg-purple-600/20 text-purple-400 w-fit rounded-2xl">
                <Users className="h-6 w-6" />
              </div>
              <h4 className="text-base font-black text-white">Long-Term Support</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our relationship does not end at initial counselling. We provide continued assistance through admission, visa, funding, work permit, and pre-departure stages.
              </p>
            </div>

          </div>

          {/* Vision & Mission Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            
            <div className="bg-gradient-to-br from-blue-950 to-slate-900 border border-blue-800/60 p-8 rounded-3xl space-y-4">
              <div className="flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-amber-400" />
                <h3 className="text-2xl font-black text-white">Our Vision</h3>
              </div>
              <p className="text-sm text-blue-100/90 leading-relaxed font-medium">
                "To build a professionally managed international education and career services group that connects students and professionals with legitimate global opportunities through structured guidance, responsible processes, and specialised services."
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-950 to-slate-900 border border-indigo-800/60 p-8 rounded-3xl space-y-4">
              <div className="flex items-center gap-3">
                <Award className="h-6 w-6 text-emerald-400" />
                <h3 className="text-2xl font-black text-white">Our Mission</h3>
              </div>
              <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed font-medium">
                Our mission is to make international education and overseas career planning more organised and accessible by combining:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 pt-1">
                {[
                  "International education counselling",
                  "Student visa assistance",
                  "University application support",
                  "Education funding assistance",
                  "Work permit services",
                  "International career guidance",
                  "Documentation & process coordination"
                ].map((m, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Summary Recap & CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-[#0047AB] to-blue-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-7">
          <Building2 className="h-12 w-12 mx-auto text-amber-400" />
          
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            One Parent Company. Two Education Brands. <br />
            Multiple International Services.
          </h2>
          
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium">
            Together, our group provides a structured platform for students and professionals planning their next international opportunity.
          </p>

          <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl max-w-2xl mx-auto border border-white/20 text-left space-y-2 text-xs text-blue-100">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="font-bold">Parent Company:</span>
              <span className="font-extrabold text-white">CWC Consulting Services India Private Limited</span>
            </div>
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="font-bold">Sister Concerns:</span>
              <span className="font-extrabold text-amber-300">Career Wings Consultants | Career Wings Edu Consultants</span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="font-bold">Corporate Scope:</span>
              <span className="font-extrabold text-white">Funding • Work Permits • International Careers</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-3">
            <button
              onClick={() => onBookCounselling("Direct Application: Career Wings Edu & CWC Consulting Services")}
              className="bg-white text-[#0047AB] font-black px-8 py-3.5 rounded-xl shadow-lg hover:bg-gray-100 transition-all cursor-pointer text-sm"
            >
              Book Free Student &amp; Visa Consultation
            </button>
            <button
              onClick={onBack}
              className="bg-blue-800/80 hover:bg-blue-800 text-white font-bold px-6 py-3.5 rounded-xl border border-blue-700 text-sm cursor-pointer"
            >
              Back to Home Page
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
