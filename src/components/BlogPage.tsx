import React, { useState } from "react";
import { 
  BookOpen, 
  Clock, 
  User, 
  ArrowLeft, 
  Share2, 
  ChevronRight, 
  FileText, 
  CheckSquare, 
  GraduationCap, 
  Award, 
  Calendar,
  Sparkles,
  Search,
  CheckCircle,
  HelpCircle
} from "lucide-react";

interface BlogPageProps {
  onBack: () => void;
  onBookCounselling: (details: string) => void;
}

interface Article {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl: string;
  keywordsUsed: string[];
  h1Title: string;
  sections: {
    h2: string;
    text: string;
    bullets?: string[];
  }[];
}

export default function BlogPage({ onBack, onBookCounselling }: BlogPageProps) {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const articles: Article[] = [
    {
      id: "after-12th",
      title: "How to Study Abroad after 12th: Complete Roadmap",
      excerpt: "A step-by-step framework on getting admitted to public and elite universities overseas right after completing your higher secondary schooling.",
      author: "Elena Rostova (Pathway Director)",
      date: "June 08, 2026",
      readTime: "7 min read",
      category: "Admissions",
      imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600",
      keywordsUsed: ["How to Study Abroad after 12th", "Study Abroad Requirements"],
      h1Title: "How to Study Abroad after 12th: The Complete Undergraduate Blueprint",
      sections: [
        {
          h2: "Understanding Your Options Immediately After Higher Secondary (12th Grade)",
          text: "Deciding to pursue a degree internationally right after your secondary boarding is an exemplary life-shaping venture. It allows you to align with industry requirements from day one. Investigating how to study abroad after 12th requires an early appraisal of your high school credits, financial budgets, and target languages.",
          bullets: [
            "Enroll in top-tier undergraduate courses in engineering, AI, business analytics, or arts.",
            "Gain automatic stay-back benefits in premium locations like Germany, UK, and Ireland.",
            "Develop native bilingual adaptation and make friends in global student corridors."
          ]
        },
        {
          h2: "The Essential Entrance Requirements for Young Prospective Students",
          text: "To clear the admissions boards, candidates must compile specific documents. The general study abroad requirements include complete high school transcripts, valid identity sheets, parent financial portfolios, and certified English language test sheets.",
          bullets: [
            "Completed 10th and 12th academic marksheets from accredited national boards.",
            "Certifications for standard tests like IELTS, TOEFL, or PTE based on country criteria.",
            "A comprehensive Statement of Purpose (SOP) declaring your academic motivations clearly.",
            "Valid passport and proof of sufficient funds to cover initial Tuition Deposits."
          ]
        },
        {
          h2: "Optimal Countries and Zero Tuition Options for High School Grads",
          text: "Did you know that you can access completely free education in public colleges across Germany and select European regions after 12th? The primary demand lies in passing language barriers or taking a foundational pathway year to match local board points.",
          bullets: [
            "Germany: High school grads can opt for Studienkolleg (foundation) followed by zero-tuition universities.",
            "United Kingdom: Comprehensive 3-year Honors undergraduate degrees with direct student track pathways.",
            "Canada: Dynamic 2 or 3-year Co-op diploma programs with extensive local industry placements."
          ]
        }
      ]
    },
    {
      id: "exams-required",
      title: "Exams Required to Study Abroad: Simple Strategy Guide",
      excerpt: "Unlock a master checklist comparing the passing score targets, fees, and parameters of key tests like IELTS, TOEFL, PTE, & Duolingo.",
      author: "Dr. Kabir Sen (Admissions Dean)",
      date: "May 24, 2026",
      readTime: "9 min read",
      category: "Test Prep",
      imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600",
      keywordsUsed: ["Exams Required to Study Abroad", "Exams Required to Study Abroad", "Study Abroad Requirements"],
      h1Title: "Top Exams Required to Study Abroad: A Comprehensive Entrance Guide",
      sections: [
        {
          h2: "Why English Language Assessment Tests are Non-Negotiable",
          text: "To obtain visas and lock seats, international students must establish structural literacy in the medium of instruction. Passing the standard exams required to study abroad validates your speaking, writing, listening, and reading metrics, ensuring zero friction in subsequent academic courses.",
          bullets: [
            "Fulfill strict immigration laws mandated by VFS and global embassies.",
            "Prove academic competence to elite university admissions committees.",
            "Enhance your prospects for merit-based financial aid allocations."
          ]
        },
        {
          h2: "Comparing Key Tests: IELTS, PTE, TOEFL, & Duolingo",
          text: "Each exam has unique advantages depending on your speed and comfort. When assessing the exams required to study abroad, review which evaluation is preferred by your target destination.",
          bullets: [
            "IELTS (Academic): Universally accepted. Target a minimum band score of 6.0 for undergraduates and 6.5 for masters applicants.",
            "PTE (Academic): Highly computerized. Standardized algorithm scoring makes it highly accurate and fast to process within 48 hours.",
            "TOEFL iBT: Heavily preferred in USA and elite tier computer labs. Total scale ranges out of 120 marks.",
            "Duolingo English Test: Highly cost-effective online evaluation, perfect for quick conditional offer clearances."
          ]
        },
        {
          h2: "How to Build a Reliable Test Prep Timeline",
          text: "Do not leave test preparation to the last minute. We advocate starting at least 12 weeks prior to submission to secure your targeted credentials easily. Ensure this step aligns with the primary study abroad requirements, allowing you to secure unconditional offer letters cleanly."
        }
      ]
    },
    {
      id: "requirements-portfolio",
      title: "The Comprehensive Study Abroad Requirements Directory",
      excerpt: "Ensure your dossier is 100% compliant before dispatching applications. Discover details about translations, tax letters, and SOP auditing.",
      author: "Mohammed Altaf Ahmed (Founder)",
      date: "April 18, 2026",
      readTime: "8 min read",
      category: "Admissions",
      imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600",
      keywordsUsed: ["Study Abroad Requirements", "Overseas Education Consultants"],
      h1Title: "Mastering the Essential Study Abroad Requirements for 2026 Admissions",
      sections: [
        {
          h2: "The Foundation of a Bulletproof Dossier Application",
          text: "Each year, millions of applications are parsed by global universities. To stand out, you must present a highly formatted file package that conforms perfectly with official study abroad requirements. Working with experienced overseas education consultants can help you identify subtle translation and credential errors before they cause delays.",
          bullets: [
            "Maintain high transcript eligibility: GPA of 2.8+ on a 4.0 scale is generally safe.",
            "Format your academic curriculum vitae (CV) based on local EuroPass or ATS formats.",
            "Submit identical name spellings across all academic and identification profiles."
          ]
        },
        {
          h2: "Perfecting the Written SOP & Letters of Recommendation",
          text: "Beyond grades, admissions boards seek to understand your voice. The Statement Of Purpose (SOP) is your chance to explain academic backlogs, career gaps, or sudden shifts in your educational path.",
          bullets: [
            "Write a clear, non-templated SOP detailing your post-graduation career ROI.",
            "Get at least two structured Letters of Recommendation (LOR) from senior high school/university teachers.",
            "Ensure copy-paste free content to strictly satisfy plagiarism checking guidelines."
          ]
        },
        {
          h2: "How Overseas Consultants Expedite admissions Letters",
          text: "By utilizing direct institutional partnerships, specialized advisors can speed up processing from months to days, while obtaining instant waivers for university processing fees. This helps secure seed reservations and visa scheduling slots ahead of standard queues."
        }
      ]
    },
    {
      id: "pre-departure-checklist",
      title: "Ultimate Study Abroad Checklist: Pre-Departure Manual",
      excerpt: "Never leave anything vital behind. Standard luggage configs, foreign currency forex cards, blocked portals, and biometric checklists explained.",
      author: "Elena Rostova (Pathway Director)",
      date: "March 12, 2026",
      readTime: "11 min read",
      category: "Resources",
      imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600",
      keywordsUsed: ["Study Abroad Checklist", "Study Abroad Requirements"],
      h1Title: "The Definitive Pre-Departure Study Abroad Checklist & Luggage Guide",
      sections: [
        {
          h2: "Your Solid Roadmap to Packing & Document Readiness",
          text: "Congratulations on securing your visa and booking your flights! To complete your landing smoothly, you must compile our high-value study abroad checklist. This checklist keeps your transit, customs clearance, and campus registration completely strain-free.",
          bullets: [
            "Organize matching physical and digital copies of your unconditional admission letter and fee receipts.",
            "Secure original passport, test preparation report sheets, and graduation degrees inside a handy pouch.",
            "Procure local biometric registration confirmations and visa sticker clearances before flying."
          ]
        },
        {
          h2: "Forex Cards & International Financial Preparations",
          text: "Changing money at busy airport kiosks can be expensive. We recommend setting up dedicated multi-currency student forex cards with zero transaction markup.",
          bullets: [
            "Pre-load currencies for immediate travel expenses and commute passes.",
            "Verify active local foreign blocked account numbers (e.g. Sperrkonto configuration in Germany).",
            "Carry between $200 and $500 in physical cash for emergency cash setups."
          ]
        },
        {
          h2: "Essential Student Gear & Packing Allocations",
          text: "Most global airlines offer generous study abroad programs with up to 40kg of free baggage allowance. Keep a proper balance of adaptive winter outerwear, critical medicine dossiers (with matching prescriptions), and necessary charging adapters so you can settle in comfortably from day one."
        }
      ]
    }
  ];

  const categories = ["all", "Admissions", "Test Prep", "Resources"];

  // Filter articles based on search query and category
  const filteredArticles = articles.filter((art) => {
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || art.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const selectedArticle = articles.find((art) => art.id === selectedArticleId);

  return (
    <div className="bg-[#FCFAF7] dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 transition-colors pb-16">
      
      {/* Blog Meta Title Header */}
      <div className="bg-gradient-to-r from-[#0047AB] via-blue-950 to-slate-900 text-white py-3 px-6 md:px-12 text-2xs md:text-xs font-mono border-b border-white/5 flex items-center justify-between">
        <span className="tracking-widest uppercase flex items-center gap-1.5 text-blue-300">
          <BookOpen className="h-4 w-4 text-amber-500" /> Meta Title: Exams Required to Study Abroad & Study Abroad Requirements - Blog Directory
        </span>
        <span className="hidden sm:inline text-slate-400 font-semibold font-mono">Dynamic Resource Library</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 pt-8">
        
        {/* Navigation Breadcrumb / Back button */}
        <div className="flex items-center justify-between mb-8 border-b border-gray-200/50 dark:border-slate-800 pb-4">
          <button
            onClick={selectedArticleId ? () => setSelectedArticleId(null) : onBack}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-[#0047AB] dark:hover:text-[#4a90e2] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>{selectedArticleId ? "Back to Article List" : "Back to Home"}</span>
          </button>
          
          {selectedArticleId && (
            <span className="text-2xs font-mono font-bold bg-[#0047AB]/10 text-[#0047AB] dark:bg-blue-900/30 dark:text-blue-300 px-3 py-1 rounded-full uppercase">
              Reading Mode Active
            </span>
          )}
        </div>

        {/* READER VIEW */}
        {selectedArticleId && selectedArticle ? (
          <article className="max-w-4xl mx-auto space-y-10 animate-fade-in">
            
            {/* Meta Attributes block */}
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1 text-xs font-extrabold uppercase tracking-widest text-[#0047AB] dark:text-blue-400">
                <Sparkles className="h-3 w-3 text-amber-500 animate-pulse" /> {selectedArticle.category}
              </span>

              {/* H1 Editorial Heading populated with requested seo keywords */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 dark:text-white leading-[1.15] tracking-tight">
                {selectedArticle.h1Title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 dark:text-slate-400 pt-2 border-b border-slate-200/50 dark:border-slate-800 pb-6">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-[#0047AB]/10 flex items-center justify-center text-[#0047AB] font-black uppercase text-xs">
                    {selectedArticle.author[0]}
                  </div>
                  <span className="font-bold text-slate-800 dark:text-white">{selectedArticle.author}</span>
                </div>
                <div className="flex items-center gap-1.5 font-semibold">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <span>{selectedArticle.date}</span>
                </div>
                <div className="flex items-center gap-1.5 font-semibold">
                  <Clock className="h-4 w-4 text-slate-400" />
                  <span>{selectedArticle.readTime}</span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="aspect-video w-full rounded-3xl overflow-hidden shadow-lg border border-slate-200/50 dark:border-slate-800 relative bg-slate-100 dark:bg-slate-900">
              <img 
                src={selectedArticle.imageUrl} 
                alt={selectedArticle.title} 
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Article Content populated with structured H2 & key-phrase repeats */}
            <div className="space-y-12 text-slate-700 dark:text-slate-350 leading-relaxed text-base sm:text-lg">
              
              {selectedArticle.sections.map((sec, i) => (
                <div key={i} className="space-y-4">
                  {/* H2 Title with SEO authority representation */}
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white mt-8 tracking-tight border-l-4 border-[#0047AB] pl-4">
                    {sec.h2}
                  </h2>
                  <p className="font-medium text-slate-700 dark:text-slate-300">
                    {sec.text}
                  </p>
                  
                  {sec.bullets && (
                    <ul className="space-y-3 pt-2 pl-2">
                      {sec.bullets.map((b, ptIdx) => (
                        <li key={ptIdx} className="flex items-start gap-3 text-sm sm:text-base font-semibold">
                          <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

            </div>

            {/* Call to Action Container inside blog */}
            <div className="p-8 sm:p-12 bg-[#F3ECE4] dark:bg-slate-900 rounded-3xl border border-slate-200/30 dark:border-slate-800 space-y-6 text-center shadow-sm">
              <span className="text-[#0047AB] dark:text-blue-400 text-xs font-mono font-extrabold uppercase tracking-widest block">Direct Student Admissions channels</span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
                Struggling with complex Study Abroad Requirements?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-semibold max-w-xl mx-auto">
                Our certified advisory board verifies tax accounts, blocked statements, language scores, and SOP transcripts to guarantee visa stamps. Connect with real experts.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
                <button
                  onClick={() => onBookCounselling(`Consult regarding: "${selectedArticle.title}"`)}
                  className="w-full sm:w-auto bg-[#0047AB] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-all cursor-pointer shadow-md"
                >
                  Book Priority Counselling Session
                </button>
                <button
                  onClick={() => setSelectedArticleId(null)}
                  className="w-full sm:w-auto border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-350 px-8 py-3.5 rounded-xl font-bold transition-all hover:bg-white/10"
                >
                  Read Other Articles
                </button>
              </div>
            </div>

          </article>
        ) : (
          
          /* EXPLORE BLOG DIRECTORY */
          <div className="space-y-12 animate-fade-in">
            
            {/* Header copy with optimized H1 */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-[#0047AB] dark:text-blue-400 font-extrabold tracking-widest text-xs uppercase block font-mono">Resource & Knowledge Hub</span>
              
              {/* Core H1 Title */}
              <h1 className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white leading-tight tracking-tight">
                Authentic <span className="bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-300">Study Abroad Guide</span> &amp; Requirements Manual
              </h1>
              
              <p className="text-xs sm:text-sm md:text-base text-slate-500 dark:text-slate-400 font-semibold max-w-2xl mx-auto">
                Equip yourself with verified entrance blueprints, exams require summaries, and pre-departure lists certified by professional <strong>Overseas Education Consultants</strong>.
              </p>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800 shadow-xs">
              {/* Category buttons */}
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer capitalize ${
                      selectedCategory === cat 
                        ? "bg-[#0047AB] text-white" 
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search query input */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search articles & guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 outline-none focus:border-[#0047AB]"
                />
              </div>
            </div>

            {/* Article Grid */}
            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredArticles.map((art) => (
                  <div 
                    key={art.id} 
                    onClick={() => {
                      setSelectedArticleId(art.id);
                      window.scrollTo(0,0);
                    }}
                    className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/40 dark:border-slate-800/80 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      {/* Thumbnail Container */}
                      <div className="aspect-video w-full relative bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <img 
                          src={art.imageUrl} 
                          alt={art.title} 
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-950/90 text-[#0047AB] dark:text-blue-300 text-3xs font-extrabold uppercase px-3 py-1.5 rounded-full shadow-xs tracking-widest font-mono">
                          {art.category}
                        </div>
                      </div>

                      <div className="p-6 space-y-3">
                        <div className="flex items-center gap-3 text-2xs text-slate-400 font-mono font-bold">
                          <span>{art.date}</span>
                          <span>•</span>
                          <span>{art.readTime}</span>
                        </div>
                        <h3 className="text-xl font-black text-slate-950 dark:text-white group-hover:text-[#0047AB] dark:group-hover:text-blue-400 transition-colors">
                          {art.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 font-semibold leading-relaxed">
                          {art.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-slate-100/50 dark:border-slate-800/40 mt-4 text-xs font-extrabold text-[#0047AB] dark:text-blue-400">
                      <span className="flex items-center gap-1.5 font-sans">
                        Read full guide <ChevronRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <span className="text-4xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-1 rounded-sm">
                        RESOURCES
                      </span>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/50 dark:border-slate-800">
                <HelpCircle className="h-12 w-12 text-slate-300 dark:text-slate-750 mx-auto mb-4 animate-bounce" />
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">No articles matched your criteria</h3>
                <p className="text-xs text-slate-400 mt-2 font-semibold">Try modifying your search text or selecting another category.</p>
              </div>
            )}

            {/* Quick Consultation Block */}
            <div className="pt-8 flex flex-col md:flex-row items-center gap-6 justify-between bg-gradient-to-r from-blue-950 to-slate-950 p-8 sm:p-12 rounded-3xl text-white">
              <div className="space-y-2 max-w-xl">
                <span className="text-amber-400 text-2xs uppercase tracking-widest font-extrabold block font-mono">Expert Verification Panel</span>
                <h4 className="text-xl sm:text-2xl font-black">Want a customized Study Abroad Checklist for your profiles?</h4>
                <p className="text-2xs sm:text-xs text-slate-400 font-semibold leading-relaxed">
                  We verify high-school records, degrees, sponsors, and language requirements to establish full eligibility indexes on matching universities.
                </p>
              </div>
              <button
                onClick={() => onBookCounselling("Strategic Checklist request: Requesting standard country requirements verification.")}
                className="w-full md:w-auto shrink-0 bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider py-4 px-8 rounded-xl transition-all shadow-lg active:scale-95 cursor-pointer"
              >
                Get Custom Checklist free
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
