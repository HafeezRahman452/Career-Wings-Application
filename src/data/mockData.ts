import { Destination, Course, Story } from "../types";

export const DESTINATIONS: Destination[] = [
  {
    id: "australia",
    name: "Australia",
    description: "World-class education, vibrant cities, and an exceptional global lifestyle await you with great post-study work opportunities.",
    bgImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4yigSTUW-K_W0dyjkQDFmCIy0kLho485aRzXdtOakgUmIOPi1Njq6g73qv4AUFeBGwHeMZ5JQlieE9PIBfmxLQibuso1rw4mhc5Ba09FcYMHE4FoB1fUAEjb-35aos48JQPK_dbb05sFHI-lCfw8yVJkkh8ejO_rG-7wt9yH8YEm4S6F8lJ7xirOrrPD6BmQOQUR2ERHmlNVl15hZc3NzwLBfoGmoTFUa4WLkaRY5Zu4S4tfDEb_Pf-9fLBd4jpvmvJzc6IAbVDEs",
    flagImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEMK0JYbTnHJJspMM8PH7g9t7LuycJq0JAois2o2PezPUWtOO3NkHjemCMpgnEgzlzGBYBjafPhwl3GMoLDyiE6A1Yzn_30i4Di4fDPghlSJcgPl-WfuGt_q6fBE8DT0SoF6E_FxkQOydIF34QYC08Pc_ar2toGP6N-n1Zt33RzXZTv9CwnylxstSrOhZi5qzXsscGw23rlGbyH9aGrsO3LkosHUg9o_ZaTxWMsXujbMLSTFSomIsd34myK_Rv_dZ67oJGmBEQBH6_",
    benefits: [
      "Access to Group of Eight (Go8) world-leading research universities.",
      "Up to 4 years post-study work rights depending on credentials and location.",
      "High standard of living in student cities like Melbourne, Sydney, and Brisbane.",
      "Generous scholarships starting from AU$5,000 up to full tuition waivers."
    ],
    averageCostOfLiving: "$1,600 - $2,200 AUD / month",
    ieltsRequirement: "6.0 - 6.5 overall (no band less than 6.0)",
    popularUniversities: [
      { id: "unimelb", name: "University of Melbourne", location: "Melbourne", ranking: 14, featuredCourse: "Master of Information Technology", tuitionFee: "$32,000 USD / yr", scholarshipAvailable: "Up to 50% waiver" },
      { id: "anu", name: "Australian National University", location: "Canberra", ranking: 30, featuredCourse: "Master of Business Administration", tuitionFee: "$34,500 USD / yr", scholarshipAvailable: "AU$10,000 flat grant" },
      { id: "usyd", name: "University of Sydney", location: "Sydney", ranking: 19, featuredCourse: "Bachelor of Engineering (Honours)", tuitionFee: "$31,000 USD / yr", scholarshipAvailable: "Vice-Chancellor's Scholarship" }
    ]
  },
  {
    id: "uk",
    name: "United Kingdom",
    description: "A historic academic hub offering globally recognized qualifications, fast track degrees, and an amazing cultural landscape.",
    bgImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTA5mJEn8e2KXoE33Xbn81Cx-3mhEa8SDJoHCLRrB3-JR_QEvqnpdbca8MvSm8gP87n-H-gZrwlIh71grOHx2PjLYFEl6YDGuTrY-C-RVgZKBJQ5x3A8hjVpKMyWWsM8QovZGPgQy96MyirXpf5lZQFntNyIGC75aiT2JgxkDDsJi4ctLUTHCHcZPHQ4ijHNEfpTZmwqD2usEKT7yFcpC77GTSaJi_Kjp_-mk64zHC4gfrdnJwMfyxaIA9UF8HP27TO96CTfKx0ZSk",
    flagImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwEXgfeIz7EKbIAk8oRGhLnUG5UP3SygdYCiwAEH6cm9MSURItKNmhJQ_R-TvTTBx3V-oHNHt97cKabfqp0PjMHaNaPfIpYanuQK9RnI4b2Cqv-PbaG3o_A9F3x32E51rlXk0VDXGbYD0RMmcedZuQ_ZrbPxCQKbOTqPi7gmTimNqwu7TC81rt_Sc6_Sw8NoLkMesxaiuv_MWwsMQWkSXBQIY4z3qVxIOIgyBEEtICIdfwc6ue6fna7GF8fkuchK1C5JkM9llLLy4O",
    benefits: [
      "1-Year Master's Programs saving you valuable time and living expenses.",
      "Graduate Immigration Route enabling 2 years post-graduation stay-back.",
      "Unparalleled academic heritage and global research contributions.",
      "Access to historic institutions in top European and Irish business hubs."
    ],
    averageCostOfLiving: "£1,100 - £1,500 GBP / month",
    ieltsRequirement: "6.5 overall (minimum 6.0 in all components)",
    popularUniversities: [
      { id: "ucl", name: "University College London", location: "London", ranking: 9, featuredCourse: "MSc Data Science", tuitionFee: "$36,000 USD / yr", scholarshipAvailable: "Great Scholarships (£10,000)" },
      { id: "manchester", name: "University of Manchester", location: "Manchester", ranking: 32, featuredCourse: "BSc Computer Science", tuitionFee: "$29,000 USD / yr", scholarshipAvailable: "Academic Excellence Awards" },
      { id: "edinburgh", name: "University of Edinburgh", location: "Edinburgh", ranking: 22, featuredCourse: "MBA Executive Degree", tuitionFee: "$33,000 USD / yr", scholarshipAvailable: "Commonwealth Shared Scholarships" }
    ]
  },
  {
    id: "usa",
    name: "United States",
    description: "Discover spectacular flexibility, massive funding channels, and high-impact industry integrations at top Ivy League & Ivy-Plus schools.",
    bgImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzSc4Z3qERj1z22mAD8Sv_F6YAEmfXWmyN-0EA61WZRaQjM51rHbzo2wROeuOJLYfcb6MBoK4SIegv9eDuboGQpIAGwMlua_LT5p6Gvb6KGXmjoYiQdeRr0vlxwm2ktf7l7-9h8wm0XmIt5QFXGxXl1qH2kJuoR1XHTy0GGI9fjiLjFoSa53mwiMu2bY4VPE0y9qqRdtJMn2-mPFF33sR90WpS2vY-wp-RmbpRgyZqzwIfKuSqV_k06QaFyaVypyHfJyJ724cGT-6o",
    flagImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-dd7iWW95w3Jfu6zI5CH9jusK9FbWg_3lXXSwokMQuTZJw9yJ-IxYSypCTCR5kOEKGNwavTbp2XqiINxcJ67t_fDsvpalIdk6x15EZ44K5frwH7DTXgwYLc2QGC_xdkx1lctVy5Cz-A6TG_T4UMNvC41gyvFywH-aN6rv0g3Io5vUYV3wgwljLFRrBkEuUj2aQUBx9sPaOfBR24_tcXVl5kUSqwMuLYVJWzxZZAFadL_eHXJmDD_LLW9v1dfSmOlcQyWUDVpznbuJ",
    benefits: [
      "STEM-designated OPT allowing up to 36 months of official employment post-graduation.",
      "Most comprehensive academic curricula with major-minor interdisciplinary choices.",
      "Unrivaled startup funding, incubation labs, and direct Silicon Valley/Wall St connections.",
      "Up to 100% need-blind and merit-based financial aid for elite students."
    ],
    averageCostOfLiving: "$1,500 - $2,500 USD / month",
    ieltsRequirement: "6.5 - 7.0 overall (TOEFL or Duolingo often accepted)",
    popularUniversities: [
      { id: "stanford", name: "Stanford University", location: "California", ranking: 5, featuredCourse: "MS in Artificial Intelligence", tuitionFee: "$52,000 USD / yr", scholarshipAvailable: "Knight-Hennessy Scholars" },
      { id: "nyu", name: "New York University", location: "New York", ranking: 38, featuredCourse: "MS in Quantitative Finance", tuitionFee: "$45,000 USD / yr", scholarshipAvailable: "Tisch Merit Fellowships" },
      { id: "bu", name: "Boston University", location: "Boston", ranking: 75, featuredCourse: "BS in Biomedical Sciences", tuitionFee: "$39,000 USD / yr", scholarshipAvailable: "Trustee Merit Scholarships" }
    ]
  },
  {
    id: "newzealand",
    name: "New Zealand",
    description: "Enjoy peaceful, picturesque study locations, warm hospitality, world-class teaching standards, and post-study opportunities.",
    bgImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAop7E-rTwL3MqH8rQVBalv_TKUq2yNe-Y2ktPNvgpGmykYrWB9bhi5wtNCB4UC2viOMYzxDatn60WYwfQot1-pXLtcYVHIk93dTEukdulnvGwn28LZY8DHMxJJinFBsugj4IO4YtYckvy2sor38CRd-X8IDsjjIUmJKbEIKXpb8WoAU_2j28a4ZwqAK1Jonpn2uOyC6mYxvlMArBhyn2bAeGUJyPtc2fxbBDKKcKVcNtF9t3BY4t9_EP875t-x69ERemyCNfQu45lF",
    flagImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAl1SrhO-Wd4-Js10MhdVyONmCjimvfQvqWqL3g90GQkBqE8KNICw9e71VI02Qytr-zqQYjiqZiZ36KPNqlopzW2CQGSdHvXTG6ePXuc7WHw9xefmLaJl9WcZK-aOHaMHBzDdcTmHCD8cBCPjjb6FEVEOGb_v4_7p1vlAG620puGTBP8o5pVMrfH2G0kLDkC2rNsFjInBP8uJebdGDfyR2krT-UIMYWFWgblW-0228HFfx8Z_nGIhtI-cto1B3qZKnJ_8tECGcJDiHY",
    benefits: [
      "All 8 universities ranked in the top 3% globally (QS World University Rankings).",
      "Up to 3-year open post-study work visa to find employment after graduation.",
      "Reputation for high safety, friendliness, and quality of life.",
      "Special discounts on healthcare, public services, and standard transport."
    ],
    averageCostOfLiving: "$1,200 - $1,700 NZD / month",
    ieltsRequirement: "6.0 - 6.5 overall",
    popularUniversities: [
      { id: "uoa", name: "University of Auckland", location: "Auckland", ranking: 68, featuredCourse: "Master of Engineering studies", tuitionFee: "$24,500 USD / yr", scholarshipAvailable: "International Excellence Award" },
      { id: "otago", name: "University of Otago", location: "Dunedin", ranking: 206, featuredCourse: "Bachelor of Medicine / Science", tuitionFee: "$26,000 USD / yr", scholarshipAvailable: "Otago International Pathway grant" }
    ]
  },
  {
    id: "ireland",
    name: "Ireland",
    description: "A fast-emerging tech and pharmaceutical center in Ireland, hosting the EMEA headquarters of Google, Apple, Meta, and Stripe.",
    bgImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8Q-IT3IVyw3Y4PQUBUp0lbTbpGt9Pv-MkLjrnCFuZN2eqGv7phjP3zpaQnMkhjDZiBlR_xg_F467-O6Xlg4SYhFLd54PbHiUJoSblzdXpQd04unSjcxWENQA1QhMutVrlDVSHSd3_0Sf9034gAWhXST5sJ2YhCBZGyjVyWW4lw42LWbR8NXeunO5F-p3w7JaWhZVkszYzNYpuSry5m5dv4gKO6vKOYuVolrnDMUH97hayW5YYmxFRIaNWVW5nsLk7jVuw6ChLRqkX",
    flagImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDu0DE5Ij4HqSwmNGztpMn9eT0IcTvQ7HN5aOryvTEdUoBgRWNsh8JcwM4FrSAbLNOSXEEZK2uIlRnX1c8Ak4eFQAldVQbp6CMOEc_CtMvnChS4xZWlm6Asxj92nBTkYKzpx82UcisMnGx9Hj0Q0-Tc6tGvH1WKfDVdzGySre-SYIt1k8qIadYGZN3sq8Lh7Nt_sUEUynnmH_iTI1_BSZgt_LWCEATRoG2GpL40vr-lJwYJu_4zzZsYlWwzYvPIQv0FEcWUfL5h3FI-",
    benefits: [
      "Ireland's fastest growing economy with an English speaking population.",
      "2-Year stay-back work rights for postgraduate applicants.",
      "Tremendous networking opportunitites with fortune 500 tech companies.",
      "Voted consistently as one of the friendliest populations globally."
    ],
    averageCostOfLiving: "€1,000 - €1,400 EUR / month",
    ieltsRequirement: "6.5 overall (minimum 6.0)",
    popularUniversities: [
      { id: "tcd", name: "Trinity College Dublin", location: "Dublin", ranking: 81, featuredCourse: "MSc in Computer Science (Data Science)", tuitionFee: "$22,000 USD / yr", scholarshipAvailable: "Global Excellence Scholarship" },
      { id: "ucd", name: "University College Dublin", location: "Dublin", ranking: 171, featuredCourse: "MSc in Business Analytics", tuitionFee: "$21,500 USD / yr", scholarshipAvailable: "UCD Graduate Excellence Grants" }
    ]
  },
  {
    id: "canada",
    name: "Canada",
    description: "Exceptional educational standards, friendly diverse campuses, and a robust immigration ecosystem for talented students.",
    bgImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEA7CuM5H4tjqz-BvMoGAlaHUebUaxGh7axSoTk0eTvk0y6jUymNXkMpVyKa1f4QRu2F4sY86NBjEwfI1xFOQchwYWT0erkF4CmFjtKnrr4TB0M79bQwjk4u-0O2bbhKSW5oa3xA3yxyuCTm08pyev5OD0BRkLtqwXXkhR9uKp4PzmHnlqq9m568pPNh_fpUHKVuapy1UJ-hdeZkhsbbn2ph-U0N_X3EQ5iPewYmp935VZmdxeEmTxr9BTD2xFMuc23Q6_gAM_skcN",
    flagImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_mX--pldA6wxMX9CfB_2HJr3TAbFJ_lo94UC8BiGPiSB7UJcwTYww-j004sZAhE5u_V-dbSEYLBuGKD_lwb7XNCo2f0qvSgRqMxniKPy5HnRamkNGIf5JDK3M8E9bDwJr4DgAzASg-0hG0unTVvlWMJ5iTO-H4QWKUSrLP5CjEma_Pu1y2TzlL2Y6jOuKlLilI4fB99QezxhokR2o0SPhvGo8v3mi1rxxg0CPyk2brYNLT1b62qDQFcZtvvrH_EK2f7ZjNzhotb5m",
    benefits: [
      "Post-Graduation Work Permit Program (PGWPP) offering up to 3 years' stay-back.",
      "High concentration of top 100 institutes (Toronto, UBC, McGill).",
      "Dynamic multi-cultural society with direct pathways to Permanent Residency.",
      "Excellent part-time working policies for enrolled students (up to 24 hrs / week)."
    ],
    averageCostOfLiving: "$1,300 - $1,800 CAD / month",
    ieltsRequirement: "6.5 overall (minimum 6.0 in all bands for SDS pathway)",
    popularUniversities: [
      { id: "utoronto", name: "University of Toronto", location: "Ontario", ranking: 21, featuredCourse: "MSc in Applied Computing", tuitionFee: "$38,000 USD / yr", scholarshipAvailable: "Admission Scholarships ($5,000-10,000)" },
      { id: "ubc", name: "University of British Columbia", location: "Vancouver", ranking: 34, featuredCourse: "Master of Data Science", tuitionFee: "$36,200 USD / yr", scholarshipAvailable: "Donald A. Wehrung Award" }
    ]
  },
  {
    id: "europe",
    name: "Europe",
    description: "Vibrant cultural heritage, cutting-edge research facilities, and diverse high-quality academic disciplines across historic global institutions.",
    bgImage: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=800",
    flagImage: "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/eu.svg",
    benefits: [
      "Exceptional public funding offering zero or lower tuition fees at top-tier continental state universities.",
      "Seamless cross-border travel and study opportunities within the 27 Schengen Zone nations.",
      "Up to 2 years stay-back post-graduate search visas available across prominent academic hubs.",
      "Unmatched history, multilingual exposure, and dense academic clusters in Germany, France, and beyond."
    ],
    averageCostOfLiving: "$800 - $1,400 USD / month",
    ieltsRequirement: "6.0 - 6.5 overall",
    popularUniversities: [
      { id: "tum", name: "Technical University of Munich (TUM)", location: "Munich, Germany", ranking: 37, featuredCourse: "MSc in Informatics", tuitionFee: "Free (€0 / semester)", scholarshipAvailable: "DAAD Scholarships Available" },
      { id: "sorbonne", name: "Sorbonne University", location: "Paris, France", ranking: 59, featuredCourse: "MSc in Web Development & AI", tuitionFee: "$3,200 USD / yr", scholarshipAvailable: "Eiffel Excellence Scholarships" }
    ]
  },
  {
    id: "germany",
    name: "Germany",
    description: "Highly reputable tuition-free state universities, pioneering engineering breakouts, and amazing post-study options.",
    bgImage: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=800",
    flagImage: "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/de.svg",
    benefits: [
      "Zero or low tuition fees at premier public universities.",
      "Access to extensive industrial automotive & engineering clusters.",
      "Up to 18 months of post-study job-seeking immigration permit.",
      "Thriving international research hub inside the Schengen Zone."
    ],
    averageCostOfLiving: "€850 - €1,200 EUR / month",
    ieltsRequirement: "6.0 - 6.5 overall (or German language certs)",
    popularUniversities: [
      { id: "tum_g", name: "Technical University of Munich (TUM)", location: "Munich", ranking: 37, featuredCourse: "MSc in Informatics", tuitionFee: "Free (€0 / semester)", scholarshipAvailable: "DAAD Grants Available" },
      { id: "lmu_g", name: "Ludwig Maximilian University of Munich", location: "Munich", ranking: 54, featuredCourse: "Master of Data Science", tuitionFee: "Free (€0 / semester)", scholarshipAvailable: "Deutschlandstipendium" }
    ]
  },
  {
    id: "france",
    name: "France",
    description: "Rich cultural heritage, globally acclaimed business schools, elite specialized engineering grands écoles, and vibrant student lifestyles.",
    bgImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800",
    flagImage: "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/fr.svg",
    benefits: [
      "Access to elite business schools like HEC Paris, INSEAD, and ESSEC.",
      "Extensive state housing subsidies (CAF) available to foreign students.",
      "2-Year post-study job search (APS/temporary resident) authorizations.",
      "Stately historic campuses, rich culinary culture, and French classes."
    ],
    averageCostOfLiving: "€900 - €1,400 EUR / month",
    ieltsRequirement: "6.0 - 6.5 overall (French proficiency is a helper)",
    popularUniversities: [
      { id: "sorbonne_f", name: "Sorbonne University", location: "Paris", ranking: 59, featuredCourse: "MSc in Web Development & AI", tuitionFee: "$3,200 USD / yr", scholarshipAvailable: "Eiffel Excellence Scholarships" },
      { id: "hec_f", name: "HEC Paris", location: "Jouy-en-Josas", ranking: 112, featuredCourse: "Master in International Finance", tuitionFee: "$28,500 USD / yr", scholarshipAvailable: "HEC Foundation Scholarships" }
    ]
  }
];

export const COURSES: Course[] = [
  { id: "c1", name: "MSc in Advanced Computer Science", level: "Postgraduate", duration: "1 Year", subjectArea: "Computer Science & IT", country: "United Kingdom", university: "University College London", estimatedFee: 31000, scholarshipOffer: "£5,000 Merit Award" },
  { id: "c2", name: "Master of Information Technology", level: "Postgraduate", duration: "2 Years", subjectArea: "Computer Science & IT", country: "Australia", university: "University of Melbourne", estimatedFee: 29500, scholarshipOffer: "$10,000 Academic Excellence" },
  { id: "c3", name: "BS in Artificial Intelligence", level: "Undergraduate", duration: "4 Years", subjectArea: "Computer Science & IT", country: "United States", university: "Stanford University", estimatedFee: 49000, scholarshipOffer: "Need-based full scholarship available" },
  { id: "c4", name: "Master of Analytics / Data Science", level: "Postgraduate", duration: "1.5 Years", subjectArea: "Business & Management", country: "Canada", university: "University of British Columbia", estimatedFee: 27000, scholarshipOffer: "CAD $5,000 Entrance Scholarship" },
  { id: "c5", name: "Master of Engineering Studies", level: "Postgraduate", duration: "2 Years", subjectArea: "Engineering & Tech", country: "New Zealand", university: "University of Auckland", estimatedFee: 23200, scholarshipOffer: "NZ $4,000 Dean's Grant" },
  { id: "c6", name: "MSc in Entrepreneurial Finance", level: "Postgraduate", duration: "1 Year", subjectArea: "Business & Management", country: "Ireland", university: "Trinity College Dublin", estimatedFee: 19800, scholarshipOffer: "Up to 50% Tuition Waiver" },
  { id: "c7", name: "Bachelor of Global Business", level: "Undergraduate", duration: "3 Years", subjectArea: "Business & Management", country: "Europe", university: "HEC Paris", estimatedFee: 14500, scholarshipOffer: "€3,000 Academic Top-Up" },
  { id: "c8", name: "MS in Biotechnology & Genomics", level: "Postgraduate", duration: "2 Years", subjectArea: "Bio-Sciences & Health", country: "United States", university: "Boston University", estimatedFee: 37000, scholarshipOffer: "Research Assistantships" },
  { id: "c9", name: "MSc in International Management", level: "Postgraduate", duration: "1 Year", subjectArea: "Business & Management", country: "United Kingdom", university: "University of Manchester", estimatedFee: 28000, scholarshipOffer: "£3,000 Global Leaders Grant" }
];

export const STORIES: Story[] = [
  {
    id: "sn1",
    name: "Ananya Sharma",
    destination: "Australia",
    durationString: "00:45",
    quote: "Carrier Wings guided me at every step. From choosing Melbourne to securing a 30% scholarship, they made it seamless!",
    detailedExperience: "I was extremely anxious about studying abroad, but the counsellors analyzed my high school scores, recommended Computer Science at Melbourne, and prepared me for my visa interview with pristine precision. My visa was approved in just 9 days!",
    photoPosition: "10% center"
  },
  {
    id: "sn2",
    name: "Rahul Verma",
    destination: "United Kingdom",
    durationString: "01:02",
    quote: "Their application support for fast-tracking my Master's at Manchester was outstanding. Outstanding end-to-end support!",
    detailedExperience: "Completing my post-grad in 1 year in the UK was my top priority. Career Wings matched me with outstanding options, helped polish my SOP, and processed my applications entirely free of charge. I am now heading to Manchester with confidence.",
    photoPosition: "30% center"
  },
  {
    id: "sn3",
    name: "Mehak Bansal",
    destination: "United States",
    durationString: "00:58",
    quote: "Thanks to Career Wings, I'm heading to NYU with an incredible academic waiver. Life-changing experience!",
    detailedExperience: "Seeking admission in highly competitive US colleges was daunting. Out of seven counselors I consulted, only Career Wings structured an exact road map for my GPA and GRE scores. Their mock interview setup resolved all my visa anxiety instantly.",
    photoPosition: "50% center"
  },
  {
    id: "sn4",
    name: "Arjun Patel",
    destination: "Canada",
    durationString: "00:50",
    quote: "The pre-departure and visa assistance was incredibly detailed. Highly recommend their free assessments!",
    detailedExperience: "Filing study visas for Canada requires meeting exact SDS guidelines. Career Wings kept me organized, validated my GIC proof, coordinated my biometric testing dates, and hosted a wonderful pre-departure seminar for parents.",
    photoPosition: "70% center"
  },
  {
    id: "sn5",
    name: "Simran Kaur",
    destination: "Ireland",
    durationString: "00:47",
    quote: "Got placed at Trinity College Dublin for MSc Computer Science. Their network and knowledge of Ireland is unmatched.",
    detailedExperience: "I wanted to study in Ireland due to the rich concentration of tech headquarters. Career Wings helped tailor my resume and secure a competitive scholarship. I am now ready to explore Silicon Docks!",
    photoPosition: "95% center"
  }
];
