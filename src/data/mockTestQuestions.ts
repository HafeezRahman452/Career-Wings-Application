// Practice Questions Bank with 150 Premium questions (50 overall/vocabulary, 50 Reading split by test format, 50 Spoken English Grammar)
// Highly specific, jumbled, and randomized on initialization.

export interface SandboxQuestion {
  question: string;
  options: string[];
  correct: string;
  hint: string;
  explanations: string;
  tag?: string; // e.g. "ielts", "pte", "toefl", "duolingo", or a grammar category like "Tenses"
}

// 1. Vocabulary & MCQ Questions (50 Questions)
export const vocabularyQuestions: SandboxQuestion[] = [
  {
    question: "Which word best completes the sentence: 'The candidate decided to __________ her application after receiving a competitive funding package from another institute.'",
    options: ["withdaw", "substantiate", "withdraw", "bolster"],
    correct: "withdraw",
    hint: "To pull out of a process or retract a submission.",
    explanations: "Withdraw is the correct spelling and appropriate context for taking back an active application."
  },
  {
    question: "Select the professional synonym for 'METICULOUS':",
    options: ["careless", "exacting", "rapid", "frequent"],
    correct: "exacting",
    hint: "Showing extreme care, precision, and high standards.",
    explanations: "Exacting implies demanding perfection and attention to details, matching meticulous definition."
  },
  {
    question: "Choose the correct academic word: 'The study abroad office seeks to __________ international cultural integration on campus.'",
    options: ["hinder", "foster", "prohibit", "neglect"],
    correct: "foster",
    hint: "To support growth, development, or positive integration and relations.",
    explanations: "Foster means to encourage or promote development of international integration."
  },
  {
    question: "Complete the sentence: 'Her outstanding academic achievements were deemed __________ of the prestigious gold medal.'",
    options: ["respectable", "representative", "eligible", "worthy"],
    correct: "worthy",
    hint: "Used with 'of' to mean deserving or having adequate merit.",
    explanations: "Worthy of is the correct idiomatic collocation to show high merit or value."
  },
  {
    question: "Select the word that means 'lasting for a very short time':",
    options: ["ephemeral", "perpetual", "stagnant", "ubiquitous"],
    correct: "ephemeral",
    hint: "Transitory, short-lived, fleeting, lasting only momentarily.",
    explanations: "Ephemeral comes from Greek, describing temporary or short-lived phases."
  },
  {
    question: "Fill in the blank: 'The new student visa rules aim to __________ potential administrative delays for genuine students.'",
    options: ["mitigate", "exacerbate", "obfuscate", "accumulate"],
    correct: "mitigate",
    hint: "To make less severe, serious, or painful.",
    explanations: "Mitigate means to alleviate or reduce the severity of delays and bottlenecks."
  },
  {
    question: "What is the antonym of the word 'AMBIGUOUS'?",
    options: ["obscure", "equivocal", "explicit", "vague"],
    correct: "explicit",
    hint: "Stated clearly and in detail, leaving no room for confusion.",
    explanations: "Ambiguous means unclear or multi-interpretable, hence explicit is the absolute antonym."
  },
  {
    question: "Complete the statement: 'The researcher had to __________ her preliminary findings with empirical data before publication.'",
    options: ["corroborate", "falsify", "contradict", "dismiss"],
    correct: "corroborate",
    hint: "Confirm or give support to a statement, theory, or finding.",
    explanations: "Corroborate means supporting or validating structural findings with real evidence."
  },
  {
    question: "Select the correct word: 'Living in a foreign country can often create a __________ of cultural adjustments.'",
    options: ["multitude", "paucity", "scarcity", "monotony"],
    correct: "multitude",
    hint: "A very large number of something.",
    explanations: "Multitude refers to a vast array or high quantity of adjustments needed when moving abroad."
  },
  {
    question: "Choose the word indicating 'perfectly clean, neat, or untouched':",
    options: ["pristine", "tarnished", "cluttered", "medieval"],
    correct: "pristine",
    hint: "In its original condition; unspoiled or clean.",
    explanations: "Pristine academic records show no visual or administrative blemishes."
  },
  {
    question: "Which word indicates 'the highest point' of success or career?",
    options: ["zenith", "abyss", "nadir", "periphery"],
    correct: "zenith",
    hint: "The peak or pinnacle of something.",
    explanations: "Zenith means the highest point reached by a celestial body, or height of success."
  },
  {
    question: "Fill in the sentence: 'Your statement of purpose must be __________, covering your goals without wordy padding.'",
    options: ["concise", "verbose", "rambling", "redundant"],
    correct: "concise",
    hint: "Giving a lot of information clearly and in few words.",
    explanations: "Concise SOPs capture the reviewer's attention fast without boring them."
  },
  {
    question: "Which word completes the context: 'We must not let temporary setbacks __________ our future visa plans.'",
    options: ["dampen", "expedite", "cultivate", "ratify"],
    correct: "dampen",
    hint: "Make less strong, active, or intense.",
    explanations: "Dampen enthusiasm means to reduce or repress optimistic motivation."
  },
  {
    question: "Select the professional synonym for 'REDUNDANT'?",
    options: ["essential", "superfluous", "deficient", "invaluable"],
    correct: "superfluous",
    hint: "Unnecessary, especially through being more than enough.",
    explanations: "Superfluous information in visual CVs can lead to early rejections."
  },
  {
    question: "Choose the correct phrase: 'The visa guidelines are __________ to change without prior notice.'",
    options: ["subject", "liable", "inclined", "prone"],
    correct: "subject",
    hint: "Under the authority of, conditional or dependent on.",
    explanations: "Subject to change is the standard formal collocation used in global documentation."
  },
  {
    question: "Which term means 'to put off or delay doing something'?",
    options: ["procrastinate", "accelerate", "dispatch", "precipitate"],
    correct: "procrastinate",
    hint: "To postpone action, especially out of habit or laziness.",
    explanations: "Procrastination is the worst enemy of timely study abroad admissions files."
  },
  {
    question: "Complete the sentence: 'The speaker's argument was __________, backed by decades of reputable research.'",
    options: ["flimsy", "cogent", "erroneous", "submissive"],
    correct: "cogent",
    hint: "Clear, logical, persuasive, and convincing.",
    explanations: "Cogent arguments during interviews earn candidate admissions confidence."
  },
  {
    question: "Choose the word denoting 'wealthy or prosperous':",
    options: ["affluent", "indigent", "destitute", "penurious"],
    correct: "affluent",
    hint: "Having a great deal of money; wealthy.",
    explanations: "Affluent neighborhoods usually have top-tier high school facilities."
  },
  {
    question: "Select the word that completes: 'The foreign currency exchange rate decided to __________ wildly.'",
    options: ["fluctuate", "stabilize", "stagnate", "coalesce"],
    correct: "fluctuate",
    hint: "Rise and fall irregularly in number or amount.",
    explanations: "Exchange rates fluctuate constantly based on global microeconomic indicators."
  },
  {
    question: "What is the professional term for 'working together to produce something'?",
    options: ["collaborating", "competing", "segregating", "dissenting"],
    correct: "collaborating",
    hint: "To co-operate or join forces for a common output.",
    explanations: "Collaborating with global labs advances your research thesis weight."
  },
  {
    question: "Choose the word that means 'highly harmful or destructive':",
    options: ["deleterious", "salubrious", "innocuous", "benign"],
    correct: "deleterious",
    hint: "Causing harm, damage or slow deterioration.",
    explanations: "Deleterious study habits negatively impact your final band targets."
  },
  {
    question: "Complete: 'She has an __________ ability to resolve complex math problems under stress.'",
    options: ["innate", "acquired", "artificial", "external"],
    correct: "innate",
    hint: "Inborn, natural, or inherent from birth.",
    explanations: "Innate talents can be amplified further by structured professional mentoring."
  },
  {
    question: "Choose the word that completes: 'The system will __________ your documents and verify credentials.'",
    options: [" scrutinize", "overlook", "ignore", "discard"],
    correct: "scrutinize",
    hint: "Examine or inspect closely and thoroughly.",
    explanations: "Scrutinize is the academic word for deep, rigorous exploration."
  },
  {
    question: "What does are the letters 'SOP' represent in Study Abroad context?",
    options: ["Statement of Purpose", "Status of Passport", "Standard Operating Plan", "Schedule of Payments"],
    correct: "Statement of Purpose",
    hint: "The main essay outlining your career goals and motives.",
    explanations: "Statement of Purpose (SOP) is evaluated thoroughly by the visa officer."
  },
  {
    question: "Select the word that means 'present or found everywhere':",
    options: ["ubiquitous", "scarce", "localized", "remote"],
    correct: "ubiquitous",
    hint: "Ever-present, appearing everywhere simultaneously.",
    explanations: "Smartphones are ubiquitous in modern educational lecture rooms."
  },
  {
    question: "Fill in the blank: 'Because the evidence was __________, the council delayed the academic hearing.'",
    options: ["inconclusive", "definitive", "resolute", "patent"],
    correct: "inconclusive",
    hint: "Not leading to a firm conclusion or clear result.",
    explanations: "Inconclusive results require subsequent experimental validations."
  },
  {
    question: "Complete the sentence: 'The foreign embassy decided to __________ the applicant's visa after finding incorrect references.'",
    options: ["evoke", "revoke", "invoke", "convoke"],
    correct: "revoke",
    hint: "Officially cancel, void, or take back a privilege.",
    explanations: "To revoke a visa means to cancel its validity completely."
  },
  {
    question: "Choose the best academic word for 'showing great energy, enthusiasm, or dedication':",
    options: ["zealous", "apathetic", "lethargic", "indifferent"],
    correct: "zealous",
    hint: "Full of zeal, passionate, or deeply devoted.",
    explanations: "Zealous researchers spend extra hours gathering pristine field samples."
  },
  {
    question: "Which word represents 'the basic physical and organizational structures' of a country or university?",
    options: ["infrastructure", "ecosystem", "superstructure", "geography"],
    correct: "infrastructure",
    hint: "Roads, power grids, buildings, networks, or fundamental facilities.",
    explanations: "A university with modern research infrastructure fosters deeper skillsets."
  },
  {
    question: "Fill in the sentence: 'The advisor helped to __________ the complicated application steps into bullet points.'",
    options: ["simplify", "complicate", "confound", "elaborate"],
    correct: "simplify",
    hint: "To make easier to understand or do.",
    explanations: "Simplifying guidelines saves precious minutes for potential premium applicants."
  },
  {
    question: "Which word denotes 'a positive result or benefit'?",
    options: ["adversity", "boon", "calamity", "catastrophe"],
    correct: "boon",
    hint: "A thing that is helpful or beneficial; a timely blessing.",
    explanations: "Receiving a fully-funded scholarship is an immense boon for international students."
  },
  {
    question: "Select the word representing 'doing something secretly or stealthily':",
    options: ["surreptitious", "blatant", "overt", "transparent"],
    correct: "surreptitious",
    hint: "Kept secret, especially because it would not be approved of.",
    explanations: "Plagiarism checkers catch surreptitious copy-paste attempts within seconds."
  },
  {
    question: "What is the synonym of the academic verb 'TO REITERATE'?",
    options: ["repeat", "retract", "contradict", "renounce"],
    correct: "repeat",
    hint: "Say something again for clarification or emphasis.",
    explanations: "Reiterate is a professional term for repeating points in structured summaries."
  },
  {
    question: "Choose the word denoting 'living, growing, or taking place in water':",
    options: ["aquatic", "terrestrial", "arboreal", "subterranean"],
    correct: "aquatic",
    hint: "Relating to water habitats or systems.",
    explanations: "Marine biology programs emphasize analyzing aquatic organisms directly."
  },
  {
    question: "Fill in the blank: 'We have to __________ the credentials of every counselor to ensure high guidance values.'",
    options: ["verify", "falsify", "neglect", "dismiss"],
    correct: "verify",
    hint: "To make sure that something is true, accurate, or genuine.",
    explanations: "Verify stands for authenticating background certificates precisely."
  },
  {
    question: "Select the word meaning 'not logical or reasonable':",
    options: ["irrational", "rational", "logical", "judicious"],
    correct: "irrational",
    hint: "Absence of sound thinking, reason, or clear logic.",
    explanations: "Making emotional, irrational visa choices leads directly to critical denials."
  },
  {
    question: "Complete: 'The global economy is entering a state of __________ with rapid technological changes.'",
    options: ["flux", "stagnation", "rigidity", "equilibrium"],
    correct: "flux",
    hint: "Continuous change or flow, unstable transition.",
    explanations: "Constant flux requires tech candidates to upskill continuously."
  },
  {
    question: "Select the correct academic word: 'The mentor's guidance was __________ in shaping his doctoral research path.'",
    options: ["instrumental", "superficial", "detrimental", "negligible"],
    correct: "instrumental",
    hint: "Serving as a key means or agent; critically helpful.",
    explanations: "Instrumental means playing a highly influential or crucial part."
  },
  {
    question: "Which word means 'to absorb or fully understand information':",
    options: ["assimilate", "segregate", "exclude", "repel"],
    correct: "assimilate",
    hint: "Take in information, ideas, or culture and understand fully.",
    explanations: "Studying abroad helps scholars assimilate diverse cultural orientations."
  },
  {
    question: "Choose the correct spelling:",
    options: ["entrepreneur", "entreprenuer", "enterpreneur", "entreperneur"],
    correct: "entrepreneur",
    hint: "A person who sets up a business, taking on financial risks in the hope of profit.",
    explanations: "Entrepreneur contains 'eu' in the final syllable and 'pre' after 'entre'."
  },
  {
    question: "Fill in the blank: 'The university grants division has a __________ of funds this semester, limiting admissions.'",
    options: ["dearth", "surplus", "abundance", "plethora"],
    correct: "dearth",
    hint: "A scarcity or lack of something.",
    explanations: "Dearth indicates an acute shortage or absence of available materials."
  },
  {
    question: "What is the meaning of 'PRAGMATIC'?",
    options: ["idealistic", "practical", "theoretical", "dogmatic"],
    correct: "practical",
    hint: "Dealing with things sensibly and realistically based on practical conditions.",
    explanations: "Pragmatic choices consider budgets, rankings, and employment indicators over dreams."
  },
  {
    question: "Complete the sentence: 'His speech was so __________ that it instantly motivated the student body to register.'",
    options: ["eloquent", "monotonous", "incoherent", "lackluster"],
    correct: "eloquent",
    hint: "Fluent, persuasive, clear, and powerful in writing or speech.",
    explanations: "Eloquent delivery maximizes success in spoken English and debate tests."
  },
  {
    question: "Choose the term that means 'to make something clear or easy to understand':",
    options: ["elucidate", "complicate", "befuddle", "mask"],
    correct: "elucidate",
    hint: "Explain or shed light on a system, theory, or statement.",
    explanations: "The coach will elucidate tricky syntax components in weekly tutorial blocks."
  },
  {
    question: "Select the word meaning 'not harmful or offensive':",
    options: ["innocuous", "toxic", "nocuous", "hazardous"],
    correct: "innocuous",
    hint: "Harmless, safe, or producing no negative outcomes.",
    explanations: "An innocuous spelling variation might be tolerated, but grammar errors are penalized."
  },
  {
    question: "Fill in: 'The international study expo generated an __________ response of over 10,000 visitors.'",
    options: ["overwhelming", "insignificant", "scant", "hostile"],
    correct: "overwhelming",
    hint: "Very great in amount; overpowering or stunning.",
    explanations: "Overwhelming response highlights public confidence in Career Wings Consultants."
  },
  {
    question: "Which word means 'highly skilled or proficient':",
    options: ["adept", "inept", "amateur", "novice"],
    correct: "adept",
    hint: "Very skilled or expert at something.",
    explanations: "Adept counselors format SOP arguments neatly to bypass visa hurdles."
  },
  {
    question: "Complete: 'To ensure fairness, final test evaluations are conducted __________.'",
    options: ["impartially", "subjectively", "erratically", "arbitrarily"],
    correct: "impartially",
    hint: "In a way that is not biased; treating all rivals equally.",
    explanations: "Impartially means scores are assigned strictly based on objective rubrics."
  },
  {
    question: "Specify the antonym of the verb 'TO ALIENATE':",
    options: ["unite", "isolate", "distance", "exclude"],
    correct: "unite",
    hint: "To bring together; make family or associate with.",
    explanations: "Alienate means to estrange or push apart, while unite stands for bringing together."
  },
  {
    question: "Choose the word expressing 'strong disagreement or protest':",
    options: ["dissent", "assent", "acquiescence", "concurrence"],
    correct: "dissent",
    hint: "The expression or holding of opinions at variance with those official.",
    explanations: "Dissent refers to holding or voicing views that conflict with formal systems."
  }
];

// 2. Reading Questions (50 Questions) - Tagged by format: "ielts" | "pte" | "toefl" | "duolingo"
export const readingQuestions: SandboxQuestion[] = [
  // --- IELTS READING (13 Questions) ---
  {
    question: "[IELTS Reading - True/False/Not Given]\nPassage: 'Prior to the invention of modern steam engines, long-distance freight was carried primarily by animal-drawn wagons. While canals existed in some pockets of Europe, their construction was prohibitively expensive.'\nStatement: 'Europe's primary model of long-distance hauling before steam power was the canal system.'",
    options: ["TRUE", "FALSE", "NOT GIVEN"],
    correct: "FALSE",
    hint: "The text says long-distance freight was carried primarily by animal-drawn wagons, not canals.",
    explanations: "Since the text explicitly states animal-drawn wagons were the primary mode, the statement is false.",
    tag: "ielts"
  },
  {
    question: "[IELTS Reading - Paragraph Matching]\nPassage: 'A: Volcanic dust can reflect solar radiation back into space. B: Conversely, carbon dioxide emissions trap infrared waves, leading to atmospheric warming.'\nWhich section explains the cooling mechanism of volcanic debris?",
    options: ["Section A", "Section B", "Both Sections", "Neither Section"],
    correct: "Section A",
    hint: "Look for keywords like volcanic dust, reflect solar radiation (cooling influence).",
    explanations: "Section A points to reflecting solar radiation back, which is a cooling mechanism.",
    tag: "ielts"
  },
  {
    question: "[IELTS Reading - MC Comprehension]\nPassage: 'The expansion of the Roman postal network, the Cursus Publicus, relied heavily on fresh horses stationed at intervals of roughly 10 miles. This allowed dispatch riders to travel up to 50 miles per day.'\nWhat was the prime factor limiting Roman mail speeds?",
    options: ["Horse stamina and station intervals", "Road weather limits", "Procurator approvals", "Weight of official letters"],
    correct: "Horse stamina and station intervals",
    hint: "The network was organized around 'fresh horses stationed at intervals'.",
    explanations: "Stamina and distance intervals directly determined how quickly mail moved.",
    tag: "ielts"
  },
  {
    question: "[IELTS Reading - True/False/Not Given]\nPassage: 'University enrollments in computer science rose by 15% globally between 2021 and 2024. However, graduation rates have remained flat due to demanding curriculum thresholds.'\nStatement: 'Global computer science graduation rates saw positive gains in 2024.'",
    options: ["TRUE", "FALSE", "NOT GIVEN"],
    correct: "FALSE",
    hint: "The passage notes 'graduation rates have remained flat'.",
    explanations: "Flat means no gains; therefore, stating they saw positive gains is false.",
    tag: "ielts"
  },
  {
    question: "[IELTS Reading - Vocabulary Context]\nPassage: 'The transition from agrarian life to urban employment sparked an unprecedented migration wave.'\nIn this context, what does 'unprecedented' mean?",
    options: ["Never done or known before", "Expected and ordinary", "Destructive and lawless", "Slow-moving"],
    correct: "Never done or known before",
    hint: "Think of something that has no previous precedent.",
    explanations: "Unprecedented means completely fresh, new, or never seen prior to that point.",
    tag: "ielts"
  },
  {
    question: "[IELTS Reading - Inference]\nPassage: 'While Kepler's laws described orbits accurately, they lacked an explanation of the forces driving them—a gap that Newton resolved decades later.'\nWhat can be inferred about Kepler's orbital model?",
    options: ["It was descriptive but lacked a physical mechanism", "It was mathematically incorrect", "It was stolen from Isaac Newton", "It was ignored by the Royal Society"],
    correct: "It was descriptive but lacked a physical mechanism",
    hint: "Look for 'accurate descriptions' but 'lacked explanation of forces'.",
    explanations: "Kepler explained 'how' they moved but not the 'why' (forces), which Newton eventually did.",
    tag: "ielts"
  },
  {
    question: "[IELTS Reading - True/False/Not Given]\nPassage: 'Socrates wrote down none of his own philosophical teachings; his legacy was preserved entirely through Plato's theatrical dialogues.'\nStatement: 'Plato was the only historical student Socrates ever taught directly.'",
    options: ["TRUE", "FALSE", "NOT GIVEN"],
    correct: "NOT GIVEN",
    hint: "The text says legacy was preserved by Plato, but doesn't state if he was the *only* student.",
    explanations: "No information is supplied about Socrates' other direct student counts, making it NOT GIVEN.",
    tag: "ielts"
  },
  {
    question: "[IELTS Reading - Multiple Choice]\nPassage: 'The Great Barrier Reef undergoes seasonal bleachings when elevated sea temperatures stress zooxanthellae microbes inside coral polyps.'\nWhat triggers coral bleaching according to the text?",
    options: ["Warming water conditions", "Oil tanker leaks", "Invasive fish breeds", "Excessive solar eclipse rays"],
    correct: "Warming water conditions",
    hint: "Look for 'elevated sea temperatures'.",
    explanations: "Elevated temperatures translate directly to warming ocean water levels.",
    tag: "ielts"
  },
  {
    question: "[IELTS Reading - True/False/Not Given]\nPassage: 'Australia first explored wind turbine generation in 1987 in Esperance. The small initial array was dismantled by 2002 to make way for high-capacity turbines.'\nStatement: 'Esperance wind turbines were permanently retired without any local replacements.'",
    options: ["TRUE", "FALSE", "NOT GIVEN"],
    correct: "FALSE",
    hint: "The text says they were dismantled 'to make way for high-capacity turbines'.",
    explanations: "They were replaced by larger turbines, so they were not retired permanently without replacements.",
    tag: "ielts"
  },
  {
    question: "[IELTS Reading - Paragraph Title]\nPassage: 'Glacier national reserves act as critical freshwater storage tanks. Every summer, ice melts slowly feed water streams that irrigate downstream agriculture.'\nSuggest the best subheading:",
    options: ["Environmental Water Reservoirs", "Tourism and Glacial Hiking", "Severe Climatic Storm Forecasts", "Soil Erosion Factors"],
    correct: "Environmental Water Reservoirs",
    hint: "Consider 'freshwater storage tanks' and 'irrigating downstream'.",
    explanations: "The text discusses storage and irrigation, aligning with environmental water reservoirs.",
    tag: "ielts"
  },
  {
    question: "[IELTS Reading - Completion]\nPassage: 'The Rosetta Stone was discovered near Rashid in 1799. Featuring three translations of the same decree, it finally permitted the deciphering of Hieroglyphs.'\nWhat artifact permitted researchers to translate raw Hieroglyphs?",
    options: ["The Rosetta Stone", "Ancient Roman Parchments", "Giza Royal Tablets", "Alexandria Library Logs"],
    correct: "The Rosetta Stone",
    hint: "Identify the exact noun in the text associated with translating Hieroglyphs.",
    explanations: "The Rosetta Stone provided the parallel decoding key scientists needed.",
    tag: "ielts"
  },
  {
    question: "[IELTS Reading - True/False/Not Given]\nPassage: 'Artificial sweetening agents undergo rigorous FDA reviews before consumer retail release. However, long-term impact checks are usually completed post-market.'\nStatement: 'All health trials for sweeteners are finalized completely before any market selling begins.'",
    options: ["TRUE", "FALSE", "NOT GIVEN"],
    correct: "FALSE",
    hint: "The passage says 'long-term checks are completed post-market' (after retail release).",
    explanations: "Since long-term checks happen post-market, they are not all finalized before selling.",
    tag: "ielts"
  },
  {
    question: "[IELTS Reading - Detail Matching]\nPassage: 'NASA's Artemis missions plan to establish a lunar base camp. This camp functions as an initial testing environment for manned Mars voyages.'\nWhat is the primary ultimate objective of Artemis' lunar base camp?",
    options: ["Preparing for human trips to Mars", "Mining lunar gold reserves", "Setting astronomy telescope dishes", "Hosting luxury zero-gravity stays"],
    correct: "Preparing for human trips to Mars",
    hint: "Review 'initial testing environment for manned Mars voyages'.",
    explanations: "The moon camp is an evolutionary stepping stone towards eventual Mars expeditions.",
    tag: "ielts"
  },

  // --- PTE ACADEMIC READING (13 Questions) ---
  {
    question: "[PTE Reading - Fill In The Blanks]\n'Pristine rainforest ecosystems contain millions of unique species. However, human infrastructure projects constantly __________ their native homes, causing critical biodiversity loss.'",
    options: ["protect", "disrupt", "cultivate", "ignore"],
    correct: "disrupt",
    hint: "Select a negative verb indicating damage or fracturing of habitats.",
    explanations: "Human infrastructure disrupts (breaks apart, harms) pristine native homes.",
    tag: "pte"
  },
  {
    question: "[PTE Reading - Multiple Choice]\nPassage: 'Carbon offset systems allow firms to purchase carbon credits generated by reforestation works. Critics argue this merely provides a permit to continue polluting.'\nWhat is the critics' primary complaint regarding carbon offsetting?",
    options: ["It lets businesses avoid direct emission reductions", "Reforestation costs too much", "Trees release harmful chemicals", "Credits promote stock inflation"],
    correct: "It lets businesses avoid direct emission reductions",
    hint: "See the phrase 'permit to continue polluting'.",
    explanations: "Critics feel carbon credits let companies keep polluting instead of filtering raw emissions upstream.",
    tag: "pte"
  },
  {
    question: "[PTE Reading - Reorder Paragraph]\nRearrange these blocks logically:\n1) These solar cells harvest ambient photons.\n2) Solar panels are made of silicon materials.\n3) This current is then routed to municipal electrical grids.",
    options: ["2 - 1 - 3", "1 - 2 - 3", "3 - 2 - 1", "2 - 3 - 1"],
    correct: "2 - 1 - 3",
    hint: "Introduce the material (2), explain functional action (1), and end with the output routing (3).",
    explanations: "We define components (2), explain operation (1), and trace final power delivery (3).",
    tag: "pte"
  },
  {
    question: "[PTE Reading - Fill In The Blanks]\n'Modern macroeconomic policy aims to achieve steady price inflation while maintaining high employment levels. If interest rates rise too quickly, borrowing stalls, which may __________ industrial growth.'",
    options: ["stifle", "accelerate", "emulate", "boost"],
    correct: "stifle",
    hint: "Stifle means to suffocate, suppress, or restrain.",
    explanations: "High rates restrict active borrowing, stifling industrial expansion and hiring speeds.",
    tag: "pte"
  },
  {
    question: "[PTE Reading - Dropdown Complete]\n'Urban planning experts suggest that high-density housing developments must be strategically __________ near public transit nodes to reduce municipal vehicle pollution.'",
    options: ["isolated", "situated", "demolished", "evuated"],
    correct: "situated",
    hint: "Meaning positioned, placed, or built.",
    explanations: "Situated is the correct academic word for spatial positioning or building.",
    tag: "pte"
  },
  {
    question: "[PTE Reading - MC Checkboxes]\nPassage: 'The Nobel prize committee looks for discoveries that provide monumental benefit to humanity. While theoretical physics insights are noble, they are rarely certified without direct empirical proofs.'\nWhich of the following is REQUIRED for Nobel prize certification?",
    options: ["Direct empirical verification", "A consensus of political backing", "Self-published book manuals", "High student enrollment rates"],
    correct: "Direct empirical verification",
    hint: "Look for 'rarely certified without direct empirical proofs'.",
    explanations: "Empirical proof or verification is mandatory for Nobel prize selection panels.",
    tag: "pte"
  },
  {
    question: "[PTE Reading - Fill In The Blanks]\n'DNA profiling relies on matching short tandem repeats inside chromosomes. Because each individual possesses a distinct code, forensic scientists can __________ suspects with high accuracy.'",
    options: ["identify", "confound", "release", "charge"],
    correct: "identify",
    hint: "To locate, pin down, or recognize with certainty.",
    explanations: "Distinct genetic markers help forensic experts identify suspects with absolute certainty.",
    tag: "pte"
  },
  {
    question: "[PTE Reading - Reorder Paragraph]\nArrange logically:\n1) However, intensive farming depleted soil nutrients.\n2) Medieval agrarian communities rotated crops to sustain quality.\n3) This forced them to develop composting techniques.",
    options: ["2 - 1 - 3", "1 - 2 - 3", "3 - 1 - 2", "2 - 3 - 1"],
    correct: "2 - 1 - 3",
    hint: "Introduce the original standard action (2), state the problem (1), and conclude with the final adaptive response (3).",
    explanations: "Logical progression: original behavior -> complication -> corrective solution.",
    tag: "pte"
  },
  {
    question: "[PTE Reading - Dropdown Fill]\n'To obtain a highly-coveted internship slot at a London finance house, candidates must display __________ analytical reasoning in addition to impeccable arithmetic skills.'",
    options: ["rudimentary", "flawless", "superficial", "adequate"],
    correct: "flawless",
    hint: "Meaning perfect, immaculate, or without any errors.",
    explanations: "Competitive jobs demand flawless analytics, meaning 100% precision.",
    tag: "pte"
  },
  {
    question: "[PTE Reading - Single Choice MC]\nPassage: 'Geothermal power plants extract steam from deep basaltic formations to spin mechanical turbines. Unlike solar arrays, geothermal units generate power continuously regardless of weather conditions.'\nWhat advantage does geothermal energy have over solar electricity?",
    options: ["Reliability independent of ambient weather", "Lower building costs", "Widespread geographical availability", "Safer waste handling"],
    correct: "Reliability independent of ambient weather",
    hint: "Geothermal units perform 'regardless of weather conditions'.",
    explanations: "Unlike weather-dependent solar cells, subterranean geothermal steam remains consistent.",
    tag: "pte"
  },
  {
    question: "[PTE Reading - Blank Complete]\n'Neuroscientific tracking indicates that practicing classical instruments regularly __________ neural connections in the human corpus callosum, bolstering spatial math abilities.'",
    options: ["strengthens", "weakens", "destroys", "obstructs"],
    correct: "strengthens",
    hint: "To make stronger, reinforce, or bolster connections.",
    explanations: "Strengthens matches the positive outcome described down the line ('bolstering').",
    tag: "pte"
  },
  {
    question: "[PTE Reading - Dropdown MC]\n'Global shipping routes have encountered severe bottlenecks due to dry locks in the Panama Canal. As water levels fall, large container ships are forced to __________ their cargo weights.'",
    options: ["reduce", "increase", "double", "ignore"],
    correct: "reduce",
    hint: "To make smaller or lighter to navigate shallow locks safely.",
    explanations: "Reducing cargo load keeps the ship's drift draft shallow enough for dry canals.",
    tag: "pte"
  },
  {
    question: "[PTE Reading - Blank Dropdown]\n'Biometric iris scans are highly secure because iris patterns contain over 240 distinct degrees of freedom that __________ static over an individual's lifetime.'",
    options: ["remain", "change", "expire", "mutate"],
    correct: "remain",
    hint: "To continue to be in a flat, unvaried state.",
    explanations: "Iris profiles remain stable and unchanging over the long-term lifecycle.",
    tag: "pte"
  },

  // --- TOEFL iBT READING (12 Questions) ---
  {
    question: "[TOEFL Reading - Academic Comprehension]\nPassage: 'The Pleistocene epoch was characterized by repeated glacial cycles. Broad sheets of ice ground down mountains, depositing vast moraine clays across standard prairie belts.'\nAccording to the passage, how did ice sheets affect topography?",
    options: ["By eroding mountains and leaving moraine clays", "By triggering volcanic actions", "By dry-draining prehistoric global oceans", "By growing dense coniferous forests"],
    correct: "By eroding mountains and leaving moraine clays",
    hint: "Look for 'ground down mountains' (eroding) and 'depositing moraine clays'.",
    explanations: "Glaciers shaped terrain by eroding peaks and depositing sediments down valley bases.",
    tag: "toefl"
  },
  {
    question: "[TOEFL Reading - Context Vocabulary]\nPassage: 'The colony collapsed abruptly due to a virulent pathogen that infected nested eggs.'\nWhat is the closest synonym to the word 'virulent' in this context?",
    options: ["harmless", "extremely infectious or toxic", "slow-acting", "dormant"],
    correct: "extremely infectious or toxic",
    hint: "Think about why a pathogen would collapse a whole colony 'abruptly'.",
    explanations: "Virulent implies highly toxic, deadly, and infectious, preventing nesting survival.",
    tag: "toefl"
  },
  {
    question: "[TOEFL Reading - Insert Sentence]\nWhere would this sentence fit best: 'This high density prevents thermal escape.'\n(A) Planets with thick carbon atmospheres suffer high surface warmth. (B) Sunlight passes through the gases easily. (C) However, the outbound infrared rays are blocked by tightly-packed gas molecules. (D)",
    options: ["After Sentence A", "After Sentence B", "After Sentence C", "After Sentence D"],
    correct: "After Sentence C",
    hint: "'High density' refers back to 'tightly-packed gas molecules' in Sentence C.",
    explanations: "Placing the target sentence after C links high molecular density to thermal entrapment logically.",
    tag: "toefl"
  },
  {
    question: "[TOEFL Reading - Detail Analysis]\nPassage: 'Photosynthesis operates in two phases. The light-dependent reactions split water to yield ATP and oxygen, whereas the Calvin Cycle fixes carbon dioxide into sweet hexose sugars.'\nWhat is the primary output of the light-dependent phase specifically?",
    options: ["ATP and oxygen gas", "Hexose sugars", "Carbon dioxide molecules", "Liquid nitrogen"],
    correct: "ATP and oxygen gas",
    hint: "Read details on the 'light-dependent phase' output.",
    explanations: "Splitting water results in ATP power storing and native oxygen emissions.",
    tag: "toefl"
  },
  {
    question: "[TOEFL Reading - Vocabulary Check]\nPassage: 'Unlike heavy clays, dry sandy soil drains water with high celerity.'\nWhat does 'celerity' mean?",
    options: ["slowness", "rapidity or speed", "nutrient levels", "density"],
    correct: "rapidity or speed",
    hint: "Sandy soil drains very quickly compared to thick clay structures.",
    explanations: "Celerity is a classic formal word for swiftness, velocity, or high speeds.",
    tag: "toefl"
  },
  {
    question: "[TOEFL Reading - Sentence Correction/Simplification]\nPassage: 'Although ancient civilizations relied extensively on irrigation, over-reliance without drainage systems inevitably led to soil salinization and ruin.'\nSelect the best simplified rendering of this statement:",
    options: ["Failing to drain irrigated crops caused fatal salt build-ups", "Ancient irrigation was completely useless", "Excess salt was used as regional food preservation", "Drainage structures took too much manual labor to construct"],
    correct: "Failing to drain irrigated crops caused fatal salt build-ups",
    hint: "Focus on 'irrigation' + 'without drainage' = 'salinization' (salt accrual) and 'ruin'.",
    explanations: "Without proper drainage channels, irrigated mineral water evaporates leaving salt reserves behind.",
    tag: "toefl"
  },
  {
    question: "[TOEFL Reading - Detail Fetch]\nPassage: 'The Code of Hammurabi is one of the earliest written legal codes. It was displayed publicly on high stone stelae so that all citizens could observe their duties.'\nWhy did Hammurabi choose to display the code on stelae?",
    options: ["So that all citizens could view the laws", "To protect the text from storm damage", "To mark territorial military borders", "To decorate city central temples"],
    correct: "So that all citizens could view the laws",
    hint: "Identify 'so that all citizens could observe' in the source text.",
    explanations: "Displaying laws publicly on monuments prevented judges from making arbitrary private rulings.",
    tag: "toefl"
  },
  {
    question: "[TOEFL Reading - Context Vocabulary]\nPassage: 'Deep-sea anglerfish possess bioluminescent lanterns that entice curious prey toward their needle-sharp jaws.'\nWhat does 'entice' mean in this biological framework?",
    options: ["scare away", "attract or lure", "blind", "paralyze"],
    correct: "attract or lure",
    hint: "The fish is trying to bring prey closer to its mouth.",
    explanations: "Entice means to attract by exciting hope or desire, in this case, drawing prey with ambient light.",
    tag: "toefl"
  },
  {
    question: "[TOEFL Reading - Fact Checking]\nPassage: 'Enzymes function as organic catalysts. They accelerate biological reactions by lowering the activation energy barrier without being consumed.'\nWhich statement is supported by the nature of enzymes?",
    options: ["Enzymes are recycled and can be used repeatedly", "Enzymes increase the activation thermal energy", "Enzymes are demolished after a single use", "Enzymes only operate in freezing conditions"],
    correct: "Enzymes are recycled and can be used repeatedly",
    hint: "Enzymes 'catalyze' reactions 'without being consumed'.",
    explanations: "Because enzymes are not consumed or destroyed, they can catalyze multiple successive reactions.",
    tag: "toefl"
  },
  {
    question: "[TOEFL Reading - Sentence Mapping]\nPassage: 'The magnetic field of Earth is generated by convective currents of molten iron inside the liquid outer core.'\nWhat serves as the power source for Earth's outer magnetic fields?",
    options: ["Thermal convective flows of liquid iron", "Solar wind radiation deposits", "Gravitational lunar pull actions", "Crustal iron ore deposits"],
    correct: "Thermal convective flows of liquid iron",
    hint: "Match 'convective currents of molten iron'.",
    explanations: "Molten metal churning in the core functions as a planetary dynamo generating geomagnetic lines.",
    tag: "toefl"
  },
  {
    question: "[TOEFL Reading - Inference]\nPassage: 'While traditional historians focused solely on royal treaties, modern research reconstructs average lives through court records.'\nWhat is the difference between classic and modern historical research?",
    options: ["Modern historians prioritize non-elite archives", "Traditional historians ignored legal records completely", "Modern scholars rely exclusively on oral memories", "Traditional scholars wrote false documents"],
    correct: "Modern historians prioritize non-elite archives",
    hint: "Modern research reconstructs 'average lives' (non-elite) via court records.",
    explanations: "This indicates a shift towards studying social history and regular citizens instead of solely ruling crowns.",
    tag: "toefl"
  },
  {
    question: "[TOEFL Reading - Word Definition]\nPassage: 'The treaty was signed in a precarious environment, amidst deep regional military standoffs.'\nWhat is the meaning of 'precarious'?",
    options: ["stable", "dangerous or instable", "scientific", "luxurious"],
    correct: "dangerous or instable",
    hint: "Standoffs highlight a tense, unstable context.",
    explanations: "Precarious describes something uncertain, highly fragile, or dangerous.",
    tag: "toefl"
  },

  // --- DUOLINGO ENGLISH TEST READING (12 Questions) ---
  {
    question: "[DET - Choose Real English Words]\nSelect the option that represents a real, correctly spelled English word:",
    options: ["infructuous", "flabbering", "gorgish", "delitful"],
    correct: "infructuous",
    hint: "Yes, 'infructuous' is a real English word meaning fruitless or unprofitable.",
    explanations: "The other choices represent fictional or misspelled terms (delightful, etc.).",
    tag: "duolingo"
  },
  {
    question: "[DET - Interactive Reading Passage Fill]\nSubject: 'Web developers use cascading style sheets to style raw text. Without styling rules, web landing pages look __________ and difficult to navigate.'",
    options: ["unattractive", "luxurious", "vibrant", "functional"],
    correct: "unattractive",
    hint: "Without style rules, web elements look raw and chaotic.",
    explanations: "Unattractive describes the unappealing visual nature of raw unstyled raw HTML code.",
    tag: "duolingo"
  },
  {
    question: "[DET - Missing Letter Reconstruction]\n'The doc___ diagnosed the patient with a mild flu.'\nWhat is the complete word?",
    options: ["doctor", "docked", "docsin", "docent"],
    correct: "doctor",
    hint: "A clinical professional specialized in treating patients.",
    explanations: "Doctor reconstructs 'doc' + 'tor' seamlessly to match the clinical context.",
    tag: "duolingo"
  },
  {
    question: "[DET - Choose Real English Words]\nWhich of these options represents a legitimate English vocabulary word?",
    options: ["benevolent", "maleficentious", "happful", "cleverlyness"],
    correct: "benevolent",
    hint: "Meaning kind, charitable, or well-meaning.",
    explanations: "Benevolent is a highly-valued descriptive vocabulary adjective in English.",
    tag: "duolingo"
  },
  {
    question: "[DET - Interactive Passage Fill]\n'Global heating is melting highland glaciers. This process contributes directly to rising sea __________ which threaten flat lowland cities.'",
    options: ["temperatures", "levels", "depths", "waves"],
    correct: "levels",
    hint: "Melting glaciers add liquid mass into global seas, elevating their overall height.",
    explanations: "Rising sea levels directly endanger island nations and municipal coastlines.",
    tag: "duolingo"
  },
  {
    question: "[DET - Word Identification]\nIdentify the grammatically correct, real English word in this set:",
    options: ["breathtaking", "breathful", "takeless", "breathtake"],
    correct: "breathtaking",
    hint: "Used to describe something remarkably beautiful or spectacular.",
    explanations: "Breathtaking is the standard compound adjective used for epic scenery.",
    tag: "duolingo"
  },
  {
    question: "[DET - Text Fill]\n'The United Nations was developed in the aftermath of WWII to __________ international peace and security agreements.'",
    options: ["preserve", "abandon", "destroy", "disobey"],
    correct: "preserve",
    hint: "To maintain, defend, or safeguard from collapsing.",
    explanations: "The primary mandate of the UN is to preserve and protect international stability.",
    tag: "duolingo"
  },
  {
    question: "[DET - Real Word Checklist]\nWhich of the following is a real English verb?",
    options: ["substantiate", "falsificate", "reiterife", "magnificate"],
    correct: "substantiate",
    hint: "Meaning to back up with real evidence or proof.",
    explanations: "Substantiate is a real verb; the others are incorrect morphological blends.",
    tag: "duolingo"
  },
  {
    question: "[DET - Missing Letters Complete]\n'She read the book because the cover looked very intr______.'\nCompleted word:",
    options: ["intriguing", "introduce", "intimidate", "intervals"],
    correct: "intriguing",
    hint: "Meaning highly interesting, fascinating, or curious.",
    explanations: "Intriguing completes the adjective modifier for the descriptive cover reviews.",
    tag: "duolingo"
  },
  {
    question: "[DET - Interactive Passage Fill]\n'To prepare for competitive exams, candidates must establish a routine study schedule. Regular practice is the most __________ method to master abstract scientific proofs.'",
    options: ["inefficient", "effective", "redundant", "difficult"],
    correct: "effective",
    hint: "A highly successful, productive, or optimal method.",
    explanations: "Effective matches the positive tone describing continuous structured practice.",
    tag: "duolingo"
  },
  {
    question: "[DET - Word Checklist]\nIdentify the legitimate adverb:",
    options: ["exceptionally", "exceptionwise", "exceptful", "exceptionallyness"],
    correct: "exceptionally",
    hint: "Modifies adjective levels, meaning to a very high degree.",
    explanations: "Exceptionally is the correct suffix-based derivative of exceptional.",
    tag: "duolingo"
  },
  {
    question: "[DET - Sentence Complete]\n'Because of high interest rates, many first-time buyers found housing prices entirely __________.'",
    options: ["affordable", "unaffordable", "agreeable", "cheap"],
    correct: "unaffordable",
    hint: "When interest is high, mortgages become excessively expensive to pay.",
    explanations: "Unaffordable represents the logical negative outcome of high interbank lending rates.",
    tag: "duolingo"
  }
];

// 3. Spoken English & Grammar Bank (50 Questions)
export const grammarQuestions: SandboxQuestion[] = [
  // --- Tenses (10 Questions) ---
  {
    question: "[Spoken English Grammar - Tenses]\n'By this time tomorrow, she __________ her visa interview at the high commission.'",
    options: ["will have completed", "completed", "is completing", "has completed"],
    correct: "will have completed",
    hint: "Use future perfect tense for actions completed before a specific future time threshold.",
    explanations: "Future Perfect ('will have completed') is required due to the 'By this time tomorrow' time marker.",
    tag: "Tenses"
  },
  {
    question: "[Spoken English Grammar - Tenses]\n'I __________ for my study permit since December, but there has been no official update yet.'",
    options: ["am waiting", "have been waiting", "waited", "had waited"],
    correct: "have been waiting",
    hint: "Use present perfect continuous for actions starting in the past and continuing up to now with 'since'.",
    explanations: "Continuous waiting spans past up to present, necessitating 'have been waiting'.",
    tag: "Tenses"
  },
  {
    question: "[Spoken English Grammar - Tenses]\n'When the fire alarm went off, the teacher __________ the chemistry notes on the blackboard.'",
    options: ["is writing", "was writing", "has written", "wrote"],
    correct: "was writing",
    hint: "Past continuous is used when a past action was interrupted by another action.",
    explanations: "The continuous action ('was writing') was interrupted by the fire alarm sound ('went off').",
    tag: "Tenses"
  },
  {
    question: "[Spoken English Grammar - Tenses]\n'If he __________ the registration fee on time, he would have secured a test date.'",
    options: ["paid", "has paid", "had paid", "would pay"],
    correct: "had paid",
    hint: "Third conditional structures use 'If + past perfect' with 'would have + past participle'.",
    explanations: "This is a past retrospective regret. 'had paid' is needed for conditional match.",
    tag: "Tenses"
  },
  {
    question: "[Spoken English Grammar - Tenses]\n'Hardly __________ the examination hall when the final bell Rang.'",
    options: ["had I entered", "I had entered", "did I enter", "did I entered"],
    correct: "had I entered",
    hint: "Inversion is required after negative adverbs like 'Hardly', 'Scarcely', or 'No sooner'.",
    explanations: "Inversion reverses subject and auxiliary: 'Hardly had I entered...'",
    tag: "Tenses"
  },
  {
    question: "[Spoken English Grammar - Tenses]\n'She looks exhausted because she __________ on a difficult homework assignment all night.'",
    options: ["has been working", "worked", "is working", "had worked"],
    correct: "has been working",
    hint: "Using present perfect continuous to show a past action with strong lingering visible evidence.",
    explanations: "Her current exhaustion is due to the uninterrupted work spanning the entire night.",
    tag: "Tenses"
  },
  {
    question: "[Spoken English Grammar - Tenses]\n'We __________ television for two hours when suddenly the power went out.'",
    options: ["had been watching", "were watching", "are watching", "have watched"],
    correct: "had been watching",
    hint: "Past perfect continuous is used to describe a continuous duration before another past event.",
    explanations: "Watching was happening continuously for two hours before the sudden power cut occurred.",
    tag: "Tenses"
  },
  {
    question: "[Spoken English Grammar - Tenses]\n'Water __________ at 100 degrees Celsius under standard atmospheric pressure conditions.'",
    options: ["boils", "boil", "is boiling", "has boiled"],
    correct: "boils",
    hint: "Simple present tense is used for universal laws, facts, or regular scientific observations.",
    explanations: "Boils expresses a permanent scientific fact in simple present third-person singular.",
    tag: "Tenses"
  },
  {
    question: "[Spoken English Grammar - Tenses]\n'By the time the train finally arrived, the anxious passengers __________ on the cold platform for hours.'",
    options: ["had been waiting", "were waiting", "waited", "have been waiting"],
    correct: "had been waiting",
    hint: "Match the action that was ongoing in the past up until the train's arrival.",
    explanations: "Past descriptive timeline matches past perfect continuous for duration prior to arrival.",
    tag: "Tenses"
  },
  {
    question: "[Spoken English Grammar - Tenses]\n'This semester, our class __________ a detailed study on global warming.'",
    options: ["is conducting", "was conducting", "conducts", "has been conducted"],
    correct: "is conducting",
    hint: "Temporary active current actions use present continuous.",
    explanations: "The group is presently executing the study during this active term.",
    tag: "Tenses"
  },

  // --- Concord / Subject-Verb Agreement (8 Questions) ---
  {
    question: "[Spoken English Grammar - Concord]\n'Neither the advisor nor the students __________ aware of the altered mock schedules.'",
    options: ["were", "was", "is", "has been"],
    correct: "were",
    hint: "For 'Neither... nor' structures, the verb agrees with the closer subject ('the students').",
    explanations: "Since 'the students' is closer to the verb and is plural, 'were' must be selected.",
    tag: "Concord"
  },
  {
    question: "[Spoken English Grammar - Concord]\n'A collection of premium sample essays __________ been archived in the student student drive.'",
    options: ["has", "have", "were", "are"],
    correct: "has",
    hint: "The subject is 'A collection' (singular collective noun), not 'sample essays'.",
    explanations: "Singular subject 'collection' governs the singular verb 'has'.",
    tag: "Concord"
  },
  {
    question: "[Spoken English Grammar - Concord]\n'The news about updated visa guidelines __________ very positive for overseas candidates.'",
    options: ["is", "are", "were", "be"],
    correct: "is",
    hint: "'News' is a singular uncountable noun despite ending with 's'.",
    explanations: "Uncountable nouns are paired with singular verbs: 'The news is...'",
    tag: "Concord"
  },
  {
    question: "[Spoken English Grammar - Concord]\n'Statistics __________ a difficult subject for students who hate math fractions.'",
    options: ["is", "are", "were", "be"],
    correct: "is",
    hint: "When referencing an academic discipline, names ending in 's' are singular.",
    explanations: "Collective fields of study take singular conjugations: 'Statistics is...'",
    tag: "Concord"
  },
  {
    question: "[Spoken English Grammar - Concord]\n'Every student and counselor __________ required to wear an identification card.'",
    options: ["is", "are", "were", "be"],
    correct: "is",
    hint: "Subjects preceded by 'Every' or 'Each' are singular and take a singular verb.",
    explanations: "'Every' sets a singular distributive reference, requiring the singular 'is'.",
    tag: "Concord"
  },
  {
    question: "[Spoken English Grammar - Concord]\n'Ten kilometers __________ a long distance to walk to the immigration biometric office.'",
    options: ["is", "are", "were", "be"],
    correct: "is",
    hint: "Units of measurement, distance, or money are treated as single collective amounts.",
    explanations: "Ten kilometers represents a single distance, demanding 'is'.",
    tag: "Concord"
  },
  {
    question: "[Spoken English Grammar - Concord]\n'The teacher, along with his young kids, __________ attending the study abroad seminar.'",
    options: ["is", "are", "were", "be"],
    correct: "is",
    hint: "'Along with', 'as well as', and 'together with' parenthetical phrases do not alter the main singular subject ('The teacher').",
    explanations: "The primary singular subject remains 'the teacher', demanding singular 'is'.",
    tag: "Concord"
  },
  {
    question: "[Spoken English Grammar - Concord]\n'One of my closest friends __________ moving to Australia next week.'",
    options: ["is", "are", "were", "be"],
    correct: "is",
    hint: "The subject is 'One', not the plural 'closest friends'.",
    explanations: "'One of [plural noun]' is always grammatically singular, hence 'is' is selected.",
    tag: "Concord"
  },

  // --- Modals & Conditionals (8 Questions) ---
  {
    question: "[Spoken English Grammar - Modals/Conditionals]\n'If she __________ hard, she would have cleared the IELTS exam.'",
    options: ["had studied", "studied", "studies", "has studied"],
    correct: "had studied",
    hint: "Conditional Sentence Type 3: indicates past unrealized conditions.",
    explanations: "Use Past Perfect in the 'if-clause' for retrospective conditionals: 'if she had studied...'",
    tag: "Modals & Conditionals"
  },
  {
    question: "[Spoken English Grammar - Modals/Conditionals]\n'You __________ speak loudly inside the library; it is of strict silence rule.'",
    options: ["must not", "need not", "cannot", "dare not"],
    correct: "must not",
    hint: "Used to express strict prohibition, obligation, or rules.",
    explanations: "Must not represents an absolute prohibition requirement in formal rules.",
    tag: "Modals & Conditionals"
  },
  {
    question: "[Spoken English Grammar - Modals/Conditionals]\n'If it rains tomorrow, we __________ the outdoor student orientation.'",
    options: ["will postpone", "would postpone", "postponed", "had postponed"],
    correct: "will postpone",
    hint: "First conditional: 'If + simple present' paired with 'will + verb' showing a real future possibility.",
    explanations: "Postpone is conjugated with 'will' to complete the real future sequence.",
    tag: "Modals & Conditionals"
  },
  {
    question: "[Spoken English Grammar - Modals/Conditionals]\n'I __________ rather study in Canada than in Europe, as my relatives reside there.'",
    options: ["would", "should", "could", "had"],
    correct: "would",
    hint: "'Would rather' is the standard modal phrasing to present a clear preference.",
    explanations: "'Would rather [verb]' signifies an active subjective choice or preference.",
    tag: "Modals & Conditionals"
  },
  {
    question: "[Spoken English Grammar - Modals/Conditionals]\n'You __________ have locked the front door; now the tools have been stolen.'",
    options: ["should", "could", "might", "would"],
    correct: "should",
    hint: "Meaning a past obligation or sensible action that was neglected.",
    explanations: "Should have is used to express past failure to complete an obligation.",
    tag: "Modals & Conditionals"
  },
  {
    question: "[Spoken English Grammar - Modals/Conditionals]\n'Candidates __________ submit original documents unless explicitly asked by the officer.'",
    options: ["need not", "must not", "shall not", "ought to"],
    correct: "need not",
    hint: "Refers to the absence of active necessity or obligation.",
    explanations: "Need not means there is no compulsory requirement; only scanned copies suffice.",
    tag: "Modals & Conditionals"
  },
  {
    question: "[Spoken English Grammar - Modals/Conditionals]\n'If I __________ in your position, I would accept the study visa sponsorship immediately.'",
    options: ["were", "was", "am", "had been"],
    correct: "were",
    hint: "Conditional Type 2: hypothetical subjunctive mood uses 'were' for all subjects.",
    explanations: "Subjunctive 'were' is used in conditional if-clauses expressing imaginary slots.",
    tag: "Modals & Conditionals"
  },
  {
    question: "[Spoken English Grammar - Modals/Conditionals]\n'The dark clouds are gathering; it __________ rain in the afternoon.'",
    options: ["might", "must", "should", "shall"],
    correct: "might",
    hint: "Expressing a weak or logical possibility.",
    explanations: "Might suggests highly plausible natural outcome possibilities in weather forecasts.",
    tag: "Modals & Conditionals"
  },

  // --- Prepositions & Conjunctions (8 Questions) ---
  {
    question: "[Spoken English Grammar - Prepositions/Conjunctions]\n'She is very skilled __________ formatting complex statistical layouts in Excel.'",
    options: ["at", "in", "with", "on"],
    correct: "at",
    hint: "The adjective 'skilled' is conventionally followed by the preposition 'at' or 'in' for activities.",
    explanations: "One is skilled AT doing something (at rendering charts, at running mock tests).",
    tag: "Prepositions"
  },
  {
    question: "[Spoken English Grammar - Prepositions/Conjunctions]\n'Despite __________ the final exam multiple times, he never lost hope.'",
    options: ["failing", "failed", "he failed", "of failing"],
    correct: "failing",
    hint: "'Despite' is a preposition and is followed directly by a noun or gerund (-ing verb).",
    explanations: "Despite must take a gerund like failing. 'Despite of' is grammatically incorrect.",
    tag: "Prepositions"
  },
  {
    question: "[Spoken English Grammar - Prepositions/Conjunctions]\n'The visa session was canceled __________ to unforeseen weather emergencies.'",
    options: ["due", "owing", "because", "as"],
    correct: "due",
    hint: "Collocates with 'to' as an adjectival phrase meaning caused by.",
    explanations: "Due to is the standard compound preposition expressing cause.",
    tag: "Prepositions"
  },
  {
    question: "[Spoken English Grammar - Prepositions/Conjunctions]\n'The flight was delayed; __________ we arrived at the university hostel late.'",
    options: ["consequently", "although", "whereas", "nonetheless"],
    correct: "consequently",
    hint: "Connecting adverb showing raw cause-and-effect output.",
    explanations: "Consequently means as a direct result of preceding delays.",
    tag: "Prepositions"
  },
  {
    question: "[Spoken English Grammar - Prepositions/Conjunctions]\n'I was congratulated __________ scoring a top band on the PTE system.'",
    options: ["on", "for", "with", "at"],
    correct: "on",
    hint: "Verb 'congratulate' collocated with preposition of achievements.",
    explanations: "You congratulate an individual ON their ultimate accomplishments.",
    tag: "Prepositions"
  },
  {
    question: "[Spoken English Grammar - Prepositions/Conjunctions]\n'He decided to study abroad __________ the high cost of postgraduate living.'",
    options: ["despite", "although", "inspite", "even though"],
    correct: "despite",
    hint: "Requires a preposition followed directly by a noun phrase 'the high cost...'.",
    explanations: "Despite is a preposition. Although and even though require complete clauses.",
    tag: "Prepositions"
  },
  {
    question: "[Spoken English Grammar - Prepositions/Conjunctions]\n'Please divide these scholarship funds __________ the fifty registered scholars.'",
    options: ["among", "between", "amidst", "within"],
    correct: "among",
    hint: "Use 'between' for two items, and 'among' for more than two items.",
    explanations: "Since there are 50 scholars, 'among' is the grammatically correct choice.",
    tag: "Prepositions"
  },
  {
    question: "[Spoken English Grammar - Prepositions/Conjunctions]\n'The student was completely absorbed __________ her research thesis.'",
    options: ["in", "at", "with", "on"],
    correct: "in",
    hint: "Phrasal adjective 'absorbed' is followed by this preposition in active contexts.",
    explanations: "To be absorbed IN a book, study, or task means fully focused and engrossed.",
    tag: "Prepositions"
  },

  // --- Active & Passive Voice (6 Questions) ---
  {
    question: "[Spoken English Grammar - Voice]\n'The university's legal advisory board __________ the updated criteria last Monday.'",
    options: ["announced", "has announced", "was announced", "announces"],
    correct: "announced",
    hint: "Identify past simple active voice action with explicit past timeline marker 'last Monday'.",
    explanations: "Announced expresses simple past active execution neatly.",
    tag: "Voice"
  },
  {
    question: "[Spoken English Grammar - Voice]\n'The scholarship application files __________ by the admissions dean as we speak.'",
    options: ["are being reviewed", "are reviewing", "reviewed", "reviewing"],
    correct: "are being reviewed",
    hint: "Continuous action in the passive voice uses 'am/is/are + being + past participle'.",
    explanations: "Files are recipient targets, demanding present continuous passive voice ('are being reviewed').",
    tag: "Voice"
  },
  {
    question: "[Spoken English Grammar - Voice]\n'The statement of purpose __________ thoroughly by our visa specialists before submission.'",
    options: ["must be polished", "must polish", "polishing", "must to polish"],
    correct: "must be polished",
    hint: "Modal passive structure uses 'modal + be + past participle'.",
    explanations: "Passive target requires receiving polishing states: 'must be polished'.",
    tag: "Voice"
  },
  {
    question: "[Spoken English Grammar - Voice]\n'The local language learning center __________ by thousands of students since 2012.'",
    options: ["has been visited", "visited", "is visiting", "has visited"],
    correct: "has been visited",
    hint: "Present perfect passive indicates action spanning past until present with an emphasis on recipient.",
    explanations: "Visited by students is a passive experience, requiring 'has been visited'.",
    tag: "Voice"
  },
  {
    question: "[Spoken English Grammar - Voice]\n'Who __________ this state-of-the-art grammar database?'",
    options: ["created", "was created", "has created by", "creating"],
    correct: "created",
    hint: "Active voice past search form.",
    explanations: "Created is active past tense asking for the direct agent creator's identity.",
    tag: "Voice"
  },
  {
    question: "[Spoken English Grammar - Voice]\n'An entire block of new apartments __________ by the construction crew next autumn.'",
    options: ["will be erected", "will erect", "is erecting", "erected"],
    correct: "will be erected",
    hint: "Future passive voice form: 'will be + past participle'.",
    explanations: "The apartment block is passive recipient, erected by the active construction crew.",
    tag: "Voice"
  },

  // --- Direct & Indirect Speech (5 Questions) ---
  {
    question: "[Spoken English Grammar - Indirect Speech]\n'The visa officer said, \"I have approved your application.\"'\nSelect the correct indirect speech rendering:",
    options: [
      "The officer said that he had approved my application.",
      "The officer said that he has approved my application.",
      "The officer said that he approved my application.",
      "The officer says that he had approved my application."
    ],
    correct: "The officer said that he had approved my application.",
    hint: "Present perfect 'have approved' shifts back to past perfect 'had approved' in reported speech.",
    explanations: "Tense shifts back from present perfect to past perfect when using a past reporting verb ('said').",
    tag: "Speech"
  },
  {
    question: "[Spoken English Grammar - Indirect Speech]\n'She asked me, \"Where are you going for your studies?\"'\nIndirect speech form:",
    options: [
      "She asked me where I was going for my studies.",
      "She asked me where was I going for my studies.",
      "She asked me where am I going for my studies.",
      "She asked me that where I was going."
    ],
    correct: "She asked me where I was going for my studies.",
    hint: "In indirect questions, the sentence structure shifts from question form to statement form (subject before verb).",
    explanations: "The inverted order 'were you' changes to standard statement order 'I was' without using 'that'.",
    tag: "Speech"
  },
  {
    question: "[Spoken English Grammar - Indirect Speech]\n'The teacher said to the boy, \"Do not procrastinate.\"'\nReported speech:",
    options: [
      "The teacher advised the boy not to procrastinate.",
      "The teacher told to the boy do not procrastinate.",
      "The teacher forbade the boy not to procrastinate.",
      "The teacher ordered the boy for not procrastinating."
    ],
    correct: "The teacher advised the boy not to procrastinate.",
    hint: "Negative imperatives shift to 'not + to-infinitive' form in reported speech.",
    explanations: "Not to procrastinate is the clean grammatical reported infinitive rendering.",
    tag: "Speech"
  },
  {
    question: "[Spoken English Grammar - Indirect Speech]\n'He said, \"I will call the study coordinator tomorrow.\"'\nReported speech:",
    options: [
      "He said that he would call the study coordinator the next day.",
      "He said that he will call the study coordinator tomorrow.",
      "He said that he would call the study coordinator tomorrow.",
      "He says that he would call the study coordinator tomorrow."
    ],
    correct: "He said that he would call the study coordinator the next day.",
    hint: "'will' changes to 'would' and adverb 'tomorrow' shifts to 'the next day' or 'the following day'.",
    explanations: "Both pronoun, modal shifts ('would') and temporal shift ('the next day') must occur.",
    tag: "Speech"
  },
  {
    question: "[Spoken English Grammar - Indirect Speech]\n'The administrative director asked, \"Has the fee been paid?\"'\nReported speech:",
    options: [
      "The administrative director asked if the fee had been paid.",
      "The administrative director asked that was the fee paid.",
      "The administrative director asked if the fee was paid.",
      "The administrative director asked has the fee been paid."
    ],
    correct: "The administrative director asked if the fee had been paid.",
    hint: "Yes/No questions inside reported speech are introduced using 'if' or 'whether', and present perfect changes to past perfect.",
    explanations: "Using introductory 'if' with past perfect 'had been paid' satisfies passive reporting guidelines.",
    tag: "Speech"
  },

  // --- Advanced sentence corrections (5 Questions) ---
  {
    question: "[Spoken English Grammar - Corrections]\nChoose the sentence that is grammatically correct:",
    options: [
      "Scarcely had she sat down when her phone rang.",
      "Scarcely she sat down when her phone has rang.",
      "Scarcely had she sat down then her phone rang.",
      "Scarcely had she sat down when her phone rised."
    ],
    correct: "Scarcely had she sat down when her phone rang.",
    hint: "'Scarcely... when' is the correct negative adverb combination paired with past inversion.",
    explanations: "'Scarcely' pairs with 'when', while 'No sooner' pairs with 'than'.",
    tag: "Corrections"
  },
  {
    question: "[Spoken English Grammar - Corrections]\nSelect the grammatically correct option:",
    options: [
      "I look forward to meeting you at the student fair.",
      "I look forward to meet you at the student fair.",
      "I am looking forward for meeting you at the student fair.",
      "I look forward to met you at the student fair."
    ],
    correct: "I look forward to meeting you at the student fair.",
    hint: "The phrasal verb 'look forward to' takes a gerund (-ing verb) as its object.",
    explanations: "'To' here is a preposition, not part of an infinitive, hence requiring the gerund form 'meeting'.",
    tag: "Corrections"
  },
  {
    question: "[Spoken English Grammar - Corrections]\nIdentify the correct usage:",
    options: [
      "If she had studied harder, she might have passed.",
      "If she would have studied harder, she might have passed.",
      "If she studied harder, she would have had passed.",
      "If she studies harder, she might have passed."
    ],
    correct: "If she had studied harder, she might have passed.",
    hint: "Do not use 'would have' inside the 'if' clause of conditional statements.",
    explanations: "Subjunctive hypothetical 'if' blocks require the past perfect form 'had studied'.",
    tag: "Corrections"
  },
  {
    question: "[Spoken English Grammar - Corrections]\nSelect the correct phrasing:",
    options: [
      "She spoke so eloquently that the jury was mesmerized.",
      "She spoke so eloquent that the jury was mesmerized.",
      "She spoke very eloquent that the jury was mesmerized.",
      "She spoke so eloquently than the jury was mesmerized."
    ],
    correct: "She spoke so eloquently that the jury was mesmerized.",
    hint: "Use an adverb ('eloquently') to modify the verb 'spoke', and pair 'so' with 'that' to show effect.",
    explanations: "'Eloquently' is the adverb modifying 'spoke'. 'So [adverb] that' conveys cause and effect.",
    tag: "Corrections"
  },
  {
    question: "[Spoken English Grammar - Corrections]\nWhich of the following is correct?",
    options: [
      "He prefers studying in a library to studying at home.",
      "He prefers studying in a library than studying at home.",
      "He prefers to study in a library over study at home.",
      "He prefers studying in a library then studying at home."
    ],
    correct: "He prefers studying in a library to studying at home.",
    hint: "The verb 'prefer' is idiomatically followed by 'to' when comparing two actions or objects.",
    explanations: "Idiomatic parsing requires 'prefer [gerund/noun] to [gerund/noun]'.",
    tag: "Corrections"
  }
];

// Shuffle arrays helper function
export function shuffleQuestions(questions: SandboxQuestion[]): SandboxQuestion[] {
  const result = questions.map(q => {
    // Create a copy of the options array and shuffle it
    const shuffledOptions = [...q.options];
    for (let i = shuffledOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
    }
    return {
      ...q,
      options: shuffledOptions
    };
  });

  // Now shuffle the array of questions
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
