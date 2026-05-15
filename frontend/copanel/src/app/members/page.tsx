"use client";

import React from 'react';
import { Users, Filter, Download, UserPlus, Phone, BadgeCheck, ShieldAlert, MoreHorizontal, Search } from 'lucide-react';

const members = [
  { name: 'আরিফ রহমান', position: 'আহ্বায়ক', phone: '01700-000000', status: 'ভেরিফাইড', joined: '১২ জানুয়ারি, ২০২৪', initial: 'আ' },
  { name: 'হাসান মাহমুদ', position: 'যুগ্ম আহ্বায়ক', phone: '01800-000000', status: 'ভেরিফাইড', joined: '১৫ জানুয়ারি, ২০২৪', initial: 'হা' },
  { name: 'সাদিয়া ইসলাম', position: 'সদস্য সচিব', phone: '01900-000000', status: 'পেন্ডিং', joined: '২০ জানুয়ারি, ২০২৪', initial: 'সা' },
  { name: 'কামাল হোসেন', position: 'কোষাধ্যক্ষ', phone: '01600-000000', status: 'ভেরিফাইড', joined: '২৫ জানুয়ারি, ২০২৪', initial: 'কা' },
  { name: 'রকিবুল হাসান', position: 'কার্যনির্বাহী সদস্য', phone: '01500-000000', status: 'ভেরিফাইড', joined: '০২ ফেব্রুয়ারি, ২০২৪', initial: 'র' },
];

export default function MembersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h4 className="text-xl font-bold text-slate-800">সদস্য তালিকা</h4>
          <p className="text-[13px] text-slate-500 mt-1">আপনার কমিটির সব মেম্বারদের তথ্য এখানে পাবেন।</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-white border border-slate-200 text-slate-600 px-4 py-2.5 rounded-lg font-bold text-[13px] flex items-center shadow-sm">
             <Download className="h-4 w-4 mr-2" /> ডাউনলোড
          </button>
          <button className="bg-[#00695C] text-white px-4 py-2.5 rounded-lg font-bold text-[13px] flex items-center shadow-md hover:bg-[#004D40] transition-all">
             <UserPlus className="h-4 w-4 mr-2" /> নতুন সদস্য যোগ করুন
          </button>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
           <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
           <input type="text" placeholder="মেম্বার খুঁজুন..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#00695C]/20 outline-none transition-all" />
        </div>
        <div className="flex space-x-2 w-full md:w-auto">
           <select className="flex-1 bg-slate-50 border-none rounded-lg text-xs font-bold py-2.5 px-4 outline-none">
              <option>সব পদবী</option>
              <option>আহ্বায়ক</option>
              <option>সদস্য</option>
           </select>
           <button className="p-2.5 bg-slate-50 rounded-lg text-slate-400 hover:text-[#00695C]">
              <Filter className="h-5 w-5" />
           </button>
        </div>
      </div>

      {/* Members Grid - bdnagorik Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {members.map((member) => (
          <div key={member.phone} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:border-[#00695C] transition-all group">
            <div className="flex items-center space-x-4 mb-4 pb-4 border-b border-slate-50">
                <div className="h-14 w-14 rounded-lg bg-[#00695C] text-white flex items-center justify-center text-xl font-bold">
                    {member.initial}
                </div>
                <div>
                   <h5 className="text-[16px] font-bold text-slate-800 group-hover:text-[#00695C] transition-colors">{member.name}</h5>
                   <p className="text-[12px] text-teal-600 font-bold uppercase tracking-tight">{member.position}</p>
                </div>
            </div>
            
            <div className="space-y-3 mb-4 text-[13px]">
               <div className="flex justify-between items-center text-slate-500">
                  <span className="flex items-center"><Phone className="h-3.5 w-3.5 mr-2 opacity-50" /> {member.phone}</span>
                  {member.status === 'ভেরিফাইড' ? (
                     <BadgeCheck className="h-4.5 w-4.5 text-green-500" />
                  ) : (
                     <ShieldAlert className="h-4.5 w-4.5 text-orange-500" />
                  )}
               </div>
               <p className="text-slate-400">যোগ দিয়েছেন: <span className="text-slate-600 font-medium">{member.joined}</span></p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <button className="text-[12px] font-bold text-[#00695C] hover:underline">বিস্তারিত প্রোফাইল</button>
                <button className="p-1.5 text-slate-300 hover:text-slate-600 transition-colors"><MoreHorizontal className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
