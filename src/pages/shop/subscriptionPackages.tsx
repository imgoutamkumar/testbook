import React, { useState } from "react";
import { Check, Sparkles, Zap, Loader2, Crown, AlertCircle, X } from "lucide-react";
import toast, { Toaster} from "react-hot-toast";
import { type Toast } from "react-hot-toast";

// --- STATIC DATA ---
const subscriptionPackages = [
  {
    id: "pkg_1",
    name: "SSC Elite Pass",
    description: "Perfect for SSC CGL, CHSL & MTS preparation.",
    price: 1999,
    discountPrice: 499,
    validityDays: 180,
    isPopular: false,
    theme: "from-cyan-400 to-blue-500",
    features: ["500+ SSC Mock Tests", "PYQs (2018-2025)", "Sectional Tests"]
  },
  {
    id: "pkg_2",
    name: "Maha Pack Pro",
    description: "The ultimate arsenal for IBPS, SBI, and RBI exams.",
    price: 3999,
    discountPrice: 1499,
    validityDays: 365,
    isPopular: true,
    theme: "from-fuchsia-500 to-violet-600",
    features: ["1200+ Mock Tests", "All Prelims & Mains", "Daily Quizzes", "Live Ranking"]
  },
  {
    id: "pkg_3",
    name: "Infinity Ultimate",
    description: "Unlimited access to SSC, Banking & Railway tests.",
    price: 7999,
    discountPrice: 2499,
    validityDays: 730,
    isPopular: false,
    theme: "from-amber-400 to-orange-500",
    features: ["All Exam Categories", "4000+ Tests", "Priority Support", "No Ads"]
  },
  {
    id: "pkg_4",
    name: "State Exams Pass",
    description: "Dedicated preparation for UP, Bihar, and MP state exams.",
    price: 1499,
    discountPrice: 399,
    validityDays: 180,
    isPopular: false,
    theme: "from-emerald-400 to-teal-500",
    features: ["State-specific Mocks", "Local GK Modules", "Language Tests"]
  }
];

// --- PREMIUM CUSTOM TOAST NOTIFICATIONS ---
const showPremiumToast = (title: string, message: string, type: 'success' | 'error' | 'loading') => {
  const duration = type === 'loading' ? Infinity : 4000;
  
  toast.custom((t: Toast) => (
    <div className={`
      ${t.visible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4'} 
      transform transition-all duration-300 ease-out max-w-[90vw] sm:max-w-sm w-full bg-zinc-900/95 backdrop-blur-xl shadow-2xl rounded-2xl pointer-events-auto flex flex-col ring-1 ring-white/10 relative overflow-hidden mx-auto
    `}>
      <div className={`absolute -inset-1 blur-xl opacity-20 ${type === 'success' ? 'bg-emerald-500' : type === 'error' ? 'bg-red-500' : 'bg-violet-500'}`}></div>
      
      <div className="relative flex items-center w-full p-4 pr-12">
        <div className="shrink-0 mr-3 sm:mr-4">
          {type === 'success' && <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.3)]"><Check className="w-4 h-4 text-emerald-400" /></div>}
          {type === 'error' && <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.3)]"><AlertCircle className="w-4 h-4 text-red-400" /></div>}
          {type === 'loading' && <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center border border-violet-500/30 shadow-[0_0_10px_rgba(139,92,246,0.3)]"><Loader2 className="w-4 h-4 text-violet-400 animate-spin" /></div>}
        </div>
        <div className="flex-1 w-0">
          <p className="text-sm font-bold text-white tracking-wide">{title}</p>
          <p className="mt-0.5 text-xs text-zinc-400 line-clamp-2">{message}</p>
        </div>
        
        {type !== 'loading' && (
          <button 
            onClick={() => toast.dismiss(t.id)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-zinc-500 hover:text-white bg-zinc-800/50 hover:bg-zinc-700 transition-colors cursor-pointer rounded-full active:scale-90"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {type !== 'loading' && (
        <div className="h-[2px] w-full bg-white/5 absolute bottom-0 left-0 overflow-hidden">
          <div 
            className={`h-full ${type === 'success' ? 'bg-emerald-500' : 'bg-red-500'} animate-toast-progress`} 
            style={{ animationDuration: `${duration}ms` }}
          />
        </div>
      )}
    </div>
  ), { duration, id: type === 'loading' ? 'loading-toast' : undefined });
};

// --- RAZORPAY SCRIPT LOADER ---
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Subscriptions = () => {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handlePayment = async (packageId: string) => {
    const token = localStorage.getItem("token"); 
    if (!token) {
      showPremiumToast("Authentication Required", "Please login to purchase a subscription.", "error");
      return;
    }

    setLoadingId(packageId);
    showPremiumToast("Secure Checkout", "Initializing payment gateway...", "loading");

    try {
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) throw new Error("Failed to load payment gateway.");

      const orderId = "order_Dummy12345";
      const amount = 149900; 
      const currency = "INR";
      const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_dummy";
      const packageName = "Selected Package";

      toast.dismiss('loading-toast'); 

      const options = {
        key: keyId, 
        amount: amount.toString(),
        currency: currency,
        name: "PrepMaster Premium",
        description: `Upgrade to ${packageName}`,
        order_id: orderId,
        handler: async function (response: any) {
          showPremiumToast("Verifying Payment", "Please do not close this window...", "loading");
          try {
            toast.dismiss('loading-toast');
            showPremiumToast("Payment Successful!", "Welcome to Premium.", "success");
          } catch (err: any) {
            toast.dismiss('loading-toast');
            showPremiumToast("Verification Failed", err.message || "Contact support.", "error");
          }
        },
        prefill: { name: "Student", email: "student@example.com", contact: "9999999999" },
        theme: { color: "#000000" }, 
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();

    } catch (error: any) {
      toast.dismiss('loading-toast');
      showPremiumToast("Checkout Failed", error.message || "Please try again.", "error");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    // FIXED: Changed 'overflow-hidden' to 'overflow-x-hidden' to allow vertical scrolling
    <div className="min-h-[100dvh] w-full py-8 md:py-12 flex flex-col bg-[#09090b] relative overflow-x-hidden selection:bg-violet-500/30">
      <Toaster position="top-center" />
      
      <style>{`
        @keyframes toast-progress {
          0% { width: 100%; }
          100% { width: 0%; }
        }
        .animate-toast-progress {
          animation: toast-progress linear forwards;
        }
      `}</style>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[400px] bg-violet-600/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none"></div>

      <div className="text-center px-4 mb-8 md:mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4 md:mb-5 shadow-sm">
          <Crown className="w-3 h-3 md:w-3.5 md:h-3.5 text-amber-400" />
          <span className="text-[9px] md:text-[10px] font-bold text-gray-300 uppercase tracking-widest">Premium Plans</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2 md:mb-3 drop-shadow-md">
          Elevate Your Preparation.
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
          Choose a plan that fits your goals. Unlimited access, AI analytics, and more. Cancel anytime.
        </p>
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-4 pb-12 relative z-10">
        {/* FIXED: Changed to CSS Grid. Cards now stack vertically on mobile, and display in rows on desktop. */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 place-items-center">
          
          {subscriptionPackages.map((pkg) => (
            <div key={pkg.id} className="w-full max-w-[320px] relative group h-full">
              
              <div className="h-full flex flex-col bg-zinc-900/60 backdrop-blur-md rounded-2xl p-5 md:p-6 border border-white/5 hover:border-white/10 hover:bg-zinc-900/80 transition-all duration-300 relative overflow-hidden">
                
                {pkg.isPopular && (
                  <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest shadow-lg flex items-center">
                    <Sparkles className="w-3 h-3 mr-1" /> Popular
                  </div>
                )}

                <div className="mb-4 md:mb-5 mt-1">
                  <h2 className="text-base md:text-lg font-bold text-white mb-1 pr-16">{pkg.name}</h2>
                  <p className="text-[11px] md:text-xs text-zinc-500 h-8 line-clamp-2 leading-relaxed">{pkg.description}</p>
                </div>
                
                <div className="flex items-end gap-2 mb-1">
                  <span className={`text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r ${pkg.theme}`}>
                    ₹{pkg.discountPrice}
                  </span>
                  <span className="text-[11px] md:text-xs text-zinc-600 line-through font-medium mb-1 md:mb-1.5">₹{pkg.price}</span>
                </div>
                
                <div className="text-[9px] md:text-[10px] font-semibold text-zinc-400 mb-5 md:mb-6 uppercase tracking-wider">
                  Billed for {Math.round(pkg.validityDays / 30)} Months
                </div>

                <button 
                  onClick={() => handlePayment(pkg.id)}
                  disabled={loadingId === pkg.id}
                  className={`w-full h-10 md:h-11 rounded-xl text-xs font-bold flex items-center justify-center transition-all duration-300 cursor-pointer disabled:cursor-not-allowed disabled:opacity-75 active:scale-[0.98] ${
                    pkg.isPopular 
                      ? `bg-gradient-to-r ${pkg.theme} text-white hover:opacity-90 shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] border-none` 
                      : "bg-white/5 text-white hover:bg-white/10 border border-white/5"
                  }`}
                >
                  {loadingId === pkg.id ? <Loader2 className="w-4 h-4 animate-spin" /> : "Subscribe Now"}
                </button>

                <div className="mt-5 md:mt-6 pt-4 md:pt-5 border-t border-white/5 flex-1">
                  <ul className="space-y-3">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-[11px] md:text-xs text-zinc-400 font-medium group-hover:text-zinc-300 transition-colors">
                        <Check className="w-3.5 h-3.5 mr-2 md:mr-2.5 text-zinc-600 group-hover:text-white/60 shrink-0 transition-colors mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default Subscriptions;