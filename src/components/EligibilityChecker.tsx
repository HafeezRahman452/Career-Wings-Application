import React, { useState } from "react";
import { Check, ArrowRight, ShieldAlert, Sparkles, Award, Star, ListChecks, ArrowLeft, RefreshCw } from "lucide-react";

export default function EligibilityChecker({
  onBookCounselling,
  onCancel,
}: {
  onBookCounselling: (details: string) => void;
  onCancel: () => void;
}) {
  const [step, setStep] = useState(1);
  const [gpa, setGpa] = useState("3.5");
  const [gpaScale, setGpaScale] = useState("4.0");
  const [studyLevel, setStudyLevel] = useState("High School (12th Grade)");
  const [englishTest, setEnglishTest] = useState("IELTS");
  const [englishScore, setEnglishScore] = useState("6.5");
  const [budget, setBudget] = useState("15k30k");
  const [targetCountry, setTargetCountry] = useState("All");

  // Mandatory student lead verification info
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPhone, setStudentPhone] = useState("");

  const [hasChecked, setHasChecked] = useState(false);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !studentEmail || !studentPhone) {
      alert("Please fill in your name, email and contact number to verify your admission profile.");
      return;
    }

    // Save to the Verify Admission table in SQLite database
    try {
      const newCandidate = {
        name: studentName,
        email: studentEmail,
        phone: studentPhone,
        studyLevel: studyLevel,
        gpa: `${gpa} / ${gpaScale}`,
        englishScore: `${englishTest} (${englishScore})`,
        budget: budget === "under15k" ? "Under $15k USD/yr" : budget === "15k30k" ? "$15k-$30k USD/yr" : "Over $30k USD/yr",
        targetCountry: targetCountry,
        rating: evaluationResult.rating,
        status: evaluationResult.status,
        date: new Date().toLocaleDateString('en-GB'),
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      };
      
      await fetch("/api/eligibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCandidate)
      });
    } catch (err) {
      console.error("Backend SQL DB Verify Admission candidate insertion error: ", err);
    }

    setHasChecked(true);
  };

  const handleReset = () => {
    setStep(1);
    setGpa("3.5");
    setGpaScale("4.0");
    setStudyLevel("High School (12th Grade)");
    setEnglishTest("IELTS");
    setEnglishScore("6.5");
    setBudget("15k30k");
    setTargetCountry("All");
    setStudentName("");
    setStudentEmail("");
    setStudentPhone("");
    setHasChecked(false);
  };

  // Logic evaluations
  const gpaNorm = parseFloat(gpa) / parseFloat(gpaScale); // Ratio between 0 and 1
  const scoreNum = parseFloat(englishScore) || 6.0;

  const evaluationResult = (() => {
    if (gpaNorm >= 0.85 && scoreNum >= 6.5) {
      return {
        status: "Excellent Compatibility",
        rating: "95%",
        color: "text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/20",
        summary: "Outstanding profile! You satisfy general academic entry controls. You qualify for competitive merit scholarships from top 100 QS Universities worldwide (up to 50% waiver).",
        countries: [
          { name: "Australia", chance: "Very High", notes: "Qualifies for Group of Eight universities directly." },
          { name: "United Kingdom", chance: "Very High", notes: "Eligible for fast-track 1-Year Master's and high-tier universities." },
          { name: "United States", chance: "High", notes: "Strong profile for STEM OPT work programs & financial aids." },
          { name: "Canada", chance: "Very High", notes: "Qualifies directly under streamlined SDS visa categories." }
        ]
      };
    } else if (gpaNorm >= 0.72 && scoreNum >= 6.0) {
      return {
        status: "Strong Compatibility",
        rating: "85%",
        color: "text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/20",
        summary: "Great academic potential! You qualify directly for standard degree entries in Australia, Canada, Ireland and Europe. Minor scholarship waivers (10%-25%) can be negotiated with targeted prep.",
        countries: [
          { name: "Australia", chance: "High", notes: "Direct entry to outstanding regional and hub campuses." },
          { name: "United Kingdom", chance: "High", notes: "Excellent fits across major Russel Group and modern institutes." },
          { name: "Canada", chance: "High", notes: "Direct application to popular colleges and research centers." },
          { name: "Europe & Ireland", chance: "Very High", notes: "Strong candidates for top branch campuses and business programs." }
        ]
      };
    } else if (gpaNorm >= 0.60 && scoreNum >= 5.5) {
      return {
        status: "Average / Moderate Compatibility",
        rating: "70%",
        color: "text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20",
        summary: "Profile satisfies standard criteria, but you might require a foundational pathway semester or minor upgrade in your English language scores to satisfy top global programs directly.",
        countries: [
          { name: "Australia", chance: "Moderate", notes: "May require a 1-term preparatory diploma transition." },
          { name: "United Kingdom", chance: "Moderate", notes: "English training integration options are widely available." },
          { name: "Europe", chance: "High", notes: "Very cost-effective direct intakes with tailored support." },
          { name: "Canada", chance: "Moderate", notes: "Outstanding collegiate diploma options with post-study permits." }
        ]
      };
    } else {
      return {
        status: "Preparatory Pathway Required",
        rating: "50%",
        color: "text-red-650 dark:text-red-400 border-red-100 dark:border-red-950/40 bg-red-50/50 dark:bg-red-950/20",
        summary: "Academic transcripts or current test values do not satisfy direct international entry standards. We highly recommend a fast-track foundational class structure to bridge direct entry gaps.",
        countries: [
          { name: "Australia", chance: "Low", notes: "Requires a 1-year preparatory pathway program before direct degree." },
          { name: "United Kingdom", chance: "Moderate", notes: "Offers foundation pathway with integrated verbal study." },
          { name: "Europe", chance: "High", notes: "Excellent public preparation years with low cost structures." },
          { name: "Canada", chance: "Moderate", notes: "Streamlined community college options for skill diplomas." }
        ]
      };
    }
  })();

  return (
    <div className="py-10 bg-white dark:bg-slate-950 transition-colors min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl space-y-8">
        
        {/* Back option on top */}
        <div className="flex justify-start">
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#0047AB] hover:border-[#0047AB] dark:text-slate-400 dark:hover:text-blue-400 dark:hover:border-blue-400 transition-colors bg-slate-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 px-4 py-2 rounded-xl cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Previous Page
          </button>
        </div>
        
        {/* Header Title */}
        <div className="text-center space-y-3">
          <span className="text-[#0047AB] dark:text-blue-400 font-extrabold tracking-widest text-xs uppercase block">ELIGIBILITY CALCULATOR</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-950 dark:text-white">
            Evaluate Your <span className="text-blue-600 dark:text-blue-400">Study Chances</span>
          </h2>
          <p className="text-gray-500 dark:text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Check your compatibility index for admissions and scholarships based on real university requirements. Receive a comprehensive diagnostic checklist instantly.
          </p>
        </div>

        {/* Action content box */}
        {!hasChecked ? (
          <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden flex flex-col">
            
            {/* Step Indicators */}
            <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 flex justify-between items-center border-b border-gray-100 dark:border-slate-800 text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">
              <span>Step {step} of 3</span>
              <div className="flex gap-1.5">
                {[1, 2, 3].map((s) => (
                  <span 
                    key={s} 
                    className={`h-2 w-10 rounded-full transition-all ${
                      s <= step ? "bg-[#0047AB] dark:bg-blue-400" : "bg-gray-200 dark:bg-slate-800"
                    }`} 
                  />
                ))}
              </div>
            </div>

            <form onSubmit={handleCheck} className="p-6 md:p-10 space-y-8 flex-grow">
              
              {/* STEP 1: ACADEMIC CREDENTIALS */}
              {step === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <Award className="h-5.5 w-5.5 text-[#0047AB]" />
                      Your Current Academic Level
                    </h3>
                    <p className="text-xs text-gray-400">Specify the highest educational credential you hold or are currently completing.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="studyLevel" className="text-xs font-bold text-gray-700 dark:text-slate-300">Level of Education</label>
                      <select
                        id="studyLevel"
                        value={studyLevel}
                        onChange={(e) => setStudyLevel(e.target.value)}
                        className="w-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white rounded-xl py-3 px-4 shadow-sm text-sm focus:ring-[#0047AB]"
                      >
                        <option value="High School (12th Grade)">High School (12th Grade / A-Levels)</option>
                        <option value="Associate Degree / Diploma">Associate Degree / Diploma (3 Years)</option>
                        <option value="Bachelor's Degree">Bachelor's Degree (Graduated)</option>
                        <option value="Master's Degree">Master's Degree</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="gpa" className="text-xs font-bold text-gray-700 dark:text-slate-300">Grade / Score</label>
                        <input
                          id="gpa"
                          type="number"
                          step="0.05"
                          min="0"
                          max="100"
                          value={gpa}
                          onChange={(e) => setGpa(e.target.value)}
                          className="w-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white rounded-xl py-3 px-4 shadow-sm text-sm focus:ring-[#0047AB]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="gpaScale" className="text-xs font-bold text-gray-700 dark:text-slate-300">Scale</label>
                        <select
                          id="gpaScale"
                          value={gpaScale}
                          onChange={(e) => setGpaScale(e.target.value)}
                          className="w-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white rounded-xl py-3 px-4 shadow-sm text-sm focus:ring-[#0047AB]"
                        >
                          <option value="4.0">GPA scale 4.0</option>
                          <option value="5.0">GPA scale 5.0</option>
                          <option value="10.0">GPA scale 10.0</option>
                          <option value="100">Percentage % scale</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: ENGLISH PROFICIENCY TESTS */}
              {step === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <ListChecks className="h-5.5 w-5.5 text-green-600" />
                      English Proficiency Scores
                    </h3>
                    <p className="text-xs text-gray-400">Most host nations require standard proof of academic communication fluency.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="englishTest" className="text-xs font-bold text-gray-700 dark:text-slate-300">Language Test Taken</label>
                      <select
                        id="englishTest"
                        value={englishTest}
                        onChange={(e) => setEnglishTest(e.target.value)}
                        className="w-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white rounded-xl py-3 px-4 shadow-sm text-sm focus:ring-[#0047AB]"
                      >
                        <option value="IELTS">IELTS Academic</option>
                        <option value="TOEFL">TOEFL iBT</option>
                        <option value="PTE">PTE Academic</option>
                        <option value="Duolingo">Duolingo Language Test</option>
                        <option value="Not Taken Yet">Planning to take test later</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="englishScore" className="text-xs font-bold text-gray-700 dark:text-slate-300">
                        {englishTest === "Not Taken Yet" ? "Expected Band / Target Score" : "Your Score (Overall)"}
                      </label>
                      <input
                        id="englishScore"
                        type="text"
                        placeholder={englishTest === "TOEFL" ? "95" : englishTest === "Duolingo" ? "120" : "6.5"}
                        value={englishScore}
                        onChange={(e) => setEnglishScore(e.target.value)}
                        className="w-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white rounded-xl py-3 px-4 shadow-sm text-sm focus:ring-[#0047AB]"
                      />
                      <p className="text-[10px] text-gray-400 font-medium">Use overall score e.g. 6.5 or 90</p>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: PREFERENCES & ASSETS */}
              {step === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <Star className="h-5.5 w-5.5 text-amber-500" />
                      Targets &amp; Financial Capability
                    </h3>
                    <p className="text-xs text-gray-400 font-medium">This resolves which countries match your academic budget expectations best.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="budget" className="text-xs font-bold text-gray-700 dark:text-slate-300">Comfortable Annual Tuition Budget</label>
                      <select
                        id="budget"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white rounded-xl py-3 px-4 shadow-sm text-sm focus:ring-[#0047AB]"
                      >
                        <option value="under15k">Budget Friendly (Under $15,000 USD / yr)</option>
                        <option value="15k30k">Moderate ($15,000 - $30,000 USD / yr)</option>
                        <option value="over30k">Premium / Competitive (Over $30,000 USD / yr)</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="targetCountry" className="text-xs font-bold text-gray-700 dark:text-slate-300">Primary Country of Interest</label>
                      <select
                        id="targetCountry"
                        value={targetCountry}
                        onChange={(e) => setTargetCountry(e.target.value)}
                        className="w-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white rounded-xl py-3 px-4 shadow-sm text-sm focus:ring-[#0047AB]"
                      >
                        <option value="All">Open to All Top Countries</option>
                        <option value="Australia">Australia</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="New Zealand">New Zealand</option>
                        <option value="Ireland">Ireland</option>
                      </select>
                    </div>
                  </div>

                  {/* Student Lead Verification Form Section */}
                  <div className="pt-6 border-t border-gray-150 dark:border-slate-800 space-y-4">
                    <div className="space-y-1">
                      <h4 className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                        Student Contact &amp; Verification Info
                      </h4>
                      <p className="text-[11px] text-gray-400 font-semibold leading-none">Your credentials will be compiled securely into our administrative database.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="studentName" className="text-xs font-bold text-gray-700 dark:text-slate-350">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="studentName"
                          type="text"
                          placeholder="Your full name"
                          value={studentName}
                          onChange={(e) => setStudentName(e.target.value)}
                          className="w-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white rounded-xl py-2.5 px-3.5 shadow-sm text-xs focus:ring-[#0047AB] font-bold"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="studentEmail" className="text-xs font-bold text-gray-700 dark:text-slate-350">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="studentEmail"
                          type="email"
                          placeholder="name@email.com"
                          value={studentEmail}
                          onChange={(e) => setStudentEmail(e.target.value)}
                          className="w-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white rounded-xl py-2.5 px-3.5 shadow-sm text-xs focus:ring-[#0047AB] font-bold"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="studentPhone" className="text-xs font-bold text-gray-700 dark:text-slate-350">
                          Contact Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="studentPhone"
                          type="tel"
                          placeholder="e.g., +91 98765 43210"
                          value={studentPhone}
                          onChange={(e) => setStudentPhone(e.target.value)}
                          className="w-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white rounded-xl py-2.5 px-3.5 shadow-sm text-xs focus:ring-[#0047AB] font-bold"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t border-gray-100 dark:border-slate-800">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center gap-1.5 border border-gray-250 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300 font-bold px-5 py-2.5 rounded-xl text-sm transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4" /> Go Back
                  </button>
                ) : (
                  <div />
                )}

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={onCancel}
                    className="border border-gray-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300 font-bold px-5 py-2.5 rounded-xl text-sm transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="bg-[#0047AB] dark:bg-blue-600 hover:bg-blue-700 hover:shadow text-white font-bold px-6 py-2.5 rounded-xl text-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      Continue <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="bg-emerald-500 hover:bg-emerald-600 hover:shadow text-white font-extrabold px-8 py-3 rounded-xl text-sm flex items-center gap-2 cursor-pointer animate-pulse"
                    >
                      <Sparkles className="h-4.5 w-4.5" /> Check My Compatibility
                    </button>
                  )}
                </div>
              </div>

            </form>

          </div>
        ) : (
          /* SCORECARD OUTPUT RESULTS */
          <div className="space-y-8 animate-slide-up">
            
            {/* Main Diagnostics Header */}
            <div className={`border p-6 md:p-8 rounded-3xl flex flex-col sm:flex-row items-center gap-6 justify-between ${evaluationResult.color}`}>
              <div className="space-y-3 text-center sm:text-left">
                <p className="text-xs uppercase tracking-widest font-extrabold opacity-75">Your Evaluation Scorecard</p>
                <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                  Status: {evaluationResult.status}
                </h3>
                <p className="text-sm opacity-90 max-w-lg leading-relaxed">{evaluationResult.summary}</p>
                <div className="pt-2 text-xs text-gray-500 dark:text-slate-400 font-semibold space-y-1">
                  <p>• Logged Credentials: {studyLevel} (Est GPA: {gpa} on {gpaScale} scale)</p>
                  <p>• Language verification: {englishTest} verification (score: {englishScore})</p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center bg-white dark:bg-slate-900 border-2 border-current rounded-full h-28 w-28 shrink-0 shadow-sm">
                <span className="text-[10px] uppercase font-extrabold text-gray-400 leading-none">Chances</span>
                <span className="text-3xl font-black">{evaluationResult.rating}</span>
                <span className="text-[9px] text-emerald-500 font-bold leading-normal">Approved</span>
              </div>
            </div>

            {/* Country Matrix */}
            <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-6 md:p-8 rounded-3xl shadow-sm space-y-5">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white">Admission Possibility By Country</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {evaluationResult.countries.map((cty, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 flex flex-col justify-between space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-extrabold text-sm text-gray-950 dark:text-white">{cty.name}</span>
                      <span className={`text-[11px] font-extrabold py-0.5 px-2.5 rounded-full ${
                        cty.chance === "Very High" 
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400"
                          : cty.chance === "High"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-400"
                          : "bg-orange-100 text-orange-850 dark:bg-orange-950/40 dark:text-orange-400"
                      }`}>
                        {cty.chance} Chance
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed font-semibold">{cty.notes}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Recommended Actions */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-blue-50/30 dark:bg-slate-900/50 p-6 md:p-8 border border-blue-100/50 dark:border-slate-800/80 rounded-3xl">
              <div className="md:col-span-8 space-y-3">
                <h4 className="text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                  <Check className="h-5 w-5 text-emerald-500 stroke-[3]" />
                  Secure Priority Admission &amp; Secure Fee Waivers
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 leading-relaxed font-semibold">
                  To finalize applications for Spring or Fall intakes, we recommend submitting official academic transcripts and IELTS certificate copies for evaluation. Let our verified counselors negotiate on your behalf.
                </p>
              </div>
              <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 w-full shrink-0">
                <button
                  onClick={() => onBookCounselling(`Profile evaluation score: ${evaluationResult.rating}. Academic: ${studyLevel}, GPA: ${gpa}. Language: ${englishTest} (${englishScore}).`)}
                  className="w-full bg-[#0047AB] dark:bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs py-3.5 px-6 rounded-xl shadow-md transition-all text-center cursor-pointer"
                >
                  Book Free Assessment Discussion
                </button>
                <button
                  onClick={onCancel}
                  className="w-full text-xs font-extrabold px-5 py-3.5 rounded-xl border border-blue-250 dark:border-slate-700 bg-blue-50/50 dark:bg-slate-900 text-blue-700 dark:text-blue-400 hover:bg-blue-100/60 flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Back to Previous Page
                </button>
                <button
                  onClick={handleReset}
                  className="w-full text-xs font-semibold px-5 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-slate-300 hover:bg-gray-50 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="h-3.5 w-3.5" /> Start New Calculation
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
