import React, { useState } from "react";
import { 
  Search, 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  Tag, 
  ArrowLeft, 
  Share2, 
  ThumbsUp, 
  Bookmark, 
  BookmarkCheck,
  Flame,
  Globe,
  Award,
  BookOpen,
  FileCheck
} from "lucide-react";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: "Visa Updates" | "Scholarships" | "University News" | "Student Guides";
  image: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  featured?: boolean;
  shares: number;
  likes: number;
  tags: string[];
}

const ARTICLES_DATA: Article[] = [
  {
    id: "art-1",
    title: "Major Canada Study Permit Changes for 2026 Admissions",
    excerpt: "The Canadian IRCC recently updated provincial attestation rules and intake caps. Learn how this impacts your upcoming September 2026 intake applications and GIC account calculations.",
    content: `International student regulations for Canada have seen significant updates heading into the academic year of 2025/2026. The Immigration, Refugees and Citizenship Canada (IRCC) has introduced concrete guidelines aimed at sustainable intake and high-quality, authentic educational opportunities.

### Key Takeaways of the 2026 Guidelines:
1. **Provincial Attestation Letters (PALs):** Virtually all undergraduate applicants now require a PAL from their designated learning institution's province before submission. Career Wings takes care of this documentation pathway completely.
2. **Revised GIC (Guaranteed Investment Certificate) Requirements:** The cost-of-living financial threshold has been structured to ensure students are well-supported. The GIC amount stands adjusted to align with current realistic living indexes.
3. **Post-Graduation Work Permit (PGWP) Adjustments:** Graduates of master's programs and selective professional courses remain highly prioritized for longer post-graduation opportunities, whereas specific college-level curriculum standards are tighter.

### Expert Advice of Career Wings Consultants:
"Do not panic. While the criteria are more specific, this actually benefits authentic candidates. It eliminates sub-standard academic institutions from the ecosystem, making sure that your degrees from accredited Canadian universities possess immense global value and clear career growth streams."`,
    category: "Visa Updates",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
    date: "June 02, 2026",
    readTime: "5 min read",
    author: {
      name: "Sandeep Malhotra",
      role: "Lead Canada Immigration Advisor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
    },
    featured: true,
    shares: 245,
    likes: 382,
    tags: ["Canada", "Visa Rules", "IRCC", "Study Permit"]
  },
  {
    id: "art-2",
    title: "UK High Potential Individual (HPI) Visa & 100% Academic Scholarships Opened",
    excerpt: "Top Russell Group universities have announced their private foundation scholarships for meritorious South Asian applicants. Discover application requirements.",
    content: `Great news for prospective UK students: a coalition of prestigious Russell Group institutions, partnered with Career Wings Consultants, has unlocked brand new merit-based scholarship funds targeting exceptional international applicants for the upcoming semester.

### Eligibility Criteria for 100% Scholarship Waivers:
* Minimum academic GPA equivalents of 3.7 or higher in senior secondary/bachelor curriculums.
* Demonstrated community involvement or technical projects documented in a 500-word SOP.
* Valid IELTS score above 7.0 overall band, or equivalent test scores.

### High Potential Individual (HPI) Pathway updates:
The HPI visa route remains a lucrative bridge for students graduated from the top 50 global rankings to relocate and establish careers directly within the UK corporate circle. Our team is providing mock interview sessions specifically customized for UK university panels and UKVI immigration audits.`,
    category: "Scholarships",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
    date: "May 29, 2026",
    readTime: "4 min read",
    author: {
      name: "Fiona Sterling",
      role: "Senior Scholar Negotiator",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=120"
    },
    shares: 119,
    likes: 247,
    tags: ["UK", "Scholarships", "Oxbridge Pathways", "Russell Group"]
  },
  {
    id: "art-3",
    title: "How to Ace the Destination Germany: No Tuition Fees, Absolute English Pathways",
    excerpt: "With public universities in Germany offering zero tuition fees, the competition is fierce. Here are 5 crucial secrets to secure your public admission invite.",
    content: `Germany continues to lead as a master destination for highly ambitious technical and business minds. The primary appeal: world-class state-funded public research universities that charge €0 tuition fees, coupled with a generous 18-month job seeker visa post-graduation.

### Latest Rules & Admission Highlights for German Universities:
1. **Mandatory APS Verification:** All applicants with degrees from India, China, or Vietnam must obtain an APS Certificate prior to student visa filing.
2. **Updated Sperrkonto (Blocked Account) Requirement:** The federally mandated living expense deposit stands at €11,904 per year (€992/month release).
3. **Enhanced Part-Time Work Allowance:** International students can now legally work up to 140 full days or 280 half days per calendar year (up from 120 days).
4. **Opportunity Card (Chancenkarte):** Germany has launched the points-based Opportunity Card, enabling skilled graduates to reside and work up to one year to secure qualified employment.`,
    category: "Student Guides",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=800",
    date: "May 25, 2026",
    readTime: "7 min read",
    author: {
      name: "Dr. Albert Voss",
      role: "Advisor for European Relations",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120"
    },
    shares: 89,
    likes: 198,
    tags: ["Germany", "Free Tuition", "Europe Pathway", "APS Certificate"]
  },
  {
    id: "art-4",
    title: "USA F-1 Visa Process: Master the Most Common Mock Interview Questions",
    excerpt: "The US student visa interview is conversational but highly decisive. Study the exact responses our students used to clear their F-1 visas on the spot.",
    content: `Passing the F-1 student visa interview is the ultimate key to stepping inside physical campuses in New York, Boston, or Silicon Valley. Unlike other countries where visa documentation is reviewed in silence, the United States requires a real-time, face-to-face rapid interview.

### The Core Pillars of F-1 Interview Success:
* **Academic Readiness:** Clearly state why you chose this specific course, and why it is not available in your home country.
* **Financial Credibility:** Be clear on who is sponsoring your tuition, and maintain absolute transparency during active asset checks.
* **Ties to Home Country:** Clearly articulate how this program fits your long-term career returns to India/South Asia.

Our immigration mock chambers run automated question loops every Tuesday. Participate in simulated environments mimicking consular protocols to eliminate all nervousness.`,
    category: "Visa Updates",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
    date: "May 20, 2026",
    readTime: "6 min read",
    author: {
      name: "Jessica Vance",
      role: "Ex-Visa Compliance Specialist",
      avatar: "https://images.unsplash.com/photo-1554780336-390462301acf?auto=format&fit=crop&q=80&w=120"
    },
    shares: 412,
    likes: 567,
    tags: ["USA", "F1 Visa", "Mock Interview", "Consular Tips"]
  },
  {
    id: "art-5",
    title: "Australia Post-Study Work Stream (Subclass 485) Rules Restructured",
    excerpt: "The Australian Department of Home Affairs announces updated age limits and degree qualification lists for extended post-study work privileges.",
    content: `Australia has restructured its international student visa (Subclass 500) and Temporary Graduate visa (Subclass 485) framework with rigorous focus on high-quality academic delivery and labor market alignment.

### Essential Regulatory Updates:
1. **Genuine Student (GS) Requirement:** The old Genuine Temporary Entrant (GTE) statement is replaced by the Genuine Student (GS) assessment with targeted questions testing course relevance, realistic career benefits, and domestic ties.
2. **Subclass 485 Stream Duration & Age Cap:** The maximum eligible age for the Post-Higher Education Work stream is now 35 years (retained up to 50 for research Masters and PhD graduates). Stay periods are: 2 years for Bachelor graduates, 2 years for Master (coursework), 3 years for Master (research) / PhD, plus 1-2 years extra for regional campus study.
3. **Proof of Financial Capacity:** International applicants must provide verifiable evidence of AUD $29,710 in annual living costs.
4. **English Language Proficiency:** Minimum IELTS requirement is 6.0 overall for Subclass 500 student visas and 6.5 for Subclass 485 post-study visas.`,
    category: "University News",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200",
    date: "May 18, 2026",
    readTime: "5 min read",
    author: {
      name: "Marcus Avery",
      role: "Australia Careers Dean",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
    },
    shares: 301,
    likes: 412,
    tags: ["Australia", "485 Visa", "Regional Study", "CRICOS"]
  },
  {
    id: "art-6",
    title: "UK Higher Education & Visa Framework: Graduate Route & Dependent Rules",
    excerpt: "The UK Home Office clarifies international student guidelines: 2-year Graduate Route retained, updated dependent regulations, and increased maintenance funds.",
    content: `The UK continues to be a top destination for international scholars pursuing fast-track 1-Year Master's and 3-Year Bachelor's degrees from prestigious Russell Group universities.

### Crucial Regulatory Highlights:
1. **Retention of the Graduate Route:** The UK Government has officially confirmed the continuation of the 2-Year Graduate Route (3 years for PhD), providing unrestricted post-study work authorization across the UK economy.
2. **Dependent Visa Regulations:** International students enrolled on taught postgraduate Master's courses are no longer permitted to bring family dependents. Only students on research-led postgraduate programs (PhD/MPhil) or government-sponsored scholarships may sponsor dependents.
3. **Updated Maintenance Financial Thresholds:** Monthly maintenance requirements stand at £1,483 per month in London (up to 9 months = £13,347) and £1,136 per month outside London (up to 9 months = £10,224).
4. **Course Completion Switching Rule:** Students cannot switch to a Skilled Worker visa until they have formally completed their course of study, safeguarding authentic academic progression.`,
    category: "Visa Updates",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=1200",
    date: "June 05, 2026",
    readTime: "6 min read",
    author: {
      name: "Victoria Sterling",
      role: "Senior UK Education Strategist",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120"
    },
    shares: 419,
    likes: 530,
    tags: ["UK", "Graduate Route", "Home Office", "Russell Group"]
  }
];

const getCountryFlag = (tags: string[], title: string): string => {
  const text = (title + " " + tags.join(" ")).toLowerCase();
  if (text.includes("canada")) return "🇨🇦";
  if (text.includes("uk") || text.includes("united kingdom") || text.includes("london") || text.includes("russell group") || text.includes("hpi")) return "🇬🇧";
  if (text.includes("germany") || text.includes("german")) return "🇩🇪";
  if (text.includes("usa") || text.includes("united states") || text.includes("america") || text.includes("f-1") || text.includes("f1")) return "🇺🇸";
  if (text.includes("australia") || text.includes("cricos") || text.includes("sydney")) return "🇦🇺";
  return "🌐"; // Global fallback
};

export default function NewsArticlesPage({
  onBack,
  onBookCounselling
}: {
  onBack: () => void;
  onBookCounselling: (details: string) => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [likesState, setLikesState] = useState<Record<string, { count: number; active: boolean }>>({});
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  // Search & Filter
  const categories = ["All", "Visa Updates", "Scholarships", "University News", "Student Guides"];

  const filteredArticles = ARTICLES_DATA.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticle = ARTICLES_DATA.find(a => a.featured && (selectedCategory === "All" || a.category === selectedCategory)) || filteredArticles[0];

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikesState(prev => {
      const state = prev[id] || { count: ARTICLES_DATA.find(a => a.id === id)?.likes || 150, active: false };
      return {
        ...prev,
        [id]: {
          count: state.active ? state.count - 1 : state.count + 1,
          active: !state.active
        }
      };
    });
  };

  const handleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(bId => bId !== id) : [...prev, id]
    );
  };

  return (
    <div className="py-8 bg-slate-50 dark:bg-slate-950 transition-colors min-h-screen font-sans">
      <div className="container mx-auto px-4 max-w-6xl space-y-8">
        
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-slate-800 pb-6">
          <div className="space-y-1">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#0047AB] dark:text-slate-400 dark:hover:text-blue-400 transition-colors bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 px-3 py-1.5 rounded-lg cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
            </button>
            <h1 className="text-3xl font-black text-gray-955 dark:text-white flex items-center gap-2 pt-2">
              <Flame className="h-7 w-7 text-orange-500" /> Career Wings Consultants - Study Abroad Consultants &amp; Best Visa Agency News
            </h1>
            <p className="text-sm font-semibold text-gray-500 dark:text-slate-400">
              Verified study abroad announcements, visa reforms, and expert counsel. Career Wings Consultants is your verified Study Abroad Consultants and Best Visa Agency for guaranteed entry and high-acceptance visa filings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles, countries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-[#0047AB] dark:focus:border-blue-500 transition-colors text-gray-800 dark:text-white font-medium"
              />
            </div>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {categories.map((cat) => {
            let catIcon = <Globe className="h-3.5 w-3.5" />;
            if (cat === "Visa Updates") catIcon = <FileCheck className="h-3.5 w-3.5" />;
            if (cat === "Scholarships") catIcon = <Award className="h-3.5 w-3.5" />;
            if (cat === "Student Guides") catIcon = <BookOpen className="h-3.5 w-3.5" />;
            
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap border ${
                  selectedCategory === cat 
                    ? "bg-[#0047AB] border-[#0047AB] text-white shadow-md shadow-blue-600/10" 
                    : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 dark:bg-slate-900 dark:border-slate-850 dark:text-slate-300"
                }`}
              >
                {catIcon}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Featured Card */}
        {featuredArticle && searchQuery === "" && (
          <div 
            onClick={() => setSelectedArticle(featuredArticle)}
            className="group relative bg-white dark:bg-slate-900 rounded-[28px] overflow-hidden border border-gray-150 dark:border-slate-850/70 shadow-lg hover:shadow-xl transition-all cursor-pointer grid grid-cols-1 md:grid-cols-12 gap-0"
          >
            <div className="md:col-span-6 relative h-64 md:h-auto min-h-[300px] overflow-hidden">
              <img 
                src={featuredArticle.image} 
                alt={featuredArticle.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" 
              />
              <div className="absolute top-4 left-4 bg-[#0047AB] text-white font-extrabold text-[10px] tracking-wider uppercase px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md">
                <Flame className="h-3 w-3 text-amber-300 animate-pulse" /> TRENDING ARTICLE
              </div>
            </div>
            
            <div className="md:col-span-6 p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs font-extrabold text-blue-600 dark:text-blue-400 tracking-wider uppercase">
                  <Tag className="h-3.5 w-3.5" />
                  <span>{featuredArticle.category}</span>
                  <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-2 py-0.5 rounded text-xs flex items-center gap-1 font-sans font-extrabold">
                    {getCountryFlag(featuredArticle.tags, featuredArticle.title)} Country News
                  </span>
                  <span className="text-gray-300 dark:text-slate-700">•</span>
                  <span className="flex items-center gap-1 font-semibold text-gray-500"><Clock className="h-3 w-3" /> {featuredArticle.readTime}</span>
                </div>
                
                <h3 className="text-xl sm:text-2.5xl font-black text-gray-900 dark:text-white group-hover:text-[#0047AB] dark:group-hover:text-blue-400 transition-colors leading-snug">
                  {featuredArticle.title}
                </h3>
                
                <p className="text-gray-500 dark:text-slate-350 text-sm leading-relaxed font-semibold">
                  {featuredArticle.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {featuredArticle.tags.map(t => (
                    <span key={t} className="bg-slate-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 text-[10px] font-bold px-2 py-1 rounded-md">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between border-t border-gray-100 dark:border-slate-800/80 pt-4">
                <div className="flex items-center gap-3">
                  <img 
                    src={featuredArticle.author.avatar} 
                    alt={featuredArticle.author.name}
                    className="h-10 w-10 rounded-full border border-gray-200 dark:border-slate-700 object-cover" 
                  />
                  <div>
                    <h5 className="text-xs font-extrabold text-gray-800 dark:text-white">{featuredArticle.author.name}</h5>
                    <p className="text-[10px] text-gray-500 font-semibold">{featuredArticle.author.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => handleLike(featuredArticle.id, e)}
                    className={`p-2 rounded-full transition-colors flex items-center gap-1 text-xs font-bold ${
                      likesState[featuredArticle.id]?.active 
                        ? "bg-red-50 text-red-500" 
                        : "bg-slate-100 hover:bg-slate-200 text-gray-500 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    <ThumbsUp className="h-3.5 w-3.5 fill-current" />
                    <span>{likesState[featuredArticle.id]?.count ?? featuredArticle.likes}</span>
                  </button>
                  <button 
                    onClick={(e) => handleBookmark(featuredArticle.id, e)}
                    className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-gray-500 dark:bg-slate-800 dark:text-slate-300 transition-colors"
                  >
                    {bookmarks.includes(featuredArticle.id) ? (
                      <BookmarkCheck className="h-3.5 w-3.5 text-blue-600" />
                    ) : (
                      <Bookmark className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular list grid */}
        <div className="space-y-4">
          <h4 className="text-xl font-extrabold text-gray-900 dark:text-white pt-4">
            {selectedCategory === "All" ? "All General Feed" : `Guides in ${selectedCategory}`}
          </h4>
          
          {filteredArticles.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800 px-6 py-12 rounded-[24px] text-center space-y-3">
              <p className="text-gray-400 dark:text-slate-500 text-sm font-semibold">No active student news articles found matching your parameters.</p>
              <button 
                onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                className="text-[#0047AB] dark:text-blue-400 text-xs font-extrabold hover:underline"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.filter(a => a.id !== (searchQuery === "" ? featuredArticle?.id : null)).map((art) => (
                <div 
                  key={art.id}
                  onClick={() => setSelectedArticle(art)}
                  className="group bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-850/50 rounded-2xl overflow-hidden hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-48 w-full overflow-hidden">
                      <img 
                        src={art.image} 
                        alt={art.title} 
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                      />
                      <span className="absolute top-3 left-3 bg-white/95 dark:bg-slate-950/95 text-[#0047AB] dark:text-blue-400 text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1">
                        <span>{getCountryFlag(art.tags, art.title)}</span>
                        <span>{art.category}</span>
                      </span>
                    </div>
                    
                    <div className="p-5 space-y-3">
                      <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400">
                        <Calendar className="h-3 w-3" />
                        <span>{art.date}</span>
                        <span>•</span>
                        <span>{art.readTime}</span>
                      </div>
                      
                      <h5 className="font-extrabold text-base text-gray-900 dark:text-white group-hover:text-[#0047AB] dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug flex items-start gap-1.5">
                        <span className="shrink-0">{getCountryFlag(art.tags, art.title)}</span>
                        <span>{art.title}</span>
                      </h5>
                      
                      <p className="text-gray-500 dark:text-slate-350 text-xs font-medium line-clamp-3 leading-relaxed">
                        {art.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-gray-50 dark:border-slate-800/50 mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img 
                        src={art.author.avatar} 
                        alt={art.author.name}
                        className="h-7 w-7 rounded-full border border-gray-100 object-cover" 
                      />
                      <span className="text-[11px] font-extrabold text-gray-700 dark:text-slate-350">{art.author.name}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button 
                        onClick={(e) => handleLike(art.id, e)}
                        className={`p-1.5 rounded-full text-[11px] font-bold flex items-center gap-1 ${
                          likesState[art.id]?.active ? "text-red-500" : "text-gray-400 hover:text-gray-600"
                        }`}
                      >
                        <ThumbsUp className="h-3 w-3" />
                        <span>{likesState[art.id]?.count ?? art.likes}</span>
                      </button>
                      <button 
                        onClick={(e) => handleBookmark(art.id, e)}
                        className="p-1.5 rounded-full text-gray-400 hover:text-gray-600"
                      >
                        {bookmarks.includes(art.id) ? (
                          <BookmarkCheck className="h-3.5 w-3.5 text-blue-600" />
                        ) : (
                          <Bookmark className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Dynamic Interactive Call to Action - Join Community / Talk to Advisor */}
        <div className="bg-gradient-to-r from-[#0047AB] to-[#155dfc] text-white rounded-[32px] p-8 md:p-12 shadow-xl border border-blue-400/20 text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex bg-white/10 px-4 py-1.5 rounded-full text-xs font-bold gap-1 mt-2">
            🚀 Direct Connection
          </div>
          <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight max-w-2xl mx-auto leading-tight">
            Want to apply directly for the 100% Scholarship slots?
          </h3>
          <p className="opacity-90 max-w-xl mx-auto text-sm sm:text-base font-medium">
            Join other applicants already sorting their documents with our priority advisors. We file entries in real-time.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={() => onBookCounselling("Requested admission and scholarship advice from news feed")}
              className="bg-white text-[#0047AB] font-black px-8 py-3 rounded-xl hover:bg-amber-100 hover:shadow-lg transition-all scale-[1.02] hover:scale-[1.04] cursor-pointer text-sm"
            >
              Start Free Application Process
            </button>
          </div>
        </div>
      </div>

      {/* Article Detail Dialogue/Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-[28px] max-w-3xl w-full max-h-[85vh] overflow-y-auto border border-gray-100 dark:border-slate-800 shadow-2xl flex flex-col justify-between">
            {/* Modal Header Image */}
            <div className="relative h-60 w-full flex-shrink-0">
              <img 
                src={selectedArticle.image} 
                alt={selectedArticle.title}
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white rounded-full p-2"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                <span className="text-[10px] font-extrabold uppercase bg-amber-400 text-gray-900 px-2.5 py-1 rounded-md flex items-center w-fit gap-1">
                  <span>{getCountryFlag(selectedArticle.tags, selectedArticle.title)}</span>
                  <span>{selectedArticle.category}</span>
                </span>
                <h4 className="text-lg sm:text-2xl font-black pt-2 leading-tight drop-shadow">
                  {selectedArticle.title}
                </h4>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8 space-y-6">
              {/* Author & Stats */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 dark:border-slate-850 pb-4">
                <div className="flex items-center gap-3">
                  <img 
                    src={selectedArticle.author.avatar} 
                    alt={selectedArticle.author.name}
                    className="h-11 w-11 rounded-full object-cover border border-gray-200" 
                  />
                  <div>
                    <h5 className="text-xs font-bold text-gray-800 dark:text-white">{selectedArticle.author.name}</h5>
                    <p className="text-[10px] text-gray-500 font-medium">{selectedArticle.author.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs font-bold text-gray-400">
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {selectedArticle.date}</span>
                  <span className="text-gray-300">•</span>
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {selectedArticle.readTime}</span>
                </div>
              </div>

              {/* Long Content body */}
              <div className="text-sm md:text-base text-gray-700 dark:text-slate-200 space-y-4 font-medium leading-relaxed whitespace-pre-line">
                {selectedArticle.content}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {selectedArticle.tags.map(t => (
                  <span key={t} className="bg-blue-50 dark:bg-slate-800/80 text-blue-600 dark:text-blue-300 text-xs font-bold px-3 py-1 rounded-lg">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="p-6 bg-slate-50 dark:bg-slate-900/40 border-t border-gray-100 dark:border-slate-850/60 rounded-b-[28px] flex flex-wrap gap-4 items-center justify-between">
              <div className="flex items-center gap-2">
                <button 
                  onClick={(e) => handleLike(selectedArticle.id, e)}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all ${
                    likesState[selectedArticle.id]?.active 
                      ? "bg-red-50 text-red-500 border border-red-200" 
                      : "bg-white dark:bg-slate-800 text-gray-600 dark:text-slate-350 hover:bg-gray-150 border border-gray-200 dark:border-slate-700"
                  }`}
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>Like Article ({likesState[selectedArticle.id]?.count ?? selectedArticle.likes})</span>
                </button>
                <button 
                  onClick={(e) => handleBookmark(selectedArticle.id, e)}
                  className="p-2.5 rounded-xl bg-white dark:bg-slate-800 text-gray-500 border border-gray-200 dark:border-slate-700 transition-colors hover:bg-gray-100"
                >
                  {bookmarks.includes(selectedArticle.id) ? (
                    <BookmarkCheck className="h-4.5 w-4.5 text-blue-600" />
                  ) : (
                    <Bookmark className="h-4.5 w-4.5" />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  className="text-gray-500 hover:bg-gray-100 hover:text-gray-700 font-extrabold text-xs px-4 py-2.5 rounded-xl cursor-pointer"
                >
                  Dismiss
                </button>
                <button
                  onClick={() => {
                    setSelectedArticle(null);
                    onBookCounselling(`Inquiry for scholarship or advice based on article: "${selectedArticle.title}"`);
                  }}
                  className="bg-[#0047AB] dark:bg-blue-600 text-white font-extrabold text-xs px-6 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-blue-600/10 hover:bg-blue-700 cursor-pointer"
                >
                  Contact Author <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

const X = ({ className }: { className: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
  </svg>
);
