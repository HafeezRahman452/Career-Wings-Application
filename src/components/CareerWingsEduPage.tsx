import React, { useState } from "react";
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  Sparkles, 
  ArrowRight, 
  Globe, 
  CheckCircle2, 
  Clock, 
  Compass, 
  FileText, 
  Users, 
  ShieldCheck, 
  PhoneCall, 
  Laptop, 
  Download, 
  Layers, 
  Star,
  Send,
  MessageSquare
} from "lucide-react";

interface CareerWingsEduPageProps {
  onBack: () => void;
  onBookCounselling: (details: string) => void;
}

export default function CareerWingsEduPage({ onBack, onBookCounselling }: CareerWingsEduPageProps) {
  const [selectedTrack, setSelectedTrack] = useState<string>("all");
  const [userSubmission, setUserSubmission] = useState({
    title: "",
    category: "General Overview",
    content: "",
    submitted: false
  });

  const eduTracks = [
    {
      id: "academic",
      title: "Academic Degree Pathways",
      badge: "Degree Foundation",
      icon: <GraduationCap className="h-6 w-6 text-blue-600" />,
      desc: "Direct admissions and credit transfer pathways for Bachelor's, Master's, and Doctorate programs across accredited global universities.",
      highlights: ["Direct University Partner Enrollment", "Credit Exemption & AP Assessments", "Full Visa & CAS/I-20 Processing"]
    },
    {
      id: "testprep",
      title: "Language & Test Prep Academy",
      badge: "Band 7.5+ Guaranteed",
      icon: <BookOpen className="h-6 w-6 text-emerald-600" />,
      desc: "State-of-the-art coaching wings for IELTS, PTE Academic, TOEFL iBT, Duolingo DET, and Spoken English fluency.",
      highlights: ["Official Pearson & Cambridge Materials", "1-on-1 AI-Powered Mock Exam Evaluations", "Evening & Weekend Flexible Batches"]
    },
    {
      id: "certifications",
      title: "Professional & Diplomas",
      badge: "Career Accelerators",
      icon: <Award className="h-6 w-6 text-purple-600" />,
      desc: "Post-graduate diplomas, vocational certificates, and STEM-designated conversion programs designed for immediate industry employment.",
      highlights: ["Global Industry Recognitions", "Internship & Co-op Placements", "Post-Study Work Visa Alignment"]
    },
    {
      id: "scholarships",
      title: "Merit Scholarships & Grants",
      badge: "Up to 100% Tuition Off",
      icon: <Sparkles className="h-6 w-6 text-amber-500" />,
      desc: "Comprehensive grant hunting service matching student profiles with institutional awards, government stipends, and research funding.",
      highlights: ["Dean's & Chancellor's Merit Grants", "Need-Based Financial Aid Mapping", "SOP & Scholarship Essay Refinement"]
    }
  ];

  const handleSendContent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userSubmission.content.trim()) return;
    setUserSubmission(prev => ({ ...prev, submitted: true }));
  };

  return (
    <div className="bg-[#FCFAF7] dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Top Meta Strip */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-950 text-white py-3.5 px-4 sm:px-8 md:px-12 text-xs font-mono border-b border-blue-900/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="bg-blue-500 text-white font-black text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
            Official Academy Hub
          </span>
          <span className="tracking-wide text-blue-200 hidden sm:inline">
            Career Wings Edu • Global Education &amp; Academic Training Division
          </span>
        </div>
        <button
          onClick={onBack}
          className="text-xs text-blue-300 hover:text-white underline cursor-pointer"
        >
          ← Back to Home
        </button>
      </div>

      {/* Main Hero Header */}
      <section className="relative overflow-hidden py-14 sm:py-20 bg-gradient-to-b from-blue-50/60 via-[#FCFAF7] to-white dark:from-slate-900/50 dark:via-slate-950 dark:to-slate-950 border-b border-gray-150 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 flex flex-col lg:flex-row items-center gap-12">
          
          <div className="flex-1 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-[#0047AB]/10 text-[#0047AB] dark:bg-blue-950/50 dark:text-blue-300 border border-[#0047AB]/20 px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-wider">
              <GraduationCap className="h-4 w-4 text-[#0047AB]" />
              <span>Career Wings Edu</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-emerald-700 dark:text-emerald-400 font-bold">New Dedicated Menu</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white leading-[1.15] tracking-tight">
              Welcome to <span className="bg-gradient-to-r from-[#0047AB] via-blue-600 to-indigo-600 bg-clip-text text-transparent">Career Wings Edu</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-350 leading-relaxed font-medium">
              Aapka dedicated educational wing jahan global degrees, certified language academies, professional credentials, aur comprehensive admission pathways ek jagah dastiyaab hain.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => onBookCounselling("Career Wings Edu: Admission Assessment & Academic Track Consultation")}
                className="bg-[#0047AB] hover:bg-blue-700 text-white font-black px-6 py-3.5 rounded-xl text-sm flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all cursor-pointer hover:-translate-y-0.5"
              >
                <span>Enroll in Career Wings Edu</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <a
                href="#content-section"
                className="bg-white dark:bg-slate-900 hover:bg-gray-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-gray-200 dark:border-slate-700 font-extrabold px-6 py-3.5 rounded-xl text-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                <FileText className="h-4 w-4 text-[#0047AB]" />
                <span>Submit Your Custom Content</span>
              </a>
            </div>
          </div>

          {/* Hero Feature Showcase Card */}
          <div className="w-full lg:w-[460px] bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative">
            <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[11px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow">
              Ready For Your Details
            </div>
            
            <h3 className="text-lg font-black text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              Edu Menu Ready
            </h3>
            
            <p className="text-xs text-gray-650 dark:text-slate-400 mb-5 leading-relaxed font-semibold">
              Yeh menu section specifically aapke content ke liye tayyar kiya gaya hai. Aap jo bhi courses, syllabus, institute details ya services provide karenge, wo foran yahan visually enhance hokar live ho jayengi.
            </p>

            <div className="space-y-3 pt-1 border-t border-gray-100 dark:border-slate-800">
              <div className="flex items-start gap-3 text-xs">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-slate-300 font-bold">Programs, Degrees &amp; Course Curriculums</span>
              </div>
              <div className="flex items-start gap-3 text-xs">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-slate-300 font-bold">IELTS / PTE / TOEFL Live Batches</span>
              </div>
              <div className="flex items-start gap-3 text-xs">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-slate-300 font-bold">Faculty Profiles &amp; Campus Information</span>
              </div>
              <div className="flex items-start gap-3 text-xs">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-slate-300 font-bold">Direct Student Registration Portal</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Track Explorer Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-8 md:px-12 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[#0047AB] dark:text-blue-400 font-black text-xs uppercase tracking-widest block">
            CORE DIVISIONS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-950 dark:text-white">
            Career Wings Edu Academic Wings
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 font-medium">
            Explore diverse educational offerings managed under Career Wings Edu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {eduTracks.map((track) => (
            <div 
              key={track.id}
              className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/50 rounded-2xl border border-blue-100 dark:border-blue-900/50">
                    {track.icon}
                  </div>
                  <span className="bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                    {track.badge}
                  </span>
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white">
                  {track.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-650 dark:text-slate-400 leading-relaxed font-semibold">
                  {track.desc}
                </p>

                <div className="space-y-2 pt-2">
                  {track.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-700 dark:text-slate-300 font-bold">
                      <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => onBookCounselling(`Career Wings Edu Inquiry for: ${track.title}`)}
                  className="text-xs font-black text-[#0047AB] dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Consult for {track.title} →
                </button>
                <span className="text-[11px] text-emerald-600 font-black">Admissions Open</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Content Submission / Live Input Section */}
      <section id="content-section" className="py-16 bg-white dark:bg-slate-900 border-t border-b border-gray-150 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-850 dark:to-slate-900 p-6 sm:p-8 rounded-3xl border border-blue-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <MessageSquare className="h-6 w-6 text-[#0047AB] dark:text-blue-400" />
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                Apna Content Yahan Send / Update Karein
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-700 dark:text-slate-300 leading-relaxed font-semibold">
              Aap chat mein apna content bhej sakte hain (maslan: Courses ki list, fees, institute details, vision, faculty, ya admission rules). Aap neeche live preview form mein bhi apna text enter karke test kar sakte hain!
            </p>
          </div>

          <form onSubmit={handleSendContent} className="space-y-5 bg-white dark:bg-slate-950 p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1">
                  Section Title / Heading
                </label>
                <input 
                  type="text"
                  placeholder="e.g. Diploma in Business & AI Management"
                  value={userSubmission.title}
                  onChange={(e) => setUserSubmission(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1">
                  Category
                </label>
                <select 
                  value={userSubmission.category}
                  onChange={(e) => setUserSubmission(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="General Overview">General Overview &amp; Mission</option>
                  <option value="Courses & Curriculums">Courses &amp; Curriculums</option>
                  <option value="Coaching & Test Prep">Coaching &amp; Test Prep</option>
                  <option value="Admissions & Eligibility">Admissions &amp; Eligibility</option>
                  <option value="Fee Structure & Grants">Fee Structure &amp; Grants</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1">
                Content / Details (Text, Bullets, Points)
              </label>
              <textarea
                rows={5}
                placeholder="Yahan apna text, courses ki details, fees, requirements ya jo bhi information Career Wings Edu ke liye dalni hai type karein..."
                value={userSubmission.content}
                onChange={(e) => setUserSubmission(prev => ({ ...prev, content: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <p className="text-xs text-gray-400 font-semibold">
                * Note: Aap seedha chat mein bhi apna text bhej sakte hain, hum code mein permanently insert kar denge.
              </p>
              <button
                type="submit"
                className="w-full sm:w-auto bg-[#0047AB] hover:bg-blue-700 text-white font-black px-6 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Preview My Content</span>
              </button>
            </div>
          </form>

          {/* Live Preview Card */}
          {userSubmission.submitted && userSubmission.content && (
            <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-3xl p-6 sm:p-8 space-y-3 animate-slide-up">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-xs font-black uppercase tracking-wider">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Live Content Preview ({userSubmission.category})</span>
              </div>
              <h4 className="text-xl font-black text-gray-900 dark:text-white">
                {userSubmission.title || "Career Wings Edu New Section"}
              </h4>
              <p className="text-sm text-gray-700 dark:text-slate-300 whitespace-pre-line leading-relaxed font-semibold">
                {userSubmission.content}
              </p>
              <div className="pt-2 text-xs text-emerald-800 dark:text-emerald-300 font-bold">
                ✓ Yeh content preview ho gaya hai. Isko permanent save karne ke liye chat mein confirm karein!
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#0047AB] to-blue-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <GraduationCap className="h-12 w-12 mx-auto text-amber-400" />
          <h2 className="text-3xl sm:text-4xl font-black">
            Enroll Today with Career Wings Edu
          </h2>
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
            Get personalized guidance for your academic path, English test scores, and global university admissions with our senior faculty.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={() => onBookCounselling("Direct Application for Career Wings Edu Admission Guidance")}
              className="bg-white text-[#0047AB] font-black px-8 py-3.5 rounded-xl shadow-lg hover:bg-gray-100 transition-all cursor-pointer text-sm"
            >
              Book Free Edu Consultation
            </button>
            <button
              onClick={onBack}
              className="bg-blue-800/80 hover:bg-blue-800 text-white font-bold px-6 py-3.5 rounded-xl border border-blue-700 text-sm cursor-pointer"
            >
              Explore Other Services
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
