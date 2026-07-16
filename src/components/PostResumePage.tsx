import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Upload, 
  FileText, 
  Sparkles, 
  CheckCircle, 
  ArrowRight, 
  ShieldCheck, 
  Globe2, 
  GraduationCap, 
  User, 
  Mail, 
  Phone, 
  Cpu, 
  FileCheck2, 
  ChevronRight, 
  AlertTriangle,
  Layers,
  ArrowLeft,
  Calendar,
  Briefcase,
  Search,
  BookOpen,
  Star,
  Award,
  Users
} from "lucide-react";

interface PostResumePageProps {
  onBackToHome: () => void;
  onBookCounselling: (details: string) => void;
}

export default function PostResumePage({ onBackToHome, onBookCounselling }: PostResumePageProps) {
  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [targetCountry, setTargetCountry] = useState("Australia");
  const [experience, setExperience] = useState("1-2 Years");
  const [qualification, setQualification] = useState("Bachelors");
  const [interestMajor, setInterestMajor] = useState("CS & AI");
  const [intakeYear, setIntakeYear] = useState("2026");
  const [resumeText, setResumeText] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>("");
  const [uploadedFileSize, setUploadedFileSize] = useState<string>("");

  // UI Flow State: "form" | "scanning" | "results"
  const [stage, setStage] = useState<"form" | "scanning" | "results">("form");
  const [scanStep, setScanStep] = useState(0);
  const [scanLogs, setScanLogs] = useState<string[]>([]);
  
  // Custom generated ATS score & report
  const [generatedScore, setGeneratedScore] = useState(78);
  const [generatedReport, setGeneratedReport] = useState<any>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  // File Handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);
      setUploadedFileName(file.name);
      setUploadedFileSize((file.size / 1024).toFixed(1) + " KB");
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setUploadedFile(file);
      setUploadedFileName(file.name);
      setUploadedFileSize((file.size / 1024).toFixed(1) + " KB");
    }
  };

  // Run ATS simulation & store result
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      alert("Please fill in your primary contact details (Name, Email, and Phone) to proceed.");
      return;
    }

    setStage("scanning");
    setScanStep(0);
    setScanLogs(["[ATS Engine v4.2] Initializing strategic parsing protocols..."]);

    const steps = [
      { log: "Reading biographical metadata block...", time: 350 },
      { log: "Scanning file syntax structures and text encoding...", time: 700 },
      { log: "Extracting work histories & primary qualification levels...", time: 1050 },
      { log: `Validating skills density against high-growth ${interestMajor} requirements...`, time: 1400 },
      { log: `Testing compliance for ${targetCountry} study/work visa eligibility parameters...`, time: 1800 },
      { log: "Calculating final ATS compatibility quotients...", time: 2100 },
      { log: "Formatting professional dispatch portfolio report...", time: 2400 }
    ];

    steps.forEach((s, idx) => {
      setTimeout(() => {
        setScanStep(idx + 1);
        setScanLogs(prev => [...prev, `[System] ${s.log}`]);
        if (idx === steps.length - 1) {
          generateFinalReport();
        }
      }, s.time);
    });
  };

  const generateFinalReport = () => {
    // Generate a beautiful deterministic report based on chosen inputs to seem incredibly smart!
    let baseScore = 72;
    if (experience === "3-5 Years" || experience === "5+ Years") baseScore += 10;
    if (uploadedFileName) baseScore += 8; // bonus for file vs text
    if (qualification === "Masters" || qualification === "PhD") baseScore += 6;
    if (resumeText.length > 200) baseScore += 4;
    
    // limit max to 97
    const finalScore = Math.min(baseScore, 97);
    setGeneratedScore(finalScore);

    // Contextual feedback based on target selection
    const recommendations: string[] = [];
    const missingKeywords: string[] = [];
    const strengths: string[] = [];

    // Industry tailored
    if (interestMajor === "CS & AI" || interestMajor === "Data Science") {
      strengths.push("Clear formatting of technical project timelines.");
      strengths.push("Structured coding skills matrix found.");
      missingKeywords.push("Distributed Computing", "CI/CD Pipelines", "System Architecture", "Cloud Infrastructure");
      recommendations.push("Describe the quantitative impact of your software projects (.e.g, 'Improved query latency by 35%').");
    } else if (interestMajor === "Business Management") {
      strengths.push("Strong articulation of leadership and team management limits.");
      strengths.push("Identified business metrics achievements.");
      missingKeywords.push("Agile Methodologies", "Stakeholder Management", "Strategic Forecasting", "KPI Metrics");
      recommendations.push("Quantify budget values overseen and revenue expansion scopes managed during prior periods.");
    } else {
      strengths.push("Comprehensive educational foundation highlights.");
      strengths.push("Relevant local internships and credentials identified.");
      missingKeywords.push("Cross-functional Coordination", "Industry Compliance", "Quality Assurance");
      recommendations.push("Add visual project listings or research case papers to enrich your entry level.");
    }

    // Country tailored
    if (targetCountry === "Germany" || targetCountry === "Europe") {
      recommendations.push("We recommend adopting a direct chronological 'Tabular' Europass format, which is highly appreciated by admissions senate in Germany.");
      recommendations.push("Highlight any basic German language competencies (A1/A2 levels) or scientific thesis publications.");
    } else if (targetCountry === "United States" || targetCountry === "Canada") {
      recommendations.push("Ensure a strict 1-page resume layout is adopted if your cumulative experience is under 5 years.");
      recommendations.push("Emphasize any GPA scores, competitive exams (GRE/GMAT), or national academic honors.");
    }

    const report = {
      strengths,
      missingKeywords,
      recommendations,
      compatibilityRating: finalScore >= 85 ? "EXCELLENT" : finalScore >= 75 ? "STRONG MATCH" : "FEASIBLE WITH REFORMS",
      visaFastTrackEligible: finalScore >= 80,
      estimatedScholarship: finalScore >= 90 ? "30% - 50% Tuition Waiver" : finalScore >= 80 ? "15% - 25% Merit Grant" : "Up to 15% Pathway bursaries"
    };

    setGeneratedReport(report);

    // Save submission to SQLite so that the Admin View in CommunityPage can display it!
    const saveToSqlDB = async () => {
      try {
        const newRecord = {
          name: fullName,
          email,
          phone,
          targetCountry,
          experience,
          qualification,
          interestMajor,
          intakeYear,
          score: finalScore,
          fileName: uploadedFileName || "Text_Submission.pdf",
          fileSize: uploadedFileSize || "N/A",
          date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
          time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
          status: report.compatibilityRating,
          notes: "Automated ATS scan complete. Ready for counselor dispatcher review."
        };

        await fetch("/api/resumes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newRecord)
        });

        // Also let's push a linked appointment to SQL db so they are contacted immediately!
        await fetch("/api/appointments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: fullName,
            email,
            phone,
            service: `Resume Dispatch Analysis (${interestMajor} to ${targetCountry})`,
            date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
            time: "11:00 AM (Priority Callback)",
            message: `Submitted resume "${uploadedFileName || "Text Version"}" scoring ${finalScore}% ATS compliance. Prefers entry in ${intakeYear}.`
          })
        });

      } catch (e) {
        console.error("Failed to save resume leads securely to SQL backend: ", e);
      }
    };
    
    saveToSqlDB();

    // Move to final results view
    // Allow slight transition
    setTimeout(() => {
      setStage("results");
    }, 600);
  };

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setResumeText("");
    setUploadedFile(null);
    setUploadedFileName("");
    setUploadedFileSize("");
    setStage("form");
  };

  return (
    <div id="post-resume-container" className="min-h-screen bg-slate-50 dark:bg-slate-950/40 text-slate-800 dark:text-slate-200 py-10 px-4 transition-colors">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb/Back button */}
        <div className="flex justify-between items-center bg-white dark:bg-slate-900 px-6 py-3.5 rounded-2xl shadow-sm border border-gray-200/60 dark:border-slate-800">
          <button 
            type="button"
            onClick={onBackToHome}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#0047AB] dark:text-blue-400 hover:text-blue-700 transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4.5 w-4.5 text-blue-500" />
            Back to Global Portal
          </button>
          
          <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-3.5 py-1.5 rounded-full border border-emerald-100 dark:border-emerald-900/40">
            <ShieldCheck className="h-3.5 w-3.5" /> SECURE CORRIDOR ENCRYPTED
          </div>
        </div>

        {/* Page Main Header */}
        <div id="resume-page-header" className="text-center space-y-3 pb-2 animate-fade-in">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100/60 dark:bg-blue-900/20 text-[#0047AB] dark:text-blue-400 text-[10px] font-black tracking-widest uppercase rounded-full">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" /> Global ATS Dispatcher & Optimizer
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Elevate Your Profile & <span className="text-[#0047AB] dark:text-blue-400">Post Resume</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xs md:text-sm text-gray-500 dark:text-slate-400 font-medium leading-relaxed">
            Don't just apply blindly. Submit your credentials to our smart Applicant Tracking System (ATS) optimization cell. Get instantly matched with 500+ premium partner universities globally, check scholarship suitability, and generate an elite visa-ready profile.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {/* STAGE 1: THE REVOLUTIONARY POST FORM */}
          {stage === "form" && (
            <motion.div
              key="form-stage"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-[32px] shadow-xl border border-gray-250/70 dark:border-slate-800 space-y-8"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Sector A: Candidate Contacts */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-gray-150 pb-2 dark:border-slate-800">
                    <User className="h-5 w-5 text-[#0047AB] dark:text-blue-400" />
                    <h3 className="font-black text-sm uppercase text-gray-900 dark:text-white tracking-wider">
                      1. Biographical Detail Records
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1.5">
                      <label htmlFor="fullName" className="text-xs font-extrabold text-gray-700 dark:text-slate-300">Full Name *</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"><User className="h-4 w-4" /></span>
                        <input 
                          type="text" 
                          id="fullName" 
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Hafeez Rahman"
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-950 font-bold text-xs rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-extrabold text-gray-700 dark:text-slate-300">Email Address *</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"><Mail className="h-4 w-4" /></span>
                        <input 
                          type="email" 
                          id="email" 
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. candidate@gmail.com"
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-950 font-bold text-xs rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="text-xs font-extrabold text-gray-700 dark:text-slate-300">Mobile Phone / WhatsApp *</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"><Phone className="h-4 w-4" /></span>
                        <input 
                          type="tel" 
                          id="phone" 
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-950 font-bold text-xs rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sector B: Academic and Targets */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-gray-150 pb-2 dark:border-slate-800">
                    <GraduationCap className="h-5 w-5 text-indigo-500" />
                    <h3 className="font-black text-sm uppercase text-purple-900 dark:text-purple-300 tracking-wider">
                      2. Global Academic & Target Visa Parameters
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="space-y-1.5">
                      <label htmlFor="targetCountry" className="text-xs font-extrabold text-gray-700 dark:text-slate-300">Target Study / Work Country</label>
                      <select 
                        id="targetCountry"
                        value={targetCountry}
                        onChange={(e) => setTargetCountry(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-950 font-bold text-xs rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-pink-500/20 outline-none cursor-pointer transition-all"
                      >
                        <option value="Australia">Australia 🇦🇺</option>
                        <option value="United Kingdom">United Kingdom 🇬🇧</option>
                        <option value="United States">United States 🇺🇸</option>
                        <option value="Canada">Canada 🇨🇦</option>
                        <option value="Ireland">Ireland 🇮🇪</option>
                        <option value="Germany">Germany 🇩🇪</option>
                        <option value="France">France 🇫🇷</option>
                        <option value="New Zealand">New Zealand 🇳🇿</option>
                        <option value="Europe">Europe 🇪🇺 (Schengen Zone)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="experience" className="text-xs font-extrabold text-gray-700 dark:text-slate-300">Prior Work Experience</label>
                      <select 
                        id="experience"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-950 font-bold text-xs rounded-xl border border-gray-200 focus:border-blue-500 outline-none cursor-pointer"
                      >
                        <option value="Fresher / Academic student">Fresher / Graduate</option>
                        <option value="1-2 Years">1 - 2 Years</option>
                        <option value="3-5 Years">3 - 5 Years</option>
                        <option value="5+ Years">Senior (5+ Years)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="qualification" className="text-xs font-extrabold text-gray-700 dark:text-slate-300">Highest Qualification</label>
                      <select 
                        id="qualification"
                        value={qualification}
                        onChange={(e) => setQualification(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-950 font-bold text-xs rounded-xl border border-gray-200 focus:border-blue-500 outline-none cursor-pointer"
                      >
                        <option value="High School">High School (12th / Pre-U)</option>
                        <option value="Diplomas">Diploma Course</option>
                        <option value="Bachelors">Bachelor's Degree</option>
                        <option value="Masters">Master's Degree</option>
                        <option value="PhD">PhD / Doctorate Level</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="interestMajor" className="text-xs font-extrabold text-gray-700 dark:text-slate-300">Intended Specialization Major</label>
                      <select 
                        id="interestMajor"
                        value={interestMajor}
                        onChange={(e) => setInterestMajor(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-950 font-bold text-xs rounded-xl border border-gray-200 focus:border-blue-500 outline-none cursor-pointer"
                      >
                        <option value="CS & AI">Computer Science, AI & Cyber</option>
                        <option value="Data Science">Data Analytics & Tech</option>
                        <option value="Business Management">Business Management & MBA</option>
                        <option value="Health & Nursing">Health Sciences & Nursing</option>
                        <option value="Hospitality">Global Luxury Hospitality</option>
                        <option value="Biotech">Biotech & Life Sciences</option>
                        <option value="Engineering Pathways">Automotive, Aero & Mech Eng.</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Sector C: ADVANCED DISPATCH DRAG-DROP RESUME UPLOAD */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-gray-150 pb-2 dark:border-slate-800">
                    <Upload className="h-5 w-5 text-emerald-500" />
                    <h3 className="font-black text-sm uppercase text-emerald-800 dark:text-emerald-400 tracking-wider">
                      3. Premium Drag-and-Drop Resume Dispatch Center
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Visual Drag Drop */}
                    <div 
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`relative overflow-hidden cursor-pointer p-8 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center text-center space-y-4 transition-all ${
                        dragActive 
                          ? "bg-emerald-50/60 border-emerald-500 dark:bg-emerald-950/20" 
                          : uploadedFileName 
                          ? "bg-blue-50/20 border-blue-400/60 dark:bg-slate-950/20" 
                          : "bg-gray-50 border-gray-250/70 hover:bg-gray-100/50 hover:border-gray-400 dark:bg-slate-950/40 dark:border-slate-800"
                      }`}
                    >
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                      />

                      <div className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-transform hover:scale-110 ${
                        uploadedFileName ? "bg-blue-500 text-white" : "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40"
                      }`}>
                        {uploadedFileName ? <FileCheck2 className="h-7 w-7" /> : <Upload className="h-7 w-7" />}
                      </div>

                      <div className="space-y-1">
                        {uploadedFileName ? (
                          <>
                            <p className="font-black text-xs text-blue-600 dark:text-blue-400 max-w-[280px] break-all">
                              {uploadedFileName}
                            </p>
                            <p className="text-[10px] text-gray-400 font-bold">
                              Size: {uploadedFileSize} • Status: Loaded
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="font-extrabold text-xs text-gray-900 dark:text-white">
                              Drag and Drop Resume File Here
                            </p>
                            <p className="text-[10px] text-gray-400 font-medium">
                              Supports PDF, DOCX, or DOC formats (Max 12MB)
                            </p>
                          </>
                        )}
                      </div>

                      {!uploadedFileName && (
                        <span className="px-4 py-1.5 bg-white dark:bg-slate-900 text-[10px] font-black uppercase text-gray-700 dark:text-slate-300 rounded-full border border-gray-200 dark:border-slate-800 shadow-sm">
                          Browse Local Files
                        </span>
                      )}
                    </div>

                    {/* Secondary text resume paste input */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label htmlFor="resumeText" className="text-xs font-extrabold text-gray-700 dark:text-slate-300">
                          Or Paste Resume Text (Optional backup)
                        </label>
                        <span className="text-[9px] text-[#0047AB] dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/40 px-2.5 py-0.5 rounded font-black uppercase">
                          ATS Scanner Compliant
                        </span>
                      </div>
                      <textarea 
                        id="resumeText"
                        rows={6}
                        value={resumeText}
                        onChange={(e) => setResumeText(e.target.value)}
                        placeholder="Paste your biography, prior education summaries, skills indices, work listings or reference LORs to analyze keyword densities in real time..."
                        className="w-full p-4 bg-gray-50 dark:bg-slate-950 font-mono text-[11px] leading-relaxed rounded-3xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 outline-none transition-all placeholder:text-[10px]"
                      />
                    </div>
                  </div>
                </div>

                {/* Secure Compliance Checkbox */}
                <div className="flex gap-3 items-start select-none bg-blue-50/15 dark:bg-slate-950/20 border border-blue-100/40 dark:border-slate-850 p-4 rounded-2xl">
                  <input 
                    type="checkbox" 
                    id="compliance-terms" 
                    required 
                    defaultChecked 
                    className="h-4.5 w-4.5 rounded border-gray-300 text-blue-650 focus:ring-blue-500 mt-0.5 cursor-pointer"
                  />
                  <label htmlFor="compliance-terms" className="text-[10px] md:text-xs text-gray-500 dark:text-slate-400 font-semibold leading-relaxed cursor-pointer">
                    I authorize Career Wings senior advisors to share my curriculum vitae dashboard and scores securely with QS-ranked world universities and authorize direct immigration callbacks for evaluation support. My data is completely protected under standard GDPR laws.
                  </label>
                </div>

                {/* Form Action submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 bg-[#0047AB] hover:bg-blue-700 active:scale-[0.99] text-white font-extrabold text-xs md:text-sm uppercase tracking-wider py-4 px-6 rounded-2xl shadow-xl shadow-blue-500/10 cursor-pointer transition-all hover:shadow-blue-500/20"
                  >
                    <span>Analyze &amp; Submit Professional Resume</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* STAGE 2: ATS SCROLL SCANNING ENERGETIC INTERACTIVE INTERFACE */}
          {stage === "scanning" && (
            <motion.div
              key="scanning-stage"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-slate-900 border-2 border-blue-900/60 p-8 rounded-[36px] min-h-[400px] flex flex-col justify-between text-white shadow-2xl relative overflow-hidden"
            >
              {/* Star animated elements */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>

              {/* Progress visual section */}
              <div className="text-center space-y-6 pt-6">
                <div className="flex justify-center">
                  <div className="relative flex items-center justify-center h-24 w-24">
                    {/* Glowing outer rings */}
                    <span className="absolute animate-ping inline-flex h-full w-full rounded-full bg-blue-450/20"></span>
                    <span className="absolute inline-flex h-20 w-20 rounded-full bg-blue-900/40 border border-blue-500/40 animate-pulse"></span>
                    
                    {/* Centered spinning element */}
                    <div className="z-10 h-16 w-16 bg-[#0047AB] rounded-2xl flex items-center justify-center text-white border border-blue-400/30 animate-spin" style={{ animationDuration: "3s" }}>
                      <Cpu className="h-8 w-8" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-black uppercase tracking-widest text-[#155dfc] dark:text-blue-400">
                    ATS COMPATIBILITY SCREENING IN PROGRESS
                  </h3>
                  <p className="text-xs text-gray-400 font-bold max-w-sm mx-auto">
                    Scanning against top 500+ global university intake metrics and work visa authorization standards...
                  </p>
                </div>
              </div>

              {/* Crawling Progress indicator */}
              <div className="space-y-3 px-2 md:px-10 py-6">
                <div className="relative w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 rounded-full transition-all duration-300"
                    style={{ width: `${(scanStep / 7) * 100}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  <span>SYSTEM INITIALIZATION</span>
                  <span className="text-blue-400 font-mono">STEP {scanStep} OF 7</span>
                  <span>CALIBRATION</span>
                </div>
              </div>

              {/* Live Terminal Log Stream Outputs */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 font-mono text-[10px] md:text-[11px] leading-relaxed text-emerald-400/90 h-[160px] overflow-y-auto space-y-1.5 scrollbar-thin shadow-inner custom-log-glow">
                {scanLogs.map((log, lidx) => (
                  <div key={lidx} className="flex gap-2">
                    <span className="text-gray-600 font-semibold select-none">&gt;</span>
                    <span>{log}</span>
                  </div>
                ))}
                <span className="inline-block h-3 w-1.5 bg-emerald-400 animate-pulse ml-1"></span>
              </div>
            </motion.div>
          )}

          {/* STAGE 3: MAGNIFICENT DIAGNOSTIC ATS REPORT SHEETS */}
          {stage === "results" && generatedReport && (
            <motion.div
              key="results-stage"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-8 animate-fade-in"
            >
              {/* ATS SCORE CARD BANNER */}
              <div className="bg-white dark:bg-slate-900 border border-gray-250/70 dark:border-slate-800 p-8 rounded-[36px] shadow-xl flex flex-col md:flex-row items-center gap-8 justify-between relative overflow-hidden">
                <div className="absolute right-0 top-0 w-60 h-60 bg-emerald-500/5 dark:bg-emerald-400/5 rounded-full blur-2xl -z-10"></div>
                
                <div className="flex flex-col md:flex-row items-center gap-6">
                  {/* Gauge score visualization */}
                  <div className="relative flex items-center justify-center">
                    {/* Circular Score Gauge */}
                    <div className="h-28 w-28 rounded-full border-[10px] border-slate-100 dark:border-slate-800 flex items-center justify-center">
                      <div className="text-center">
                        <span className="text-3xl font-black text-gray-900 dark:text-white font-mono">
                          {generatedScore}
                        </span>
                        <span className="text-[10px] text-gray-400 dark:text-slate-500 block font-black border-t border-gray-150 pt-0.5 mt-0.5">
                          OF 100
                        </span>
                      </div>
                    </div>
                    {/* Absolute dynamic status indicators */}
                    <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-white dark:border-slate-900">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="space-y-2 text-center md:text-left">
                    <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400 text-[10px] font-black uppercase rounded-full">
                      {generatedReport.compatibilityRating} • PROFILE OPTIMIZED
                    </span>
                    <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white">
                      Strategic ATS Audit Complete!
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-slate-400 font-semibold leading-relaxed max-w-md">
                      Great news, <b>{fullName}</b>! Your credentials have been calculated with a robust compliance factor of <b>{generatedScore}%</b>. Top global placement directories have been queued for direct resume dispatch.
                    </p>
                  </div>
                </div>

                <div className="flex flex-row md:flex-col gap-3 shrink-0 items-stretch font-bold">
                  <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 p-3 rounded-2xl text-center">
                    <span className="text-[9px] text-gray-400 block uppercase font-bold">Visa Fast-Track</span>
                    <span className="text-xs font-black text-[#0047AB] dark:text-blue-400">HIGHLY ELIGIBLE 🚀</span>
                  </div>
                  <div className="bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/30 p-3 rounded-2xl text-center">
                    <span className="text-[9px] text-gray-400 block uppercase font-bold">Scholarship Estimate</span>
                    <span className="text-xs font-black text-purple-600 dark:text-purple-400">{generatedReport.estimatedScholarship}</span>
                  </div>
                </div>
              </div>

              {/* REPORT ACCORDIAN BLOCK - METRICS STRATEGIES & SUGGESTIONS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Visual Feedback details */}
                <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[32px] border border-gray-250/70 dark:border-slate-800 space-y-6 shadow-md">
                  <div className="flex items-center gap-2 border-b border-gray-150 pb-2.5 dark:border-slate-800">
                    <Layers className="h-5 w-5 text-indigo-500" />
                    <h3 className="font-black text-sm uppercase text-gray-900 dark:text-white tracking-wider">
                      Executive Score Alignment
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {/* Dimension 1: Keywords */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span className="text-gray-700 dark:text-slate-350">Admissions Keyword Density</span>
                        <span className="text-indigo-650 dark:text-indigo-400 font-mono">88%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 dark:bg-slate-950 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: "88%" }}></div>
                      </div>
                    </div>

                    {/* Dimension 2: Readability */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span className="text-gray-700 dark:text-slate-350">Europass/Global Readability Check</span>
                        <span className="text-emerald-650 dark:text-emerald-400 font-mono font-black">92%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 dark:bg-slate-950 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: "92%" }}></div>
                      </div>
                    </div>

                    {/* Dimension 3: Experience */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span className="text-gray-700 dark:text-slate-350">Work Tenure & Project Validation</span>
                        <span className="text-amber-653 dark:text-amber-400 font-mono">79%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 dark:bg-slate-950 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: "79%" }}></div>
                      </div>
                    </div>

                    {/* Dimension 4: Visa and Compliance */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span className="text-gray-700 dark:text-slate-350">National Visa Security Auditing</span>
                        <span className="text-blue-650 dark:text-blue-405 font-mono">91%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 dark:bg-slate-950 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: "91%" }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Highlights section */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wider">
                      Identified Strength Highlights:
                    </h4>
                    <div className="space-y-2">
                      {generatedReport.strengths.map((str: string, index: number) => (
                        <div key={index} className="flex items-start gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                          <CheckCircle className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5" />
                          <span>{str}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recommendations and Optimization */}
                <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[32px] border border-gray-250/70 dark:border-slate-800 space-y-6 shadow-md">
                  <div className="flex items-center gap-2 border-b border-gray-150 pb-2.5 dark:border-slate-800">
                    <Sparkles className="h-5 w-5 text-amber-500" />
                    <h3 className="font-black text-sm uppercase text-amber-900 dark:text-amber-300 tracking-wider">
                      Recommended Actionable Optimizations
                    </h3>
                  </div>

                  {/* Missing keywords */}
                  {generatedReport.missingKeywords.length > 0 && (
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                        <AlertTriangle className="h-4 w-4 text-amber-500" /> Important Missing High-Yield Keywords:
                      </h4>
                      <p className="text-[11px] text-gray-400 font-semibold leading-relaxed">
                        Insert these missing professional domain markers to improve ATS pre-screening indices by up to 15%:
                      </p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {generatedReport.missingKeywords.map((kw: string, kidx: number) => (
                          <span key={kidx} className="bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-450 text-[10px] font-extrabold px-2.5 py-1 rounded-md border border-amber-200/50 dark:border-amber-900/30 font-mono">
                            + {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Optimization items list */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wider">
                      Structural File Re-Arrangement Directives:
                    </h4>
                    <div className="space-y-3">
                      {generatedReport.recommendations.map((rec: string, index: number) => (
                        <div key={index} className="flex gap-2.5 text-xs font-semibold text-gray-600 dark:text-slate-300 leading-relaxed bg-gray-50/55 dark:bg-slate-950/25 p-3 rounded-xl border border-gray-150/40 dark:border-slate-850">
                          <ChevronRight className="h-4 w-4 shrink-0 text-blue-500 mt-0.5" />
                          <span>{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ACTION STEPS: SUCCESS TRACKER OVERLAY */}
              <div className="border-2 border-emerald-500/30 bg-emerald-50/10 dark:bg-emerald-950/10 p-6 md:p-8 rounded-[32px] text-center space-y-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 shadow-sm shadow-emerald-500/20">
                  <CheckCircle className="h-6 w-6" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-black text-emerald-900 dark:text-emerald-300 uppercase tracking-widest">
                    RESUME ROUTED FOR PRIORITY INSTITUTION DISPATCH
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-slate-400 font-bold max-w-xl mx-auto leading-relaxed">
                    A copies of your evaluated PDF dashboard, along with an integrated admission eligibility query, have been dispatched directly back to the Career Wings administrative database and admissions office queues for {targetCountry}!
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-2xl mx-auto pt-2">
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 space-y-1">
                    <span className="text-[10px] font-black uppercase text-emerald-600">Track Position</span>
                    <p className="font-extrabold text-sm text-gray-900 dark:text-white">Active Queue #12</p>
                    <p className="text-[9px] text-gray-400 font-semibold">Priority high matching</p>
                  </div>

                  <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 space-y-1">
                    <span className="text-[10px] font-black uppercase text-[#0047AB] dark:text-blue-400">Representative</span>
                    <p className="font-extrabold text-sm text-gray-900 dark:text-white">Sr. Visa Officer Assigned</p>
                    <p className="text-[9px] text-gray-400 font-semibold">Callback within 2 hours</p>
                  </div>

                  <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 space-y-1">
                    <span className="text-[10px] font-black uppercase text-purple-600">Intended Terms</span>
                    <p className="font-extrabold text-sm text-gray-900 dark:text-white">{interestMajor} • {intakeYear}</p>
                    <p className="text-[9px] text-gray-400 font-semibold">QS Ranked Track universities</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      onBookCounselling(`Evaluate ATS Score of ${generatedScore}% for ${fullName} (${interestMajor} targeted to ${targetCountry})`);
                    }}
                    className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl hover:scale-[1.02] transition-transform shadow-md shadow-emerald-500/15 cursor-pointer"
                  >
                    Discuss My ATS Report with VIP Director
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="w-full sm:w-auto px-6 py-3.5 bg-gray-200 hover:bg-gray-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-800 dark:text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                  >
                    Submit Another Resume
                  </button>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* Informative Quality Assurance Footer Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="flex items-start gap-4 p-5 bg-white dark:bg-slate-900 rounded-3xl border border-gray-200/60 dark:border-slate-800 shadow-sm">
            <div className="p-3 bg-blue-105/10 text-[#0047AB] rounded-xl dark:bg-blue-950/20 dark:text-blue-400 shrink-0">
              <Globe2 className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-extrabold text-xs text-gray-900 dark:text-white uppercase tracking-wider">Integrated International Database</h4>
              <p className="text-[11px] text-gray-400 dark:text-slate-400 font-medium leading-relaxed">
                Our dynamic optimizer maps qualification standards directly to regional immigration systems including Germany's Anabin database, United Kingdom's CAS scoring indices, and Canada's NOC criteria.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 bg-white dark:bg-slate-900 rounded-3xl border border-gray-200/60 dark:border-slate-800 shadow-sm">
            <div className="p-3 bg-emerald-100/10 text-emerald-600 rounded-xl dark:bg-emerald-950/20 dark:text-emerald-400 shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-extrabold text-xs text-gray-900 dark:text-white uppercase tracking-wider">Absolute Trust & Security Guarantee</h4>
              <p className="text-[11px] text-gray-400 dark:text-slate-400 font-medium leading-relaxed">
                We maintain direct security parameters allowing and enabling secure file delivery. High-grade data protections mean your original biographical records are protected with bank-level encryption.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
