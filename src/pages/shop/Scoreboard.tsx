import React from "react";
import { 
  Trophy, 
  Target, 
  Clock, 
  BookOpen, 
  CheckCircle2,
  Home,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useGetAttemptResultQuery } from "@/redux/services/testApi"; 

export default function Scoreboard() {
  const navigate = useNavigate();
  const { attemptId } = useParams();

  // Fetch the actual attempt result from your backend using the attemptId
  const { data: result, isLoading } = useGetAttemptResultQuery(attemptId || "");
  const attempt = result?.data || {
    id: attemptId || "demo-id",
    status: "EVALUATED",
    testMode: "PRACTICE",
    score: 5.34,
    accuracy: 75,
    timeSpent: 0
  };

  const formatTime = (seconds: number) => {
    if (!seconds || seconds === 0) return "< 1 min";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 w-screen h-screen bg-[#0B1121] flex flex-col items-center justify-center text-slate-200 z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mb-4"></div>
        <p className="text-sm font-medium text-slate-400 tracking-wide">Loading your performance...</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-screen h-screen bg-[#0B1121] text-slate-200 overflow-y-auto overflow-x-hidden flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans selection:bg-indigo-500/30">
      
      {/* Immersive Full-Screen Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-lg w-full relative z-10 my-auto">
        
        {/* Main Glass Card */}
        <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-indigo-950/60">
          
          {/* Top Banner with Animation */}
          <div className="relative pt-6 pb-6 px-6 text-center bg-gradient-to-b from-indigo-950/50 via-slate-900/20 to-transparent border-b border-white/5">
            
            {/* Guaranteed Rendering Lottie Animation Container */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto -mb-1 flex items-center justify-center pointer-events-none">
              <DotLottieReact
                src="https://assets2.lottiefiles.com/packages/lf20_touohxv0.json"
                loop
                autoplay
              />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2 shadow-sm">
              <CheckCircle2 size={13} /> Evaluated Successfully
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Test Completed!
            </h1>
            <p className="text-xs text-slate-400 mt-1">Great effort! Here is your complete scorecard breakdown.</p>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Score Highlight Box */}
            <div className="relative group overflow-hidden bg-gradient-to-br from-indigo-900/30 via-slate-900/60 to-purple-900/30 border border-indigo-500/20 rounded-2xl p-6 text-center transition-all duration-300 hover:border-indigo-500/40 shadow-inner">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all"></div>
              
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest flex items-center justify-center gap-1.5 mb-1">
                <Sparkles size={14} /> Total Score Obtained
              </span>
              <div className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-indigo-300 tracking-tight my-2">
                {attempt.score}
              </div>
              <span className="inline-block text-[11px] font-semibold text-slate-400 bg-slate-800/80 px-3 py-0.5 rounded-full border border-white/5 shadow-sm">
                Mode: {attempt.testMode?.replace("_", " ")}
              </span>
            </div>

            {/* Compact Stats Row */}
            <div className="grid grid-cols-2 gap-3.5">
              
              {/* Accuracy */}
              <div className="bg-slate-800/40 border border-white/5 rounded-2xl p-4 flex items-center gap-3.5 transition-all duration-200 hover:bg-slate-800/70 hover:border-white/10">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 shrink-0">
                  <Target size={20} />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-medium">Accuracy</p>
                  <p className="text-lg font-bold text-white">{attempt.accuracy}%</p>
                </div>
              </div>

              {/* Time Spent */}
              <div className="bg-slate-800/40 border border-white/5 rounded-2xl p-4 flex items-center gap-3.5 transition-all duration-200 hover:bg-slate-800/70 hover:border-white/10">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20 shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-medium">Time Spent</p>
                  <p className="text-lg font-bold text-white">{formatTime(attempt.timeSpent)}</p>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button 
                onClick={() => navigate('/')}
                className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700/80 text-slate-300 hover:text-white rounded-xl font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 border border-white/5 active:scale-[0.98]"
              >
                <Home size={16} /> Home
              </button>
              
              {/* <button 
                onClick={() => navigate(`/test/solutions/${attempt.id}`)}
                className="flex-[1.5] py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white rounded-xl font-semibold text-sm transition-all duration-200 shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <BookOpen size={16} /> Solutions <ArrowRight size={15} />
              </button> */}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}