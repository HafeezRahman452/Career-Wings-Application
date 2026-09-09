const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../src/components/NewsArticlesPage.tsx");
let content = fs.readFileSync(filePath, "utf8");

// Update Article 3: Germany
content = content.replace(
  `### Crucial Steps to Plan Your Germany Journey:
1. **ECTS Credit Evaluations:** Ensuring your existing study transcripts exactly match Germany's rigid ECTS requirements. Career Wings offers official credit assessment mappings.
2. **Blocking Accounts (Sperrkonto):** Securing the necessary subsistence funds required by local authorities to prove financial independence.
3. **Language Competence:** While hundreds of programs are taught completely in English, basic conversational German (A1/A2 level) serves as an immense advantage during local internships.

In this deep guide, our counselors cover university selection strategies, direct application deadlines, and APS certificate processing times.`,
  `### Latest Rules & Admission Highlights for German Universities:
1. **Mandatory APS Verification:** All applicants with degrees from India, China, or Vietnam must obtain an APS Certificate prior to student visa filing.
2. **Updated Sperrkonto (Blocked Account) Requirement:** The federally mandated living expense deposit stands at €11,904 per year (€992/month release).
3. **Enhanced Part-Time Work Allowance:** International students can now legally work up to 140 full days or 280 half days per calendar year (up from 120 days).
4. **Opportunity Card (Chancenkarte):** Germany has launched the points-based Opportunity Card, enabling skilled graduates to reside and work up to one year to secure qualified employment.`
);

// Update Article 5: Australia
content = content.replace(
  `content: \`Australia has updated standard regulations for its subclass 485 Post-Study Work visas, bringing focused alignments to priority engineering, computing, and allied clinical care graduate programs.

### Essential Points of Change:
1. **Specific Qualification Matching:** Certain advanced engineering and technology degrees receive guaranteed duration benefits, optimizing careers in Sydney, Melbourne, and Brisbane.
2. **Age Threshold Realignments:** The eligible maximum age limit has been updated to focus support on early to mid-career academic students.
3. **Simplified Regional Extension Pathways:** Regional campus graduates are offered extra extension opportunities to support workforce requirements outside urban epicenters.

Partner with Career Wings to analyze your program code against Commonwealth Registration details (CRICOS)!\``,
  `content: \`Australia has restructured its international student visa (Subclass 500) and Temporary Graduate visa (Subclass 485) framework with rigorous focus on high-quality academic delivery and labor market alignment.

### Essential Regulatory Updates:
1. **Genuine Student (GS) Requirement:** The old Genuine Temporary Entrant (GTE) statement is replaced by the Genuine Student (GS) assessment with targeted questions testing course relevance, realistic career benefits, and domestic ties.
2. **Subclass 485 Stream Duration & Age Cap:** The maximum eligible age for the Post-Higher Education Work stream is now 35 years (retained up to 50 for research Masters and PhD graduates). Stay periods are: 2 years for Bachelor graduates, 2 years for Master (coursework), 3 years for Master (research) / PhD, plus 1-2 years extra for regional campus study.
3. **Proof of Financial Capacity:** International applicants must provide verifiable evidence of AUD $29,710 in annual living costs.
4. **English Language Proficiency:** Minimum IELTS requirement is 6.0 overall for Subclass 500 student visas and 6.5 for Subclass 485 post-study visas.\``
);

// Add Article 6: UK Rules
const newArticle6 = `  {
    id: "art-6",
    title: "UK Higher Education & Visa Framework: Graduate Route & Dependent Rules",
    excerpt: "The UK Home Office clarifies international student guidelines: 2-year Graduate Route retained, updated dependent regulations, and increased maintenance funds.",
    content: \`The UK continues to be a top destination for international scholars pursuing fast-track 1-Year Master's and 3-Year Bachelor's degrees from prestigious Russell Group universities.

### Crucial Regulatory Highlights:
1. **Retention of the Graduate Route:** The UK Government has officially confirmed the continuation of the 2-Year Graduate Route (3 years for PhD), providing unrestricted post-study work authorization across the UK economy.
2. **Dependent Visa Regulations:** International students enrolled on taught postgraduate Master's courses are no longer permitted to bring family dependents. Only students on research-led postgraduate programs (PhD/MPhil) or government-sponsored scholarships may sponsor dependents.
3. **Updated Maintenance Financial Thresholds:** Monthly maintenance requirements stand at £1,483 per month in London (up to 9 months = £13,347) and £1,136 per month outside London (up to 9 months = £10,224).
4. **Course Completion Switching Rule:** Students cannot switch to a Skilled Worker visa until they have formally completed their course of study, safeguarding authentic academic progression.\`,
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
];`;

content = content.replace(
  `  }\n];\n\nconst getCountryFlag`,
  `  },\n${newArticle6}\n\nconst getCountryFlag`
);

fs.writeFileSync(filePath, content, "utf8");
console.log("Updated NewsArticlesPage.tsx successfully!");
