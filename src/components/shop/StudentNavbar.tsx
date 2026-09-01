import React, { useState, useEffect, useRef } from "react";
import { Bell, Sparkles, Timer, ArrowRight, LogIn, User, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar"; 
import { authApi, useGetUserQuery } from "@/redux/services/authApi";
import { useDispatch } from 'react-redux';

const StudentNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Added isError to check if the token/login has expired
  const { data: auth, isLoading, isError } = useGetUserQuery();
  const user = auth?.data;
  
  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem("role");
  
  // Simple countdown timer logic for the offer
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 45,
    seconds: 0,
  });

  // --- NEW: Dropdown State & Ref ---
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // --- NEW: Handle Click Outside to close dropdown ---
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- NEW: Logout Function ---
  const handleLogout = async () => {
    // 1. Clear Browser Storage Cache
    localStorage.clear(); 
    sessionStorage.clear(); 

    // 2. Clear RTK Query Memory Cache
    dispatch(authApi.util.resetApiState());
    
    setIsDropdownOpen(false);

    // 3. Redirect
    window.location.href = "/auth/login"; 
  };

  // --- NEW: Auto-logout if session expires ---
  useEffect(() => {
    // If local storage says we are logged in, but the API returns an error or no user data, the session expired.
    if (isLoggedIn && (isError || (!isLoading && !user))) {
      handleLogout();
    }
  }, [isLoggedIn, isError, isLoading, user]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) days--;
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="w-full h-16 border-b border-gray-100 bg-white/95 backdrop-blur-sm sticky top-0 flex items-center justify-between px-4 sm:px-6 shrink-0 relative z-20 shadow-sm">
      
      {/* Left Side: Mobile Menu Trigger + Flash Sale Banner */}
      <div className="flex items-center gap-3 sm:gap-5">
        
        {/* Shadcn Mobile Sidebar Trigger */}
        <SidebarTrigger className="text-slate-500 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors -ml-2" />

        {/* FESTIVAL OFFER BANNER (Clickable Pill) */}
        <Link 
          to="/subscriptions" 
          className="relative group overflow-hidden rounded-full p-[1px] cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_20px_rgba(225,29,72,0.12)] block bg-white"
        >
          <span className="absolute -inset-[200%] bg-gradient-to-r from-rose-500 via-amber-300 to-red-600 opacity-70 group-hover:opacity-100 animate-[spin_4s_linear_infinite]" />
          
          <div className="relative flex items-center gap-2 sm:gap-3 bg-white px-2 sm:px-4 py-1.5 rounded-full h-full w-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
            <div className="flex items-center justify-center bg-red-50 text-red-600 rounded-full p-1.5">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" strokeWidth={2.5} />
            </div>
            
            <div className="hidden sm:flex items-center gap-2.5">
              <span className="text-[13px] font-black bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-rose-600 tracking-tight">
                Diwali Sale
              </span>
              <span className="w-px h-3 bg-gray-200" />
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">
                Unlock 50% Off
              </span>
            </div>

            <div className="flex items-center gap-1.5 bg-gray-50/80 px-2 sm:px-2.5 py-1 rounded-full border border-gray-100/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] sm:ml-2">
              <Timer className="w-3.5 h-3.5 text-red-500 hidden sm:block" />
              <span className="text-[10px] sm:text-[11px] font-extrabold text-red-700 tabular-nums tracking-tight">
                {String(timeLeft.days).padStart(2, '0')}d : {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m
              </span>
            </div>

            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all duration-300 ml-0 sm:ml-1 hidden xs:block" />
          </div>
        </Link>
      </div>

      {/* Right Side: Profile / Login */}
      <div className="flex items-center gap-3 sm:gap-5">
        
        {isLoggedIn ? (
          <>
            {/* LOGGED IN: Show Notifications */}
            <button className="text-gray-400 hover:text-indigo-600 transition-colors relative cursor-pointer hidden sm:block">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white animate-pulse"></span>
            </button>
            
            {/* Profile Dropdown Wrapper */}
            <div className="relative" ref={dropdownRef}>
              
              {/* Trigger */}
              <div 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-sm font-bold text-slate-800 leading-none">{user?.name || "Guest"}</span>
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider mt-1">Pro Member</span>
                </div>
                <Avatar className="h-8 w-8 sm:h-9 sm:w-9 ring-2 ring-indigo-50 group-hover:ring-indigo-200 transition-all">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback className="bg-indigo-50 text-indigo-700 font-bold">RS</AvatarFallback>
                </Avatar>
              </div>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white border border-slate-100 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] py-1.5 z-50 transform origin-top-right transition-all animate-in fade-in zoom-in-95 duration-200">
                  
                  {/* Mobile-only header */}
                  <div className="md:hidden px-4 py-2 mb-1 border-b border-slate-50">
                    <p className="text-sm font-bold text-slate-800">{user?.name || "Guest"}</p>
                    <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider mt-0.5">Pro Member</p>
                  </div>

                  <Link 
                    to="/profile" 
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/50 transition-colors"
                  >
                    <User className="w-4 h-4 text-slate-400 group-hover:text-indigo-500" />
                    View Profile
                  </Link>
                  
                  <div className="h-px w-full bg-slate-100 my-1" />
                  
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* NOT LOGGED IN: Show Premium Sign In Button */}
            <Link 
              to="/auth/login" 
              className="group relative flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-white rounded-full overflow-hidden transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_8px_24px_-6px_rgba(79,70,229,0.6)] bg-gradient-to-r from-indigo-600 to-violet-600"
            >
              <div className="absolute inset-0 rounded-full border border-white/20 z-10" />
              <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-30deg] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out z-0" />
              
              <LogIn className="w-3.5 h-3.5 sm:w-4 sm:h-4 z-10 text-indigo-100 group-hover:text-white transition-colors" />
              <span className="z-10 tracking-wide">Sign In</span>
              
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 z-10 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 hidden sm:block" />
            </Link>
          </>
        )}

      </div>
    </header>
  );
};

export default StudentNavbar;