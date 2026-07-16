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
  Laptop,
  User
} from "lucide-react";

interface DuolingoMockSimulatorProps {
  onBookCounselling: (details: string) => void;
  onBack: () => void;
}

// 1. DET Read & Select words (8 Real words, 4 fake words)
const detWordBank = [
  { word: "benevolent", isReal: true },
  { word: "oblivious", isReal: true },
  { word: "plabative", isReal: false },
  { word: "audacious", isReal: true },
  { word: "frivolous", isReal: true },
  { word: "compretify", isReal: false },
  { word: "spandious", isReal: false },
  { word: "ubiquitous", isReal: true },
  { word: "lucrative", isReal: true },
  { word: "scrupting", isReal: false },
  { word: "clandestine", isReal: true },
  { word: "tenacious", isReal: true }
];

// 2. DET Dictation Sentence
const detDictationSentence = "Rapid modernization has significantly altered standard agricultural practices around the world.";

export default function DuolingoMockSimulator({ onBookCounselling, onBack }: DuolingoMockSimulatorProps) {
  // Stages: "INTRO" -> "ADAPTIVE_WORDS" -> "DICTATION" -> "INTERACTIVE_READING" -> "WRITING" -> "LEAD_FORM" -> "RESULTS"
  const [stage, setStage] = useState<"INTRO" | "ADAPTIVE_WORDS" | "DICTATION" | "INTERACTIVE_READING" | "WRITING" | "LEAD_FORM" | "RESULTS">("INTRO");
  
  // Timer countdown State
  const [sectionTimeLeft, setSectionTimeLeft] = useState<number>(900); // 15 mins total
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

  // States: Read & Select
  const [selectedWords, setSelectedWords] = useState<string[]>([]);

  // States: Dictation
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioProgress, setAudioProgress] = useState<number>(0);
  const [dictationInput, setDictationInput] = useState<string>( "");

  // States: Interactive Reading (Cloze Test)
  // Fill in the missing letters: "Th_ doc_tor ex_am_ined th_ pa_ti_ent."
  const [interactiveFills, setInteractiveFills] = useState({
    fill1: "", // "e" -> The
    fill2: "", // "tor" -> doctor
    fill3: "", // "am" -> examined
    fill4: ""  // "ti" -> patient
  });

  // States: Writing Sample (Strict 3 minutes)
  const [writingInput, setWritingInput] = useState<string>("");

  // States: Leads
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  // Section timer tick
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

  const startSectionTimer = (seconds: number) => {
    setSectionTimeLeft(seconds);
    setIsTimerActive(true);
  };

  const handleAutoSubmit = () => {
    if (stage === "ADAPTIVE_WORDS") {
      setStage("DICTATION");
    } else if (stage === "DICTATION") {
      setStage("INTERACTIVE_READING");
    } else if (stage === "INTERACTIVE_READING") {
      setStage("WRITING");
      startSectionTimer(180); // 3 mins for Writing Sample
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
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = "en-US";
      speech.rate = 0.9;

      speech.onboundary = () => {
        setAudioProgress((prev) => Math.min(100, prev + 12));
      };

      speech.onend = () => {
        setIsPlayingAudio(false);
        setAudioProgress(100);
      };

      speech.onerror = () => {
        setIsPlayingAudio(false);
      };

      setIsPlayingAudio(true);
      setAudioProgress(0);
      window.speechSynthesis.speak(speech);
    } else {
      setIsPlayingAudio(true);
      setTimeout(() => {
        setIsPlayingAudio(false);
        setAudioProgress(100);
      }, 3000);
    }
  };

  const toggleWordSelection = (word: string) => {
    if (selectedWords.includes(word)) {
      setSelectedWords((prev) => prev.filter((w) => w !== word));
    } else {
      setSelectedWords((prev) => [...prev, word]);
    }
  };

  const calculateDetScores = () => {
    // 1. Read & Select matching
    let selectPoints = 20;
    detWordBank.forEach((wb) => {
      const selected = selectedWords.includes(wb.word);
      if (wb.isReal && selected) selectPoints += 10; // real word correctly checked
      if (!wb.isReal && selected) selectPoints -= 8; // fake word checked (penalty)
    });

    // 2. Dictation matching ratio
    let dictationPoints = 15;
    const normInput = dictationInput.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").trim();
    const normTarget = detDictationSentence.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").trim();
    const inWords = normInput.split(/\s+/).filter(Boolean);
    const tarWords = normTarget.split(/\s+/).filter(Boolean);
    let matched = 0;
    tarWords.forEach(w => {
      if (inWords.includes(w)) matched++;
    });
    const matchRatio = tarWords.length > 0 ? (matched / tarWords.length) : 0;
    dictationPoints += Math.round(matchRatio * 45);

    // 3. Cloze test Interactive Reading
    let clozePoints = 10;
    if (interactiveFills.fill1.toLowerCase() === "e") clozePoints += 10;
    if (interactiveFills.fill2.toLowerCase() === "tor") clozePoints += 10;
    if (interactiveFills.fill3.toLowerCase() === "am") clozePoints += 10;
    if (interactiveFills.fill4.toLowerCase() === "ti") clozePoints += 10;

    // 4. Writing Sample (character bounds)
    const writeWords = writingInput.trim().split(/\s+/).filter(Boolean).length;
    let productionPoints = 20;
    if (writeWords >= 80) {
      productionPoints += 40;
    } else if (writeWords >= 50) {
      productionPoints += 30;
    } else if (writeWords > 5) {
      productionPoints += 15;
    }

    // Combine to DET 10-160 scale. (Duolingo grades in 5 point increments)
    const exactAverage = (selectPoints + dictationPoints + clozePoints + productionPoints) * 1.1; // scale adjust
    const rawScore = Math.min(160, Math.max(10, Math.round(exactAverage)));
    
    // Round to nearest 5 points
    const finalScore = Math.round(rawScore / 5) * 5;

    // Subscores calculations
    const comprehension = Math.min(160, Math.max(10, Math.round((selectPoints + dictationPoints) * 1.5)));
    const literacy = Math.min(160, Math.max(10, Math.round((selectPoints + clozePoints) * 1.6)));
    const production = Math.min(160, Math.max(10, Math.round((productionPoints) * 2.3)));
    const conversation = Math.min(160, Math.max(10, Math.round((dictationPoints + productionPoints) * 1.2)));

    return {
      overall: finalScore,
      comprehension,
      literacy,
      production,
      conversation,
      writeWords
    };
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) return;

    const res = calculateDetScores();
    const detailsStr = `Duolingo DET mock completed. Candidate: ${name}, Phone: ${phone}, Email: ${email}. Overall DET Result: ${res.overall} Points (Comp:${res.comprehension}, Lit:${res.literacy}, Prod:${res.production}, Conv:${res.conversation})`;
    onBookCounselling(detailsStr);

    setStage("RESULTS");
  };

  const scores = calculateDetScores();

  return (
    <div className="bg-[#111827] dark:bg-slate-950 rounded-[30px] border border-emerald-500/10 p-4 sm:p-8 space-y-6 shadow-2xl text-left text-gray-200 transition-all font-sans">
      
      {/* Dynamic Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-gray-800 gap-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl text-white shadow-md shadow-emerald-500/15">
            <Laptop className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-black text-emerald-400 tracking-wider">Duolingo Adaptive Tech</span>
            <h3 className="text-sm font-black text-white flex items-center gap-2 flex-wrap">
              Duolingo English Test (DET) Arena
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[9px] uppercase tracking-widest font-extrabold font-mono">
                Verified At-Home Grader
              </span>
            </h3>
          </div>
        </div>

        {isTimerActive && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 text-red-400 rounded-xl border border-red-500/20 font-mono text-xs font-black">
            <Clock className="h-4 w-4 animate-pulse text-red-500" />
            <span>ADAPTIVE SESSION RUNTIME: {formatTime(sectionTimeLeft)}</span>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        
        {/* STAGE 0: BRIEFING */}
        {stage === "INTRO" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-slate-900 to-emerald-950/20 border border-emerald-500/10 rounded-2xl p-6 sm:p-10 text-center space-y-4">
              <Sparkles className="h-10 w-10 text-emerald-400 mx-auto animate-bounce" />
              <h4 className="text-xl sm:text-2xl font-black text-white max-w-xl mx-auto">
                Duolingo English Test (DET) Adaptive Simulation
              </h4>
              <p className="text-gray-400 text-xs font-medium max-w-lg mx-auto leading-relaxed">
                The DET is a fast, adaptive test taken from private home environments. Verify your ability to identify genuine vocabulary, type real-time spoken cues, fill missing narrative word chunks and draft visual essays.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 max-w-3xl mx-auto pt-4 text-left">
                {[
                  { title: "1. Read & Select", slot: "Vocab Checklist", desc: "Select genuine English terms from a mixed pool", coloring: "border-l-4 border-emerald-500" },
                  { title: "2. Listen & Type", slot: "Character Dictate", desc: "Type audio script perfectly in actual bounds", coloring: "border-l-4 border-green-500" },
                  { title: "3. Interactive Reading", slot: "Cloze Fills", desc: "Fill in missing letters and structural words", coloring: "border-l-4 border-teal-500" },
                  { title: "4. Writing Sample", slot: "Visual Essay", desc: "Draft a formal situational essay under webcam mock", coloring: "border-l-4 border-indigo-500" }
                ].map((s, idx) => (
                  <div key={idx} className="bg-white/5 p-3.5 rounded-lg border border-white/5">
                    <p className="text-xs font-black text-white">{s.title}</p>
                    <p className="text-[10px] text-emerald-400 font-extrabold uppercase font-mono">{s.slot}</p>
                    <p className="text-[9px] text-gray-500 font-semibold">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-emerald-500/5 rounded-2xl border border-emerald-500/10 p-5 flex gap-3">
              <Info className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <ul className="text-xs font-medium text-gray-400 list-disc pl-4 space-y-1">
                <li className="font-extrabold text-white">DET Candidate Directives:</li>
                <li>Make sure your volume is turned on to hear the dictation sentence clip clearly.</li>
                <li>In Read &amp; Select, check ONLY the real words; selecting fake terms carries a score penalty.</li>
                <li>In Writing, we display a mock webcam panel to replicate DET's secure proctor environment.</li>
              </ul>
            </div>

            <div className="flex gap-3 justify-center pt-2">
              <button
                onClick={onBack}
                className="px-6 py-3 rounded-xl border border-gray-800 text-gray-400 font-bold text-xs hover:bg-white/5 cursor-pointer animate-none"
              >
                ← Change Prep Module
              </button>
              <button
                onClick={() => {
                  setStage("ADAPTIVE_WORDS");
                  startSectionTimer(480); // 8 mins countdown
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs px-8 py-3.5 rounded-xl cursor-pointer shadow-lg flex items-center gap-1.5 transition-transform hover:scale-[1.01]"
              >
                Launch DET Adaptive Trial ⚡ <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STAGE 1: READ and SELECT */}
        {stage === "ADAPTIVE_WORDS" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="bg-emerald-950/20 p-4 rounded-xl border border-emerald-500/10 flex justify-between items-center">
              <div>
                <span className="px-2 py-0.5 bg-emerald-600 text-white rounded text-[9px] font-black uppercase tracking-wider font-mono">DET TASK 1</span>
                <h4 className="text-base font-black text-white mt-1">Read and Select Real English Words</h4>
              </div>
              <span className="text-xs font-bold text-emerald-400">Adaptive Grader Track: DET-RS-WORDS</span>
            </div>

            <div className="bg-[#0b0f19] rounded-2.5xl p-6 border border-gray-800 space-y-6 max-w-3xl mx-auto">
              <p className="text-xs text-gray-400 leading-normal font-semibold">
                Instructions: Read the list below carefully. Select ONLY the ones you are absolutely certain are genuine English words. Sophisticated fake terms are blended in!
              </p>

              {/* Grid of words */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {detWordBank.map((itm) => {
                  const isChecked = selectedWords.includes(itm.word);
                  return (
                    <button
                      key={itm.word}
                      onClick={() => toggleWordSelection(itm.word)}
                      className={`p-4 rounded-xl border text-center font-extrabold text-xs transition-all cursor-pointer ${
                        isChecked
                          ? "bg-emerald-600 border-emerald-700 text-white shadow-md font-bold"
                          : "bg-slate-900 border-slate-800 text-gray-300 hover:bg-slate-800"
                      }`}
                    >
                      {itm.word}
                    </button>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="pt-4 flex justify-end border-t border-gray-800">
                <button
                  disabled={selectedWords.length === 0}
                  onClick={() => setStage("DICTATION")}
                  className={`px-6 py-2.5 rounded-lg text-xs font-black transition-all ${
                    selectedWords.length > 0
                      ? "bg-[#10b981] hover:bg-emerald-600 text-white cursor-pointer"
                      : "bg-gray-800 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Post selection &amp; Progress to Dictation →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STAGE 2: DICTATION */}
        {stage === "DICTATION" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="bg-emerald-950/20 p-4 rounded-xl border border-emerald-500/10 flex justify-between items-center">
              <div>
                <span className="px-2 py-0.5 bg-emerald-600 text-white rounded text-[9px] font-black uppercase tracking-wider font-mono">DET TASK 2</span>
                <h4 className="text-base font-black text-white mt-1">Listen and Type (Spoken Dictation)</h4>
              </div>
              <span className="text-xs font-bold text-emerald-400">Diagnostic Stream: DET-LST-TYPE</span>
            </div>

            <div className="bg-[#0b0f19] rounded-2.5xl p-6 border border-gray-800 space-y-6 max-w-2xl mx-auto">
              <p className="text-xs text-gray-400 leading-normal font-semibold">
                Instructions: Click the action speaker below to listen to a brief sentence dictation. Type the sentence exactly as spoken with proper capitalization and spacing.
              </p>

              {/* Player deck */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-5 bg-slate-950 rounded-xl border border-gray-850">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => playSpeechSynthesizer(detDictationSentence)}
                    className={`p-4 rounded-full text-white cursor-pointer transition-all ${
                      isPlayingAudio ? "bg-red-500 animate-pulse" : "bg-emerald-600 hover:bg-emerald-700"
                    }`}
                  >
                    {isPlayingAudio ? <VolumeX className="h-5 w-5" /> : <Play className="h-5 w-5 fill-current" />}
                  </button>
                  <div className="space-y-0.5 text-left">
                    <span className="text-[10px] font-black uppercase text-yellow-400 tracking-wider">Acoustic Player Deck</span>
                    <h5 className="text-xs font-black text-white">Speech Transcription challenge</h5>
                    <p className="text-[9.5px] text-gray-500 font-semibold leading-relaxed">
                      Make sure spellings match target collocations.
                    </p>
                  </div>
                </div>

                <div className="w-full md:w-48 space-y-1 shrink-0">
                  <div className="flex justify-between items-center text-[10px] font-bold text-gray-400">
                    <span>AUDIO STATUS</span>
                    <span>{isPlayingAudio ? "Streaming Voice..." : "Ready"}</span>
                  </div>
                  <div className="bg-slate-800 h-1 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${audioProgress}%` }}></div>
                  </div>
                </div>
              </div>

              {/* Input text box */}
              <div className="space-y-2 text-left">
                <span className="text-[10px] uppercase font-black text-gray-400 font-mono">Your Dictation Transcription input:</span>
                <input
                  type="text"
                  value={dictationInput}
                  onChange={(e) => setDictationInput(e.target.value)}
                  placeholder="Type what you hear here..."
                  className="w-full bg-slate-950 border border-gray-850 p-3.5 rounded-xl text-xs font-bold text-white outline-none focus:ring-1 focus:ring-emerald-500 font-sans"
                />
              </div>

              <div className="pt-2 flex justify-end border-t border-gray-800">
                <button
                  disabled={dictationInput.length < 5}
                  onClick={() => setStage("INTERACTIVE_READING")}
                  className={`px-6 py-2.5 rounded-lg text-xs font-black transition-all ${
                    dictationInput.length >= 5
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                      : "bg-gray-800 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Post script &amp; Start Interactive Reading →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STAGE 3: INTERACTIVE READING */}
        {stage === "INTERACTIVE_READING" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="bg-emerald-950/20 p-4 rounded-xl border border-emerald-500/10 flex justify-between items-center">
              <div>
                <span className="px-2 py-0.5 bg-emerald-600 text-white rounded text-[9px] font-black uppercase tracking-wider font-mono">DET TASK 3</span>
                <h4 className="text-base font-black text-white mt-1">Interactive Academic Reading (Cloze Task)</h4>
              </div>
              <span className="text-xs font-bold text-emerald-400">Section Stream: DET-IR-CLOZE</span>
            </div>

            <div className="bg-[#0b0f19] rounded-2.5xl p-6 border border-gray-800 space-y-6 max-w-2xl mx-auto">
              <p className="text-xs text-gray-400 leading-normal font-semibold">
                Instructions: Read the short paragraph blocks below and fill in the missing portions of letters within the incomplete terms to restore spelling cohesion.
              </p>

              <div className="bg-[#040815] border border-gray-800 p-6 rounded-xl space-y-6 font-bold text-xs sm:text-sm text-gray-200 leading-loose">
                <div className="space-y-4">
                  <p className="whitespace-pre-line tracking-wide">
                    Th
                    <input 
                      type="text" 
                      maxLength={1} 
                      value={interactiveFills.fill1} 
                      onChange={(e) => setInteractiveFills(prev => ({ ...prev, fill1: e.target.value }))}
                      className="w-5 bg-slate-900 border border-gray-800 text-center text-xs text-emerald-400 rounded outline-none focus:ring-1 focus:ring-emerald-500 font-mono tracking-widest font-black"
                    />{" "}
                    doc
                    <input 
                      type="text" 
                      maxLength={3} 
                      value={interactiveFills.fill2} 
                      onChange={(e) => setInteractiveFills(prev => ({ ...prev, fill2: e.target.value }))}
                      className="w-10 bg-slate-900 border border-gray-800 text-center text-xs text-emerald-400 rounded outline-none focus:ring-1 focus:ring-emerald-500 font-mono tracking-widest font-black inline-block lowercase mx-0.5"
                    />{" "}
                    ex
                    <input 
                      type="text" 
                      maxLength={2} 
                      value={interactiveFills.fill3} 
                      onChange={(e) => setInteractiveFills(prev => ({ ...prev, fill3: e.target.value }))}
                      className="w-8 bg-slate-900 border border-gray-800 text-center text-xs text-emerald-400 rounded outline-none focus:ring-1 focus:ring-emerald-500 font-mono tracking-widest font-black inline-block lowercase mx-0.5"
                    />
                    ined th
                    <span className="tracking-wide">e pa</span>
                    <input 
                      type="text" 
                      maxLength={2} 
                      value={interactiveFills.fill4} 
                      onChange={(e) => setInteractiveFills(prev => ({ ...prev, fill4: e.target.value }))}
                      className="w-8 bg-slate-900 border border-gray-800 text-center text-xs text-emerald-400 rounded outline-none focus:ring-1 focus:ring-emerald-500 font-mono tracking-widest font-black inline-block lowercase"
                    />
                    ent and prescribed a healthy diet plan to recover core physical vitality.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex justify-end border-t border-gray-800">
                <button
                  disabled={!interactiveFills.fill1 || !interactiveFills.fill2}
                  onClick={() => {
                    setStage("WRITING");
                    startSectionTimer(180); // 3 mins writing sample DET
                  }}
                  className={`px-6 py-2.5 rounded-lg text-xs font-black transition-all ${
                    interactiveFills.fill1 && interactiveFills.fill2
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                      : "bg-gray-800 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Verify Cloze &amp; Progress to Writing Sample →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STAGE 4: WRITING SAMPLE */}
        {stage === "WRITING" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="bg-emerald-950/20 p-4 rounded-xl border border-emerald-500/10 flex justify-between items-center">
              <div>
                <span className="px-2 py-0.5 bg-indigo-600 text-white rounded text-[9px] font-black uppercase tracking-wider font-mono">DET TASK 4</span>
                <h4 className="text-base font-black text-white mt-1">DET Writing Sample (Timed)</h4>
              </div>
              <span className="text-xs font-bold text-emerald-400">Section Stream: DET-W-SAMPLE</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Left col: webcam mock */}
              <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl border border-gray-800 text-center flex flex-col justify-between items-center space-y-4">
                <span className="text-[9px] font-black uppercase text-yellow-500 tracking-widest">DET AT-HOME SECURITY RADAR</span>
                
                {/* Virtual webcam box */}
                <div className="w-full aspect-video bg-[#030712] rounded-xl border border-dashed border-red-500/30 flex flex-col items-center justify-center space-y-2 relative overflow-hidden">
                  <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-red-600/20 border border-red-600/40 text-red-500 text-[8px] font-black font-mono px-2 py-0.5 rounded-full uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span> Security Active
                  </div>
                  <User className="h-10 w-10 text-gray-600 animate-pulse" />
                  <p className="text-[10px] text-gray-500 font-bold max-w-xs leading-normal">
                    AI Webcam parsing eye-movement parameters and window focusing grids securely.
                  </p>
                </div>
                
                <p className="text-[10px] text-gray-500 leading-normal font-medium">
                  Take precautions: Leaving secondary windows active or scanning mobile screens triggers real-time test termination.
                </p>
              </div>

              {/* Right col: essay input */}
              <div className="lg:col-span-7 bg-white/5 border border-white/5 rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#10b981]">Argumentative Discussion prompt:</span>
                  <h5 className="text-xs sm:text-sm font-black text-white leading-normal">
                    "Describe a substantial trip you embarked on. How did cultural differences or traveling modify your overall life decisions?"
                  </h5>
                  
                  <div className="flex justify-between items-center text-[10px] uppercase font-black text-gray-400 pt-2">
                    <span>Drafting Console</span>
                    <span className={`${writingInput.trim().split(/\s+/).filter(Boolean).length >= 50 ? "text-emerald-400" : "text-yellow-400 font-bold"}`}>
                      WORDS: {writingInput.trim().split(/\s+/).filter(Boolean).length} / Recommend 50+ Words
                    </span>
                  </div>

                  <textarea
                    rows={5}
                    value={writingInput}
                    onChange={(e) => setWritingInput(e.target.value)}
                    placeholder="Several years ago, I visited the historical cities of Europe, where I observed completely distinct pacing models..."
                    className="w-full text-xs font-bold font-sans bg-slate-950 border border-gray-850 p-4 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 text-white leading-relaxed"
                  />
                </div>

                <button
                  disabled={writingInput.trim().split(/\s+/).filter(Boolean).length < 10}
                  onClick={() => {
                    setStage("LEAD_FORM");
                    setIsTimerActive(false);
                  }}
                  className={`w-full py-3.5 rounded-xl text-xs font-black shadow-md transition-all ${
                    writingInput.trim().split(/\s+/).filter(Boolean).length >= 10
                      ? "bg-emerald-600 hover:bg-emerald-750 text-white cursor-pointer"
                      : "bg-gray-800 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Complete Writing and Process Grader →
                </button>
              </div>

            </div>
          </motion.div>
        )}

        {/* STAGE 5: LEAD GATE */}
        {stage === "LEAD_FORM" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6 max-w-lg mx-auto font-sans"
          >
            <div className="text-center space-y-3">
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 w-12 h-12 rounded-full mx-auto flex items-center justify-center">
                <Shield className="h-6 w-6 animate-pulse" />
              </div>
              <h3 className="text-lg font-black text-white">Unlock Verified Duolingo DET Bands</h3>
              <p className="text-xs text-gray-400 leading-normal max-w-sm mx-auto font-medium">
                Your adaptive assessment metrics are synced! Please fill in candidate info to reveal your Duolingo score breakdowns instantly.
              </p>
            </div>

            <form onSubmit={handleLeadSubmit} className="space-y-4 bg-slate-950 p-6 rounded-2.5xl border border-gray-850">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-gray-400">Full Candidate Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#080d21] border border-blue-900/60 p-3.5 rounded-xl text-xs font-bold text-white outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-gray-400">Phone Number (with active country code)</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#080d21] border border-blue-900/60 p-3.5 rounded-xl text-xs font-bold text-white outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-gray-400">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. rahul@careerwings.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#080d21] border border-blue-900/60 p-3.5 rounded-xl text-xs font-bold text-white outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-xl text-xs font-black mt-2 transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 font-sans"
              >
                <span>Decode Duolingo DET Report Card</span>
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
            <div className="bg-gradient-to-br from-slate-900 to-emerald-950/20 border border-gray-800 rounded-3xl p-6 sm:p-10 text-center space-y-4">
              <div className="inline-flex p-3.5 bg-yellow-400/10 rounded-2xl border border-yellow-400/20 text-yellow-400 animate-none">
                <Award className="h-8 w-8 animate-bounce" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-black tracking-widest text-[#f59e0b] uppercase font-mono">DUOLINGO PORTFOLIO SCORE VERIFIED</span>
                <h4 className="text-2xl font-black text-white leading-none">Fantastic job, {name}!</h4>
                <p className="text-xs text-gray-400 font-medium">Your portfolio scores have been updated and sent to admissions counselors.</p>
              </div>

              {/* Big Score Badge */}
              <div className="inline-flex flex-col items-center justify-center p-6 bg-[#040815] rounded-3xl border border-gray-850 shadow-xl min-w-[200px]">
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest font-mono font-sans">DUOLINGO DET OVERALL</span>
                <span className="text-5xl sm:text-6xl font-black text-white font-mono leading-none py-2">{scores.overall}</span>
                <div className="px-3 py-1 bg-emerald-600/25 text-emerald-300 rounded-full text-[9px] font-extrabold uppercase font-mono tracking-widest border border-emerald-500/30">
                  Adaptive Scale (10 - 160 Points)
                </div>
              </div>

              {/* Subscores details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto pt-6 text-left font-sans">
                {[
                  { skill: "Literacy", val: scores.literacy, desc: "Reading and Writing skills", color: "bg-emerald-500" },
                  { skill: "Comprehension", val: scores.comprehension, desc: "Reading and Listening", color: "bg-green-500" },
                  { skill: "Production", val: scores.production, desc: "Writing and Speaking", color: "bg-teal-500" },
                  { skill: "Conversation", val: scores.conversation, desc: "Listening and Speaking", color: "bg-indigo-500" }
                ].map((s, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-gray-850">
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider">{s.skill}</p>
                    <p className="text-lg font-black text-white py-1">{s.val} <span className="text-[10px] text-gray-500 font-bold">/ 160</span></p>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                      <div className={`h-full rounded-full ${s.color}`} style={{ width: `${(s.val / 160) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Diagnostics and Counselling slots */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left text-xs font-semibold text-gray-300 font-sans">
              <div className="bg-white/5 p-5 rounded-2xl border border-white/5 space-y-3">
                <h5 className="font-black text-white text-sm flex items-center gap-1">
                  <UserCheck className="h-4 w-4 text-emerald-400" /> DET Portfolio Insights
                </h5>
                <ul className="space-y-2 list-inside list-disc text-gray-400 leading-normal font-medium">
                  <li>Your Read &amp; Select word checklist demonstrated top-tier lexical identification.</li>
                  <li>Your Cloze paragraph filling completed accurately under strict timing constraints.</li>
                  <li>Your descriptive Writing Sample character length counts to <strong className="text-emerald-400">{scores.writeWords} words</strong>.</li>
                </ul>
              </div>

              <div className="bg-white/5 p-5 rounded-2xl border border-white/5 flex flex-col justify-between">
                <div className="space-y-2">
                  <h5 className="font-black text-white text-sm flex items-center gap-1">
                    <PhoneCall className="h-4 w-4 text-emerald-400" /> Career Wings Counseling Options
                  </h5>
                  <p className="text-gray-400 leading-relaxed font-semibold font-medium">
                    Duolingo's high affordability makes it the fastest pathway for SDS and general visa categories. Connect live with Career Wings advisors to match your DET score with premium university programs globally.
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-2 font-sans">
                  <button
                    onClick={() => {
                      onBookCounselling(`DUOLINGO DET overall verified: ${scores.overall}/160 points. Seeks university SDS pathways.`);
                      alert("Admissions Counselor Slot Booked successfully! We will ring you up within 24 hours.");
                    }}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-black text-center text-xs cursor-pointer shadow-md"
                  >
                    🚀 Schedule Free DET Consulting Slot
                  </button>
                  <button
                    onClick={() => {
                      setStage("INTRO");
                      setSelectedWords([]);
                      setDictationInput("");
                      setInteractiveFills({ fill1: "", fill2: "", fill3: "", fill4: "" });
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
                className="text-xs font-bold text-gray-500 hover:text-emerald-400 transition-colors"
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
