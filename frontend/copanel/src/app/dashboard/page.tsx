"use client";

import React from 'react';
import { 
  Users, 
  MapPin, 
  ClipboardCheck, 
  TrendingUp,
  ExternalLink,
  PlusCircle,
  FileText,
  LogOut,
  User,
  ChevronDown,
  ShieldCheck
} from 'lucide-react';
import { useRouter } from 'next/navigation';


const stats = [
  { label: 'মোট কমিটি', value: '১,২৪২', growth: '+১২%', icon: MapPin, color: 'text-teal-600', bg: 'bg-teal-50' },
  { label: 'সক্রিয় মেম্বার', value: '১২,৫০৪', growth: '+৮%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'পেন্ডিং অডিট', value: '৪৫', growth: '-২%', icon: ClipboardCheck, color: 'text-orange-600', bg: 'bg-orange-50' },
  { label: 'কভারেজ হার', value: '৮৫.৪%', growth: '+৪%', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
];

const committees = [
  { id: 1, name: 'মিরপুর ২ নং ওয়ার্ড কমিটি', level: 'ওয়ার্ড', members: 71, status: 'সক্রিয়' },
  { id: 2, name: 'গুলশান থানা শাখা', level: 'থানা', members: 42, status: 'পেন্ডিং অডিট' },
  { id: 3, name: 'উত্তরা সেক্টর ৪ কমিটি', level: 'ওয়ার্ড', members: 15, status: 'সক্রিয়' },
  { id: 4, name: 'বনানী ডিওএইচএস কমিটি', level: 'ওয়ার্ড', members: 29, status: 'সক্রিয়' },
];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    
    if (!token || !userData) {
      router.replace("/login");
    } else {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.replace("/login");
  };

  if (!user) return null;

  return (
    <div className="space-y-6">
      
      {/* Top Navigation Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-teal-500/10 p-2 rounded-lg">
            <ShieldCheck className="w-5 h-5 text-teal-600" />
          </div>
          <h2 className="text-lg font-bold text-slate-800">কমিটি ম্যানেজমেন্ট প্যানেল</h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-100">
            <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
              {user.first_name?.charAt(0) || 'U'}
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-bold text-slate-800 leading-tight">{user.first_name} {user.last_name}</p>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{user.user_type === 'member' ? 'কমিটি মেম্বার' : user.user_type}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>

          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl font-bold text-xs transition-all border border-red-100"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">লগআউট</span>
          </button>
        </div>
      </div>
      
      {/* bdnagorik Original Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[12px] font-bold text-slate-500 uppercase tracking-wide mb-1">{stat.label}</p>
              <h3 className="text-2xl font-black text-slate-800">{stat.value}</h3>
              <p className="text-[11px] font-semibold text-green-600 mt-1">{stat.growth} এই মাসে</p>
            </div>
            <div className={`h-12 w-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center`}>
              <stat.icon className="h-6 w-6" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Committees Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h5 className="text-[15px] font-bold text-slate-800">সাম্প্রতিক কমিটিসমূহ</h5>
            <button className="text-[12px] font-bold text-[#00695C] flex items-center hover:underline">
              <PlusCircle className="h-4 w-4 mr-1" /> নতুন কমিটি তৈরি
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                  <th className="px-6 py-3">কমিটির নাম</th>
                  <th className="px-6 py-3">লেভেল</th>
                  <th className="px-6 py-3">মেম্বার</th>
                  <th className="px-6 py-3">অবস্থা</th>
                  <th className="px-6 py-3 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {committees.map((com) => (
                  <tr key={com.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-[#E0F2F1] text-[#00695C] rounded-lg flex items-center justify-center mr-3 font-bold text-xs">
                          {com.name.charAt(0)}
                        </div>
                        <span className="text-[14px] font-bold text-slate-700">{com.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[13px] text-slate-600 font-medium">{com.level}</td>
                    <td className="px-6 py-4 text-[13px] font-bold text-slate-700">{com.members} জন</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        com.status === 'সক্রিয়' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {com.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <button className="text-slate-400 hover:text-[#00695C] transition-colors"><ExternalLink className="h-4 w-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-3 bg-slate-50 text-center">
            <button className="text-[12px] font-bold text-[#00695C] hover:underline">সব কমিটি দেখুন</button>
          </div>
        </div>

        {/* Quick Info Sidebar */}
        <div className="space-y-6">
           <div className="bg-[#004D40] rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
              <div className="absolute -bottom-4 -right-4 opacity-10">
                 <TrendingUp size={100} />
              </div>
              <h5 className="text-[16px] font-bold mb-2">কভারেজ বাড়ান!</h5>
              <p className="text-[12px] text-teal-100 mb-4 leading-relaxed">আপনার এলাকায় এখনও ৩টি গুরুত্বপূর্ণ পয়েন্টে কমিটি গঠন করা বাকি আছে।</p>
              <button className="w-full py-2.5 bg-[#00897B] rounded-lg font-bold text-sm hover:bg-[#00796B] transition-all">অসম্পূর্ণ ওয়ার্ড দেখুন</button>
           </div>

           <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-50">
                 <h5 className="text-[14px] font-bold text-slate-800">পরবর্তী মিটিং</h5>
                 <span className="h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
              </div>
              <div className="flex items-center space-x-3">
                 <div className="h-10 w-10 bg-teal-50 rounded-lg flex flex-col items-center justify-center text-[#00695C]">
                    <span className="text-[9px] font-bold uppercase">মে</span>
                    <span className="text-sm font-black leading-none">১০</span>
                 </div>
                 <div>
                    <h6 className="text-[13px] font-bold text-slate-700">সাংগঠনিক সমন্বয় সভা</h6>
                    <p className="text-[11px] text-slate-400 mt-0.5 flex items-center">
                       বিকাল ৪:৩০ • জুম মিটিং
                    </p>
                 </div>
              </div>
           </div>

           <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <h5 className="text-[14px] font-bold text-slate-800 mb-4 pb-2 border-b border-slate-50">গুরুত্বপূর্ণ ফাইল</h5>
              <div className="space-y-3">
                 <div className="flex items-center justify-between text-[12px] p-2 hover:bg-slate-50 rounded-lg cursor-pointer">
                    <div className="flex items-center">
                       <FileText className="h-4 w-4 mr-2 text-orange-500" />
                       <span className="font-semibold text-slate-600">গঠনতন্ত্র_v2.pdf</span>
                    </div>
                    <ExternalLink className="h-3 w-3 text-slate-300" />
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}

