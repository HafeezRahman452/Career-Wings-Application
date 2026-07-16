import React from "react";
import { 
  Award, 
  Users, 
  ShieldCheck, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  Globe, 
  GraduationCap, 
  CheckCircle,
  Clock,
  Compass,
  FileCheck
} from "lucide-react";

interface AboutUsPageProps {
  onBack: () => void;
  onBookCounselling: (details: string) => void;
}

export default function AboutUsPage({ onBack, onBookCounselling }: AboutUsPageProps) {
  return (
    <div className="bg-[#FCFAF7] dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Editorial Meta Title Tagline Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-950 to-slate-950 text-white py-4 px-6 md:px-12 text-2xs md:text-xs font-mono border-b border-blue-900/30 flex items-center justify-between">
        <span className="tracking-widest uppercase flex items-center gap-1.5 text-blue-300">
          <Globe className="h-4 w-4 text-emerald-400" /> Meta Title: Overseas Education Consultants & Foreign Education Experts - Career Wings
        </span>
        <span className="hidden md:inline text-slate-400 font-medium">Est. 2016 • ISO 9001 Approved</span>
      </div>

      {/* Main Hero Section with SEO optimized H1 */}
      <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-slate-900/10 to-[#FCFAF7] dark:from-slate-950 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 flex flex-col lg:flex-row items-center gap-12">
          
          <div className="flex-1 space-y-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#0047AB]/10 text-[#0047AB] dark:bg-blue-950/40 dark:text-blue-300 border border-[#0047AB]/20 px-3.5 py-1.5 rounded-full font-extrabold text-xs tracking-wider uppercase">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>Who We Are</span>
            </div>

            {/* H1 SEO Heading containing core keywords */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 dark:text-white leading-[1.1] tracking-tight font-sans">
              Leading <span className="bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-300">Foreign Education Experts</span> & <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">Overseas Education Consultants</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-slate-350 leading-relaxed font-medium">
              Career Wings has established a prestigious benchmark in facilitating seamless academic pathways worldwide. By functioning as specialized <strong>Foreign Education Experts</strong>, we have guided over 12,500 scholars to premier campuses in Europe, the UK, Canada, the USA, and beyond.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => onBookCounselling("Requesting full Profile Assessment and specialized Study Abroad Counselling.")}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0047AB] to-blue-600 text-white px-7 py-4 rounded-xl font-extrabold text-base hover:from-blue-700 hover:to-blue-500 hover:shadow-xl hover:shadow-blue-500/20 transition-all cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Get Free Counselling</span>
                <ArrowRight className="h-4.5 w-4.5" />
              </button>
              <button
                onClick={onBack}
                className="inline-flex items-center justify-center gap-2 border border-slate-300 hover:border-slate-500 dark:border-slate-700 dark:hover:border-slate-500 text-slate-700 dark:text-slate-350 px-7 py-4 rounded-xl font-bold text-base transition-all hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer"
              >
                Back to Explorer
              </button>
            </div>
          </div>

          <div className="flex-1 relative w-full max-w-lg lg:max-w-none">
            {/* Visual Abstract Bento Graphic */}
            <div className="relative aspect-square sm:aspect-video lg:aspect-square w-full rounded-3xl overflow-hidden bg-gradient-to-tr from-blue-600 to-cyan-500 shadow-2xl p-6 flex flex-col justify-between text-white">
              <div className="absolute inset-0 bg-slate-950/25 z-0" />
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" 
                alt="Students studying on global campus" 
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay z-0"
                referrerPolicy="no-referrer"
              />
              
              <div className="relative z-10 self-start bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
                <span className="font-mono text-2xs tracking-widest uppercase">Global Trust Index</span>
              </div>

              <div className="relative z-10 self-end bg-slate-900/95 border border-white/10 p-5 rounded-2xl backdrop-blur-lg space-y-2 max-w-xs shadow-xl">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-amber-300">98.7%</span>
                  <span className="text-2xs font-extrabold uppercase text-slate-300 font-mono tracking-wider">Visa Success Ratio</span>
                </div>
                <p className="text-3xs text-slate-400 font-semibold leading-relaxed">
                  Consistently recognized as one of the most compliant <strong>Overseas Education Consultants</strong> globally.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Trust Metrics Ribbon */}
      <section className="bg-slate-900 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <h3 className="text-3xl md:text-5xl font-black text-blue-400">12,500+</h3>
            <p className="text-xs md:text-sm text-slate-400 font-semibold uppercase tracking-wider">Students Counselled</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl md:text-5xl font-black text-amber-400">500+</h3>
            <p className="text-xs md:text-sm text-slate-400 font-semibold uppercase tracking-wider">Associate Universities</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl md:text-5xl font-black text-emerald-400">15+</h3>
            <p className="text-xs md:text-sm text-slate-400 font-semibold uppercase tracking-wider">Global Destinations</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl md:text-5xl font-black text-purple-400">9-Year</h3>
            <p className="text-xs md:text-sm text-slate-400 font-semibold uppercase tracking-wider">Operational Trust</p>
          </div>
        </div>
      </section>

      {/* Core SEO Section with dynamic H2 & structured explanations */}
      <section className="py-20 md:py-28 bg-[#F6F4EF] dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-orange-600 dark:text-orange-400 font-extrabold tracking-widest text-xs uppercase block font-mono">Core Values & Expertise</span>
            
            {/* H2 SEO Heading 1 */}
            <h2 className="text-3xl md:text-5xl font-black text-slate-950 dark:text-white leading-tight">
              Premium <span className="text-[#0047AB] dark:text-blue-400">Study Abroad Counselling</span> Built On Trust
            </h2>
            
            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base font-semibold leading-relaxed">
              At Career Wings, our primary purpose is to simplify application steps and align prospective scholars with matching courses. Learn why elite candidates choose us as their final advisors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-200/40 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-300 space-y-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-2xl w-fit">
                <Compass className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-950 dark:text-white">Expert Profile Audits</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">
                Our comprehensive <strong>Study Abroad Counselling</strong> processes review prior course credits, financial liquid assets, and language aptitude metrics to prevent future refusal risks.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-200/40 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-300 space-y-4">
              <div className="p-3 bg-orange-50 dark:bg-orange-950/40 rounded-2xl w-fit">
                <Users className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-950 dark:text-white">Best Career Consultants</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">
                Consistently ranked as the <strong>Best Career Consultants</strong>, our counselors match student aspirations with target labor trends to maximize high-salaried career placement potentials.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-200/40 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-300 space-y-4">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl w-fit">
                <FileCheck className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-950 dark:text-white">Compliant Visa Filing</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">
                Our certified <strong>Overseas Education Consultants</strong> handle biometric bookings, blocked account setup, and mock interviews so you can fly with solid confidence.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Director Section */}
      <section id="meet-our-director" className="py-20 md:py-28 bg-[#FFFFFF] dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Side: High Density Elegant Portrait Card */}
            <div className="lg:col-span-5 relative group">
              {/* Decorative background cards to look premium */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#0047AB] to-orange-400 rounded-[40px] opacity-10 blur-xl group-hover:opacity-15 transition-opacity duration-300" />
              <div className="absolute top-6 -left-6 w-72 h-72 bg-blue-100 dark:bg-blue-950/20 rounded-full mix-blend-multiply filter blur-2xl opacity-60 dark:opacity-30 -z-10" />
              
              <div className="relative rounded-[32px] overflow-hidden border border-slate-200/50 dark:border-slate-855 shadow-xl bg-white dark:bg-slate-950">
                <div className="aspect-[3/4] md:aspect-[4/5] lg:aspect-[3/4] w-full relative bg-slate-100 dark:bg-slate-900">
                  <img 
                    src="/md_altaf_ahmed.jpg"
                    onError={(e) => {
                      e.currentTarget.onerror = null; // prevent infinite loop
                      e.currentTarget.src = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800";
                    }}
                    alt="Altaf Ahmed Mohammed - Founder & Managing Director"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Premium overlay with subtle company seal or overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/20 to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                    <p className="text-amber-400 font-extrabold text-xs tracking-wider uppercase font-mono">20+ Years Excellence</p>
                    <h4 className="text-xl font-black">Altaf Ahmed Mohammed</h4>
                    <p className="text-xs text-slate-300 font-medium">Founder &amp; MD • Career Wings Consultants</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Narrative biography and Areas of Expertise */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 bg-[#0047AB]/5 dark:bg-blue-950/40 text-[#0047AB] dark:text-blue-300 border border-[#0047AB]/10 px-3.5 py-1.5 rounded-full font-extrabold text-xs tracking-wider uppercase">
                  <Users className="h-3.5 w-3.5 text-[#0047AB] dark:text-blue-400" />
                  <span>Meet Our Director</span>
                </div>
                <h2 className="text-3.5xl sm:text-5xl font-black text-gray-950 dark:text-white leading-tight">
                  Altaf Ahmed Mohammed
                </h2>
                <p className="text-sm sm:text-base font-extrabold text-[#0047AB] dark:text-blue-400">
                  Founder &amp; Managing Director – Career Wings Consultants
                </p>
              </div>

              {/* Modern Quote block with accent borders */}
              <div className="relative bg-amber-500/[0.04] border-l-4 border-amber-500 rounded-r-2xl p-5 md:p-6 my-4">
                <span className="absolute -top-3 -left-2 text-7xl text-amber-500/10 font-serif leading-none select-none">“</span>
                <p className="text-gray-800 dark:text-slate-200 text-sm md:text-base font-black italic leading-relaxed relative z-10">
                  “Our mission has always been simple — to turn every student’s global dream into a reality.”
                </p>
              </div>

              {/* Description story paragraphs */}
              <div className="space-y-4 text-xs sm:text-sm text-gray-500 dark:text-slate-350 leading-relaxed font-semibold">
                <p>
                  Altaf Ahmed Mohammed is the visionary founder behind Career Wings Consultants, with over 20+ years of experience in overseas education consultancy. Having personally guided thousands of students from Hyderabad to universities across Australia, Canada, the UK, USA, and Europe, he brings a deep understanding of international admission processes, visa regulations, and career planning.
                </p>
                <p>
                  A passionate advocate for global education, he has built Career Wings Consultants from the ground up into one of Hyderabad’s most trusted study abroad consultancies. Under his leadership, the firm has maintained a 100% visa success rate and expanded to serve students across India.
                </p>
              </div>

              {/* Areas of Expertise Grid */}
              <div className="space-y-4 pt-2">
                <h3 className="text-sm font-extrabold text-gray-950 dark:text-white uppercase tracking-wider font-mono">
                  Areas of Expertise:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {[
                    "University Admissions & Profile Building",
                    "Student & Working Visa Counselling",
                    "International Career Guidance",
                    "IELTS / PTE / TOEFL Strategy",
                    "Work Permit – Europe, UK, New Zealand, Australia & PR Assistance."
                  ].map((area, idx) => (
                    <div 
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800"
                    >
                      <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs font-bold text-gray-700 dark:text-slate-200 leading-snug">
                        {area}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Advisory Team Directory */}
      <section className="py-20 md:py-28 bg-white dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[#0047AB] dark:text-blue-400 font-extrabold tracking-widest text-xs uppercase block font-mono">MEET THE DIRECTORS</span>
            
            {/* H2 SEO Heading 2 */}
            <h2 className="text-3xl md:text-5xl font-black text-slate-950 dark:text-white leading-tight">
              Best Career Consultants & Academic Architects
            </h2>
            
            <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base font-semibold">
              Leverage the cumulative knowledge of our senior advisory committee. Our certified professionals possess native expertise across world class universities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Team member 1 */}
            <div className="bg-[#FAF8F4] dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/30 dark:border-slate-800 shadow-sm space-y-6">
              <div className="aspect-square w-full relative bg-slate-200 dark:bg-slate-800">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" 
                  alt="Mohammed Altaf Ahmed - Founder, Director"
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 space-y-2">
                <span className="text-2xs font-extrabold uppercase text-[#0047AB] dark:text-blue-400 font-mono tracking-wider">Founder, President</span>
                <h4 className="text-xl font-black text-slate-950 dark:text-white">Mohammed Altaf Ahmed</h4>
                <p className="text-xs text-slate-500 dark:text-slate-450 font-semibold">
                  Former Admissions Consultant at University of Amsterdam. Over 10 years of direct experience in European and UK student VISA policies.
                </p>
              </div>
            </div>

            {/* Team member 2 */}
            <div className="bg-[#FAF8F4] dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/30 dark:border-slate-800 shadow-sm space-y-6">
              <div className="aspect-square w-full relative bg-slate-200 dark:bg-slate-800 font-semibold">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400" 
                  alt="Dr. Kabir Sen - IELTS / Academic Coach"
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 space-y-2">
                <span className="text-2xs font-extrabold uppercase text-amber-600 dark:text-amber-400 font-mono tracking-wider">Admissions Dean</span>
                <h4 className="text-xl font-black text-slate-950 dark:text-white">Dr. Kabir Sen</h4>
                <p className="text-xs text-slate-500 dark:text-slate-450 font-semibold">
                  PhD in Comparative Philology. Expert in curriculum alignment and high-growth vocational opportunities in North American universities.
                </p>
              </div>
            </div>

            {/* Team member 3 */}
            <div className="bg-[#FAF8F4] dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/30 dark:border-slate-800 shadow-sm space-y-6">
              <div className="aspect-square w-full relative bg-slate-200 dark:bg-slate-800">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400" 
                  alt="Elena Rostova - European Pathway Lead"
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 space-y-2">
                <span className="text-2xs font-extrabold uppercase text-emerald-600 dark:text-emerald-400 font-mono tracking-wider">Pathway Director</span>
                <h4 className="text-xl font-black text-slate-950 dark:text-white">Elena Rostova</h4>
                <p className="text-xs text-slate-500 dark:text-slate-450 font-semibold">
                  Based in Berlin. Specializes in securing non-English tuition waivers and fast track blocked account setups across Germany and Schengen states.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Structured Informational Call-to-Action */}
      <section className="py-20 md:py-24 bg-gradient-to-r from-blue-900 to-indigo-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-950/20 z-0" />
        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 relative z-10 text-center space-y-8">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-amber-300 font-extrabold tracking-widest text-xs uppercase block font-mono">GET STARTED TODAY</span>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
              Begin Your Global Journey with Trusted Experts
            </h2>
            <p className="text-sm md:text-base text-slate-250 leading-relaxed font-medium">
              Don’t let complex administration tasks defer your dreams. Consult our verified <strong>Foreign Education Experts</strong> for the ultimate <strong>Study Abroad Counselling</strong> process.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={() => onBookCounselling("Strategic About Us request: Requesting standard university placement consult.")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 border border-amber-400/20 text-[#0c1a30] px-8 py-4 rounded-xl font-black text-base shadow-xl transition-all hover:-translate-y-0.5"
            >
              🚀 Talk to Our Counselor Free
            </button>
            <button
              onClick={onBack}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/45 bg-white/5 backdrop-blur-md text-white px-8 py-4 rounded-xl font-bold text-base transition-all hover:bg-white/10"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
