"use client";

import React from 'react';
import { 
  Network, 
  Plus, 
  Layers, 
  Users, 
  CheckCircle, 
  XCircle
} from 'lucide-react';

const coverageData = [
  { key: 'district', label: 'জেলা', needed: 1, exists: 1, missing: 0, members: 32, coverage: 100, color: 'bg-info' },
  { key: 'upazila', label: 'উপজেলা/থানা', needed: 8, exists: 6, missing: 2, members: 245, coverage: 75, color: 'bg-success' },
  { key: 'union', label: 'ইউনিয়ন/পৌরসভা', needed: 45, exists: 32, missing: 13, members: 640, coverage: 71, color: 'bg-warning' },
  { key: 'ward', label: 'ওয়ার্ড', needed: 405, exists: 120, missing: 285, members: 2400, coverage: 29, color: 'bg-secondary' },
];

const subCommittees = [
  { name: 'মিরপুর থানা শাখা', level: 'উপজেলা/থানা', members: 42, reports: 2, active: true },
  { name: 'পল্লবী থানা শাখা', level: 'উপজেলা/থানা', members: 35, reports: 0, active: true },
  { name: 'মিরপুর ২ নং ওয়ার্ড', level: 'ওয়ার্ড', members: 21, reports: 5, active: true },
  { name: 'মিরপুর ১০ নং ওয়ার্ড', level: 'ওয়ার্ড', members: 0, reports: 0, active: false },
];

export default function CoveragePage() {
  const totalNeeded = coverageData.reduce((acc, curr) => acc + curr.needed, 0);
  const totalExists = coverageData.reduce((acc, curr) => acc + curr.exists, 0);
  const totalMissing = coverageData.reduce((acc, curr) => acc + curr.missing, 0);
  const totalMembers = coverageData.reduce((acc, curr) => acc + curr.members, 0);
  const overallCoverage = Math.round((totalExists / totalNeeded) * 100);

  return (
    <div className="space-y-6 pb-10">
      
      {/* Parent Committee Card */}
      <div className="bg-white rounded-xl border-t-4 border-[#00695C] shadow-sm p-6 flex justify-between items-center">
        <div>
          <span className="bg-[#00695C] text-white text-[10px] font-bold px-2 py-1 rounded uppercase mb-2 inline-block">ওয়ার্ড (সিটি)</span>
          <h4 className="text-xl font-bold text-slate-800">মিরপুর ২ নং ওয়ার্ড কমিটি</h4>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold flex items-center hover:bg-slate-200 transition-colors">
            <Network className="h-3.5 w-3.5 mr-2" /> কাঠামো
          </button>
          <button className="px-4 py-2 bg-[#00695C] text-white rounded-lg text-xs font-bold flex items-center hover:bg-[#004D40] transition-colors shadow-md">
            <Plus className="h-3.5 w-3.5 mr-2" /> কমিটি তৈরি
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center">
          <div className="text-2xl font-black text-blue-600">{totalExists}</div>
          <div className="text-[11px] font-bold text-slate-400 uppercase mt-1">সাব-কমিটি আছে</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center">
          <div className="text-2xl font-black text-red-600">{totalMissing}</div>
          <div className="text-[11px] font-bold text-slate-400 uppercase mt-1">সাব-কমিটি দরকার</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center">
          <div className="text-2xl font-black text-green-600">{totalMembers}</div>
          <div className="text-[11px] font-bold text-slate-400 uppercase mt-1">মোট সদস্য</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center">
          <div className={`text-2xl font-black ${overallCoverage >= 50 ? 'text-green-600' : 'text-red-600'}`}>{overallCoverage}%</div>
          <div className="text-[11px] font-bold text-slate-400 uppercase mt-1">সামগ্রিক কভারেজ</div>
        </div>
      </div>

      {/* Level-wise Coverage Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center">
          <Layers className="h-4 w-4 mr-2 text-[#00695C]" />
          <h6 className="text-[14px] font-bold text-slate-800">লেভেল অনুযায়ী কভারেজ</h6>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">লেভেল</th>
                <th className="px-6 py-4 text-center">প্রয়োজন</th>
                <th className="px-6 py-4 text-center">আছে</th>
                <th className="px-6 py-4 text-center">নেই</th>
                <th className="px-6 py-4 text-center">সদস্য</th>
                <th className="px-6 py-4">কভারেজ</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {coverageData.map((cl) => (
                <tr key={cl.key} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold text-white ${cl.color === 'bg-info' ? 'bg-blue-500' : cl.color === 'bg-success' ? 'bg-green-600' : cl.color === 'bg-warning' ? 'bg-orange-500' : 'bg-slate-500'}`}>
                      {cl.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-sm font-bold text-slate-700">{cl.needed}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[11px] font-bold">{cl.exists}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`${cl.missing > 0 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'} px-2 py-0.5 rounded text-[11px] font-bold`}>
                      {cl.missing}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[11px] font-bold">{cl.members}</span>
                  </td>
                  <td className="px-6 py-4 min-w-[180px]">
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${cl.coverage >= 80 ? 'bg-green-600' : cl.coverage >= 40 ? 'bg-orange-500' : 'bg-red-600'}`}
                          style={{ width: `${cl.coverage}%` }}
                        ></div>
                      </div>
                      <span className={`text-[11px] font-bold ${cl.coverage >= 80 ? 'text-green-600' : cl.coverage >= 40 ? 'text-orange-500' : 'text-red-600'}`}>
                        {cl.coverage}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {cl.missing > 0 && (
                      <button className="bg-[#00695C] text-white px-2 py-1 rounded text-[10px] font-bold hover:bg-[#004D40] transition-colors">
                        <Plus className="h-3 w-3 inline mr-1" /> তৈরি
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-50 font-bold border-t border-slate-200">
               <tr>
                 <td className="px-6 py-4 text-sm">মোট</td>
                 <td className="px-6 py-4 text-center text-sm">{totalNeeded}</td>
                 <td className="px-6 py-4 text-center text-sm">{totalExists}</td>
                 <td className="px-6 py-4 text-center text-sm">{totalMissing}</td>
                 <td className="px-6 py-4 text-center text-sm">{totalMembers}</td>
                 <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${overallCoverage >= 50 ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                      {overallCoverage}%
                    </span>
                 </td>
                 <td></td>
               </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Sub-committee List Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-blue-600" />
            <h6 className="text-[14px] font-bold text-slate-800">সব কমিটি তালিকা (সাব-কমিটিসমূহ)</h6>
          </div>
          <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{subCommittees.length}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-6 py-3">কমিটি</th>
                <th className="px-6 py-3">লেভেল</th>
                <th className="px-6 py-3 text-center">সদস্য</th>
                <th className="px-6 py-3 text-center">অভিযোগ</th>
                <th className="px-6 py-3">অবস্থা</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {subCommittees.map((cc, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3 font-bold text-slate-700">{cc.name}</td>
                  <td className="px-6 py-3">
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded uppercase">{cc.level}</span>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold text-white ${cc.members > 0 ? 'bg-green-600' : 'bg-red-500'}`}>
                      {cc.members}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-center font-bold text-slate-600">{cc.reports}</td>
                  <td className="px-6 py-3">
                    {cc.active ? <CheckCircle className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-red-600" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
