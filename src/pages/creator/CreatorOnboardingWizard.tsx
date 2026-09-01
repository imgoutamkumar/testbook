import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Store, 
  ShieldCheck, 
  Landmark, 
  FileSignature, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2,
  UploadCloud,
  AlertCircle,
  Sparkles,
  Heart
} from 'lucide-react';

export default function CreatorOnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const [formData, setFormData] = useState({
    brandName: '', slug: '', bio: '', legalName: '', mobileNumber: '',
    kycDocumentType: 'PAN', kycDocumentNum: '', accountNumber: '', 
    ifscCode: '', accountHolderName: '', acceptedTerms: false
  });

  const steps = [
    { id: 1, title: 'Brand Identity', desc: 'Setup your storefront', icon: Store },
    { id: 2, title: 'KYC Verification', desc: 'Trust & safety', icon: ShieldCheck },
    { id: 3, title: 'Bank Details', desc: 'Get paid automatically', icon: Landmark },
    { id: 4, title: 'Legal Agreement', desc: 'Content protection', icon: FileSignature },
  ];

  const handleNext = () => currentStep < 4 && setCurrentStep(c => c + 1);
  const handleBack = () => currentStep > 1 && setCurrentStep(c => c - 1);
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => { setIsSubmitting(false); setIsComplete(true); }, 2000);
  };

  const pageVariants = {
    initial: { opacity: 0, x: 20, filter: 'blur(8px)' },
    animate: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, x: -20, filter: 'blur(8px)', transition: { duration: 0.3, ease: 'easeIn' } }
  } as const;

  const renderStep1 = () => (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
      <div>
        <h2 className="text-3xl font-black text-white tracking-tight flex items-center gap-2 drop-shadow-[0_2px_10px_rgba(255,0,64,0.4)]">
          Your Storefront 
        </h2>
        <p className="text-neutral-400 text-sm mt-1">Design your premium Valentine-red academy page.</p>
      </div>

      <div className="space-y-5">
        <div className="group">
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 group-focus-within:text-red-500 transition-colors">Academy Name</label>
          <input 
            type="text" name="brandName" value={formData.brandName} onChange={handleChange}
            placeholder="e.g., Sharma Math Academy"
            className="w-full bg-black/40 border border-red-950/80 rounded-2xl px-5 py-4 text-white font-medium focus:border-red-500 focus:ring-4 focus:ring-red-500/20 transition-all placeholder:text-neutral-600 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]"
          />
        </div>
        
        <div className="group">
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 group-focus-within:text-red-500 transition-colors">URL Slug</label>
          <div className="flex rounded-2xl overflow-hidden border border-red-950/80 focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-500/20 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
            <span className="bg-black/80 px-5 py-4 text-neutral-500 border-r border-red-950/80 font-medium">prepmaster.com/c/</span>
            <input 
              type="text" name="slug" value={formData.slug} onChange={handleChange}
              placeholder="sharma-maths"
              className="w-full bg-black/40 px-5 py-4 text-white font-medium outline-none placeholder:text-neutral-600"
            />
          </div>
        </div>

        <div className="border-2 border-dashed border-red-950 rounded-2xl p-8 text-center hover:bg-red-950/10 hover:border-red-500/50 transition-all cursor-pointer group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-rose-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <UploadCloud className="mx-auto h-10 w-10 text-neutral-600 group-hover:text-red-500 transition-colors mb-3 relative z-10" />
          <p className="text-sm text-white font-semibold relative z-10">Drop your logo here, or <span className="text-red-500">browse</span></p>
          <p className="text-xs text-neutral-500 mt-1 relative z-10">High-res PNG or JPG (Max 2MB)</p>
        </div>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
      <div>
        <h2 className="text-3xl font-black text-white tracking-tight">KYC Verification</h2>
        <p className="text-neutral-400 text-sm mt-1">Bank-grade security to protect your payouts.</p>
      </div>

      <div className="space-y-5">
        <div className="group">
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 group-focus-within:text-red-500 transition-colors">Full Legal Name</label>
          <input 
            type="text" name="legalName" value={formData.legalName} onChange={handleChange}
            placeholder="Exactly as per your government ID"
            className="w-full bg-black/40 border border-red-950/80 rounded-2xl px-5 py-4 text-white font-medium focus:border-red-500 focus:ring-4 focus:ring-red-500/20 transition-all placeholder:text-neutral-600 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-1 group">
            <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 group-focus-within:text-red-500 transition-colors">ID Type</label>
            <select 
              name="kycDocumentType" value={formData.kycDocumentType} onChange={handleChange}
              className="w-full bg-black/40 border border-red-950/80 rounded-2xl px-5 py-4 text-white font-medium focus:border-red-500 outline-none appearance-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] cursor-pointer"
            >
              <option value="PAN" className="bg-neutral-900">PAN Card</option>
              <option value="AADHAAR" className="bg-neutral-900">Aadhaar</option>
              <option value="PASSPORT" className="bg-neutral-900">Passport</option>
            </select>
          </div>
          <div className="sm:col-span-2 group">
            <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 group-focus-within:text-red-500 transition-colors">ID Number</label>
            <input 
              type="text" name="kycDocumentNum" value={formData.kycDocumentNum} onChange={handleChange}
              placeholder="e.g., ABCDE1234F"
              className="w-full bg-black/40 border border-red-950/80 rounded-2xl px-5 py-4 text-white font-medium focus:border-red-500 focus:ring-4 focus:ring-red-500/20 transition-all placeholder:text-neutral-600 uppercase shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
      <div>
        <h2 className="text-3xl font-black text-white tracking-tight">Payout Details</h2>
        <p className="text-neutral-400 text-sm mt-1">Connect your bank to receive automated 80% splits.</p>
      </div>

      <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-r from-red-950/40 to-black border border-red-900/40 flex gap-4 items-start shadow-[0_0_20px_rgba(255,0,0,0.1)]">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-rose-600/10 animate-pulse"></div>
        <AlertCircle className="text-red-500 shrink-0 mt-0.5 relative z-10" size={20} />
        <p className="text-sm text-red-200/90 leading-relaxed relative z-10">
          Powered by <strong>Razorpay Route</strong>. Your earnings are securely held for 7 days post-sale to handle any student disputes, then auto-settled to this account.
        </p>
      </div>

      <div className="space-y-5">
        <div className="group">
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 group-focus-within:text-red-500 transition-colors">Account Holder Name</label>
          <input 
            type="text" name="accountHolderName" value={formData.accountHolderName} onChange={handleChange}
            className="w-full bg-black/40 border border-red-950/80 rounded-2xl px-5 py-4 text-white font-medium focus:border-red-500 focus:ring-4 focus:ring-red-500/20 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]"
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="group">
            <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 group-focus-within:text-red-500 transition-colors">Account Number</label>
            <input 
              type="password" name="accountNumber" value={formData.accountNumber} onChange={handleChange}
              className="w-full bg-black/40 border border-red-950/80 rounded-2xl px-5 py-4 text-white font-medium focus:border-red-500 focus:ring-4 focus:ring-red-500/20 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] font-mono tracking-widest"
            />
          </div>
          <div className="group">
            <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 group-focus-within:text-red-500 transition-colors">IFSC Code</label>
            <input 
              type="text" name="ifscCode" value={formData.ifscCode} onChange={handleChange}
              placeholder="SBIN0001234"
              className="w-full bg-black/40 border border-red-950/80 rounded-2xl px-5 py-4 text-white font-medium focus:border-red-500 focus:ring-4 focus:ring-red-500/20 transition-all uppercase placeholder:text-neutral-600 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderStep4 = () => (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
      <div>
        <h2 className="text-3xl font-black text-white tracking-tight">Creator Agreement</h2>
        <p className="text-neutral-400 text-sm mt-1">Review our platform policies before going live.</p>
      </div>

      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none rounded-2xl z-10 h-64"></div>
        <div className="bg-black/40 border border-red-950/80 rounded-2xl p-6 h-64 overflow-y-auto text-sm text-neutral-400 space-y-5 custom-scrollbar shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] relative">
          <h3 className="text-white font-bold text-base">Safe Harbor & Anti-Piracy Policy</h3>
          <p className="leading-relaxed">1. <strong>Content Ownership:</strong> You retain full ownership of the intellectual property rights to the content you upload.</p>
          <p className="leading-relaxed">2. <strong>Originality Declaration:</strong> By accepting, you explicitly declare that all questions, mocks, and materials uploaded are your original creation.</p>
          <p className="leading-relaxed">3. <strong>Revenue Split:</strong> PrepMaster deducts a 20% platform fee on the final transaction. The remaining 80% is transferred to your linked bank account after a 7-day settlement hold.</p>
          <p className="leading-relaxed text-red-400/90">4. <strong>Zero Tolerance:</strong> We reserve the right to suspend creator privileges and withhold funds if copyrighted material belonging to third-parties is detected.</p>
          <div className="h-10"></div>
        </div>
      </div>

      <label className="group flex items-start gap-4 p-5 bg-black/30 border border-red-950/80 rounded-2xl cursor-pointer hover:bg-red-950/10 hover:border-red-500/50 transition-all">
        <div className="relative flex items-center pt-0.5">
          <input 
            type="checkbox" name="acceptedTerms" checked={formData.acceptedTerms} onChange={handleChange}
            className="w-6 h-6 peer appearance-none border-2 border-red-900 rounded-lg cursor-pointer checked:bg-red-600 checked:border-red-500 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]"
          />
          <CheckCircle2 className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none w-6 h-6 scale-50 peer-checked:scale-100 transition-all duration-300" />
        </div>
        <span className="text-sm text-neutral-300 font-medium leading-relaxed group-hover:text-white transition-colors">
          I legally declare that I own all content I upload, and I fully accept the PrepMaster Creator Terms of Service.
        </span>
      </label>
    </motion.div>
  );

  if (isComplete) {
    return (
      <div className="min-h-screen bg-[#030000] flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', bounce: 0.5 }}
          className="max-w-md w-full bg-gradient-to-b from-neutral-900/90 to-black backdrop-blur-3xl border border-red-600/40 rounded-[2rem] p-10 text-center shadow-[0_0_120px_rgba(255,0,64,0.3)] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-600/20 via-transparent to-transparent pointer-events-none"></div>
          <div className="w-24 h-24 bg-gradient-to-tr from-red-600 to-rose-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_50px_rgba(255,0,64,0.6)] relative z-10 border border-white/20">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-3xl font-black text-white mb-3 relative z-10">You're All Set!</h2>
          <p className="text-neutral-400 mb-10 text-sm leading-relaxed relative z-10">
            Your Razorpay account is securely linked. Our team is verifying your KYC documents. You will receive an approval email within 24 hours.
          </p>
          <button onClick={() => window.location.href = "/creator/dashboard"} className="w-full py-4 bg-gradient-to-r from-red-600 via-rose-600 to-red-500 text-white hover:brightness-110 rounded-2xl font-bold transition-all shadow-[0_4px_25px_rgba(255,0,64,0.4)] relative z-10 active:scale-95">
            Enter Creator Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#030000] text-neutral-200 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden selection:bg-red-600 selection:text-white">
      
      {/* Seductive Valentine Glossy Red Ambient Glows */}
      <div className="absolute top-[-10%] left-1/4 w-[700px] h-[700px] bg-red-600/15 rounded-full blur-[180px] pointer-events-none animate-pulse duration-[5000ms]"></div>
      <div className="absolute bottom-[-10%] right-1/4 w-[600px] h-[600px] bg-rose-700/10 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="max-w-6xl w-full relative z-10">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-red-200 to-red-600 tracking-tight mb-3 drop-shadow-[0_5px_15px_rgba(255,0,64,0.3)]">
            Monetize Your Teaching
          </h1>
          <p className="text-neutral-400 font-medium tracking-wide">Join PrepMaster's elite creator network.</p>
        </div>

        {/* Main Glass Box with Metallic Glossy Red border highlight */}
        <div className="bg-gradient-to-b from-neutral-900/80 to-black/90 backdrop-blur-3xl border border-red-900/40 rounded-[2.5rem] shadow-[0_20px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(255,0,64,0.15)] flex flex-col md:flex-row min-h-[600px] overflow-hidden relative">
          
          {/* Subtle top metallic light reflection line */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/60 to-transparent pointer-events-none"></div>

          {/* LEFT SIDEBAR: Stepper */}
          <div className="w-full md:w-[35%] bg-black/60 p-8 md:p-12 border-b md:border-b-0 md:border-r border-red-950/60 relative">
            <div className="space-y-10 relative z-10">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isPassed = currentStep > step.id;

                return (
                  <div key={step.id} className="relative flex items-start gap-5 group">
                    {/* Glowing Connecting Line */}
                    {index !== steps.length - 1 && (
                      <div className="absolute top-12 left-[1.35rem] bottom-[-2.5rem] w-0.5">
                        <div className={`w-full h-full transition-all duration-700 ${isPassed ? 'bg-gradient-to-b from-red-600 to-rose-600 shadow-[0_0_10px_rgba(255,0,64,0.8)]' : 'bg-neutral-900'}`}></div>
                      </div>
                    )}
                    
                    {/* Step Icon with Glossy Red Treatment */}
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border transition-all duration-500 z-10 ${
                      isActive ? 'bg-gradient-to-br from-red-500 via-red-600 to-rose-700 border-red-400/60 text-white shadow-[0_0_30px_rgba(255,0,64,0.6)] scale-110' :
                      isPassed ? 'bg-red-950/60 border-red-800/50 text-red-400 shadow-[0_0_10px_rgba(255,0,64,0.2)]' :
                      'bg-black border-neutral-900 text-neutral-600'
                    }`}>
                      {isPassed ? <CheckCircle2 size={20} className="text-red-400" /> : <Icon size={20} />}
                    </div>

                    <div className="mt-1">
                      <p className={`text-xs font-bold uppercase tracking-widest mb-1 transition-colors ${isActive ? 'text-red-500' : 'text-neutral-600'}`}>
                        Step 0{step.id}
                      </p>
                      <p className={`text-base font-semibold transition-colors ${isActive ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]' : 'text-neutral-500'}`}>
                        {step.title}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT CONTENT AREA */}
          <div className="w-full md:w-[65%] p-8 md:p-14 flex flex-col relative bg-gradient-to-br from-red-950/10 via-transparent to-black">
            
            <div className="flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                <React.Fragment key={currentStep}>
                  {currentStep === 1 && renderStep1()}
                  {currentStep === 2 && renderStep2()}
                  {currentStep === 3 && renderStep3()}
                  {currentStep === 4 && renderStep4()}
                </React.Fragment>
              </AnimatePresence>
            </div>

            {/* Footer Controls */}
            <div className="mt-12 pt-8 border-t border-red-950/60 flex items-center justify-between">
              <button 
                onClick={handleBack} disabled={currentStep === 1}
                className={`px-6 py-3 rounded-2xl font-semibold text-sm transition-all flex items-center gap-2 ${
                  currentStep === 1 ? 'opacity-0 pointer-events-none' : 'text-neutral-400 hover:text-white hover:bg-red-950/30 active:scale-95'
                }`}
              >
                <ChevronLeft size={18} /> Back
              </button>

              {currentStep < 4 ? (
                <button 
                  onClick={handleNext}
                  className="px-8 py-3.5 bg-gradient-to-r from-white via-neutral-100 to-neutral-200 hover:brightness-95 text-black rounded-2xl font-bold text-sm transition-all shadow-[0_4px_20px_rgba(255,255,255,0.2)] flex items-center gap-2 active:scale-95"
                >
                  Continue <ChevronRight size={18} />
                </button>
              ) : (
                <button 
                  onClick={handleSubmit} disabled={!formData.acceptedTerms || isSubmitting}
                  className={`px-8 py-3.5 bg-gradient-to-r from-red-600 via-rose-600 to-red-500 text-white rounded-2xl font-bold text-sm transition-all flex items-center gap-2 active:scale-95 ${
                    (!formData.acceptedTerms || isSubmitting) ? 'opacity-50 cursor-not-allowed saturate-0' : 'hover:shadow-[0_0_35px_rgba(255,0,64,0.6)] hover:scale-[1.02]'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Submit Application <Sparkles size={18} /></>
                  )}
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}