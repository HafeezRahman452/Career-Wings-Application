import React, { useState } from "react";
import { STORIES } from "../data/mockData";
import { Story } from "../types";
import { Play, Quote, X, Calendar, Flag, Award, Milestone, Volume2 } from "lucide-react";

export default function StudentStories() {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  return (
    <>
      <section className="bg-[#FAF7F2] dark:bg-slate-950 text-gray-900 dark:text-slate-100 py-16 md:py-24 overflow-hidden transition-colors">
        <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="text-orange-600 font-extrabold tracking-widest text-xs uppercase block">STUDENT SUCCESS PORTFOLIO</span>
            <h2 className="text-3xl md:text-5xl font-black leading-tight text-gray-950">Hear From Scholars Succeeding Globally</h2>
            <div className="w-16 h-1 bg-orange-500 rounded-full" />
            <p className="text-gray-650 text-sm md:text-base leading-relaxed font-medium">
              Read and listen to genuine experiences of students who transformed their global career aspirations into realities with Career Wings' guidance. Our community network spans over 120 global cities.
            </p>
          </div>
        </div>

        {/* Testimonial Cards Spritesheet crop emulation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
          {STORIES.map((story) => (
            <div 
              key={story.id}
              onClick={() => setSelectedStory(story)}
              className="relative aspect-[3/4.2] rounded-3xl overflow-hidden group cursor-pointer border border-gray-200 hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 transform hover:-translate-y-2 bg-white"
            >
              {/* Emulator of the original profile sprite containing individual students cropped from the combined image block */}
              <div className="absolute inset-0 w-full h-full">
                <img 
                  alt={story.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHp5KQ50_u2MJ6AWhgBPfNPL3DTd-5KdkrN7nqHMUZU2YLx-013besRSs1snsayu9y_nsp0Wcyr-4od4GIh76KOZnm07ixVLSGzwKAh7sbbWHx_45BLR5GWKu6CQpEUzG2QAb-ur0gtbnJVVeW4xSMVx0fnNthYHlnnzWeS63Muf6lYfDviZWIIZo9XQhtKS7sLuqyjq45k9Wotd5vCwCmF2bHtpwXlAhtnBhTjEVYXy9wdDgla29hmrZTXWDNOvZhdObgAHNUgc4o" 
                  style={{
                    objectPosition: story.photoPosition,
                  }}
                />
              </div>

              {/* High precision color gradient to assure text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent" />
              
              {/* Media Duration Badge */}
              <div className="absolute top-4 right-4 bg-gray-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[9px] text-white font-black tracking-wide border border-white/10 flex items-center gap-1">
                <Volume2 className="h-3 w-3 text-orange-500" />
                {story.durationString} MIN
              </div>

              {/* Hover Playing overlay icon */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-14 h-14 bg-white/15 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:bg-orange-600 group-hover:border-orange-500 group-hover:scale-110 group-hover:text-white transition-all shadow-lg text-slate-100">
                  <Play className="h-6 w-6 ml-1 stroke-[2.5]" />
                </div>
              </div>

              {/* Bottom Metadata descriptions */}
              <div className="absolute bottom-0 left-0 right-0 p-5 space-y-2">
                <div className="flex items-center gap-1.5 text-[9px] font-black uppercase text-orange-400 tracking-widest">
                  <Flag className="h-3 w-3 shrink-0" />
                  <span>Study in {story.destination}</span>
                </div>
                <div>
                  <h4 className="text-base font-black text-white">{story.name}</h4>
                  <p className="text-[11px] text-gray-200 leading-normal line-clamp-2 mt-1 font-medium">
                    "{story.quote}"
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-[#EBF2F7] dark:bg-slate-900 border-t border-b border-blue-100/20 dark:border-slate-800 text-gray-900 dark:text-slate-100 py-16 md:py-24 overflow-hidden transition-colors">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Brand-new 3 Interactive Video Placement and Guide Hub */}
        <div className="space-y-8">
          <div className="max-w-xl space-y-2">
            <span className="text-[#0047AB] font-extrabold tracking-widest text-[11px] uppercase block">SUCCESS DIARIES & LIVE MOCKS</span>
            <h3 className="text-2xl md:text-3xl font-black text-gray-950 dark:text-white">Featured Scholar Video Briefings</h3>
            <p className="text-xs text-gray-500 dark:text-slate-400 font-semibold">Watch actual success diaries, preparation breakdowns, and pre-departure briefing insights.</p>
          </div>

          <div id="student-success-videos-grid" className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                id: "v1",
                title: "How I Secured 100% Scholarship in Europe",
                student: "Aliza Khan, Masters in Computer Science",
                embedUrl: "https://www.youtube.com/embed/w7Wz9Xm_p2k",
                duration: "12:15 mins",
                desc: "An elaborate analysis of writing perfect SOPs, IELTS waiver checklists, and direct tuition fee exemptions."
              },
              {
                id: "v2",
                title: "Ultimate Guide to Schengen National Visas",
                student: "Rohit Patel, MSc in Cyber Security",
                embedUrl: "https://www.youtube.com/embed/F6k_wNOfEAI",
                duration: "8:40 mins",
                desc: "Step-by-step documentation hacks regarding block bank options, biometric appointment queues, and interview simulation."
              },
              {
                id: "v3",
                title: "Pre-Departure Checklist & Safe Transit Landing",
                student: "Marcus Gabriel, Bachelor of Global Business",
                embedUrl: "https://www.youtube.com/embed/k92O4bX_8Xk",
                duration: "10:30 mins",
                desc: "Useful tips about low-cost currency exchanges, public transit concessions, and student housing lease contracts."
              }
            ].map((video) => (
              <div 
                key={video.id}
                className="bg-white dark:bg-slate-950 rounded-3xl border border-gray-150 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-md hover:border-blue-300 transition-all group flex flex-col justify-between"
              >
                <div className="aspect-video w-full bg-slate-900 relative">
                  <iframe
                    title={video.title}
                    src={video.embedUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between text-[10px] font-extrabold text-orange-600 uppercase">
                    <span>{video.student}</span>
                    <span className="bg-orange-50 dark:bg-orange-950/60 text-orange-700 dark:text-orange-400 px-2 py-0.5 rounded-md text-[9px] shrink-0 font-black">{video.duration}</span>
                  </div>
                  <h4 className="font-extrabold text-sm text-gray-950 dark:text-white leading-snug group-hover:text-[#0047AB] dark:group-hover:text-blue-400 transition-colors">{video.title}</h4>
                  <p className="text-[11px] text-gray-500 dark:text-slate-400 font-semibold leading-relaxed">{video.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Video emulator lightbox MODAL popup details */}
    {selectedStory && (
      <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
            {/* Backdrop */}
            <div 
              onClick={() => setSelectedStory(null)} 
              className="fixed inset-0 bg-gray-950/75 backdrop-blur-md transition-opacity" 
            />

            <div className="flex min-h-full items-center justify-center p-3 sm:p-4">
              <div className="relative transform rounded-3xl bg-white dark:bg-slate-900 text-gray-900 dark:text-white shadow-2xl transition-all w-full max-w-2xl border border-gray-100 dark:border-slate-800 max-h-[90vh] overflow-y-auto animate-slide-up">
                
                {/* Content block */}
                <div className="grid grid-cols-1 sm:grid-cols-12">
                  
                  {/* Photo Profile segment */}
                  <div className="sm:col-span-5 h-56 sm:h-auto relative bg-slate-100">
                    <img 
                      alt={selectedStory.name} 
                      className="w-full h-full object-cover" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHp5KQ50_u2MJ6AWhgBPfNPL3DTd-5KdkrN7nqHMUZU2YLx-013besRSs1snsayu9y_nsp0Wcyr-4od4GIh76KOZnm07ixVLSGzwKAh7sbbWHx_45BLR5GWKu6CQpEUzG2QAb-ur0gtbnJVVeW4xSMVx0fnNthYHlnnzWeS63Muf6lYfDviZWIIZo9XQhtKS7sLuqyjq45k9Wotd5vCwCmF2bHtpwXlAhtnBhTjEVYXy9wdDgla29hmrZTXWDNOvZhdObgAHNUgc4o" 
                      style={{
                        objectPosition: selectedStory.photoPosition,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-white/20 via-transparent to-transparent" />
                    
                    {/* Live playing simulated indicator */}
                    <div className="absolute bottom-4 left-4 bg-red-650 text-white px-2 py-0.5 rounded text-[8px] font-black tracking-widest uppercase flex items-center gap-1">
                      <span className="h-1.5 w-1.5 bg-white rounded-full animate-ping" />
                      SIMULATED INTERVIEW
                    </div>
                  </div>

                  {/* Verbal details */}
                  <div className="sm:col-span-7 p-6 sm:p-8 space-y-6 relative">
                    <button
                      onClick={() => setSelectedStory(null)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
                    >
                      <X className="h-4.5 w-4.5" />
                    </button>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-xs text-orange-600 font-bold uppercase tracking-wider">
                        <Flag className="h-4 w-4" />
                        <span>Placed in {selectedStory.destination}</span>
                      </div>
                      
                      <div className="space-y-1">
                        <h3 className="text-xl font-black text-gray-950">{selectedStory.name}</h3>
                        <p className="text-xs text-gray-500 font-semibold flex items-center gap-1.5">
                          <Award className="h-3.5 w-3.5 text-amber-500" /> CWC Verified Scholar
                        </p>
                      </div>

                      {/* Quote */}
                      <div className="relative pl-6 border-l-2 border-orange-500 italic text-sm text-gray-650">
                        <Quote className="absolute left-0 -top-2.5 h-5 w-5 text-orange-500/20 transform -scale-x-100" />
                        "{selectedStory.quote}"
                      </div>

                      {/* Detail story */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                          <Milestone className="h-3.5 w-3.5 text-orange-500" />
                          My Application Experience
                        </h4>
                        <p className="text-xs text-gray-600 leading-relaxed font-semibold">
                          {selectedStory.detailedExperience}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex justify-end gap-2.5">
                      <button
                        onClick={() => setSelectedStory(null)}
                        className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                      >
                        Keep Browsing
                      </button>
                    </div>

                  </div>

                </div>

              </div>
            </div>

          </div>
        )}

    </>
  );
}
