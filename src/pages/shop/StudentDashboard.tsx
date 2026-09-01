import React from "react";
import { ColorfulSimpleFlower } from '../../components/shop/customlogo';
import {
  FileText, Clock, PlayCircle, Flame,
  TrendingUp, Award, ChevronRight, Calendar, BookOpen, ArrowRight
} from "lucide-react";
import { useGetCollectionsQuery } from "@/redux/services/testApi";
import { Link } from 'react-router-dom';

// --- MOCK DATA ---
const liveTests = [
  { id: 1, title: "All India Live Mock: SSC CGL Tier 1", endsIn: "12h 45m", participants: "45K+", tags: ["Free", "All India Rank"] },
  { id: 2, title: "IBPS PO Prelims Scholarship Test", endsIn: "22h 10m", participants: "12K+", tags: ["Scholarship", "Live"] },
];

const dailyQuizzes = [
  { id: 1, title: "Daily Current Affairs", date: "23 Aug", questions: 15, time: "10 Mins", subject: "General Awareness" },
  { id: 2, title: "Quantitative Aptitude Mini-Mock", date: "23 Aug", questions: 20, time: "15 Mins", subject: "Maths" },
  { id: 3, title: "English Vocab Booster", date: "22 Aug", questions: 10, time: "5 Mins", subject: "English" },
  { id: 4, title: "Reasoning Speed Test", date: "22 Aug", questions: 20, time: "15 Mins", subject: "Reasoning" },
];

const previousYearPapers = [
  { id: 1, title: "SSC CGL Tier 1", year: "2023", shifts: 39, category: "SSC" },
  { id: 2, title: "IBPS PO Prelims", year: "2023", shifts: 8, category: "Banking" },
  { id: 3, title: "RRB NTPC CBT 1", year: "2021", shifts: 133, category: "Railways" },
  { id: 4, title: "SBI Clerk Prelims", year: "2022", shifts: 12, category: "Banking" },
];

const recommendedSeries = [
  { id: 101, title: "Banking Maha Pack 2026", tests: 450, users: "1.2L" },
  { id: 102, title: "SSC CGL Tier 1 & 2 Combo", tests: 320, users: "2.5L" },
  { id: 103, title: "UPSC EPFO Enforcement Officer", tests: 85, users: "45K" },
  { id: 104, title: "RRB ALP & Technician", tests: 150, users: "90K" },
];


// --- RESPONSIVE SECTION HEADER ---
const SectionHeader = ({ title, icon: Icon }) => (
  <div className="flex justify-between items-end mb-4 sm:mb-5">
    <div className="flex items-center gap-2.5 sm:gap-3">
      <div className="p-2 sm:p-2.5 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 shadow-sm">
        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>
      <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 tracking-tight">
        {title}
      </h2>
    </div>
    <button className="text-[11px] sm:text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors group cursor-pointer p-2 -mr-2">
      View All <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
    </button>
  </div>
);

const StudentDashboard = () => {
  const { data: response, isLoading, isError } = useGetCollectionsQuery({});
  const collections = response?.data || [];

  return (
    <div className="min-h-full w-full max-w-7xl mx-auto pb-16 px-3 sm:px-4 md:px-8 space-y-10 sm:space-y-12 bg-[#f8fafc] text-gray-900 selection:bg-blue-600/20 overflow-x-hidden">

      {/* 1. LUXURY JUMP BACK IN (Resume Banner) */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 sm:gap-6 relative z-10">
          <div className="w-full">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-200 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-3">
              <PlayCircle className="w-3.5 h-3.5 animate-pulse" /> Resume Learning
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-1 sm:mb-2 text-white">IBPS PO Mock Test #5</h3>
            <p className="text-blue-100 text-xs sm:text-sm font-medium">
              Paused at Quantitative Aptitude <span className="text-blue-300 font-semibold block sm:inline mt-1 sm:mt-0 sm:ml-1">• 45:12 remaining</span>
            </p>
          </div>
          <button className="w-full md:w-auto h-11 px-7 rounded-xl font-bold text-xs uppercase tracking-wider bg-white text-blue-950 shadow-md hover:bg-blue-50 active:scale-95 md:hover:scale-[1.02] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2">
            Resume Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. LIVE & UPCOMING MOCKS (High Urgency Cards with Active Ray) */}
      <div>
        <SectionHeader title="Live & Upcoming Events" icon={Award} />
        <div className="flex overflow-x-auto pb-5 -mx-3 px-3 sm:mx-0 sm:px-0 gap-4 sm:gap-6 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {liveTests.map((test) => (
            <div key={test.id} className="relative group min-w-[85vw] sm:min-w-[360px] md:min-w-[400px] snap-center sm:snap-start overflow-hidden rounded-2xl p-[2px] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer">

              {/* Spinning Animated Ray Background (Always visible for LIVE urgency) */}
              <div className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#ef4444_50%,transparent_100%)] z-0" />

              {/* Inner Card Card */}
              <div className="relative z-10 bg-white h-full w-full rounded-[14px] p-5 sm:p-6 flex flex-col">
                <div className="absolute top-0 left-0 w-full h-1 bg-red-500 rounded-t-2xl" />

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-red-50 border border-red-200 text-red-600 text-[9px] sm:text-[10px] font-extrabold px-2 py-1 rounded-md uppercase tracking-wider flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5 animate-ping" /> LIVE NOW
                  </span>
                  {test.tags.map(tag => (
                    <span key={tag} className="bg-gray-100 border border-gray-200 text-gray-700 text-[9px] sm:text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">{tag}</span>
                  ))}
                </div>

                <h3 className="font-bold text-base sm:text-lg mb-5 sm:mb-6 text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">{test.title}</h3>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="text-[11px] sm:text-xs text-gray-500 font-medium">Ends in: <span className="text-red-600 font-bold">{test.endsIn}</span></div>
                  <button className="h-10 px-4 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-sm transition-all cursor-pointer">
                    Attempt Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. DAILY TARGETS & FREE QUIZZES (Hover Ray Borders) */}
      <div>
        <SectionHeader title="Daily Free Quizzes" icon={Flame} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {dailyQuizzes.map((quiz, idx) => {
            const palettes = [
              { ray: "#10b981", tag: "group-hover:bg-emerald-50 group-hover:text-emerald-700", text: "group-hover:text-emerald-700", icon: "group-hover:text-emerald-500" },
              { ray: "#3b82f6", tag: "group-hover:bg-blue-50 group-hover:text-blue-700", text: "group-hover:text-blue-700", icon: "group-hover:text-blue-500" },
              { ray: "#f43f5e", tag: "group-hover:bg-rose-50 group-hover:text-rose-700", text: "group-hover:text-rose-700", icon: "group-hover:text-rose-500" },
              { ray: "#f59e0b", tag: "group-hover:bg-amber-50 group-hover:text-amber-700", text: "group-hover:text-amber-700", icon: "group-hover:text-amber-500" }
            ];
            const theme = palettes[idx % palettes.length];

            return (
              <div key={quiz.id} className="relative group overflow-hidden rounded-[1.25rem] p-[2px] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-500 cursor-pointer flex flex-col z-10 w-full">

                {/* Ray Border on Hover */}
                <div
                  className="absolute inset-[-150%] opacity-0 group-hover:opacity-100 group-hover:animate-[spin_4s_linear_infinite] transition-opacity duration-500 z-0"
                  style={{ backgroundImage: `conic-gradient(from 90deg at 50% 50%, transparent 0%, ${theme.ray} 50%, transparent 100%)` }}
                />

                <div className="relative z-10 bg-white rounded-[1.15rem] p-4 sm:p-5 h-full w-full flex flex-col">
                  <div className="flex justify-between items-start mb-4 sm:mb-5">
                    <div className={`bg-slate-50 text-slate-600 ring-1 ring-slate-200/60 text-[9px] sm:text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${theme.tag} transition-all duration-300`}>
                      {quiz.subject}
                    </div>
                    <div className={`text-[11px] sm:text-xs text-slate-400 flex items-center font-medium ${theme.text} transition-colors duration-300`}>
                      <Calendar className="w-3.5 h-3.5 mr-1" /> {quiz.date}
                    </div>
                  </div>

                  <h3 className={`font-bold text-slate-900 text-sm sm:text-[15px] leading-snug mb-5 ${theme.text} transition-colors duration-300 flex-1`}>
                    {quiz.title}
                  </h3>

                  <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500 border-t border-slate-100 pt-3.5 font-medium">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span className="flex items-center group-hover:text-slate-700 transition-colors">
                        <BookOpen className={`w-3.5 h-3.5 mr-1 sm:mr-1.5 text-slate-400 ${theme.icon} transition-colors`} /> {quiz.questions} Qs
                      </span>
                      <span className="flex items-center group-hover:text-slate-700 transition-colors">
                        <Clock className={`w-3.5 h-3.5 mr-1 sm:mr-1.5 text-slate-400 ${theme.icon} transition-colors`} /> {quiz.time}
                      </span>
                    </div>
                    <ArrowRight className={`w-4 h-4 ${theme.icon} opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300`} strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. PREVIOUS YEAR PAPERS (PYQs) */}
      <div>
        <SectionHeader title="Previous Year Papers (PYQs)" icon={FileText} />

        <div className="flex overflow-x-auto pb-5 -mx-3 px-3 sm:mx-0 sm:px-0 gap-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {previousYearPapers.map((paper) => (
            <div
              key={paper.id}
              // Smaller min-widths, reduced padding (p-4) to make it compact
              className="relative group min-w-[70vw] sm:min-w-[240px] md:min-w-[260px] snap-center sm:snap-start bg-white rounded-2xl p-4 sm:p-5 border border-rose-100/40 shadow-[0_2px_8px_-4px_rgba(225,29,72,0.05)] hover:shadow-[0_12px_24px_-8px_rgba(225,29,72,0.15)] hover:border-rose-200 transition-all duration-300 cursor-pointer flex flex-col overflow-hidden"
            >
              {/* Delicate Top Gradient Line that appears on hover */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Soft, romantic blush background that fades in */}
              <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-pink-50/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />

              <div className="relative z-10 flex flex-col h-full">
                {/* Header: Tags & Year */}
                <div className="flex justify-between items-center mb-3.5">
                  <span className="bg-rose-50 text-rose-600 text-[9px] sm:text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider group-hover:bg-white/80 transition-colors">
                    {paper.category}
                  </span>
                  <span className="text-gray-400 text-[10px] font-medium flex items-center gap-1 group-hover:text-rose-400 transition-colors">
                    <Calendar className="w-3 h-3" /> {paper.year}
                  </span>
                </div>

                {/* Body: Title & Meta */}
                <div className="flex-1 mb-4">
                  <h3 className="font-bold text-[14px] sm:text-[15px] text-gray-800 group-hover:text-rose-700 transition-colors leading-snug mb-1.5 line-clamp-2">
                    {paper.title}
                  </h3>
                  <p className="text-[11px] text-gray-500 font-medium flex items-center">
                    <FileText className="w-3 h-3 mr-1 text-rose-300 group-hover:text-rose-400 transition-colors" />
                    {paper.shifts} Shifts Available
                  </p>
                </div>

                {/* Action Button: Compact & Elegant */}
                <button className="w-full h-9 rounded-xl text-xs font-bold border border-rose-100 bg-white text-rose-600 group-hover:bg-gradient-to-r group-hover:from-rose-500 group-hover:to-pink-500 group-hover:text-white group-hover:border-transparent transition-all duration-300 flex items-center justify-center gap-1.5">
                  Solve Now
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" strokeWidth={2.5} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

 {/* 5. TRENDING COLLECTIONS */}
<div className="relative">
  <SectionHeader title="Trending Bundle Packs" icon={TrendingUp} />
  
  {/* HIDDEN SVG DEFS: This creates the beautiful multi-color gradient for the background logo */}
  <svg width="0" height="0" className="absolute pointer-events-none">
  <defs>
    <linearGradient id="flower-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#8b5cf6" />   {/* Violet */}
      <stop offset="50%" stopColor="#f43f5e" />  {/* Rose */}
      <stop offset="100%" stopColor="#fb923c" /> {/* Peach */}
    </linearGradient>
  </defs>
</svg>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
    {collections.map((collection) => (
      <div 
        key={collection.id} 
        // 1. Softer, more premium corner radius (1.5rem) and subtle tinted background
        className="relative group bg-white border border-slate-200/70 rounded-[1.5rem] p-5 sm:p-6 shadow-sm hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] hover:border-slate-300 transition-all duration-500 flex flex-col cursor-pointer overflow-hidden z-0"
      >
        
        {/* 2. Light Ambient Background Color (Fades in slightly on hover) */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/40 via-transparent to-pink-50/40 opacity-40 group-hover:opacity-100 transition-opacity duration-500 z-0" />

        {/* 3. Massive Colorful Background Logo */}
        {/* w-52 h-52 covers nearly half the card. It uses the custom SVG gradient we defined above. */}
        <div className="absolute -bottom-10 -right-8 opacity-25 group-hover:opacity-40 group-hover:scale-[1.15] group-hover:-rotate-12 transition-all duration-700 pointer-events-none z-0">
          <ColorfulSimpleFlower className="w-56 h-56" 
    
  />
        </div>
        
        {/* Inner Content Wrapper (z-10 ensures text sits above the giant logo) */}
        <div className="relative z-10 flex-1 flex flex-col h-full">
          
          {/* Title */}
          <h3 className="font-bold text-[15px] mb-5 text-slate-800 group-hover:text-black transition-colors line-clamp-2 leading-relaxed">
            {collection?.name}
          </h3>
          
          {/* Stats Badges: Glassy frosted look */}
          <div className="flex items-center text-[11px] sm:text-xs text-slate-500 mb-6 gap-2.5 mt-auto font-medium">
            <div className="flex items-center bg-white/70 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-slate-200/50 group-hover:bg-white group-hover:border-slate-200 transition-colors shadow-sm">
              <FileText className="w-3.5 h-3.5 mr-1.5 text-slate-400 group-hover:text-indigo-500 transition-colors" /> { "1k"} Tests
            </div>
            <div className="flex items-center bg-white/70 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-slate-200/50 group-hover:bg-white group-hover:border-slate-200 transition-colors shadow-sm">
              <Award className="w-3.5 h-3.5 mr-1.5 text-slate-400 group-hover:text-pink-500 transition-colors" /> {"10K+"} Users
            </div>
          </div>
          
          {/* Action Button: Clean, high-contrast Slate 900 */}
          <Link to={`/collection/${collection.id}`} className="w-full h-10 rounded-xl text-xs font-bold border border-slate-200 bg-white/80 backdrop-blur-sm text-slate-700 group-hover:bg-slate-900 group-hover:border-slate-900 group-hover:text-white transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm">
            Explore Details 
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white opacity-80 group-hover:translate-x-1 transition-all duration-300" strokeWidth={2.5} />
          </Link>
          {/* <button  className="w-full h-10 rounded-xl text-xs font-bold border border-slate-200 bg-white/80 backdrop-blur-sm text-slate-700 group-hover:bg-slate-900 group-hover:border-slate-900 group-hover:text-white transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm">
            Explore Details 
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white opacity-80 group-hover:translate-x-1 transition-all duration-300" strokeWidth={2.5} />
          </button> */}

        </div>
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default StudentDashboard;