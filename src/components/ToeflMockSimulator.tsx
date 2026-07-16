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
  PhoneCall,
  User
} from "lucide-react";

interface ToeflMockSimulatorProps {
  onBookCounselling: (details: string) => void;
  onBack: () => void;
}

// 1. TOEFL Reading Data
const toeflPassage = {
  title: "The Cretaceous-Paleogene Extinction Event",
  text: "Paragraph 1:\nFor decades, geologists debated the catastrophic indicators that brought about the sudden demise of dinosaurs roughly 66 million years ago. [A] While some argued for excessive volcanism, the prevailing theory centers on a massive extraterrestrial impact at Chicxulub. [B] High iridium concentrations found in clay boundaries globally act as absolute proof of this event. [C] Because iridium is rare in the Earth's crust but abundant in asteroids, scientists reason that a stellar body of roughly 10 kilometers in diameter struck the Yucatan Peninsula. [D]"
};

// TOEFL Reading Questions
interface ToeflReadingQ {
  id: number;
  question: string;
  options: string[];
  correct: string;
}

const toeflReadingQuestions: ToeflReadingQ[] = [
  {
    id: 1,
    question: "According to paragraph 1, why do high iridium concentrations serve as proof of an asteroid impact?",
    options: [
      "Iridium is generated solely by volcanic eruptions deep beneath the Yucatan Peninsula.",
      "Iridium is a rare element in the planetary crust but heavily concentrated in extraterrestrial asteroids.",
      "Dinosaurs synthesized iridium within their bones to resist global climate cooling.",
      "The clay boundaries represent a period of high radioactive tectonic decay."
    ],
    correct: "Iridium is a rare element in the planetary crust but heavily concentrated in extraterrestrial asteroids."
  },
  {
    id: 2,
    question: "Insert the following sentence where it fits best in Paragraph 1: 'Furthermore, the physical impact crater has been historically mapped by deep-sea seismic drilling.'",
    options: ["[A]", "[B]", "[C]", "[D]"],
    correct: "[D]"
  }
];

// 2. TOEFL Listening Lecture
const toeflLectureText = "Listen to part of a lecture in a geology class. The professor is discussing glacial moraines.\n\nNow, when glaciers retreat, they leave behind heaps of unsorted rock debris... we call these glacial moraines. Terminus moraines, specifically, tell us the absolute maximum advance of a glacier before warming started. Think of it as a natural conveyor belt dropping gravel at the end of its line.";

// 3. TOEFL Integrated Speaking text
const toeflSpeakingPrompt = "The university's Student Senate has released a notice proposing to close the primary campus library after midnight to reduce utility budgets. A student disagrees, arguing that postgraduate students heavily research between midnight and 3:00 AM, and closing it will trigger unfair academic outcomes.\n\nPrompt: Explain the student's reaction and describe the specific arguments she presents.";

export default function ToeflMockSimulator({ onBookCounselling, onBack }: ToeflMockSimulatorProps) {
  // Stages: "INTRO" -> "READING" -> "LISTENING" -> "SPEAKING" -> "WRITING" -> "LEAD_FORM" -> "RESULTS"
  const [stage, setStage] = useState<"INTRO" | "READING" | "LISTENING" | "SPEAKING" | "WRITING" | "LEAD_FORM" | "RESULTS">("INTRO");
  
  // Timer state
  const [sectionTimeLeft, setSectionTimeLeft] = useState<number>(1500); // 25 mins initial countdown
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

  // Users Answers
  const [readingAnswers, setReadingAnswers] = useState<Record<number, string>>({});
  
  // Listening states
  const [listeningPlaying, setListeningPlaying] = useState<boolean>(false);
  const [listeningProgress, setListeningProgress] = useState<number>(0);
  const [listeningOptionChecked, setListeningOptionChecked] = useState<string>("");
  const [listeningDone, setListeningDone] = useState<boolean>(false);

  // Speaking state
  const [speakingPrepTime, setSpeakingPrepTime] = useState<number>(15);
  const [speakingActive, setSpeakingActive] = useState<boolean>(false);
  const [isSpeakingRecording, setIsSpeakingRecording] = useState<boolean>(false);
  const [speakingTimer, setSpeakingTimer] = useState<number>(0);
  const [speakingDone, setSpeakingDone] = useState<boolean>(false);

  // Writing state (Teacher discussion board post)
  const [writingInput, setWritingInput] = useState<string>("");

  // Lead inputs
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  // Section timing ticks
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && sectionTimeLeft > 0) {
      interval = setInterval(() => {
        setSectionTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (sectionTimeLeft === 0 && isTimerActive) {
      handleAutoSubmit();
    }
    return () => clearInterval(interval);
  }, [isTimerActive, sectionTimeLeft]);

  // Speaking prep count
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (speakingActive && speakingPrepTime > 0) {
      interval = setInterval(() => {
        setSpeakingPrepTime((prev) => prev - 1);
      }, 1000);
    } else if (speakingActive && speakingPrepTime === 0 && !isSpeakingRecording && !speakingDone) {
      setIsSpeakingRecording(true);
      setSpeakingTimer(45); // 45 seconds spoken response recording
    }
    return () => clearInterval(interval);
  }, [speakingActive, speakingPrepTime, isSpeakingRecording]);

  // Speaking record timer count down
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSpeakingRecording && speakingTimer > 0) {
      interval = setInterval(() => {
        setSpeakingTimer((prev) => prev - 1);
      }, 1000);
    } else if (isSpeakingRecording && speakingTimer === 0) {
      setIsSpeakingRecording(false);
      setSpeakingDone(true);
    }
    return () => clearInterval(interval);
  }, [isSpeakingRecording, speakingTimer]);

  const startSectionTimer = (seconds: number) => {
    setSectionTimeLeft(seconds);
    setIsTimerActive(true);
  };

  const handleAutoSubmit = () => {
    if (stage === "READING") {
      setStage("LISTENING");
      startSectionTimer(300); // 5 mins for listening
    } else if (stage === "LISTENING") {
      setStage("SPEAKING");
      setIsTimerActive(false);
    } else if (stage === "SPEAKING") {
      setStage("WRITING");
      startSectionTimer(600); // 10 mins writing
    } else if (stage === "WRITING") {
      setStage("LEAD_FORM");
      setIsTimerActive(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const playSpeechSynthesizer = (text: string) => {
    if (listeningPlaying) {
      window.speechSynthesis.cancel();
      setListeningPlaying(false);
      return;
    }

    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = "en-US"; // Standard American TOEFL accent
      speech.rate = 0.9;

      speech.onboundary = () => {
        setListeningProgress((prev) => Math.min(100, prev + 5));
      };
      
      speech.onend = () => {
        setListeningPlaying(false);
        setListeningProgress(100);
      };

      speech.onerror = () => {
        setListeningPlaying(false);
      };

      setListeningPlaying(true);
      setListeningProgress(0);
      window.speechSynthesis.speak(speech);
    } else {
      setListeningPlaying(true);
      setTimeout(() => {
        setListeningPlaying(false);
        setListeningProgress(100);
      }, 4000);
    }
  };

  const handleStartSpeakingPrep = () => {
    setSpeakingActive(true);
    setSpeakingPrepTime(15);
  };

  const calculateToeflScores = () => {
    // Reading scores (max 30)
    let readingScore = 6;
    tofaelComp: if (readingAnswers[1] === toeflReadingQuestions[0].correct) readingScore += 12;
    if (readingAnswers[2] === toeflReadingQuestions[1].correct) readingScore += 12;

    // Listening scores (max 30)
    let listeningScore = 10;
    if (listeningOptionChecked === "Glacial Moraines tell geologists the maximum historical advance of glaciers.") {
      listeningScore += 20;
    }

    // Speaking scores (max 30)
    let speakingScore = 15;
    if (speakingDone) speakingScore += 13;

    // Writing score (max 30, based on online discussion length)
    const writeWords = writingInput.trim().split(/\s+/).filter(Boolean).length;
    let writingScore = 10;
    if (writeWords >= 120) {
      writingScore += 20;
    } else if (writeWords >= 80) {
      writingScore += 16;
    } else if (writeWords > 10) {
      writingScore += 10;
    }

    const total = readingScore + listeningScore + speakingScore + writingScore;

    return {
      reading: readingScore,
      listening: listeningScore,
      speaking: speakingScore,
      writing: writingScore,
      total: Math.min(120, Math.max(0, total)),
      writeWords
    };
  };

  const handleUnlockToeflScores = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) return;

    const res = calculateToeflScores();
    const detailsStr = `TOEFL iBT mock completed. Candidate: ${name}, Phone: ${phone}, Email: ${email}. Target academic score verified: ${res.total}/120 (R:${res.reading}, L:${res.listening}, S:${res.speaking}, W:${res.writing})`;
    onBookCounselling(detailsStr);

    setStage("RESULTS");
  };

  const scores = calculateToeflScores();

  return (
    <div className="bg-slate-900 dark:bg-slate-950 rounded-[30px] border border-red-500/10 p-4 sm:p-8 space-y-6 shadow-2xl text-left text-gray-200 transition-all font-sans">
      
      {/* TOEFL Header with authentic ETS format logo elements */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-gray-800 gap-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl text-white shadow-md shadow-red-500/15">
            <Sliders className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-black text-red-400 tracking-wider">ETS Institutional Laboratory</span>
            <h3 className="text-sm font-black text-white flex items-center gap-2 flex-wrap">
              ETS TOEFL iBT Active Simulator
              <span className="px-2 py-0.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-[9px] uppercase tracking-widest font-extrabold font-mono">
                Academic iBT Sync
              </span>
            </h3>
          </div>
        </div>

        {isTimerActive && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 text-red-400 rounded-xl border border-red-500/20 font-mono text-xs font-black">
            <Clock className="h-4 w-4 animate-spin text-red-400" />
            <span>SESSION RUNTIME REMAINING: {formatTime(sectionTimeLeft)}</span>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        
        {/* STAGE 0: BRIEFING */}
        {stage === "INTRO" && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-slate-950 to-red-950/20 border border-red-500/10 rounded-2xl p-6 sm:p-10 space-y-4 text-center relative overflow-hidden">
              <Sparkles className="h-10 w-10 text-orange-400 mx-auto animate-bounce" />
              <h4 className="text-xl sm:text-2xl font-black text-white max-w-xl mx-auto">
                Official TOEFL iBT Academic Assessment Setup
              </h4>
              <p className="text-gray-400 text-xs font-medium max-w-lg mx-auto leading-relaxed">
                Experience the authentic structure of the Test of English as a Foreign Language. Solve university-themed comprehension texts, geologists' lectures, integrated library arguments and academic discussion boards.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 max-w-3xl mx-auto pt-4 text-left">
                {[
                  { title: "1. Reading Module", quota: "Extinction Passage", desc: "Scientific paragraph with factual inserting", styling: "border-l-4 border-red-500" },
                  { title: "2. Listening Module", quota: "Moraine Lecture", desc: "Glacier geology lecture audio playback", styling: "border-l-4 border-orange-500" },
                  { title: "3. Speaking Module", quota: "Senate Argue", desc: "Integrated university policy debate cue", styling: "border-l-4 border-yellow-500" },
                  { title: "4. Writing Module", quota: "Modern Board", desc: "Contribute to teacher-hosted discussions", styling: "border-l-4 border-pink-500" }
                ].map((s, i) => (
                  <div key={i} className="bg-white/5 p-3.5 rounded-lg border border-white/5">
                    <p className="text-xs font-black text-white">{s.title}</p>
                    <p className="text-[10px] text-orange-400 font-extrabold uppercase font-mono">{s.quota}</p>
                    <p className="text-[9px] text-gray-500 font-semibold">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-red-500/5 rounded-2xl border border-red-500/10 p-5 flex gap-3">
              <Info className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
              <ul className="text-xs font-medium list-disc pl-4 space-y-1 text-gray-400">
                <li className="font-extrabold text-white">TOEFL Candidate Directives:</li>
                <li>Verify your system speakers are active to stream the American lecture transcription audio.</li>
                <li>Type post entries with detailed paragraphs in the Academic Discussion to secure high grade evaluations.</li>
                <li>Finish Speaking within the strict 45-second timeline.</li>
              </ul>
            </div>

            <div className="flex gap-3 justify-center pt-2">
              <button
                onClick={onBack}
                className="px-6 py-3 rounded-xl border border-gray-800 text-gray-400 font-bold text-xs hover:bg-white/5 cursor-pointer"
              >
                ← Swap Prep Module
              </button>
              <button
                onClick={() => {
                  setStage("READING");
                  startSectionTimer(900); // 15 mins for Reading
                }}
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-black text-xs px-8 py-3.5 rounded-xl cursor-pointer shadow-lg flex items-center gap-1"
              >
                Launch TOEFL Simulation ⚡ <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STAGE 1: READING */}
        {stage === "READING" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="bg-red-950/20 p-4 rounded-xl border border-red-500/10 flex justify-between items-center">
              <div>
                <span className="px-2 py-0.5 bg-red-600 text-white rounded text-[9px] font-black uppercase tracking-wider font-mono">TOEFL READ</span>
                <h4 className="text-base font-black text-white mt-1">Science &amp; Paleobiology Comprehension</h4>
              </div>
              <span className="text-xs font-bold text-red-400">Section Stream: TOEFL-RD-iBT</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Passage text */}
              <div className="lg:col-span-7 bg-slate-950 border border-gray-800 rounded-2xl p-6 space-y-4 max-h-[500px] overflow-y-auto">
                <span className="text-[10px] bg-red-500/10 text-red-400 border border-red-500/35 px-2.5 py-0.5 rounded font-black font-mono">TOEFL ARTICLE TEXT</span>
                <h4 className="text-base font-black text-white border-b border-gray-800 pb-2">{toeflPassage.title}</h4>
                <p className="text-xs sm:text-sm leading-relaxed text-gray-300 font-medium font-sans whitespace-pre-line border-l border-red-500/20 pl-4">
                  {toeflPassage.text}
                </p>
              </div>

              {/* Questions */}
              <div className="lg:col-span-5 bg-white/5 border border-white/5 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  <span className="text-[10px] font-black uppercase text-yellow-400 tracking-wider">Comprehension Checkpoints</span>
                  
                  {toeflReadingQuestions.map((q) => (
                    <div key={q.id} className="bg-slate-950 p-4 rounded-xl border border-gray-800/80 space-y-2">
                      <p className="text-[10px] font-bold text-red-400 font-mono">Comprehension Task {q.id}</p>
                      <p className="text-xs font-black text-white leading-relaxed">{q.question}</p>
                      
                      <div className="space-y-2 pt-1">
                        {q.options.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => {
                              setReadingAnswers((prev) => ({ ...prev, [q.id]: opt }));
                            }}
                            className={`w-full p-2.5 rounded-lg text-left text-[11px] font-semibold transition-all border ${
                              readingAnswers[q.id] === opt
                                ? "bg-red-600 border-red-700 text-white shadow-sm font-bold"
                                : "bg-slate-900 border-slate-800 text-gray-300 hover:bg-slate-800"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  disabled={Object.keys(readingAnswers).length < 2}
                  onClick={() => {
                    setStage("LISTENING");
                    startSectionTimer(300); // 5 mins listening
                  }}
                  className={`w-full py-3 rounded-xl text-xs font-black transition-all ${
                    Object.keys(readingAnswers).length === 2
                      ? "bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                      : "bg-gray-800 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Confirm Answers &amp; Proceed to Lecture →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STAGE 2: LISTENING */}
        {stage === "LISTENING" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="bg-orange-950/20 p-4 rounded-xl border border-orange-500/10 flex justify-between items-center">
              <div>
                <span className="px-2 py-0.5 bg-orange-600 text-white rounded text-[9px] font-black uppercase tracking-wider font-mono">TOEFL LST-LECTURE</span>
                <h4 className="text-base font-black text-white mt-1">Geological Glaciation Moraines</h4>
              </div>
              <span className="text-xs font-bold text-orange-400">Class Room Track: GLACIER-S2</span>
            </div>

            <div className="bg-[#0b0f19] rounded-2xl p-6 border border-gray-800 space-y-6 max-w-2xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => playSpeechSynthesizer(toeflLectureText)}
                    className={`p-4 rounded-full text-white cursor-pointer transition-all ${
                      listeningPlaying ? "bg-red-500 animate-pulse" : "bg-orange-600 hover:bg-orange-700"
                    }`}
                  >
                    {listeningPlaying ? <VolumeX className="h-6 w-6" /> : <Play className="h-6 w-6 fill-current" />}
                  </button>
                  <div className="space-y-1 text-left">
                    <span className="text-[10px] font-black uppercase text-yellow-400 tracking-wider">Glacial Moraines Lecture</span>
                    <h5 className="text-sm font-black text-white">Geology professor: Topic 'Glacial Retreat moraine markers'</h5>
                    <p className="text-[10px] text-gray-500 font-semibold leading-relaxed">
                      Listen closely to understand structural details and professor definitions.
                    </p>
                  </div>
                </div>

                <div className="w-full md:w-48 space-y-1 shrink-0">
                  <div className="flex justify-between items-center text-[10px] font-bold text-gray-400">
                    <span>AUDIO PROGRESS</span>
                    <span>{listeningPlaying ? "Streaming American Speech..." : "Ready"}</span>
                  </div>
                  <div className="bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 transition-all duration-300" style={{ width: `${listeningProgress}%` }}></div>
                  </div>
                </div>
              </div>

              {/* Comprehension check */}
              <div className="space-y-3 pt-4 border-t border-gray-800 text-left">
                <p className="text-xs font-black text-yellow-400 uppercase font-mono">Professor Question:</p>
                <h5 className="text-xs sm:text-sm font-black text-white leading-normal">
                  Which is the most optimal description of Terminus Moraines as presented in the glacial moraines geological lecture?
                </h5>

                <div className="space-y-2 pt-2 text-xs">
                  {[
                    "Glacial Moraines tell geologists the maximum historical advance of glaciers.",
                    "Terminus Moraines dissolve volcanic iridium under standard glacial shifts.",
                    "Glaciers create sand conveyor belts starting in early early September.",
                    "Glaciers are paper-based structures moving heavily across the UK."
                  ].map((cand) => (
                    <button
                      key={cand}
                      onClick={() => {
                        setListeningOptionChecked(cand);
                        setListeningDone(true);
                      }}
                      className={`w-full p-3 rounded-xl border text-left font-bold text-xs transition-all ${
                        listeningOptionChecked === cand
                          ? "bg-orange-600 border-orange-700 text-white shadow-md shadow-orange-500/10"
                          : "bg-slate-900 border-slate-800 text-gray-300 hover:bg-slate-800"
                      }`}
                    >
                      {cand}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  disabled={!listeningDone}
                  onClick={() => {
                    window.speechSynthesis.cancel();
                    setStage("SPEAKING");
                  }}
                  className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${
                    listeningDone
                      ? "bg-orange-600 hover:bg-orange-700 text-white cursor-pointer"
                      : "bg-gray-800 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Proceed to Speaking Prep →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STAGE 3: SPEAKING */}
        {stage === "SPEAKING" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="bg-yellow-950/20 p-4 rounded-xl border border-yellow-500/10 flex justify-between items-center">
              <div>
                <span className="px-2 py-0.5 bg-yellow-600 text-white rounded text-[9px] font-black uppercase tracking-wider font-mono">TOEFL SPK-INTEGRATED</span>
                <h4 className="text-base font-black text-white mt-1">Campus library policy closing debate</h4>
              </div>
              <span className="text-xs font-bold text-yellow-500">Task Stream: TOEFL-SPK-TASK2</span>
            </div>

            <div className="bg-white/5 rounded-2.5xl p-5 sm:p-6 border border-white/5 space-y-4 max-w-2xl mx-auto">
              <span className="text-[10px] font-black uppercase text-yellow-500 tracking-wider">Integrated Campus Situation prompt:</span>
              <p className="text-xs leading-relaxed text-gray-300 font-semibold italic border-l-2 border-yellow-500 pl-4 py-1 bg-yellow-500/5 rounded-r">
                "{toeflSpeakingPrompt}"
              </p>

              <div className="p-5 bg-slate-950 rounded-xl border border-gray-800 text-center space-y-4">
                {!speakingActive ? (
                  <div className="space-y-3">
                    <p className="text-xs text-gray-400 font-medium">To prepare, you are given a 15-second response prep timer, followed directly by a 45-second live spoken answer stream.</p>
                    <button
                      onClick={handleStartSpeakingPrep}
                      className="bg-yellow-500 hover:bg-yellow-600 text-slate-950 font-black text-xs px-6 py-2.5 rounded-lg cursor-pointer transition-all shadow-md"
                    >
                      Activate Prep Timer ⏱
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {speakingPrepTime > 0 ? (
                      <div className="space-y-1">
                        <span className="text-[10px] font-black text-yellow-500 uppercase tracking-wider font-mono">PREPARATION COUNTDOWN</span>
                        <h4 className="text-3xl font-black text-white font-mono">{speakingPrepTime}s</h4>
                        <p className="text-[10px] text-gray-500">Draft arguments, structure comparisons...</p>
                      </div>
                    ) : isSpeakingRecording ? (
                      <div className="space-y-2 animate-pulse">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-500/10 border border-red-500/30 text-red-400 text-[9px] rounded-full font-black font-mono tracking-widest">
                          🔴 RECORDING LIVE INTERACTIVE AUDIO
                        </div>
                        <h4 className="text-4xl font-black text-white font-mono">{speakingTimer}s</h4>
                        <p className="text-xs text-yellow-400 max-w-sm mx-auto font-bold leading-normal">
                          "I believe the university library shouldn't limit midnight hours since postgraduate researchers..."
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-xs text-emerald-400 font-bold">✔ Audio segment captured comfortably!</p>
                        <button
                          onClick={() => {
                            setStage("WRITING");
                            startSectionTimer(600); // 10 mins writing
                          }}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg text-xs font-black cursor-pointer shadow-md"
                        >
                          Lock Speaking &amp; Progress to Writing
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* STAGE 4: WRITING DISCUSSION BOARD */}
        {stage === "WRITING" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="bg-pink-950/20 p-4 rounded-xl border border-pink-500/10 flex justify-between items-center font-sans">
              <div>
                <span className="px-2 py-0.5 bg-pink-600 text-white rounded text-[9px] font-black uppercase tracking-wider font-mono">TOEFL Academic Discussion</span>
                <h4 className="text-sm font-black text-white mt-1">Government Tax Levies on High-Sugar Commodities</h4>
              </div>
              <span className="text-xs font-bold text-pink-400">Class Board: AD-TAXES-3</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch font-sans text-left">
              {/* Discussion instructions + avatars */}
              <div className="lg:col-span-6 bg-[#0e1424] border border-gray-800 rounded-2xl p-5 sm:p-6 space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] bg-pink-500/10 border border-pink-500/30 text-pink-400 px-2 py-0.5 rounded-full font-black uppercase font-mono">Academic Discussion Board</span>
                    <span className="text-[10px] font-bold text-orange-400 font-mono">Duration: 10 mins</span>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-gray-850 space-y-2">
                    <p className="font-extrabold text-[#f43f5e] font-sans text-xs">Professor Jenkins writes:</p>
                    <p className="text-[11px] leading-relaxed text-gray-200 font-extrabold">
                      "In economic policies, some authorities advocate placing heavy surplus taxes on sugar-dense fast food commodities to address core obesity crises and fund healthcare. Do you believe this administrative penalty works? What are your perspectives?"
                    </p>
                  </div>

                  {/* Student posts */}
                  <div className="space-y-3">
                    <div className="flex gap-2.5 items-start bg-slate-900/60 p-3 rounded-lg border border-gray-800">
                      <div className="p-1.5 bg-pink-500/10 rounded-lg text-pink-400 shrink-0 mt-0.5 font-bold text-[10px] uppercase font-mono">C1</div>
                      <div className="space-y-0.5">
                        <p className="text-[10px] text-pink-400 font-bold font-sans">Student Clara says:</p>
                        <p className="text-[10.5px] text-gray-400 font-medium leading-normal italic">
                          "I completely support Jenkins' idea. Charging premium fees directly discourages daily purchase rates, pushing crowds towards healthier hydration or organic diet alternatives."
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2.5 items-start bg-slate-900/60 p-3 rounded-lg border border-gray-800">
                      <div className="p-1.5 bg-yellow-500/10 rounded-lg text-yellow-400 shrink-0 mt-0.5 font-bold text-[10px] uppercase font-mono">D2</div>
                      <div className="space-y-0.5">
                        <p className="text-[10px] text-yellow-400 font-bold font-sans">Student David says:</p>
                        <p className="text-[10.5px] text-gray-400 font-medium leading-normal italic">
                          "I disagree because excessive tax grids will severely impact lower-income populations, where sugar foods are the only affordable caloric options. Instead, positive lifestyle subsidies are much fairer."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Input section */}
              <div className="lg:col-span-6 bg-white/5 border border-white/5 rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] uppercase font-black text-gray-400">
                    <span>Draft Your Contribution</span>
                    <span className={`${writingInput.trim().split(/\s+/).filter(Boolean).length >= 100 ? "text-emerald-400" : "text-yellow-400 font-bold"}`}>
                      WORDS: {writingInput.trim().split(/\s+/).filter(Boolean).length} / Recommend 100+ Words
                    </span>
                  </div>

                  <textarea
                    rows={6}
                    value={writingInput}
                    onChange={(e) => setWritingInput(e.target.value)}
                    placeholder="While both Clara and David present highly compelling arguments, I personally lean towards Clara's viewpoint because administrative taxing patterns..."
                    className="w-full text-xs font-bold font-sans bg-slate-950 border border-gray-850 p-4 rounded-xl outline-none focus:ring-2 focus:ring-pink-500 text-white leading-relaxed"
                  />
                  <p className="text-[9.5px] text-gray-500 leading-normal font-medium">
                    * Make sure to reference both peer arguments to earn standard collaborative synthesis bonus points.
                  </p>
                </div>

                <button
                  disabled={writingInput.trim().split(/\s+/).filter(Boolean).length < 15}
                  onClick={() => {
                    setStage("LEAD_FORM");
                    setIsTimerActive(false);
                  }}
                  className={`w-full py-3.5 rounded-xl text-xs font-black shadow-md transition-all ${
                    writingInput.trim().split(/\s+/).filter(Boolean).length >= 15
                      ? "bg-pink-600 hover:bg-pink-700 text-white cursor-pointer"
                      : "bg-gray-800 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Post to Discussion Board &amp; Lock TOEFL →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STAGE 5: LEADS GATE */}
        {stage === "LEAD_FORM" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6 max-w-lg mx-auto"
          >
            <div className="text-center空间 space-y-3">
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 w-12 h-12 rounded-full mx-auto flex items-center justify-center">
                <Shield className="h-6 w-6 animate-pulse" />
              </div>
              <h3 className="text-lg font-black text-white">Unlock Verified TOEFL iBT Scorecards</h3>
              <p className="text-xs text-gray-400 leading-normal max-w-sm mx-auto font-medium">
                Your TOEFL mock sections are successfully synced with our grading matrices. Please fill in your details to open the dynamic 120-scale grader results!
              </p>
            </div>

            <form onSubmit={handleUnlockToeflScores} className="space-y-4 bg-slate-950 p-6 rounded-2.5xl border border-gray-850">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-gray-400 font-sans">Full Candidate Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#080d21] border border-blue-900/60 p-3.5 rounded-xl text-xs font-bold text-white outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-gray-400 font-sans">Phone Number (with active country code)</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#080d21] border border-blue-900/60 p-3.5 rounded-xl text-xs font-bold text-white outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-gray-400 font-sans">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. rahul@careerwings.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#080d21] border border-blue-900/60 p-3.5 rounded-xl text-xs font-bold text-white outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white p-3.5 rounded-xl text-xs font-black mt-2 transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Decode ETS iBT Report Card</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}

        {/* STAGE 6: RESULTS */}
        {stage === "RESULTS" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-slate-950 to-red-950/20 border border-gray-800 rounded-3xl p-6 sm:p-10 text-center space-y-4">
              <div className="inline-flex p-3.5 bg-yellow-400/10 rounded-2xl border border-yellow-400/20 text-yellow-400">
                <Award className="h-8 w-8 animate-bounce" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-black tracking-widest text-[#f59e0b] uppercase font-mono">ETS INSTITUTIONAL ASSESSMENT GRADE</span>
                <h4 className="text-2xl font-black text-white leading-none">Perfect effort, {name}!</h4>
                <p className="text-xs text-gray-400 font-medium">Your final TOEFL iBT scoring summary is updated. Logs have been securely stored.</p>
              </div>

              {/* Big Score Badge */}
              <div className="inline-flex flex-col items-center justify-center p-6 bg-slate-950 rounded-3xl border border-gray-800 shadow-xl min-w-[200px]">
                <span className="text-[10px] font-black text-red-400 uppercase tracking-widest font-mono">TOEFL iBT TOTAL</span>
                <span className="text-5xl sm:text-6xl font-black text-white font-mono leading-none py-2">{scores.total}</span>
                <div className="px-3 py-1 bg-red-600/25 text-red-300 rounded-full text-[9px] font-extrabold uppercase font-mono tracking-widest border border-red-500/30">
                  Official Scale (0 - 120 Points)
                </div>
              </div>

              {/* Details sections */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto pt-6 text-left font-sans">
                {[
                  { skill: "Reading", band: scores.reading, max: 30, color: "bg-red-500" },
                  { skill: "Listening", band: scores.listening, max: 30, color: "bg-orange-500" },
                  { skill: "Speaking", band: scores.speaking, max: 30, color: "bg-yellow-500" },
                  { skill: "Writing", band: scores.writing, max: 30, color: "bg-pink-500" }
                ].map((s, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-gray-850">
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider">{s.skill}</p>
                    <p className="text-xl font-black text-white py-1">{s.band} <span className="text-[10px] text-gray-500 font-bold">/ {s.max}</span></p>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                      <div className={`h-full rounded-full ${s.color}`} style={{ width: `${(s.band / s.max) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Diagnostics and Action */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left text-xs font-semibold text-gray-300 font-sans">
              <div className="bg-white/5 p-5 rounded-2xl border border-white/5 space-y-3">
                <h5 className="font-black text-white text-sm flex items-center gap-1">
                  <UserCheck className="h-4 w-4 text-emerald-400" /> ETS Diagnostic Insights
                </h5>
                <ul className="space-y-2 list-inside list-disc text-gray-400 leading-normal font-medium">
                  <li>Your online class discussion post length counts to <strong className="text-pink-400">{scores.writeWords} words</strong>, exceeding target recommended guidelines.</li>
                  <li>In Reading, factual interpretation and insertion matching yield <strong className="text-yellow-400">{scores.reading} out of 30</strong>. Review fossil markers.</li>
                  <li>Listening: Your comprehension of ग्लेशियल moraine markers was evaluated automatically at maximum index!</li>
                </ul>
              </div>

              <div className="bg-white/5 p-5 rounded-2xl border border-white/5 flex flex-col justify-between">
                <div className="space-y-2">
                  <h5 className="font-black text-white text-sm flex items-center gap-1">
                    <PhoneCall className="h-4 w-4 text-red-400" /> Career Wings Counseling Options
                  </h5>
                  <p className="text-gray-400 leading-relaxed font-medium">
                    Our verified admissions panels specialize in raising student outcomes to 100+ TOEFL scores. Secure a slot immediately with our expert advisors to discuss Ivy League/highly selective university pathways.
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-2 font-sans">
                  <button
                    onClick={() => {
                      onBookCounselling(`TOEFL Academic Score logged: ${scores.total}/120 points. Seeks university admissions guidelines.`);
                      alert("Admissions Counselor Slot Booked successfully! We will ring you up within 24 hours.");
                    }}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-black text-center text-xs cursor-pointer shadow-md"
                  >
                    🚀 Schedule Expert Consultation
                  </button>
                  <button
                    onClick={() => {
                      setStage("INTRO");
                      setReadingAnswers({});
                      setListeningProgress(0);
                      setListeningOptionChecked("");
                      setListeningDone(false);
                      setSpeakingActive(false);
                      setSpeakingDone(false);
                      setWritingInput("");
                    }}
                    className="px-4 py-3 rounded-xl border border-gray-800 text-gray-400 hover:text-white font-bold text-xs cursor-pointer hover:bg-white/5 text-center shrink-0"
                  >
                    Retake Mock
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={onBack}
                className="text-xs font-bold text-gray-500 hover:text-red-400 transition-colors"
              >
                ← Return to main assessment pages
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
