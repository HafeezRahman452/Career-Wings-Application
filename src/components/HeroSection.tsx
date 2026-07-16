import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  ArrowRight, 
  Award, 
  GraduationCap, 
  Building2, 
  HelpCircle, 
  ChevronLeft, 
  ChevronRight, 
  Plane 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeroSectionProps {
  onOpenCounselling: () => void;
  onExploreCourses: () => void;
}

export default function HeroSection({ onOpenCounselling, onExploreCourses }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const SLIDES = [
    {
      id: 0,
      badgeText: "Career Wings Consultants - Study Abroad Consultants & Best Visa Agency",
      badgeIcon: <GraduationCap className="h-4 w-4 text-amber-400" />,
      titlePrefix: "Career Wings Consultants",
      titleHighlight: "Study Abroad",
      titleSuffix: "Admissions & Best Visa Agency",
      description: "Get elite global admission guidance with Career Wings Consultants, the premier Study Abroad Consultants and the Best Visa Agency. Secure admissions in highest QS-ranked universities with complete scholarship and visa guidance.",
      imageSrc: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1600",
      primaryLabel: "Free appointment",
      secondaryLabel: "Explore Courses",
      onPrimaryClick: onOpenCounselling,
      onSecondaryClick: onExploreCourses,
      bgGradient: "bg-gradient-to-tr from-[#0047AB]/5 via-sky-500/5 to-white dark:from-[#0047AB]/10 dark:via-sky-950/20 dark:to-slate-950"
    },
    {
      id: 1,
      badgeText: "CWC - Authorized Study Abroad Consultants",
      badgeIcon: <Building2 className="h-4 w-4 text-orange-400" />,
      titlePrefix: "Top Study Abroad Consultants",
      titleHighlight: "Work Visas",
      titleSuffix: "With The Best Visa Agency",
      description: "Accelerate your professional growth in the UK, USA, Australia, or Canada with Career Wings Consultants. Your trusted Study Abroad Consultants and Best Visa Agency for express entry and sponsorships.",
      imageSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1600",
      primaryLabel: "Check Status Now",
      secondaryLabel: "Consult Expert",
      onPrimaryClick: onOpenCounselling,
      onSecondaryClick: onExploreCourses,
      bgGradient: "bg-gradient-to-tr from-orange-500/5 via-amber-400/5 to-white dark:from-orange-950/15 dark:via-amber-950/10 dark:to-slate-950"
    },
    {
      id: 2,
      badgeText: "Career Wings Consultants - Best Visa Agency",
      badgeIcon: <Plane className="h-4 w-4 text-emerald-400" />,
      titlePrefix: "Career Wings Consultants",
      titleHighlight: "Global Visas",
      titleSuffix: "- Study Abroad Consultants",
      description: "Planning a family reunion, holiday, or partner visa? Rely on Career Wings Consultants. As premier Study Abroad Consultants and the Best Visa Agency, we ensure 100% accurate file preparation and mock interviews.",
      imageSrc: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=1600",
      primaryLabel: "Book Tourist Visa Consultation",
      secondaryLabel: "Explore Packages",
      onPrimaryClick: onOpenCounselling,
      onSecondaryClick: onExploreCourses,
      bgGradient: "bg-gradient-to-tr from-emerald-500/5 via-teal-400/5 to-white dark:from-emerald-950/15 dark:via-teal-950/10 dark:to-slate-950"
    },
    {
      id: 3,
      badgeText: "Learn From Top Study Abroad Consultants",
      badgeIcon: <Award className="h-4 w-4 text-blue-400" />,
      titlePrefix: "IELTS & Test Prep",
      titleHighlight: "Career Wings",
      titleSuffix: "- Study Abroad Consultants & Visa Agency",
      description: "Learn with Career Wings Consultants. Connect with top Study Abroad Consultants and the Best Visa Agency for comprehensive preparation: IELTS 7.5+, GRE, and PTE coaching classes.",
      imageSrc: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1600",
      primaryLabel: "Explore Prep Batches",
      secondaryLabel: "Consult Trainer",
      onPrimaryClick: onOpenCounselling,
      onSecondaryClick: onExploreCourses,
      bgGradient: "bg-gradient-to-tr from-indigo-500/5 via-purple-500/5 to-white dark:from-indigo-950/15 dark:via-purple-950/10 dark:to-slate-950"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6500); // Autoplay cycle increased by 1.5 seconds
    return () => clearInterval(interval);
  }, [currentSlide]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const activeSlide = SLIDES[currentSlide];

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.05 } 
    },
    exit: { 
      opacity: 0,
      transition: { staggerChildren: 0.04, staggerDirection: -1 } 
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 120, damping: 18 } 
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      transition: { duration: 0.15 } 
    }
  };

  return (
    <div className="relative pt-0 pb-16 md:pb-24 transition-colors bg-[#FAF8F3] dark:bg-slate-950">
      
      {/* Full-bleed majestic slider container */}
      <div className="relative w-full h-[580px] sm:h-[660px] lg:h-[720px] overflow-hidden flex items-center bg-slate-900 border-b border-gray-200/20 dark:border-slate-800">
        
        {/* Animated Background Slide Images */}
        <div className="absolute inset-0 z-0 select-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.85, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <img 
                alt={`${activeSlide.badgeText} - Career Wings Consultants, top Study Abroad Consultants and the Best Visa Agency`}
                title={`${activeSlide.badgeText} - Career Wings Consultants - Study Abroad Consultants - Best Visa Agency`}
                className="w-full h-full object-cover select-none pointer-events-none" 
                src={activeSlide.imageSrc} 
                referrerPolicy="no-referrer"
              />
              
              {/* Dark sophisticated overlay for excellent contrast and high readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/30 lg:from-black/90 lg:via-black/60 lg:to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Content wrapper - fits in standard container layout */}
        <div className="absolute inset-0 z-10 w-full">
          {/* Side Chevron Left Navigation Button */}
          <div className="absolute left-2 sm:left-4 md:left-6 inset-y-0 z-30 flex items-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="p-2 sm:p-3 md:p-4 rounded-full bg-black/45 hover:bg-black/70 border border-white/15 hover:border-white/40 text-slate-200 hover:text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-black/30 cursor-pointer flex items-center justify-center focus:outline-none"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>

          {/* Side Chevron Right Navigation Button */}
          <div className="absolute right-2 sm:right-4 md:right-6 inset-y-0 z-30 flex items-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="p-2 sm:p-3 md:p-4 rounded-full bg-black/45 hover:bg-black/70 border border-white/15 hover:border-white/40 text-slate-200 hover:text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-black/30 cursor-pointer flex items-center justify-center focus:outline-none"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>

          <div className="container mx-auto px-6 sm:px-12 md:px-16 h-full flex flex-col justify-center max-w-7xl relative">
            
            {/* Main content positioning */}
            <div className="max-w-2xl sm:max-w-3xl space-y-4 sm:space-y-6 pt-6 sm:pt-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  variants={containerVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-4 sm:space-y-6"
                >
                  {/* Micro premium badge representation */}
                  <motion.div 
                    variants={itemVariants}
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-blue-300 dark:text-blue-400 font-extrabold text-2xs tracking-wider uppercase shadow-sm transition-all hover:scale-[1.02] duration-300 cursor-pointer max-w-full"
                  >
                    {activeSlide.badgeIcon}
                    <span className="text-white font-semibold tracking-wide ml-1 truncate max-w-[280px] sm:max-w-md">{activeSlide.badgeText}</span>
                  </motion.div>

                  {/* Main Heading scaled with gorgeous gradients - carefully optimized for line spacing & viewport fit */}
                  <motion.h1 
                    variants={itemVariants}
                    className="text-3xl sm:text-5xl lg:text-5.5xl xl:text-6.5xl font-black text-white leading-[1.12] sm:leading-tight lg:leading-none tracking-tight font-sans filter drop-shadow-md"
                  >
                    {activeSlide.titlePrefix}<br />
                    <span className="bg-gradient-to-r from-blue-300 via-blue-200 to-cyan-300 bg-clip-text text-transparent pb-1 relative inline-block">
                      {activeSlide.titleHighlight}
                      <span className="absolute bottom-0 left-0 w-full h-[4px] bg-blue-500/30 rounded-full" />
                    </span>{" "}
                    {activeSlide.titleSuffix}
                  </motion.h1>

                  {/* Multitone ornamental divider */}
                  <motion.div 
                    variants={itemVariants} 
                    className="flex items-center justify-start gap-1 w-full"
                  >
                    <div className="w-12 h-1 bg-blue-500 rounded-full" />
                    <div className="w-3 h-1 bg-orange-400 rounded-full" />
                    <div className="w-1.5 h-1 bg-white/40 rounded-full" />
                  </motion.div>

                  {/* Optimized description block with strong reading weight & safe font sizes */}
                  <motion.p 
                    variants={itemVariants}
                    className="text-xs sm:text-base md:text-lg text-slate-200/95 max-w-2xl leading-relaxed font-normal filter drop-shadow-sm"
                  >
                    {activeSlide.description}
                  </motion.p>

                  {/* High quality responsive call-to-actions */}
                  <motion.div 
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row items-center justify-start gap-3 w-full pt-1 sm:pt-2"
                  >
                    <button
                      onClick={activeSlide.onPrimaryClick}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0047AB] to-blue-600 border border-blue-500/20 text-white px-7 py-3.5 rounded-xl font-extrabold text-sm sm:text-base hover:from-blue-700 hover:to-blue-500 hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer shrink-0"
                    >
                      <span>{activeSlide.primaryLabel}</span>
                      <ArrowRight className="h-4.5 w-4.5" />
                    </button>
                    <button
                      onClick={activeSlide.onSecondaryClick}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:text-white hover:bg-white/10 text-slate-100 bg-white/5 backdrop-blur-md px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-sm"
                    >
                      <span>{activeSlide.secondaryLabel}</span>
                    </button>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Float-styled glass slider nav controller positioned on the bottom right of the banner area */}
            <div className="absolute bottom-6 right-4 sm:right-8 md:right-12 lg:right-16 z-20 flex items-center gap-3 bg-black/40 border border-white/10 backdrop-blur-lg px-4 py-2.5 rounded-full shadow-lg select-none">
              <button
                onClick={handlePrev}
                className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              <div className="flex gap-1.5 items-center">
                {SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-350 cursor-pointer ${
                      currentSlide === idx 
                        ? "w-6 bg-blue-400" 
                        : "w-2 bg-white/20 hover:bg-white/55"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Floating Statistics card on bottom frame aligned in a max-7xl container */}
      <div className="container mx-auto px-4 relative z-20 -mt-16 sm:-mt-20 max-w-7xl">
        <div id="statistics-card" className="bg-[#0047AB] rounded-[35px] shadow-xl border-b-4 border-blue-900 p-8 md:p-10 transition-colors text-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            
            {/* Stat 1 */}
            <div className="flex flex-col items-center text-center p-4 sm:p-0">
              <div className="bg-white/10 p-3 rounded-2xl mb-4 text-amber-300">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-1">11,000+</h3>
              <p className="text-xs text-blue-100 font-semibold tracking-wide">Scholarships Awarded<br />Through CWC Annually</p>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center text-center p-4 sm:p-0 pt-8 sm:pt-0">
              <div className="bg-white/10 p-3 rounded-2xl mb-4 text-amber-300">
                <GraduationCap className="h-8 w-8" />
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-1">250,000+</h3>
              <p className="text-xs text-blue-100 font-semibold tracking-wide">Students Successfully Guided<br />to Study Abroad</p>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center text-center p-4 sm:p-0 pt-8 sm:pt-0">
              <div className="bg-white/10 p-3 rounded-2xl mb-4 text-amber-300">
                <Building2 className="h-8 w-8" />
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-1">800+</h3>
              <p className="text-xs text-blue-100 font-semibold tracking-wide">Top University &amp;<br />Institution Partners</p>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center text-center p-4 sm:p-0 pt-8 sm:pt-0">
              <div className="bg-white/10 p-3 rounded-2xl mb-4 text-amber-300">
                <HelpCircle className="h-8 w-8" />
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-1">FREE</h3>
              <p className="text-xs text-blue-100 font-semibold tracking-wide">Consulting Services for<br />Students &amp; Parents</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
