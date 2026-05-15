"use client";

import React from 'react';
import { 
  Users, 
  ShieldCheck, 
  PhoneCall, 
  TrendingUp,
  ArrowUpRight,
  UserPlus,
  Activity,
  AlertCircle
} from 'lucide-react';

const stats = [
  { label: 'মোট ইউজার', value: '২০.৫M', growth: '+৫.২%', icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'সক্রিয় কমিটি', value: '১২,৫৪০', growth: '+১.৮%', icon: ShieldCheck, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'মোট কল রেকর্ডস', value: '৮৫,৪০০', growth: '+১২%', icon: PhoneCall, color: 'text-purple-600', bg: 'bg-purple-50' },
  { label: 'রিপোর্ট/অভিযোগ', value: '১২৪', growth: '-৫%', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
];

const recentUsers = [
  { name: 'আরিফ রহমান', area: 'মিরপুর, ঢাকা', role: 'মেম্বার', time: '২ মিনিট আগে' },
  { name: 'সাদিয়া ইসলাম', area: 'গুলশান, ঢাকা', role: 'প্রার্থী', time: '১০ মিনিট আগে' },
  { name: 'কামাল হোসেন', area: 'উত্তরা, ঢাকা', role: 'মেম্বার', time: '১৫ মিনিট আগে' },
  { name: 'রকিবুল হাসান', area: 'বনানী, ঢাকা', role: 'ভোটার', time: '২৫ মিনিট আগে' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      
      {/* Welcome Heading */}
      <div>
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">স্বাগতম, সুপার অ্যাডমিন!</h1>
        <p className="text-slate-500 mt-1">পুরো সিস্টেমের রিয়েল-টাইম ওভারভিউ এখানে দেখুন।</p>
      </div>

      {/* Summary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-2xl font-black text-slate-800">{stat.value}</h3>
              <p className={`text-[11px] font-bold mt-1 ${stat.growth.startsWith('+') ? 'text-green-600' : 'text-rose-600'}`}>{stat.growth} এই সপ্তাহে</p>
            </div>
            <div className={`h-14 w-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
              <stat.icon className="h-7 w-7" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* User Activity List */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h5 className="text-[16px] font-bold text-slate-800 flex items-center">
              <Activity className="h-4 w-4 mr-2 text-green-600" /> সাম্প্রতিক ইউজার অ্যাক্টিভিটি
            </h5>
            <button className="text-[12px] font-bold text-[#1B5E20] hover:underline flex items-center">
              সব দেখুন <ArrowUpRight className="h-3 w-3 ml-1" />
            </button>
          </div>
          <div className="divide-y divide-slate-50">
            {recentUsers.map((user, i) => (
              <div key={i} className="px-8 py-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400 border border-slate-200">{user.name.charAt(0)}</div>
                  <div>
                    <p className="text-[14px] font-bold text-slate-800">{user.name}</p>
                    <p className="text-[12px] text-slate-400">{user.area} • {user.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-semibold text-slate-400">{user.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Service Status Sidebar */}
        <div className="space-y-6">
           <div className="bg-[#1B5E20] rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute -bottom-4 -right-4 opacity-10">
                 <ShieldCheck size={120} />
              </div>
              <h5 className="text-xl font-bold mb-3">সিস্টেম সিকিউরিটি</h5>
              <p className="text-[13px] text-green-100 mb-6 leading-relaxed">সবগুলো মাইক্রোসার্ভিস বর্তমানে "সক্রিয়" অবস্থায় আছে এবং কোনো সিকিউরিটি থ্রেট নেই।</p>
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-xl w-fit">
                 <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                 <span className="text-xs font-bold uppercase">All Services Healthy</span>
              </div>
           </div>

           <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h5 className="text-[15px] font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center">
                <UserPlus className="h-4 w-4 mr-2 text-blue-600" /> কুইক অ্যাকশন
              </h5>
              <div className="grid grid-cols-2 gap-3">
                 <button className="p-4 bg-blue-50 text-blue-600 rounded-xl flex flex-col items-center justify-center hover:bg-blue-100 transition-colors">
                    <Users className="h-6 w-6 mb-2" />
                    <span className="text-[10px] font-bold uppercase">নতুন এডমিন</span>
                 </button>
                 <button className="p-4 bg-orange-50 text-orange-600 rounded-xl flex flex-col items-center justify-center hover:bg-orange-100 transition-colors">
                    <AlertCircle className="h-6 w-6 mb-2" />
                    <span className="text-[10px] font-bold uppercase">রিপোর্ট চেক</span>
                 </button>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
