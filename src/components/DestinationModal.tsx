import React from "react";
import { Destination } from "../types";
import { X, Check, Award, DollarSign, Languages, GraduationCap, Building2, Calendar, ArrowRight, ShieldCheck } from "lucide-react";

interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
  onBookCounselling: (destinationName: string) => void;
}

export default function DestinationModal({
  destination,
  onClose,
  onBookCounselling,
}: DestinationModalProps) {
  if (!destination) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      {/* Background Overlay */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity" 
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6">
        {/* Modal Panel */}
        <div className="relative transform overflow-hidden rounded-3xl bg-white dark:bg-slate-900 text-left shadow-2xl transition-all sm:my-8 w-full max-w-4xl border border-gray-100 dark:border-slate-800 animate-slide-up">
          
          {/* Header Backdrop */}
          <div className="relative h-60 sm:h-72 overflow-hidden bg-slate-100">
            <img 
              alt={destination.name} 
              className="w-full h-full object-cover" 
              src={destination.bgImage} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-black/60 hover:bg-black/90 backdrop-blur-md text-white p-2.5 rounded-full shadow-lg transition-colors cursor-pointer"
              aria-label="Close panel"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Country Flag and Quick Stats */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
              <div className="flex items-center gap-4">
                <img 
                  alt={`${destination.name} Flag`} 
                  className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-lg" 
                  src={destination.flagImage} 
                />
                <div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{destination.name}</h3>
                  <p className="text-blue-300 text-xs sm:text-sm font-semibold tracking-wide">Popular Study Hub</p>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-8 max-h-[60vh] overflow-y-auto">
            
            {/* Intro and Quick Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              <div className="md:col-span-2 space-y-3">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Why Select {destination.name}?</h4>
                <p className="text-gray-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                  {destination.description}
                </p>
              </div>

              {/* Core Index Cards */}
              <div className="bg-blue-50/50 dark:bg-slate-800/50 rounded-2xl p-4 border border-blue-100/50 dark:border-slate-700/50 space-y-3.5 flex flex-col justify-center">
                <div className="flex items-center gap-3 text-xs">
                  <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg text-[#0047AB] dark:text-blue-400 shrink-0">
                    <DollarSign className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-gray-400 dark:text-slate-400 font-medium">Cost of Living</p>
                    <p className="font-bold text-gray-800 dark:text-slate-200">{destination.averageCostOfLiving}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-lg text-green-600 dark:text-green-400 shrink-0">
                    <Languages className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-gray-400 dark:text-slate-400 font-medium">English Benchmarks</p>
                    <p className="font-bold text-gray-800 dark:text-slate-200">{destination.ieltsRequirement}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Benefits */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
                Key Student Benefits &amp; Work Permits
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {destination.benefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className="flex gap-3 bg-slate-50 dark:bg-slate-800/30 p-4 rounded-xl border border-slate-100 dark:border-slate-800"
                  >
                    <div className="bg-emerald-500 text-white rounded-full p-1 h-5 w-5 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </div>
                    <span className="text-xs sm:text-sm text-gray-600 dark:text-slate-300 leading-relaxed font-medium">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Partner Universities */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-[#0047AB] dark:text-blue-400" />
                Featured Partner Universities &amp; Costs
              </h4>
              <div className="border border-gray-100 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-slate-800 border-b border-gray-100 dark:border-slate-700 text-gray-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                        <th className="py-3.5 px-4 font-bold">University &amp; General Rank</th>
                        <th className="py-3.5 px-4 font-bold">Featured Subjects</th>
                        <th className="py-3.5 px-4 font-bold">Est Tuition Fee</th>
                        <th className="py-3.5 px-4 font-bold">Scholarship support</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                      {destination.popularUniversities.map((uni) => (
                        <tr key={uni.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 text-gray-700 dark:text-slate-300 transition-colors">
                          <td className="py-4 px-4 font-semibold text-gray-900 dark:text-slate-200">
                            <div>{uni.name}</div>
                            <div className="text-[10px] text-blue-600 dark:text-blue-400 mt-1 flex items-center gap-1">
                              <Award className="h-3 w-3" /> QS Global Rank #{uni.ranking}
                            </div>
                          </td>
                          <td className="py-4 px-4 font-medium text-gray-500 dark:text-slate-400">
                            <span className="flex items-center gap-1">
                              <Building2 className="h-3 w-3 inline text-slate-400" /> {uni.featuredCourse}
                            </span>
                          </td>
                          <td className="py-4 px-4 font-bold text-[#0047AB] dark:text-blue-400">{uni.tuitionFee}</td>
                          <td className="py-4 px-4">
                            <span className="bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 font-extrabold px-2.5 py-1 rounded text-xs">
                              {uni.scholarshipAvailable}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>

          {/* Footer Navigation Action bar */}
          <div className="bg-slate-50 dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 px-6 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-400 dark:text-slate-400 text-center sm:text-left">
              * Applications to study in {destination.name} are currently open for 2026 inlets.
            </p>
            <div className="flex gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="w-1/2 sm:w-auto text-xs font-semibold px-5 py-3 rounded-xl border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 dark:text-slate-300"
              >
                Go Back
              </button>
              <button
                onClick={() => {
                  onClose();
                  onBookCounselling(destination.name);
                }}
                className="w-1/2 sm:w-auto bg-[#0047AB] dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5"
              >
                Counselling for {destination.name}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
