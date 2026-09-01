import React, { useState, useEffect } from "react";
import { 
  Camera, 
  Edit2, 
  Save, 
  X, 
  Mail, 
  Phone, 
  MapPin, 
  User, 
  Award, 
  BookOpen, 
  Clock 
} from "lucide-react";
import { useGetUserQuery, useLogoutMutation } from "@/redux/services/authApi";

export default function UserProfile() {
  // ==========================================
  // 1. ALL HOOKS AT THE VERY TOP
  // ==========================================
  const [isEditing, setIsEditing] = useState(false);
  const { data: auth, isLoading, isError } = useGetUserQuery();
  const [logout] = useLogoutMutation();
  const user = auth?.data;

  // Initialize state with safe fallbacks so it doesn't crash before 'user' loads
  const [profile, setProfile] = useState({
    name: "Loading...",
    email: "Loading...",
    phone: "+91 98765 43210",
    location: "xxx, xxxx",
    bio: "Passionate learner and software developer.",
    role: "Loading...",
    joinedAt: "MM YYYY",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Guest", 
  });

  // Watch for 'user' data to arrive, then instantly update the form state
  useEffect(() => {
    if (user) {
      setProfile((prev) => ({
        ...prev,
        name: user.name || "Guest User",
        email: user.email || "xyz123@gmail.com",
        role: user.role || "xxxxx",
        joinedAt: user.createdAt?.split('T')[0] || "MM YYYY",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name || 'Guest'}`, 
      }));
    }
  }, [user]);

  // Mock Stats
  const stats = [
    { label: "Tests Taken", value: "142", icon: BookOpen, color: "text-blue-400" },
    { label: "Avg Score", value: "84%", icon: Award, color: "text-purple-400" },
    { label: "Study Hours", value: "320h", icon: Clock, color: "text-emerald-400" },
  ];

  // Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // TRIGGER YOUR RTK QUERY MUTATION HERE
    // e.g., updateProfile(profile).unwrap().then(...)
    console.log("Saving profile data:", profile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset back to Redux state if they cancel
    if (user) {
      setProfile((prev) => ({
        ...prev,
        name: user.name || "Guest User",
        phone: "+91 98765 43210", // Reset to DB phone
        location: "xxx, xxxx",    // Reset to DB location
        bio: "Passionate learner and software developer.",
      }));
    }
    setIsEditing(false);
  };


  // ==========================================
  // 2. EARLY RETURNS (AFTER HOOKS)
  // ==========================================
  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-[#0B1121] flex flex-col items-center justify-center text-slate-200">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500 mb-4"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-[#0B1121] flex items-center justify-center text-red-400">
        Failed to load profile. Please refresh or log in again.
      </div>
    );
  }


  // ==========================================
  // 3. UI RENDER
  // ==========================================
  return (
    <div className="min-h-screen bg-[#0B1121] text-slate-200 py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-indigo-500/30">
      <div className="max-w-5xl mx-auto">
        
        {/* Main Profile Card */}
        <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/5 rounded-3xl overflow-hidden shadow-2xl shadow-indigo-900/20">
          
          {/* Cover Banner */}
          <div className="h-48 sm:h-64 bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 relative overflow-hidden">
            {/* Abstract Background Elements */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute top-12 -right-12 w-48 h-48 bg-black/20 rounded-full blur-2xl"></div>
          </div>

          {/* Profile Content */}
          <div className="px-6 sm:px-12 pb-12">
            
            {/* Header / Avatar Section */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end sm:justify-between -mt-20 sm:-mt-24 mb-8 sm:mb-12 relative z-10 gap-6">
              
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 text-center sm:text-left">
                {/* Avatar */}
                <div className="relative group">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-slate-900 bg-slate-800 overflow-hidden shadow-xl">
                    <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-2 right-2 bg-indigo-500 hover:bg-indigo-600 p-2.5 rounded-full text-white shadow-lg transition-transform hover:scale-110">
                      <Camera size={18} />
                    </button>
                  )}
                </div>

                {/* Name & Role */}
                <div className="mb-2">
                  <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    {profile.name} 
                  </h1>
                  <div className="flex items-center justify-center sm:justify-start gap-3 mt-2">
                    <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-xs font-semibold tracking-wider">
                      {profile.role}
                    </span>
                    <span className="text-sm text-slate-400">Joined {profile.joinedAt}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                {isEditing ? (
                  <>
                    <button 
                      onClick={handleCancel}
                      className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-medium transition-all flex items-center gap-2 border border-white/5"
                    >
                      <X size={16} /> Cancel
                    </button>
                    <button 
                      onClick={handleSave}
                      className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-indigo-500/25 flex items-center gap-2"
                    >
                      <Save size={16} /> Save Changes
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl text-sm font-medium transition-all backdrop-blur-md flex items-center gap-2"
                  >
                    <Edit2 size={16} /> Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column: Editable Details */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-slate-800/30 border border-white/5 rounded-2xl p-6 sm:p-8">
                  <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <User className="text-indigo-400" size={20} /> Personal Information
                  </h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="sm:col-span-2">
                    <InputField 
                      icon={User} label="Name" name="name" 
                      value={profile.name} isEditing={isEditing} onChange={handleInputChange} 
                    />
                    </div>
                    <InputField 
                      icon={Mail} label="Email Address" name="email" 
                      value={profile.email} isEditing={false} onChange={handleInputChange} 
                      tooltip="Email cannot be changed"
                    />
                    <InputField 
                      icon={Phone} label="Phone Number" name="phone" 
                      value={profile.phone} isEditing={isEditing} onChange={handleInputChange} 
                    />
                    <div className="sm:col-span-2">
                      <InputField 
                        icon={MapPin} label="Location" name="location" 
                        value={profile.location} isEditing={isEditing} onChange={handleInputChange} 
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-slate-400 mb-1.5">Bio</label>
                      {isEditing ? (
                        <textarea
                          name="bio"
                          value={profile.bio}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
                        />
                      ) : (
                        <p className="text-slate-300 leading-relaxed bg-slate-900/20 px-4 py-3 border border-transparent rounded-xl">
                          {profile.bio}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Stats & Extras */}
              <div className="space-y-6">
                {/* Stats Card */}
                <div className="bg-slate-800/30 border border-white/5 rounded-2xl p-6 sm:p-8">
                  <h2 className="text-lg font-semibold text-white mb-6">Platform Statistics</h2>
                  <div className="space-y-4">
                    {stats.map((stat, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-white/5">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-slate-800 ${stat.color}`}>
                            <stat.icon size={18} />
                          </div>
                          <span className="text-slate-400 font-medium text-sm">{stat.label}</span>
                        </div>
                        <span className="text-xl font-bold text-white">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Security / Quick Actions (Optional) */}
                <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/10 rounded-2xl p-6 sm:p-8 text-center">
                  <h3 className="text-white font-medium mb-2">Need to update your password?</h3>
                  <p className="text-sm text-slate-400 mb-4">Ensure your account uses a long, random password to stay secure.</p>
                  <button className="w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-indigo-300 font-medium text-sm transition-all">
                    Change Password
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// Reusable Input Component to keep code clean
// ----------------------------------------------------------------------
function InputField({ icon: Icon, label, name, value, isEditing, onChange, tooltip }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-400 mb-1.5 flex items-center justify-between">
        {label}
        {tooltip && <span className="text-[10px] text-slate-500 uppercase tracking-wider">{tooltip}</span>}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <Icon size={16} className={isEditing && name !== 'email' ? 'text-indigo-400' : 'text-slate-500'} />
        </div>
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          disabled={!isEditing}
          className={`w-full pl-10 pr-4 py-2.5 rounded-xl transition-all ${
            isEditing && name !== 'email'
              ? "bg-slate-900/50 border border-indigo-500/50 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              : "bg-slate-900/20 border border-transparent text-slate-300 cursor-not-allowed"
          }`}
        />
      </div>
    </div>
  );
}