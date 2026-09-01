import React, { useState } from "react";
import { 
  Trophy, Target, Timer, TrendingUp, Activity, 
  Medal, ChevronUp, ChevronDown, Minus, Crown
} from "lucide-react";

// --- MOCK DATA ---
const liveStats = [
  { label: "Live Participants", value: "12,458", icon: Activity, trend: "Currently Active", color: "text-rose-600", bg: "bg-rose-50" },
  { label: "Highest Score", value: "192.5", icon: Crown, trend: "Out of 200", color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Avg. Completion", value: "48m 12s", icon: Timer, trend: "Time Taken", color: "text-blue-600", bg: "bg-blue-50" },
];

const leaderboard = [
  { 
    rank: 1, name: "Aarav Sharma", avatar: "AS", score: 192.5, accuracy: "98%", time: "42m 15s", trend: "up",
    theme: { bg: "bg-amber-50/40", text: "text-amber-600", border: "border-amber-200/50", medal: "text-amber-500" }
  },
  { 
    rank: 2, name: "Priya Patel", avatar: "PP", score: 189.0, accuracy: "95%", time: "44m 30s", trend: "steady",
    theme: { bg: "bg-slate-100/50", text: "text-slate-500", border: "border-slate-200", medal: "text-slate-400" }
  },
  { 
    rank: 3, name: "Rohan Verma", avatar: "RV", score: 188.5, accuracy: "96%", time: "41m 50s", trend: "up",
    theme: { bg: "bg-orange-50/30", text: "text-orange-700", border: "border-orange-200/50", medal: "text-orange-500" }
  },
  { 
    rank: 4, name: "Neha Gupta", avatar: "NG", score: 185.0, accuracy: "94%", time: "45m 10s", trend: "down",
    theme: { bg: "bg-white", text: "text-slate-800", border: "border-slate-100", medal: "text-transparent" }
  },
  { 
    rank: 5, name: "Aditya Singh", avatar: "AS", score: 184.5, accuracy: "93%", time: "46m 05s", trend: "up",
    theme: { bg: "bg-white", text: "text-slate-800", border: "border-slate-100", medal: "text-transparent" }
  },
];

// Logged-in user's current rank
const currentUser = {
  rank: 142, name: "You (Rahul Sharma)", avatar: "RS", score: 145.5, accuracy: "89%", time: "52m 10s", trend: "up",
};

const LiveLeaderboard = () => {
  // Changed tabs to reflect Exam Categories
  const [activeTab, setActiveTab] = useState("SSC");
  const tabs = ["SSC", "Banking", "Railways", "Defence", "State Exams"];

  // Helper to dynamically change subtitle based on selected exam
  const getExamTitle = () => {
    switch(activeTab) {
      case "SSC": return "SSC CGL Tier 1 All India Live Mock";
      case "Banking": return "IBPS PO Prelims Mega Live Test";
      case "Railways": return "RRB NTPC CBT-1 Daily Live";
      case "Defence": return "NDA/CDS National Live Mock";
      case "State Exams": return "UP Police Constable Live Test";
      default: return "Daily Live Mock Test";
    }
  };

  return (
    <div className="min-h-full w-full max-w-5xl mx-auto pb-20 px-4 md:px-8 space-y-8 bg-[#fafcff] text-slate-800 font-sans selection:bg-indigo-100">
      
      {/* 1. HEADER WITH LIVE BADGE */}
      <div className="pt-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Live Leaderboard</h1>
            <span className="flex items-center gap-1.5 bg-rose-50 border border-rose-100 text-rose-600 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
              LIVE
            </span>
          </div>
          {/* Dynamically updates based on the active tab */}
          <p className="text-sm text-slate-500 font-medium">{getExamTitle()}</p>
        </div>
      </div>

      {/* 2. COMPACT PREMIUM STATS */}
      <div className="grid grid-cols-3 gap-3 md:gap-5">
        {liveStats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-[1.25rem] p-4 md:p-5 ring-1 ring-slate-200/60 shadow-[0_2px_10px_rgb(0,0,0,0.01)] flex flex-col md:flex-row md:items-center gap-3 md:gap-4 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-0.5 cursor-default">
            <div className={`p-2.5 md:p-3 rounded-full ${stat.bg} ${stat.color} shrink-0`}>
              <stat.icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              <div className="flex items-baseline gap-2 mt-0.5 md:mt-0">
                <h4 className="text-lg md:text-xl font-black text-slate-900 tracking-tight leading-none">{stat.value}</h4>
              </div>
              <p className="text-[10px] md:text-xs font-medium text-slate-400 mt-1 hidden md:block truncate">{stat.trend}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 3. UNIFIED LEADERBOARD LIST */}
      <div>
        {/* Exam Category Tabs */}
        <div className="inline-flex items-center p-1 bg-slate-100/80 rounded-xl mb-5 ring-1 ring-slate-200/50 overflow-x-auto max-w-full [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-[13px] font-semibold whitespace-nowrap transition-all duration-300 ${
                activeTab === tab 
                  ? "bg-white text-slate-800 shadow-sm ring-1 ring-slate-200/50" 
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* The Unified Card Container */}
        <div className="bg-white rounded-[1.5rem] ring-1 ring-slate-200/60 shadow-[0_4px_20px_rgb(0,0,0,0.02)] overflow-hidden flex flex-col">
          
          {/* List Header */}
          <div className="hidden md:flex items-center px-6 py-3 bg-slate-50/50 border-b border-slate-100/80">
            <div className="w-[10%] text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Rank</div>
            <div className="w-[35%] text-[10px] font-bold text-slate-400 uppercase tracking-widest">Student</div>
            <div className="w-[15%] text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Score</div>
            <div className="w-[20%] text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Accuracy</div>
            <div className="w-[20%] text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Time Taken</div>
          </div>

          {/* Leaderboard Rows */}
          <div className="flex flex-col">
            {leaderboard.map((user, idx) => (
              <div 
                key={idx} 
                className={`group flex flex-col md:flex-row md:items-center px-5 md:px-6 py-3 md:py-4 transition-colors duration-300 hover:bg-slate-50/80 cursor-pointer border-b ${user.theme.bg} ${user.theme.border}`}
              >
                
                {/* Mobile: Rank + Name Layout */}
                <div className="flex items-center justify-between md:hidden mb-2">
                  <div className="flex items-center gap-3">
                    <span className={`text-[15px] font-black w-6 text-center ${user.rank <= 3 ? user.theme.text : 'text-slate-400'}`}>
                      #{user.rank}
                    </span>
                    <h3 className="text-[14px] font-bold text-slate-800">{user.name}</h3>
                  </div>
                  <div className="text-[14px] font-black text-slate-900">{user.score}</div>
                </div>

                {/* Desktop: Column 1 - Rank */}
                <div className="hidden md:flex w-[10%] justify-center items-center">
                  {user.rank <= 3 ? (
                    <div className="relative flex items-center justify-center">
                      <Medal className={`w-6 h-6 ${user.theme.medal}`} fill="currentColor" strokeWidth={1} />
                      <span className="absolute text-[10px] font-black text-white top-1">{user.rank}</span>
                    </div>
                  ) : (
                    <span className="text-[15px] font-bold text-slate-400">#{user.rank}</span>
                  )}
                </div>

                {/* Desktop: Column 2 - Student Profile */}
                <div className="hidden md:flex w-[35%] items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ring-2 ring-white shadow-sm ${user.rank <= 3 ? 'bg-white ' + user.theme.text : 'bg-slate-100 text-slate-500'}`}>
                    {user.avatar}
                  </div>
                  <h3 className={`text-[14px] font-bold truncate ${user.rank <= 3 ? 'text-slate-900' : 'text-slate-700'}`}>
                    {user.name}
                  </h3>
                </div>

                {/* Mobile: Metrics Grid */}
                <div className="flex md:hidden items-center justify-between pt-2 border-t border-slate-100/50">
                  <div className="text-[12px] font-semibold text-emerald-600">{user.accuracy} Acc</div>
                  <div className="text-[12px] font-semibold text-blue-600">{user.time}</div>
                </div>

                {/* Desktop: Column 3 - Score */}
                <div className="hidden md:flex flex-col w-[15%] justify-center items-end pr-4">
                  <span className={`text-[16px] font-black tracking-tight ${user.rank <= 3 ? 'text-slate-900' : 'text-slate-700'}`}>
                    {user.score}
                  </span>
                  <div className="flex items-center gap-1 mt-0.5">
                    {user.trend === "up" && <ChevronUp className="w-3 h-3 text-emerald-500" strokeWidth={3} />}
                    {user.trend === "down" && <ChevronDown className="w-3 h-3 text-rose-500" strokeWidth={3} />}
                    {user.trend === "steady" && <Minus className="w-3 h-3 text-slate-400" strokeWidth={3} />}
                  </div>
                </div>

                {/* Desktop: Column 4 - Accuracy */}
                <div className="hidden md:flex w-[20%] justify-center items-center">
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-emerald-600 bg-emerald-50/50 px-2.5 py-0.5 rounded-md">
                    <Target className="w-3.5 h-3.5" /> {user.accuracy}
                  </span>
                </div>

                {/* Desktop: Column 5 - Time Taken */}
                <div className="hidden md:flex w-[20%] justify-center items-center">
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-blue-600 bg-blue-50/50 px-2.5 py-0.5 rounded-md">
                    <Timer className="w-3.5 h-3.5" /> {user.time}
                  </span>
                </div>

              </div>
            ))}
          </div>

          {/* 4. PINNED CURRENT USER ROW (At the bottom) */}
          <div className="bg-indigo-50/60 border-t border-indigo-100 p-1">
            <div className="flex flex-col md:flex-row md:items-center px-4 md:px-5 py-3 md:py-4 bg-white rounded-xl shadow-[0_2px_10px_rgb(99,102,241,0.06)] ring-1 ring-indigo-100">
              
              {/* Mobile pinned */}
              <div className="flex items-center justify-between md:hidden mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-[15px] font-black w-6 text-center text-indigo-600">#{currentUser.rank}</span>
                  <h3 className="text-[14px] font-bold text-indigo-700">{currentUser.name}</h3>
                </div>
                <div className="text-[14px] font-black text-indigo-900">{currentUser.score}</div>
              </div>

              {/* Desktop pinned */}
              <div className="hidden md:flex w-[10%] justify-center items-center">
                <span className="text-[15px] font-black text-indigo-600">#{currentUser.rank}</span>
              </div>
              <div className="hidden md:flex w-[35%] items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 bg-indigo-100 text-indigo-700 ring-2 ring-white shadow-sm">
                  {currentUser.avatar}
                </div>
                <h3 className="text-[14px] font-bold text-indigo-700">{currentUser.name}</h3>
              </div>
              <div className="hidden md:flex flex-col w-[15%] justify-center items-end pr-4">
                <span className="text-[16px] font-black tracking-tight text-indigo-900">{currentUser.score}</span>
              </div>
              <div className="hidden md:flex w-[20%] justify-center items-center">
                <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-emerald-600">
                  <Target className="w-3.5 h-3.5" /> {currentUser.accuracy}
                </span>
              </div>
              <div className="hidden md:flex w-[20%] justify-center items-center">
                <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-blue-600">
                  <Timer className="w-3.5 h-3.5" /> {currentUser.time}
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LiveLeaderboard;