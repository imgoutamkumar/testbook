import React, { useState } from "react";
import { 
  Search, Filter, Landmark, Briefcase, Shield, Train, 
  GraduationCap, ArrowRight, Star, Target, CalendarDays, 
  Users, BookOpen, Sparkles, SlidersHorizontal
} from "lucide-react";

// --- MOCK DATA ---
const examCategories = [
  { id: 1, name: "Banking & Finance", icon: Landmark, count: "15+ Exams", color: "text-emerald-600", bg: "bg-emerald-50/80", hoverRing: "hover:ring-emerald-200" },
  { id: 2, name: "Central Govt. (SSC)", icon: Briefcase, count: "12+ Exams", color: "text-blue-600", bg: "bg-blue-50/80", hoverRing: "hover:ring-blue-200" },
  { id: 3, name: "Railways", icon: Train, count: "8+ Exams", color: "text-amber-600", bg: "bg-amber-50/80", hoverRing: "hover:ring-amber-200" },
  { id: 4, name: "Defence Academy", icon: Shield, count: "10+ Exams", color: "text-rose-600", bg: "bg-rose-50/80", hoverRing: "hover:ring-rose-200" },
  { id: 5, name: "Teaching & Academics", icon: BookOpen, count: "20+ Exams", color: "text-violet-600", bg: "bg-violet-50/80", hoverRing: "hover:ring-violet-200" },
  { id: 6, name: "State Services", icon: Target, count: "50+ Exams", color: "text-cyan-600", bg: "bg-cyan-50/80", hoverRing: "hover:ring-cyan-200" },
];

const topExams = [
  { 
    id: 101, title: "SBI PO Executive 2026", category: "Banking", 
    eligibility: "Graduation", expectedDate: "Oct 2026", vacancies: "2,000+", 
    tags: ["High Salary", "Trending"],
    accent: "from-emerald-400 to-teal-500"
  },
  { 
    id: 102, title: "SSC CGL Tier 1", category: "SSC", 
    eligibility: "Graduation", expectedDate: "Sep 2026", vacancies: "7,500+", 
    tags: ["Most Popular"],
    accent: "from-blue-400 to-indigo-500"
  },
  { 
    id: 103, title: "RRB NTPC Premium", category: "Railways", 
    eligibility: "12th / Graduation", expectedDate: "Dec 2026", vacancies: "10,000+", 
    tags: ["Upcoming"],
    accent: "from-amber-400 to-orange-500"
  },
  { 
    id: 104, title: "IBPS Clerk Prelims", category: "Banking", 
    eligibility: "Graduation", expectedDate: "Aug 2026", vacancies: "4,500+", 
    tags: ["Admit Card Out"],
    accent: "from-emerald-400 to-teal-500"
  },
];

const popularGoals = [
  { title: "Elite Banking Officers", subtitle: "SBI PO, IBPS PO, RBI Grade B", color: "text-emerald-600" },
  { title: "Central Administration", subtitle: "SSC CGL, CHSL, Ministry Roles", color: "text-blue-600" },
  { title: "Uniformed Services", subtitle: "NDA, CDS, AFCAT", color: "text-rose-600" }
];

const ExploreExams = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-full w-full max-w-7xl mx-auto pb-20 px-4 md:px-8 space-y-16 bg-[#fafcff] text-slate-800 font-sans selection:bg-indigo-600/10">
      
      {/* 1. ELEVATED SEARCH BAR WITH COLORFUL GRADIENT BUTTON */}
      <div className="pt-12">
        <div className="w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-xl rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.06)] ring-1 ring-slate-900/5 p-2 flex items-center transition-all duration-500 focus-within:bg-white focus-within:shadow-[0_8px_40px_rgb(99,102,241,0.1)] focus-within:ring-indigo-200">
          <div className="pl-6 text-indigo-400">
            <Search className="w-5 h-5" />
          </div>
          <input 
            type="text" 
            placeholder="Search premium exams, syllabuses, or mock series..." 
            className="flex-1 w-full bg-transparent border-none outline-none px-5 py-3.5 text-slate-700 font-medium placeholder:text-slate-400 placeholder:font-normal"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="hidden md:flex items-center gap-2 text-slate-500 hover:text-indigo-600 px-5 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer">
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
          <button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-3.5 rounded-full font-semibold text-sm shadow-md shadow-indigo-200 transition-all cursor-pointer transform hover:scale-[1.02]">
            Explore Now
          </button>
        </div>
      </div>

      {/* 2. SOFT PASTEL CATEGORIES */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Explore by Discipline</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {examCategories.map((cat) => (
            <div key={cat.id} className={`${cat.bg} rounded-3xl p-6 ring-1 ring-white/50 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] ${cat.hoverRing} hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col items-center text-center`}>
              <div className={`mb-4 ${cat.color} group-hover:scale-110 transition-transform duration-300`}>
                <cat.icon className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-sm text-slate-800 mb-1">{cat.name}</h3>
              <p className={`text-[11px] font-semibold ${cat.color} opacity-70 uppercase tracking-widest`}>{cat.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. PREMIUM EXAM CARDS WITH COLOR ACCENTS */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Trending Opportunities <Sparkles className="w-5 h-5 text-amber-500" />
          </h2>
          <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors cursor-pointer">
            View Calendar &rarr;
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topExams.map((exam) => (
            <div key={exam.id} className="bg-white ring-1 ring-slate-100 rounded-[2rem] p-7 flex flex-col relative overflow-hidden group hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] hover:ring-indigo-100 transition-all duration-500 cursor-pointer">
              
              {/* Soft Gradient Top Line */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${exam.accent} opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {exam.category}
                </span>
                <div className="flex gap-1.5">
                  {exam.tags.map((tag, idx) => (
                    <span key={idx} className={`text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${idx === 0 ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-500'}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-6 group-hover:text-indigo-600 transition-colors leading-tight">
                {exam.title}
              </h3>
              
              <div className="space-y-4 mb-8 flex-1">
                <div className="flex items-center text-sm text-slate-500">
                  <CalendarDays className="w-4 h-4 mr-3 text-indigo-400" strokeWidth={1.5} /> 
                  Expected: <span className="text-slate-800 font-semibold ml-1">{exam.expectedDate}</span>
                </div>
                <div className="flex items-center text-sm text-slate-500">
                  <GraduationCap className="w-4 h-4 mr-3 text-indigo-400" strokeWidth={1.5} /> 
                  Requires: <span className="text-slate-800 font-semibold ml-1">{exam.eligibility}</span>
                </div>
                <div className="flex items-center text-sm text-slate-500">
                  <Users className="w-4 h-4 mr-3 text-indigo-400" strokeWidth={1.5} /> 
                  Vacancies: <span className="text-emerald-600 font-semibold ml-1">{exam.vacancies}</span>
                </div>
              </div>
              
              <button className="w-full h-12 rounded-2xl font-bold text-sm bg-indigo-50/50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                Explore Details <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 4. PEARLESCENT CAREER PATHS */}
      <div className="bg-gradient-to-br from-indigo-50/80 via-white to-fuchsia-50/80 rounded-[2.5rem] p-10 ring-1 ring-white shadow-[0_8px_30px_rgb(0,0,0,0.03)] relative overflow-hidden flex flex-col lg:flex-row gap-12 items-center">
        {/* Decorative blur blob */}
        <div className="absolute -right-20 -top-20 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="lg:w-1/3 space-y-5 relative z-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-sm text-purple-600 mb-2">
            <Target className="w-6 h-6" strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight leading-tight">Design your <br/>career trajectory.</h2>
          <p className="text-slate-600 text-sm leading-relaxed">Curated collections of exams tailored to your ultimate professional goals. Navigate your preparation with absolute clarity.</p>
          <button className="mt-4 font-semibold text-purple-600 flex items-center gap-2 hover:text-purple-700 transition-colors cursor-pointer group border-b-2 border-purple-200 hover:border-purple-600 pb-1 w-max">
            Take Career Assessment <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full relative z-10">
          {popularGoals.map((goal, idx) => (
            <div key={idx} className="bg-white/60 backdrop-blur-md rounded-3xl p-6 ring-1 ring-white hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 cursor-pointer">
              <div className={`text-4xl font-light mb-4 tracking-tighter ${goal.color} opacity-40`}>
                0{idx + 1}
              </div>
              <h4 className="font-bold text-slate-900 mb-2 leading-tight">{goal.title}</h4>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">{goal.subtitle}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ExploreExams;