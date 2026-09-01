import React, { useState } from "react";
import { 
  BarChart3, Calendar, Target, Trophy, ArrowRight, 
  CheckCircle2, Award, FileText, TrendingUp
} from "lucide-react";

// --- MOCK DATA ---
const performanceStats = [
  { label: "Total Attempts", value: "124", icon: Target, trend: "+12 this month", color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Avg. Accuracy", value: "88.5%", icon: CheckCircle2, trend: "+2.4% vs last", color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Top Percentile", value: "98.2", icon: Trophy, trend: "SSC CGL Tier 1", color: "text-amber-600", bg: "bg-amber-50" },
];

const attemptHistory = [
  { 
    id: 1, name: "SSC CGL Tier 1 Full Mock Test - 05", category: "SSC", 
    date: "24 Aug", scoreGet: 145.5, totalScore: 200, accuracy: "89%", percentile: "94.2",
    theme: "text-blue-600 bg-blue-50/50 ring-blue-200/50"
  },
  { 
    id: 2, name: "IBPS PO Prelims Live Scholarship", category: "Banking", 
    date: "18 Aug", scoreGet: 68.25, totalScore: 100, accuracy: "94%", percentile: "97.8",
    theme: "text-emerald-600 bg-emerald-50/50 ring-emerald-200/50"
  },
  { 
    id: 3, name: "RRB NTPC CBT 1 Previous Year 2021", category: "Railways", 
    date: "12 Aug", scoreGet: 82, totalScore: 100, accuracy: "81%", percentile: "88.5",
    theme: "text-amber-600 bg-amber-50/50 ring-amber-200/50"
  },
  { 
    id: 4, name: "SBI Clerk Mains Sectional - Quant", category: "Banking", 
    date: "05 Aug", scoreGet: 38, totalScore: 50, accuracy: "92%", percentile: "96.1",
    theme: "text-emerald-600 bg-emerald-50/50 ring-emerald-200/50"
  },
  { 
    id: 5, name: "UPSC EPFO Enforcement Officer Mini", category: "UPSC", 
    date: "01 Aug", scoreGet: 85, totalScore: 120, accuracy: "78%", percentile: "82.4",
    theme: "text-purple-600 bg-purple-50/50 ring-purple-200/50"
  },
];

const AttemptHistory = () => {
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "SSC", "Banking", "Railways"];

  return (
    <div className="min-h-full w-full max-w-5xl mx-auto pb-20 px-4 md:px-8 space-y-8 bg-[#fafcff] text-slate-800 font-sans selection:bg-indigo-100">
      
      {/* 1. HEADER */}
      <div className="pt-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Attempt History</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Track your progress and review past performances.</p>
        </div>
      </div>

      {/* 2. COMPACT PREMIUM STATS */}
      <div className="grid grid-cols-3 gap-3 md:gap-5">
        {performanceStats.map((stat, idx) => (
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

      {/* 3. UNIFIED HISTORY LIST (Smooth & Compact) */}
      <div>
        {/* Recessed Segmented Tabs */}
        <div className="inline-flex items-center p-1 bg-slate-100/80 rounded-xl mb-5 ring-1 ring-slate-200/50">
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
        <div className="bg-white rounded-[1.5rem] ring-1 ring-slate-200/60 shadow-[0_4px_20px_rgb(0,0,0,0.02)] overflow-hidden">
          
          {/* List Header (Hidden on Mobile) */}
          <div className="hidden md:flex items-center px-6 py-3 bg-slate-50/50 border-b border-slate-100/80">
            <div className="w-[45%] text-[10px] font-bold text-slate-400 uppercase tracking-widest">Test Title</div>
            <div className="w-[15%] text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Score</div>
            <div className="w-[15%] text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Accuracy</div>
            <div className="w-[15%] text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Percentile</div>
            <div className="w-[10%]"></div>
          </div>

          {/* Rows */}
          <div className="flex flex-col">
            {attemptHistory.map((test, idx) => (
              <div 
                key={test.id} 
                className={`group flex flex-col md:flex-row md:items-center px-5 md:px-6 py-4 md:py-4 transition-colors duration-300 hover:bg-slate-50/80 cursor-pointer ${
                  idx !== attemptHistory.length - 1 ? "border-b border-slate-100/80" : ""
                }`}
              >
                
                {/* Column 1: Test Info */}
                <div className="w-full md:w-[45%] flex items-center gap-4 mb-3 md:mb-0">
                  <div className="hidden md:flex w-10 h-10 rounded-full bg-slate-50 border border-slate-100 items-center justify-center shrink-0 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
                    <FileText className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ring-1 ${test.theme}`}>
                        {test.category}
                      </span>
                      <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                        {test.date}
                      </span>
                    </div>
                    <h3 className="text-[14px] font-semibold text-slate-800 truncate group-hover:text-indigo-600 transition-colors">
                      {test.name}
                    </h3>
                  </div>
                </div>

                {/* Mobile Grid for Metrics */}
                <div className="flex md:hidden items-center justify-between mt-2 pt-3 border-t border-slate-50">
                  <div className="text-[13px] font-bold text-slate-800">{test.scoreGet} <span className="text-[11px] text-slate-400 font-medium">/ {test.totalScore}</span></div>
                  <div className="text-[13px] font-semibold text-emerald-600">{test.accuracy} Acc</div>
                  <div className="text-[13px] font-semibold text-indigo-600">{test.percentile} %ile</div>
                </div>

                {/* Desktop Metrics */}
                <div className="hidden md:flex w-[15%] justify-end items-baseline gap-1">
                  <span className="text-[15px] font-bold text-slate-800">{test.scoreGet}</span>
                  <span className="text-xs font-medium text-slate-400">/{test.totalScore}</span>
                </div>

                <div className="hidden md:flex w-[15%] justify-center items-center">
                  <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-emerald-600 bg-emerald-50/50 px-2 py-0.5 rounded-md">
                    <Target className="w-3.5 h-3.5" /> {test.accuracy}
                  </span>
                </div>

                <div className="hidden md:flex w-[15%] justify-center items-center">
                  <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-indigo-600 bg-indigo-50/50 px-2 py-0.5 rounded-md">
                    <TrendingUp className="w-3.5 h-3.5" /> {test.percentile}
                  </span>
                </div>

                {/* Column 5: Action Arrow */}
                <div className="hidden md:flex w-[10%] justify-end">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white border border-slate-200 text-slate-400 group-hover:bg-indigo-600 group-hover:border-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" strokeWidth={2} />
                  </div>
                </div>

              </div>
            ))}
          </div>
          
          {/* Footer Action */}
          <div className="bg-slate-50/50 border-t border-slate-100/80 p-3 flex justify-center">
             <button className="text-[12px] font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-widest">
               View All History
             </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AttemptHistory;