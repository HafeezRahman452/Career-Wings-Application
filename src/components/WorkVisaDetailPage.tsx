import React, { useState, useEffect } from "react";
import { SEO_WORK_VISAS, SEOWorkVisaDetail } from "../data/seoContent";
import { 
  ArrowLeft, 
  Briefcase, 
  Clock, 
  FileText, 
  MapPin, 
  CheckCircle, 
  Sparkles, 
  Phone, 
  Layers,
  ChevronRight,
  ChevronDown,
  ClipboardList,
  HelpCircle,
  TrendingUp,
  Globe,
  Award
} from "lucide-react";

interface WorkVisaDetailPageProps {
  workVisaId: string;
  onBack: () => void;
  onBookCounselling: (details: string) => void;
}

// Custom design systems and visual palettes based on target country
const getCountryStyles = (country: string) => {
  const norm = country.toLowerCase();
  if (norm === "poland") {
    return {
      accent: "bg-red-50 text-red-600 dark:text-red-400 border-red-100",
      badge: "bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-md shadow-red-500/15",
      iconColor: "text-red-600",
      gradient: "from-red-600 via-rose-700 to-red-900",
      btnColor: "bg-red-600 hover:bg-red-700 hover:shadow-lg hover:shadow-red-500/20 active:scale-95 text-white font-black py-4 px-4 rounded-xl",
      bannerText: "Poland Schengen Pathways 🇵🇱",
      headerBg: "bg-gradient-to-b from-red-50/50 via-[#fafbfe] to-white"
    };
  } else if (norm === "canada") {
    return {
      accent: "bg-red-50 text-rose-700 border-rose-100",
      badge: "bg-gradient-to-r from-red-600 to-rose-800 text-white shadow-md shadow-red-500/15",
      iconColor: "text-red-600",
      gradient: "from-red-600 via-rose-800 to-stone-900",
      btnColor: "bg-red-600 hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/20 active:scale-95 text-white font-black py-4 px-4 rounded-xl",
      bannerText: "Canada Immigration LMIA 🇨🇦",
      headerBg: "bg-gradient-to-b from-rose-50/20 via-[#fafbfe] to-white"
    };
  } else if (norm === "new zealand") {
    return {
      accent: "bg-green-50 text-emerald-700 border-emerald-100",
      badge: "bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-500/15",
      iconColor: "text-emerald-600",
      gradient: "from-emerald-700 via-[#0047AB] to-slate-900",
      btnColor: "bg-[#0047AB] hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 text-white font-black py-4 px-4 rounded-xl",
      bannerText: "New Zealand AEWV Streams 🇳🇿",
      headerBg: "bg-gradient-to-b from-green-50/30 via-[#fafbfe] to-white"
    };
  } else if (norm === "australia") {
    return {
      accent: "bg-green-50 text-emerald-700 border-green-100",
      badge: "bg-gradient-to-r from-[#008240] to-yellow-600 text-amber-100 shadow-md shadow-green-500/15",
      iconColor: "text-emerald-700",
      gradient: "from-emerald-800 via-[#008240] to-yellow-950",
      btnColor: "bg-yellow-500 hover:bg-yellow-600 text-black hover:shadow-lg active:scale-95 font-black py-4 px-4 rounded-xl",
      bannerText: "Australia Points-Tested GSM 🇦🇺",
      headerBg: "bg-gradient-to-b from-yellow-50/20 via-[#fafbfe] to-white"
    };
  } else if (norm === "united kingdom") {
    return {
      accent: "bg-blue-50 text-[#0047AB] border-blue-100",
      badge: "bg-gradient-to-r from-[#0047AB] to-blue-800 text-white shadow-md shadow-blue-500/15",
      iconColor: "text-blue-600",
      gradient: "from-[#0047AB] via-indigo-700 to-[#0a2f7c]",
      btnColor: "bg-orange-500 hover:bg-orange-600 hover:shadow-lg active:scale-95 text-white font-black py-4 px-4 rounded-xl",
      bannerText: "UK Skilled Worker Route 🇬🇧",
      headerBg: "bg-gradient-to-b from-blue-50/30 via-[#fafbfe] to-white"
    };
  } else {
    // Default / Global
    return {
      accent: "bg-[#0047AB]/5 text-[#0047AB] border-blue-100",
      badge: "bg-gradient-to-r from-[#0047AB] to-indigo-800 text-white shadow-md shadow-blue-500/15",
      iconColor: "text-[#0047AB]",
      gradient: "from-[#0047AB] via-blue-700 to-[#0a2f7c]",
      btnColor: "bg-orange-500 hover:bg-orange-600 hover:shadow-lg active:scale-95 text-white font-black py-4 px-4 rounded-xl",
      bannerText: "Global Work Visa Solution 🌍",
      headerBg: "bg-gradient-to-b from-blue-50/15 via-[#fafbfe] to-white"
    };
  }
};

export default function WorkVisaDetailPage({
  workVisaId,
  onBack,
  onBookCounselling
}: WorkVisaDetailPageProps) {
  const [data, setData] = useState<SEOWorkVisaDetail | null>(null);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0); // Open first FAQ by default

  useEffect(() => {
    // Scroll window to top when mounting a detail page
    window.scrollTo({ top: 0, behavior: "smooth" });
    const found = SEO_WORK_VISAS.find(v => v.id === workVisaId);
    if (found) {
      setData(found);
    }
  }, [workVisaId]);

  if (!data) {
    return (
      <div className="py-24 text-center space-y-4">
        <p className="text-gray-500 font-bold">Loading Work Visa details...</p>
        <button onClick={onBack} className="text-[#0047AB] underline font-extrabold cursor-pointer">
          Go Back
        </button>
      </div>
    );
  }

  const styles = getCountryStyles(data.country);

  return (
    <div className="bg-[#FCFAF7] dark:bg-slate-950 min-h-screen pb-24 text-gray-900 dark:text-slate-100 transition-colors animate-fade-in">
      
      {/* 1. BREADCRUMBS & TOP UTILITY PATH */}
      <div className="border-b border-gray-100 bg-slate-50/60 py-3.5">
        <div className="container mx-auto px-4 max-w-[1440px] flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-gray-400">
          <div className="flex items-center gap-2">
            <button 
              onClick={onBack}
              className="hover:text-blue-600 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Core Options
            </button>
            <ChevronRight className="h-3.5 w-3.5 text-gray-350" />
            <span>Work Visas &amp; Permanent Residency</span>
            <ChevronRight className="h-3.5 w-3.5 text-gray-350" />
            <span className="text-blue-600 font-extrabold">{data.name} Guide</span>
          </div>
          
          <div className="flex items-center gap-2 text-rose-600 animate-pulse font-extrabold">
            <Sparkles className="h-4 w-4" />
            <span>Secure Employer Sponsor Licences Instantly!</span>
          </div>
        </div>
      </div>

      {/* 2. DYNAMIC HEADER SECTION (SEO Targeted Headers) */}
      <header className={`py-14 border-b border-gray-150/50 ${styles.headerBg}`}>
        <div className="container mx-auto px-4 max-w-[1440px] space-y-4.5">
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-black tracking-widest px-4 py-1.5 rounded-full inline-block uppercase ${styles.accent} border`}>
              {styles.bannerText}
            </span>
            <span className="bg-emerald-50 text-emerald-700 text-[10px] sm:text-[11px] font-black tracking-wider px-3 py-1.5 rounded-full border border-emerald-100 uppercase">
              ★★★★★ Licensed Agency
            </span>
          </div>
          
          {/* SEO Targeted H1 Tag */}
          <h1 className="text-3.5xl sm:text-5.5xl font-black text-gray-950 leading-tight tracking-tight">
            How to Apply for {data.name} — Requirements &amp; Process Guide
          </h1>
          
          {/* Subtitle/Lead Paragraph */}
          <p className="text-gray-600 text-sm sm:text-base md:text-md font-semibold max-w-4.5xl leading-relaxed text-slate-700">
            {data.intro} Partner with Career Wings Consultants, the industry-leading Study Abroad Consultants and the Best Visa Agency, to gain error-free and dynamic processing.
          </p>

          <div className="flex flex-wrap gap-4 pt-1 text-xs font-bold text-gray-500">
            <span className="flex items-center gap-1.5 bg-slate-100/70 p-2.5 rounded-xl"><Globe className="h-4 w-4 text-[#0047AB]" /> Primary Territory: <strong>{data.country}</strong></span>
            <span className="flex items-center gap-1.5 bg-slate-100/70 p-2.5 rounded-xl"><Award className="h-4 w-4 text-emerald-600" /> Success Rating: <strong>99.3% Proven</strong></span>
          </div>
        </div>
      </header>

      {/* Quick Metrics Cards (Validity, Time, PR) - Placed above the images as requested! */}
      <section className="container mx-auto px-4 max-w-[1440px] pt-10 pb-2">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-slate-50 border border-gray-100 rounded-2xl p-5.5 space-y-2 shadow-xs hover:border-[#0047AB]/20 transition-colors">
            <span className="text-gray-400 text-[10px] font-black uppercase tracking-wider block">Average Processing Time</span>
            <p className="text-base sm:text-lg font-black text-[#0047AB] flex items-center gap-1.5">
              <Clock className={`h-5 w-5 ${styles.iconColor}`} /> {data.avgProcessingTime}
            </p>
          </div>

          <div className="bg-slate-50 border border-gray-100 rounded-2xl p-5.5 space-y-2 shadow-xs hover:border-emerald-500/20 transition-colors">
            <span className="text-gray-400 text-[10px] font-black uppercase tracking-wider block">Visa Validity Period</span>
            <p className="text-base sm:text-lg font-black text-emerald-600 flex items-center gap-1.5">
              <Briefcase className="h-5 w-5 text-emerald-500" /> {data.visaValidity}
            </p>
          </div>

          <div className="bg-slate-50 border border-gray-100 rounded-2xl p-5.5 space-y-2 shadow-xs col-span-1 hover:border-violet-500/20 transition-colors">
            <span className="text-gray-400 text-[10px] font-black uppercase tracking-wider block">Permanent Residency (PR) Pathway</span>
            <p className="text-xs sm:text-xs font-bold text-slate-800 leading-tight flex items-start gap-1">
              <TrendingUp className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
              {data.prPathway}
            </p>
          </div>
        </div>
      </section>

      {/* 3. MULTI-IMAGE GALLERY COLLAGE (3+ Images containing unique alt and title annotations) */}
      <section className="container mx-auto px-4 max-w-[1440px] py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto">
          {/* Main Hero Photo */}
          <div className="md:col-span-7 flex flex-col bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xs border border-gray-150 dark:border-slate-800 group">
            <div className="h-[240px] sm:h-[320px] overflow-hidden relative">
              <img 
                src={data.mainImage} 
                alt={`${data.name} Environment in ${data.country} - Career Wings Consultants, Study Abroad Consultants`} 
                title={`${data.name} Destination Landscapes - Career Wings Consultants (Study Abroad Consultants) - Best Visa Agency`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
              />
            </div>
            <div className="p-5 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 space-y-2">
              <span className={`inline-block text-[9px] uppercase font-black tracking-widest px-2.5 py-1 rounded ${styles.badge}`}>
                WORK PERMIT STREAMS
              </span>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100 leading-tight">
                Secure Stable Legal Careers in {data.country}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                Comprehensive oversight on wage guidelines, work contracts, and local municipality settlement.
              </p>
            </div>
          </div>

          {/* Side Photo 2 & 3 */}
          <div className="md:col-span-5 grid grid-rows-2 gap-6 h-auto">
            <div className="flex flex-col bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xs border border-gray-150 dark:border-slate-800 group">
              <div className="h-[120px] sm:h-[135px] overflow-hidden relative">
                <img 
                  src={data.sideImage1} 
                  alt={`${data.name} Commercial Hub Services - Career Wings Consultants, Study Abroad Consultants`} 
                  title={`${data.name} Business Parks - Study Abroad Consultants & Best Visa Agency Services`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                />
              </div>
              <div className="p-3.5 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 space-y-1">
                <p className="text-xs sm:text-sm font-black text-slate-850 dark:text-slate-200">Official Employment Networks</p>
                <p className="text-[10px] text-gray-450 dark:text-gray-500 font-bold leading-none">Connected with Verified Sponsoring Entities</p>
              </div>
            </div>

            <div className="flex flex-col bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xs border border-gray-150 dark:border-slate-800 group">
              <div className="h-[120px] sm:h-[135px] overflow-hidden relative">
                <img 
                  src={data.sideImage2} 
                  alt={`${data.name} Success and Team Meeting - Career Wings Consultants, Study Abroad Consultants`} 
                  title={`${data.name} Job Offer Approvals - Career Wings Consultants Study Abroad Consultants`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                />
              </div>
              <div className="p-3.5 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 space-y-1">
                <p className="text-xs sm:text-sm font-black text-slate-850 dark:text-slate-200">Work Visa and Permanent Resident Approvals</p>
                <p className="text-[10px] text-gray-450 dark:text-gray-500 font-bold leading-none">Schengen &amp; Commonwealth Work Visas Successfully Granted</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MAIN BODY LAYOUT */}
      <section className="container mx-auto px-4 max-w-[1440px] pt-12 pb-16 relative z-10 block clear-both">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT CONTENT AREA */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Core Requirements checklist block */}    {/* Core Requirements checklist block */}
            <section className="space-y-6">
              <h2 className="text-xl sm:text-2.5xl font-black text-gray-950 border-b border-gray-100 pb-3 flex items-center gap-2.5">
                <ClipboardList className={`h-6.5 w-6.5 ${styles.iconColor}`} />
                Primary Eligibility &amp; Core Requirements
              </h2>
              <p className="text-xs sm:text-[14.5px] text-gray-500 leading-relaxed font-semibold">
                To submit an application for **{data.name}** successfully, candidates must possess these primary documents and verify the parameters requested under local immigration rules:
              </p>

              <div className="grid grid-cols-1 gap-3.5 pt-2">
                {data.keyRequirements.map((req, index) => (
                  <div key={index} className="bg-[#fafbfe] border border-slate-100 hover:border-blue-500/10 p-4.5 rounded-2xl flex gap-3.5 transition-colors">
                    <span className="h-6 w-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black shrink-0">✓</span>
                    <span className="text-xs sm:text-[13.5px] text-gray-600 font-semibold leading-relaxed">{req}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Visas detailed texts */}
            <div className="space-y-14">
              {data.sections.map((sect, sIdx) => (
                <article key={sIdx} className="space-y-5">
                  <h3 className="text-xl sm:text-2xl font-black text-gray-955 border-b border-gray-100 pb-3">
                    {sect.title}
                  </h3>
                  
                  <div className="space-y-4">
                    {sect.paragraphs.map((pText, pIdx) => (
                      <p 
                        key={pIdx} 
                        className="text-gray-600 text-xs sm:text-[14.5px] leading-relaxed font-semibold text-justify"
                      >
                        {pText}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            {/* Visa Process Steps block */}
            <section className="space-y-6">
              <h2 className="text-xl sm:text-2.5xl font-black text-gray-955 border-b border-gray-100 pb-3 flex items-center gap-2.5">
                <Layers className="h-6.5 w-6.5 text-purple-600" />
                Step-by-Step Sponsorship &amp; Visa Lodgement Process
              </h2>
              <p className="text-xs sm:text-[14.5px] text-gray-500 leading-relaxed font-semibold">
                Filing an immigration visa involves close coordination between your foreign employer, state migration offices, and closest embassy bodies. Let's follow this pathway:
              </p>

              <div className="space-y-5 relative pl-4.5 before:content-[&apos;&apos;] before:absolute before:left-2 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-150">
                {data.visaProcessSteps.map((step, idx) => (
                  <div key={idx} className="space-y-1.5 hover:translate-x-1 transition-transform duration-350">
                    <p className={`font-black text-xs sm:text-sm ${styles.iconColor}`}>{step}</p>
                    <p className="text-gray-400 text-[10.5px] font-semibold pl-4">Verified checking under local immigration policy</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Dynamic FAQs Section (Custom SEO Q&As addressing user requirement) */}
            {data.faqs && data.faqs.length > 0 && (
              <section className="space-y-6 bg-slate-50/50 p-6 sm:p-8 rounded-3xl border border-gray-100">
                <div>
                  <span className={`text-[9px] font-black tracking-widest px-3 py-1.5 rounded-full inline-block uppercase bg-blue-50 text-blue-600 border border-blue-100 mb-3`}>
                    SEO HELP &amp; DESK QUESTIONS
                  </span>
                  <h3 className="text-xl sm:text-2.5xl font-black text-gray-950 flex items-center gap-2">
                    <HelpCircle className="h-6 w-6 text-[#0047AB]" />
                    Frequently Asked Questions (FAQ) — {data.name}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm font-semibold mt-2">
                    Everything you need to know about eligibility factors, work permits, wages, processing speeds, and relocation logistics.
                  </p>
                </div>

                <div className="space-y-3 pt-3">
                  {data.faqs.map((faq, fIdx) => {
                    const isOpen = expandedFaqIndex === fIdx;
                    return (
                      <div 
                        key={fIdx} 
                        className="bg-white border border-gray-150 rounded-2xl overflow-hidden transition-all duration-300"
                      >
                        <button
                          type="button"
                          onClick={() => setExpandedFaqIndex(isOpen ? null : fIdx)}
                          className="w-full flex items-center justify-between text-left p-4.5 sm:p-5 font-black text-xs sm:text-sm text-gray-900 hover:bg-slate-50/60 transition-colors"
                        >
                          <span className="pr-4">{faq.q}</span>
                          <ChevronDown className={`h-4.5 w-4.5 text-gray-400 transition-transform ${isOpen ? "rotate-180 text-[#0047AB]" : ""}`} />
                        </button>
                        
                        {isOpen && (
                          <div className="px-4.5 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-[13.5px] text-gray-500 font-semibold leading-relaxed border-t border-gray-50 pt-3 bg-slate-50/20">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

          </div>

          {/* RIGHT FLOATING FORM COLUMN */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            
            {/* Conversion form box */}
            <div className={`bg-gradient-to-br ${styles.gradient} text-white p-8 rounded-3xl shadow-xl space-y-6 border border-white/10`}>
              <div className="space-y-2">
                <span className="text-amber-300 text-[10px] font-black uppercase tracking-widest block">
                  CWC LICENSED IMMIGRATION SUPPORT
                </span>
                <h4 className="text-xl sm:text-2.5xl font-black tracking-tight leading-tight">
                  Review Your Credentials Today!
                </h4>
                <p className="text-blue-100 text-xs font-semibold leading-relaxed opacity-95">
                  Need a certified employment contract check? Let our registered advisors evaluate your work reference letters and job parameters for {data.country}.
                </p>
              </div>

              <div className="h-px bg-white/10" />

              <div className="space-y-3 text-xs bg-black/15 p-4 rounded-xl border border-white/5 font-semibold">
                <p className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" /> Fast-Track Job Offer verifications</p>
                <p className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" /> Sponsor Licences checks</p>
                <p className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" /> Complete File Preparation</p>
              </div>

              <button
                onClick={() => onBookCounselling(`Consulting work visa plans & eligibility regarding ${data.name}.`)}
                className={`w-full block text-center transition-all shadow-md cursor-pointer ${styles.btnColor}`}
              >
                REQUEST WORK VISA ASSESSMENT
              </button>

              <p className="text-[10px] text-gray-300 text-center font-bold animate-pulse">
                Sponsor Licences confirmed within 24 Hours!
              </p>
            </div>

            {/* Support hotline */}
            <div className="bg-slate-50 border border-gray-150/70 p-6 rounded-3xl text-xs space-y-3.5">
              <h5 className="font-black text-gray-955 uppercase tracking-wider flex items-center gap-1.5">
                <Phone className="h-4 w-4 text-blue-600" /> Work Visa Hotline
              </h5>
              <p className="text-gray-500 leading-normal font-semibold">
                Ready to take your global career to the next level? Dial our direct advisory Desk.
              </p>
              <a 
                href="tel:+919000119072"
                className="block text-[#0047AB] font-extrabold text-sm hover:underline"
              >
                +91 90001 19072
              </a>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
