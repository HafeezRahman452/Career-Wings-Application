const fs = require("fs");
const path = require("path");

const seoFilePath = path.join(__dirname, "../src/data/seoContent.ts");
let seoContent = fs.readFileSync(seoFilePath, "utf8");

// 1. Update Australia content
seoContent = seoContent.replace(
  `"Genuine Student Test (GST): Clear declaration of academic intentions and hometown links."`,
  `"Genuine Student (GS) Requirement: Evidence of genuine academic progression, course relevance, and economic ties to home country."`
);

seoContent = seoContent.replace(
  `"4. Complete your Statement of Purpose (SOP) tailored to GST standards."`,
  `"4. Complete your Statement of Purpose (SOP) tailored to modern Genuine Student (GS) standards."`
);

seoContent = seoContent.replace(
  `{ q: "Can I transition from subclass 500 to work visa?", a: "Yes, once you finish an eligible 2-year degree, you can transition to the Subclass 485 Graduate work visa." },
      { q: "Are scholarships available?", a: "Yes, Australian universities offer competitive merit scholar-grants ranging from AU$5,050 to 100% tuition-free waivers." },
      { q: "Is GTE replaced by GST?", a: "Yes, Australia has transitionally introduced the Genuine Student Test (GST) to focus on students' direct career alignment." }`,
  `{ q: "Can I transition from subclass 500 to work visa?", a: "Yes, graduates of eligible CRICOS degrees can transition to the Subclass 485 Post-Higher Education Work stream (2 years for Bachelors, 2 years for Masters by coursework, 3 years for Masters by research/PhD, with an age limit of up to 35 for coursework graduates)." },
      { q: "Are scholarships available?", a: "Yes, Australian universities offer competitive merit scholar-grants ranging from AU$5,050 to 100% tuition-free waivers." },
      { q: "What replaced the old GTE requirement?", a: "Australia introduced the Genuine Student (GS) requirement, replacing GTE with targeted contextual questions assessing program relevance, career prospects, and genuine study intent." },
      { q: "What is the new financial capacity requirement for Australia?", a: "Applicants must show minimum liquid funds of AUD $29,710 for 12 months of living costs, plus 1st-year tuition and return travel expenses." }`
);

// 2. Update UK content (dependents rule, maintenance funds, graduate route)
seoContent = seoContent.replace(
  `"2. Gather financial evidence holding required funds (£12,006 inside London / £9,207 outside London) for 28 consecutive days."`,
  `"2. Gather financial evidence holding required maintenance funds (£1,483/month inside London up to 9 months = £13,347 / £1,136/month outside London up to 9 months = £10,224) for 28 consecutive days."`
);

seoContent = seoContent.replace(
  `{ q: "Is IELTS mandatory?", a: "Many universities offer IELTS exemptions if you scored highly in English during your high school studies." },
      { q: "What is the stay-back period?", a: "The Graduate Route allows you to live and work in the UK for up to 2 years (3 years for PhD graduates)." }`,
  `{ q: "Can international students bring dependents to the UK?", a: "Under updated UK Home Office rules, international students on taught postgraduate Master courses can no longer bring family dependents. Only students on postgraduate research degrees (PhD/Doctorate) and government-sponsored scholars may bring dependents." },
      { q: "What is the stay-back period under the UK Graduate Route?", a: "The UK Graduate Route provides an unsponsored 2-year post-study work visa for Bachelor and Master graduates (3 years for PhD graduates) with unrestricted employment rights." },
      { q: "Can students switch to a UK work visa before graduation?", a: "No, under Home Office regulations, students cannot switch to a Skilled Worker or other work visa until they have successfully completed their course of study." }`
);

// 3. Update Canada content (Replacing decommissioned SDS with standard IRCC permit + PAL)
seoContent = seoContent.replace(
  `"IELTS: Minimum overall 6.5 (with all individual bands 6.0+ for SDS pathway)."`,
  `"Language Proficiency: Minimum IELTS 6.5 (or PTE 60+) with strong communication scores for university and college programs."`
);

seoContent = seoContent.replace(
  `"4. Submit your Study Permit application via the IRCC online portal under SDS guidelines."`,
  `"4. Obtain your Provincial Attestation Letter (PAL) and submit your Study Permit application online via the official IRCC portal."`
);

seoContent = seoContent.replace(
  `{ q: "Is SDS faster?", a: "Yes, the Student Direct Stream (SDS) offers prioritized study permit processing in just 20 days." }`,
  `{ q: "What is the Provincial Attestation Letter (PAL) requirement?", a: "IRCC requires most international post-secondary undergraduate and college applicants to provide a Provincial Attestation Letter (PAL) issued by their chosen province alongside the DLI Letter of Acceptance." },
      { q: "What are the new PGWP rules for Canada?", a: "Graduates of university degree programs (Bachelor, Master, Doctorate) remain eligible for up to a 3-year PGWP with Canadian Language Benchmark (CLB) 7. College diploma graduates must meet CLB 5 and graduate from fields linked to long-term labour shortages." },
      { q: "Can spouses of international students in Canada get open work permits?", a: "Spousal open work permits are restricted to spouses of students enrolled in Master degree programs of 16+ months or doctoral/professional degree programs." }`
);

// Canada sections update
seoContent = seoContent.replace(
  `Career Wings Consultants provides direct, step-by-step counselling to obtain your Letter of Acceptance (LOA) from a Top University in Canada. We optimize your Statement of Purpose (SOP) to pass IRCC requirements easily, ensuring maximum approval rates.`,
  `Career Wings Consultants provides direct, step-by-step counselling to obtain your Letter of Acceptance (LOA) and required Provincial Attestation Letter (PAL) for Canada. We optimize your Statement of Purpose (SOP) to satisfy IRCC genuine study guidelines, ensuring maximum approval rates.`
);

seoContent = seoContent.replace(
  `"1. Secure an official Letter of Acceptance (LOA) from a Designated Learning Institution (DLI).",
      "2. Complete your upfront medical checkup at a panel physician and pay your 1st-year tuition fees.",
      "3. Purchase your GIC certificate of CAD$20,635 from an approved Canadian bank.",
      "4. Obtain your Provincial Attestation Letter (PAL) and submit your Study Permit application online via the official IRCC portal."`,
  `"1. Secure an official Letter of Acceptance (LOA) from a Designated Learning Institution (DLI).",
      "2. Obtain your Provincial Attestation Letter (PAL) through your educational institution.",
      "3. Purchase your GIC certificate of CAD$20,635 from an approved Canadian financial institution (Scotiabank, CIBC, ICICI, etc.).",
      "4. Complete upfront medical examination and submit your Study Permit application through the IRCC portal."`
);

// 4. Update Germany content
seoContent = seoContent.replace(
  `"Academic Eligibility: Minimum 65%+ in high school or bachelors (must pass Uni-Assist checks).",
      "IELTS score: 6.0 to 6.5 minimum (depending on university). Duolingo generally not accepted.",
      "German Language Option: B2 or C1 level is mandatory if you choose German-taught tracks.",
      "Financial Proof: Certified blocked account holding €11,904 before visa application."`,
  `"Academic Eligibility: Minimum 65%+ in high school or bachelors (evaluated via Uni-Assist or Anabin).",
      "APS Certificate: Mandatory academic verification certificate from the German Academic Evaluation Centre (APS) for Indian, Chinese, and Vietnamese applicants.",
      "IELTS / German Proficiency: Minimum 6.5 for English-taught Master programs, or B2/C1 TestDaF/Goethe for German-taught degrees.",
      "Financial Proof (Sperrkonto): Certified blocked account holding €11,904 (€992/month) before visa appointment."`
);

seoContent = seoContent.replace(
  `{ q: "Is German language mandatory?", a: "No, there are hundreds of master's and bachelor's programs instructed entirely in English." },
      { q: "Can I work part-time?", a: "Yes, international students are legally allowed to work 140 full days or 280 half days per year." }`,
  `{ q: "Is German language proficiency mandatory?", a: "No, thousands of accredited Master and Bachelor programs are taught 100% in English, though conversational A1/A2 German is recommended for daily life and internships." },
      { q: "What are the updated part-time work limits in Germany?", a: "International students from non-EU countries are legally permitted to work up to 140 full days or 280 half days per calendar year (increased from previous 120 full days)." },
      { q: "What is the Opportunity Card (Chancenkarte)?", a: "Germany introduced the Opportunity Card (Chancenkarte), a points-based system allowing qualified international professionals and graduates to enter Germany for up to one year to find qualified employment." }`
);

fs.writeFileSync(seoFilePath, seoContent, "utf8");
console.log("Updated seoContent.ts successfully!");
