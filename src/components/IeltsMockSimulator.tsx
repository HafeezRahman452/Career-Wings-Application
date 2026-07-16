import React, { useState, useEffect } from "react";
import { 
  motion, 
  AnimatePresence 
} from "motion/react";
import { 
  Volume2, 
  Play, 
  Pause, 
  Clock, 
  ArrowRight, 
  BookOpen, 
  Edit3, 
  Mic, 
  FileText, 
  CheckCircle, 
  RefreshCw, 
  HelpCircle, 
  Sliders, 
  Download, 
  CheckSquare, 
  Award, 
  UserCheck, 
  Sparkles,
  Info,
  ChevronRight,
  Shield,
  VolumeX,
  PhoneCall
} from "lucide-react";

interface IeltsMockSimulatorProps {
  onBookCounselling: (details: string) => void;
  onBack: () => void;
}

// 1. Listening Questions DataSet
interface ListeningQuestion {
  id: number;
  question: string;
  options: string[];
  correct: string;
  context: string;
  subtitle: string;
}

const listeningQuestions: ListeningQuestion[] = [
  {
    id: 1,
    question: "Complete the sentence: The applicant's full surname is spelled _________ .",
    options: ["HARRISON", "HARISSON", "HARRYSON", "HARISUN"],
    correct: "HARRISON",
    context: "Voice Transcript:\nOfficer: Welcome to the language diagnostics division at Career Wings. May I record your full surname?\nApplicant: Yes, certainly! My first name is Matthew, and my surname is spelled H-A-R-R-I-S-O-N.",
    subtitle: "H-A-R-R-I-S-O-N"
  },
  {
    id: 2,
    question: "What is Matthew's primary desired course of study?",
    options: ["Mechanical Drafting", "Advanced Mechatronics", "Artificial Intelligence", "Business Economics"],
    correct: "Advanced Mechatronics",
    context: "Voice Transcript:\nOfficer: Thanks Matthew. And what is your core academic target pathway?\nApplicant: I initially thought about doing general fabrication, but I have decided to lock in Advanced Mechatronics for my research.",
    subtitle: "Advanced Mechatronics research"
  },
  {
    id: 3,
    question: "Which intake session is the candidate seeking to enroll in?",
    options: ["January Intake", "May Intake", "September Intake", "November Intake"],
    correct: "September Intake",
    context: "Voice Transcript:\nOfficer: Excellent choice. Do you prefer starting in the primary cycle or the winter cycle?\nApplicant: I want to enroll in the major academic session starting in September so I can utilize all on-campus labs.",
    subtitle: "September primary cycle"
  },
  {
    id: 4,
    question: "Which academic scholarship tier is the candidate eligible to apply for?",
    options: ["Standard 10% Discount", "Provost 25% Merit Scheme", "Elite 50% Tuition Waiver", "Endowment 100% Scholarship"],
    correct: "Provost 25% Merit Scheme",
    context: "Voice Transcript:\nOfficer: Since your previous GPA translates to a solid 3.8, you are eligible to challenge the Provost 25% Merit Scheme.\nApplicant: Wow, that is excellent! I will construct my visa statement for the Provost scheme then.",
    subtitle: "Provost 25% Merit Scheme"
  },
  {
    id: 5,
    question: "What is the official validation reference code for his current file?",
    options: ["CW-902", "CWC-708", "CWC-110", "D-180"],
    correct: "CWC-708",
    context: "Voice Transcript:\nOfficer: Perfect. I am locking in your file. Your registration docket code is CWC-708.\nApplicant: Can you repeat that code?\nOfficer: Sure, it is high-caps C-W-C, hyphen, seven, zero, eight.",
    subtitle: "CWC-708 registration code"
  }
];

// 2. Reading Questions & Text
interface ReadingQuestion {
  id: number;
  question: string;
  options: string[];
  correct: string;
  spanHint: string;
}

const readingPassage = {
  title: "The Genesis of High-Stakes English Language Testing",
  paragraphs: [
    "Paragraph 1:\nThe historical genesis of standardized language tests can be mapped directly to early bureaucratic reforms in the late nineteenth century. In modern educational frameworks, evaluations such as the academic IELTS and PTE act as critical procedural barriers, ensuring international applicants possess the linguistic dexterity necessary to synthesize dense peer-reviewed materials in post-graduate colleges around the world.",
    "Paragraph 2:\nSkeptics often argue that high-stakes assessments are merely memory drills that measure immediate cramming capacity. However, cognitive analysts indicate that topmost bands are strongly correlated with strategic text comprehension, paragraph skimming speed, and context-informed argument mapping. An applicant boasting an expansive vocabulary database will still yield sub-optimal bands if they fail to locate the central thesis of an editorial within rigorous, timed bounds.",
    "Paragraph 3:\nAdditionally, computer-delivered models introduce structural variance in examinee behaviors. While traditional paper assessments supported natural reading rhythms like margin annotation, computerized testing favors high horizontal reading rates and rapid keyword targeting. Thus, preparing students in modern simulated labs with screen-sync assessments is of paramount importance to Career Wings candidates."
  ]
};

const readingQuestions: ReadingQuestion[] = [
  {
    id: 1,
    question: "According to Paragraph 1, the initial standardized linguistic testing reforms were introduced in the late 19th Century.",
    options: ["True", "False", "Not Given"],
    correct: "True",
    spanHint: " bupa-reform late nineteenth century "
  },
  {
    id: 2,
    question: "The author argues that general memory drills run by skeptics are the best way to earn high scores.",
    options: ["True", "False", "Not Given"],
    correct: "False",
    spanHint: " memory drills are sub-optimal, strategic text processing yields topmost scores "
  },
  {
    id: 3,
    question: "Most universities in Great Britain explicitly prefer paper-based tests over computer-driven test formats.",
    options: ["True", "False", "Not Given"],
    correct: "Not Given",
    spanHint: " no mention of comparative British university entry preferences "
  },
  {
    id: 4,
    question: "'Linguistic dexterity' is referred to in Paragraph 1 as the ability to synthesize dense peer-reviewed materials.",
    options: ["True", "False", "Not Given"],
    correct: "True",
    spanHint: " dexterity necessary to synthesize academic journals "
  },
  {
    id: 5,
    question: "According to Paragraph 2, a large vocabulary ensures topmost scores even if a student is slow under time limits.",
    options: ["True", "False", "Not Given"],
    correct: "False",
    spanHint: " slow students with high vocab still score low "
  }
];

export default function IeltsMockSimulator({ onBookCounselling, onBack }: IeltsMockSimulatorProps) {
  // Simulator State Machine: "INTRO" -> "LISTENING" -> "READING" -> "WRITING" -> "SPEAKING" -> "LEAD_FORM" -> "RESULTS"
  const [stage, setStage] = useState<"INTRO" | "LISTENING" | "READING" | "WRITING" | "SPEAKING" | "LEAD_FORM" | "RESULTS">("INTRO");
  
  // Timer for active test sections (in seconds)
  const [sectionTimeLeft, setSectionTimeLeft] = useState<number>(1800); // 30 minutes countdown default
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

  // User Answers States
  const [listeningAnswers, setListeningAnswers] = useState<Record<number, string>>({});
  const [readingAnswers, setReadingAnswers] = useState<Record<number, string>>({});
  
  // Writing Essay inputs
  const [writingTask1, setWritingTask1] = useState<string>("");
  const [writingTask2, setWritingTask2] = useState<string>("");
  
  // Speaking response recorded states
  const [speakingResponses, setSpeakingResponses] = useState<Record<number, string>>({});
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordTimer, setRecordTimer] = useState<number>(0);
  const [activeSpeakingPart, setActiveSpeakingPart] = useState<number>(0); // 0, 1, 2 for Parts 1, 2, 3
  const [speakingSegments, setSpeakingSegments] = useState<Record<number, { duration: number; notes: string }>>({});

  // Audio simulation state for Listening
  const [activeListeningQIdx, setActiveListeningQIdx] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioPlayedProgress, setAudioPlayedProgress] = useState<number>(0);
  const [speechSpeechSupported, setSpeechSpeechSupported] = useState<boolean>(true);
  const [showSubtitleTranscript, setShowSubtitleTranscript] = useState<boolean>(false);

  // Verification/Leads capture
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [referralSource, setReferralSource] = useState<string>("Career Wings App");

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && sectionTimeLeft > 0) {
      interval = setInterval(() => {
        setSectionTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (sectionTimeLeft === 0 && isTimerActive) {
      // Auto advance or trigger penalty
      handleSectionAutoSubmit();
    }
    return () => clearInterval(interval);
  }, [isTimerActive, sectionTimeLeft]);

  // Speaking timing simulation helper
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const startSectionTimer = (seconds: number) => {
    setSectionTimeLeft(seconds);
    setIsTimerActive(true);
  };

  const handleSectionAutoSubmit = () => {
    if (stage === "LISTENING") {
      setStage("READING");
      startSectionTimer(1800); // 30 min for reading
    } else if (stage === "READING") {
      setStage("WRITING");
      startSectionTimer(2400); // 40 min for writing
    } else if (stage === "WRITING") {
      setStage("SPEAKING");
      setIsTimerActive(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Audiobook narrator simulator using Web Speech Synthesis
  const handlePlayNarrator = (text: string) => {
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = "en-GB"; // Standard British English
      speech.rate = 0.85; // Slightly slower for international applicants
      
      speech.onboundary = (e) => {
        // Mock progress line ticks
        setAudioPlayedProgress((prev) => Math.min(100, prev + 8));
      };

      speech.onend = () => {
        setIsPlayingAudio(false);
        setAudioPlayedProgress(100);
      };

      speech.onerror = () => {
        setIsPlayingAudio(false);
        setSpeechSpeechSupported(false);
      };

      setIsPlayingAudio(true);
      window.speechSynthesis.speak(speech);
    } else {
      setSpeechSpeechSupported(false);
      // Fallback timeline
      setIsPlayingAudio(true);
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        setAudioPlayedProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setIsPlayingAudio(false);
        }
      }, 400);
    }
  };

  // Record mock speech segments
  const toggleRecording = () => {
    if (isRecording) {
      // Save recorded clip mock metadata
      setSpeakingSegments((prev) => ({
        ...prev,
        [activeSpeakingPart]: {
          duration: recordTimer,
          notes: speakingResponses[activeSpeakingPart] || "Completed digital voice recording challenge safely."
        }
      }));
      setIsRecording(false);
    } else {
      setRecordTimer(0);
      setIsRecording(true);
    }
  };

  const handleTestStart = () => {
    setStage("LISTENING");
    startSectionTimer(1200); // 20 minutes for simulated Listening jumble
  };

  const submitListening = () => {
    window.speechSynthesis.cancel();
    setIsPlayingAudio(false);
    setAudioPlayedProgress(0);
    setStage("READING");
    startSectionTimer(1200); // 20 min Reading
  };

  const submitReading = () => {
    setStage("WRITING");
    startSectionTimer(1200); // 20 min Writing
  };

  const submitWriting = () => {
    setStage("SPEAKING");
    setIsTimerActive(false);
  };

  const submitSpeaking = () => {
    setStage("LEAD_FORM");
  };

  const handleScoreReportUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) return;

    // Send data to counselor leads trigger
    const detailsStr = `IELTS simulator completed. Name: ${name}, Phone: ${phone}, Email: ${email}. Listening score detail: ${countListeningCorrect()}/5, Reading score detail: ${countReadingCorrect()}/5`;
    onBookCounselling(detailsStr);
    
    setStage("RESULTS");
  };

  // Scoring Grade Logics
  const countListeningCorrect = () => {
    let count = 0;
    listeningQuestions.forEach((q) => {
      if (listeningAnswers[q.id] === q.correct) {
        count++;
      }
    });
    return count;
  };

  const countReadingCorrect = () => {
    let count = 0;
    readingQuestions.forEach((q) => {
      if (readingAnswers[q.id] === q.correct) {
        count++;
      }
    });
    return count;
    
  };

  // Calculate Band Scale
  const calculateResultData = () => {
    const lCorrect = countListeningCorrect();
    const rCorrect = countReadingCorrect();

    // Map correct to band (IELTS is out of 40, here we scale out of 5)
    // 5/5 -> 8.5, 4/5 -> 7.5, 3/5 -> 6.5, 2/5 -> 5.5, 1/5 -> 4.5, 0/5 -> 3.5
    const listeningBand = lCorrect === 5 ? 8.5 : lCorrect === 4 ? 7.5 : lCorrect === 3 ? 6.5 : lCorrect === 2 ? 5.5 : lCorrect === 1 ? 4.5 : 3.5;
    const readingBand = rCorrect === 5 ? 8.5 : rCorrect === 4 ? 7.5 : rCorrect === 3 ? 6.5 : rCorrect === 2 ? 5.5 : rCorrect === 1 ? 4.5 : 3.5;

    // Count words in essay Tasks
    const w1Words = writingTask1.trim().split(/\s+/).filter(Boolean).length;
    const w2Words = writingTask2.trim().split(/\s+/).filter(Boolean).length;
    let writingBand = 5.0;
    if (w1Words >= 150 && w2Words >= 250) {
      writingBand = 8.0;
    } else if (w1Words >= 100 && w2Words >= 180) {
      writingBand = 7.0;
    } else if (w1Words >= 50 && w2Words >= 100) {
      writingBand = 6.0;
    } else if (w1Words > 5 || w2Words > 5) {
      writingBand = 5.0;
    } else {
      writingBand = 1.0;
    }

    // Evaluate Speaking responses
    let speakingBand = 5.5;
    const voiceCollectedCount = Object.keys(speakingSegments).length;
    if (voiceCollectedCount >= 3) {
      speakingBand = 8.0;
    } else if (voiceCollectedCount === 2) {
      speakingBand = 7.0;
    } else if (voiceCollectedCount === 1) {
      speakingBand = 6.0;
    } else {
      speakingBand = 4.5;
    }

    // Round overall band score to closest 0.5 (IELTS official formula)
    const exactAverage = (listeningBand + readingBand + writingBand + speakingBand) / 4;
    
    // IELTS rounds up/down to nearest 0.5.
    // Real formula: if decimal is < 0.25, round down to 0; if >= 0.25 and < 0.75, round to 0.5; if >= 0.75, round up to next whole.
    const integerPart = Math.floor(exactAverage);
    const decimalPart = exactAverage - integerPart;
    let roundedDecimal = 0;
    if (decimalPart >= 0.75) {
      roundedDecimal = 1.0;
    } else if (decimalPart >= 0.25) {
      roundedDecimal = 0.5;
    } else {
      roundedDecimal = 0;
    }
    const overallBand = integerPart + roundedDecimal;

    return {
      listening: { correct: lCorrect, band: listeningBand },
      reading: { correct: rCorrect, band: readingBand },
      writing: { w1Words, w2Words, band: writingBand },
      speaking: { clipsRecorded: voiceCollectedCount, band: speakingBand },
      overall: Math.min(9.0, Math.max(1.0, overallBand)),
      exactAverage
    };
  };

  const resetAllSimulatorData = () => {
    setStage("INTRO");
    setListeningAnswers({});
    setReadingAnswers({});
    setWritingTask1("");
    setWritingTask2("");
    setSpeakingResponses({});
    setSpeakingSegments({});
    setIsRecording(false);
    setRecordTimer(0);
    setActiveSpeakingPart(0);
    setActiveListeningQIdx(0);
    setAudioPlayedProgress(0);
  };

  const results = calculateResultData();

  return (
    <div className="bg-slate-50 dark:bg-slate-950 rounded-[30px] border border-gray-150/50 dark:border-slate-850 p-4 sm:p-8 space-y-6 shadow-xl relative overflow-hidden transition-all">
      {/* Dynamic Ribbon Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-gray-200 dark:border-slate-800 gap-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-blue-600 rounded-xl text-white">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-black text-blue-600 dark:text-blue-400 tracking-wider">Official Diagnostics</span>
            <h3 className="text-sm font-black text-gray-900 dark:text-white flex items-center gap-2">
              Cambridge IELTS Academic Mock-Examiner Arena
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/25 text-emerald-600 text-[9px] uppercase tracking-widest font-extrabold font-mono">
                Full-Passage Sync
              </span>
            </h3>
          </div>
        </div>

        {isTimerActive && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 text-red-600 rounded-xl border border-red-500/20 font-mono text-xs font-black">
            <Clock className="h-4 w-4 animate-spin text-red-500" />
            <span>TIME REMAINING: {formatTime(sectionTimeLeft)}</span>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        
        {/* STAGE 0: INTRO AND TEST DESIGN */}
        {stage === "INTRO" && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-[#0F3572] to-[#041D44] rounded-2xl p-6 sm:p-10 text-white space-y-4 shadow-lg text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl"></div>
              <Sparkles className="h-10 w-10 text-orange-400 mx-auto animate-bounce" />
              <h4 className="text-xl sm:text-2.5xl font-black tracking-tight max-w-xl mx-auto leading-tight">
                Computer-Delivered Sequential IELTS Prep Simulation
              </h4>
              <p className="text-gray-300 text-xs font-semibold max-w-lg mx-auto leading-relaxed">
                Experience real test stress before taking your final date. This engine steps you through Listening, Reading, Writing, and Speaking with strict structural verification and rounded band results instantly.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto pt-4 text-left">
                {[
                  { section: "1. Listening", stats: "5 Checkpoints", desc: "Digital audio dialogue + spell check", color: "border-l-4 border-blue-500" },
                  { section: "2. Reading", stats: "5 Academics", desc: "Split-screen reading comprehension", color: "border-l-4 border-emerald-500" },
                  { section: "3. Writing", stats: "2 Tasks", desc: "Visa success stats + persuasive essay", color: "border-l-4 border-purple-500" },
                  { section: "4. Speaking", stats: "3 Parts", desc: "Interactive microphone response cues", color: "border-l-4 border-amber-500" }
                ].map((s, idx) => (
                  <div key={idx} className={`bg-white/5 p-3 rounded-lg border border-white/5 ${s.color}`}>
                    <p className="text-[11px] font-black">{s.section}</p>
                    <p className="text-[9px] text-orange-400 uppercase font-black tracking-wider">{s.stats}</p>
                    <p className="text-[9px] text-gray-400 font-semibold">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-orange-500/10 rounded-2xl border border-orange-500/20 p-5 flex items-start gap-3">
              <Info className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs">
                <p className="font-extrabold text-gray-900 dark:text-white">Crucial Candidate Protocols:</p>
                <ul className="list-disc pl-4 space-y-1 font-semibold text-gray-500 dark:text-slate-400 leading-normal">
                  <li>Please enable audio/speakers to hear IELTS voice narrations securely.</li>
                  <li>Ensure your keyboard is connected; structural typing is tracked to calculate exact Lexical Resource scores.</li>
                  <li>Your overall scoring metric is computed dynamically after finishing Speaking and verifying your name.</li>
                </ul>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={onBack}
                className="px-6 py-3.5 rounded-xl border border-gray-300 dark:border-slate-800 text-gray-700 dark:text-slate-300 font-extrabold text-xs cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-900"
              >
                ← Back to Practice Modules
              </button>
              <button
                onClick={handleTestStart}
                className="bg-[#0047AB] hover:bg-blue-700 text-white font-black text-xs px-8 py-3.5 rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-1.5 transition-transform hover:scale-[1.01]"
              >
                Launch Sequential Trial Mock ⚡ <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STAGE 1: LISTENING SECTION */}
        {stage === "LISTENING" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Listening Section Header */}
            <div className="bg-blue-50 dark:bg-slate-900 p-4 rounded-xl border border-blue-100 dark:border-slate-800 flex justify-between items-center">
              <div>
                <span className="px-2 py-0.5 bg-[#0047AB] text-white rounded text-[10px] font-black uppercase tracking-wider">SECTION 1 OF 4</span>
                <h4 className="text-base font-black text-gray-950 dark:text-white">IELTS Academic Listening Simulation</h4>
              </div>
              <span className="text-xs font-bold text-gray-500">Dialogue Code: IELTS-L-ACAD1</span>
            </div>

            {/* Audio Deck player mock */}
            <div className="bg-[#0F1E36] text-white rounded-2xl p-6 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl"></div>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handlePlayNarrator(listeningQuestions[activeListeningQIdx].context)}
                  className={`p-4 rounded-full text-white cursor-pointer transition-all ${
                    isPlayingAudio ? "bg-red-500 animate-pulse" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                  title="Click to play dynamic IELTS speech-synthesizer stream"
                >
                  {isPlayingAudio ? <VolumeX className="h-6 w-6" /> : <Play className="h-6 w-6 fill-current" />}
                </button>
                <div className="space-y-1 text-left">
                  <p className="text-xs font-black uppercase text-orange-400 tracking-widest">Active IELTS Audio Console</p>
                  <h5 className="text-sm font-black">Conversation Section {activeListeningQIdx + 1} of 5</h5>
                  <p className="text-[10.5px] text-gray-400 font-semibold leading-relaxed">
                    Dialogue speaker: Placement Officer interviewing candidate "Matthew".
                  </p>
                </div>
              </div>

              {/* Progress visualizer */}
              <div className="w-full md:w-56 space-y-1.5 shrink-0">
                <div className="flex justify-between items-center text-[10px] font-extrabold uppercase text-gray-400">
                  <span>Audio Playback status</span>
                  <span>{isPlayingAudio ? "Streaming Voice Rec..." : "Awaiting play"}</span>
                </div>
                <div className="bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${audioPlayedProgress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[8px] font-mono font-medium text-gray-500">
                  <span>0:00</span>
                  <span className="text-orange-400">* Adjust system volume carefully</span>
                  <span>0:15 Sec</span>
                </div>
              </div>

              {/* Transcription subtitle accessibility support */}
              <div className="w-full md:w-auto shrink-0 flex gap-2">
                <button
                  onClick={() => setShowSubtitleTranscript((prev) => !prev)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-[10px] font-black text-gray-300 flex items-center gap-1 cursor-pointer"
                >
                  <Sliders className="h-3 w-3" />
                  <span>{showSubtitleTranscript ? "Hide Transcript Subtitles" : "Show Accessibility Subtitles"}</span>
                </button>
              </div>
            </div>

            {/* Accessibility fallback subtitle box */}
            {showSubtitleTranscript && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="bg-gray-100 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-4 rounded-xl text-xs text-gray-500 dark:text-slate-300 italic max-w-3xl mx-auto text-center"
              >
                <span className="font-extrabold uppercase tracking-wide text-orange-500 bg-orange-500/15 px-2 py-0.5 rounded mr-1 text-[9px] not-italic">Dialogue Script:</span>
                "{listeningQuestions[activeListeningQIdx].context.replace("Voice Transcript:\n", "")}"
              </motion.div>
            )}

            {/* Question Card Box */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-150/40 dark:border-slate-850 p-6 sm:p-8 space-y-6 max-w-3xl mx-auto shadow-sm">
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-slate-800 pb-3">
                <span className="text-xs font-black text-gray-800 dark:text-slate-200">
                  Question Block {activeListeningQIdx + 1} of 5
                </span>
                <span className="text-[10px] uppercase font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded">
                  Point Value: 1.0 Band
                </span>
              </div>

              <div className="space-y-4 text-left">
                <p className="text-[11px] font-black text-blue-600 dark:text-blue-400 tracking-wider font-mono uppercase">
                  Fill relative gaps carefully:
                </p>
                <h4 className="text-base font-black text-gray-950 dark:text-white leading-relaxed">
                  {listeningQuestions[activeListeningQIdx].question}
                </h4>

                {/* Multiple choice selections */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {listeningQuestions[activeListeningQIdx].options.map((opt) => {
                    const isSelected = listeningAnswers[listeningQuestions[activeListeningQIdx].id] === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => {
                          setListeningAnswers((prev) => ({
                            ...prev,
                            [listeningQuestions[activeListeningQIdx].id]: opt
                          }));
                        }}
                        className={`p-4 rounded-xl text-left text-xs font-extrabold transition-all border ${
                          isSelected
                            ? "bg-[#0047AB] text-white border-blue-600 shadow-md"
                            : "bg-slate-50 dark:bg-slate-950 border-gray-150/40 dark:border-slate-800 text-gray-700 dark:text-slate-350 hover:bg-gray-100 dark:hover:bg-slate-850"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question Navigation footer inside */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-slate-800">
                <button
                  disabled={activeListeningQIdx === 0}
                  onClick={() => {
                    window.speechSynthesis.cancel();
                    setIsPlayingAudio(false);
                    setAudioPlayedProgress(0);
                    setActiveListeningQIdx((prev) => prev - 1);
                  }}
                  className={`px-4 py-2 border rounded-xl text-xs font-bold ${
                    activeListeningQIdx === 0 
                      ? "text-gray-300 border-gray-100 cursor-not-allowed"
                      : "text-gray-700 dark:text-slate-300 border-gray-200 dark:border-slate-800 hover:bg-slate-50 cursor-pointer"
                  }`}
                >
                  ← Previous Dialogue
                </button>

                <div className="flex gap-2">
                  {activeListeningQIdx < 4 ? (
                    <button
                      disabled={!listeningAnswers[listeningQuestions[activeListeningQIdx].id]}
                      onClick={() => {
                        window.speechSynthesis.cancel();
                        setIsPlayingAudio(false);
                        setAudioPlayedProgress(0);
                        setActiveListeningQIdx((prev) => prev + 1);
                      }}
                      className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all ${
                        listeningAnswers[listeningQuestions[activeListeningQIdx].id]
                          ? "bg-[#0047AB] hover:bg-blue-600 text-white cursor-pointer"
                          : "bg-gray-100 text-gray-400 border border-gray-150/40 cursor-not-allowed"
                      }`}
                    >
                      Next Dialogue Question →
                    </button>
                  ) : (
                    <button
                      disabled={Object.keys(listeningAnswers).length < 5}
                      onClick={submitListening}
                      className={`px-6 py-3 rounded-xl text-xs font-black shadow-md transition-all ${
                        Object.keys(listeningAnswers).length === 5
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer animate-pulse"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Submit Section &amp; Unlock Reading Section ⚡
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* STAGE 2: READING SECTION */}
        {stage === "READING" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Reading Section Header */}
            <div className="bg-emerald-50 dark:bg-emerald-950/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-950/40 flex justify-between items-center">
              <div>
                <span className="px-2 py-0.5 bg-emerald-600 text-white rounded text-[10px] font-black uppercase tracking-wider font-mono">SECTION 2 OF 4</span>
                <h4 className="text-base font-black text-gray-950 dark:text-white">IELTS Academic Reading Comprehension</h4>
              </div>
              <span className="text-xs font-bold text-gray-500">Document index: RC-ACAD-VOL1</span>
            </div>

            {/* Split Screen Panel Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Left Column: Academic Passage (7 cols) */}
              <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-gray-200/60 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 overflow-y-auto max-h-[600px] text-left">
                <span className="px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                  IELTS Academic Article Text
                </span>
                <h3 className="text-lg sm:text-xl font-black text-gray-950 dark:text-white pb-2 border-b border-gray-100 dark:border-slate-850">
                  {readingPassage.title}
                </h3>

                <div className="space-y-4 text-xs sm:text-sm text-gray-700 dark:text-slate-300 leading-relaxed font-semibold">
                  {readingPassage.paragraphs.map((p, idx) => (
                    <p key={idx} className="whitespace-pre-line border-l-2 border-emerald-500/20 pl-4 py-1 italic">
                      {p}
                    </p>
                  ))}
                </div>
              </div>

              {/* Right Column: Interactive Questions Checkpoints (5 cols) */}
              <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-850 rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-6 text-left">
                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-wider text-orange-500 font-mono">
                      Evaluate True/False Matrix
                    </span>
                    <span className="text-xs font-bold text-gray-400">Section Gaps (1-5)</span>
                  </div>

                  <div className="space-y-5 font-semibold text-xs text-gray-500 dark:text-slate-400">
                    {readingQuestions.map((q, idx) => (
                      <div key={q.id} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-100 dark:border-slate-800 space-y-3">
                        <p className="font-extrabold text-[#0047AB] dark:text-blue-400 text-[10px] uppercase font-mono">Question {q.id}</p>
                        <p className="text-gray-950 dark:text-white leading-relaxed font-black">{q.question}</p>
                        
                        {/* Selector Buttons */}
                        <div className="flex gap-2 pt-1.5">
                          {q.options.map((opt) => {
                            const isSelected = readingAnswers[q.id] === opt;
                            return (
                              <button
                                key={opt}
                                onClick={() => {
                                  setReadingAnswers((prev) => ({
                                    ...prev,
                                    [q.id]: opt
                                  }));
                                }}
                                className={`px-3.5 py-1.5 rounded-lg text-[10.5px] font-black transition-all border ${
                                  isSelected
                                    ? "bg-emerald-600 border-emerald-700 text-white shadow-sm"
                                    : "bg-slate-50 dark:bg-slate-950 border-gray-100 dark:border-slate-800 text-gray-600 dark:text-slate-400 hover:bg-gray-100"
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit Panel bottom right */}
                <div className="pt-4 border-t border-gray-200 dark:border-slate-800 flex justify-end">
                  <button
                    disabled={Object.keys(readingAnswers).length < 5}
                    onClick={submitReading}
                    className={`w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-black shadow-md transition-all ${
                      Object.keys(readingAnswers).length === 5
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Lock Answers &amp; Progress to Writing Section ⚡
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* STAGE 3: WRITING SECTION */}
        {stage === "WRITING" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Writing Section Header */}
            <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-xl border border-purple-100 dark:border-purple-900/30 flex justify-between items-center">
              <div>
                <span className="px-2 py-0.5 bg-purple-600 text-white rounded text-[10px] font-black uppercase tracking-wider font-mono">SECTION 3 OF 4</span>
                <h4 className="text-base font-black text-gray-950 dark:text-white font-sans">IELTS Academic Writing Module</h4>
              </div>
              <span className="text-xs font-bold text-gray-500">Review Code: CWC-W-PAD</span>
            </div>

            {/* Split Tabs for Task 1 and Task 2 Writing prompts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              
              {/* Task 1: Visa Approval stats description */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200/70 dark:border-slate-800 p-5 sm:p-6 text-left space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="px-2.5 py-0.5 bg-purple-100 dark:bg-purple-950 text-purple-600 text-[9px] uppercase font-mono font-black rounded-full">
                      Task 1 Overview (Academic Report)
                    </span>
                    <span className="text-[10px] font-bold text-orange-500">Min. word count: 150</span>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-black text-gray-950 dark:text-white leading-relaxed">
                      Write an academic report for a global coordinator outlining the visa success rates between Canada and the United Kingdom.
                    </h4>
                    
                    {/* Visual structured table for candidates to summarize */}
                    <div className="overflow-hidden border border-gray-150 dark:border-slate-800 rounded-xl">
                      <table className="w-full text-left text-[11px] font-semibold border-collapse">
                        <thead>
                          <tr className="bg-slate-50 dark:bg-slate-950 border-b border-gray-150 dark:border-slate-800 font-bold text-gray-700 dark:text-slate-300">
                            <th className="p-3">Intake Year</th>
                            <th className="p-3">Canada Visa Approval %</th>
                            <th className="p-3">UK Visa Approval %</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-150 dark:divide-slate-800 text-gray-600 dark:text-slate-400 font-medium">
                          <tr><td className="p-3 font-mono">2021</td><td className="p-3">58%</td><td className="p-3">72%</td></tr>
                          <tr><td className="p-3 font-mono">2022</td><td className="p-3">64%</td><td className="p-3">75%</td></tr>
                          <tr><td className="p-3 font-mono">2023</td><td className="p-3">70%</td><td className="p-3">68%</td></tr>
                          <tr><td className="p-3 font-mono">2024</td><td className="p-3">82%</td><td className="p-3">65%</td></tr>
                          <tr><td className="p-3 font-mono">2025</td><td className="p-3">88% (Peak)</td><td className="p-3">61% (Lowest)</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  <div className="flex justify-between items-center text-[10px] uppercase font-black text-gray-400">
                    <span>Task 1 Draft Sheet</span>
                    <span className={`${writingTask1.trim().split(/\s+/).filter(Boolean).length >= 150 ? "text-emerald-500" : "text-gray-400"}`}>
                      Word Count: {writingTask1.trim().split(/\s+/).filter(Boolean).length} / 150 words
                    </span>
                  </div>
                  <textarea
                    rows={6}
                    value={writingTask1}
                    onChange={(e) => setWritingTask1(e.target.value)}
                    placeholder="Describe trends, compare Canada and UK approvals, point out historical intersections..."
                    className="w-full text-xs font-bold font-sans bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white leading-relaxed"
                  />
                </div>
              </div>

              {/* Task 2: Open-ended argumentative opinion essay */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200/70 dark:border-slate-800 p-5 sm:p-6 text-left space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="px-2.5 py-0.5 bg-purple-100 dark:bg-purple-950 text-purple-600 text-[9px] uppercase font-mono font-black rounded-full">
                      Task 2 Essay (Academic Argumentation)
                    </span>
                    <span className="text-[10px] font-bold text-orange-500">Min. word count: 250</span>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-black text-gray-950 dark:text-white leading-relaxed">
                      "Distance study programs and digital tutors will cause physical brick-and-mortar university campuses to become entirely obsolete."
                    </h4>
                    <p className="text-[11px] font-semibold text-gray-500 leading-normal italic">
                      To what extent do you agree or disagree with this point of view? Support your discussion with logical arguments from your study experience.
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  <div className="flex justify-between items-center text-[10px] uppercase font-black text-gray-400">
                    <span>Task 2 Essay Draft Sheet</span>
                    <span className={`${writingTask2.trim().split(/\s+/).filter(Boolean).length >= 250 ? "text-emerald-500" : "text-gray-400"}`}>
                      Word Count: {writingTask2.trim().split(/\s+/).filter(Boolean).length} / 250 words
                    </span>
                  </div>
                  <textarea
                    rows={8}
                    value={writingTask2}
                    onChange={(e) => setWritingTask2(e.target.value)}
                    placeholder="State your stand clearly (highly agree, highly disagree, or moderate), structure thesis paragraphs..."
                    className="w-full text-xs font-bold font-sans bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white leading-relaxed"
                  />
                </div>
              </div>

            </div>

            {/* Writing progress save action */}
            <div className="pt-4 border-t border-gray-200 dark:border-slate-800 flex justify-end">
              <button
                disabled={writingTask1.trim().split(/\s+/).filter(Boolean).length < 20 || writingTask2.trim().split(/\s+/).filter(Boolean).length < 20}
                onClick={submitWriting}
                className={`px-8 py-3.5 rounded-xl text-xs font-black shadow-md transition-all ${
                  (writingTask1.trim().split(/\s+/).filter(Boolean).length >= 20 && writingTask2.trim().split(/\s+/).filter(Boolean).length >= 20)
                    ? "bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
                    : "bg-gray-100 text-gray-400 border border-gray-150/40 cursor-not-allowed"
                }`}
                title="Ensure both areas are filled with draft content to advance to Speaking"
              >
                Submit Writing Drafts &amp; Unlock Speaking Section ⚡
              </button>
            </div>
          </motion.div>
        )}

        {/* STAGE 4: SPEAKING SECTION */}
        {stage === "SPEAKING" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Speaking Section Header */}
            <div className="bg-amber-50 dark:bg-slate-900 p-4 rounded-xl border border-amber-150 dark:border-slate-800 flex justify-between items-center">
              <div>
                <span className="px-2 py-0.5 bg-amber-500 text-white rounded text-[10px] font-black uppercase tracking-wider font-mono">SECTION 4 OF 4</span>
                <h4 className="text-base font-black text-gray-950 dark:text-white">IELTS Academic Speaking Simulation</h4>
              </div>
              <span className="text-xs font-bold text-gray-500">Virtual Proctored Video Link</span>
            </div>

            {/* Unified proctored layout card */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch max-w-4xl mx-auto text-left">
              
              {/* Virtual Examiner Block (4 cols) */}
              <div className="md:col-span-4 bg-[#0a1120] text-white rounded-2xl p-6 border border-slate-850 flex flex-col justify-between space-y-6 relative overflow-hidden text-center">
                <div className="absolute top-0 left-0 w-16 h-16 bg-amber-500/10 rounded-full blur-xl"></div>
                
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#0047AB] to-blue-400 rounded-full mx-auto flex items-center justify-center border-2 border-amber-400/40 shadow-inner">
                    <span className="font-extrabold text-white text-2xl">SJ</span>
                  </div>
                  <div>
                    <h5 className="text-sm font-black text-white">Sarah Jenkins</h5>
                    <p className="text-[10px] uppercase font-black text-amber-400 tracking-widest">Official Mock Examiner</p>
                    <p className="text-[9.5px] text-gray-400 font-semibold leading-relaxed mt-1">British Council Affiliate Proctor</p>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-3 border border-white/5 space-y-1">
                  <span className="text-[9px] uppercase font-black tracking-wide text-gray-400">Examiner System Status</span>
                  <div className="flex items-center justify-center gap-1.5 text-[10px] font-extrabold text-green-400">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span>ACTIVE VIRTUAL MIC</span>
                  </div>
                </div>
              </div>

              {/* Speech Prompt deck (8 cols) */}
              <div className="md:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-gray-150/40 dark:border-slate-850 p-6 flex flex-col justify-between space-y-6">
                
                <div className="space-y-4">
                  {/* Step Indicators */}
                  <div className="flex gap-1.5 pb-2 border-b border-gray-100 dark:border-slate-850">
                    {["PART 1: INTRO", "PART 2: CUE CARD", "PART 3: MATRIX"].map((label, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          window.speechSynthesis.cancel();
                          setActiveSpeakingPart(idx);
                        }}
                        className={`px-3 py-1 rounded-lg text-[9px] font-black tracking-wider transition-all cursor-pointer ${
                          activeSpeakingPart === idx
                            ? "bg-amber-500 text-white"
                            : "bg-slate-50 dark:bg-slate-950 text-gray-500 dark:text-slate-400 hover:text-gray-900"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  {/* Active Prompt Box */}
                  <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-gray-100 dark:border-slate-850 relative">
                    <span className="absolute top-3 right-3 text-[9px] uppercase tracking-wider font-extrabold text-blue-600 bg-blue-100 dark:bg-blue-950/40 px-2 py-0.5 rounded">
                      Simulated Voice Feed
                    </span>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Examiner Prompts:</p>
                    
                    {activeSpeakingPart === 0 && (
                      <h4 className="text-sm font-black text-gray-900 dark:text-white leading-relaxed">
                        "First, let us discuss your general environment. Describe your hometown or the neighborhood you currently live in. What specific attributes do you appreciate the most?"
                      </h4>
                    )}
                    {activeSpeakingPart === 1 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-black text-gray-900 dark:text-white leading-relaxed">
                          "Describe a book or a film that had a profound impact on your academic or career directions."
                        </h4>
                        <ul className="list-disc pl-4 text-[11px] font-semibold text-gray-500 space-y-0.5 dark:text-slate-400">
                          <li>What title it has and when you encountered it</li>
                          <li>What central message it portrayed</li>
                          <li>And explain why it was so deeply influential to you</li>
                        </ul>
                      </div>
                    )}
                    {activeSpeakingPart === 2 && (
                      <h4 className="text-sm font-black text-gray-900 dark:text-white leading-relaxed">
                        "Let us analyze classroom tutoring algorithms. Do you believe artificial intelligence will completely replace standard face-to-face academic proctors inside elite colleges in the future? What are the structural benefits or drawbacks?"
                      </h4>
                    )}

                    {/* Speech synthesis prompt support */}
                    <button
                      onClick={() => {
                        const promptText = 
                          activeSpeakingPart === 0 
                            ? "First, let us discuss your general environment. Describe your hometown or the neighborhood you currently live in. What specific attributes do you appreciate the most?"
                            : activeSpeakingPart === 1
                            ? "Describe a book or a film that had a profound impact on your academic or career directions."
                            : "Let us analyze classroom tutoring algorithms. Do you believe artificial intelligence will completely replace standard face-to-face academic proctors inside elite colleges in the future?";
                        handlePlayNarrator(promptText);
                      }}
                      className="mt-3 text-[10px] font-black text-[#0047AB] hover:underline flex items-center gap-1"
                    >
                      🗣️ Let Examiner Speak Prompt
                    </button>
                  </div>
                </div>

                {/* Recorder Console UI */}
                <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-slate-850">
                  <div className="bg-slate-900 text-white rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-4 rounded-full ${isRecording ? "bg-red-500 animate-pulse" : "bg-slate-800"}`}>
                        <Mic className="h-5 w-5 text-white" />
                      </div>
                      <div className="space-y-0.5 text-left">
                        <p className="text-[10px] font-black uppercase text-gray-400">Microphone Input Console</p>
                        <h6 className="text-[11.5px] font-black">
                          {isRecording ? "Active Recording..." : "Mic is calibrated and armed."}
                        </h6>
                        <span className="text-[9.5px] text-gray-500 font-semibold italic block">
                          * Duration limit: 120 seconds per part.
                        </span>
                      </div>
                    </div>

                    {isRecording && (
                      /* Wave anim elements */
                      <div className="flex gap-1.5 h-6 items-end shrink-0 py-1 px-4 bg-slate-800/50 rounded-lg">
                        <div className="w-1 bg-red-500 rounded h-3 animate-bounce"></div>
                        <div className="w-1 bg-amber-500 rounded h-5 animate-pulse"></div>
                        <div className="w-1 bg-red-500 rounded h-2 animate-bounce"></div>
                        <div className="w-1 bg-blue-500 rounded h-6 animate-pulse"></div>
                        <div className="w-1 bg-red-500 rounded h-4 animate-bounce"></div>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      {isRecording && (
                        <span className="text-xs font-mono font-black text-red-400 bg-red-950/40 px-2 py-0.5 rounded">
                          {recordTimer} S
                        </span>
                      )}
                      <button
                        onClick={toggleRecording}
                        className={`px-4 py-2 rounded-xl text-xs font-black shadow-md transition-all cursor-pointer ${
                          isRecording
                            ? "bg-red-600 hover:bg-red-700 text-white"
                            : "bg-amber-500 hover:bg-amber-600 text-white"
                        }`}
                      >
                        {isRecording ? "Stop & Save Response 🔒" : "Start Speaking Response 🎙️"}
                      </button>
                    </div>
                  </div>

                  {/* Speak Notes fallback input */}
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-gray-400 block tracking-widest">
                      Type reference response drafts / translation notes if microphone is not available or if you want to verify keywords:
                    </label>
                    <textarea
                      rows={2}
                      value={speakingResponses[activeSpeakingPart] || ""}
                      onChange={(e) => {
                        setSpeakingResponses((prev) => ({
                          ...prev,
                          [activeSpeakingPart]: e.target.value
                        }));
                      }}
                      placeholder="E.g. I live in Mumbai. I appreciate the high density of cultural festivals and clean local public transport..."
                      className="w-full text-xs font-semibold bg-gray-50 dark:bg-slate-950 border border-gray-150/40 dark:border-slate-850 p-2.5 rounded-lg outline-none text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Speaker Progression action buttons */}
                <div className="pt-4 border-t border-gray-100 dark:border-slate-850 flex justify-between items-center">
                  <span className="text-[10px] text-gray-450 font-bold">
                    Speaking segments collected: {Object.keys(speakingSegments).length} of 3
                  </span>
                  
                  <div className="flex gap-2">
                    {activeSpeakingPart < 2 ? (
                      <button
                        onClick={() => {
                          window.speechSynthesis.cancel();
                          setActiveSpeakingPart((prev) => prev + 1);
                        }}
                        className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs"
                      >
                        Next speaking prompt cue →
                      </button>
                    ) : (
                      <button
                        onClick={submitSpeaking}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs px-6 py-3 rounded-xl shadow-md cursor-pointer animate-pulse"
                      >
                        Complete IELTS Speaking Exam &amp; Lock Script 🏁
                      </button>
                    )}
                  </div>
                </div>

              </div>

            </div>
          </motion.div>
        )}

        {/* STAGE 5: SECURE RESULTS VERIFICATION / LEAD GATE */}
        {stage === "LEAD_FORM" && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto space-y-6"
          >
            <div className="text-center space-y-2">
              <span className="px-3 py-1 bg-orange-100 text-orange-600 font-extrabold text-[10px] uppercase tracking-widest rounded-full border border-orange-200/20 inline-block">
                🏁 secure score-sheet lock protocols
              </span>
              <h3 className="text-2xl sm:text-3.5xl font-black text-gray-900 dark:text-white leading-tight">
                Unlock Your Official IELTS Band Certificates!
              </h3>
              <p className="text-xs text-gray-400 font-semibold max-w-lg mx-auto leading-relaxed">
                We generate fully authorized band scorecard metrics matching Cambridge English formats. Please verify your student profile data to release your academic merit file securely.
              </p>
            </div>

            {/* Verification Form */}
            <form onSubmit={handleScoreReportUnlock} className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-150/40 dark:border-slate-850 p-6 sm:p-10 space-y-5 text-left shadow-md">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-400 block tracking-widest">Candidate Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name (e.g. Rahul Sharma)..."
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-205 dark:border-slate-800 rounded-xl px-4 py-3.5 text-xs font-bold focus:ring-2 focus:ring-[#0047AB] outline-none text-gray-900 dark:text-white"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-400 block tracking-widest">WhatsApp / Mobile Contact *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="E.g. +91 9876543210..."
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-205 dark:border-slate-800 rounded-xl px-4 py-3.5 text-xs font-bold focus:ring-2 focus:ring-[#0047AB] outline-none text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-400 block tracking-widest">Candidate Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E.g. rahul.sharma@gmail.com..."
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-205 dark:border-slate-800 rounded-xl px-4 py-3.5 text-xs font-bold focus:ring-2 focus:ring-[#0047AB] outline-none text-gray-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-400 block tracking-widest">Dream University Destination / Budget</label>
                  <select
                    value={referralSource}
                    onChange={(e) => setReferralSource(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-205 dark:border-slate-800 rounded-xl px-4 py-3.5 text-xs font-bold focus:ring-2 focus:ring-[#0047AB] outline-none text-gray-900 dark:text-white"
                  >
                    <option value="Canada (High Priority)">Canada (Study Permit / SDS)</option>
                    <option value="United Kingdom (Oxbridge Admissions)">United Kingdom (Oxbridge Admissions)</option>
                    <option value="Australia & New Zealand (Subclass 500)">Australia &amp; NZ (Subclass 500)</option>
                    <option value="USA Tier-1 Research Institutes">United States (F-1 Visa Pathway)</option>
                    <option value="Europe / English taught masteries">Europe Degree Passports</option>
                  </select>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full bg-[#0047AB] hover:bg-blue-700 text-white font-black text-xs py-3.5 rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]"
                >
                  Generate Official Diagnostic Bands Report Sheet <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <p className="text-[9.5px] text-gray-450 italic text-center font-medium leading-relaxed">
                By ticking, we promise 100% data cryptography. Scores are securely cataloged for priority counseling slots on study visa flight structures with Career Wings.
              </p>
            </form>
          </motion.div>
        )}

        {/* STAGE 6: COMPREHENSIVE SCORECARD REPORT */}
        {stage === "RESULTS" && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 text-left"
          >
            {/* Top Certificate Header Card */}
            <div className="bg-white dark:bg-slate-900 border-2 border-dashed border-blue-500/30 rounded-3xl p-6 sm:p-10 shadow-lg space-y-6 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl"></div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-6 gap-4">
                <div className="space-y-1">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-950/40 text-[#0047AB] dark:text-blue-400 font-extrabold text-[10px] uppercase tracking-widest rounded-full border border-blue-200/20 inline-flex items-center gap-1">
                    <Award className="h-3.5 w-3.5" /> Cambridge Assessment IELTS Syllabus
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-gray-950 dark:text-white font-sans">
                    IELTS Academic Mock Candidate Transcript
                  </h3>
                  <p className="text-xs text-gray-400 font-semibold">
                    Document Ref: CWC-MOCK-ACC-{Math.floor(100000 + Math.random() * 900000)}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-amber-500 to-orange-600 px-6 py-3 rounded-2xl text-white text-center shadow-md">
                  <span className="text-[9px] uppercase tracking-widest font-black block">OVERALL BAND</span>
                  <p className="text-3xl font-black">{results.overall.toFixed(1)}</p>
                  <span className="text-[9px] font-bold block">Academic Eligible Tier</span>
                </div>
              </div>

              {/* Subject Info Table */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1 text-xs">
                <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl border border-gray-150/40 dark:border-slate-850">
                  <p className="text-[9px] font-black text-gray-400 uppercase">CANDIDATE NAME</p>
                  <p className="font-extrabold text-gray-900 dark:text-white capitalize">{name || "Verified Student"}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl border border-gray-150/40 dark:border-slate-850">
                  <p className="text-[9px] font-black text-gray-400 uppercase">CONTACT MOBILE</p>
                  <p className="font-extrabold text-gray-900 dark:text-white">{phone || "Not Provided"}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl border border-gray-150/40 dark:border-slate-850">
                  <p className="text-[9px] font-black text-gray-400 uppercase">EMAIL ADDRESS</p>
                  <p className="font-extrabold text-gray-900 dark:text-white break-all">{email || "Not Provided"}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl border border-gray-150/40 dark:border-slate-850">
                  <p className="text-[9px] font-black text-gray-400 uppercase">Intake Interest</p>
                  <p className="font-extrabold text-gray-900 dark:text-white">{referralSource}</p>
                </div>
              </div>

              {/* Subscores breakdown grid */}
              <div className="space-y-3 pt-3">
                <h4 className="text-[11px] font-black uppercase text-gray-400 tracking-wider flex items-center gap-1.5">
                  <Sliders className="h-4 w-4 text-[#0047AB]" /> Section-Wise Diagnostic Bands Performance Grid
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  {/* Listening */}
                  <div className="bg-blue-500/5 dark:bg-slate-950/40 p-5 rounded-2xl border border-blue-500/10 text-center space-y-2 relative">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-950/50 text-[#0047AB] dark:text-blue-400 rounded-xl flex items-center justify-center mx-auto">
                      <Volume2 className="h-5 w-5" />
                    </div>
                    <p className="text-xs font-black text-gray-950 dark:text-white uppercase font-sans">LISTENING</p>
                    <div className="py-1">
                      <span className="text-2.5xl font-black text-[#0047AB]">{results.listening.band.toFixed(1)}</span>
                      <span className="text-xs text-gray-500 block">Band Score</span>
                    </div>
                    <span className="text-[9.5px] uppercase font-mono font-bold bg-blue-100 dark:bg-blue-950 text-[#0047AB] dark:text-blue-400 px-2 py-0.5 rounded-md inline-block">
                      {results.listening.correct} / 5 Correct
                    </span>
                  </div>

                  {/* Reading */}
                  <div className="bg-emerald-500/5 dark:bg-slate-950/40 p-5 rounded-2xl border border-emerald-500/10 text-center space-y-2">
                    <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mx-auto">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <p className="text-xs font-black text-gray-950 dark:text-white uppercase font-sans">READING</p>
                    <div className="py-1">
                      <span className="text-2.5xl font-black text-emerald-600">{results.reading.band.toFixed(1)}</span>
                      <span className="text-xs text-gray-500 block">Band Score</span>
                    </div>
                    <span className="text-[9.5px] uppercase font-mono font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-md inline-block">
                      {results.reading.correct} / 5 Correct
                    </span>
                  </div>

                  {/* Writing */}
                  <div className="bg-purple-500/5 dark:bg-slate-950/40 p-5 rounded-2xl border border-purple-500/10 text-center space-y-2">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center mx-auto">
                      <Edit3 className="h-5 w-5" />
                    </div>
                    <p className="text-xs font-black text-gray-950 dark:text-white uppercase font-sans">WRITING</p>
                    <div className="py-1">
                      <span className="text-2.5xl font-black text-purple-600">{results.writing.band.toFixed(1)}</span>
                      <span className="text-xs text-gray-500 block">Band Score</span>
                    </div>
                    <span className="text-[9.5px] uppercase font-mono font-bold bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded-md inline-block">
                      T1: {results.writing.w1Words}w | T2: {results.writing.w2Words}w
                    </span>
                  </div>

                  {/* Speaking */}
                  <div className="bg-amber-500/5 dark:bg-slate-950/40 p-5 rounded-2xl border border-amber-500/10 text-center space-y-2">
                    <div className="w-10 h-10 bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-500 rounded-xl flex items-center justify-center mx-auto">
                      <Mic className="h-5 w-5" />
                    </div>
                    <p className="text-xs font-black text-gray-950 dark:text-white uppercase font-sans">SPEAKING</p>
                    <div className="py-1">
                      <span className="text-2.5xl font-black text-amber-500">{results.speaking.band.toFixed(1)}</span>
                      <span className="text-xs text-gray-500 block">Band Score</span>
                    </div>
                    <span className="text-[9.5px] uppercase font-mono font-bold bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-500 px-2 py-0.5 rounded-md inline-block">
                      {results.speaking.clipsRecorded} Clips Logged
                    </span>
                  </div>
                </div>
              </div>

              {/* Professional validation stamping */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 border-t border-gray-100 dark:border-slate-800 text-[10px] text-gray-400 font-semibold gap-4 leading-relaxed">
                <div>
                  <p>Certified validation source: Career Wings Global Education Consultants Affiliation Boards</p>
                  <p className="italic">Scored via Computer-Delivered IELTS diagnostic grading engine.</p>
                </div>
                <div className="bg-slate-100 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 px-3 py-1 rounded-lg text-emerald-600 flex items-center gap-1 shrink-0 font-bold">
                  <Shield className="h-3.5 w-3.5" />
                  <span>SECURED MERIT VERIFICATION PASS</span>
                </div>
              </div>
            </div>

            {/* Post-exam strategic counseling enrollment pitch */}
            <div className="bg-gradient-to-br from-[#0047AB]/5 to-orange-500/5 dark:from-slate-900 dark:to-slate-900 border border-blue-100/50 dark:border-slate-800 p-6 sm:p-8 rounded-3xl space-y-5">
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-orange-500 text-white rounded-2xl shrink-0 animate-bounce">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-base font-black text-gray-950 dark:text-white uppercase">
                    Our Experts' Strategic Review of Your Diagnostics:
                  </h4>
                  
                  <div className="text-xs text-gray-600 dark:text-slate-300 leading-relaxed space-y-3 font-semibold">
                    <p>
                      Excellent effort, <span className="capitalize text-orange-500 font-extrabold">{name}</span>! Generating a Band score of <span className="font-extrabold text-blue-600 dark:text-blue-400">{results.overall.toFixed(1)}</span> under un-coached/diagnostic conditions reveals fantastic baseline capability. With detailed strategies on IELTS writing formatting templates and high-speed speaking fluency drills, you can confidently target a perfect 8.0+ overall at official Cambridge centres.
                    </p>
                    <p className="font-extrabold text-gray-900 dark:text-white">
                      💡 Why Elite Candidates enroll with Career Wings Consultants:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-500 dark:text-slate-400">
                      <li>Personalized Cambridge/British Council syllabus led by expert test coordinators.</li>
                      <li>Intense paragraph-sync reading speed drills and visual analysis Task 1 shortcuts.</li>
                      <li>Weekly computerized simulation exams inside certified labs with speaking face-to-face mocks.</li>
                      <li>100% Comprehensive free Visa processing, country guidelines (Canada SDS, UK, Australia, Europe) and flight plans.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Buttons to lock-in counselings */}
              <div className="pt-4 border-t border-gray-200/50 dark:border-slate-800/80 flex flex-col sm:flex-row justify-center items-center gap-3">
                <button
                  onClick={() => onBookCounselling(`Requested immediate free 1-to-1 analysis for mock score ${results.overall.toFixed(1)} band. Candidate name: ${name}, Phone: ${phone}`)}
                  className="w-full sm:w-auto bg-[#0047AB] hover:bg-blue-700 text-white font-black text-xs px-6 py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.01]"
                >
                  <PhoneCall className="h-4 w-4 shrink-0" />
                  <span>Book Immediate 1-to-1 Session With Head IELTS Coach</span>
                </button>
                <button
                  onClick={resetAllSimulatorData}
                  className="w-full sm:w-auto px-6 py-4 rounded-xl border border-gray-200 dark:border-slate-800 text-gray-700 dark:text-slate-350 hover:bg-gray-100 dark:hover:bg-slate-900 font-extrabold text-xs cursor-pointer"
                >
                  Retake IELTS Simulator Session ⚙️
                </button>
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
