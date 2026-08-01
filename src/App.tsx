import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Compass, 
  MapPin, 
  Sparkles, 
  Search, 
  Heart, 
  Phone, 
  Mail, 
  Globe, 
  GraduationCap, 
  ArrowRight,
  ChevronDown,
  Briefcase,
  Star,
  Users,
  CheckCircle,
  HelpCircle,
  Building,
  Target,
  FileCheck,
  ShieldCheck,
  Plane,
  Home,
  MessageCircle,
  BookOpen,
  X,
  Download,
  FolderArchive,
  FileCode,
  Calendar
} from "lucide-react";

import { DESTINATIONS, COURSES } from "./data/mockData";
import { HOME_SEO_DATA } from "./data/homeSeoData";
import { Destination, Course } from "./types";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import CounsellingForm from "./components/CounsellingForm";
import CourseSearch from "./components/CourseSearch";
import CostCalculator from "./components/CostCalculator";
import EligibilityChecker from "./components/EligibilityChecker";
import DestinationModal from "./components/DestinationModal";
import StudentStories from "./components/StudentStories";
import DestinationsPage from "./components/DestinationsPage";
import StudentEssentialsPage from "./components/StudentEssentialsPage";
import TestPreparationPage from "./components/TestPreparationPage";
import DestinationDetailPage from "./components/DestinationDetailPage";
import WorkVisaDetailPage from "./components/WorkVisaDetailPage";
import InfoPage from "./components/InfoPage";
import NewsArticlesPage from "./components/NewsArticlesPage";
import CommunityPage from "./components/CommunityPage";
import UniversityFinderPage from "./components/UniversityFinderPage";
import AboutUsPage from "./components/AboutUsPage";
import BlogPage from "./components/BlogPage";
import PrepExamSeoPage from "./components/PrepExamSeoPage";
import PostResumePage from "./components/PostResumePage";
import OfficeLocationsPage from "./components/OfficeLocationsPage";
import Breadcrumbs from "./components/Breadcrumbs";
import UniversityDetailPage from "./components/UniversityDetailPage";
import GuidedTour from "./components/GuidedTour";
import GoogleDriveVault from "./components/GoogleDriveVault";

export default function App() {
  const [currentTabInternal, setCurrentTabInternal] = useState<string>("home");
  const [previousTab, setPreviousTab] = useState<string>("home");
  const [previousDestination, setPreviousDestination] = useState<Destination | null>(null);

  const currentTab = currentTabInternal;
  const setCurrentTab = (newTab: string) => {
    if (newTab !== currentTabInternal) {
      if (currentTabInternal !== "eligibility") {
        setPreviousTab(currentTabInternal);
        if (currentTabInternal === "destination-detail") {
          setPreviousDestination(selectedDestination);
        }
      }
      setCurrentTabInternal(newTab);
    }
  };

  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [savedCourseIds, setSavedCourseIds] = useState<string[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedWorkVisaId, setSelectedWorkVisaId] = useState<string | null>(null);
  const [selectedUniversity, setSelectedUniversity] = useState<any>(null);
  const [isCounsellingModalOpen, setIsCounsellingModalOpen] = useState<boolean>(false);
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);
  const [prefilledDetails, setPrefilledDetails] = useState<string>("");
  const [showDownloadPanel, setShowDownloadPanel] = useState<boolean>(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState<boolean>(false);
  const [activeTestPrepTab, setActiveTestPrepTab] = useState<string>("ielts");
  const [finderCountryFilter, setFinderCountryFilter] = useState<string>("all");
  const [isAdminView, setIsAdminView] = useState<boolean>(false);
  
  // FAQs State
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // SEO Authority Hub State
  const [expandedSeoBlock, setExpandedSeoBlock] = useState<number | null>(0);



  // Listen to tab changes to reset detailed pages if navigated index shifts
  useEffect(() => {
    if (currentTab !== "destination-detail" && currentTab !== "eligibility" && currentTab !== "university-detail" && currentTab !== "university-finder") {
      setSelectedDestination(null);
    }
    if (currentTab !== "work-visa-detail" && currentTab !== "eligibility") {
      setSelectedWorkVisaId(null);
    }
    if (currentTab !== "university-detail") {
      setSelectedUniversity(null);
    }
  }, [currentTab]);

  // Initialize Dark Mode based on storage/system - Force Light Mode / White Background
  useEffect(() => {
    setDarkMode(false);
    document.documentElement.classList.remove("dark");
    localStorage.setItem("cwc-theme", "light");
  }, []);

  // Open the interactive guided tour immediately on every page load / refresh
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTourOpen(true);
    }, 700); // organic response delay so page initial styles load first
    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(false);
    document.documentElement.classList.remove("dark");
    localStorage.setItem("cwc-theme", "light");
  };

  // Toggle Bookmark for Courses
  const toggleSaveCourse = (courseId: string) => {
    setSavedCourseIds((prev) => 
      prev.includes(courseId) 
        ? prev.filter((id) => id !== courseId) 
        : [...prev, courseId]
    );
  };

  // Pre-fill & Open counselling modal
  const openCounsellingWithDetails = (courseName: string, country: string) => {
    setPrefilledDetails(`Enquiring about "${courseName}" in ${country}.`);
    setIsCounsellingModalOpen(true);
  };

  const handleBookCounsellingFromEligibility = (details: string) => {
    setPrefilledDetails(details);
    setIsCounsellingModalOpen(true);
  };

  const savedCoursesList = COURSES.filter((c) => savedCourseIds.includes(c.id));

  const faqs = [
    {
      q: "Are the study abroad consultation services really free?",
      a: "Yes! Career Wings Consultants provides 100% free consultation, profile assessments, and application submissions for our associate universities. There are no hidden fees or charges for students."
    },
    {
      q: "How can CWC help me secure scholarship funding?",
      a: "Through our direct university listings and partnerships, our senior study advisors are skilled in negotiating academic waivers (up to 100% scholarship coverage). We match your GPA and language scores with active grant budgets."
    },
    {
      q: "Does Career Wings help with student education loan assistance?",
      a: "Absolutely. We are officially integrated with leading banks to offer priority educational loans with favorable interest rates, expedited approvals, and simplified documentation support."
    },
    {
      q: "What is the visa interview mock prep program?",
      a: "To guarantee the highest visa success rates, we conduct rigorous mock interview sessions with questions mimicking the actual immigration boards of Canada, US, UK, Australia, and Ireland."
    }
  ];

  const services = [
    {
      id: "srv1",
      title: "Personalized Profile Assessment",
      desc: "Our expert counselors evaluate your high school or undergraduate GPA, subject backgrounds, and personal constraints to construct an customized list of compatible choices.",
      icon: <Compass className="h-6 w-6" />,
      color: "bg-blue-600",
      step: "01"
    },
    {
      id: "srv2",
      title: "Applying to Institutions",
      desc: "We take care of the heavy administrative weight—organizing transcripts, optimizing SOP statements, obtaining recommendation letters, and filing direct university portals.",
      icon: <Building className="h-6 w-6" />,
      color: "bg-emerald-600",
      step: "02"
    },
    {
      id: "srv3",
      title: "Admission Letter Acceptance",
      desc: "Receive and cross-evaluate multiple global offers with guidance on fee deposits, GIC setups, housing deposits, and choosing the perfect academic fit.",
      icon: <FileCheck className="h-6 w-6" />,
      color: "bg-purple-600",
      step: "03"
    },
    {
      id: "srv4",
      title: "Education Loan Support",
      desc: "Leverage our formal financing partnerships to compare lowest student interest rates and expedite proof-of-funding documentation.",
      icon: <Briefcase className="h-6 w-6" />,
      color: "bg-orange-500",
      step: "04"
    },
    {
      id: "srv5",
      title: "Visa Interview & Filing",
      desc: "Stay organized with detailed visa compliance files, biometric scheduling, financial audits, and interactive mock counseling discussions.",
      icon: <ShieldCheck className="h-6 w-6" />,
      color: "bg-blue-400",
      step: "05"
    },
    {
      id: "srv6",
      title: "Pre-departure Briefings & Forex",
      desc: "From affordable student air tickets, telecom cards, bank setups, to student residences—we guarantee you are prepared before you board.",
      icon: <Plane className="h-6 w-6" />,
      color: "bg-pink-500",
      step: "06"
    }
  ];

  const steps = [
    { stepNum: "01", title: "Why Study Abroad?", desc: "Define your global life and career goals.", icon: <Target className="text-blue-600 h-6 w-6" /> },
    { stepNum: "02", title: "Where & What?", desc: "Identify countries, courses and universities that fit.", icon: <GraduationCap className="text-emerald-500 h-6 w-6" /> },
    { stepNum: "03", title: "How Do I Apply?", desc: "We coordinate and submit your formal transcripts.", icon: <BookOpen className="text-purple-600 h-6 w-6" /> },
    { stepNum: "04", title: "Receiving Offers", desc: "Evaluate options and secure academic deposits.", icon: <FileCheck className="text-orange-500 h-6 w-6" /> },
    { stepNum: "05", title: "Prepare Depart", desc: "Obtain visas and coordinate housing arrangements.", icon: <ShieldCheck className="text-teal-500 h-6 w-6" /> },
    { stepNum: "06", title: "Arrive & Thrive", desc: "Reach your destination with active support.", icon: <Plane className="text-pink-500 h-6 w-6" /> }
  ];

  return (
    <div className="font-sans min-h-screen bg-white dark:bg-slate-950 text-gray-900 dark:text-slate-100 transition-colors duration-150 flex flex-col justify-between overflow-x-clip">
      
      {/* Navbar segment */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        savedCoursesCount={savedCourseIds.length}
        openSavedModal={() => setIsSavedModalOpen(true)}
        openCounsellingModal={() => {
          setPrefilledDetails("");
          setIsCounsellingModalOpen(true);
        }}
        onSelectDestination={(dest) => {
          setSelectedDestination(dest);
          setCurrentTab("destination-detail");
        }}
        onSelectTestPrepTab={setActiveTestPrepTab}
        onSelectWorkVisa={(visaId) => {
          setSelectedWorkVisaId(visaId);
          setCurrentTab("work-visa-detail");
        }}
        isAdminView={isAdminView}
        setIsAdminView={setIsAdminView}
        onOpenTour={() => setIsTourOpen(true)}
      />

      {/* Main tab viewer with fluid motion transitions */}
      <main className="flex-grow">
        {currentTab !== "home" && (
          <div className="bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 py-3.5 transition-colors sticky top-[95px] md:top-[104px] lg:top-[111px] z-40">
            <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between">
              <button 
                onClick={() => {
                  if (currentTab === "destination-detail") {
                    setSelectedDestination(null);
                    setCurrentTab("destinations");
                  } else {
                    setCurrentTab("home");
                  }
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-gray-700 hover:text-[#0047AB] dark:text-slate-300 dark:hover:text-blue-400 transition-all cursor-pointer bg-white dark:bg-slate-950 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md active:scale-95"
              >
                <span className="text-[#0047AB] dark:text-blue-400 font-black">&larr;</span> Back to previous page
              </button>
              <Breadcrumbs 
                currentTab={currentTab}
                activeTestPrepTab={activeTestPrepTab}
                selectedDestination={selectedDestination}
                selectedWorkVisaId={selectedWorkVisaId}
                selectedUniversity={selectedUniversity}
                onNavigate={setCurrentTab}
                onSelectDestination={setSelectedDestination}
                onSelectWorkVisa={setSelectedWorkVisaId}
                onSelectUniversity={setSelectedUniversity}
              />
            </div>
          </div>
        )}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            {currentTab === "home" && (
              <div id="home-view" className="space-y-0">
                {/* Hero section */}
                <HeroSection 
                  onOpenCounselling={() => setIsCounsellingModalOpen(true)}
                  onExploreCourses={() => setCurrentTab("search")}
                />

                {/* Split segment: Discover Courses & Consultation Form */}
                <section id="discover-form" className="py-20 md:py-28 bg-white dark:bg-slate-900 transition-colors">
                  <div className="container mx-auto px-4 max-w-[1440px]">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                      
                      {/* Left: Text checklist */}
                      <div className="lg:col-span-5 space-y-6">
                        <span className="text-[#0047AB] dark:text-blue-400 font-extrabold tracking-widest text-xs uppercase block">DISCOVER SCHOLARSHIPS</span>
                        <h2 className="text-3.5xl sm:text-5xl font-black text-gray-950 dark:text-white leading-tight">
                          Explore Thousands of Course Pathways &amp; Global Funding
                        </h2>
                        <div className="w-12 h-1 bg-orange-400 rounded-full" />
                        <p className="text-gray-500 dark:text-slate-350 text-sm sm:text-base leading-relaxed font-semibold">
                          Finding secondary funding and completing global university admissions is simple when you have Career Wings on your side. We have partnered with top colleges to organize unique grant allowances for matching candidate files.
                        </p>
                        
                        <div className="space-y-4 pt-4">
                          {[
                            "Access to 1000+ Globally Recognized Partner Campus Intakes",
                            "Up to 100% Merit and Specialized Need-Based Scholarship Guidance",
                            "Strict Standard Operating Procedure (SOP) Evaluation Panels",
                            "Comprehensive Visa Support & Pre-departure Housing Seminars"
                          ].map((checkItem, index) => (
                            <div key={index} className="flex items-center gap-3 text-xs sm:text-sm font-bold text-gray-700 dark:text-slate-200">
                              <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />
                              <span>{checkItem}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: Embedded Counselling Form */}
                      <div className="lg:col-span-7">
                        <CounsellingForm />
                      </div>

                    </div>
                  </div>
                </section>

                {/* CWC Services block */}
                <section id="services-block" className="py-20 md:py-28 bg-[#F4F6F9] dark:bg-slate-950 border-t border-b border-gray-100/10 transition-colors">
                  <div className="container mx-auto px-4 max-w-[1440px] space-y-16">
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                      <span className="text-[#0047AB] dark:text-blue-400 font-extrabold tracking-widest text-xs uppercase block">OUR GUIDANCE SERVICES</span>
                      <h2 className="text-3xl md:text-5xl font-black text-gray-950 dark:text-white leading-tight">
                        We Make Your Journey Simple
                      </h2>
                      <p className="text-gray-500 dark:text-slate-400 text-sm md:text-base">
                        From initial target profile diagnostics to finalizing housing, our study advisors guide you through every milestone step.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {services.map((srv) => (
                        <div 
                          key={srv.id}
                          className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-850 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all h-full hover:-translate-y-1.5 duration-200 group"
                        >
                          <div className="space-y-6">
                            <div className="flex justify-between items-center">
                              <div className={`${srv.color} text-white p-3.5 rounded-2xl shadow-md shrink-0`}>
                                {srv.icon}
                              </div>
                              <span className="text-gray-200 dark:text-slate-800 text-4xl font-black">{srv.step}</span>
                            </div>
                            <div className="space-y-2">
                              <h3 className="text-lg font-extrabold text-gray-900 dark:text-slate-100 group-hover:text-[#0047AB] dark:group-hover:text-blue-400 transition-colors">
                                {srv.title}
                              </h3>
                              <p className="text-gray-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed font-semibold">
                                {srv.desc}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Quality Trust Bar */}
                    <div className="bg-white dark:bg-slate-900 rounded-[35px] shadow-sm border border-gray-100 dark:border-slate-800 p-6 sm:p-10 transition-colors">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
                        {[
                          { title: "Expert Consultants", label: "Certified study directors with global certifications" },
                          { title: "100% Transparency", label: "Clear processes and direct contract with partner institutes" },
                          { title: "End-to-End Support", label: "Support with fees, housing, currency and airport transit" },
                          { title: "Highest Success Ratings", label: "Over 98.7% visa acceptance rating verified annually" }
                        ].map((trustItem, idx) => (
                          <div key={idx} className="space-y-1.5 px-4 first:pl-0 border-r border-gray-100 dark:border-slate-800 last:border-r-0">
                            <h4 className="font-extrabold text-[#0047AB] dark:text-blue-400 text-sm sm:text-base">{trustItem.title}</h4>
                            <p className="text-xs text-gray-400 font-semibold">{trustItem.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Destinations block */}
                <section id="destinations-block" className="py-20 md:py-28 bg-[#041126] bg-gradient-to-b from-[#020b18] via-[#041733] to-[#010914] text-white transition-colors relative overflow-hidden">
                  <div className="container mx-auto px-4 max-w-[1440px] space-y-16">
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                      <span className="text-amber-400 font-extrabold tracking-widest text-xs uppercase block">EXPLORE GLOBAL DESTINATIONS</span>
                      <h2 className="text-3xl md:text-5xl font-black text-white dark:text-white leading-tight">
                        Choose Your Destination
                      </h2>
                      <p className="text-blue-100/80 dark:text-slate-400 text-sm md:text-base">
                        Explore exceptional campuses and welcoming local student policies across our peak study destinations.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                      {DESTINATIONS.slice(0, 4).map((dest) => (
                        <div 
                           key={dest.id}
                           className="bg-white dark:bg-slate-950 rounded-3xl border border-gray-100 dark:border-slate-850 overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1.5 duration-300 flex flex-col group"
                        >
                          <div className="h-44 relative overflow-hidden">
                            <img alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={dest.bgImage} />
                            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-950 via-transparent to-transparent" />
                            <div className="absolute bottom-3 left-4">
                              <div className="bg-white p-0.5 rounded-full shadow-md w-9 h-9 flex items-center justify-center">
                                <img alt={`${dest.name} flag`} className="w-8 h-8 rounded-full object-cover" src={dest.flagImage} />
                              </div>
                            </div>
                          </div>
                          <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                            <div className="space-y-1.5">
                              <h3 className="font-extrabold text-lg text-gray-950 dark:text-white leading-snug">{dest.name}</h3>
                              <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed font-semibold line-clamp-3">
                                {dest.description}
                              </p>
                            </div>
                            <button 
                              onClick={() => { setSelectedDestination(dest); setCurrentTab("destination-detail"); }}
                              className="text-[#0047AB] dark:text-blue-400 hover:text-blue-700 font-bold text-xs inline-flex items-center gap-1.5 hover:translate-x-1.5 transition-all text-left cursor-pointer"
                            >
                              Explore More Details <ArrowRight className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto pt-4">
                      {DESTINATIONS.slice(4).map((dest) => (
                        <div 
                          key={dest.id}
                          className="bg-white dark:bg-slate-950 rounded-3xl border border-gray-100 dark:border-slate-850 overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1.5 duration-300 flex flex-col group"
                        >
                          <div className="h-44 relative overflow-hidden">
                            <img alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={dest.bgImage} />
                            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-950 via-transparent to-transparent" />
                            <div className="absolute bottom-3 left-4">
                              <div className="bg-white p-0.5 rounded-full shadow-md w-9 h-9 flex items-center justify-center">
                                <img alt={`${dest.name} flag`} className="w-8 h-8 rounded-full object-cover" src={dest.flagImage} />
                              </div>
                            </div>
                          </div>
                          <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                            <div className="space-y-1.5">
                              <h3 className="font-extrabold text-lg text-gray-950 dark:text-white leading-snug">{dest.name}</h3>
                              <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed font-semibold line-clamp-3">
                                {dest.description}
                              </p>
                            </div>
                            <button 
                              onClick={() => { setSelectedDestination(dest); setCurrentTab("destination-detail"); }}
                              className="text-[#0047AB] dark:text-blue-400 hover:text-blue-700 font-bold text-xs inline-flex items-center gap-1.5 hover:translate-x-1.5 transition-all text-left cursor-pointer"
                            >
                              Explore More Details <ArrowRight className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                </section>

                {/* Steps tracker section */}
                <section id="steps-tracker" className="py-20 md:py-28 bg-[#FAF7F2] dark:bg-slate-900/60 transition-colors">
                  <div className="container mx-auto px-4 max-w-[1440px] space-y-14">
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                      <span className="text-[#0047AB] dark:text-blue-400 font-extrabold tracking-widest text-xs uppercase block">YOUR STUDY ROADMAP</span>
                      <h2 className="text-3xl md:text-5xl font-black text-gray-950 dark:text-white leading-tight">
                        Your Journey, Step by Step
                      </h2>
                      <p className="text-gray-500 dark:text-slate-400 text-sm">
                        Everything is organized to make planning completely stress-free. Let's follow this pathway.
                      </p>
                    </div>

                    <div className="relative">
                      {/* Connection dashed line on desktops */}
                      <div className="hidden lg:block absolute top-12 left-12 right-12 h-0.5 border-t-2 border-dashed border-gray-200 dark:border-slate-800 z-0" />
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 relative z-10">
                        {steps.map((stepItem, idx) => (
                          <div 
                            key={idx}
                            className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-855 p-6 rounded-2xl flex flex-col justify-between space-y-4 hover:shadow-md hover:-translate-y-1 transition-all"
                          >
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-black text-blue-600 dark:text-blue-400">Step {stepItem.stepNum}</span>
                              <div className="bg-blue-50 dark:bg-slate-800 p-2 rounded-xl text-blue-600 dark:text-blue-400">
                                {stepItem.icon}
                              </div>
                            </div>
                            <div className="space-y-1">
                              <h3 className="font-extrabold text-sm text-gray-900 dark:text-white">{stepItem.title}</h3>
                              <p className="text-[11px] text-gray-400 dark:text-slate-400 leading-normal font-semibold">
                                {stepItem.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Success student testimonials */}
                <StudentStories />

                {/* ----------------- START OF SEO SECTION ----------------- */}
                <section id="seo-study-abroad-section" className="py-24 bg-[#F2F5F9] dark:bg-slate-900 border-t border-b border-gray-150 dark:border-slate-800 transition-colors">
                  <div className="container mx-auto px-4 max-w-6xl space-y-12">
                    
                    {/* H1 SEO Heading */}
                    <div className="text-center max-w-2xl mx-auto space-y-4">
                      <span className="text-xs font-black tracking-widest text-[#0047AB] dark:text-blue-400 uppercase block">Expert Guidance Hub</span>
                      <h1 id="seo-h1" className="text-3.5xl sm:text-5xl font-black text-gray-950 dark:text-white tracking-tight leading-tight">
                        Our Vision: Enable Seamless <span className="bg-gradient-to-r from-[#0047AB] to-indigo-600 bg-clip-text text-transparent">Study Abroad</span> Success
                      </h1>
                      <div className="w-16 h-1 bg-blue-500 mx-auto rounded-full" />
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 font-semibold leading-relaxed">
                        To guarantee structural compliance and complete transparency, we have compiled our certified knowledge-base guides for aspiring global scholars.
                      </p>
                    </div>

                    {/* Master Selector Bar (Bento-styled switchers) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {HOME_SEO_DATA.map((block, idx) => {
                        const isActive = expandedSeoBlock === idx;
                        return (
                          <button
                            key={idx}
                            onClick={() => setExpandedSeoBlock(idx)}
                            className={`p-6 text-left rounded-3xl border transition-all duration-300 relative overflow-hidden cursor-pointer ${
                              isActive 
                                ? "bg-white dark:bg-slate-950 border-blue-500/50 shadow-md translate-y-[-2px]" 
                                : "bg-white/40 dark:bg-slate-950/20 border-gray-150 dark:border-slate-850 hover:bg-white/80 dark:hover:bg-slate-950/40"
                            }`}
                          >
                            {/* Accent indicator */}
                            {isActive && <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-[#0047AB]" />}
                            
                            <span className="text-2xs font-extrabold tracking-widest text-gray-400 uppercase block mb-1">
                              Guide Module 0{idx + 1}
                            </span>
                            <h3 className={`text-base font-black leading-snug transition-colors ${isActive ? "text-[#0047AB] dark:text-blue-400" : "text-gray-800 dark:text-slate-200"}`}>
                              {block.keyWord}
                            </h3>
                            <p className="text-2xs text-gray-400 dark:text-slate-500 leading-normal mt-2 font-medium line-clamp-2">
                              {block.tagline}
                            </p>
                          </button>
                        );
                      })}
                    </div>

                    {/* Collapsible Content Area */}
                    <AnimatePresence mode="wait">
                      {expandedSeoBlock !== null && (
                        <motion.div
                          key={expandedSeoBlock}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{ duration: 0.3 }}
                          className="bg-white dark:bg-slate-950 border border-gray-150 dark:border-slate-850 rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-sm space-y-10"
                        >
                          {/* Banner row */}
                          <div className="space-y-3">
                            <span className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-3xs font-extrabold tracking-widest uppercase px-3.5 py-1.5 rounded-full border border-blue-100/40 dark:border-blue-900/40">
                              🚀 FEATURED INFORMATION MODULE
                            </span>
                            <h2 className="text-xl sm:text-3xl font-black text-gray-950 dark:text-white tracking-tight">
                              {HOME_SEO_DATA[expandedSeoBlock].sectionTitle}
                            </h2>
                            <p className="text-[#0047AB] dark:text-blue-400 font-extrabold text-sm tracking-wide">
                              {HOME_SEO_DATA[expandedSeoBlock].tagline}
                            </p>
                          </div>

                          <div className="border-t border-gray-100 dark:border-slate-850" />

                          {/* Split row content layout */}
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                            
                            {/* Left Col - Prose Content (min 200 words per key) */}
                            <div className="lg:col-span-7 space-y-6">
                              <h4 className="text-xs font-black tracking-widest text-gray-400 dark:text-slate-500 uppercase">
                                Broad Academic Framework
                              </h4>
                              <p className="text-[#334155] dark:text-slate-300 text-sm leading-relaxed font-semibold">
                                {HOME_SEO_DATA[expandedSeoBlock].mainIntro}
                              </p>
                              {HOME_SEO_DATA[expandedSeoBlock].proseParagraphs.map((para, pIdx) => (
                                <p key={pIdx} className="text-[#475569] dark:text-slate-400 text-xs sm:text-sm leading-relaxed font-semibold">
                                  {para}
                                </p>
                              ))}
                            </div>

                            {/* Right Col - Question & Answer Core (min 150 words per key) */}
                            <div className="lg:col-span-5 space-y-6">
                              <h4 className="text-xs font-black tracking-widest text-gray-400 dark:text-slate-500 uppercase flex items-center gap-2">
                                <span>💬</span> Q&amp;A Common Solves
                              </h4>
                              <div className="space-y-4">
                                {HOME_SEO_DATA[expandedSeoBlock].qas.map((qaItem, qaIdx) => (
                                  <div 
                                    key={qaIdx} 
                                    className="bg-gray-50/50 dark:bg-slate-900/50 border border-gray-100 dark:border-slate-850 rounded-2xl p-5 space-y-2"
                                  >
                                    <h5 className="text-xs sm:text-sm font-black text-gray-950 dark:text-white leading-snug">
                                      Q: {qaItem.question}
                                    </h5>
                                    <p className="text-2xs sm:text-xs text-gray-500 dark:text-slate-400 leading-relaxed font-semibold">
                                      {qaItem.answer}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>

                          </div>

                          {/* Trust Assurance footnote */}
                          <div className="border-t border-gray-100 dark:border-slate-850 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                            <span className="text-3xs text-gray-400 dark:text-slate-500 font-extrabold tracking-wider uppercase">
                              * All content undergoes rigorous oversight by verified study abroad counselors.
                            </span>
                            <button 
                              onClick={() => {
                                setIsCounsellingModalOpen(true);
                                setPrefilledDetails(`Hi CWC, I would like to consult about: ${HOME_SEO_DATA[expandedSeoBlock!].keyWord}`);
                              }}
                              className="inline-flex items-center gap-1.5 bg-[#0047AB] dark:bg-blue-600 hover:bg-blue-700 text-white text-3xs font-black tracking-wider uppercase py-2 px-4 rounded-full shadow-sm transition-all hover:scale-102 cursor-pointer btn"
                            >
                              Consult Expert on this Topic <ArrowRight className="h-3 w-3" />
                            </button>
                          </div>

                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                </section>
                {/* ------------------ END OF SEO SECTION ------------------ */}

                {/* Frequently Asked Questions Dashboard (SEO Friendly) */}
                <section id="faqs" className="py-20 md:py-28 bg-[#FCF8F5] dark:bg-slate-900 transition-colors">
                  <div className="container mx-auto px-4 max-w-4xl space-y-14">
                    <div className="text-center space-y-3">
                      <span className="text-[#0047AB] dark:text-blue-400 font-extrabold tracking-widest text-xs uppercase block">COMMON QUESTIONS</span>
                      <h2 className="text-3xl md:text-5xl font-black text-gray-950 dark:text-white leading-tight">Frequently Asked Questions</h2>
                    </div>

                    <div className="space-y-4">
                      {faqs.map((faq, index) => {
                        const isOpen = activeFaq === index;
                        return (
                          <div 
                            key={index} 
                            className="border border-gray-150 dark:border-slate-800 rounded-2xl overflow-hidden transition-all bg-white dark:bg-slate-950/20 shadow-xs"
                          >
                            <button
                              onClick={() => setActiveFaq(isOpen ? null : index)}
                              aria-expanded={isOpen}
                              className="w-full flex justify-between items-center p-5 text-left text-sm md:text-base font-bold text-gray-955 dark:text-white hover:bg-gray-50/50 transition-colors"
                            >
                              <span>{faq.q}</span>
                              <ChevronDown className={`h-5 w-5 text-gray-400 transform transition-transform ${isOpen ? "rotate-185" : ""}`} />
                            </button>
                            <div className={`transition-all duration-300 overflow-hidden ${isOpen ? "max-h-96 border-t border-gray-100 dark:border-slate-800" : "max-h-0"}`}>
                              <p className="p-5 text-xs sm:text-sm text-gray-650 dark:text-slate-350 leading-relaxed font-semibold">
                                {faq.a}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>

              </div>
            )}

            {currentTab === "search" && (
              <CourseSearch 
                savedCourseIds={savedCourseIds}
                toggleSaveCourse={toggleSaveCourse}
                openCounsellingWithDetails={openCounsellingWithDetails}
              />
            )}

            {currentTab === "calculator" && (
              <CostCalculator />
            )}

            {currentTab === "eligibility" && (
              <EligibilityChecker 
                onBookCounselling={handleBookCounsellingFromEligibility}
                onCancel={() => {
                  if (previousTab === "destination-detail" && previousDestination) {
                    setSelectedDestination(previousDestination);
                  }
                  setCurrentTab(previousTab);
                }}
              />
            )}

            {currentTab === "destinations" && (
              <DestinationsPage 
                onSelectDestination={(dest) => {
                  setSelectedDestination(dest);
                  setCurrentTab("destination-detail");
                }}
                onBookCounselling={(countryName) => {
                  setPrefilledDetails(`Enquiring about admission criteria & scholarships in ${countryName}.`);
                  setIsCounsellingModalOpen(true);
                }}
              />
            )}

            {currentTab === "services" && (
              <StudentEssentialsPage 
                onBookCounselling={(details) => {
                  setPrefilledDetails(details);
                  setIsCounsellingModalOpen(true);
                }}
                onCheckEligibility={() => setCurrentTab("eligibility")}
                onSelectUniversityFinder={() => setCurrentTab("university-finder")}
              />
            )}

            {currentTab === "tests" && (
              <TestPreparationPage 
                onBookCounselling={(details) => {
                  setPrefilledDetails(details);
                  setIsCounsellingModalOpen(true);
                }}
                initialTestTab={activeTestPrepTab}
                onTabChange={setActiveTestPrepTab}
              />
            )}

            {currentTab === "destination-detail" && selectedDestination && (
              <DestinationDetailPage 
                destinationId={selectedDestination.id}
                onBack={() => {
                  setSelectedDestination(null);
                  setCurrentTab("destinations");
                }}
                onChangeDestination={(newDestId) => {
                  const match = DESTINATIONS.find(d => d.id === newDestId);
                  if (match) {
                    setSelectedDestination(match);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                onBookCounselling={(details) => {
                  setPrefilledDetails(details);
                  setIsCounsellingModalOpen(true);
                }}
                onViewAllUniversities={(countryId) => {
                  setFinderCountryFilter(countryId);
                  setCurrentTab("university-finder");
                  window.scrollTo(0, 0);
                }}
                onCheckEligibility={() => {
                  setCurrentTab("eligibility");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onSelectUniversity={(uni) => {
                  setSelectedUniversity(uni);
                  setCurrentTab("university-detail");
                  window.scrollTo(0, 0);
                }}
              />
            )}

            {currentTab === "university-finder" && (
              <UniversityFinderPage 
                initialCountry={finderCountryFilter}
                onBack={() => {
                  if (selectedDestination) {
                    setCurrentTab("destination-detail");
                  } else {
                    setCurrentTab("home");
                  }
                  window.scrollTo(0, 0);
                }}
                onBookCounselling={(details) => {
                  setPrefilledDetails(details);
                  setIsCounsellingModalOpen(true);
                }}
                onSelectUniversity={(uni) => {
                  setSelectedUniversity(uni);
                  setCurrentTab("university-detail");
                  window.scrollTo(0, 0);
                }}
              />
            )}

            {currentTab === "university-detail" && selectedUniversity && (
              <UniversityDetailPage 
                university={selectedUniversity}
                onBack={() => {
                  if (previousTab === "university-finder") {
                    setCurrentTab("university-finder");
                  } else if (previousTab === "destination-detail") {
                    setCurrentTab("destination-detail");
                  } else {
                    setCurrentTab("university-finder");
                  }
                  window.scrollTo(0, 0);
                }}
                onSelectUniversity={(uni) => {
                  setSelectedUniversity(uni);
                  window.scrollTo(0, 0);
                }}
                onBookCounselling={(details) => {
                  setPrefilledDetails(details);
                  setIsCounsellingModalOpen(true);
                }}
              />
            )}

            {currentTab === "work-visa-detail" && selectedWorkVisaId && (
              <WorkVisaDetailPage 
                workVisaId={selectedWorkVisaId}
                onBack={() => {
                  setSelectedWorkVisaId(null);
                  setCurrentTab("home");
                }}
                onBookCounselling={(details) => {
                  setPrefilledDetails(details);
                  setIsCounsellingModalOpen(true);
                }}
              />
            )}

            {currentTab === "news" && (
              <NewsArticlesPage 
                onBack={() => setCurrentTab("home")}
                onBookCounselling={handleBookCounsellingFromEligibility}
              />
            )}

            {currentTab === "about" && (
              <AboutUsPage 
                onBack={() => {
                  setCurrentTab("home");
                  window.scrollTo(0, 0);
                }}
                onBookCounselling={handleBookCounsellingFromEligibility}
              />
            )}

            {currentTab === "blog" && (
              <BlogPage 
                onBack={() => {
                  setCurrentTab("home");
                  window.scrollTo(0, 0);
                }}
                onBookCounselling={handleBookCounsellingFromEligibility}
              />
            )}

            {currentTab === "post-resume" && (
              <PostResumePage 
                onBackToHome={() => {
                  setCurrentTab("home");
                  window.scrollTo(0, 0);
                }}
                onBookCounselling={(details) => {
                  setPrefilledDetails(details);
                  setIsCounsellingModalOpen(true);
                }}
              />
            )}

            {currentTab === "community" && (
              <CommunityPage 
                onBack={() => setCurrentTab("home")}
                onBookCounselling={handleBookCounsellingFromEligibility}
                isAdminView={isAdminView}
                setIsAdminView={setIsAdminView}
              />
            )}

            {currentTab === "locations" && (
              <OfficeLocationsPage 
                onBack={() => setCurrentTab("home")}
                onBookCounselling={(details) => {
                  setPrefilledDetails(details);
                  setIsCounsellingModalOpen(true);
                }}
              />
            )}

            {currentTab === "drive" && (
              <GoogleDriveVault 
                onBookCounselling={(details) => {
                  setPrefilledDetails(details);
                  setIsCounsellingModalOpen(true);
                }}
                onBackToHome={() => {
                  setCurrentTab("home");
                  window.scrollTo(0, 0);
                }}
              />
            )}

            {["prep-ielts", "prep-pte", "prep-toefl", "prep-duolingo"].includes(currentTab) && (
              <PrepExamSeoPage 
                examType={currentTab.replace("prep-", "") as "ielts" | "pte" | "toefl" | "duolingo"}
                onBack={() => {
                  setCurrentTab("home");
                  window.scrollTo(0, 0);
                }}
                onStartMockTest={(examId) => {
                  setActiveTestPrepTab(examId);
                  setCurrentTab("tests");
                  window.scrollTo(0, 0);
                  setTimeout(() => {
                    const sandboxEl = document.getElementById("language-academy-sandbox");
                    if (sandboxEl) {
                      sandboxEl.scrollIntoView({ behavior: "smooth" });
                    }
                  }, 300);
                }}
                onBookCounselling={(details) => {
                  setPrefilledDetails(details);
                  setIsCounsellingModalOpen(true);
                }}
              />
            )}

            {currentTab.startsWith("info_") && (
              <InfoPage 
                pageType={currentTab.replace("info_", "")}
                onBack={() => setCurrentTab("home")}
                onBookCounselling={handleBookCounsellingFromEligibility}
                setCurrentTab={setCurrentTab}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global MODAL overlays */}
      
      {/* 1. Saved Courses Drawer/Modal */}
      {isSavedModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
          <div 
            onClick={() => setIsSavedModalOpen(false)} 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity" 
          />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative transform overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-6 sm:p-8 text-left shadow-2xl w-full max-w-lg transition-all animate-slide-up">
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => setIsSavedModalOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500 fill-current" />
                    Shortlisted Courses ({savedCoursesList.length})
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5 font-medium">Keep track of your preferred global study topics.</p>
                </div>

                {savedCoursesList.length > 0 ? (
                  <div className="space-y-3.5 max-h-[40vh] overflow-y-auto pr-1">
                    {savedCoursesList.map((course) => (
                      <div 
                        key={course.id}
                        className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-850 flex justify-between items-start gap-4"
                      >
                        <div className="space-y-1 text-xs">
                          <h4 className="font-extrabold text-gray-900 dark:text-white">{course.name}</h4>
                          <p className="text-gray-400 text-[10px] font-semibold">{course.university} • {course.country}</p>
                          <p className="text-emerald-700 dark:text-emerald-400 font-extrabold text-[10px] pt-1">{course.scholarshipOffer}</p>
                        </div>
                        <button
                          onClick={() => toggleSaveCourse(course.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors text-xs font-semibold underline shrink-0"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 space-y-2">
                    <Heart className="h-10 w-10 text-gray-200 mx-auto" />
                    <p className="text-xs text-gray-500">Your shortlist is currently empty</p>
                    <button
                      onClick={() => {
                        setIsSavedModalOpen(false);
                        setCurrentTab("search");
                      }}
                      className="bg-[#0047AB] dark:bg-blue-600 text-white px-5 py-2 rounded-full font-bold text-xs"
                    >
                      Find Courses
                    </button>
                  </div>
                )}

                {savedCoursesList.length > 0 && (
                  <div className="pt-4 border-t border-gray-100 dark:border-slate-800">
                    <button
                      onClick={() => {
                        setIsSavedModalOpen(false);
                        handleBookCounsellingFromEligibility(`Shortlisted programs: ${savedCoursesList.map((c) => c.name).join(", ")}`);
                      }}
                      className="w-full bg-[#0047AB] dark:bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3 rounded-xl text-xs sm:text-sm shadow-md"
                    >
                      Consult on Shortlist ({savedCoursesList.length} Courses)
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Primary Free Counselling booking MODAL */}
      {isCounsellingModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
          <div 
            onClick={() => setIsCounsellingModalOpen(false)} 
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity" 
          />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative transform overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-1 text-left shadow-2xl w-full max-w-2xl transition-all animate-slide-up">
              <button
                onClick={() => setIsCounsellingModalOpen(false)}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/80 shadow-md"
              >
                <X className="h-4.5 w-4.5" />
              </button>
              
              <CounsellingForm 
                onSuccess={() => {
                  setTimeout(() => {
                    setIsCounsellingModalOpen(false);
                  }, 5000);
                }}
                title="Book Your Free Appointment"
                subtitle={prefilledDetails || "Choose your preference and our senior counselor will call you within 24 hours to review admissions, scholarship opportunities and visa guidelines."}
              />
            </div>
          </div>
        </div>
      )}




      {/* Interactive Guided Portal Tour Walkthrough Overlay */}
      <GuidedTour 
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />

      {/* Footer segment */}
      <footer className="bg-slate-900 text-white dark:bg-slate-950 border-t border-slate-800 transition-colors">
        
        {/* Nearest Office Finder */}
        <div className="border-b border-white/5 py-12">
          <div className="container mx-auto px-4 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2">
              <h4 className="text-xl font-bold tracking-tight">Need Personal physical counseling?</h4>
              <p className="text-xs text-gray-400 font-semibold max-w-md">Our counselors are situated strategically across global major metros including Chicago, London, Sydney, Dublin, and Toronto.</p>
            </div>
            <button 
              onClick={() => {
                setCurrentTab("locations");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 bg-[#0047AB] hover:bg-blue-600 text-white px-6 py-3 rounded-full font-bold text-xs shadow-md transition-all cursor-pointer shrink-0"
            >
              <MapPin className="h-4 w-4" /> Our Office Locations
            </button>
          </div>
        </div>

        {/* Directory Columns */}
        <div className="container mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 max-w-[1440px]">
          <div className="space-y-4">
            <h5 className="font-extrabold text-sm tracking-wider text-[#0047AB] dark:text-blue-400 uppercase">Study Destinations</h5>
            <ul className="space-y-2 text-xs text-gray-400 font-semibold">
              <li><button onClick={() => { setSelectedDestination(DESTINATIONS[0]); setCurrentTab("destination-detail"); window.scrollTo(0, 0); }} className="hover:underline hover:text-white text-left">Study in Australia</button></li>
              <li><button onClick={() => { setSelectedDestination(DESTINATIONS[1]); setCurrentTab("destination-detail"); window.scrollTo(0, 0); }} className="hover:underline hover:text-white text-left">Study in United Kingdom</button></li>
              <li><button onClick={() => { setSelectedDestination(DESTINATIONS[2]); setCurrentTab("destination-detail"); window.scrollTo(0, 0); }} className="hover:underline hover:text-white text-left">Study in United States</button></li>
              <li><button onClick={() => { setSelectedDestination(DESTINATIONS[5]); setCurrentTab("destination-detail"); window.scrollTo(0, 0); }} className="hover:underline hover:text-white text-left">Study in Canada</button></li>
              <li><button onClick={() => { setSelectedDestination(DESTINATIONS[4]); setCurrentTab("destination-detail"); window.scrollTo(0, 0); }} className="hover:underline hover:text-white text-left">Study in Ireland</button></li>
              <li><button onClick={() => { setSelectedDestination(DESTINATIONS[7]); setCurrentTab("destination-detail"); window.scrollTo(0, 0); }} className="hover:underline hover:text-white text-left">Study in Germany 🇩🇪</button></li>
              <li><button onClick={() => { setSelectedDestination(DESTINATIONS[8]); setCurrentTab("destination-detail"); window.scrollTo(0, 0); }} className="hover:underline hover:text-white text-left">Study in France 🇫🇷</button></li>
              <li><button onClick={() => { setSelectedDestination(DESTINATIONS[3]); setCurrentTab("destination-detail"); window.scrollTo(0, 0); }} className="hover:underline hover:text-white text-left">Study in New Zealand 🇳🇿</button></li>
              <li><button onClick={() => { setSelectedDestination(DESTINATIONS[6]); setCurrentTab("destination-detail"); window.scrollTo(0, 0); }} className="hover:underline hover:text-white text-left">Study in Europe 🇪🇺</button></li>
              <li><button onClick={() => { setCurrentTab("info_why_study_abroad"); window.scrollTo(0,0); }} className="text-orange-400 hover:underline hover:text-white font-extrabold text-left block">Why Study Abroad?</button></li>
              <li><button onClick={() => { setCurrentTab("info_where_what"); window.scrollTo(0,0); }} className="text-orange-400 hover:underline hover:text-white font-extrabold text-left block">Where &amp; What?</button></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h5 className="font-extrabold text-sm tracking-wider text-[#0047AB] dark:text-blue-400 uppercase">Guidance &amp; Milestones</h5>
            <ul className="space-y-2 text-xs text-gray-400 font-semibold">
              <li><button onClick={() => { setCurrentTab("info_personalized_profile_assessment"); window.scrollTo(0,0); }} className="hover:underline hover:text-white text-left">Personalized Profile Assessment</button></li>
              <li><button onClick={() => { setCurrentTab("info_applying_to_institutions"); window.scrollTo(0,0); }} className="hover:underline hover:text-white text-left">Applying to Institutions</button></li>
              <li><button onClick={() => { setCurrentTab("info_admission_letter_acceptance"); window.scrollTo(0,0); }} className="hover:underline hover:text-white text-left">Admission Letter Acceptance</button></li>
              <li><button onClick={() => { setCurrentTab("info_education_loan_support"); window.scrollTo(0,0); }} className="hover:underline hover:text-white text-left">Education Loan Support</button></li>
              <li><button onClick={() => { setCurrentTab("info_visa_interview_filing"); window.scrollTo(0,0); }} className="hover:underline hover:text-white text-left">Visa Interview &amp; Filing</button></li>
              <li><button onClick={() => { setCurrentTab("info_pre_departure_briefings"); window.scrollTo(0,0); }} className="hover:underline hover:text-white text-left">Pre-departure Briefings &amp; Forex</button></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h5 className="font-extrabold text-sm tracking-wider text-[#0047AB] dark:text-blue-400 uppercase">Roadmap Timeline</h5>
            <ul className="space-y-2 text-xs text-gray-400 font-semibold">
              <li><button onClick={() => { setCurrentTab("info_how_apply"); window.scrollTo(0, 0); }} className="hover:underline hover:text-white text-left block">How Do I Apply?</button></li>
              <li><button onClick={() => { setCurrentTab("info_receiving_offers"); window.scrollTo(0, 0); }} className="hover:underline hover:text-white text-left block">Receiving Offers</button></li>
              <li><button onClick={() => { setCurrentTab("info_prepare_depart"); window.scrollTo(0, 0); }} className="hover:underline hover:text-white text-left block">Prepare Depart</button></li>
              <li><button onClick={() => { setCurrentTab("info_arrive_thrive"); window.scrollTo(0, 0); }} className="hover:underline hover:text-white text-left block">Arrive &amp; Thrive</button></li>
              <li><button onClick={() => { setCurrentTab("tests"); window.scrollTo(0, 0); }} className="hover:underline hover:text-[#0047AB] font-bold text-left block">Language Testing Centers</button></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h5 className="font-extrabold text-sm tracking-wider text-[#0047AB] dark:text-blue-400 uppercase">Student Hub &amp; Tools</h5>
            <ul className="space-y-2 text-xs text-gray-400 font-semibold">
              <li><button onClick={() => { setCurrentTab("info_student_news"); window.scrollTo(0, 0); }} className="hover:underline hover:text-[#0047AB] text-emerald-400 text-left font-black block">Student News Hub</button></li>
              <li><button onClick={() => { setCurrentTab("info_free_appointment"); window.scrollTo(0, 0); }} className="hover:underline hover:text-[#0047AB] text-orange-400 font-extrabold text-left block">Free Appointment Slot</button></li>
              <li><button onClick={() => { setCurrentTab("search"); window.scrollTo(0, 0); }} className="hover:underline hover:text-white text-left block">Find Courses &amp; Subjects</button></li>
              <li><button onClick={() => { setCurrentTab("calculator"); window.scrollTo(0, 0); }} className="hover:underline hover:text-white text-left block">Cost of Living Calculator</button></li>
              <li><button onClick={() => { setCurrentTab("eligibility"); window.scrollTo(0, 0); }} className="hover:underline hover:text-white font-extrabold text-left block">Eligibility Checker Tool</button></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h5 className="font-extrabold text-sm tracking-wider text-[#0047AB] dark:text-blue-400 uppercase">Contact Headquarters</h5>
            <div className="space-y-2 text-xs text-gray-400 font-bold leading-relaxed">
              <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-emerald-400 shrink-0" /> <a href="tel:+919000119072" className="hover:underline select-all text-white">+91 90001 19072</a></p>
              <p className="flex items-start gap-2 pt-1"><MapPin className="h-4.5 w-4.5 text-blue-400 shrink-0" /><span className="text-gray-300">Metro Pillar No: 1568, 509, 5th Floor, Chaithyana Chambers, Chaitanyapuri, Dilsukhnagar, Hyderabad-60, Telangana, India.</span></p>
              <p className="flex items-center gap-2 pt-1"><Mail className="h-4 w-4 text-orange-400 shrink-0" /> info@careerwingsconsultants.com</p>
              <p className="flex items-center gap-2"><Globe className="h-4 w-4 text-teal-400 shrink-0" /> www.careerwingsconsultants.com</p>
            </div>
          </div>
        </div>

        {/* Brand strip */}
        <div className="bg-slate-950 py-12 border-t border-white/5">
          <div className="container mx-auto px-4 max-w-[1440px]">
            <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="text-xs text-gray-500 font-semibold text-center lg:text-left">
                <p>© 2026 Career Wings Consultants. All Rights Reserved.</p>
                <p className="mt-1">ISO 9001:2015 Study Abroad Consultation Agency.</p>
              </div>
              
              <div className="flex items-center gap-6 text-xs text-gray-500 font-semibold">
                <button onClick={() => { setCurrentTab("info_privacy_policy"); window.scrollTo(0, 0); }} className="hover:underline hover:text-white cursor-pointer bg-transparent border-0 p-0">Privacy Policy</button>
                <span>|</span>
                <button onClick={() => { setCurrentTab("info_terms_of_use"); window.scrollTo(0, 0); }} className="hover:underline hover:text-white cursor-pointer bg-transparent border-0 p-0">Terms of Use</button>
                <span>|</span>
                <button onClick={() => { setCurrentTab("info_disclaimer"); window.scrollTo(0, 0); }} className="hover:underline hover:text-white cursor-pointer bg-transparent border-0 p-0">Disclaimer</button>
              </div>

              <div className="italic font-serif text-base text-gray-400">
                Turning Aspirations into Global Opportunities!
              </div>
            </div>
          </div>
        </div>

      </footer>

      {/* Floating HTML Download Hub */}
      {false && (
        <AnimatePresence>
        {showDownloadPanel ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed bottom-6 right-6 z-50 max-w-[360px] bg-white dark:bg-slate-950 rounded-3xl shadow-2xl border-2 border-emerald-500 dark:border-emerald-400 overflow-hidden flex flex-col text-slate-800 dark:text-slate-100"
          >
            {/* Header */}
            <div className="bg-emerald-600 dark:bg-emerald-700 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FolderArchive className="h-5 w-5 animate-bounce" />
                <div>
                  <h4 className="font-black text-xs uppercase tracking-wider">HTML ZIP Download Hub</h4>
                  <p className="text-[10px] text-emerald-100 font-bold">100% Static Single Code Package</p>
                </div>
              </div>
              <button 
                onClick={() => setShowDownloadPanel(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
                title="Minimise"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 space-y-4 text-xs font-semibold leading-relaxed">
              <p className="text-gray-600 dark:text-slate-300">
                Aapka custom-made pure <strong>HTML &amp; CSS code</strong> package local system ke liye ready ho chuka hai! 
              </p>
              <div className="p-3 bg-amber-50 dark:bg-slate-900 border border-amber-200 dark:border-slate-800 rounded-2xl text-[11px] text-amber-800 dark:text-amber-300 space-y-1.5">
                <p>💡 <strong>Note:</strong> Yeh code container ke andar virtual Desktop par saved hai, isliye aapko AI Studio ke 'Settings' menu me direct ZIP export nahi mil raha tha.</p>
                <p>Niche diye gaye buttons se aap ise directly apne computer/mobile par download kar sakte hain!</p>
              </div>

              <div className="space-y-2 pt-1">
                {/* Option 1: ZIP File */}
                <a 
                  href="/api/download-html-zip"
                  download
                  className="w-full flex items-center justify-between gap-3 p-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-2xl shadow-sm transition-all text-center select-none"
                >
                  <span className="flex items-center gap-2">
                    <FolderArchive className="h-4 w-4" />
                    Download Full Folder (ZIP)
                  </span>
                  <Download className="h-4 w-4" />
                </a>

                {/* Option 2: Single HTML File */}
                <a 
                  href="/api/download-single-html"
                  download
                  className="w-full flex items-center justify-between gap-3 p-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 font-extrabold text-xs rounded-2xl border border-slate-200 dark:border-slate-800 transition-all text-center select-none"
                >
                  <span className="flex items-center gap-2">
                    <FileCode className="h-4 w-4 text-[#0047AB] dark:text-blue-400" />
                    Download Main Page HTML
                  </span>
                  <Download className="h-4 w-4" />
                </a>

                {/* Option 3: Single Appointment HTML File */}
                <a 
                  href="/api/download-appointment-html"
                  download
                  className="w-full flex items-center justify-between gap-3 p-3 bg-amber-550 hover:bg-amber-600 bg-amber-500 text-white font-extrabold text-xs rounded-2xl transition-all text-center select-none shadow-sm"
                >
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Download Appointment HTML
                  </span>
                  <Download className="h-4 w-4" />
                </a>
              </div>
              
              <div className="text-[10px] text-gray-400 dark:text-slate-500 text-center font-mono font-medium">
                Folder Name: Career Wings Html 16-07-2026
              </div>
            </div>
          </motion.div>
        ) : (
          /* Minimized Floating FAB */
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setShowDownloadPanel(true)}
            className="fixed bottom-6 right-6 z-50 bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-2xl flex items-center gap-2 font-black text-xs transition-all border-2 border-white hover:scale-105 active:scale-95 animate-pulse"
          >
            <FolderArchive className="h-5 w-5" />
            <span>Download HTML ZIP</span>
          </motion.button>
        )}
      </AnimatePresence>
      )}

    </div>
  );
}
