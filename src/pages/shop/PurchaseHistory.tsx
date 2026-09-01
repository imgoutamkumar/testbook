import React, { useState } from "react";
import { 
  CreditCard, Receipt, Calendar, Download, 
  CheckCircle2, AlertCircle, Clock, Package, ArrowRight
} from "lucide-react";

// --- MOCK DATA ---
const billingStats = [
  { label: "Active Plans", value: "2", icon: Package, trend: "Unlimited Mocks Access", color: "text-emerald-600", bg: "bg-emerald-50" },
//   { label: "Total Spent", value: "₹3,498", icon: CreditCard, trend: "Since Jan 2025", color: "text-indigo-600", bg: "bg-indigo-50" },
  { label: "Next Renewal", value: "12 Oct", icon: Calendar, trend: "Banking Pro Pass", color: "text-amber-600", bg: "bg-amber-50" },
];

const purchaseHistory = [
  { 
    id: "INV-2026-089", 
    planName: "Banking Maha Pack 2026", 
    date: "12 Aug 2026", 
    amount: "₹1,999", 
    method: "UPI •••• 1245", 
    status: "Active", 
    expiry: "12 Aug 2027",
    theme: { text: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200/60", icon: CheckCircle2 }
  },
  { 
    id: "INV-2026-042", 
    planName: "SSC CGL Tier 1 & 2 Crash Course", 
    date: "01 Jun 2026", 
    amount: "₹1,499", 
    method: "Card •••• 4242", 
    status: "Active", 
    expiry: "01 Dec 2026",
    theme: { text: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200/60", icon: CheckCircle2 }
  },
  { 
    id: "INV-2025-112", 
    planName: "State Exams Premium Pass", 
    date: "15 Oct 2025", 
    amount: "₹999", 
    method: "Card •••• 4242", 
    status: "Expired", 
    expiry: "15 Apr 2026",
    theme: { text: "text-slate-600", bg: "bg-slate-100", border: "border-slate-200", icon: Clock }
  },
  { 
    id: "INV-2025-084", 
    planName: "UPSC EPFO Mini Mock Series", 
    date: "10 Sep 2025", 
    amount: "₹499", 
    method: "Failed", 
    status: "Failed", 
    expiry: "N/A",
    theme: { text: "text-red-700", bg: "bg-red-50", border: "border-red-200/60", icon: AlertCircle }
  }
];

const PurchaseHistory = () => {
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Active", "Expired"];

  return (
    <div className="min-h-full w-full max-w-5xl mx-auto pb-20 px-4 md:px-8 space-y-8 bg-[#fafcff] text-slate-800 font-sans selection:bg-indigo-100">
      
      {/* 1. HEADER */}
      <div className="pt-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Billing & Subscriptions</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Manage your active plans and download past invoices.</p>
        </div>
      </div>

      {/* 2. COMPACT PREMIUM STATS */}
      <div className="grid grid-cols-3 gap-3 md:gap-5">
        {billingStats.map((stat, idx) => (
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
            <div className="w-[40%] text-[10px] font-bold text-slate-400 uppercase tracking-widest">Plan & Invoice</div>
            <div className="w-[15%] text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Amount</div>
            <div className="w-[20%] text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Status</div>
            <div className="w-[15%] text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Valid Until</div>
            <div className="w-[10%]"></div>
          </div>

          {/* Rows */}
          <div className="flex flex-col">
            {purchaseHistory.map((item, idx) => {
              const StatusIcon = item.theme.icon;
              return (
                <div 
                  key={item.id} 
                  className={`group flex flex-col md:flex-row md:items-center px-5 md:px-6 py-4 md:py-4 transition-colors duration-300 hover:bg-slate-50/80 cursor-pointer ${
                    idx !== purchaseHistory.length - 1 ? "border-b border-slate-100/80" : ""
                  }`}
                >
                  
                  {/* Column 1: Plan & Invoice Info */}
                  <div className="w-full md:w-[40%] flex items-center gap-4 mb-3 md:mb-0">
                    <div className="hidden md:flex w-10 h-10 rounded-full bg-slate-50 border border-slate-100 items-center justify-center shrink-0 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
                      <Receipt className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" strokeWidth={2} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[14px] font-semibold text-slate-800 truncate group-hover:text-indigo-600 transition-colors">
                        {item.planName}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] font-mono text-slate-400 tracking-tight">
                          {item.id}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                        <span className="text-[11px] font-medium text-slate-400">
                          {item.date}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Grid for Metrics */}
                  <div className="flex md:hidden items-center justify-between mt-2 pt-3 border-t border-slate-50">
                    <div className="text-[13px] font-bold text-slate-800">{item.amount}</div>
                    <div className={`text-[12px] font-bold flex items-center gap-1 ${item.theme.text}`}>
                      <StatusIcon className="w-3.5 h-3.5" /> {item.status}
                    </div>
                  </div>

                  {/* Desktop Metrics */}
                  <div className="hidden md:flex flex-col w-[15%] justify-center items-end pr-4">
                    <span className="text-[15px] font-bold text-slate-800 tracking-tight">{item.amount}</span>
                    <span className="text-[10px] font-medium text-slate-400 tracking-wide mt-0.5">{item.method}</span>
                  </div>

                  <div className="hidden md:flex w-[20%] justify-center items-center">
                    <span className={`inline-flex items-center gap-1.5 text-[12px] font-bold ${item.theme.text} ${item.theme.bg} border ${item.theme.border} px-2.5 py-1 rounded-md`}>
                      <StatusIcon className="w-3.5 h-3.5" strokeWidth={2.5} /> {item.status}
                    </span>
                  </div>

                  <div className="hidden md:flex w-[15%] justify-center items-center">
                    <span className="text-[12px] font-semibold text-slate-500">
                      {item.expiry}
                    </span>
                  </div>

                  {/* Column 5: Action Button (Download Invoice) */}
                  <div className="hidden md:flex w-[10%] justify-end">
                    {item.status !== "Failed" && (
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white border border-slate-200 text-slate-400 group-hover:bg-indigo-600 group-hover:border-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md hover:scale-105" title="Download Invoice">
                        <Download className="w-4 h-4 transition-transform" strokeWidth={2} />
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
          
          {/* Footer Action */}
          <div className="bg-slate-50/50 border-t border-slate-100/80 p-3 flex justify-center">
             <button className="text-[12px] font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-widest flex items-center gap-1.5">
               Need Help with Billing? <ArrowRight className="w-3.5 h-3.5" />
             </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PurchaseHistory;