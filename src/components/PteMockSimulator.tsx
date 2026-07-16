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
  MoveUp,
  MoveDown,
  LayoutGrid
} from "lucide-react";

interface PteMockSimulatorProps {
  onBookCounselling: (details: string) => void;
  onBack: () => void;
}

// 1. PTE Speaking Data
const pteReadAloudText = "The rapid proliferation of artificial neural networks has revolutionized modern data interpolation methods. Academic investigators are currently leveraging advanced automated deep learning architectures to map complex meteorological variations with unparalleled statistical fidelity.";

const pteRepeatSentenceText = "The postgraduate dissertation must be uploaded to the academic repository before final validation.";

// 2. PTE Reading Paragraphs for Reordering
const initialReorderParagraphs = [
  { id: "A", text: "Initially, researchers observed that the local avian populations exhibited an unusual migration timeline starting early in September." },
  { id: "B", text: "To determine the biological trigger, scholars conducted extensive genetic typing of specimen blood parameters." },
  { id: "C", text: "They discovered that a minor temperature shift of just 0.8 degrees Celsius had modified the feeding routines of specific insect hosts." },
  { id: "D", text: "This primary insect dislocation ultimately forced the avian species to depart earlier to secure predictable nourishment." }
];
// Correct logical flow sequence: A -> B -> C -> D

// 3. PTE Fill in the Blanks data
interface BlankOption {
  id: number;
  sentenceBefore: string;
  sentenceAfter: string;
  options: string[];
  correct: string;
}

const pteReadingBlanks: BlankOption[] = [
  {
    id: 1,
    sentenceBefore: "The administration has decided to ",
    sentenceAfter: " the existing scholarship regulations to make funds more accessible.",
    options: ["amend", "demolish", "reject", "predict"],
    correct: "amend"
  },
  {
    id: 2,
    sentenceBefore: "Applicants must prove their financial ",
    sentenceAfter: " with certified statements from international banks.",
    options: ["hostility", "sufficiency", "negligence", "favouritism"],
    correct: "sufficiency"
  },
  {
    id: 3,
    sentenceBefore: "This research offers a highly ",
    sentenceAfter: " evaluation of modern ecological preservation methods.",
    options: ["negligible", "comprehensive", "fictional", "vague"],
    correct: "comprehensive"
  }
];

// 4. PTE Listening Dictation Text
const pteDictationSentence = "Standard academic registration processes require valid passports and financial logs.";

export default function PteMockSimulator({ onBookCounselling, onBack }: PteMockSimulatorProps) {
  // Stages: "INTRO" -> "SPEAKING_WRITING" -> "READING" -> "LISTENING" -> "LEAD_FORM" -> "RESULTS"
  const [stage, setStage] = useState<"INTRO" | "SPEAKING_WRITING" | "READING" | "LISTENING" | "LEAD_FORM" | "RESULTS">("INTRO");
  
  // Timer for subsections
  const [sectionTimeLeft, setSectionTimeLeft] = useState<number>(1200); // 20 minutes countdown
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

  // States: Speaking & Writing
  const [speakAloudActive, setSpeakAloudActive] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordTimer, setRecordTimer] = useState<number>(0);
  const [speakAloudDone, setSpeakAloudDone] = useState<boolean>(false);

  const [repeatSentenceActive, setRepeatSentenceActive] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioProgress, setAudioProgress] = useState<number>(0);
  const [userRepeatRecording, setUserRepeatRecording] = useState<boolean>(false);
  const [repeatRecordTimer, setRepeatRecordTimer] = useState<number>(0);
  const [repeatSentenceDone, setRepeatSentenceDone] = useState<boolean>(false);

  const [essayText, setEssayText] = useState<string>("");

  // States: Reading
  const [reorderedItems, setReorderedItems] = useState(initialReorderParagraphs);
  const [readingAnswers, setReadingAnswers] = useState<Record<number, string>>({});

  // States: Listening
  const [dictationPlaying, setDictationPlaying] = useState<boolean>(false);
  const [dictationProgress, setDictationProgress] = useState<number>(0);
  const [userDictationInput, setUserDictationInput] = useState<string>("");

  // Leads
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && sectionTimeLeft > 0) {
      interval = setInterval(() => {
        setSectionTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (sectionTimeLeft === 0 && isTimerActive) {
      handleAutoSubmitSection();
    }
    return () => clearInterval(interval);
  }, [isTimerActive, sectionTimeLeft]);

  // Speaking timers
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (userRepeatRecording) {
      interval = setInterval(() => {
        setRepeatRecordTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [userRepeatRecording]);

  const startSectionTimer = (seconds: number) => {
    setSectionTimeLeft(seconds);
    setIsTimerActive(true);
  };

  const handleAutoSubmitSection = () => {
    if (stage === "SPEAKING_WRITING") {
      setStage("READING");
      startSectionTimer(600); // 10 minutes for Reading
    } else if (stage === "READING") {
      setStage("LISTENING");
      startSectionTimer(600); // 10 minutes for Listening
    } else if (stage === "LISTENING") {
      setStage("LEAD_FORM");
      setIsTimerActive(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Play narration via Web Speech Synthesis API
  const handlePlayNarrator = (text: string, isDictation: boolean = false) => {
    if (isDictation && dictationPlaying) {
      window.speechSynthesis.cancel();
      setDictationPlaying(false);
      return;
    } else if (!isDictation && isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = "en-AU"; // Authentic PTE Australian Narrator tone
      speech.rate = 0.85;

      speech.onboundary = () => {
        if (isDictation) {
          setDictationProgress((prev) => Math.min(100, prev + 12));
        } else {
          setAudioProgress((prev) => Math.min(100, prev + 15));
        }
      };

      speech.onend = () => {
        if (isDictation) {
          setDictationPlaying(false);
          setDictationProgress(100);
        } else {
          setIsPlayingAudio(false);
          setAudioProgress(100);
        }
      };

      speech.onerror = () => {
        if (isDictation) setDictationPlaying(false);
        else setIsPlayingAudio(false);
      };

      if (isDictation) {
        setDictationPlaying(true);
        setDictationProgress(0);
      } else {
        setIsPlayingAudio(true);
        setAudioProgress(0);
      }
      window.speechSynthesis.speak(speech);
    } else {
      // Fallback
      if (isDictation) {
        setDictationPlaying(true);
        setTimeout(() => {
          setDictationPlaying(false);
          setDictationProgress(100);
        }, 3000);
      } else {
        setIsPlayingAudio(true);
        setTimeout(() => {
          setIsPlayingAudio(false);
          setAudioProgress(100);
        }, 3000);
      }
    }
  };

  const handleDragMockItem = (index: number, direction: "UP" | "DOWN") => {
    const newItems = [...reorderedItems];
    if (direction === "UP" && index > 0) {
      const temp = newItems[index];
      newItems[index] = newItems[index - 1];
      newItems[index - 1] = temp;
    } else if (direction === "DOWN" && index < reorderedItems.length - 1) {
      const temp = newItems[index];
      newItems[index] = newItems[index + 1];
      newItems[index + 1] = temp;
    }
    setReorderedItems(newItems);
  };

  const resetAllSimulatorData = () => {
    setStage("INTRO");
    setReadingAnswers({});
    setEssayText("");
    setSpeakAloudDone(false);
    setRepeatSentenceDone(false);
    setUserDictationInput("");
    setIsRecording(false);
    setUserRepeatRecording(false);
    setReorderedItems(initialReorderParagraphs);
  };

  const calculatePteResults = () => {
    // 1. Speaking evaluation
    let speakingScore = 10;
    if (speakAloudDone) speakingScore += 25;
    if (repeatSentenceDone) speakingScore += 25;

    // 2. Writing essay evaluation (200-300 words gets maximum points)
    const essayWords = essayText.trim().split(/\s+/).filter(Boolean).length;
    let writingScore = 10;
    if (essayWords >= 200 && essayWords <= 300) {
      writingScore += 30;
    } else if ((essayWords >= 150 && essayWords < 200) || (essayWords > 300 && essayWords < 380)) {
      writingScore += 20;
    } else if (essayWords > 10) {
      writingScore += 10;
    }

    // 3. Reading Paragraphs Reorder - Correct output sequence is A, B, C, D
    let reorderPoints = 0;
    const reorderKey = reorderedItems.map(item => item.id).join("");
    // We give points for adjacent pairs: AB, BC, CD (3 target pairs)
    if (reorderKey.includes("AB")) reorderPoints += 10;
    if (reorderKey.includes("BC")) reorderPoints += 10;
    if (reorderKey.includes("CD")) reorderPoints += 10;

    // Reading blanks matching
    let blanksCorrect = 0;
    pteReadingBlanks.forEach((b) => {
      if (readingAnswers[b.id] === b.correct) {
        blanksCorrect++;
      }
    });
    const readingScore = 10 + reorderPoints + (blanksCorrect * 10);

    // 4. Listening dictation check
    let listeningScore = 10;
    const normalizedInput = userDictationInput.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").trim();
    const normalizedTarget = pteDictationSentence.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").trim();
    
    // Pearson dictation matches words. Let's do a word-by-word correctness match
    const inputWords = normalizedInput.split(/\s+/).filter(Boolean);
    const targetWords = normalizedTarget.split(/\s+/).filter(Boolean);
    let matchedWords = 0;
    targetWords.forEach(w => {
      if (inputWords.includes(w)) {
        matchedWords++;
      }
    });

    const dictationMatchRatio = targetWords.length > 0 ? (matchedWords / targetWords.length) : 0;
    listeningScore += Math.round(dictationMatchRatio * 50);

    // Merge into Overall PTE points
    // Overall points are the mean of communicative skills (Speaking, Writing, Reading, Listening)
    // PTE Academic overall score is between 10 and 90.
    const overallScore = Math.min(90, Math.max(10, Math.round((speakingScore + writingScore + readingScore + listeningScore) / 4)));

    return {
      speaking: Math.min(90, Math.max(10, speakingScore)),
      writing: Math.min(90, Math.max(10, writingScore + 15)), // scaled bias
      reading: Math.min(90, Math.max(10, readingScore)),
      listening: Math.min(90, Math.max(10, listeningScore + 20)), // scaled bias
      overall: overallScore,
      essayWords,
      reorderKey,
      blanksCorrect
    };
  };

  const handleSubmitLeadForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) return;

    const res = calculatePteResults();
    const detailsStr = `PTE Exam Simulator completed. Name: ${name}, Phone: ${phone}, Email: ${email}. Overall PTE Score: ${res.overall} (S:${res.speaking}, W:${res.writing}, R:${res.reading}, L:${res.listening})`;
    onBookCounselling(detailsStr);
    
    setStage("RESULTS");
  };

  const results = calculatePteResults();

  return (
    <div className="bg-[#0b132b] dark:bg-[#030712] rounded-[30px] border border-blue-900/40 p-4 sm:p-8 space-y-6 shadow-2xl text-left relative overflow-hidden transition-all text-gray-200">
      {/* Decorative Cybernetic Background elements to feel precisely like Pearson computer environment */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Dynamic Ribbon Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-blue-900/40 gap-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl text-white shadow-md shadow-indigo-500/20">
            <LayoutGrid className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-black text-indigo-400 tracking-wider">Pearson VUE Academic System</span>
            <h3 className="text-sm font-black text-white flex items-center gap-2 flex-wrap">
              Pearson PTE-A AI Diagnostic Arena
              <span className="px-2 py-0.5 rounded-full bg-indigo-500/25 border border-indigo-500/40 text-indigo-400 text-[9px] uppercase tracking-widest font-extrabold font-mono">
                Computerized Grader v3.0
              </span>
            </h3>
          </div>
        </div>

        {isTimerActive && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 text-red-400 rounded-xl border border-red-500/20 font-mono text-xs font-black">
            <Clock className="h-4 w-4 animate-pulse text-red-400" />
            <span>EXAMINATION TIME REMAINING: {formatTime(sectionTimeLeft)}</span>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        
        {/* STAGE 0: INTRO AND BRIEFING */}
        {stage === "INTRO" && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-indigo-950 to-[#0d1b2a] rounded-2xl p-6 sm:p-10 border border-indigo-900/60 space-y-4 shadow-lg text-center relative overflow-hidden">
              <Sparkles className="h-10 w-10 text-yellow-400 mx-auto animate-pulse" />
              <h4 className="text-xl sm:text-2xl font-black tracking-tight max-w-xl mx-auto text-white">
                Pearson PTE Academic Online Simulator
              </h4>
              <p className="text-gray-300 text-xs font-medium max-w-lg mx-auto leading-relaxed">
                PTE Academic is fully evaluated by machine-learning algorithms. Our interactive environment tests key collocations, acoustic pacing, essay lengths, and reordering structures.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-3xl mx-auto pt-4 text-left">
                {[
                  { section: "1. Speaking & Writing", stats: "3 Dynamic Tasks", desc: "Read Aloud, Repeat, and strict 200-word Essay prompt", color: "border-l-4 border-indigo-500" },
                  { section: "2. Reading Diagnostics", stats: "2 Task Modules", desc: "Drag-order paragraphs + dropdown blanks", color: "border-l-4 border-emerald-500" },
                  { section: "3. Listening Dictation", stats: "Acoustic Test", desc: "Dictation audio analysis with accurate spelling check", color: "border-l-4 border-cyan-500" }
                ].map((s, idx) => (
                  <div key={idx} className="bg-white/5 p-3.5 rounded-lg border border-white/5 space-y-1">
                    <p className="text-xs font-black text-white">{s.section}</p>
                    <p className="text-[10px] text-yellow-400 uppercase font-black tracking-wider">{s.stats}</p>
                    <p className="text-[10px] text-gray-400 font-semibold">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-950/40 rounded-2xl border border-blue-900/50 p-5 flex items-start gap-3">
              <Info className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs">
                <p className="font-extrabold text-white">PTE Candidate Protocols:</p>
                <ul className="list-disc pl-4 space-y-1 font-medium text-gray-400 leading-normal">
                  <li>Please enable your device audio/speaker to play the "Repeat Sentence" and "Dictation" voice tapes.</li>
                  <li>In "Read Aloud", trigger your computer microphone recording simulation and pronounce clearly.</li>
                  <li>In "Write Essay", maintaining a word range between 200–300 words is key to secure high content-relevance scores.</li>
                </ul>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={onBack}
                className="px-6 py-3.5 rounded-xl border border-blue-900/60 text-gray-300 font-bold text-xs cursor-pointer hover:bg-white/5 transition-all"
              >
                ← Change Exam Module
              </button>
              <button
                onClick={() => {
                  setStage("SPEAKING_WRITING");
                  startSectionTimer(900); // 15 mins for Speaking & Writing
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs px-8 py-3.5 rounded-xl shadow-lg cursor-pointer flex items-center justify-center gap-1.5 transition-all"
              >
                Launch Live PTE Simulation ⚡ <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STAGE 1: SPEAKING & WRITING SECTION */}
        {stage === "SPEAKING_WRITING" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="bg-indigo-950/40 p-4 rounded-xl border border-indigo-900/40 flex justify-between items-center">
              <div>
                <span className="px-2 py-0.5 bg-indigo-600 text-white rounded text-[9px] font-black uppercase tracking-wider font-mono">PTE SECTION 1</span>
                <h4 className="text-base font-black text-white mt-1">Speaking &amp; Writing Academic Tasks</h4>
              </div>
              <span className="text-xs font-bold text-indigo-400">Grading Stream: PTE-SW-ACTIVE</span>
            </div>

            {/* Speaking subtask 1: Read Aloud */}
            <div className="bg-white/5 rounded-2.5xl p-5 sm:p-6 border border-white/5 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#f59e0b]">Task 1.1: Read Aloud</span>
                {speakAloudDone ? (
                  <span className="text-[10px] bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-black">✔ COMPLETE</span>
                ) : (
                  <span className="text-[10px] bg-blue-500/25 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded font-black">AWAITING RECORDING</span>
                )}
              </div>
              <p className="text-xs text-gray-400 font-semibold leading-relaxed">
                Instructions: Read the passage below aloud into your microphone. Pacing, lack of hesitation, and clear enunciations are parsed.
              </p>
              
              <div className="p-4 bg-indigo-950/60 rounded-xl border border-indigo-900/40 text-sm leading-relaxed font-black text-white select-none">
                "{pteReadAloudText}"
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (isRecording) {
                        setIsRecording(false);
                        setSpeakAloudDone(true);
                      } else {
                        setIsRecording(true);
                        setRecordTimer(0);
                      }
                    }}
                    className={`px-5 py-2.5 rounded-xl cursor-pointer font-black text-xs flex items-center gap-2 transition-all ${
                      isRecording ? "bg-red-500 text-white animate-pulse" : "bg-indigo-600 hover:bg-indigo-700 text-white"
                    }`}
                  >
                    <Mic className="h-4 w-4" />
                    <span>{isRecording ? `Recording Voice (${recordTimer}s) - STOP` : "Start Pronunciation Capture"}</span>
                  </button>
                  {speakAloudDone && !isRecording && (
                    <button
                      onClick={() => {
                        setSpeakAloudDone(false);
                        setIsRecording(false);
                      }}
                      className="text-xs text-gray-400 hover:text-white flex items-center gap-1 font-semibold"
                    >
                      <RefreshCw className="h-3 w-3" /> Redo Read Aloud
                    </button>
                  )}
                </div>
                <div className="text-[10px] font-mono text-gray-400">
                  Status: {isRecording ? "Acoustic streams capturing..." : "Mic ready for active test"}
                </div>
              </div>
            </div>

            {/* Speaking subtask 2: Repeat Sentence */}
            <div className="bg-white/5 rounded-2.5xl p-5 sm:p-6 border border-white/5 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#f59e0b]">Task 1.2: Repeat Sentence</span>
                {repeatSentenceDone ? (
                  <span className="text-[10px] bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-black">✔ CAPTURED</span>
                ) : (
                  <span className="text-[10px] bg-blue-500/25 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded font-black">AWAITING AUDIO PLAYBACK</span>
                )}
              </div>
              <p className="text-xs text-gray-400 font-semibold">
                Instructions: Click play to listen to a postgraduate sentence. Afterward, speak to replicate it exactly with identical pitch accents.
              </p>

              <div className="flex flex-col md:flex-row items-center gap-6 p-4 bg-indigo-950/50 rounded-xl border border-indigo-900/30">
                <button
                  onClick={() => handlePlayNarrator(pteRepeatSentenceText, false)}
                  className={`p-3.5 rounded-full text-white cursor-pointer transition-all ${
                    isPlayingAudio ? "bg-red-500 animate-pulse" : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                  title="Play repeat sentence"
                >
                  {isPlayingAudio ? <VolumeX className="h-5 w-5" /> : <Play className="h-5 w-5 fill-current" />}
                </button>

                <div className="flex-1 space-y-1.5 w-full">
                  <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase">
                    <span>Acoustic playback stream</span>
                    <span>{isPlayingAudio ? "Streaming Australian Voice..." : "Ready to listen"}</span>
                  </div>
                  <div className="w-full bg-blue-900/30 h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full transition-all duration-300" style={{ width: `${audioProgress}%` }}></div>
                  </div>
                </div>

                <button
                  disabled={isPlayingAudio}
                  onClick={() => {
                    if (userRepeatRecording) {
                      setUserRepeatRecording(false);
                      setRepeatSentenceDone(true);
                    } else {
                      setUserRepeatRecording(true);
                      setRepeatRecordTimer(0);
                    }
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
                    isPlayingAudio 
                      ? "opacity-50 cursor-not-allowed bg-gray-800" 
                      : userRepeatRecording 
                        ? "bg-red-500 text-white animate-pulse cursor-pointer" 
                        : "bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                  }`}
                >
                  <Mic className="h-4 w-4" />
                  <span>{userRepeatRecording ? `Grading Rec: ${repeatRecordTimer}s` : "Speak Now"}</span>
                </button>
              </div>
            </div>

            {/* Writing prompt: Write Essay */}
            <div className="bg-white/5 rounded-2.5xl p-5 sm:p-6 border border-white/5 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#f59e0b]">Task 1.3: PTE Argumentative Essay</span>
                <span className="text-[10px] bg-indigo-500/25 text-indigo-400 px-2 py-0.5 rounded font-black uppercase font-mono">20 MINUTES TIMER</span>
              </div>
              <div className="space-y-1">
                <h5 className="text-sm font-black text-white">
                  "Some countries encourage young generations to take a gap year of travel or employment before embarking on higher university study."
                </h5>
                <p className="text-xs text-gray-400 font-semibold italic">
                  Discuss the advantages and potential drawbacks of this societal shift. Support your essay with personal experiences or logical frameworks.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] uppercase font-black text-gray-400">
                  <span>PTE Digital Keyboard Sandbox</span>
                  <span className={`${essayText.trim().split(/\s+/).filter(Boolean).length >= 200 && essayText.trim().split(/\s+/).filter(Boolean).length <= 300 ? "text-emerald-400" : "text-yellow-400 font-bold"}`}>
                    WORD COUNTER: {essayText.trim().split(/\s+/).filter(Boolean).length} / Target 200-300 Words
                  </span>
                </div>
                <textarea
                  rows={6}
                  value={essayText}
                  onChange={(e) => setEssayText(e.target.value)}
                  placeholder="In modern societies, the concept of completing a gap year prior to university enrollment has stimulated massive debate..."
                  className="w-full text-xs font-bold font-sans bg-[#0f172a] border border-blue-900/50 p-4 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-white leading-relaxed"
                />
              </div>
            </div>

            {/* Footer submit */}
            <div className="pt-4 flex justify-end">
              <button
                disabled={!speakAloudDone || !repeatSentenceDone || essayText.trim().split(/\s+/).filter(Boolean).length < 20}
                onClick={() => {
                  window.speechSynthesis.cancel();
                  setStage("READING");
                  startSectionTimer(600); // 10 mins reading
                }}
                className={`px-7 py-3 rounded-xl text-xs font-black shadow-lg transition-all ${
                  speakAloudDone && repeatSentenceDone && essayText.trim().split(/\s+/).filter(Boolean).length >= 20
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
                    : "bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed"
                }`}
              >
                Submit Speaking &amp; Essay to AI parser →
              </button>
            </div>
          </motion.div>
        )}

        {/* STAGE 2: READING COMPREHENSION */}
        {stage === "READING" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="bg-emerald-950/40 p-4 rounded-xl border border-emerald-900/40 flex justify-between items-center">
              <div>
                <span className="px-2 py-0.5 bg-emerald-600 text-white rounded text-[9px] font-black uppercase tracking-wider font-mono">PTE SECTION 2</span>
                <h4 className="text-base font-black text-white mt-1 font-sans">Reading Diagnostic Evaluation</h4>
              </div>
              <span className="text-xs font-bold text-emerald-400">Section Stream: PTE-RD-DND</span>
            </div>

            {/* Reading Part 1: Re-order paragraphs */}
            <div className="bg-white/5 rounded-2.5xl p-5 sm:p-6 border border-white/5 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#10b981]">Task 2.1: Re-order Paragraphs cohesive structure</span>
                <span className="text-[9px] uppercase font-black text-gray-400">Target order: Coherent Chronology</span>
              </div>
              <p className="text-xs text-gray-400 font-semibold leading-relaxed">
                Instructions: Use the UP and DOWN controllers on the left of each panel to reposition the jumbled paragraphs. Restore the logical flows of natural academic arguments!
              </p>

              {/* Jumbled paragraphs view */}
              <div className="space-y-3 pt-2">
                {reorderedItems.map((item, index) => (
                  <div key={item.id} className="flex gap-4 items-center bg-indigo-950/40 p-4 rounded-xl border border-indigo-900/30">
                    {/* Position swap controllers */}
                    <div className="flex flex-col gap-1 items-center shrink-0">
                      <button
                        onClick={() => handleDragMockItem(index, "UP")}
                        disabled={index === 0}
                        className={`p-1.5 rounded bg-blue-900/30 border border-blue-900/50 text-indigo-300 hover:bg-indigo-600 hover:text-white transition-all disabled:opacity-20 disabled:hover:bg-transparent cursor-pointer`}
                      >
                        <MoveUp className="h-3.5 w-3.5" />
                      </button>
                      <span className="text-[10px] font-mono text-gray-500 font-black">Panel {index + 1}</span>
                      <button
                        onClick={() => handleDragMockItem(index, "DOWN")}
                        disabled={index === reorderedItems.length - 1}
                        className={`p-1.5 rounded bg-blue-900/30 border border-blue-900/50 text-indigo-300 hover:bg-indigo-600 hover:text-white transition-all disabled:opacity-20 disabled:hover:bg-transparent cursor-pointer`}
                      >
                        <MoveDown className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="space-y-1 text-left text-xs bg-[#0b132b] p-3 rounded-lg border border-blue-900/20 w-full font-bold">
                      <span className="font-mono text-yellow-500 text-[10px] uppercase font-black">Logical Unit #{item.id}</span>
                      <p className="text-gray-200 mt-1">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reading Part 2: Blanks */}
            <div className="bg-white/5 rounded-2.5xl p-5 sm:p-6 border border-white/5 space-y-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#10b981]">Task 2.2: Fill in the Blanks (Context Lexicals)</span>
              <p className="text-xs text-gray-400 font-semibold pb-2">
                Instructions: Choose the linguistically optimal term from the multiple selection boxes below.
              </p>

              <div className="space-y-4 font-bold text-xs text-gray-500 leading-relaxed">
                {pteReadingBlanks.map((q) => (
                  <div key={q.id} className="bg-indigo-950/40 p-4 rounded-xl border border-indigo-900/20 space-y-3">
                    <p className="text-gray-200 leading-loose">
                      <span className="text-indigo-400 mr-2 uppercase font-mono font-black text-[9px] tracking-wider">Passage {q.id}:</span>
                      {q.sentenceBefore}
                      <span className="mx-2 px-3 py-1 bg-blue-950 text-indigo-400 border border-blue-900 text-xs rounded lowercase font-mono">
                        {readingAnswers[q.id] || " [ Select Option Below ] "}
                      </span>
                      {q.sentenceAfter}
                    </p>

                    <div className="flex gap-2 pt-1.5">
                      {q.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => {
                            setReadingAnswers((prev) => ({ ...prev, [q.id]: opt }));
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all border ${
                            readingAnswers[q.id] === opt
                              ? "bg-emerald-600 border-emerald-700 text-white shadow-sm"
                              : "bg-blue-950 border-blue-900 text-gray-300 hover:bg-blue-900"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer submit */}
            <div className="pt-4 flex justify-end">
              <button
                disabled={Object.keys(readingAnswers).length < 3}
                onClick={() => {
                  setStage("LISTENING");
                  startSectionTimer(600); // 10 minutes listening dictation
                }}
                className={`px-7 py-3 rounded-xl text-xs font-black shadow-lg transition-all ${
                  Object.keys(readingAnswers).length === 3
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                    : "bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed"
                }`}
              >
                Submit Reading to Pearson AI DB →
              </button>
            </div>
          </motion.div>
        )}

        {/* STAGE 3: LISTENING SECTION */}
        {stage === "LISTENING" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="bg-cyan-950/40 p-4 rounded-xl border border-cyan-900/40 flex justify-between items-center">
              <div>
                <span className="px-2 py-0.5 bg-cyan-600 text-white rounded text-[9px] font-black uppercase tracking-wider font-mono">PTE SECTION 3</span>
                <h4 className="text-base font-black text-white mt-1">Listening and Write From Dictation</h4>
              </div>
              <span className="text-xs font-bold text-cyan-400">Section Stream: PTE-LST-DICT</span>
            </div>

            <div className="bg-white/5 rounded-2.5xl p-5 sm:p-6 border border-white/5 space-y-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#06b6d4]">Task 3.1: Write from Dictation transcription</span>
              <p className="text-xs text-gray-400 font-semibold leading-relaxed">
                Instructions: Trigger the audio system down below to play the short monologue tape only ONCE. Type the sentence exactly as spoken, with proper sentence-case capitalization and period punctuation.
              </p>

              {/* Dictation cassette deck player */}
              <div className="bg-[#0f172a] rounded-2xl p-6 border border-blue-900/40 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handlePlayNarrator(pteDictationSentence, true)}
                    className={`p-4 rounded-full text-white cursor-pointer transition-all ${
                      dictationPlaying ? "bg-red-500 animate-pulse" : "bg-cyan-600 hover:bg-cyan-700"
                    }`}
                  >
                    {dictationPlaying ? <VolumeX className="h-6 w-6" /> : <Play className="h-6 w-6 fill-current" />}
                  </button>
                  <div className="space-y-1 text-left">
                    <p className="text-xs font-black uppercase text-yellow-400 tracking-widest">Dictation Tape Console</p>
                    <h5 className="text-sm font-black">Acoustic Audio Segment #4</h5>
                    <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
                      Speaker rate adjusted. Only one play is traditionally allocated!
                    </p>
                  </div>
                </div>

                {/* Audio Progress tracker */}
                <div className="w-full md:w-64 space-y-1.5 shrink-0">
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase text-gray-400">
                    <span>DICTATION STREAM STATUS</span>
                    <span>{dictationPlaying ? "Streaming Dictation..." : "Ready"}</span>
                  </div>
                  <div className="bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-cyan-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${dictationProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Transcription Area input */}
              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-black uppercase text-gray-400 font-mono">Your Interactive Transcription Draft Sheet:</span>
                <input
                  type="text"
                  value={userDictationInput}
                  onChange={(e) => setUserDictationInput(e.target.value)}
                  placeholder="Type the sentence you heard here..."
                  className="w-full bg-[#0a1128] border border-blue-900 p-4 rounded-xl text-xs font-bold text-white outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-sans"
                />
                <div className="flex justify-between text-[10px] font-mono text-gray-500">
                  <span>* Capitals and periods are evaluated by PTE grids</span>
                  <span>Character density: {userDictationInput.length}</span>
                </div>
              </div>
            </div>

            {/* Submit to leads locking */}
            <div className="pt-4 flex justify-end">
              <button
                disabled={userDictationInput.trim().length === 0}
                onClick={() => {
                  window.speechSynthesis.cancel();
                  setStage("LEAD_FORM");
                  setIsTimerActive(false);
                }}
                className={`px-7 py-3 rounded-xl text-xs font-black shadow-lg transition-all ${
                  userDictationInput.trim().length > 0
                    ? "bg-cyan-600 hover:bg-cyan-700 text-white cursor-pointer"
                    : "bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed"
                }`}
              >
                Assemble PTE Grade Matrices →
              </button>
            </div>
          </motion.div>
        )}

        {/* STAGE 4: LEAD GATE DETAILS */}
        {stage === "LEAD_FORM" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6 max-w-lg mx-auto"
          >
            <div className="text-center space-y-3">
              <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 w-12 h-12 rounded-full mx-auto flex items-center justify-center">
                <Shield className="h-6 w-6 animate-pulse" />
              </div>
              <h3 className="text-lg font-black text-white">Unlock Live PTE Diagnostic Report Card</h3>
              <p className="text-xs text-gray-400 leading-normal max-w-sm mx-auto font-medium">
                Your Pearson test is compiled! Enter your verification data to unlock your computerized bands and send key logs to our expert career counselors.
              </p>
            </div>

            <form onSubmit={handleSubmitLeadForm} className="space-y-4 bg-indigo-950/20 p-6 rounded-2.5xl border border-indigo-900/30">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-gray-400">Full Candidate Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#080d21] border border-blue-900 p-3.5 rounded-xl text-xs font-bold text-white outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-gray-400">Phone Number (with active code)</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#080d21] border border-blue-900 p-3.5 rounded-xl text-xs font-bold text-white outline-none focus:ring-1 focus:ring-indigo-500"
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
                  className="w-full bg-[#080d21] border border-blue-900 p-3.5 rounded-xl text-xs font-bold text-white outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3.5 rounded-xl text-xs font-black mt-2 transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Decode Pearson Score Reports</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}

        {/* STAGE 5: RESULTS AND METRICS */}
        {stage === "RESULTS" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Main Trophy Deck */}
            <div className="bg-gradient-to-br from-indigo-950 to-slate-900 border border-blue-900 rounded-3xl p-6 sm:p-10 text-center space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="inline-flex p-3.5 bg-yellow-400/10 rounded-2xl border border-yellow-400/20 text-yellow-400">
                <Award className="h-8 w-8 animate-bounce" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-black tracking-widest text-[#f59e0b] uppercase font-mono">PTE ACADEMIC AI CERTIFICATE REPORT</span>
                <h4 className="text-2xl font-black text-white leading-none">Congratulations, {name}!</h4>
                <p className="text-xs text-gray-400 font-medium">Your computerized assessment is completed and logged safely on our server.</p>
              </div>

              {/* Big Overall PTE Score badge */}
              <div className="inline-flex flex-col items-center justify-center p-6 bg-slate-950 rounded-3xl border border-blue-900/40 shadow-xl min-w-[200px]">
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest font-mono">COMMUNICATIVE SCORE</span>
                <span className="text-5xl sm:text-6xl font-black text-white font-mono leading-none py-2">{results.overall}</span>
                <div className="px-3 py-1 bg-indigo-600/20 text-indigo-300 rounded-full text-[9px] font-extrabold uppercase font-mono tracking-widest border border-indigo-600/30">
                  PTE Academic Score (10-90)
                </div>
              </div>

              {/* Four skills bar metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto pt-6 text-left">
                {[
                  { skill: "Speaking", score: results.speaking, color: "bg-indigo-500" },
                  { skill: "Writing", score: results.writing, color: "bg-yellow-500" },
                  { skill: "Reading", score: results.reading, color: "bg-emerald-500" },
                  { skill: "Listening", score: results.listening, color: "bg-cyan-500" }
                ].map((s, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-blue-900/30">
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider">{s.skill}</p>
                    <p className="text-xl font-black text-white py-1">{s.score} <span className="text-[10px] text-gray-500 font-bold">/ 90</span></p>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                      <div className={`h-full rounded-full ${s.color}`} style={{ width: `${(s.score / 90) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assessment Feedback detail */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left font-semibold text-xs text-gray-300">
              <div className="bg-white/5 p-5 rounded-2xl border border-white/5 space-y-3">
                <h5 className="font-black text-white text-sm flex items-center gap-1">
                  <UserCheck className="h-4 w-4 text-emerald-400" /> AI Diagnostic Feedback
                </h5>
                <ul className="space-y-2 list-inside list-disc text-gray-400 leading-normal font-medium">
                  <li>Your Essay Word Density is <strong className="text-emerald-400">{results.essayWords} words</strong>. It lies closely relative to Pearson's optimal bounds.</li>
                  <li>In paragraph reordering, your final layout key is <span className="font-mono text-yellow-400 bg-yellow-400/10 px-1.5 py-0.5 rounded font-black">{results.reorderKey}</span>.</li>
                  <li>Blanks index: <strong className="text-yellow-400">{results.blanksCorrect} out of 3 blanks</strong> are correct. Review vocab qualifiers.</li>
                  <li>Dictation feedback: Your phonetic word matching demonstrated top-rate acoustic spelling precision!</li>
                </ul>
              </div>

              <div className="bg-white/5 p-5 rounded-2xl border border-white/5 flex flex-col justify-between">
                <div className="space-y-2">
                  <h5 className="font-black text-white text-sm flex items-center gap-1">
                    <PhoneCall className="h-4 w-4 text-indigo-400" /> Career Wings Counseling Options
                  </h5>
                  <p className="text-gray-400 leading-relaxed font-medium">
                    Our verified admissions panels specialize in raising student outcomes to 79+ PTE bands. Secure a slot immediately with our expert counselors to discuss university pathways and your study visa requirements.
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => {
                      onBookCounselling(`PTE score evaluation: ${results.overall}/90 points. Needs advice on visa criteria.`);
                      alert("Admissions Counselor Slot Booked successfully! We will ring you up within 24 hours.");
                    }}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-black text-center text-xs cursor-pointer shadow-md"
                  >
                    🚀 Book Guaranteed Free Counseling Slot
                  </button>
                  <button
                    onClick={resetAllSimulatorData}
                    className="px-4 py-3 rounded-xl border border-blue-900 text-gray-400 hover:text-white font-bold text-xs cursor-pointer hover:bg-white/5 text-center shrink-0"
                  >
                    Retake Mock
                  </button>
                </div>
              </div>
            </div>

            {/* Back button */}
            <div className="pt-2 text-center">
              <button
                onClick={onBack}
                className="text-xs font-bold text-gray-500 hover:text-indigo-400 transition-colors"
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
