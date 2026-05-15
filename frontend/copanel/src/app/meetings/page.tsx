"use client";

import React from 'react';
import { Calendar, Clock, MapPin, Plus, FileText, ChevronRight, MoreVertical } from 'lucide-react';

const upcomingMeetings = [
  { title: 'মাসিক সাংগঠনিক সমন্বয় সভা', date: '১০ মে, ২০২৪', time: 'বিকাল ৪:৩০', location: 'মিরপুর ২ নং ওয়ার্ড অফিস', type: 'শারীরিক', attendees: 18 },
  { title: 'জরুরি ইউনিট আলোচনা', date: '১৫ মে, ২০২৪', time: 'রাত ৯:০০', location: 'অনলাইন (জুম মিটিং)', type: 'অনলাইন', attendees: 25 },
];

const pastMeetings = [
  { title: 'রমজান প্রস্তুতিমূলক সভা', date: '০৫ এপ্রিল, ২০২৪', status: 'সম্পন্ন', resolution: '১০টি সিদ্ধান্ত গৃহীত' },
  { title: 'ঈদ নিরাপত্তা আলোচনা', date: '২৮ মার্চ, ২০২৪', status: 'সম্পন্ন', resolution: '৩টি অ্যাকশন প্ল্যান' },
];

export default function MeetingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h4 className="text-xl font-bold text-slate-800">মিটিং ম্যানেজমেন্ট</h4>
          <p className="text-[13px] text-slate-500 mt-1">কমিটির পরবর্তী এবং পূর্ববর্তী মিটিংয়ের তথ্য ট্র্যাকিং করুন।</p>
        </div>
        <button className="bg-[#00695C] text-white px-4 py-2.5 rounded-lg font-bold text-[13px] flex items-center shadow-md hover:bg-[#004D40] transition-all">
          <Plus className="h-4 w-4 mr-2" /> নতুন মিটিং শিডিউল করুন
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main List */}
        <div className="lg:col-span-2 space-y-4">
          <h6 className="text-[11px] font-bold uppercase tracking-widest text-slate-400">পরবর্তী ইভেন্টসমূহ</h6>
          
          {upcomingMeetings.map((meeting) => (
            <div key={meeting.title} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col md:flex-row justify-between items-center group hover:border-[#00695C] transition-all">
              <div className="flex items-center space-x-5 mb-4 md:mb-0">
                <div className="h-14 w-14 rounded-xl bg-teal-50 border border-teal-100 flex flex-col items-center justify-center text-[#00695C] group-hover:bg-[#00695C] group-hover:text-white transition-all">
                   <span className="text-[9px] font-bold uppercase opacity-70">মে</span>
                   <span className="text-xl font-black leading-tight">১০</span>
                </div>
                <div className="space-y-1">
                   <h4 className="text-[15px] font-bold text-slate-800 leading-tight">{meeting.title}</h4>
                   <div className="flex items-center space-x-3 text-[11px] font-semibold text-slate-400">
                      <span className="flex items-center"><Clock className="h-3 w-3 mr-1" /> {meeting.time}</span>
                      <span className="flex items-center"><MapPin className="h-3 w-3 mr-1" /> {meeting.location}</span>
                   </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                 <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    meeting.type === 'অনলাইন' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                 }`}>
                    {meeting.type}
                 </span>
                 <button className="p-2 text-slate-300 hover:text-slate-600"><ChevronRight className="h-5 w-5" /></button>
              </div>
            </div>
          ))}
        </div>

        {/* History Sidebar */}
        <div className="space-y-4">
          <h6 className="text-[11px] font-bold uppercase tracking-widest text-slate-400">রেজোলিউশন হিস্ট্রি</h6>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-50">
            {pastMeetings.map((meeting) => (
              <div key={meeting.title} className="p-5 hover:bg-slate-50 transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{meeting.date}</span>
                    <MoreVertical className="h-3.5 w-3.5 text-slate-300" />
                </div>
                <h5 className="text-[14px] font-bold text-slate-800 mb-2 group-hover:text-[#00695C] transition-colors">{meeting.title}</h5>
                <div className="flex items-center text-[11px] font-bold text-[#00695C] bg-[#E0F2F1] px-3 py-1.5 rounded-lg w-fit">
                    <FileText className="h-3 w-3 mr-2" /> {meeting.resolution}
                </div>
              </div>
            ))}
            <button className="w-full p-3 bg-slate-50 text-[12px] font-bold text-slate-400 hover:text-[#00695C] transition-colors">সবগুলো দেখুন</button>
          </div>
        </div>
      </div>
    </div>
  );
}
