"use client";

import React from 'react';
import { Hind_Siliguri } from "next/font/google";
import './globals.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Network, 
  Users, 
  Calendar, 
  FileCheck, 
  Settings,
  Bell,
  Menu,
  LogOut,
  TriangleAlert,
  Handshake,
  Megaphone,
  Newspaper,
  CreditCard
} from 'lucide-react';

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // অরিজিনাল বডিনাগরিক কালারসমূহ
  const primaryColor = "#00695C";
  const darkColor = "#004D40";
  const lightColor = "#E0F2F1";

  const navItems = [
    { label: 'ড্যাশবোর্ড', href: '/dashboard', icon: LayoutDashboard },
    { label: 'কমিটি কাঠামো', href: '/hierarchy', icon: Network },
    { label: 'কভারেজ', href: '/coverage', icon: Network },
    { label: 'সদস্য', href: '/members', icon: Users },
    { label: 'মিটিং', href: '/meetings', icon: Handshake },
    { label: 'সমস্যা / অভিযোগ', href: '/issues', icon: TriangleAlert },
    { label: 'ইভেন্ট', href: '/events', icon: Calendar },
    { label: 'ঘোষণা', href: '/announcements', icon: Megaphone },
    { label: 'নাগরিক সংবাদ', href: '/news', icon: Newspaper },
    { label: 'মাসিক চাঁদা', href: '/subscriptions', icon: CreditCard },
    { label: 'অডিট', href: '/audits', icon: FileCheck },
  ];

  const isLoginPage = pathname === '/login';

  if (isLoginPage) {
    return (
      <html lang="bn" className={hindSiliguri.variable}>
        <body className="antialiased bg-[#0a0a0a]" style={{ fontFamily: "var(--font-hind-siliguri), sans-serif" }}>
          {children}
        </body>
      </html>
    );
  }

  return (
    <html lang="bn" className={hindSiliguri.variable}>
      <body className="antialiased bg-[#f0f2f5]" style={{ fontFamily: "var(--font-hind-siliguri), sans-serif" }}>
        <div className="flex h-screen overflow-hidden">
          
          {/* bdnagorik Original Sidebar */}
          <aside className="w-64 bg-white border-r border-[#e8eaed] hidden lg:flex flex-col z-50">
            {/* Sidebar Header with Gradient */}
            <div className="p-5 text-white shadow-md" style={{ background: `linear-gradient(135deg, ${darkColor}, ${primaryColor})` }}>
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 bg-white/20 rounded-lg flex items-center justify-center text-xl backdrop-blur-sm">🛡️</div>
                <div>
                  <div className="text-sm font-bold leading-tight">কমিটি প্যানেল</div>
                  <div className="text-[10px] opacity-75 uppercase tracking-wider font-semibold">নাগরিক কমিটি</div>
                </div>
              </div>
            </div>

            {/* Member Info Card in Sidebar */}
            <div className="m-3 p-3 bg-slate-50 rounded-xl flex items-center space-x-3 border border-slate-100">
               <div className="h-9 w-9 rounded-lg bg-[#00695C] text-white flex items-center justify-center font-bold">A</div>
               <div>
                 <p className="text-[13px] font-bold text-slate-800">এডমিন ভাই</p>
                 <p className="text-[11px] text-[#00695C] font-semibold">আহ্বায়ক</p>
               </div>
            </div>

            {/* Committee Tag */}
            <div className="mx-3 mb-2 px-3 py-2 bg-[#E0F2F1] text-[#00695C] text-[11px] font-bold rounded-lg flex items-center">
              <Network className="h-3 w-3 mr-2" /> মিরপুর ২ নং ওয়ার্ড কমিটি
            </div>

            <nav className="flex-1 overflow-y-auto mt-2">
              {navItems.map((item, index) => {
                const isActive = pathname === item.href;
                const showSection = index === 1 || index === 4 || index === 8;
                const sectionLabel = index === 1 ? 'সংগঠন' : index === 4 ? 'কার্যক্রম' : 'প্রশাসন';

                return (
                  <React.Fragment key={item.href}>
                    {showSection && (
                      <div className="px-5 py-3 text-[10px] font-bold text-[#aaa] uppercase tracking-widest">{sectionLabel}</div>
                    )}
                    <Link 
                      href={item.href}
                      className={`flex items-center px-5 py-2.5 text-[14px] transition-all border-l-[3px] ${
                        isActive 
                        ? 'bg-[#00695C]/10 text-[#00695C] border-[#00695C] font-semibold' 
                        : 'text-[#555] border-transparent hover:bg-[#E0F2F1] hover:text-[#00695C]'
                      }`}
                    >
                      <item.icon className={`h-4.5 w-4.5 mr-3 ${isActive ? 'opacity-100' : 'opacity-70'}`} />
                      {item.label}
                    </Link>
                  </React.Fragment>
                );
              })}
            </nav>

            <div className="p-3 border-t border-slate-100">
               <button className="w-full flex items-center px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <LogOut className="h-4 w-4 mr-2" /> লগ আউট
               </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Topbar */}
            <header className="h-[60px] bg-white border-b border-[#e8eaed] shadow-sm flex items-center justify-between px-6 z-40">
              <div className="flex items-center space-x-3">
                <button className="lg:hidden p-2 text-slate-500"><Menu className="h-5 w-5" /></button>
                <h5 className="text-[16px] font-bold text-slate-800">ড্যাশবোর্ড</h5>
              </div>
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center bg-[#E0F2F1] text-[#00695C] px-3 py-1.5 rounded-full text-[12px] font-semibold">
                   <Network className="h-3.5 w-3.5 mr-2" /> মিরপুর ২ নং ওয়ার্ড কমিটি
                </div>
                <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors"><Bell className="h-5 w-5" /></button>
                <div className="h-8 w-8 rounded-full bg-slate-200 border border-slate-100"></div>
              </div>
            </header>

            {/* Page Content */}
            <main className="flex-1 overflow-y-auto p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
