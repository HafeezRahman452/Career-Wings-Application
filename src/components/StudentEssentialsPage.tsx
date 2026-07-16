import React, { useState } from "react";
import { 
  Building, 
  Search, 
  Sparkles, 
  ArrowRight, 
  HelpCircle, 
  Calculator, 
  CheckSquare, 
  FileText, 
  Compass, 
  GraduationCap, 
  ShieldCheck, 
  Plane, 
  FileCheck, 
  DollarSign, 
  Percent,
  CheckCircle,
  Clock
} from "lucide-react";

interface StudentEssentialsPageProps {
  onBookCounselling: (details: string) => void;
  onCheckEligibility: () => void;
  onSelectUniversityFinder?: () => void;
}

export default function StudentEssentialsPage({
  onBookCounselling,
  onCheckEligibility,
  onSelectUniversityFinder
}: StudentEssentialsPageProps) {
  const [loanAmount, setLoanAmount] = useState<number>(30000); // in USD
  const [loanTenure, setLoanTenure] = useState<number>(5); // years
  const [activeAdmissionsStep, setActiveAdmissionsStep] = useState<number>(0);

  // Simple EMI estimation
  const interestRate = 0.0825; // 8.25% average global student loan interest rate
  const monthlyRate = interestRate / 12;
  const numberOfPayments = loanTenure * 12;
  const estimatedEMI = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
  );

  const admissionSteps = [
    {
      title: "1. Diagnostic Profile Assessment",
      desc: "Our senior advisors conduct a full academic score background check to target universities aligning with your exact budget and score threshold.",
      icon: <Compass className="h-6 w-6 text-blue-500" />,
      time: "Takes 1-2 Days"
    },
    {
      title: "2. SOP Draft & Essay Polishing",
      desc: "We review, polish, and optimize your Statement of Purpose (SOP) to ensure your unique talents and transcripts shine for high-acceptance results.",
      icon: <FileText className="h-6 w-6 text-purple-500" />,
      time: "Takes 3-5 Days"
    },
    {
      title: "3. Direct University Application Filing",
      desc: "We coordinate with partner register networks to file, submit fee waivers, compile recommendations, and manage active portal communications.",
      icon: <Building className="h-6 w-6 text-emerald-500" />,
      time: "Takes 1 Week"
    },
    {
      title: "4. Visa Interview & Biometrics Preparation",
      desc: "Review mock interview prompts mimics Actual Immigration Boards of Canada, USA, UK, and Australia to guarantee maximum visa approval ratings.",
      icon: <ShieldCheck className="h-6 w-6 text-orange-500" />,
      time: "Takes 3 Mock Loops"
    }
  ];

  const sopChecklist = [
    { item: "Strong Hook Opening", label: "Never start with 'My name is...' Begin with a high-impact story or life motivator." },
    { item: "Academic Cohesive Fit", label: "Verify each prior course aligns with the specific modules offered at the target college." },
    { item: "Concrete Career Goal", label: "Identify exactly where you intend to work (industry sectors, startup paths) post-graduation." },
    { item: "Why This University?", label: "Mention specific research labs, professors, or academic clubs that match your background." },
    { item: "Clarity on Gap Years", label: "If you have a gap, explain certifications, work profiles, or family priorities honestly." }
  ];

  return (
    <div className="bg-[#FCFAF7] dark:bg-slate-950 min-h-screen pb-24 transition-colors">
      
      {/* Banner Segment */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#061B3B] via-[#102A54] to-[#0A111F] text-white py-16 sm:py-24">
        {/* Abstract decorative grid */}
        <div className="absolute inset-x-0 bottom-0 top-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12),transparent_70%)]"></div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center space-y-6">
          <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold text-[11px] uppercase tracking-widest px-4.5 py-1.5 rounded-full inline-block shadow-lg shadow-orange-500/20 animate-pulse">
            CWC - Student Gateway Services
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight max-w-4xl mx-auto">
            Essential Services for Your <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-300 bg-clip-text text-transparent">Study Abroad Success</span>
          </h1>
          <p className="text-gray-300 text-sm sm:text-lg max-w-2xl mx-auto font-medium">
            Discover high-acceptance paperwork assistance, education loan matching tools, and mock visa interview prep under Guidance of Career Wings Consultants, the country's premium Study Abroad Consultants and Best Visa Agency.
          </p>
          <div className="pt-4 flex justify-center gap-3">
            <button
              onClick={() => onBookCounselling("Requested admission support consultation.")}
              className="bg-[#0047AB] hover:bg-blue-600 text-white font-black text-xs px-6 py-3.5 rounded-xl shadow-lg transition-all cursor-pointer"
            >
              Discuss My Application Prep
            </button>
            <button
              onClick={onCheckEligibility}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-black text-xs px-6 py-3.5 rounded-xl transition-all cursor-pointer"
            >
              Check Compatibility First
            </button>
          </div>
        </div>
      </section>

      {/* Main Core Elements Row */}
      <div className="container mx-auto px-4 max-w-7xl -mt-8 relative z-20 space-y-12">
        
        {/* University Finder Integration block */}
        <div className="bg-white border border-gray-150 dark:bg-slate-900/60 dark:border-slate-800 rounded-[30px] p-6 sm:p-8 transition-all hover:shadow-md relative overflow-hidden group shadow-sm">
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 dark:bg-orange-950/20 rounded-full -translate-y-24 translate-x-24 pointer-events-none blur-3xl"></div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
            <div className="md:col-span-8 space-y-3 text-left">
              <span className="bg-orange-500 text-white font-extrabold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full inline-block">
                Admissions utility
              </span>
              <h2 className="text-2xl sm:text-3.5xl font-black text-gray-955 dark:text-white leading-tight">
                Not sure where to apply? Use our University Finder!
              </h2>
              <p className="text-gray-500 dark:text-gray-300 text-xs sm:text-sm font-semibold leading-relaxed">
                Filter over 300+ accredited universities by budget limits, QS global rankings, intake months, and targeted study streams. Find the perfect institutional matches for your career in seconds.
              </p>
            </div>
            <div className="md:col-span-4 text-right flex justify-end">
              <button
                onClick={onSelectUniversityFinder}
                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-black text-xs px-6 py-3.5 rounded-xl shadow-md transition-all hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="h-4.5 w-4.5" />
                <span>Launch University Finder 🔥</span>
              </button>
            </div>
          </div>
        </div>

        {/* Row 1: Admissions Timeline and Progress Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Interactive Timeline Steps (8 cols) */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-[30px] border border-gray-100 dark:border-slate-800 p-6 sm:p-10 transition-colors space-y-8">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest font-extrabold text-[#0047AB] dark:text-blue-400">Stepwise Timeline Guidance</span>
              <h2 className="text-2xl sm:text-4.5xl font-black text-gray-950 dark:text-white leading-tight">Admissions &amp; Paperwork Workflow</h2>
              <p className="text-gray-400 dark:text-slate-400 text-xs sm:text-sm font-semibold">We manage all paperwork milestones from target matching to final visa interview clearance schedules.</p>
            </div>

            {/* Timeless timeline buttons */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-slate-50 dark:bg-slate-950 p-2 rounded-2xl border border-gray-150/40 dark:border-slate-850">
              {admissionSteps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveAdmissionsStep(idx)}
                  className={`p-3 rounded-xl font-bold text-xs transition-all pointer-events-auto cursor-pointer ${
                    activeAdmissionsStep === idx 
                      ? "bg-white dark:bg-slate-900 text-gray-900 dark:text-white shadow-sm border border-gray-150/60 dark:border-slate-800" 
                      : "text-gray-500 dark:text-slate-400 hover:text-gray-950"
                  }`}
                >
                  Step {idx + 1}
                </button>
              ))}
            </div>

            {/* Timeline Detail View */}
            <div className="bg-slate-50 dark:bg-slate-950 border border-gray-100 dark:border-slate-850 p-6 sm:p-8 rounded-2xl flex flex-col md:flex-row items-start gap-6 transition-all">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm shrink-0">
                {admissionSteps[activeAdmissionsStep].icon}
              </div>
              <div className="space-y-4 flex-grow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-lg font-black text-[#0047AB] dark:text-blue-400">{admissionSteps[activeAdmissionsStep].title}</h3>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 px-2.5 py-1 rounded-md border border-orange-100 dark:border-orange-950/50">
                    <Clock className="h-3 w-3" /> {admissionSteps[activeAdmissionsStep].time}
                  </span>
                </div>
                <p className="text-gray-500 dark:text-slate-350 text-xs sm:text-sm leading-relaxed font-semibold">
                  {admissionSteps[activeAdmissionsStep].desc}
                </p>
                <button
                  onClick={() => onBookCounselling(`Consultation slot requested on stage: ${admissionSteps[activeAdmissionsStep].title}`)}
                  className="bg-[#0047AB] hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm"
                >
                  Book My Advisor Slot For This <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right: Statement of Purpose Checklist Guidelines (4 cols) */}
          <div className="lg:col-span-4 bg-gradient-to-br from-[#0047AB] via-blue-900 to-slate-950 text-white rounded-[30px] p-6 sm:p-8 space-y-6 shadow-xl flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-widest font-black text-orange-400">SOP Polish Program</span>
              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">Professional Proof &amp; SOP Audit Checks</h3>
              <p className="text-gray-200 text-xs leading-relaxed font-semibold">Make sure to verify these critical standard operating procedure (SOP) parameters before submitting applications:</p>
            </div>

            <div className="space-y-3.5">
              {sopChecklist.map((check, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-orange-400 shrink-0" />
                    <p className="font-extrabold text-[11px] uppercase tracking-wider text-white">{check.item}</p>
                  </div>
                  <p className="text-[10.5px] text-gray-200 leading-normal pl-6 font-semibold">{check.label}</p>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={() => onBookCounselling("Request SOP review & outline auditing.")}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black text-xs py-3 rounded-xl shadow-lg transition-colors inline-block text-center pointer-events-auto cursor-pointer"
              >
                Send My SOP To Auditing
              </button>
            </div>
          </div>

        </div>

        {/* Row 2: Education Loans Support & Priority EMI Calculator */}
        <div className="bg-white dark:bg-slate-900 rounded-[30px] border border-gray-100 dark:border-slate-800 p-6 sm:p-10 transition-colors">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Descriptive texts & banks partnerships (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase tracking-widest font-extrabold text-[#0047AB] dark:text-blue-400">Student Living &amp; Finance</span>
              <h2 className="text-2.5xl sm:text-4.5xl font-black text-gray-950 dark:text-white leading-tight">Priority Education Loans Assistance</h2>
              <p className="text-gray-500 dark:text-slate-350 text-xs sm:text-sm font-semibold leading-relaxed">
                Paying for your tuition deposit or GIC certificate is stress-free. Career Wings is integrated directly with leading local and international banks to secure quick interest rates, expedited approval loops, and flexible processing.
              </p>

              {/* Banks List Logos */}
              <div className="space-y-3">
                <p className="text-[11px] text-gray-400 uppercase tracking-widest font-black">Official Financial Partners</p>
                <div className="grid grid-cols-3 gap-3">
                  {["Bank Al Habib", "Silk Bank", "Habib Bank", "MCB Bank", "Standard Chartered", "JS Bank"].map((bank, idx) => (
                    <div key={idx} className="bg-slate-50 dark:bg-slate-950 border border-gray-100 dark:border-slate-850 p-2.5 rounded-xl text-center">
                      <p className="text-[9px] font-black text-gray-650 dark:text-slate-400 tracking-tight leading-none">{bank}</p>
                      <p className="text-[8px] font-black text-emerald-600 mt-1 uppercase">Instant SLA</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Loan Calculator Interface (7 cols) */}
            <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-950 p-6 sm:p-8 rounded-[25px] border border-gray-150/40 dark:border-slate-850 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-950 dark:text-white pb-3 border-b border-gray-150/40 dark:border-slate-800">
                  <Calculator className="h-5 w-5 text-[#0047AB] dark:text-blue-400" />
                  <span className="font-extrabold text-sm sm:text-base">Interactive Loan EMI Estimator</span>
                </div>

                {/* Amount Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-gray-700 dark:text-slate-350">
                    <span>Desired Loan Amount</span>
                    <span className="text-[#0047AB] dark:text-blue-400 font-extrabold text-sm">${loanAmount.toLocaleString()} USD</span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="100000"
                    step="5000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-1.5 bg-gray-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#0047AB]"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400">
                    <span>$10,000 Min</span>
                    <span>$100,000 Max</span>
                  </div>
                </div>

                {/* Tenure Slider */}
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between items-center text-xs font-bold text-gray-700 dark:text-slate-350">
                    <span>Repayment tenure</span>
                    <span className="text-[#0047AB] dark:text-blue-400 font-extrabold text-sm">{loanTenure} Years</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="10"
                    step="1"
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    className="w-full h-1.5 bg-gray-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#0047AB]"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400">
                    <span>2 Yrs</span>
                    <span>10 Yrs</span>
                  </div>
                </div>
              </div>

              {/* Estimation Outcomes */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-gray-100 dark:border-slate-800 space-y-4 sm:flex sm:space-y-0 sm:items-center sm:justify-between items-stretch">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest font-black">Estimated Monthly EMI</span>
                  <p className="text-3xl font-black text-orange-500">${estimatedEMI}/mo</p>
                  <p className="text-[9.5px] text-gray-400 font-semibold mt-0.5">Calculated at competitive 8.25% average APR</p>
                </div>

                <div className="sm:border-l sm:border-gray-150/40 sm:dark:border-slate-800 sm:pl-6 space-y-2">
                  <div className="flex items-center gap-1.5 text-[10.5px] font-semibold text-gray-500">
                    <Percent className="h-3.5 w-3.5 text-blue-500" />
                    <span>0 Processing Fee Options</span>
                  </div>
                  <button
                    onClick={() => onBookCounselling(`Requested Loan assistance support. Funding target: $${loanAmount} USD, repayment: ${loanTenure} Yr tenure.`)}
                    className="w-full sm:w-auto bg-[#0047AB] hover:bg-blue-700 text-white text-xs font-black px-4 py-2.5 rounded-xl shadow-md cursor-pointer pointer-events-auto transition-all"
                  >
                    Apply Priority Loan Request
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
