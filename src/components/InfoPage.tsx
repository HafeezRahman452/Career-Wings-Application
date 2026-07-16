import React, { useState } from "react";
import { 
  ArrowLeft, 
  Calendar, 
  CheckCircle, 
  FileText, 
  ShieldAlert, 
  Award, 
  Compass, 
  DollarSign, 
  GraduationCap, 
  Globe2, 
  HelpCircle, 
  FileCheck, 
  Users, 
  BookOpen, 
  Heart,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Clock,
  Briefcase,
  Plane,
  Building,
  Target,
  ChevronDown,
  ChevronUp,
  Info
} from "lucide-react";

interface InfoPageProps {
  pageType: string;
  onBack: () => void;
  onBookCounselling: (details: string) => void;
  setCurrentTab: (tab: string) => void;
}

export default function InfoPage({ pageType, onBack, onBookCounselling, setCurrentTab }: InfoPageProps) {
  // Assessment Tool State
  const [assessmentStep, setAssessmentStep] = useState(1);
  const [gpa, setGpa] = useState("3.5");
  const [ielts, setIelts] = useState("6.5");
  const [budget, setBudget] = useState("medium");
  const [interest, setInterest] = useState("CS & AI");
  const [assessmentResult, setAssessmentResult] = useState<string | null>(null);

  // Loan Calculator State
  const [loanAmount, setLoanAmount] = useState<number>(20000);
  const [interestRate, setInterestRate] = useState<number>(7.5);
  const [loanTenure, setLoanTenure] = useState<number>(10);

  // Quick Appointment form state
  const [aptDate, setAptDate] = useState("");
  const [aptTime, setAptTime] = useState("10:00 AM");
  const [aptSlot, setAptSlot] = useState("");
  const [aptSubmitted, setAptSubmitted] = useState(false);

  // News Category State
  const [activeNewsCategory, setActiveNewsCategory] = useState("all");

  // Accordion FAQ state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    const eligibility = parseFloat(gpa) >= 3.0 && parseFloat(ielts) >= 6.0;
    if (eligibility) {
      setAssessmentResult(`Congratulations! Based on your GPA of ${gpa} and ${ielts} IELTS score, you qualify for top-tier universities in Europe, UK, and Canada with potential 15% - 40% scholarship allocations. Let's schedule a study abroad counseling session!`);
    } else {
      setAssessmentResult(`Good effort! You may need to take a pre-sessional English program or choose flexible entry colleges in Europe/Canada. Excellent career outcomes are still highly accessible!`);
    }
  };

  const calculateMonthlyEMI = () => {
    const principal = loanAmount;
    const ratePerMonth = (interestRate / 100) / 12;
    const totalMonths = loanTenure * 12;
    const emi = (principal * ratePerMonth * Math.pow(1 + ratePerMonth, totalMonths)) / (Math.pow(1 + ratePerMonth, totalMonths) - 1);
    return isNaN(emi) ? "0.00" : emi.toFixed(2);
  };

  // Elaborate Rich Page Content Database with H1, H2, H3, H4 structure, Unsplash image, custom bullet points, and specific FAQs
  const getPageContent = () => {
    switch (pageType) {
      case "student_news":
        return {
          title: "Global Student News & Regulatory Updates",
          h1: "Latest Global Student Visa News and Regulatory Updates",
          tagline: "Stay updated on international student visas, work allowance modifications, and major intake deadlines.",
          icon: <BookOpen className="h-8 w-8 text-blue-600" />,
          bgColor: "bg-blue-50/50",
          imageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800",
          introParagraph: "Keeping track of visa changes and policy shifts is critical for an unhindered study abroad journey. Major international education corridors including the Schengen Zone, Ireland, Germany, United Kingdom, and Canada frequently update their work regulations, stay-back durations, and minimum cost of living parameters. See current essential updates certified by Career Wings study abroad consultants.",
          sections: [
            {
              h2: "1. Europe Expands Post-Study Work Permits for Tech Graduates",
              h3: "High-Skilled Talent Retention Initiatives",
              h4: "Germany & France Leading Policy Changes",
              text: "In a landmark decision, several European Schengen countries have increased their standard stay-back job search visa durations to 24 months. Over 15,000 English-taught programs are participating with zero-tuition rules to retain skilled computer science, biotech, and engineering graduates.",
              list: [
                "24-Month Stay Back extension for tech degree holders.",
                "Schengen-wide job search flexibility with single permit entry.",
                "Fast-track PR options after 2 years of local employment."
              ]
            },
            {
              h2: "2. Fast-Track Student Pass Portal Updates in the EU",
              h3: "Digital Biomertic Verification Rollout",
              h4: "Embassy Appointment Bottlenecks Solved",
              text: "The national educational portals have migrated to an instant digital biometric verification method. Processing times are officially expected to plunge from 6 weeks to only 12 business days, solving embassy queues.",
              list: [
                "100% digital validation of transcript and letter assets.",
                "Prioritized queue allocation for verified IELTS/PTE certificate holders."
              ]
            },
            {
              h2: "3. Major Scholarship Intakes Extended for Fall 2026",
              h3: "Financial Aid Pipelines & Grants Expansion",
              h4: "Undergraduate and Masters Allocations",
              text: "To assist prospective candidates looking for funding options, top associate institutions across Germany, France, Ireland, and Canada have pushed back their deadline dates to July 31, 2026. Subsidies range from 20% partial scholarships to complete 100% tuition waivers.",
              list: [
                "Extended application deadline to July 31, 2026.",
                "Auto-consideration for merit grants upon portal submission."
              ]
            }
          ],
          faqs: [
            { q: "Is IELTS mandatory for European student visas?", a: "While many top universities participate in English medium waivers if your prior education was completed entirely in English, some embassies require IELTS/PTE to process visa applications. We recommend checking specific country protocols with our directors." },
            { q: "Are part-time work limits impacted by recent 2026 reforms?", a: "No, standard European and Irish policy permits students to work up to 20 hours per week during term time and up to 40 hours during official university breaks." },
            { q: "Can I transition from student status to a work permit immediately?", a: "Yes. Upon securing a professional employment offer meeting specific salary thresholds, you can transition inside the country via the simplified local immigration portals." }
          ]
        };

      case "free_appointment":
        return {
          title: "Book Your VIP Counseling & Evaluation Slot",
          h1: "Schedule a High-Value Study Abroad Counseling Appointment",
          tagline: "Schedule a high-value assessment with our senior academic directors in person or via direct secured video link.",
          icon: <Calendar className="h-8 w-8 text-[#0047AB]" />,
          bgColor: "bg-blue-50/50",
          imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
          introParagraph: "At Career Wings Consultants, we help transform global study dreams into highly practical structured pathways. Secure your professional counselor slot to map your previous academic transcripts, test preparation plans, budget restrictions, and career aspirations into highly rated institutions worldwide.",
          sections: [
            {
              h2: "Why Choose a VIP Counseling Slot with Career Wings?",
              h3: "One-on-One Personalized Dossier Evaluation",
              h4: "Direct Representation with 500+ Partner Colleges",
              text: "Our counseling is entirely personalized. Rather than generic advice, senior directors assess your actual background and recommend high-ROI courses in tech, management, hospitality, or sciences that match study post-graduation work opportunities.",
              list: [
                "Thorough credit evaluation of prior transcripts.",
                "Optimal scholarship alignment and tuition matching.",
                "Step-by-step guidance on English language test requirements.",
                "Zero application agency margins."
              ]
            }
          ],
          faqs: [
            { q: "Are there any service charges for the VIP coaching and counseling sessions?", a: "All initial diagnostic counseling, credit evaluations, and country matching reviews at Career Wings are 100% free of charge." },
            { q: "What documents should I prepare for my counseling appointment?", a: "Please upload or bring your high school or undergraduate transcripts, resume, and any IELTS, PTE, or GRE scores if currently available." },
            { q: "Can my parents participate in the counseling session?", a: "Absolutely. We encourage parents and sponsors to participate in-person or via zoom video links to discuss financial portfolios and security protocols." }
          ]
        };

      case "personalized_profile_assessment":
        return {
          title: "Personalized Profile Assessment & Compatibility Diagnostic",
          h1: "Personalized Study Abroad Profile Assessment for Aspiring Candidates",
          tagline: "Analyze your high-school or university transcript scores against optimal QS-ranked colleges.",
          icon: <Compass className="h-8 w-8 text-purple-600" />,
          bgColor: "bg-purple-50/50",
          imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
          introParagraph: "Your academic blueprint is the single most critical asset in deciding entrance rates at top-tier international universities. This diagnostic assessment correlates your GPA, test preparation capabilities, and specialized course interests to curate a highly targeted list of optimal programs.",
          sections: [
            {
              h2: "Understanding the Multi-Factor Evaluation Model",
              h3: "Academic Strength & Test Preparation Metrics",
              h4: "Aligning Budgets & Stay Back Potential",
              text: "A successful application is more than just raw GPA. Top-tier institutions in Canada, USA, UK, and Europe evaluate statement of purpose documents (SOPs), letters of recommendation (LORs), extra-curricular portfolios, and language scores. Our diagnostic checks every criterion to optimize matching parameters.",
              list: [
                "GPA Equivalency conversion for international boards.",
                "Custom SOP structure outline based on academic strength.",
                "Financial feasibility matching to avoid visa rejections."
              ]
            }
          ],
          faqs: [
            { q: "How does GPA impact my chances for scholarship?", a: "A GPA of 3.0 or higher (out of 4.0) usually triggers automatic partial scholarship reviews. Elite 100% tuition waivers are competitive and frequently require outstanding personal achievements and research SOPs." },
            { q: "Can I apply for a Master's degree if my undergraduate GPA is modest?", a: "Yes. We specialize in pathway programs, flexible entry state-approved colleges in Europe, and pre-masters courses that lead to identical professional career track outcomes." },
            { q: "Why is a Statement of Purpose (SOP) checked in my profile assessment?", a: "The SOP represents your personality. It explains any academic backlogs, career gaps, or course direction pivots to university admissions boards." }
          ]
        };

      case "applying_to_institutions":
        return {
          title: "Applying to Global Institutions Simplified",
          h1: "Your Fast-Track Guide to Applying to Global Universities",
          tagline: "How we coordinate, audit, file, and represent your dossier to prestigious admission departments.",
          icon: <Briefcase className="h-8 w-8 text-emerald-600" />,
          bgColor: "bg-emerald-50/50",
          imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
          introParagraph: "Submitting study applications to highly selective overseas colleges can feel overwhelming. With differing intake requirements, formatting guidelines, and tracking systems, a tiny document error can delay your academic intake by up to a year. Career Wings ensures your dossier meets professional compliance protocols.",
          sections: [
            {
              h2: "End-to-End Application Auditing & Representation",
              h3: "Expert Statement of Purpose (SOP) Polishing",
              h4: "Direct Priority Channels with Admissions",
              text: "At Career Wings, our senior editorial directors personally audit, structure, and verify your admission files. This guarantees that your essays, CV, references, and proof of degree documents are filed with maximum visual precision to capture admissions committee attention.",
              list: [
                "Comprehensive check of transcript validation standards (WES, etc.).",
                "Custom mentoring of your LOR (Letter of Recommendation) flows.",
                "Real-time portal updates for instant feedback outcomes."
              ]
            },
            {
              h2: "Maximizing Success Rates Through Direct Affiliations",
              h3: "Priority Admission Processing Timelines",
              h4: "Waiver of Internal Application Fees",
              text: "Due to our long-standing relationships with global institutions, we can bypass generic queues. This ensures your profile gets prioritized, and university admission fees are often completely waived, saving hundreds of dollars.",
              list: [
                "Zero institutional processing fees at select partner systems.",
                "Average response times reduced from months to under 14 days."
              ]
            }
          ],
          faqs: [
            { q: "How many universities should I target during the application phase?", a: "We recommend a balanced '3-Tier' approach: 2 Dream universities, 2 High-Match colleges, and 1 Safe academic institution to guarantee absolute placement." },
            { q: "When should I submit my finalized application?", a: "Applications should ideally be submitted 6 to 8 months prior to the target intake. This ensures earliest access to national scholarships, early bird housing, and visa slots." }
          ]
        };

      case "admission_letter_acceptance":
        return {
          title: "Securing and Evaluating Your Admission Offers",
          h1: "How to Evaluate, Accept, and Lock Your University Admission Offers",
          tagline: "How to read conditional lists, make security housing deposits, and confirm your final seat structure.",
          icon: <FileCheck className="h-8 w-8 text-indigo-600" />,
          bgColor: "bg-indigo-50/50",
          imageUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=800",
          introParagraph: "Receiving your official offer letter is an outstanding academic milestone! However, translating that offer into a fully secured seat require precision. This section displays how to navigate conditional offer checks, understand tuition deposit scales, and complete visa-ready paperwork.",
          sections: [
            {
              h2: "Navigating Conditional vs. Unconditional Letters",
              h3: "Checking Outstanding Language or Degree Demands",
              h4: "Transitioning to Unconditional Confirmation Status",
              text: "A 'Conditional Offer' means you have been accepted on the condition of meeting specified outstanding criteria—such as submitting final university semester sheets or achieving a set IELTS band. We help compile and submit these final clearances quickly.",
              list: [
                "Step-by-step audit of offer terms and conditions.",
                "Fast-track language band clearance checks.",
                "Expedited dispatch of final Unconditional Admission Letters."
              ]
            },
            {
              h2: "Securing Your Academic Confirmation and Seat Structures",
              h3: "Tuition Deposit Transfers & Verification Protocols",
              h4: "Receiving Your Official Visa-Ready CAS / COE Documents",
              text: "To solidify your seat, colleges require a securing deposit. After confirmation, you receive the visa-ready document—the COE (Confirmation of Enrolment) in Australia, or visual equivalent CAS (Confirmation of Acceptance for Studies) in the United Kingdom.",
              list: [
                "Secure banking channels to complete overseas wire transfers.",
                "Favorable exchange rate structures for international deposits."
              ]
            }
          ],
          faqs: [
            { q: "What happens if my visa gets rejected after making a seat reservation deposit?", a: "Almost all reputable public and partner universities offer a 100% deposit refund (minus minor administration fee) in case of a documented visa rejection. We guide you through the secure refund filing process." },
            { q: "How long do I typically have to accept an offer?", a: "Acceptance timelines vary between 14 to 30 days after issuance. Popular programs fill up extremely fast, so prompt reservation is advised." }
          ]
        };

      case "education_loan_support":
        return {
          title: "Priority Education Loan Approvals & Financing Programs",
          h1: "Access Low-Interest Education Loan Support and Financial Assistance",
          tagline: "Leverage our formal financing tie-ups with leading banking groups to fund your dream seamless.",
          icon: <DollarSign className="h-8 w-8 text-amber-600" />,
          bgColor: "bg-amber-50/50",
          imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800",
          introParagraph: "Securing credible, low-interest funding is a structural pillar of studying overseas. To ease financial strain, Career Wings maintains formal partner corridors with leading nationalized and global banking groups to deliver collateral-free student financing quickly.",
          sections: [
            {
              h2: "Fast-Track Collateral-Free Financing Opportunities",
              h3: "Financing 100% of Academic and Living Expenditures",
              h4: "Settle Blocked Account Requirements Legally",
              text: "Eligible students can access highly favorable collateral-free loans specifically designed for study abroad. These packages cover complete academic tuition fees, boarding, travel flight logistics, books, laptop gear, and mandatory foreign blocked accounts (like German Sperrkonto).",
              list: [
                "Collateral-Free loans up to $40,000 USD for qualified majors.",
                "Specially discounted interest interest scales starting at 7.5% p.a.",
                "Flexible repayment structures with grace periods extending until after graduation."
              ]
            },
            {
              h2: "Proof of Funds Auditing for Visa Authorities",
              h3: "Meeting Strict Immigration Liquidity Guidelines",
              h4: "Simplifying Bank Solvency Certificates",
              text: "Embassies require absolute proof of liquid assets to authorize student visa stamps. We audit, compile, and structure your sponsor's financial dossier to comply with visa directives perfectly, ensuring zero risk of failure.",
              list: [
                "Audit of funds in liquid deposits, PPF, or gold schemes.",
                "Drafting clear, bulletproof sponsor affinity statement templates."
              ]
            }
          ],
          faqs: [
            { q: "Are co-applicants mandatory for registering a student education loan?", a: "Yes, standard banking rules require a parent or close relative as a financial co-applicant to establish stable income metrics." },
            { q: "How long does the loan approval process take?", a: "Through Career Wings pre-approved partner channels, documentation and sanction letters are typically completed in only 5 to 7 business days instead of the usual 3 weeks." }
          ]
        };

      case "visa_interview_filing":
        return {
          title: "Visa Interview Mentorship & Expert Filing",
          h1: "Visa Interview Mentorship and Expert Immigration File Filing",
          tagline: "Ensuring an flawless file presentation that complies with the highest international protocols.",
          icon: <FileText className="h-8 w-8 text-teal-600" />,
          bgColor: "bg-teal-50/50",
          imageUrl: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=800",
          introParagraph: "The overseas student visa is the ultimate gateway to your international career. Even with excellent grades and unconditional admission offers, a minor error in filing structural tax files, blocked accounts, or failing the oral embassy interview can lead to a visa refusal. Career Wings guarantees robust preparation.",
          sections: [
            {
              h2: "Immigration File Audits and Structural Data Compiler",
              h3: "Aligning Financial and Biographical Records",
              h4: "Compliance with VFS Global, CAS, and SD Visa Guidelines",
              text: "Our dedicated visa cell meticulously compiles your biographical and financial portfolios. This involves structuring liquid asset certificates, tax history registers, and affidavits of support in precise order, meeting local standards.",
              list: [
                "Double verification check of all online visa forms and bios.",
                "Translation support for regional academic and real estate assets.",
                "Digital booking coordination at VFS Global and Biometric centers."
              ]
            },
            {
              h2: "Embassy Visa Mock Interview Panels",
              h3: "Overcoming Communication Anxiety & Building Verbal Precision",
              h4: "Retired Advisors Mirroring Real Visa Questions",
              text: "Embassy mock interviews build absolute self-assurance. We conduct intensive interactive mock panels mirroring the specific line of questioning used in the USA, Germany, Poland, France, UK, and Canada visa centers.",
              list: [
                "Answering questions regarding academic gaps and post-study intents.",
                "Custom visual response drills to convey professional confidence."
              ]
            }
          ],
          faqs: [
            { q: "What is the average visa success rate via Career Wings?", a: "Our certified tracking shows a 98.7% visa success rate over the past decade, owing to our thorough audit system before files are dispatched to embassies." },
            { q: "Can spouses apply concurrently under student visas?", a: "Under specific scenarios, spouses can apply for dependent open work permits in countries like Canada, Australia, or select European regions. Ask our specialists for targeted counsel." }
          ]
        };

      case "pre_departure_briefings":
        return {
          title: "Pre-departure Seminars & Forex Guidance",
          h1: "Pre-Departure Seminars and Student Currency Forex Guidance",
          tagline: "Ensure a smooth landing with optimized currency conversion and customized packing guidelines.",
          icon: <Plane className="h-8 w-8 text-pink-600" />,
          bgColor: "bg-pink-50/50",
          imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
          introParagraph: "Setting off for a new country is a monumental life step! Our comprehensive pre-departure briefings and direct forex support systems ensure that you arrive in your new academic home with total confidence, absolute biological readiness, and stable finances.",
          sections: [
            {
              h2: "Forex Cards and Student Wire Transfer Systems",
              h3: "Securing Lowest Student Exchange Rates",
              h4: "Managing Global Blocked Portals & Multi-Currency cards",
              text: "Foreign exchange margins can deplete student budgets. Career Wings facilitates multi-currency student forex cards with zero transaction markup and special lower-cost banking wire channels to pay accommodation bills safely.",
              list: [
                "Zero markup card configurations for overseas dining and transit.",
                "Direct wire options complying with national reserves guidelines."
              ]
            },
            {
              h2: "Ultimate Luggage and Documentation Checklists",
              h3: "Original Document Files Kept at Hand",
              h4: "Schengen Medical Insurance and Travel Clearances",
              text: "Travelers must hold specific document folders during transit and immigration check desks. We outline everything logically: original admission cards, transcripts, valid passports, immunization certificates, and airport terminal directives.",
              list: [
                "Folder containing original unconditional letters and fee receipts.",
                "Compliant international health insurance plans.",
                "Airport pick-up and accommodation contact directives."
              ]
            }
          ],
          faqs: [
            { q: "How much cash should I carry during my first flight?", a: "We advise carrying between $200 and $500 in local cash for immediate emergency needs, keeping the bulk of your funds secured inside a multi-currency student forex card." },
            { q: "Are student luggage limits higher than standard limits?", a: "Yes, several partner airlines offer special study abroad student programs permitting up to 40kg of luggage. We support student ticket booking and baggage benefits." }
          ]
        };

      case "why_study_abroad":
        return {
          title: "Why Study Abroad? A Global Career Path",
          h1: "Why Study Abroad? Long-Term Career ROI and Personal Growth",
          tagline: "Unlock standard of life gains, exponential salary scopes, and world-class learning networks.",
          icon: <Target className="h-8 w-8 text-cyan-600" />,
          bgColor: "bg-cyan-50/50",
          imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800",
          introParagraph: "Pursuing a global degree is a calculated investment that delivers transformative dividends. It bridges you straight to world-class learning systems, cutting-edge industries, multicultural teams, and global lifestyle standards that are inaccessible locally.",
          sections: [
            {
              h2: "Global Employability & Career Premium",
              h3: "Earning Potential and Salary Advancements",
              h4: "Unmatched Networking with Forbes 500 Entities",
              text: "A degree from an accredited QS-ranked university makes your resume instantly recognizable to HR departments worldwide. Surveys reveal that study abroad graduates secure up to 75% higher starting salaries with faster promotions.",
              list: [
                "Access to robust, advanced job search licenses.",
                "Recognized credentials across North American and European domains.",
                "Global networking events and corporate alumni directories."
              ]
            },
            {
              h2: "The Personal Growth & Intercultural Edge",
              h3: "Building Independence and Self-Efficacy",
              h4: "Global Thinking Framework for leadership Roles",
              text: "Living independently built essential real-world life capacities. Navigating multicultural environments improves emotional intelligence, foreign language skills, adaptation limits, and global problem-solving capabilities.",
              list: [
                "Multicultural social skills and fluency.",
                "Self-reliance, personal budgeting, and resilience."
              ]
            }
          ],
          faqs: [
            { q: "Is studying abroad worth the academic and financial cost?", a: "Yes, the average ROI manifests in only 2 to 3 years of post-study working placement, owing to highly lucrative currency packages." },
            { q: "What are the most popular sectors for study abroad career tracks?", a: "Stem fields, AI, Business Informatics, Biotechnology, and Hospitality are currently leading with the highest post-study stay-back success rates." }
          ]
        };

      case "where_what":
        return {
          title: "Where & What? Find Your Perfect Match",
          h1: "Where and What to Study: Optimal Program and Country Matching",
          tagline: "Analyze country trends, dynamic local sectors, and cutting-edge program categories.",
          icon: <GraduationCap className="h-8 w-8 text-teal-600" />,
          bgColor: "bg-teal-50/50",
          imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800",
          introParagraph: "Selecting the ideal country and course is the foundation of study abroad success. With numerous institutions worldwide, you need an analytical blueprint that balances academic outcomes, budget capabilities, liveability guidelines, and regional job market prospects.",
          sections: [
            {
              h2: "High-Growth Fields and Sectors in 2026",
              h3: "Targeting Sectors with Local Labor Deficits",
              h4: "Stem Demands across Europe & Ireland",
              text: "Choosing the correct specialization is vital. AI engineering, financial technology, biotech, hospitality, and cyber defense are experiencing massive human resource gaps. Visas in these sectors are issued 2x faster by immigration bureaus.",
              list: [
                "Stem qualifications with automatic post-study stay-back privileges.",
                "Business Analytics and quantitative financing domains.",
                "Premium hospitality management programs with paid placements."
              ]
            },
            {
              h2: "Matching Country Profiles & Tuition Budgets",
              h3: "Zero Tuition Public Universities in Germany",
              h4: "High-Wage and High-ROI Placements in Canada and UK",
              text: "Every country suits a different student profile. We balance parameters scientifically: tuition-free state universities in Germany, flexible co-op options in Canada, historical academic heritage in the UK, or innovative business campuses in France and Ireland.",
              list: [
                "Germany: Public-funded, tuition-free, high tech hubs.",
                "Ireland & UK: English speaking, top corporate EMEA headquarters.",
                "Poland: Extremely cost-effective courses starting at €2,500/yr."
              ]
            }
          ],
          faqs: [
            { q: "Can I choose my country filter based on part-time wages?", a: "Yes, several locations like Australia and Germany offer generous hourly wages to students, making it entirely feasible to cover daily meals and utilities seamlessly." },
            { q: "How can Career Wings help find my program fit?", a: "We analyze your academic background, test scores, future projections, and budget constraints to offer you three perfect country lists." }
          ]
        };

      case "how_apply":
        return {
          title: "How Do I Apply? The Path to Success",
          h1: "How to Apply for Study Abroad: Comprehensive Timeline and Roadmap",
          tagline: "Follow a stress-free submission timeline designed for 100% security.",
          icon: <BookOpen className="h-8 w-8 text-indigo-600" />,
          bgColor: "bg-indigo-50/50",
          imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
          introParagraph: "An analytical, step-by-step submission system is central to securing admissions at selective global colleges. Learn how Career Wings manages your admissions timeline, ensuring that every document is filed properly.",
          sections: [
            {
              h2: "A 3-Step Stress-Free Admissions Blueprint",
              h3: "Step 1: Consultation & Intake Matching (8 Months Prior)",
              h4: "Step 2: Credential Submission & Editing",
              text: "Starting early gives you a significant advantage. We evaluate options, map courses, and outline required test training 8 months in advance. Then, we assemble your transcripts, CVs, and LORs in beautiful compliance.",
              list: [
                "Profile evaluation and shortlisting in under 48 hours.",
                "Personal Statement editing and interview training modules.",
                "Document verification checks directly with university channels."
              ]
            },
            {
              h2: "Step 3: Direct Representation and Seat Lock",
              h3: "Accelerated Application Tracking Systems",
              h4: "Filing and Securing the CAS / COE",
              text: "Career Wings handles the heavy lifting after applying. We follow up directly with university admissions representatives to expedite your offer letters, ensuring your secure confirmation is delivered within days.",
              list: [
                "Instant tracking of offer statuses.",
                "Secure banking wire assistance for deposit confirmation."
              ]
            }
          ],
          faqs: [
            { q: "When is the best time of year to begin my application?", a: "Usually, preparation should start 8 to 10 months ahead. Major intake semesters are Fall (Sept/Oct) and Spring (Jan/Feb)." },
            { q: "Do I pay any hidden commissions directly to Career Wings?", a: "No. Our direct representations with world-class affiliate systems mean our application management and visa support are entirely transparent." }
          ]
        };

      case "receiving_offers":
        return {
          title: "Receiving Offers & Final Selection",
          h1: "Receiving University Offers: Decision Autonomy & Comparisons",
          tagline: "How to transition offers into confirmed admissions smoothly.",
          icon: <CheckCircle className="h-8 w-8 text-orange-600" />,
          bgColor: "bg-orange-50/50",
          imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
          introParagraph: "Receiving multiple admission offers from different countries is a fantastic problem to have! Making the final choice requires comparing tuition fees, local living costs, work regulations, and regional job market prospects.",
          sections: [
            {
              h2: "How to Compare Dual Admissions Scientifically",
              h3: "Tuition, Local Living, and Post-Study Regulations Comparison",
              h4: "Syllabus Alignments and Career Outcomes",
              text: "We compile meticulous comparison sheets analyzing the total financial outlay of each choice. We contrast key parameters like tuition differences, scholarship terms, regional living costs, and post-study stay-back permissions.",
              list: [
                "Detailed comparison grids evaluating total academic expenses.",
                "Employment rate analyses for university alumni directories.",
                "Guidance on choosing between metropolitan and regional campuses."
              ]
            }
          ],
          faqs: [
            { q: "Can I accept more than one offer letter simultaneously?", a: "While you can hold multiple conditional/unconditional offers, you can only enroll in and file an official student visa for one program. We help you make the optimal choice." },
            { q: "How are scholarship details conveyed inside offer letters?", a: "Most universities clearly specify your entitled merit grant or fee deduction right on the primary page of your official admission offer." }
          ]
        };

      case "prepare_depart":
        return {
          title: "Prepare to Depart: Essential Student Checklists",
          h1: "Detailed Departure Preparation Guide: Flights & Biometrics",
          tagline: "All logistics sorted so you can board your flight with calm confidence.",
          icon: <ShieldAlert className="h-8 w-8 text-purple-600" />,
          bgColor: "bg-purple-50/50",
          imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800",
          introParagraph: "As your departure date approaches, ensuring that you have packed correctly, secured local accommodation, and completed biometric registration is crucial. Review this definitive guide from Career Wings, your trusted visa agency.",
          sections: [
            {
              h2: "Ultimate Departure Coordination and Flight Logistics",
              h3: "Student Flight Baggage and Packing Guidelines",
              h4: "Biometric Registrations and Final Sticker Verification",
              text: "We assist in organizing affordable student flight bookings through global airline partners, securing lower rates and extra baggage allowances up to 40kg to accommodate all your essentials smoothly.",
              list: [
                "Validation checks on student D-visas and entry permit stickers.",
                "Original document folders kept securely in carry-on baggage.",
                "Mandatory immunization, health cards, and emergency files."
              ]
            }
          ],
          faqs: [
            { q: "What should I keep in my carry-on bag during transit?", a: "Your passport, original university offer letter, fee transaction slips, medical certificates, laptop, and local currency cash should always remain in your carry-on." },
            { q: "How is student accommodation booked prior to arrival?", a: "Career Wings partners with verified student housing providers to secure safe, budget-friendly single/shared rooms near campus before you board." }
          ]
        };

      case "arrive_thrive":
        return {
          title: "Arrive & Thrive: Settling in Your New Academic Home",
          h1: "Arrive and Thrive: On-Campus Settlements & Accommodation Help",
          tagline: "Get community peer connections, cheap rental guides, and part-time job tips.",
          icon: <Users className="h-8 w-8 text-pink-600" />,
          bgColor: "bg-pink-50/50",
          imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800",
          introParagraph: "Touchdown is just the start of your global journey! Settling into your new home, securing local transit passes, understanding campus schedules, and finding part-time jobs are essential for a fantastic experience.",
          sections: [
            {
              h2: "Seamless Post-Arrival Integration Support",
              h3: "Enabling Local Commuter Cards and Transit Passes",
              h4: "Opening Bank Accounts and Secure Local Sim Cards",
              text: "Our support continues post-arrival. We connect you with local student community leaders to secure heavily discounted transit passes, open local student bank accounts, and set up high-speed mobile data connections on your first day.",
              list: [
                "Up to 70% off monthly train, bus, and metro cards.",
                "Sim card setups with premium international calling bundles.",
                "Direct links to verified local off-campus renting networks."
              ]
            },
            {
              h2: "Part-Time Employment Coordination and Regulations",
              h3: "Securing Tax Registration and Legal Permits",
              h4: "Balancing Work-Study Routines and GPA Requirements",
              text: "Working part-time is a great way to offset living expenses. We guide you through securing local tax registration codes (e.g., TFN in Australia, National Insurance in UK) to ensure all your employment is 100% legal.",
              list: [
                "Step-by-step help completing tax registrations and files.",
                "Tips for finding flexible on-campus assistant positions."
              ]
            }
          ],
          faqs: [
            { q: "How many hours am I legally allowed to work as a student?", a: "Most popular destinations permit up to 20 or 24 hours per week during active semesters, and unlimited full-time hours during official holidays." },
            { q: "What is the average hourly wage for students overseas?", a: "Average hourly rates range from $15 to $25 USD depending on the region and duties, easily covering local meals, rent, and minor travel." }
          ]
        };

      case "privacy_policy":
        return {
          title: "Privacy Policy & GDPR Compliance",
          h1: "Privacy Policy, GDPR, and Career Wings Data Safeguards",
          tagline: "How we collect, manage, and safeguard student application details under world-class data guidelines.",
          icon: <ShieldAlert className="h-8 w-8 text-blue-600" />,
          bgColor: "bg-blue-50/50",
          imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
          introParagraph: "At Career Wings Consultants, we hold your personal data in the absolute highest regard. This disclosure outlines our comprehensive security frameworks, data collection channels, and GDPR policies to safeguard your private files.",
          sections: [
            {
              h2: "Comprehensive Personal Information Security Protocols",
              h3: "Data Exclusively Processed for University Admissions & Visas",
              h4: "Zero Third-Party Marketing Leaks",
              text: "Any transcripts, bank balances, or personal identification records shared with our consultants are processed exclusively for your applications. We maintain strict firewalls and never sell or rent candidate details to external marketing agencies.",
              list: [
                "Encrypted cloud transmission channels.",
                "Full compliance with international GDPR directives.",
                "Right to erasure: request instant complete erasure of files at any time."
              ]
            }
          ],
          faqs: [
            { q: "Are my bank records safe on the Career Wings server?", a: "Absolutely. All financial proofs, tax files, and sponsor biographies are stored in encrypted environments, accessible only by our certified visa cell." },
            { q: "Do you trace visitor telemetry on your portals?", a: "Yes, we monitor anonymous traffic telemetry strictly to enhance portal speeds and interface performance." }
          ]
        };

      case "terms_of_use":
        return {
          title: "Terms of Use",
          h1: "Terms of Use and Admissions Agency Guidelines",
          tagline: "The governing frameworks for student counseling, document compilations, and admissions support.",
          icon: <FileText className="h-8 w-8 text-[#0047AB]" />,
          bgColor: "bg-indigo-50/50",
          imageUrl: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=800",
          introParagraph: "Welcome to Career Wings Consultants. By accessing our counseling services, file generation tools, and document evaluation portals, you agree to comply with our standardized operational Terms of Use.",
          sections: [
            {
              h2: "Counselling Scope and Student Commitments",
              h3: "100% Free Initial Diagnostic Evaluations",
              h4: "Mandatory Document Authenticity Guidelines",
              text: "We provide outstanding academic guidance entirely free of service charges. In return, we expect complete honesty from our applicants. Students must present 100% authentic academic transcripts and financial records.",
              list: [
                "Strict prohibition of falsified or altered records.",
                "Immediate termination of counseling if document fraud is detected.",
                "Adherence to university timelines and fee policies."
              ]
            }
          ],
          faqs: [
            { q: "What happens if a student submits invalid records?", a: "Career Wings reserves the right to immediately cancel all representation and suspend application files across partner university systems." },
            { q: "Can I cancel my counseling representation at any point?", a: "Yes, students have full autonomy to cease consultation or withdraw application files without penalty." }
          ]
        };

      case "disclaimer":
        return {
          title: "Legal Disclaimer",
          h1: "Official Disclaimer on Embassy Visas and Admissions Autonomy",
          tagline: "Transparency disclosures on processing timelines, university results, and agency representations.",
          icon: <HelpCircle className="h-8 w-8 text-orange-600" />,
          bgColor: "bg-amber-50/50",
          imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800",
          introParagraph: "Career Wings Consultants maintains direct representations and partnerships with hundreds of elite universities worldwide. However, clear transparency regarding visa and admission approvals is crucial.",
          sections: [
            {
              h2: "Admissions and Visa Approval Autonomy Notice",
              h3: "Embassies & Universities Hold Final Authority",
              h4: "No Guaranteed Admission or Sticker Promises",
              text: "While we maintain a outstanding 98.7% visa success rate, all final admission offers, scholarship values, and visa stickers are decided solely by the respective university panels and national immigration authorities.",
              list: [
                "Career Wings acts as a counseling and representation facilitator.",
                "Past success rates serve as a guide, not a structural guarantee.",
                "Application processing intervals depend entirely on institutional boards."
              ]
            }
          ],
          faqs: [
            { q: "Who decides my scholarship values?", a: "Scholarships are decided exclusively by the university's academic Senate or admissions committee based on their annual budgets." },
            { q: "Does Career Wings guarantee embassy visas if I pay a premium?", a: "Absolutely not. We do not accept bribes or offer 'guarantees'. Visas are granted purely on the technical merit and compliance of your application dossier." }
          ]
        };

      default:
        return {
          title: "Career Wings Guidance Portal",
          h1: "Career Wings Study Abroad Consultants",
          tagline: "Your absolute trusted partner in global education milestones.",
          icon: <Sparkles className="h-8 w-8 text-blue-600" />,
          bgColor: "bg-blue-50/50",
          imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800",
          introParagraph: "Career Wings study abroad consultants and visa agency provides end-to-end support, enabling beautiful, stress-free admissions and visa approvals globally.",
          sections: [
            {
              h2: "Explore Core Opportunities",
              h3: "Admissions, Visas, and Logistics Support",
              h4: "A High-Impact Track Record Worldwide",
              text: "We offer tailored assistance spanning test preparation, application auditing, financial coordination, document validation, visa filing, mock panel preparation, airport pick-ups, and housing placement.",
              list: [
                "Over 12 years of study abroad expertise.",
                "Comprehensive support for top global study destinations."
              ]
            }
          ],
          faqs: [
            { q: "How can I start my journey with Career Wings?", a: "Simply click the 'Book Free Appointment' button to schedule a call with a senior academic advisor." }
          ]
        };
    }
  };

  const content = getPageContent();

  const newsItems = [
    {
      title: "Germany Expands Job Search Visa to 24 Months for Tech Grads",
      category: "europe",
      date: "May 28, 2026",
      summary: "In a move to fill tech skills gaps, German authorities have expanded post-study stay rules. English-taught software and AI programs see a massive uptick in interest.",
      linkText: "Read regulatory files"
    },
    {
      title: "IELTS Waived at Several Irish Universities for English Medium Applicants",
      category: "ireland",
      date: "May 15, 2026",
      summary: "Students who graduated high school with English as their primary language of instruction can now secure unconditional offers without mandatory IELTS requirements.",
      linkText: "Check participating colleges"
    },
    {
      title: "Schengen Student D-Visa Processing Bottlenecks Resolved",
      category: "europe",
      date: "April 30, 2026",
      summary: "Digitalized credential verification portals have cleared major backlogs. Standard student visa approvals are now being delivered within 15 working days.",
      linkText: "Check booking queue times"
    }
  ];

  const handleAptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAptSubmitted(true);
    onBookCounselling(`Appointment slot chosen: ${aptDate} at ${aptTime} for requested program.`);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-100 pb-20 transition-colors duration-300">
      
      {/* Top Breadcrumb banner */}
      <div className="border-b border-gray-200/50 dark:border-slate-800 bg-white dark:bg-slate-900 py-4 shadow-xs">
        <div className="container mx-auto px-4 max-w-7xl flex flex-wrap items-center justify-between gap-3">
          <button 
            id="back-to-home-btn"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-black text-[#0047AB] dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-all cursor-pointer bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-full border border-gray-200 dark:border-slate-700 shadow-sm"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Main Screen
          </button>
          
          <div className="flex items-center gap-2 text-[11px] text-gray-400 dark:text-slate-500 font-bold">
            <span>Home</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gray-600 dark:text-slate-400">Guidance</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#0047AB] dark:text-blue-400 whitespace-nowrap overflow-hidden text-ellipsis max-w-xs">{content.title}</span>
          </div>
        </div>
      </div>

      {/* Main hero space with thematic design & backdrop image */}
      <header className="relative py-16 md:py-24 text-white overflow-hidden bg-slate-900">
        {/* Unsplash Background with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={content.imageUrl} 
            alt={content.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-30 transform hover:scale-105 transition-transform duration-700" 
          />
          <div className="absolute inset-0 bg-linear-to-b from-slate-950/80 via-slate-900/90 to-slate-950" />
        </div>

        <div className="container relative z-10 mx-auto px-4 max-w-5xl text-center space-y-5">
          <div className="inline-flex p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg mb-1 animate-pulse">
            {content.icon}
          </div>
          <div>
            <span className="bg-orange-500 text-white font-extrabold text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full inline-block shadow-md">
              Career Wings Consultants - Best Visa Agency
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto drop-shadow-md">
            {content.h1}
          </h1>
          <p className="text-slate-300 text-sm md:text-base font-semibold max-w-3xl mx-auto leading-relaxed">
            {content.tagline} Get world-class counseling support from Career Wings Consultants, your dependable Study Abroad Consultants and Best Visa Agency.
          </p>
        </div>
      </header>

      {/* Rich Page content layout */}
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Core content text blocks & rich sections */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Intro block */}
            <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-gray-150 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Info className="h-5.5 w-5.5 text-[#0047AB] dark:text-blue-400" />
                Comprehensive Overview & Academic Objectives
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed font-medium">
                {content.introParagraph}
              </p>
            </div>

            {/* Dynamic customized widgets based on page types */}
            {pageType === "student_news" && (
              <div id="student-news-widget" className="space-y-6">
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <h3 className="font-extrabold text-lg text-slate-950 dark:text-white">Latest Regulatory News Stream</h3>
                  </div>
                  <div className="flex gap-2">
                    {["all", "europe", "ireland"].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveNewsCategory(cat)}
                        className={`text-[10px] uppercase font-black tracking-wider px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                          activeNewsCategory === cat
                            ? "bg-[#0047AB] text-white border-blue-600"
                            : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-gray-200 dark:border-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {newsItems
                    .filter((item) => activeNewsCategory === "all" || item.category === activeNewsCategory)
                    .map((item, index) => (
                      <div key={index} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-150 dark:border-slate-800 shadow-xs hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 space-y-3">
                        <div className="flex items-center justify-between text-[11px] font-bold">
                          <span className="bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full uppercase tracking-wider">{item.category}</span>
                          <span className="text-gray-400 dark:text-slate-500 flex items-center gap-1"><Clock className="h-3 w-3" /> {item.date}</span>
                        </div>
                        <h4 className="font-extrabold text-base md:text-lg text-slate-950 dark:text-white leading-snug">{item.title}</h4>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">{item.summary}</p>
                        <button 
                          onClick={() => onBookCounselling(`Requested files about: ${item.title}`)} 
                          className="text-xs text-blue-600 dark:text-blue-400 font-black hover:underline flex items-center gap-1 cursor-pointer pt-1"
                        >
                          {item.linkText} <ChevronRight className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {pageType === "free_appointment" && (
              <div id="free-appointment-booking-form" className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-gray-150 dark:border-slate-800 shadow-sm space-y-6">
                <div className="space-y-1.5 border-b border-gray-100 dark:border-slate-800 pb-4">
                  <h3 className="font-extrabold text-xl text-slate-950 dark:text-white">Verify Preferred Consultation Stream</h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-bold">Instantly secure your priority booking slot below.</p>
                </div>
                
                {aptSubmitted ? (
                  <div className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 p-6 rounded-2xl border border-emerald-150 dark:border-emerald-850 text-center space-y-3">
                    <CheckCircle className="h-10 w-10 text-emerald-500 mx-auto animate-bounce" />
                    <h4 className="font-black text-base md:text-lg">Your Schedule is Successfully Confirmed!</h4>
                    <p className="text-xs sm:text-sm font-semibold leading-relaxed">We have registered your appointment for <strong>{aptDate}</strong> at <strong>{aptTime}</strong>. A dedicated senior advisor will reach out to verify your academic transcript parameters.</p>
                  </div>
                ) : (
                  <form onSubmit={handleAptSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-600 dark:text-slate-400 mb-1.5">Target Booking Date</label>
                        <input 
                          type="date" 
                          required
                          value={aptDate}
                          onChange={(e) => setAptDate(e.target.value)}
                          className="w-full text-xs font-bold border border-gray-200 dark:border-slate-700 rounded-xl p-3 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 outline-hidden" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 dark:text-slate-400 mb-1.5">Target Call Time Slot</label>
                        <select 
                          value={aptTime}
                          onChange={(e) => setAptTime(e.target.value)}
                          className="w-full text-xs font-bold border border-gray-200 dark:border-slate-700 rounded-xl p-3 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 outline-hidden"
                        >
                          <option value="10:00 AM">10:00 AM - 12:00 PM</option>
                          <option value="01:30 PM">01:30 PM - 03:00 PM</option>
                          <option value="04:00 PM">04:00 PM - 06:00 PM</option>
                          <option value="07:00 PM">07:00 PM - 08:30 PM (Evening Exclusive)</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-bold text-gray-600 dark:text-slate-400 mb-1.5">Specialized Study Target</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Master's in Germany, Bachelor's in Canada"
                        required
                        value={aptSlot}
                        onChange={(e) => setAptSlot(e.target.value)}
                        className="w-full text-xs font-bold border border-gray-200 dark:border-slate-700 rounded-xl p-3 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 outline-hidden" 
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-3.5 bg-[#0047AB] hover:bg-blue-800 text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-blue-500/10 cursor-pointer"
                    >
                      Book Free Appointment Now
                    </button>
                  </form>
                )}
              </div>
            )}

            {pageType === "personalized_profile_assessment" && (
              <div id="interactive-profile-assessment-tool" className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-gray-150 dark:border-slate-800 shadow-sm space-y-6">
                <div className="space-y-1 border-b border-gray-155 dark:border-slate-800 pb-4">
                  <h3 className="font-extrabold text-xl text-slate-950 dark:text-white">Self-Eligibility Profile Diagnostic</h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-bold">Receive direct evaluations based on target standards.</p>
                </div>

                {assessmentResult ? (
                  <div className="bg-blue-50/80 dark:bg-blue-950/20 text-blue-900 dark:text-blue-300 p-6 rounded-2xl border border-blue-150 dark:border-blue-900 space-y-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-6 w-6 text-[#0047AB] dark:text-blue-400" />
                      <span className="font-black text-sm">Evaluation Complete</span>
                    </div>
                    <p className="text-xs sm:text-sm font-bold leading-relaxed">{assessmentResult}</p>
                    <div className="flex flex-wrap gap-3 pt-2">
                      <button 
                        onClick={() => { setAssessmentResult(null); }}
                        className="bg-white dark:bg-slate-800 text-[#0047AB] dark:text-blue-300 border border-blue-200 dark:border-slate-700 px-4 py-2.5 rounded-xl text-xs font-black cursor-pointer shadow-xs"
                      >
                        Reset Diagnostic
                      </button>
                      <button 
                        onClick={() => onBookCounselling(`Profile evaluation details: GPA:${gpa}, IELTS:${ielts}, Interest:${interest}, Budget:${budget}`)}
                        className="bg-[#0047AB] text-white px-4 py-2.5 rounded-xl text-xs font-black cursor-pointer shadow-md"
                      >
                        Claim Full Scholarship Analysis
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleAssessment} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-600 dark:text-slate-400 mb-1.5">Last Academic GPA (out of 4.0)</label>
                        <input 
                          type="number" 
                          step="0.1" 
                          min="1" 
                          max="4" 
                          required
                          value={gpa} 
                          onChange={(e) => setGpa(e.target.value)}
                          className="w-full text-xs font-bold border border-gray-200 dark:border-slate-700 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 outline-hidden animate-pulse-once" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 dark:text-slate-400 mb-1.5">IELTS Equivalency Score</label>
                        <select 
                          value={ielts}
                          onChange={(e) => setIelts(e.target.value)}
                          className="w-full text-xs font-bold border border-gray-200 dark:border-slate-700 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 outline-hidden"
                        >
                          <option value="5.5">5.5 Bands (Standard Pass)</option>
                          <option value="6.0">6.0 Bands (Competent)</option>
                          <option value="6.5">6.5 Bands (Good score)</option>
                          <option value="7.0">7.0+ Bands (Excellent score)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-600 dark:text-slate-400 mb-1.5">Self-Finance Capability (Per Year)</label>
                        <select 
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          className="w-full text-xs font-bold border border-gray-200 dark:border-slate-700 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 outline-hidden"
                        >
                          <option value="low">Under $8,000 USD</option>
                          <option value="medium">$8,000 - $18,000 USD</option>
                          <option value="high">Over $18,000 USD</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 dark:text-slate-400 mb-1.5">Specialized Area Interest</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Data Analytics, Biotech" 
                          required
                          value={interest}
                          onChange={(e) => setInterest(e.target.value)}
                          className="w-full text-xs font-bold border border-gray-200 dark:border-slate-700 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 outline-hidden" 
                        />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-3.5 bg-[#0047AB] hover:bg-blue-800 text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-md cursor-pointer"
                    >
                      Process Instant Profile Assessment
                    </button>
                  </form>
                )}
              </div>
            )}

            {pageType === "education_loan_support" && (
              <div id="loan-calculator-tool" className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-gray-150 dark:border-slate-800 shadow-sm space-y-6">
                <div className="space-y-1.5 border-b border-gray-100 dark:border-slate-800 pb-4">
                  <h3 className="font-extrabold text-xl text-slate-900 dark:text-white">Education Loan EMI Estimator</h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-bold">Evaluate potential monthly repayments with partner bank rates.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-gray-600 dark:text-slate-400 mb-1.5">
                        <span>Total Loan Amount</span>
                        <span className="text-[#0047AB] dark:text-blue-400 font-black">${loanAmount.toLocaleString()} USD</span>
                      </div>
                      <input 
                        type="range" 
                        min="5000" 
                        max="100000" 
                        step="5000"
                        value={loanAmount} 
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                        className="w-full cursor-pointer accent-[#0047AB]" 
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-gray-600 dark:text-slate-400 mb-1.5">
                        <span>Interest Rate (p.a.)</span>
                        <span className="text-[#0047AB] dark:text-blue-400 font-black">{interestRate}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="5" 
                        max="15" 
                        step="0.5"
                        value={interestRate} 
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-full cursor-pointer accent-[#0047AB]" 
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-gray-600 dark:text-slate-400 mb-1.1">
                        <span>Repayment Tenure</span>
                        <span className="text-[#0047AB] dark:text-blue-400 font-black">{loanTenure} Years</span>
                      </div>
                      <input 
                        type="range" 
                        min="3" 
                        max="15" 
                        step="1"
                        value={loanTenure} 
                        onChange={(e) => setLoanTenure(Number(e.target.value))}
                        className="w-full cursor-pointer accent-[#0047AB]" 
                      />
                    </div>
                  </div>

                  <div className="bg-slate-55 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-850 rounded-2xl p-6 flex flex-col justify-between space-y-4 text-center shadow-inner">
                    <div className="space-y-1">
                      <span className="text-[9px] font-black tracking-widest text-[#0047AB] dark:text-blue-400 uppercase">ESTIMATED MONTHLY OUTLAY</span>
                      <h4 className="text-4xl font-black text-slate-900 dark:text-white">${calculateMonthlyEMI()}/mo</h4>
                      <p className="text-[11px] text-gray-400 dark:text-slate-500 font-bold">Calculated on compounding interest rates.</p>
                    </div>

                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold leading-relaxed">
                      *Career Wings coordinates special processing fee exemptions and collateral clearances with affiliated bank offices.
                    </p>

                    <button 
                      onClick={() => onBookCounselling(`Requested expedited student loan support structure. Target amount: $${loanAmount} USD.`)}
                      className="w-full py-2.5 bg-[#0047AB] hover:bg-blue-800 text-white font-black text-xs rounded-xl transition-all cursor-pointer shadow-md"
                    >
                      Claim Pre-Approval Check
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Rich structured pages subsections */}
            <div className="space-y-10">
              {content.sections.map((sect, sIdx) => (
                <article key={sIdx} className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-gray-150 dark:border-slate-800 shadow-sm space-y-5">
                  <div className="space-y-2 border-b border-gray-100 dark:border-slate-800 pb-3">
                    <h2 className="font-extrabold text-xl md:text-2xl text-slate-900 dark:text-white leading-tight">
                      {sect.h2}
                    </h2>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-[#0047AB] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-md">{sect.h3}</span>
                      <span className="text-xs font-semibold text-gray-400 dark:text-slate-500">|</span>
                      <span className="text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 px-2.5 py-1 rounded-md">{sect.h4}</span>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 dark:text-slate-350 text-sm md:text-base leading-relaxed font-medium">
                    {sect.text}
                  </p>

                  {sect.list && sect.list.length > 0 && (
                    <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl space-y-3.5 border border-gray-100 dark:border-slate-850">
                      <h4 className="text-xs font-black tracking-wider text-slate-500 dark:text-slate-400 uppercase">Key Compliance Benchmarks</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        {sect.list.map((item, iIdx) => (
                          <div key={iIdx} className="flex items-start gap-2 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
                            <CheckCircle className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              ))}
            </div>

            {/* Custom SEO FAQ Accordion - RESOLVES Repeated design block feedback */}
            <section className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-gray-150 dark:border-slate-800 shadow-sm space-y-6">
              <div className="border-b border-gray-100 dark:border-slate-800 pb-4">
                <span className="text-orange-500 text-[10px] uppercase tracking-widest font-extrabold">ACCORDION FAQ FOR QUICK RESOLUTIONS</span>
                <h3 className="font-extrabold text-xl md:text-2xl text-slate-950 dark:text-white mt-1">Frequently Asked Questions (FAQs)</h3>
                <p className="text-xs text-gray-400 dark:text-slate-500 font-bold">Get immediate answers matching international study protocols.</p>
              </div>

              <div className="space-y-4">
                {content.faqs.map((faq, fIdx) => (
                  <div 
                    key={fIdx} 
                    className="border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden transition-all duration-350"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === fIdx ? null : fIdx)}
                      className="w-full flex justify-between items-center px-5 py-4 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all font-bold text-xs sm:text-sm text-left text-slate-900 dark:text-white cursor-pointer"
                    >
                      <span className="pr-4 flex items-center gap-2">
                        <HelpCircle className="h-4 w-4 text-[#0047AB] dark:text-blue-400 shrink-0" />
                        {faq.q}
                      </span>
                      {openFaqIndex === fIdx ? (
                        <ChevronUp className="h-4 w-4 text-slate-400 shrink-0" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    
                    {openFaqIndex === fIdx && (
                      <div className="px-5 py-4 bg-white dark:bg-slate-900 border-t border-slate-50 dark:border-slate-800 text-xs sm:text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Quality checklist */}
            <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 space-y-4">
              <h4 className="font-extrabold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />
                Guaranteed Career Wings Compliance Protocols
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-450 font-bold leading-relaxed">
                As a leading educational consultation firm, we safeguard your data and secure high-value approvals across multiple countries. Our track record spans 12+ years of seamless student representations.
              </p>
            </div>

          </div>

          {/* Right Column: CTA promo card & side navigation */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* The primary quick actions bar to access others */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-150 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-extrabold text-xs tracking-widest text-[#0047AB] dark:text-blue-400 uppercase">Milestone Services Navigator</h3>
              
              <div className="grid grid-cols-1 gap-1 text-xs">
                {[
                  { id: "student_news", label: "Student News Updates" },
                  { id: "free_appointment", label: "Free Appointment Booking" },
                  { id: "personalized_profile_assessment", label: "Profile Evaluation Tool" },
                  { id: "applying_to_institutions", label: "Applying to Institutions" },
                  { id: "admission_letter_acceptance", label: "Offer Acceptance Support" },
                  { id: "education_loan_support", label: "Financial Loan Support" },
                  { id: "visa_interview_filing", label: "Embassy Visa Filing Mock" },
                  { id: "pre_departure_briefings", label: "Pre-departure forex help" },
                  { id: "why_study_abroad", label: "Why Study Abroad Guide" },
                  { id: "where_what", label: "Where & What to study" },
                  { id: "how_apply", label: "Admissions Submission flow" },
                  { id: "receiving_offers", label: "Evaluating offer letters" },
                  { id: "prepare_depart", label: "Boarding & Flight list" },
                  { id: "arrive_thrive", label: "Settling & Part-time jobs" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentTab(`info_${item.id}`);
                      setOpenFaqIndex(null);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`w-full flex justify-between items-center px-4 py-2.5 rounded-xl font-bold transition-all text-left cursor-pointer ${
                      pageType === item.id 
                        ? "bg-blue-50 dark:bg-blue-950/50 text-[#0047AB] dark:text-blue-300 border border-blue-100 dark:border-blue-900" 
                        : "hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-600 dark:text-slate-400 border border-transparent"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic CTA Promo card */}
            <div className="bg-slate-900 dark:bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-lg border border-slate-800">
              <div className="absolute top-0 right-0 h-32 w-32 bg-blue-600 rounded-full blur-3xl opacity-20" />
              <div className="space-y-3 relative z-10">
                <span className="bg-blue-500/20 text-blue-300 px-3.5 py-1 rounded-full text-[9px] uppercase tracking-wider font-extrabold">CONSULTATION FREE</span>
                <h3 className="text-xl sm:text-2xl font-black leading-tight">Need tailored support on admissions?</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                  Get directly represented by Career Wings. No transaction fees, complete scholarship audits, and secure housing options.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <button 
                  onClick={() => onBookCounselling(`Academic consultation session requested for page: ${content.title}.`)}
                  className="w-full py-3 bg-[#0047AB] hover:bg-blue-600 text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="h-4.5 w-4.5" /> Book Free Appointment Now
                </button>
                <div className="text-center text-[10px] text-slate-400 font-bold pt-1">
                  Average Response Interval: Under 2 hours.
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>

    </div>
  );
}
