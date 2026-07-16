import React, { useState } from "react";
import { 
  ArrowLeft, 
  Award, 
  BookOpen, 
  Compass, 
  CheckCircle, 
  Sparkles, 
  Layers, 
  TrendingUp, 
  ChevronRight, 
  HelpCircle, 
  Clock, 
  Check, 
  FileText, 
  ShieldCheck, 
  Bookmark,
  Share2,
  ListOrdered
} from "lucide-react";

interface PrepExamSeoPageProps {
  examType: "ielts" | "pte" | "toefl" | "duolingo";
  onBack: () => void;
  onStartMockTest: (examType: string) => void;
  onBookCounselling: (details: string) => void;
}

export default function PrepExamSeoPage({
  examType,
  onBack,
  onStartMockTest,
  onBookCounselling
}: PrepExamSeoPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    targetScore: "",
    studyDestination: ""
  });
  const [submitted, setSubmitted] = useState(false);

  // High-value, search-oriented SEO copy for each exam style
  const seoData = {
    ielts: {
      title: "IELTS Preparation Masterclass",
      sub: "Achieve 8.0+ Bands with British Council & Cambridge Certified Mentors",
      tagline: "International English Language Testing System - Global Academic & General Guide",
      focusKeywords: ["IELTS Academic Mock Test", "IELTS Bands 8.0 Coaching", "Free IELTS Online Simulator"],
      bannerColor: "from-[#0047AB] via-indigo-900 to-[#041D44]",
      accentBg: "bg-blue-500/10 text-blue-500 dark:text-blue-400",
      accentBorder: "border-blue-500/20",
      stats: {
        scoring: "Band Scale 1.0 to 9.0",
        validity: "2 Years Validity",
        popularity: "Accepted by 12,500+ Global Universities",
        duration: "2 Hours & 45 Minutes Total"
      },
      overview: "The International English Language Testing System (IELTS) is the absolute benchmark of academic English proficiency. Our customized Career Wings training curriculum works systematically of boosting reading scan rates, essay cohesion metrics, and fluent dialog delivery rather than trivial dictionary memorization.",
      roadmap: [
        { title: "Diagnostic Benchmark", desc: "Take a real-time computerized mock-test here to establish your baseline Band score instantly." },
        { title: "Template Mastery", desc: "Learn structural essay templates for Task 1 (graphs/charts) & Task 2 (argumentative discussions)." },
        { title: "Live Feedback Loops", desc: "Undergo full standard speaking mock-tests with Cambridge-certified evaluators with detailed reports." },
        { title: "Weekly Full Lengths", desc: "Participate in simulated Saturday exam mockups with actual timing countdown controllers." }
      ],
      examSyllabus: [
        { section: "Listening Module", items: ["40 intensive questions", "10 sub-topics representing diverse national accents", "30-minute test limit"] },
        { section: "Reading Section", items: ["3 long academic passages", "Skimming and logical matching hacks", "60-minute timeline"] },
        { section: "Writing Portfolio", items: ["Task 1 description dynamics", "Task 2 formal cohesive essay", "60-minute duration"] },
        { section: "Speaking Evaluation", items: ["1-on-1 human proctoring", "Fluency & lexical resource training", "11 to 14 minute face-to-face draft"] }
      ],
      scoreGuide: [
        { score: "Band 8.5 - 9.0", outcome: "Expert User", level: "Highly recommended for Ivies & high-ranked PhD fellowships." },
        { score: "Band 7.0 - 8.0", outcome: "Very Good User", level: "Standard entry threshold for premium Masters courses globally." },
        { score: "Band 6.0 - 6.5", outcome: "Competent User", level: "Minimum qualification for general SDS student visas and standard courses." },
        { score: "Below 6.0", outcome: "Modest User", level: "Pre-session English support required before main degree access." }
      ],
      hacks: [
        "Skimming over reading paragraphs before approaching questions is vital to save over 12 minutes.",
        "Always focus on 'Cohesion and Coherence' parameters in IELTS Writing—structure sentences symmetrically with transitions like However, Furthermore, Consequently.",
        "In IELTS Speaking, prioritize confidence and steady pace over mimicking forced foreign accents."
      ],
      faqs: [
        { q: "Is IELTS Academic or General matching my profile?", a: "For degree applications, you must choose IELTS Academic. If you are pursuing permanent settlement or working visas, IELTS General is the correct choice." },
        { q: "How many times can I attempt the IELTS test?", a: "There are no limits on exam retakes. However, with our fast-track coaching program, over 93% of student candidates cross their target band on their first try!" },
        { q: "Does computer-based IELTS differ in difficulty from paper-based?", a: "No, the difficulty level and questions are identical. The computer-based test delivers scores inside of 3 to 5 business days, compared to 13 days for paper." }
      ]
    },
    pte: {
      title: "PTE Academic Coaching Excellence",
      sub: "Score 79+ Competency Points with AI-Aligned Training Programs",
      tagline: "Pearson Test of English Academic - Fully Computerized Smart Scoring Assessment",
      focusKeywords: ["PTE Academic AI Mock Test", "PTE Core 79 Coaching", "Free PTE Online Simulator"],
      bannerColor: "from-emerald-900 via-teal-950 to-slate-950",
      accentBg: "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400",
      accentBorder: "border-emerald-500/20",
      stats: {
        scoring: "Global Scale 10 to 90 Points",
        validity: "2 Years Validity",
        popularity: "Elite choice for UK, Australia & Canada SDS routes",
        duration: "2 Hours Total Computerized Exam"
      },
      overview: "Pearson Test of English (PTE Academic) relies heavily on sophisticated natural language processing and voice analysis AI algorithms. Our Career Wings training center focuses specifically on machine-aligned tips: speaking voice frequency optimizations, prompt integration, and automated punctuation strategies.",
      roadmap: [
        { title: "Voice Frequency Setup", desc: "Evaluate your speaking frequency to ensure the PTE machine-matching engine registers every syllable cleanly." },
        { title: "Read-Aloud Phrasing", desc: "Master pitch intonations and continuous breathing cycles to score 90/90 on Oral Fluency." },
        { title: "Describe Image Formats", desc: "Learn visual keywords lists to fill the automated computer analysis buffer without pauses." },
        { title: "Mock Software Simulator", desc: "Train on computerized software that matches actual Pearson layouts and strict countdowns." }
      ],
      examSyllabus: [
        { section: "Speaking & Writing", items: ["Read Aloud & Repeat Sentence loops", "Describe Image & Retell Lecture metrics", "Summarize Written Text (Single Sentence write)", "200-word computerized Essay (20 mins)"] },
        { section: "Reading Test", items: ["PTE Fill in the Blanks (Reading & Writing matrix)", "Multiple Choice (Multiple checkbox targets)", "Re-order Paragraphs logical drag-n-drop"] },
        { section: "Listening Mastery", items: ["Summarize Spoken Text (Short paragraph dictation)", "Fill in the Blanks spoken tracks", "Write from Dictation (Highest scoring weight)"] }
      ],
      scoreGuide: [
        { score: "79 - 90 Points", outcome: "Superior English", level: "Permits maximum immigration points under AU/NZ point score systems." },
        { score: "65 - 78 Points", outcome: "Proficient English", level: "Highly competitive target for Masters & top tier Global business colleges." },
        { score: "50 - 64 Points", outcome: "Competent English", level: "Fits SDS requirements for Canadian bachelors programs." },
        { score: "Below 50", outcome: "Developing User", level: "Intensive 4-week foundation courses recommended to restore baseline grammar." }
      ],
      hacks: [
        "In 'Write from Dictation', spelling is paramount. One wrong spelling ruins the entire sentence score. Keep keywords exact.",
        "In 'Repeat Sentence', maintain a smooth flow. Even if you miss three words, keep talking without any self-correction or stutter.",
        "Use preset CWC structural templates for Describe Image to guarantee perfect pronunciation and oral fluency points."
      ],
      faqs: [
        { q: "How fast do I get my PTE exam results?", a: "PTE uses fully computerized machine evaluation. Most candidates receive their secure scoring reports in under 24 to 48 hours." },
        { q: "Is PTE accepted for Canadian SDS Student Visa?", a: "Yes! Canada IRCC fully recognizes PTE Academic for SDS streams, making it a stellar option for prompt approvals." },
        { q: "What is the key to perfect scores in PTE Speaking?", a: "Oral fluency is critical. Do not pause for more than 3 seconds or the system microphone auto-closes." }
      ]
    },
    toefl: {
      title: "TOEFL iBT Strategy Accelerator",
      sub: "Target 110+ on the TOEFL iBT Exam with Custom Prep Blueprints",
      tagline: "Test of English as a Foreign Language - Premier U.S. and Canadian Admissions Pathway",
      focusKeywords: ["TOEFL iBT Academic Mock Test", "TOEFL 110 Coaching", "Free TOEFL Online Practice Session"],
      bannerColor: "from-purple-900 via-violet-950 to-slate-950",
      accentBg: "bg-purple-500/10 text-purple-500 dark:text-purple-400",
      accentBorder: "border-purple-500/20",
      stats: {
        scoring: "Overall Range 0 to 120 Points",
        validity: "2 Years Validity",
        popularity: "Gold standard for 13,000+ US & Global Schools",
        duration: "Just Under 2 Hours (New Shortened Format)"
      },
      overview: "The TOEFL iBT is the world's premier academic English test, accepted by 100% of US universities and major academic institutions in the UK, Canada, and Australia. Our professional preparation course bridges academic analysis with strategic timing, so you can breeze through academic lectures with exceptional speed.",
      roadmap: [
        { title: "Vocabulary Matrix", desc: "Build advanced vocabulary vectors tailored to university lecture setups and standard essay models." },
        { title: "Note-Taking Strategy", desc: "Master high-speed shorthand templates to extract audio key details without losing listening concentration." },
        { title: "Integrated Speaking Master", desc: "Perfect the synthesis of written articles and spoken auditory segments in a synchronized review." },
        { title: "Timing Optimizations", desc: "Learn to handle reading timers with mock testing simulations tailored to new shortened configurations." }
      ],
      examSyllabus: [
        { section: "Reading Segment", items: ["2 Academic passages", "10 questions per text", "35-minute duration to analyze"] },
        { section: "Listening Module", items: ["3-4 Academic Lectures with tasks", "2-3 casual conversational scenarios", "36-minute audio response timeline"] },
        { section: "Speaking Evaluation", items: ["1 Independent prompt", "3 Integrated reading/listening tasks", "16-minute voice responses"] },
        { section: "Writing Portfolio", items: ["Integrated Reading-Listening synthesis", "New Academic Discussion writing prompt", "29-minute total limit"] }
      ],
      scoreGuide: [
        { score: "110 - 120 Points", outcome: "Advanced/Elite", level: "Highly competitive for US Ivy League, top-10 MBAs, and Stanford/MIT admissions." },
        { score: "90 - 109 Points", outcome: "High Range", level: "Meets criteria for 95% of high-stakes graduate academic programs globally." },
        { score: "70 - 89 Points", outcome: "Intermediate", level: "Ideal for global undergraduate programs and community college intakes." },
        { score: "Below 70", outcome: "Basic Range", level: "Support and intensive coaching tutorials are highly encouraged." }
      ],
      hacks: [
        "In TOEFL Listening, write down verbs and key nouns only—do not try to write whole sentences during audio tracks.",
        "For TOEFL Independent Writing (Academic Discussion), clearly state your thesis in sentence one to gain top evaluation credits.",
        "Record your voice during preparation to check for repetitive filler words like 'um', 'uh', and 'basically'."
      ],
      faqs: [
        { q: "Is the TOEFL iBT exam fully computerized?", a: "Yes, TOEFL iBT is administered entirely on computers at official testing centers or as a closely proctored Home Edition." },
        { q: "How does the new shortened TOEFL iBT format help candidates?", a: "By replacing the long independent essay with 'Academic Discussion' and discarding experimental questions, TOEFL is now under 2 hours, minimizing mental fatigue!" },
        { q: "Do Ivy league universities favor TOEFL over other exams?", a: "TOEFL remains highly historic and thoroughly accepted in America, making it an extremely safe and prestigious choice for top-tier Ivy colleges." }
      ]
    },
    duolingo: {
      title: "Duolingo English Test (DET) Prep",
      sub: "Target 130+ Certified Score on the Adaptive Duolingo English Exam",
      tagline: "Duolingo English Test - Rapid, Computer-Adaptive Next-Gen Smart Assessment",
      focusKeywords: ["Duolingo DET Practice Exam", "Duolingo DET 135 Coaching", "Free Duolingo Online Simulator"],
      bannerColor: "from-amber-600 via-orange-950 to-slate-950",
      accentBg: "bg-amber-500/10 text-amber-500 dark:text-amber-400",
      accentBorder: "border-amber-500/20",
      stats: {
        scoring: "Adaptive Scale 10 to 160 Points",
        validity: "2 Years Validity",
        popularity: "Fastest growing online test recognized by 4,500+ colleges",
        duration: "60 Minutes Total Adaptive Assessment"
      },
      overview: "The Duolingo English Test (DET) is a state-of-the-art computer-adaptive English exam that adapts its question difficulty in real-time based on your previous answers. Scoring is heavily driven by vocabulary size, prompt speed, and contextual syntax structures, making expert coaching essential to navigate.",
      roadmap: [
        { title: "Adaptive Difficulty Tuning", desc: "Understand how the adaptive engine works to maintain high difficulty parameters and maximize final ratings." },
        { title: "Interactive Writing Speed", desc: "Build typing speeds to output 100+ high-cohesion words inside strict 5-minute segments." },
        { title: "Real vs. Fake Word ID", desc: "Train your visual scanning capability to instantly isolate mock vocabulary words from actual linguistic terms." },
        { title: "Complete System Walkthrough", desc: "Analyze secure browser requirements, room setups, and proctoring parameters to avoid test cancellation." }
      ],
      examSyllabus: [
        { section: "Core Competencies", items: ["Literacy (Reading and writing capacity)", "Comprehension (Reading and listening ability)", "Conversation (Speaking and listening speed)", "Production (Speaking and writing expression)"] },
        { section: "Question Tasks", items: ["Read and Select real English words", "Complete interactive gaps in written texts", "Dictation transcription under timers", "Describe visual image with micro-scripts"] },
        { section: "Admissions Portfolio", items: ["Interactive Reading comprehension blocks", "Spelled-out writing and speech prompt arrays", "Formal video statement interview (ungraded but shared)"] }
      ],
      scoreGuide: [
        { score: "130 - 160 Points", outcome: "Expert Fluency", level: "Outstanding. Excels in complex professional and academic situations." },
        { score: "110 - 125 Points", outcome: "Upper-Intermediate", level: "Meets admissions criteria for most prestigious undergraduate and graduate degrees." },
        { score: "90 - 105 Points", outcome: "Intermediate", level: "Good for basic visa standards and specific community college streams." },
        { score: "Below 90", outcome: "Elementary", level: "Strongly suggest a comprehensive 4-week language upgrade program with CWC experts." }
      ],
      hacks: [
        "Write as much as possible for production prompts! The Duolingo scoring AI penalizes short answers. Try to fill the text box.",
        "In 'C-Test' (fill-in-the-gaps), read the entire sentence before filling words to grab morphological contextual hints.",
        "Keep your eyes fixed strictly on the computer screen. Moving your chin or looking away causes instant test submission violations."
      ],
      faqs: [
        { q: "Can I take the Duolingo English Test from my home?", a: "Yes, DET is taken entirely from your home computer in an online, proctored environment, requiring a stable webcam and secure browser." },
        { q: "How cheap is the Duolingo English Test compared to IELTS?", a: "DET is incredibly cost-efficient, charging just $59 USD per attempt and offering official results within 48 hours." },
        { q: "Is Duolingo accepted by universities in Canada and the USA?", a: "Absolutely! Over 4,500 institutions, including elite universities like Columbia, Yale, and McGill, accept DET scores for international student entries." }
      ]
    }
  };

  const activeSeo = seoData[examType] || seoData.ielts;

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) return;
    setSubmitted(true);
    onBookCounselling(
      `SEO Inquiry [${examType.toUpperCase()}] Profile Details: ` +
      `Name: ${formData.name}, Tel: ${formData.phone}, Email: ${formData.email}, ` +
      `Target Score: ${formData.targetScore}, Target Destination: ${formData.studyDestination}, Preferred Date: ${formData.preferredDate}`
    );
  };

  return (
    <div className="bg-[#FCFAF7] dark:bg-slate-950 min-h-screen text-gray-800 dark:text-slate-100 transition-all font-sans">
      
      {/* 1. STICKY ACTION HEADER & SEO BACK NAVIGATION */}
      <div className="bg-slate-50 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 py-3 sticky top-16 z-40 shadow-sm transition-colors">
        <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-xs sm:text-sm font-black text-[#0047AB] dark:text-blue-400 hover:scale-105 active:scale-95 transition-all outline-none"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Main Page</span>
          </button>
          
          <button
            onClick={() => onStartMockTest(examType)}
            className="bg-orange-500 hover:bg-orange-600 text-white font-black text-xs px-5 py-2 rounded-xl shadow-lg transition-all animate-pulse pointer-events-auto cursor-pointer"
          >
            Launch Free Mock Test Simulator ⚡
          </button>
        </div>
      </div>

      {/* 2. PREMIUM BRANDED SEO HERO ACCELERATOR BANNER */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${activeSeo.bannerColor} text-white py-16 sm:py-24`}>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 left-10 w-96 h-96 bg-orange-500/10 rounded-full blur-2xl"></div>

        <div className="container mx-auto px-4 max-w-7xl text-center space-y-6 relative z-10">
          <span className="bg-white/10 backdrop-blur-md text-amber-300 border border-white/15 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest inline-flex items-center gap-1.5 mx-auto">
            <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-spin" />
            Expert SEO Verified Syllabus
          </span>

          <h1 className="text-3xl sm:text-6xl font-black tracking-tight leading-tight max-w-5xl mx-auto">
            {activeSeo.title}
          </h1>

          <p className="text-gray-200 text-sm sm:text-xl font-medium max-w-3xl mx-auto">
            {activeSeo.sub}
          </p>

          <p className="text-gray-300 text-xs sm:text-sm italic opacity-90 max-w-2xl mx-auto font-mono">
            Focus: {activeSeo.tagline}
          </p>

          <div className="flex flex-wrap justify-center gap-2 pt-3">
            {activeSeo.focusKeywords.map((kw, i) => (
              <span key={i} className="bg-black/30 backdrop-blur-xs text-orange-300 text-[10.5px] font-bold px-3 py-1 rounded-md border border-white/5 uppercase">
                #{kw}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6 max-w-md mx-auto">
            <button
              onClick={() => onStartMockTest(examType)}
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-gray-950 font-black text-xs px-8 py-4 rounded-xl shadow-xl transition-all cursor-pointer transform hover:scale-[1.02]"
            >
              Start Free {examType.toUpperCase()} Mock Test Now
            </button>
            <a
              href="#registration-form"
              className="w-full sm:w-auto text-center border border-white/40 hover:bg-white/10 text-white font-bold text-xs px-6 py-4 rounded-xl transition-all"
            >
              Consult an Authority Expert
            </a>
          </div>
        </div>
      </section>

      {/* 3. CORE HIGHLIGHT INDEX STATS (BENTO-GRID INSPIRED) */}
      <section className="container mx-auto px-4 max-w-7xl -mt-10 relative z-20">
        <div className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl transition-all grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-1 p-2">
            <div className={`p-2 w-fit rounded-lg ${activeSeo.accentBg} mb-2`}>
              <Award className="h-5 w-5" />
            </div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black">Official Scale</p>
            <h4 className="text-lg font-black text-gray-900 dark:text-white leading-tight">{activeSeo.stats.scoring}</h4>
          </div>

          <div className="space-y-1 p-2">
            <div className={`p-2 w-fit rounded-lg ${activeSeo.accentBg} mb-2`}>
              <Clock className="h-5 w-5" />
            </div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black">Standard Duration</p>
            <h4 className="text-lg font-black text-gray-900 dark:text-white leading-tight">{activeSeo.stats.duration}</h4>
          </div>

          <div className="space-y-1 p-2">
            <div className={`p-2 w-fit rounded-lg ${activeSeo.accentBg} mb-2`}>
              <Compass className="h-5 w-5" />
            </div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black">Admissions Focus</p>
            <h4 className="text-lg font-black text-gray-900 dark:text-white leading-tight">{activeSeo.stats.popularity}</h4>
          </div>

          <div className="space-y-1 p-2">
            <div className={`p-2 w-fit rounded-lg ${activeSeo.accentBg} mb-2`}>
              <ShieldCheck className="h-5 w-5" />
            </div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black">Certificate Validity</p>
            <h4 className="text-lg font-black text-gray-900 dark:text-white leading-tight">{activeSeo.stats.validity}</h4>
          </div>
        </div>
      </section>

      {/* 4. MAIN ARTICLE DUAL-COLUMN LAYOUT */}
      <main className="container mx-auto px-4 max-w-7xl py-12 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Dynamic SEO Content (8 Cols) */}
        <section className="lg:col-span-8 space-y-10 sm:space-y-14">
          
          {/* Subsection 1: Overview and Analysis */}
          <article className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1.5 h-7 bg-[#0047AB] rounded-full inline-block"></span>
              Comprehensive {examType.toUpperCase()} Overview
            </h2>
            <div className="bg-slate-50 dark:bg-slate-900 p-6 sm:p-8 rounded-[24px] border border-gray-150 dark:border-slate-800">
              <p className="text-gray-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-semibold">
                {activeSeo.overview}
              </p>
            </div>
          </article>

          {/* Subsection 2: Syllabi Section Breakdown */}
          <article className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-7 bg-amber-500 rounded-full inline-block"></span>
                Official Syllabus & Section Tasks
              </h2>
              <span className="text-[11px] font-mono font-bold text-gray-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded">
                Syllabus Version 2026.1
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {activeSeo.examSyllabus.map((mod, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900/50 border border-gray-150 dark:border-slate-850/80 p-6 rounded-2xl space-y-3 shadow-xs hover:border-blue-500/20 transition-all">
                  <h3 className="text-sm font-black text-gray-950 dark:text-white flex items-center gap-2">
                    <ListOrdered className="h-4.5 w-4.5 text-blue-500" /> {mod.section}
                  </h3>
                  <hr className="border-gray-100 dark:border-slate-800" />
                  <ul className="space-y-2">
                    {mod.items.map((it, i) => (
                      <li key={i} className="flex gap-2 items-start text-xs font-bold text-gray-500 dark:text-slate-400">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>

          {/* Subsection 3: Dynamic Strategy Hacks */}
          <article className="bg-[#0047AB]/5 dark:bg-slate-900 border border-blue-500/10 dark:border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6">
            <h3 className="text-lg sm:text-2xl font-black text-gray-950 dark:text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500 animate-bounce" />
              Expert Strategy Hacks for immediate Score Elevation
            </h3>
            <p className="text-xs text-gray-400 dark:text-slate-500 font-semibold leading-normal">
              Compiled by our standard Academic Quality Directors globally from actual exam evaluations:
            </p>

            <ul className="space-y-4">
              {activeSeo.hacks.map((hack, hIdx) => (
                <li key={hIdx} className="flex gap-3 items-start bg-white dark:bg-slate-950 p-4 rounded-xl border border-gray-150 dark:border-slate-850 shadow-xs">
                  <span className="bg-amber-100 dark:bg-amber-900/45 text-amber-700 dark:text-amber-400 w-6 h-6 rounded-md font-black text-xs flex items-center justify-center shrink-0">
                    {hIdx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-gray-650 dark:text-slate-300 font-semibold leading-relaxed">
                    {hack}
                  </p>
                </li>
              ))}
            </ul>
          </article>

          {/* Subsection 4: Score Mapping Outcome Reference */}
          <article className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1.5 h-7 bg-teal-500 rounded-full inline-block"></span>
              Score Map &amp; Global Benchmark Matching
            </h2>
            <div className="border border-gray-150 dark:border-slate-800/80 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs text-gray-650 dark:text-slate-200 border-collapse">
                <thead className="bg-gray-50 dark:bg-slate-900 text-[10.5px] uppercase font-black tracking-widest text-gray-400 border-b border-gray-150 dark:border-slate-800">
                  <tr>
                    <th className="p-4">Target Score</th>
                    <th className="p-4">Global Proficiency</th>
                    <th className="p-4">Admissions Applicability</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-slate-800 font-bold whitespace-normal">
                  {activeSeo.scoreGuide.map((g, gIdx) => (
                    <tr key={gIdx} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                      <td className="p-4 font-black text-[#0047AB] dark:text-blue-400 text-sm">{g.score}</td>
                      <td className="p-4 text-gray-900 dark:text-white font-extrabold">{g.outcome}</td>
                      <td className="p-4 text-gray-400 dark:text-slate-450 text-[11px] leading-relaxed font-semibold">{g.level}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          {/* Subsection 5: FAQ Accordions */}
          <article className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1.5 h-7 bg-purple-500 rounded-full inline-block"></span>
              Frequently Asked Questions (FAQs)
            </h2>
            <div className="space-y-4">
              {activeSeo.faqs.map((faq, fIdx) => (
                <div key={fIdx} className="border border-gray-150 dark:border-slate-850 rounded-2xl p-5 sm:p-6 space-y-2 hover:border-gray-300 dark:hover:border-slate-700 transition-colors bg-white dark:bg-slate-900/30">
                  <h4 className="font-extrabold text-[#0047AB] dark:text-blue-450 flex items-start gap-2 text-sm sm:text-base">
                    <HelpCircle className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                    <span>{faq.q}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-350 leading-relaxed font-semibold pl-7">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </article>

          {/* Unified CWC Expert Training Roadmap */}
          <article className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1.5 h-7 bg-emerald-500 rounded-full inline-block"></span>
              Your Structured 4-Phase Learning Curve
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {activeSeo.roadmap.map((rm, i) => (
                <div key={i} className="flex gap-4 items-start relative pb-2 group">
                  <div className="bg-[#0047AB] text-white rounded-xl w-10 h-10 flex items-center justify-center font-black text-sm shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-200">
                    {i + 1}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-black text-gray-950 dark:text-white text-base leading-tight">{rm.title}</h4>
                    <p className="text-xs text-gray-400 dark:text-slate-450 leading-normal font-semibold font-medium">{rm.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>

        </section>

        {/* Right Side: Sidebar Lead & Registration (4 Cols) */}
        <aside className="lg:col-span-4 space-y-6">
          
          {/* Main Booking Gateway Form Card */}
          <div id="registration-form" className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 shadow-xl relative overflow-hidden sticky top-36">
            {/* Ambient visual overlay */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl"></div>
            
            <div className="space-y-2 relative z-10">
              <span className="text-[10px] uppercase font-black text-orange-400 tracking-widest bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full inline-block">
                Free Academic Check slot
              </span>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
                Enroll or Book counseling
              </h3>
              <p className="text-gray-400 text-xs font-semibold leading-relaxed">
                Unlock specialized target booklets and custom study tracks inside standard SDS and high-stakes guidelines.
              </p>
            </div>

            {submitted ? (
              <div className="bg-emerald-950/40 border border-emerald-500/20 rounded-2xl p-6 text-center space-y-3 relative z-10 animate-fade-in text-white">
                <div className="p-3 bg-emerald-500 text-slate-900 rounded-full w-fit mx-auto animate-bounce mb-2">
                  <Check className="h-6 w-6 font-black" />
                </div>
                <h4 className="font-black text-base text-white">Application Reserved!</h4>
                <p className="text-xs text-gray-300 font-semibold leading-relaxed">
                  Our Career Wings Education Advisors will reach you shortly on WhatsApp or Email with physical slot confirmations.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 relative z-10 text-xs text-white">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black tracking-wider text-gray-400">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter your registered name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 font-medium font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black tracking-wider text-gray-400">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="name@university.com"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 font-medium font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black tracking-wider text-gray-400">Phone &amp; WhatsApp *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="e.g. +91 90001 19072"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 font-medium font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black tracking-wider text-gray-400">Target Score</label>
                    <input
                      type="text"
                      name="targetScore"
                      placeholder="e.g. 7.5 or 110"
                      value={formData.targetScore}
                      onChange={handleFormChange}
                      className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 font-medium font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black tracking-wider text-gray-400">Desired Country</label>
                    <select
                      name="studyDestination"
                      value={formData.studyDestination}
                      onChange={handleFormChange}
                      className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-2 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 font-bold"
                    >
                      <option value="">Choose...</option>
                      <option value="UK">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="USA">United States</option>
                      <option value="Australia">Australia</option>
                      <option value="Europe">Europe</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black tracking-wider text-gray-400">Preferred Mock Date</label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleFormChange}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 font-bold"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#155dfc] hover:bg-[#0f4ed4] text-white font-black py-4.5 rounded-xl transition-all cursor-pointer shadow-md shadow-blue-500/10 text-xs text-center flex items-center justify-center gap-1 mt-2.5 uppercase"
                >
                  Confirm Registered Slot
                </button>
              </form>
            )}

            <div className="pt-4 border-t border-slate-850 flex items-center justify-between text-[11px] text-gray-400 font-medium">
              <span className="flex items-center gap-1 font-bold">
                <ShieldCheck className="h-4.5 w-4.5 text-emerald-500 shrink-0" /> IRCC and IDP Compliant
              </span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Copied Page Link to Clipboard for sharing!");
                }}
                className="hover:text-white flex items-center gap-1.5 font-bold cursor-pointer"
              >
                <Share2 className="h-3.5 w-3.5" /> Share Page
              </button>
            </div>
          </div>

          {/* Quick Mock Access Accent Ad */}
          <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/15 p-6 rounded-3xl border border-orange-500/10 space-y-4">
            <div className="space-y-2">
              <h4 className="font-extrabold text-[#0047AB] dark:text-amber-400 text-sm flex items-center gap-1.5">
                <Sparkles className="h-4.5 w-4.5 text-orange-400 animate-spin" /> Free Computer-Based Practice Exam
              </h4>
              <p className="text-xs text-gray-550 dark:text-slate-350 leading-relaxed font-semibold">
                Our dynamic, randomized computer diagnostic arena challenges vocabulary, paragraph structures, spelling, and listening mechanics with real-time feedback loops.
              </p>
            </div>
            <button
              onClick={() => onStartMockTest(examType)}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              Start Free {examType.toUpperCase()} Mock Sandbox Now
              <ChevronRight className="h-4.5 w-4.5" />
            </button>
          </div>
        </aside>

      </main>

    </div>
  );
}
