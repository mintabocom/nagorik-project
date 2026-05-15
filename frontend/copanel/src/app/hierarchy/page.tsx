"use client";

import React from 'react';
import { Network, ShieldCheck, MapPin, Plus, ChevronRight } from 'lucide-react';

const treeData = [
  { level: 'কেন্দ্রীয় কমিটি', name: 'বাংলাদেশ নাগরিক কমিটি (কেন্দ্রীয়)', members: 71, status: 'সক্রিয়' },
  { level: 'বিভাগীয় কমিটি', name: 'ঢাকা বিভাগীয় সমন্বয় কমিটি', members: 45, status: 'সক্রিয়' },
  { level: 'জেলা কমিটি', name: 'ঢাকা জেলা কমিটি', members: 32, status: 'সক্রিয়' },
  { level: 'থানা/উপজেলা', name: 'মিরপুর থানা শাখা', members: 42, status: 'সক্রিয়' },
  { level: 'ওয়ার্ড কমিটি', name: 'মিরপুর ২ নং ওয়ার্ড কমিটি', members: 21, status: 'সক্রিয়' },
];

export default function HierarchyPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h4 className="text-xl font-bold text-slate-800">কমিটি কাঠামো (Hierarchy)</h4>
          <p className="text-[13px] text-slate-500 mt-1">আপনার কমিটির ওপরের এবং নিচের চেইন এখানে দেখুন।</p>
        </div>
        <button className="bg-[#00695C] text-white px-4 py-2.5 rounded-lg font-bold text-[13px] flex items-center shadow-md hover:bg-[#004D40] transition-all">
          <Plus className="h-4 w-4 mr-2" /> সাব-কমিটি তৈরি করুন
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Visual Tree */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 p-8 shadow-sm relative overflow-hidden">
          <div className="space-y-4">
            {treeData.map((item, index) => (
              <div key={item.level} className="flex flex-col items-center">
                <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-xl p-5 flex items-center justify-between hover:border-[#00695C] hover:bg-slate-50/50 transition-all group">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-lg bg-[#E0F2F1] text-[#00695C] flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#00695C]">{item.level}</span>
                      <h3 className="text-[15px] font-bold text-slate-800">{item.name}</h3>
                    </div>
                  </div>
                  <div className="flex items-center space-x-8">
                    <div className="text-right hidden sm:block">
                      <p className="text-[10px] text-slate-400 font-bold uppercase">মেম্বার</p>
                      <p className="text-[13px] font-bold text-slate-700">{item.members} জন</p>
                    </div>
                    <div className="h-9 w-9 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                  </div>
                </div>
                
                {index < treeData.length - 1 && (
                  <div className="h-8 w-0.5 bg-slate-100 my-1"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Analytics Summary */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h5 className="text-[14px] font-bold text-slate-800 mb-4 flex items-center">
                  <MapPin className="mr-2 text-[#00695C] h-4 w-4" /> এলাকা কভারেজ
              </h5>
              <div className="space-y-4">
                  <div>
                      <div className="flex justify-between text-[11px] font-bold mb-2 uppercase text-slate-500">
                          <span>ওয়ার্ড কমিটি</span>
                          <span className="text-[#00695C]">১২/১৫</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#00695C] w-[80%] rounded-full shadow-sm"></div>
                      </div>
                  </div>
                  <p className="text-[12px] text-slate-400 leading-relaxed">
                      আপনার আন্ডারে থাকা ১৫টি ওয়ার্ডের মধ্যে ১২টিতে পূর্ণাঙ্গ কমিটি আছে।
                  </p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
