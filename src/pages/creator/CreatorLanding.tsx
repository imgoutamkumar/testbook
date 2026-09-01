import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  Play,
  Layers,
  Code
} from 'lucide-react';

export default function CreatorLandingPage() {
  return (
    <div className="min-h-screen w-full bg-[#030000] text-neutral-200 selection:bg-red-600 selection:text-white font-sans overflow-x-hidden relative">
      
      {/* Valentine Glossy Red Ambient Glows */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-red-600/20 via-rose-600/10 to-transparent rounded-full blur-[160px] pointer-events-none"></div>

      {/* NAVBAR */}
      <nav className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between relative z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center text-white font-black shadow-[0_0_20px_rgba(255,0,64,0.5)]">
            P
          </div>
          <span className="text-xl font-black tracking-tight text-white">PrepMaster <span className="text-red-500">Creators</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#split" className="hover:text-white transition-colors">80/20 Payouts</a>
          <a href="#security" className="hover:text-white transition-colors">Security</a>
        </div>

        <div className="flex items-center gap-4">
          <a 
            href="/creator/onboarding" 
            className="px-6 py-2.5 bg-gradient-to-r from-red-600 via-rose-600 to-red-500 text-white rounded-xl font-bold text-sm transition-all shadow-[0_0_25px_rgba(255,0,64,0.4)] hover:scale-105 active:scale-95"
          >
            Apply as Creator
          </a>
        </div>
      </nav>

      {/* HERO SECTION (CodePen Style Interactive Canvas Look) */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-24 text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-950/40 border border-red-900/50 text-red-400 text-xs font-bold uppercase tracking-wider mb-6 shadow-[0_0_15px_rgba(255,0,64,0.2)]"
        >
          <Sparkles size={14} /> The #1 EdTech Marketplace Engine
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 leading-tight"
        >
          Build Your Test Empire. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-red-600 drop-shadow-[0_5px_25px_rgba(255,0,64,0.4)]">
            We Handle The Engine.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto text-neutral-400 text-lg mb-10 leading-relaxed"
        >
          Empower thousands of aspirants with your custom mock tests, live leaderboards, and automated coupon engines while keeping an unmatched 80% revenue split.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a 
            href="/creator-onboarding" 
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-red-600 via-rose-600 to-red-500 text-white rounded-2xl font-extrabold text-base transition-all shadow-[0_10px_35px_rgba(255,0,64,0.5)] hover:scale-105 active:scale-95 flex items-center justify-center gap-3 group"
          >
            Start Onboarding Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a 
            href="#preview" 
            className="w-full sm:w-auto px-8 py-4 bg-black/60 hover:bg-neutral-900 border border-red-950 text-white rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-2"
          >
            <Play size={16} className="text-red-500" /> View Storefront Demo
          </a>
        </motion.div>
      </section>

      {/* INTERACTIVE CODEPEN-STYLE FEATURE PREVIEW BOX */}
      <section id="preview" className="max-w-5xl mx-auto px-6 mb-32 relative z-10">
        <div className="rounded-[2.5rem] bg-gradient-to-b from-neutral-900/90 to-black/95 border border-red-900/40 p-4 md:p-8 shadow-[0_30px_100px_rgba(0,0,0,0.9),0_0_50px_rgba(255,0,64,0.15)] relative overflow-hidden">
          
          {/* Top Window Bar */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-red-950/60">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-4 text-xs font-mono text-neutral-500">prepmaster.engine.live/storefront</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-red-400 bg-red-950/40 px-3 py-1 rounded-full border border-red-900/30">
              <Zap size={12} /> Live Route Split Active
            </div>
          </div>

          {/* Interactive Mock UI Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black/60 border border-red-950/80 rounded-2xl p-6 relative group hover:border-red-600/50 transition-all">
              <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center mb-4">
                <Layers size={20} />
              </div>
              <h3 className="text-white font-bold mb-1">Multi-Tenant Storefront</h3>
              <p className="text-sm text-neutral-400">Get your dedicated URL (`prepmaster.com/c/your-brand`) instantly upon onboarding.</p>
            </div>

            <div className="bg-black/60 border border-red-950/80 rounded-2xl p-6 relative group hover:border-red-600/50 transition-all">
              <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center mb-4">
                <TrendingUp size={20} />
              </div>
              <h3 className="text-white font-bold mb-1">Automated 80/20 Splits</h3>
              <p className="text-sm text-neutral-400">Powered by Razorpay Route. Earnings automatically flow to your bank account with a 7-day safety hold.</p>
            </div>

            <div className="bg-black/60 border border-red-950/80 rounded-2xl p-6 relative group hover:border-red-600/50 transition-all">
              <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center mb-4">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-white font-bold mb-1">IP & Question Isolation</h3>
              <p className="text-sm text-neutral-400">Military-grade data isolation ensures no other teacher can access or steal your question bank.</p>
            </div>
          </div>

        </div>
      </section>

      {/* STATS SECTION */}
      <section className="border-y border-red-950/60 bg-black/40 py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl md:text-5xl font-black text-white mb-1">80%</p>
            <p className="text-sm text-neutral-400">Creator Revenue Cut</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-black text-red-500 mb-1">7 Days</p>
            <p className="text-sm text-neutral-400">Secure Auto-Settlement</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-black text-white mb-1">100%</p>
            <p className="text-sm text-neutral-400">IP Data Protection</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-black text-red-500 mb-1">0 Setup</p>
            <p className="text-sm text-neutral-400">Instant API Onboarding</p>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="max-w-4xl mx-auto px-6 py-28 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6">
          Ready to scale your teaching business?
        </h2>
        <p className="text-neutral-400 max-w-xl mx-auto mb-10 text-base">
          Complete our 4-step interactive onboarding wizard in under 3 minutes and launch your first mock test package today.
        </p>
        <a 
          href="/creator-onboarding" 
          className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-red-600 via-rose-600 to-red-500 text-white rounded-2xl font-extrabold text-lg transition-all shadow-[0_10px_40px_rgba(255,0,64,0.6)] hover:scale-105 active:scale-95"
        >
          Launch Creator Wizard <ArrowRight size={20} />
        </a>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-red-950/40 py-12 text-center text-xs text-neutral-600">
        <p>© 2026 PrepMaster EdTech Marketplace. All rights reserved.</p>
      </footer>

    </div>
  );
}