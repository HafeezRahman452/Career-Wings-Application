export interface EuropeCountry {
  id: string;
  name: string;
  description: string;
  bgImage: string;
  flagImage: string;
  cost: string;
  ielts: string;
  entitlement: string;
  hasDedicatedPage: boolean;
}

export const EUROPE_COUNTRIES: EuropeCountry[] = [
  {
    id: "germany",
    name: "Germany",
    description: "Highly reputable tuition-free state universities, pioneering engineering breakthroughs, and exceptional stay-back rights.",
    bgImage: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=800",
    flagImage: "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/de.svg",
    cost: "€850 - €1,200 / month",
    ielts: "6.0 - 6.5 Band",
    entitlement: "18-Month Stay post-graduation",
    hasDedicatedPage: true
  },
  {
    id: "france",
    name: "France",
    description: "Rich cultural heritage, globally-ranked elite business schools, high student housing subsidies, and elegant campus lifestyles.",
    bgImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800",
    flagImage: "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/fr.svg",
    cost: "€900 - €1,400 / month",
    ielts: "6.0+ Band",
    entitlement: "2-Year Post-study authorization",
    hasDedicatedPage: true
  },
  {
    id: "ireland",
    name: "Ireland",
    description: "Sovereign English-speaking country hosting the EMEA headquarters of Apple, Google, Meta, and hundreds of global tech corporations.",
    bgImage: "https://images.unsplash.com/photo-1549918864-48ac978761a4?auto=format&fit=crop&q=80&w=1200",
    flagImage: "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/ie.svg",
    cost: "€1,000 - €1,400 / month",
    ielts: "6.5 overall",
    entitlement: "2-Year Post-study Graduate Visa",
    hasDedicatedPage: true
  },
  {
    id: "italy",
    name: "Italy",
    description: "Historic state universities, unparalleled global design & culinary capital, high availability of regional government funding waivers.",
    bgImage: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=1200",
    flagImage: "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/it.svg",
    cost: "€600 - €950 / month",
    ielts: "5.5 - 6.0 Band",
    entitlement: "12-Month Stay-back duration",
    hasDedicatedPage: false
  },
  {
    id: "spain",
    name: "Spain",
    description: "Vibrant city cultures, home to world-class triple-accredited business academies like IE, IESE, and ESADE, and extremely warm climate.",
    bgImage: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&q=80&w=800",
    flagImage: "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/es.svg",
    cost: "€650 - €1,000 / month",
    ielts: "6.0+ Band",
    entitlement: "1-Year Job search visa permission",
    hasDedicatedPage: false
  },
  {
    id: "netherlands",
    name: "Netherlands",
    description: "Pioneer in English-taught programs, outstanding standard of living, major commercial operations, and highly prized innovation.",
    bgImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
    flagImage: "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/nl.svg",
    cost: "€950 - €1,500 / month",
    ielts: "6.5 Band overall",
    entitlement: "1-Year Orientation year search right",
    hasDedicatedPage: false
  },
  {
    id: "sweden",
    name: "Sweden",
    description: "The global hub of innovation, environmental progress, high equality, and prestigious state-of-the-art laboratory systems.",
    bgImage: "https://images.unsplash.com/photo-1509824227185-9c5a01ceba0d?auto=format&fit=crop&q=80&w=800",
    flagImage: "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/se.svg",
    cost: "€850 - €1,300 / month",
    ielts: "6.5 Band overall",
    entitlement: "1-Year Job seeking status approval",
    hasDedicatedPage: false
  },
  {
    id: "switzerland",
    name: "Switzerland",
    description: "The international benchmark for luxury hostelry management, high finance, international relations, and alpine lifestyle.",
    bgImage: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=1200",
    flagImage: "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/ch.svg",
    cost: "€1,200 - €1,900 / month",
    ielts: "6.0 - 6.5 Band",
    entitlement: "6-Months Graduate search rights",
    hasDedicatedPage: false
  },
  {
    id: "austria",
    name: "Austria",
    description: "Musical capital of Vienna, high security index, and highly subsidized state tuition rates for global students.",
    bgImage: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&q=80&w=800",
    flagImage: "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/at.svg",
    cost: "€750 - €1,100 / month",
    ielts: "6.0+ Band",
    entitlement: "12-Month Stay-back permit",
    hasDedicatedPage: false
  },
  {
    id: "belgium",
    name: "Belgium",
    description: "Headquarters of the European Union, dense cultural diversity, and superb bio-pharmaceutical research clusters.",
    bgImage: "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&q=80&w=800",
    flagImage: "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/be.svg",
    cost: "€850 - €1,200 / month",
    ielts: "6.5 Band",
    entitlement: "12-Month Orientation-year extension",
    hasDedicatedPage: false
  },
  {
    id: "denmark",
    name: "Denmark",
    description: "Happiest global society, pioneering green energy and wind science facilities, and high citizen security.",
    bgImage: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&q=80&w=800",
    flagImage: "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/dk.svg",
    cost: "€900 - €1,450 / month",
    ielts: "6.5 Band",
    entitlement: "2-Year Extension for jobs search",
    hasDedicatedPage: false
  },
  {
    id: "finland",
    name: "Finland",
    description: "The gold standard of public education quality, clean-tech fields, high technology focus, and extensive stay-back.",
    bgImage: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=800",
    flagImage: "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/fi.svg",
    cost: "€800 - €1,200 / month",
    ielts: "6.0 - 6.5 Band",
    entitlement: "2-Year Stay-back post study",
    hasDedicatedPage: false
  },
  {
    id: "norway",
    name: "Norway",
    description: "Stately fjords, majestic safety records, advanced maritime engineering, and excellent state social security policies.",
    bgImage: "https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?auto=format&fit=crop&q=80&w=800",
    flagImage: "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/no.svg",
    cost: "€950 - €1,500 / month",
    ielts: "6.5 Band",
    entitlement: "12-Month Job hunting stay-back",
    hasDedicatedPage: false
  },
  {
    id: "poland",
    name: "Poland",
    description: "Exceptional modern tech hubs, high-grade medical academies, and extremely economical living/tuition budgets.",
    bgImage: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&q=80&w=800",
    flagImage: "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/pl.svg",
    cost: "€450 - €750 / month",
    ielts: "5.5 - 6.0 Band",
    entitlement: "9-Month Stay back search period",
    hasDedicatedPage: false
  },
  {
    id: "portugal",
    name: "Portugal",
    description: "Sunny Mediterranean climate, incredible cost-performance living, fast-emerging tech and startup events.",
    bgImage: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&q=80&w=1200",
    flagImage: "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/pt.svg",
    cost: "€600 - €900 / month",
    ielts: "6.0 Band",
    entitlement: "12-Month Professional visa option",
    hasDedicatedPage: false
  },
  {
    id: "czechia",
    name: "Czech Republic",
    description: "Golden architectural masterpiece cities, highly recognized science programs, and incredibly affordable local expenses.",
    bgImage: "https://images.unsplash.com/photo-1496318447583-f524534e9ce1?auto=format&fit=crop&q=80&w=800",
    flagImage: "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/cz.svg",
    cost: "€500 - €800 / month",
    ielts: "6.0 Band",
    entitlement: "9-Month Postgraduate job seeker permit",
    hasDedicatedPage: false
  },
  {
    id: "hungary",
    name: "Hungary",
    description: "Prestigious dental, medical, and pharmacy courses with high transfer values across the global medical market.",
    bgImage: "https://images.unsplash.com/photo-1503152394-c571994fd383?auto=format&fit=crop&q=80&w=800",
    flagImage: "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/hu.svg",
    cost: "€500 - €750 / month",
    ielts: "5.5 - 6.0 Band",
    entitlement: "9-Month Study-to-Work visa validity",
    hasDedicatedPage: false
  },
  {
    id: "greece",
    name: "Greece",
    description: "Ancient heritage, excellent naval & maritime courses, and low Mediterranean living costs.",
    bgImage: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800",
    flagImage: "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/gr.svg",
    cost: "€550 - €850 / month",
    ielts: "6.0 Band",
    entitlement: "12-Month Residence permit extension",
    hasDedicatedPage: false
  },
  {
    id: "luxembourg",
    name: "Luxembourg",
    description: "Highest GDP per capita globally, highly polyglot community, exceptional banking services, and secure jobs.",
    bgImage: "https://images.unsplash.com/photo-1573155993874-d5d48af862ba?auto=format&fit=crop&q=80&w=800",
    flagImage: "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/lu.svg",
    cost: "€1,100 - €1,700 / month",
    ielts: "6.5 Band",
    entitlement: "9-Month Post-study work rights",
    hasDedicatedPage: false
  },
  {
    id: "estonia",
    name: "Estonia",
    description: "The digital republic of Europe, home of global giants like Skype, and top-tier computer science curriculum.",
    bgImage: "https://images.unsplash.com/photo-1517840901100-8179e982acb7?auto=format&fit=crop&q=80&w=1200",
    flagImage: "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/ee.svg",
    cost: "€500 - €800 / month",
    ielts: "6.0 Band",
    entitlement: "9-Month Job search visa permit",
    hasDedicatedPage: false
  },
  {
    id: "malta",
    name: "Malta",
    description: "Official English-speaking island nation with stunning beaches, warm sun, and highly affordable hospitality degrees.",
    bgImage: "https://images.unsplash.com/photo-1520116468816-95b69f847357?auto=format&fit=crop&q=80&w=800",
    flagImage: "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/mt.svg",
    cost: "€600 - €950 / month",
    ielts: "6.0 Band",
    entitlement: "6-Month Post-study work permission",
    hasDedicatedPage: false
  },
  {
    id: "latvia",
    name: "Latvia",
    description: "High telecom, woodwork, and pharmaceutical engineering specialties with exceptionally economic structures.",
    bgImage: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=800",
    flagImage: "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/lv.svg",
    cost: "€450 - €700 / month",
    ielts: "5.5 - 6.0 Band",
    entitlement: "6-Month Post-graduate duration",
    hasDedicatedPage: false
  },
  {
    id: "lithuania",
    name: "Lithuania",
    description: "Famous laser technology and biotechnology research hubs backed by modern student facilities.",
    bgImage: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=1200",
    flagImage: "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/lt.svg",
    cost: "€450 - €750 / month",
    ielts: "5.5 - 6.0 Band",
    entitlement: "12-Month Job seek visa window",
    hasDedicatedPage: false
  },
  {
    id: "slovakia",
    name: "Slovakia",
    description: "Unmatched heavy manufacturing, automotive complexes, and highly pleasant, budget-conscious student hubs.",
    bgImage: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=800",
    flagImage: "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/sk.svg",
    cost: "€500 - €800 / month",
    ielts: "5.5+ Band",
    entitlement: "9-Month Post-graduate allowance",
    hasDedicatedPage: false
  },
  {
    id: "slovenia",
    name: "Slovenia",
    description: "Extremely pristine eco-tourism, rich biodiversity academies, and highly-subsidized state tuition fees.",
    bgImage: "https://images.unsplash.com/photo-1499591934245-40b55745b905?auto=format&fit=crop&q=80&w=800",
    flagImage: "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/si.svg",
    cost: "€600 - €900 / month",
    ielts: "6.0 Band",
    entitlement: "9-Month Temporary residency stay",
    hasDedicatedPage: false
  },
  {
    id: "croatia",
    name: "Croatia",
    description: "Breathtaking Adriatic sea lines, high tourism management, and friendly historical city environments.",
    bgImage: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1200",
    flagImage: "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/hr.svg",
    cost: "€550 - €850 / month",
    ielts: "6.0 Band",
    entitlement: "12-Month Post-study residency",
    hasDedicatedPage: false
  },
  {
    id: "cyprus",
    name: "Cyprus",
    description: "Exceptional modern college campuses, highly safe environment, and direct routes into general hospitality careers.",
    bgImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
    flagImage: "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/cy.svg",
    cost: "€500 - €800 / month",
    ielts: "5.5+ Band",
    entitlement: "6-Month Graduate stay-back search",
    hasDedicatedPage: false
  },
  {
    id: "romania",
    name: "Romania",
    description: "Lightning-fast internet infrastructure, rapidly growing IT/software industry, and super cheap local living costs.",
    bgImage: "https://images.unsplash.com/photo-1578301978018-3005759f48f7?auto=format&fit=crop&q=80&w=800",
    flagImage: "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/ro.svg",
    cost: "€400 - €700 / month",
    ielts: "5.5+ Band",
    entitlement: "6-Month Post-graduate duration",
    hasDedicatedPage: false
  },
  {
    id: "bulgaria",
    name: "Bulgaria",
    description: "Very low cost-of-living index, exceptional historic medical and pharmacy degrees with direct EU recognition.",
    bgImage: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&q=80&w=1200",
    flagImage: "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/bg.svg",
    cost: "€400 - €650 / month",
    ielts: "5.5+ Band",
    entitlement: "9-Month Visa extension allowance",
    hasDedicatedPage: false
  }
];
