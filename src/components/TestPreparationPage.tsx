import React, { useState } from "react";
import IeltsMockSimulator from "./IeltsMockSimulator";
import PteMockSimulator from "./PteMockSimulator";
import ToeflMockSimulator from "./ToeflMockSimulator";
import DuolingoMockSimulator from "./DuolingoMockSimulator";
import { 
  Award, 
  MapPin, 
  Search, 
  CheckCircle, 
  ArrowRight, 
  FileText, 
  Layers, 
  Calendar, 
  TrendingUp, 
  CheckSquare, 
  BookOpen, 
  Clock, 
  Sparkles,
  HelpCircle,
  Shuffle,
  RefreshCw
} from "lucide-react";
import { 
  vocabularyQuestions, 
  readingQuestions, 
  grammarQuestions, 
  shuffleQuestions,
  SandboxQuestion 
} from "../data/mockTestQuestions";

interface TestPreparationPageProps {
  onBookCounselling: (details: string) => void;
  initialTestTab?: string;
  onTabChange?: (tab: string) => void;
}

type TestType = "ielts" | "pte" | "toefl" | "duolingo" | "spoken";

export default function TestPreparationPage({
  onBookCounselling,
  initialTestTab = "ielts",
  onTabChange
}: TestPreparationPageProps) {
  const [activeTab, setActiveTab] = useState<TestType>(initialTestTab as TestType);

  React.useEffect(() => {
    if (initialTestTab) {
      setActiveTab(initialTestTab as TestType);
    }
  }, [initialTestTab]);

  React.useEffect(() => {
    onTabChange?.(activeTab);
  }, [activeTab, onTabChange]);

  const testDetails = {
    ielts: {
      fullname: "International English Language Testing System (IELTS)",
      overview: "Standard high-stakes English exam accepted across Canada, UK, Australia, New Zealand, and USA, organized jointly by Career Wings and Cambridge English.",
      structure: [
        { section: "Listening", duration: "30 Min", desc: "4 taped clips with 40 questions total representing diverse national accents." },
        { section: "Reading", duration: "60 Min", desc: "3 elongated academic passages checking main themes, skim capabilities, and logical matching." },
        { section: "Writing", duration: "60 Min", desc: "Task 1 (report visual graph/diagram data representation) + Task 2 (formal persuasive discussion essay)." },
        { section: "Speaking", duration: "11-14 Min", desc: "A face-to-face active meeting with an official proctor checking colloquial pace and vocabulary." }
      ],
      quickStats: {
        scoring: "1.0 to 9.0 Bands (0.5 Increments)",
        passingRange: "6.0 - 6.5 Bands for postgrad admissions",
        validity: "2 Years from session certification",
        fee: "Est. $180 - $220 USD"
      },
      perks: [
        "Unparalleled global acceptance at over 12,000 top colleges.",
        "Both Academic Paper-based and computerized formats available near metros.",
        "Acceptable for formal Express Entry or study permit (SDS) visas."
      ],
      coachingPlan: "6-Week Fast-Track Prep consisting of weekly full-length tests, individual essay corrections, and speaking simulation sessions."
    },
    pte: {
      fullname: "Pearson Test of English Academic (PTE)",
      overview: "Highly secure, fully-computerized academic English test scored completely using state-of-the-art AI parsing algorithms. Results often certified within 24-48 hours.",
      structure: [
        { section: "Speaking & Writing", duration: "54-67 Min", desc: "Includes read-aloud prompts, lecture summarizations, dynamic graphs, and 200-word formal essays." },
        { section: "Reading", duration: "29-30 Min", desc: "Multiple choice checkboxes, fill-in-blanks matrices, and re-order paragraph blocks." },
        { section: "Listening", duration: "30-43 Min", desc: "Select missing spoken sentences, summarize spoken voice logs, and write from dictation tapes." }
      ],
      quickStats: {
        scoring: "10 to 90 Points Scale",
        passingRange: "58 - 65 Points for postgrad admissions",
        validity: "2 Years from certification date",
        fee: "Est. $185 - $210 USD"
      },
      perks: [
        "Completely computerized bias-free evaluation with fast results turnaround.",
        "Widespread university coverage in Australia, New Zealand, UK, and Ireland.",
        "Perfect for candidates desiring rapid test date sessions."
      ],
      coachingPlan: "4-Week PTE Bootcamp analyzing AI scoring rules, keyboard timing tips, read-aloud voice modulations, and dictation punctuation."
    },
    toefl: {
      fullname: "Test of English as a Foreign Language (TOEFL iBT)",
      overview: "Traditional, highly academic English text engineered specifically to measure how well you combine listening, reading, speaking, and writing skills to perform academic tasks.",
      structure: [
        { section: "Reading", duration: "35 Min", desc: "2 passages consisting of 10 comprehension questions each on natural or social sciences." },
        { section: "Listening", duration: "36 Min", desc: "University-level lecture recordings and informal campus discussions followed by analysis." },
        { section: "Speaking", duration: "16 Min", desc: "4 tasks checking classroom integration - summarize a reading plan and debate topics over mic." },
        { section: "Writing", duration: "29 Min", desc: "Task 1 (Read and listen synthesis report) + Task 2 (Discuss a modern academic topic online)." }
      ],
      quickStats: {
        scoring: "0 to 120 Points (30 pts per section)",
        passingRange: "80 - 100 Points depending on university tiers",
        validity: "2 Years from exam timestamp",
        fee: "Est. $200 - $245 USD"
      },
      perks: [
        "Elite acceptance criteria across 100% of major ivy and tech institutes in North America.",
        "Shorter, streamlined 2-hour format introduced for convenient test-taking.",
        "In-depth sectional diagnostic feedback generated on error types."
      ],
      coachingPlan: "5-Week TOEFL academic masterclass focusing on reading comprehension speed-drills, campus voice-note mapping, and writing templates."
    },
    duolingo: {
      fullname: "Duolingo English Test (DET)",
      overview: "A modern, adaptive web camera-based English certification test that candidates can take from home on their computer. Scored via complex machine learning vectors.",
      structure: [
        { section: "Adaptive Exercises", duration: "45 Min", desc: "Spoken prompts, vocab dictionary checklists, dictate loops, missing letter fill-ins, and interactive reading questions." },
        { section: "Writing Sample", duration: "5 Min", desc: "Write on an open academic discussion prompt with a timer showing active word count stats." },
        { section: "Speaking Sample", duration: "4 Min", desc: "Speak into a video feed responding directly to two general situational prompts." }
      ],
      quickStats: {
        scoring: "10 to 160 Points Scale (5 pt intervals)",
        passingRange: "115 - 125 Points for university entries",
        validity: "2 Years from digital certificate issue",
        fee: "Est. $59 - $65 USD (Highly affordable)"
      },
      perks: [
        "Take the exam from any quiet room with high-quality web-camera and internet.",
        "Fully certified within 48 hours with unlimited free reports to infinite colleges.",
        "Includes visual speaking portfolio sent directly to target university boards."
      ],
      coachingPlan: "3-Week DET Prep focusing on dictation keyboard pacing, adaptive vocab strategies, and webcam guidelines to prevent security flags."
    },
    spoken: {
      fullname: "Professional & Spoken English Program",
      overview: "A non-exam localized program built specifically to raise fluency, remove accents anxiety, and master interview panels.",
      structure: [
        { section: "Fluency Drills", duration: "Custom", desc: "Removing 'umbrella words' (like, um, right) and building coherent compound structure sequences." },
        { section: "Vocabulary Vaults", duration: "Custom", desc: "Mastering professional words, idioms, presentation phrases, and situational business jargon." },
        { section: "Admissions Interview Mocking", duration: "Custom", desc: "Prepping common panels questions like 'Introduce yourself', 'Why this program' with instant coach feedback." }
      ],
      quickStats: {
        scoring: "Fluency Scale Checkups (A1 to C2 CEFR)",
        passingRange: "Targeting C1 Professional Fluency",
        validity: "Lifelong confidence and certification",
        fee: "Custom local curriculum bundles available"
      },
      perks: [
        "Increases career promotion success rates immediately.",
        "Eliminates fear and hesitation in visa interviews or university group interviews.",
        "Interactive group discussion panels with global fellow learners."
      ],
      coachingPlan: "Comprehensive 8-Week Fluency & Accent Reduction Program, managed live by certified British Counsel instructors."
    }
  };

  // Diagnostic practice sandbox state
  const [isIeltsSimulatorActive, setIsIeltsSimulatorActive] = useState<boolean>(true);
  const [currentSection, setCurrentSection] = useState<"vocabulary" | "reading" | "grammar">("vocabulary");
  const [readingFilter, setReadingFilter] = useState<string>("all"); // "all", "ielts", "pte", "toefl", "duolingo"
  const [activeQuestions, setActiveQuestions] = useState<SandboxQuestion[]>([]);
  const [sandboxIdx, setSandboxIdx] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showSandboxFeedback, setShowSandboxFeedback] = useState<boolean>(false);
  const [sandboxScore, setSandboxScore] = useState<number>(0);

  // New States for Lead gating & scoring reports
  const [answeredCount, setAnsweredCount] = useState<number>(0);
  const [isLeadGateActive, setIsLeadGateActive] = useState<boolean>(false);
  const [isReportActive, setIsReportActive] = useState<boolean>(false);
  
  const [leadName, setLeadName] = useState<string>("");
  const [leadPhone, setLeadPhone] = useState<string>("");
  const [leadEmail, setLeadEmail] = useState<string>("");
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // Initialize and shuffle questions on mount or category change
  React.useEffect(() => {
    let source: SandboxQuestion[] = [];
    if (currentSection === "vocabulary") {
      source = [...vocabularyQuestions];
    } else if (currentSection === "reading") {
      source = [...readingQuestions];
      if (readingFilter !== "all") {
        source = source.filter(q => q.tag === readingFilter);
      }
    } else if (currentSection === "grammar") {
      source = [...grammarQuestions];
    }

    // Shuffle so it acts as "jumbling system" right off the bat and every time it is loaded!
    const jumbled = shuffleQuestions(source);
    setActiveQuestions(jumbled);
    setSandboxIdx(0);
    setSelectedAnswer(null);
    setShowSandboxFeedback(false);
    setSandboxScore(0);
  }, [currentSection, readingFilter]);

  // Handle manual reshuffling ("Shuffle & Load Fresh Mix 🔄")
  const handleShuffleSandbox = () => {
    let source: SandboxQuestion[] = [];
    if (currentSection === "vocabulary") {
      source = [...vocabularyQuestions];
    } else if (currentSection === "reading") {
      source = [...readingQuestions];
      if (readingFilter !== "all") {
        source = source.filter(q => q.tag === readingFilter);
      }
    } else if (currentSection === "grammar") {
      source = [...grammarQuestions];
    }

    const jumbled = shuffleQuestions(source);
    setActiveQuestions(jumbled);
    setSandboxIdx(0);
    setSelectedAnswer(null);
    setShowSandboxFeedback(false);
    setSandboxScore(0);
  };

  const handleSelectAnswer = (opt: string) => {
    if (showSandboxFeedback || activeQuestions.length === 0) return;
    setSelectedAnswer(opt);
  };

  const handleSandboxSubmit = () => {
    if (!selectedAnswer || activeQuestions.length === 0) return;
    const currentQ = activeQuestions[sandboxIdx];
    const isCorrect = selectedAnswer === currentQ.correct;
    if (isCorrect) {
      setSandboxScore(prev => prev + 1);
    }
    setShowSandboxFeedback(true);
    setAnsweredCount(prev => prev + 1);
  };

  const handleSandboxNext = () => {
    setSelectedAnswer(null);
    setShowSandboxFeedback(false);
    if (activeQuestions.length === 0) return;

    // Trigger Lead Gate after 50 questions answered
    if (answeredCount >= 50) {
      setIsLeadGateActive(true);
      return;
    }

    if (sandboxIdx < activeQuestions.length - 1) {
      setSandboxIdx(prev => prev + 1);
    } else {
      // Re-shuffle on restart to ensure it never restarts in the same sequence!
      handleShuffleSandbox();
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone || !leadEmail) return;
    setFormSubmitted(true);
    setIsLeadGateActive(false);
    setIsReportActive(true);
  };

  const handleRestartCompleteSession = () => {
    setAnsweredCount(0);
    setIsLeadGateActive(false);
    setIsReportActive(false);
    setFormSubmitted(false);
    setLeadName("");
    setLeadPhone("");
    setLeadEmail("");
    handleShuffleSandbox();
  };

  return (
    <div className="bg-[#FCFAF7] dark:bg-slate-950 min-h-screen pb-24 transition-colors">
      
      {/* Page Hero Header Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F3572] via-[#0047AB] to-[#041D44] text-white py-16 sm:py-24">
        {/* Subtle geometric circles */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500/5 rounded-full blur-2xl"></div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center space-y-6 animate-fade-in">
          <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold text-[11px] uppercase tracking-widest px-4.5 py-1.5 rounded-full inline-block shadow-lg shadow-orange-500/20">
            CWC - Professional Prep Academy
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight max-w-4xl mx-auto">
            Excel In Your Exams with <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-300 bg-clip-text text-transparent">Certified English Coaches</span>
          </h1>
          <p className="text-gray-250 text-sm sm:text-base max-w-2xl mx-auto font-medium">
            Gain executive scores under top-ranked certified coaches at Career Wings. We offer specialized IELTS, PTE, and TOEFL training templates with full mockups.
          </p>

          <div className="flex justify-center gap-3 pt-4">
            <button
              onClick={() => onBookCounselling(`Requested exam registration & prep counseling for: ${activeTab.toUpperCase()}`)}
              className="bg-[#0047AB] hover:bg-blue-600 text-white font-black text-xs px-6 py-3.5 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
            >
              Request Free Mock &amp; Diagnostics File
            </button>
          </div>
        </div>
      </section>

      {/* Main content grid */}
      <div className="container mx-auto px-4 max-w-7xl -mt-8 relative z-20 space-y-12">
        
        {/* Row 1: Interactive Test Tabs and Data view */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Tabs and detail content (8 cols) */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-[30px] border border-slate-200/50 dark:border-slate-800 p-6 sm:p-10 shadow-2xl transition-all space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Exam Tabs selectors */}
              <div className="flex flex-wrap gap-2 pb-2 border-b border-gray-100 dark:border-slate-800">
                {[
                  { id: "ielts", val: "IELTS" },
                  { id: "pte", val: "PTE Academic" },
                  { id: "toefl", val: "TOEFL iBT" },
                  { id: "duolingo", val: "Duolingo (DET)" },
                  { id: "spoken", val: "Spoken English" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id as TestType); setSelectedAnswer(null); setShowSandboxFeedback(false); }}
                    className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      activeTab === item.id 
                        ? "bg-[#0047AB] text-white shadow-md shadow-blue-500/10" 
                        : "text-gray-500 dark:text-slate-400 hover:text-gray-950"
                    }`}
                  >
                    {item.val}
                  </button>
                ))}
              </div>

              {/* Tab Header Detail */}
              <div className="space-y-3">
                <h3 className="text-xl sm:text-2.5xl font-black text-gray-950 dark:text-white">{testDetails[activeTab].fullname}</h3>
                <p className="text-gray-500 dark:text-slate-350 text-xs sm:text-sm leading-relaxed font-semibold">{testDetails[activeTab].overview}</p>
              </div>

              {/* Exam Section Breakdown */}
              <div className="space-y-3 pt-2">
                <h4 className="text-[11px] font-black uppercase text-gray-400 dark:text-slate-500 tracking-wider flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5 text-[#0047AB] dark:text-blue-400" /> Section-wise Evaluation Breakdown
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {testDetails[activeTab].structure.map((item, idx) => (
                    <div key={idx} className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-gray-150/40 dark:border-slate-850 flex flex-col justify-between space-y-2">
                      <div className="flex justify-between items-center text-xs font-black">
                        <span className="text-gray-900 dark:text-slate-200">{item.section}</span>
                        <span className="text-orange-500 bg-orange-50 dark:bg-orange-950/30 px-2 py-0.5 rounded text-[10px]">{item.duration}</span>
                      </div>
                      <p className="text-[11px] text-gray-400 dark:text-slate-450 leading-normal font-semibold">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Training and Prep highlight */}
              <div className="pt-4 border-t border-gray-100 dark:border-slate-800 space-y-2">
                <h4 className="text-[11px] font-black uppercase text-gray-400 dark:text-slate-500 tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-500" /> Custom Training Plan Highlights
                </h4>
                <p className="text-gray-700 dark:text-slate-300 text-xs sm:text-sm font-bold bg-emerald-50/50 dark:bg-emerald-950/20 p-4 rounded-xl border border-emerald-100/40 dark:border-emerald-950/40">
                  {testDetails[activeTab].coachingPlan}
                </p>
              </div>
            </div>

            {/* Action panel underneath */}
            <div className="pt-6 border-t border-gray-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
              <span className="text-[11px] text-gray-400 dark:text-slate-500 font-semibold leading-relaxed">
                * Career Wings is an official test registration partner with Career Wings and British Council.
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => onBookCounselling(`Register candidate for actual official ${activeTab.toUpperCase()} exam near closest center`)}
                  className="px-4 py-2.5 rounded-xl text-xs font-black border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer pointer-events-auto transition-all"
                >
                  Book Official Exam
                </button>
                <button
                  onClick={() => onBookCounselling(`Coaching application for: ${activeTab.toUpperCase()}`)}
                  className="bg-[#0047AB] hover:bg-blue-700 text-white font-black text-xs px-5 py-2.5 rounded-xl shadow-md cursor-pointer pointer-events-auto transition-all"
                >
                  Enroll In Coaching
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats sidebar (4 cols) */}
          <div className="lg:col-span-4 bg-[#0B1528] text-white rounded-[30px] border border-slate-850 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-widest font-black text-orange-400">At A Glance Specifications</span>
              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">Exam Index Stats</h3>
              <p className="text-gray-400 text-xs font-semibold leading-relaxed">Review quick key metrics for planning targets:</p>
              
              <div className="space-y-3 pt-2">
                {[
                  { label: "Scoring Metric", value: testDetails[activeTab].quickStats.scoring },
                  { label: "Admissions Passing Range", value: testDetails[activeTab].quickStats.passingRange },
                  { label: "Certificate Validity", value: testDetails[activeTab].quickStats.validity },
                  { label: "Average Test Fee", value: testDetails[activeTab].quickStats.fee }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white/5 rounded-2xl p-4 border border-white/5 space-y-0.5">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-black">{stat.label}</p>
                    <p className="text-xs sm:text-sm font-black text-white">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom perks bullets */}
            <div className="pt-4 border-t border-white/5 space-y-2">
              <h4 className="text-[10px] font-black uppercase text-gray-500 tracking-wider">Candidate Perks</h4>
              <div className="space-y-1.5 pl-1">
                {testDetails[activeTab].perks.slice(0, 2).map((perk, perkIdx) => (
                  <div key={perkIdx} className="flex gap-2 items-start text-[10.5px] font-bold text-gray-300">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Diagnostic Practice Vocabulary Sandbox */}
        <div id="language-academy-sandbox" className="bg-white dark:bg-slate-900 rounded-[30px] border border-gray-100 dark:border-slate-800 p-6 sm:p-10 transition-colors">
          
          {/* Top Choice Panel to switch between modes */}
          <div className="max-w-3xl mx-auto mb-8 pb-6 border-b border-gray-100 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1 text-left">
              <span className="text-[10px] uppercase font-black tracking-widest text-[#0047AB] dark:text-blue-400">Select Sandbox Methodology</span>
              <h3 className="text-sm font-black text-gray-950 dark:text-white">
                Active {activeTab === "spoken" ? "Spoken English" : activeTab.toUpperCase()} Assessment Mode
              </h3>
            </div>
            <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-gray-200/40 dark:border-slate-850 gap-1 text-xs font-bold shrink-0">
              <button
                onClick={() => setIsIeltsSimulatorActive(true)}
                className={`px-3.5 py-1.5 rounded-lg cursor-pointer transition-all flex items-center gap-1 ${
                  isIeltsSimulatorActive
                    ? "bg-[#0047AB] text-white shadow-sm font-black"
                    : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                ⚡ Sequential Exam Mock
              </button>
              <button
                onClick={() => setIsIeltsSimulatorActive(false)}
                className={`px-3.5 py-1.5 rounded-lg cursor-pointer transition-all flex items-center gap-1 ${
                  !isIeltsSimulatorActive
                    ? "bg-[#0047AB] text-white shadow-sm font-black"
                    : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                📚 Topic Practice Sets
              </button>
            </div>
          </div>

          {isIeltsSimulatorActive ? (
            <div className="max-w-5xl mx-auto space-y-6">
              {activeTab === "ielts" && (
                <IeltsMockSimulator 
                  onBookCounselling={onBookCounselling}
                  onBack={() => setIsIeltsSimulatorActive(false)}
                />
              )}
              {activeTab === "pte" && (
                <PteMockSimulator 
                  onBookCounselling={onBookCounselling}
                  onBack={() => setIsIeltsSimulatorActive(false)}
                />
              )}
              {activeTab === "toefl" && (
                <ToeflMockSimulator 
                  onBookCounselling={onBookCounselling}
                  onBack={() => setIsIeltsSimulatorActive(false)}
                />
              )}
              {activeTab === "duolingo" && (
                <DuolingoMockSimulator 
                  onBookCounselling={onBookCounselling}
                  onBack={() => setIsIeltsSimulatorActive(false)}
                />
              )}
              {activeTab === "spoken" && (
                <div className="p-8 text-center bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800 rounded-3xl space-y-4 max-w-xl mx-auto">
                  <div className="p-3 bg-blue-100 dark:bg-blue-950 text-[#0047AB] rounded-full w-12 h-12 flex items-center justify-center mx-auto">
                    <Sparkles className="h-6 w-6 animate-pulse" />
                  </div>
                  <h4 className="text-base font-black text-gray-900 dark:text-white">Professional Spoken Program Simulator</h4>
                  <p className="text-xs text-gray-400 font-semibold leading-relaxed">
                    Personalized fluency assessments are administered live by certified British Council coaches at our Metros offices. Explore practice cards in of the "Topic Practice Sets" tab below to verify pronunciation speed and reduce hesitation!
                  </p>
                  <button
                    onClick={() => setIsIeltsSimulatorActive(false)}
                    className="px-4 py-2 bg-[#0047AB] hover:bg-blue-700 text-white rounded-lg text-xs font-black cursor-pointer shadow-sm"
                  >
                    Open Topic Practice Sets
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-widest font-extrabold text-[#0047AB] dark:text-blue-400 flex items-center justify-center gap-1">
                <Sparkles className="h-4 w-4 text-orange-400 animate-pulse" /> Language Academy Sandbox
              </span>
              <h2 className="text-2.5xl sm:text-4xl font-black text-gray-950 dark:text-white leading-tight">Interactive Practice &amp; Evaluation Arena</h2>
              <p className="text-gray-400 dark:text-slate-450 text-xs sm:text-sm font-semibold max-w-xl mx-auto">
                Sharpen your skills with randomized testing sets. Every session contains unique, fully shuffled questions to avoid static order repetition!
              </p>

              {/* Master Practice Section Tabs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-gray-150/40 dark:border-slate-850 max-w-2xl mx-auto mt-4">
                <button
                  onClick={() => setCurrentSection("vocabulary")}
                  className={`py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-[#0047AB] pointer-events-auto ${
                    currentSection === "vocabulary"
                      ? "bg-[#0047AB] text-white shadow-md shadow-blue-500/10"
                      : "text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <Sparkles className="h-3.5 w-3.5 shrink-0" />
                  <span>Vocabulary</span>
                </button>
                <button
                  onClick={() => setCurrentSection("reading")}
                  className={`py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-[#0047AB] pointer-events-auto ${
                    currentSection === "reading"
                      ? "bg-[#0047AB] text-white shadow-md shadow-blue-500/10"
                      : "text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <BookOpen className="h-3.5 w-3.5 shrink-0" />
                  <span>Reading Diagnostic</span>
                </button>
                <button
                  onClick={() => setCurrentSection("grammar")}
                  className={`py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-[#0047AB] pointer-events-auto ${
                    currentSection === "grammar"
                      ? "bg-[#0047AB] text-white shadow-md shadow-blue-500/10"
                      : "text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <Award className="h-3.5 w-3.5 shrink-0" />
                  <span>Spoken Grammar Master</span>
                </button>
              </div>

              {/* Specialized format filter if Study Abroad Reading is selected */}
              {currentSection === "reading" && (
                <div className="flex flex-wrap justify-center items-center gap-1.5 pt-2 max-w-2xl mx-auto">
                  <span className="text-[10px] uppercase font-black tracking-wider text-gray-400 mr-1">Filter Test:</span>
                  {[
                    { id: "all", label: "All Formats jumbled" },
                    { id: "ielts", label: "IELTS Style" },
                    { id: "pte", label: "PTE Academic" },
                    { id: "toefl", label: "TOEFL iBT" },
                    { id: "duolingo", label: "Duolingo DET" }
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setReadingFilter(f.id)}
                      className={`px-3 py-1.5 rounded-lg text-[10.5px] font-bold transition-all cursor-pointer pointer-events-auto ${
                        readingFilter === f.id
                          ? "bg-amber-500 text-white"
                          : "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-350 hover:bg-gray-200 dark:hover:bg-slate-700"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Progress dashboard - visible during active practice */}
            {!isLeadGateActive && !isReportActive && (
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#0047AB]/5 dark:bg-slate-950/40 p-5 rounded-2xl border border-blue-100/30 dark:border-slate-850 gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-black text-gray-800 dark:text-slate-200 flex items-center gap-1.5 uppercase tracking-wider">
                    <TrendingUp className="h-4 w-4 text-[#0047AB] dark:text-blue-400" />
                    <span>Evaluation Milestones:</span>
                    <span className="font-extrabold text-[#0047AB] dark:text-blue-400">{answeredCount} answered / 50 target</span>
                  </div>
                  <p className="text-[10.5px] text-gray-500 dark:text-slate-400 font-semibold">
                    Complete 50 diagnostic checkpoints to auto-unlock your customized score-sheet &amp; free physical prep strategy session!
                  </p>
                </div>
                <div className="w-full sm:w-56 space-y-2">
                  <div className="bg-gray-250 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-orange-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (answeredCount / 50) * 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center text-[9px] font-extrabold text-gray-400 uppercase">
                    <span>{Math.min(100, Math.round((answeredCount / 50) * 100))}% Completed</span>
                    {answeredCount >= 5 && (
                      <button 
                        onClick={() => setIsLeadGateActive(true)}
                        className="text-orange-500 hover:underline cursor-pointer"
                      >
                        Enrol &amp; Finish Early 📊
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Sandbox Card */}
            <div className="bg-slate-50 dark:bg-slate-950 p-6 sm:p-8 rounded-2xl border border-gray-150/40 dark:border-slate-850 space-y-6 relative overflow-hidden">
              
              {/* STATE 1: Normal Practice Loop */}
              {!isLeadGateActive && !isReportActive && (
                <>
                  <div className="flex justify-between items-center text-xs font-bold text-gray-400">
                    <span className="flex items-center gap-1.5 text-gray-900 dark:text-white">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                      Active Practice Zone: <span className="uppercase text-orange-500 font-extrabold">{currentSection}</span>
                    </span>
                    <span>
                      Question {activeQuestions.length > 0 ? sandboxIdx + 1 : 0} of {activeQuestions.length}
                    </span>
                  </div>

                  {activeQuestions.length > 0 ? (
                    <div className="space-y-5">
                      <div className="flex flex-wrap gap-2 items-center">
                        {/* Concept Badges */}
                        {activeQuestions[sandboxIdx].tag && (
                          <span className="px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400 border border-orange-200/40">
                            Type: {activeQuestions[sandboxIdx].tag}
                          </span>
                        )}
                        <span className="px-2.5 py-0.5 rounded text-[9px] font-black bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200/40">
                          Jumbled Question
                        </span>
                      </div>

                      <p className="font-extrabold text-sm sm:text-base text-gray-950 dark:text-white leading-relaxed whitespace-pre-line">
                        {activeQuestions[sandboxIdx].question}
                      </p>

                      {/* Question Options */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {activeQuestions[sandboxIdx].options.map((opt) => {
                          const isSelected = selectedAnswer === opt;
                          const isCorrect = opt === activeQuestions[sandboxIdx].correct;
                          return (
                            <button
                              key={opt}
                              onClick={() => handleSelectAnswer(opt)}
                              disabled={showSandboxFeedback}
                              className={`p-4 rounded-xl text-left text-xs font-bold transition-all flex items-center justify-between border ${
                                showSandboxFeedback
                                  ? isCorrect
                                    ? "bg-green-500/15 border-green-500 text-green-700 dark:text-green-400"
                                    : isSelected
                                      ? "bg-red-500/15 border-red-500 text-red-700 dark:text-red-400"
                                      : "bg-white dark:bg-slate-900 border-gray-150/40 dark:border-slate-800 text-gray-400"
                                  : isSelected
                                    ? "bg-[#0047AB] text-white border-blue-600 shadow-md shadow-blue-500/10"
                                    : "bg-white dark:bg-slate-900 border-gray-150/40 dark:border-slate-800 text-gray-700 dark:text-slate-350 hover:bg-gray-100 dark:hover:bg-slate-850"
                              }`}
                            >
                              <span className="capitalize">{opt}</span>
                              {showSandboxFeedback && isCorrect && (
                                <span className="text-[9.5px] uppercase tracking-wider font-extrabold bg-green-500 text-white px-2 py-0.5 rounded">Correct</span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="py-12 text-center space-y-2">
                      <p className="text-gray-500 dark:text-gray-400 font-extrabold text-sm">No questions match the current filter criteria.</p>
                      <button
                        onClick={() => setReadingFilter("all")}
                        className="text-xs font-black text-[#0047AB] hover:underline"
                      >
                        Reset Filter to All
                      </button>
                    </div>
                  )}

                  {/* Sandbox Answer feedbacks */}
                  {showSandboxFeedback && activeQuestions.length > 0 && (
                    <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-gray-100 dark:border-slate-800 space-y-2 text-xs leading-relaxed transition-all">
                      <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-extrabold">
                        <BookOpen className="h-4 w-4" />
                        <span>Academic Concept Explanation</span>
                      </div>
                      <p className="text-gray-500 dark:text-slate-350 font-semibold">{activeQuestions[sandboxIdx].explanations}</p>
                      <p className="text-[10.5px] text-gray-400 dark:text-slate-500 font-medium italic">Hint parameter: {activeQuestions[sandboxIdx].hint}</p>
                    </div>
                  )}

                  {/* Sandbox CTA Buttons */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-gray-150/40 dark:border-slate-850">
                    <div className="flex items-center gap-4 text-[10px] text-gray-400 font-semibold justify-between sm:justify-start">
                      <div>
                        Session Score: <span className="font-extrabold text-[#0047AB] dark:text-blue-400">{sandboxScore}</span> correct
                      </div>
                      <button 
                        onClick={handleShuffleSandbox}
                        title="Reshuffles the question pool randomly to get a completely new order"
                        className="text-orange-500 font-black hover:text-orange-600 flex items-center gap-1 cursor-pointer pointer-events-auto"
                      >
                        <RefreshCw className="h-3 w-3 shrink-0" />
                        <span>Re-jumble Pool 🔄</span>
                      </button>
                    </div>

                    <div className="flex justify-end gap-2">
                      {!showSandboxFeedback ? (
                        <button
                          onClick={handleSandboxSubmit}
                          disabled={!selectedAnswer || activeQuestions.length === 0}
                          className={`px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all w-full sm:w-auto ${
                            selectedAnswer && activeQuestions.length > 0
                              ? "bg-orange-500 hover:bg-orange-600 text-white cursor-pointer pointer-events-auto" 
                              : "bg-gray-200 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          Check My Answer
                        </button>
                      ) : (
                        <button
                          onClick={handleSandboxNext}
                          className="bg-[#0047AB] hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md cursor-pointer pointer-events-auto transition-colors w-full sm:w-auto"
                        >
                          {sandboxIdx < activeQuestions.length - 1 ? "Next Diagnostic Question" : "Restart & Re-jumble Pack"}
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* STATE 2: LEAD CAPTURE GATING */}
              {isLeadGateActive && !isReportActive && (
                <div className="space-y-6">
                  <div className="text-center space-y-2 max-w-2xl mx-auto py-2">
                    <span className="px-2.5 py-1 bg-orange-100 text-orange-600 font-black text-[9px] uppercase tracking-wider rounded-md inline-block">
                      🏁 diagnostic evaluations completed!
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-gray-950 dark:text-white">
                      Check Your Study Abroad Performance Scorecard!
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-slate-400 font-semibold leading-relaxed">
                      We require valid candidate verification details before computing dynamic correct vs. wrong answers, grading success ratios, and generating official class suggestions.
                    </p>
                  </div>

                  <form onSubmit={handleLeadSubmit} className="space-y-4 max-w-md mx-auto">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-400 block tracking-widest">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        placeholder="Enter your name (e.g. Rahul Sharma)..."
                        className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl px-4 py-3 text-xs font-bold focus:ring-2 focus:ring-[#0047AB] outline-none text-gray-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-400 block tracking-widest">
                        Contact / Whatsapp No. *
                      </label>
                      <input
                        type="tel"
                        required
                        value={leadPhone}
                        onChange={(e) => setLeadPhone(e.target.value)}
                        placeholder="Enter 10-digit mobile number..."
                        className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl px-4 py-3 text-xs font-bold focus:ring-2 focus:ring-[#0047AB] outline-none text-gray-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-400 block tracking-widest">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        placeholder="Enter active student email address..."
                        className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl px-4 py-3 text-xs font-bold focus:ring-2 focus:ring-[#0047AB] outline-none text-gray-900 dark:text-white"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black text-xs py-3.5 rounded-xl shadow-md cursor-pointer transition-colors flex items-center justify-center gap-2"
                      >
                        Generate Official Grade Sheet &amp; Unlock Flight Plan <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>

                    <p className="text-[9.5px] italic text-gray-400 font-semibold text-center">
                      🔒 Secured via verified student counselling protocols. No spam guaranteed.
                    </p>
                  </form>
                </div>
              )}

              {/* STATE 3: DETAILED MERIT/GRADE REPORT SHIELD */}
              {isReportActive && (
                <div className="space-y-8 animate-fade-in">
                  
                  {/* Top Header Badge */}
                  <div className="text-center space-y-2">
                    <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-extrabold text-[10px] uppercase tracking-widest rounded-full border border-emerald-200/20 inline-flex items-center gap-1">
                      <Award className="h-3.5 w-3.5 text-emerald-500" /> academic merit performance score sheet
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white leading-tight">
                      Grade Report for <span className="text-[#0047AB] dark:text-blue-400">{leadName}</span>
                    </h3>
                    <p className="text-xs text-gray-400 font-semibold max-w-xl mx-auto">
                      Official Performance summary generated on {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.
                    </p>
                  </div>

                  {/* Scoring grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                    <div className="bg-green-500/10 px-6 py-5 rounded-2xl border border-green-500/20 text-center space-y-1">
                      <span className="text-[10.5px] font-black text-green-700 dark:text-green-400 uppercase tracking-widest">Correct Tries</span>
                      <p className="text-3xl font-black text-green-600">{sandboxScore}</p>
                    </div>
                    <div className="bg-red-500/10 px-6 py-5 rounded-2xl border border-red-500/20 text-center space-y-1">
                      <span className="text-[10.5px] font-black text-red-700 dark:text-red-400 uppercase tracking-widest">Incorrect Tries</span>
                      <p className="text-3xl font-black text-red-600">{answeredCount - sandboxScore}</p>
                    </div>
                    <div className="bg-blue-500/10 px-6 py-5 rounded-2xl border border-blue-500/20 text-center space-y-1">
                      <span className="text-[10.5px] font-black text-blue-700 dark:text-blue-400 uppercase tracking-widest">Accuracy Level</span>
                      <p className="text-3xl font-black text-blue-600">
                        {((sandboxScore / Math.max(1, answeredCount)) * 100).toFixed(0)}%
                      </p>
                    </div>
                  </div>

                  {/* Persuasive Pitch Offer (Professional English marketing impact) */}
                  <div className="bg-gradient-to-br from-[#0047AB]/5 to-orange-500/5 dark:from-slate-900 dark:to-slate-900 p-6 sm:p-8 rounded-[24px] border border-blue-100/50 dark:border-slate-800 space-y-5">
                    <div className="flex gap-3 items-start">
                      <div className="bg-orange-500 text-white rounded-xl p-2.5 shrink-0 animate-bounce">
                        <Sparkles className="h-5 w-5" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider">
                          Career Wings Education Experts Say: "We help you secure outstanding academic credentials!"
                        </h4>
                        
                        <div className="text-xs text-gray-600 dark:text-slate-350 font-semibold space-y-3 leading-relaxed">
                          <p>
                            Studying abroad and clearing high-stakes language tests require meticulous, systematic strategic planning rather than simple dictionary memorization. For any incorrect answers on this diagnosis, our training center offers active live troubleshooting and target tips.
                          </p>
                          <p className="font-extrabold text-gray-900 dark:text-white">
                            💡 We Provide You With Outstanding Training:
                          </p>
                          <ul className="list-disc pl-5 space-y-1 font-semibold text-gray-500 dark:text-slate-400">
                            <li>Live interactive classes driven by Cambridge/British Council certified professional mentors.</li>
                            <li>Weekly simulated computer-based mock exams (IELTS, PTE, TOEFL formats).</li>
                            <li>Comprehensive speaking and writing modules with real-time score tracking and feedback.</li>
                            <li>100% free premium Study Abroad counseling, university shortlists, and visa processing guidance.</li>
                          </ul>
                          <p>
                            Based on your strategic study analysis, start preparing for your dream international university with our certified industry experts. Submit the form below to reserve an exclusive mock slot or physical counseling seat today!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action/Registration footer */}
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-2">
                    <button
                      onClick={() => onBookCounselling(`Diagnostic test result summary - Correct: ${sandboxScore}, Wrong: ${answeredCount - sandboxScore}, Score: ${((sandboxScore / Math.max(1, answeredCount)) * 100).toFixed(0)}%. Email: ${leadEmail}, Phone: ${leadPhone}`)}
                      className="w-full sm:w-auto bg-[#0047AB] hover:bg-blue-700 text-white font-black text-xs px-6 py-3.5 rounded-xl shadow-md transition-colors cursor-pointer"
                    >
                      Book Free Physical Counselling &amp; Seat Enrolment Now
                    </button>
                    <button
                      onClick={handleRestartCompleteSession}
                      className="w-full sm:w-auto bg-gray-150 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-705 text-gray-700 dark:text-slate-200 font-extrabold text-xs px-6 py-3.5 rounded-xl transition-colors cursor-pointer"
                    >
                      Reset &amp; Retry Jumbled Pool
                    </button>
                  </div>

                </div>
              )}

            </div>
          </div>
        )}
          </div>
        </div>

      </div>
  );
}
