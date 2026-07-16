import React, { useState, useMemo } from "react";
import { COURSES } from "../data/mockData";
import { Course } from "../types";
import { Search, MapPin, DollarSign, Clock, Heart, HelpCircle, Sparkles, Filter, ChevronDown, CheckCircle } from "lucide-react";

interface CourseSearchProps {
  savedCourseIds: string[];
  toggleSaveCourse: (courseId: string) => void;
  openCounsellingWithDetails: (courseName: string, country: string) => void;
}

export default function CourseSearch({
  savedCourseIds,
  toggleSaveCourse,
  openCounsellingWithDetails,
}: CourseSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [feeBracket, setFeeBracket] = useState("All");
  const [sortBy, setSortBy] = useState("relevance");

  // Filter and sort options
  const countries = useMemo(() => ["All", ...Array.from(new Set(COURSES.map((c) => c.country)))], []);
  const levels = useMemo(() => ["All", ...Array.from(new Set(COURSES.map((c) => c.level)))], []);
  const subjects = useMemo(() => ["All", ...Array.from(new Set(COURSES.map((c) => c.subjectArea)))], []);

  const filteredCourses = useMemo(() => {
    let result = COURSES.filter((course) => {
      const matchesSearch =
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.subjectArea.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCountry = selectedCountry === "All" || course.country === selectedCountry;
      const matchesLevel = selectedLevel === "All" || course.level === selectedLevel;
      const matchesSubject = selectedSubject === "All" || course.subjectArea === selectedSubject;

      let matchesFee = true;
      if (feeBracket === "under15k") matchesFee = course.estimatedFee < 15000;
      else if (feeBracket === "15k30k") matchesFee = course.estimatedFee >= 15000 && course.estimatedFee <= 30000;
      else if (feeBracket === "over30k") matchesFee = course.estimatedFee > 30000;

      return matchesSearch && matchesCountry && matchesLevel && matchesSubject && matchesFee;
    });

    if (sortBy === "feeLowToHigh") {
      result.sort((a, b) => a.estimatedFee - b.estimatedFee);
    } else if (sortBy === "feeHighToLow") {
      result.sort((a, b) => b.estimatedFee - a.estimatedFee);
    }

    return result;
  }, [searchTerm, selectedCountry, selectedLevel, selectedSubject, feeBracket, sortBy]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCountry("All");
    setSelectedLevel("All");
    setSelectedSubject("All");
    setFeeBracket("All");
    setSortBy("relevance");
  };

  return (
    <div className="py-10 bg-white dark:bg-slate-950 transition-colors min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl space-y-10">
        
        {/* Header Segment */}
        <div className="text-center space-y-3">
          <span className="text-[#0047AB] dark:text-blue-400 font-extrabold tracking-widest text-xs uppercase block">COURSE FINDER</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-950 dark:text-white">
            Discover Your Perfect <span className="text-blue-600 dark:text-blue-400">Academic Major</span>
          </h2>
          <p className="text-gray-500 dark:text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Search and filter through hundreds of accredited courses in top study countries. Shortlist requirements, view active scholarships, and talk directly to specialist advisors.
          </p>
        </div>

        {/* Filter and Search Bar Section */}
        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-6 rounded-3xl shadow-sm space-y-6">
          
          {/* Main search input and sort option */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-3 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 h-5 w-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by course topic, specific degree, or university branch..."
                aria-label="Search study subjects"
                className="w-full bg-slate-50 border-none dark:bg-slate-950 text-gray-800 dark:text-white rounded-2xl py-3.5 pl-12 pr-4 shadow-inner text-sm focus:ring-2 focus:ring-[#0047AB]"
              />
            </div>
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort options"
                className="w-full bg-slate-50 dark:bg-slate-950 text-gray-800 dark:text-slate-200 border-none rounded-2xl py-3.5 px-4 text-sm focus:ring-2 focus:ring-[#0047AB]"
              >
                <option value="relevance">Sort by: Relevance</option>
                <option value="feeLowToHigh">Tuition: Low to High</option>
                <option value="feeHighToLow">Tuition: High to Low</option>
              </select>
            </div>
          </div>

          {/* Sub level segment filter combinations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
            
            {/* Country filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 dark:text-slate-500">Host Country</label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border-none rounded-xl py-2.5 px-3.5 text-xs text-gray-600 dark:text-slate-200 focus:ring-2 focus:ring-[#0047AB]"
              >
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c === "All" ? "All Countries" : c}
                  </option>
                ))}
              </select>
            </div>

            {/* Level filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 dark:text-slate-500">Degree Level</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border-none rounded-xl py-2.5 px-3.5 text-xs text-gray-600 dark:text-slate-200 focus:ring-2 focus:ring-[#0047AB]"
              >
                {levels.map((l) => (
                  <option key={l} value={l}>
                    {l === "All" ? "All Levels" : l}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject Area filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 dark:text-slate-500">Subject Area</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border-none rounded-xl py-2.5 px-3.5 text-xs text-gray-600 dark:text-slate-200 focus:ring-2 focus:ring-[#0047AB]"
              >
                {subjects.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub === "All" ? "All Subjects" : sub}
                  </option>
                ))}
              </select>
            </div>

            {/* Estimated Fees filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 dark:text-slate-500">Annual Tuition Limit</label>
              <select
                value={feeBracket}
                onChange={(e) => setFeeBracket(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border-none rounded-xl py-2.5 px-3.5 text-xs text-gray-600 dark:text-slate-200 focus:ring-2 focus:ring-[#0047AB]"
              >
                <option value="All">All Costs / Brackets</option>
                <option value="under15k">Under $15,000 USD / yr</option>
                <option value="15k30k">$15,000 - $30,000 USD / yr</option>
                <option value="over30k">Over $30,000 USD / yr</option>
              </select>
            </div>

          </div>

          {/* Quick Stats & Reset Trigger */}
          <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-gray-100 dark:border-slate-800 text-xs gap-4">
            <p className="text-gray-500 dark:text-slate-400 font-medium tracking-wide">
              Showing <strong className="text-gray-900 dark:text-white">{filteredCourses.length} matches</strong> based on your academic filters.
            </p>
            <div className="flex gap-3">
              {(searchTerm || selectedCountry !== "All" || selectedLevel !== "All" || selectedSubject !== "All" || feeBracket !== "All") && (
                <button
                  onClick={resetFilters}
                  className="text-[#0047AB] dark:text-blue-400 hover:underline font-bold transition-all"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Results grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const isSaved = savedCourseIds.includes(course.id);
              return (
                <div 
                  key={course.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm hover:shadow-lg border border-gray-100 dark:border-slate-850 flex flex-col justify-between hover:-translate-y-1.5 transition-all group"
                >
                  <div className="space-y-4">
                    {/* Header Card Metas */}
                    <div className="flex justify-between items-start gap-4">
                      <span className="bg-blue-50/70 dark:bg-slate-800 text-[#0047AB] dark:text-blue-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {course.subjectArea}
                      </span>
                      <button
                        onClick={() => toggleSaveCourse(course.id)}
                        className={`p-2 rounded-full cursor-pointer transition-colors ${
                          isSaved 
                            ? "bg-red-50 dark:bg-red-950/20 text-red-500" 
                            : "bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 text-gray-400 hover:text-red-500"
                        }`}
                        title={isSaved ? "Saved to Bookmarks" : "Save Course"}
                        aria-label="Save this course to bookmarks"
                      >
                        <Heart className={`h-4.5 w-4.5 ${isSaved ? "fill-current" : ""}`} />
                      </button>
                    </div>

                    {/* Course Title and University */}
                    <div className="space-y-1.5">
                      <h4 className="text-lg font-extrabold text-gray-900 dark:text-white leading-snug group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                        {course.name}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-slate-400 font-semibold">{course.university}</p>
                    </div>

                    {/* Specifications List */}
                    <div className="grid grid-cols-2 gap-3.5 pt-3 text-xs border-t border-gray-50 dark:border-slate-800/80">
                      <div className="flex items-center gap-1.5 text-gray-500 dark:text-slate-400">
                        <MapPin className="h-4 w-4 shrink-0 text-[#0047AB]" />
                        <span className="truncate">{course.country}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-500 dark:text-slate-400">
                        <Clock className="h-4 w-4 shrink-0 text-amber-500" />
                        <span>{course.duration} ({course.level})</span>
                      </div>
                    </div>

                    {/* Fee and Scholarship info */}
                    <div className="bg-[#F8FAFF] dark:bg-slate-950/60 p-4 rounded-2xl flex flex-col justify-center space-y-1 border border-blue-50/50 dark:border-slate-800/60">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Est. Tuition Fee / Year</span>
                        <span className="font-extrabold text-emerald-600 dark:text-emerald-400">Scholarship Option</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-extrabold text-gray-900 dark:text-slate-200">
                          ${course.estimatedFee.toLocaleString()} USD
                        </span>
                        <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                          {course.scholarshipOffer}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Operational Button */}
                  <div className="pt-6">
                    <button
                      onClick={() => openCounsellingWithDetails(course.name, course.country)}
                      className="w-full bg-[#0047AB] dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-50500 text-white font-bold py-2.5 rounded-full text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Consult on this Program</span>
                      <Sparkles className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 text-center py-16 px-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center space-y-4">
            <div className="bg-blue-50 dark:bg-slate-800 p-4 rounded-full text-gray-400">
              <HelpCircle className="h-10 w-10 text-gray-300 dark:text-slate-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">No courses matched your parameters</h3>
            <p className="text-gray-500 dark:text-slate-400 max-w-sm text-xs md:text-sm">
              We have additional offline partners. Click the reset button to start fresh or request a manual evaluation from our advisors.
            </p>
            <button
              onClick={resetFilters}
              className="mt-2 bg-[#0047AB] dark:bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-2.5 rounded-full shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
