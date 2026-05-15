"use client";

import React from 'react';
import { Hind_Siliguri, Inter } from "next/font/google";
import './globals.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  ShieldCheck, 
  Settings,
  Bell,
  Menu,
  LogOut,
  PhoneCall,
  FileText,
  AlertOctagon,
  Search,
  MessageSquare,
  Globe
} from 'lucide-react';

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "600", "700"],
  variable: "--font-hind-siliguri",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // bdnagorik Admin Colors
  const primaryColor = "#1B5E20";
  const darkColor = "#154619";

  const navItems = [
    { label: 'ড্যাশবোর্ড', href: '/dashboard', icon: LayoutDashboard },
    { label: 'ইউজার ম্যানেজমেন্ট', href: '/users', icon: Users },
    { label: 'কমিটি ম্যানেজমেন্ট', href: '/committees', icon: ShieldCheck },
    { label: 'কল রেকর্ডস', href: '/calls', icon: PhoneCall },
    { label: 'অডিট ও রিপোর্ট', href: '/reports', icon: FileText },
    { label: 'অভিযোগ কেন্দ্র', href: '/complaints', icon: AlertOctagon },
    { label: 'মেসেজ সেন্টার', href: '/messages', icon: MessageSquare },
    { label: 'সার্ভিস মনিটর', href: '/services', icon: Globe },
    { label: 'সেটিংস', href: '/settings', icon: Settings },
  ];

  // লগইন পেজে সাইডবার এবং হেডার হাইড করার লজিক
  const isLoginPage = pathname === '/login';

  if (isLoginPage) {
    return (
      <html lang="bn" className={`${hindSiliguri.variable} ${inter.variable}`}>
        <body className="antialiased" style={{ fontFamily: "var(--font-hind-siliguri), var(--font-inter), sans-serif" }}>
          {children}
        </body>
      </html>
    );
  }

  return (
    <html lang="bn" className={`${hindSiliguri.variable} ${inter.variable}`}>
      <body className="antialiased bg-[#f1f5f9]" style={{ fontFamily: "var(--font-hind-siliguri), var(--font-inter), sans-serif" }}>
        <div className="flex h-screen overflow-hidden">
          
          {/* Sidebar */}
          <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col z-50">
            {/* Header with bdnagorik Admin Green */}
            <div className="p-4 flex items-center space-x-3 text-white shadow-md" style={{ backgroundColor: primaryColor }}>
              <div className="h-10 w-10 bg-white/20 rounded-lg flex items-center justify-center text-xl backdrop-blur-sm">🛡️</div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-none tracking-tight">নাগরিক এডমিন</span>
                <span className="text-[10px] opacity-70 font-semibold mt-1">Super Admin Dashboard</span>
              </div>
            </div>

            <nav className="flex-1 overflow-y-auto mt-4">
              <div className="px-5 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Main Menu</div>
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    className={`flex items-center px-5 py-3 text-[14px] transition-all border-l-4 ${
                      isActive 
                      ? 'bg-[#ecfdf5] text-[#1B5E20] border-[#1B5E20] font-semibold' 
                      : 'text-slate-600 border-transparent hover:bg-[#f0fdf4] hover:text-[#1B5E20]'
                    }`}
                  >
                    <item.icon className={`h-5 w-5 mr-3 ${isActive ? 'text-[#1B5E20]' : 'text-slate-400'}`} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-slate-100">
               <button className="w-full flex items-center justify-center space-x-2 p-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all font-bold text-sm">
                  <LogOut className="h-4 w-4" />
                  <span>লগ আউট</span>
               </button>
            </div>
          </aside>

          {/* Main Space */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Topbar */}
            <header className="h-[65px] bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
              <div className="flex items-center">
                <button className="lg:hidden p-2 text-slate-500 mr-2"><Menu className="h-5 w-5" /></button>
                <h5 className="text-[18px] font-bold text-slate-800">ড্যাশবোর্ড</h5>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input type="text" placeholder="ইউজার বা আইডি সার্চ..." className="w-64 pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-[#1B5E20]/20 transition-all" />
                </div>
                
                <div className="flex items-center space-x-4">
                  <button className="p-2 text-slate-400 hover:text-slate-600 relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
                  </button>
                  
                  <div className="flex items-center space-x-3 pl-4 border-l border-slate-100">
                    <div className="text-right">
                       <p className="text-[12px] font-bold text-slate-800 leading-none">Super Admin</p>
                       <p className="text-[10px] text-slate-400 mt-1">সুপার অ্যাডমিন</p>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-[#1B5E20] text-white flex items-center justify-center font-bold shadow-lg shadow-green-900/20">A</div>
                  </div>
                </div>
              </div>
            </header>

            {/* Page Content */}
            <main className="flex-1 overflow-y-auto p-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>

  );
}
