import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppDownload from "@/components/AppDownload";
import Link from "next/link";

export default function Home() {
  const stats = {
    citizens: 254000,
    sebaks: 12500,
    issues_resolved: 45200,
    committees: 5200,
  };

  const features = [
    { icon: "📢", title: "সমস্যা জমা দিন", desc: "আপনার এলাকার সমস্যা ছবিসহ জমা দিন, ট্র্যাক করুন সমাধানের অগ্রগতি।", color: "bg-red-50 text-red-600" },
    { icon: "🚨", title: "জরুরি সাহায্য", desc: "SOS বাটন চাপলেই কাছের সেবকদের কাছে alert যাবে, GPS ভিত্তিক সাহায্য।", color: "bg-orange-50 text-orange-600" },
    { icon: "🩸", title: "রক্তদান নেটওয়ার্ক", desc: "জরুরি রক্তের প্রয়োজনে কাছের রক্তদাতা খুঁজুন, রক্তদানের আবেদন করুন।", color: "bg-pink-50 text-pink-600" },
    { icon: "📊", title: "জনমত জরিপ", desc: "এলাকাভিত্তিক জনমত জরিপে অংশ নিন, আপনার মতামত জানান।", color: "bg-blue-50 text-blue-600" },
    { icon: "💼", title: "চাকরি বোর্ড", desc: "স্থানীয় ও জাতীয় চাকরির খবর পান, আবেদন করুন সরাসরি।", color: "bg-indigo-50 text-indigo-600" },
    { icon: "🕌", title: "নামাজের সময়", desc: "আপনার লোকেশন অনুযায়ী সঠিক নামাজের সময়সূচি।", color: "bg-teal-50 text-teal-600" },
    { icon: "🏥", title: "স্বাস্থ্য সেবা", desc: "কাছের হাসপাতাল, ডাক্তার ও অ্যাম্বুলেন্সের তথ্য পান।", color: "bg-emerald-50 text-emerald-600" },
    { icon: "⚖️", title: "আইনি সহায়তা", desc: "বিনামূল্যে আইনি পরামর্শ, উকিল খুঁজুন, আইনি তথ্য জানুন।", color: "bg-purple-50 text-purple-600" },
    { icon: "🛡️", title: "দুর্নীতি রিপোর্ট", desc: "বেনামে দুর্নীতির অভিযোগ করুন, প্রমাণসহ রিপোর্ট পাঠান।", color: "bg-yellow-50 text-yellow-600" },
    { icon: "🔍", title: "হারানো-পাওয়া", desc: "হারানো জিনিস খুঁজুন বা পাওয়া জিনিসের বিজ্ঞাপন দিন।", color: "bg-cyan-50 text-cyan-600" },
    { icon: "🤝", title: "স্বেচ্ছাসেবক নেটওয়ার্ক", desc: "স্বেচ্ছাসেবক হিসেবে যুক্ত হন, সেবামূলক কাজে অংশ নিন।", color: "bg-green-50 text-green-600" },
  ];

  const steps = [
    { num: "১", title: "অ্যাপ ডাউনলোড করুন", desc: "Google Play বা App Store থেকে নাগরিক অ্যাপ ডাউনলোড করে ফোন নম্বর দিয়ে রেজিস্ট্রেশন করুন।", icon: "📱" },
    { num: "২", title: "সমস্যা বা সেবা বেছে নিন", desc: "আপনার এলাকার সমস্যা জানান, রক্তের প্রয়োজন হলে অনুরোধ করুন, বা যেকোনো সেবা ব্যবহার করুন।", icon: "✍️" },
    { num: "৩", title: "সমাধান পান", desc: "আমাদের সেবক নেটওয়ার্ক আপনার সমস্যা সমাধানে কাজ করবে। রিয়েল-টাইম আপডেট পাবেন।", icon: "✅" },
  ];

  const levels = [
    { name: "কেন্দ্রীয় কমিটি", count: "১", color: "bg-green-900" },
    { name: "বিভাগীয় কমিটি", count: "৮", color: "bg-green-700" },
    { name: "জেলা কমিটি", count: "৬৪", color: "bg-green-600" },
    { name: "মহানগর / সিটি কর্পোরেশন", count: "১২", color: "bg-teal-600" },
    { name: "উপজেলা কমিটি", count: "৪৯৫", color: "bg-green-500" },
    { name: "পৌরসভা কমিটি", count: "৩৩০+", color: "bg-teal-500" },
    { name: "ইউনিয়ন কমিটি", count: "৪,৫৭১+", color: "bg-green-400" },
    { name: "ওয়ার্ড কমিটি", count: "৪০,০০০+", color: "bg-green-300" },
  ];

  const testimonials = [
    { name: "ফারহানা আক্তার", location: "মিরপুর, ঢাকা", text: "আমাদের এলাকায় রাস্তার সমস্যা ছিল অনেকদিন ধরে। নাগরিক অ্যাপে রিপোর্ট করার ৫ দিনের মধ্যে সমাধান হয়ে গেল!", role: "গৃহিণী" },
    { name: "মোঃ রাফি", location: "চট্টগ্রাম", text: "জরুরি রক্তের প্রয়োজনে নাগরিক অ্যাপ থেকে ৩০ মিনিটের মধ্যে রক্তদাতা পেয়ে গেছি। অসাধারণ!", role: "শিক্ষার্থী" },
    { name: "আহমেদ করিম", location: "রাজশাহী", text: "সেবক হিসেবে কাজ করে এলাকার মানুষের সমস্যা সমাধানে সাহায্য করতে পারছি। গর্বিত!", role: "সেবক সদস্য" },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-green-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-400 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-500 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 md:py-32 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-700/50 backdrop-blur-sm border border-green-600/30 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-sm text-green-200">বাংলাদেশ নাগরিক উন্নয়ন পরিষদ</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                আপনার কণ্ঠস্বর,<br />
                <span className="text-amber-400">আপনার অধিকার</span>
              </h1>
              <p className="text-lg text-green-100 mb-8 leading-relaxed max-w-lg">
                এলাকার সমস্যা জানান, জরুরি সাহায্য পান, রক্তদান নেটওয়ার্কে যুক্ত হন — নাগরিক অ্যাপ দিয়ে আপনার কমিউনিটি গড়ে তুলুন।
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="#download" className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-gray-900 font-semibold px-6 py-3.5 rounded-xl transition shadow-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  অ্যাপ ডাউনলোড করুন
                </Link>
                <Link href="/about" className="inline-flex items-center justify-center gap-2 border border-green-500/40 hover:bg-green-700/40 text-white px-6 py-3.5 rounded-xl transition">
                  আরও জানুন
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-10 max-w-xs sm:max-w-none sm:flex sm:items-center sm:gap-6">
                <div className="text-center">
                  <span className="text-xl sm:text-2xl font-bold text-amber-400">{stats.citizens.toLocaleString()}+</span>
                  <span className="block text-xs text-green-300">সক্রিয় নাগরিক</span>
                </div>
                <div className="hidden sm:block w-px h-10 bg-green-700"></div>
                <div className="text-center">
                  <span className="text-xl sm:text-2xl font-bold text-amber-400">{stats.sebaks.toLocaleString()}+</span>
                  <span className="block text-xs text-green-300">সক্রিয় সেবক</span>
                </div>
                <div className="hidden sm:block w-px h-10 bg-green-700"></div>
                <div className="text-center">
                  <span className="text-xl sm:text-2xl font-bold text-amber-400">{stats.issues_resolved.toLocaleString()}+</span>
                  <span className="block text-xs text-green-300">সমস্যা সমাধান</span>
                </div>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="relative">
                {/* Phone Mockup */}
                <div className="w-[280px] h-[560px] bg-gray-900 rounded-[3rem] border-4 border-gray-700 shadow-2xl p-3 relative">
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-5 bg-gray-800 rounded-full z-10"></div>
                  <div className="w-full h-full bg-gradient-to-b from-green-800 to-green-900 rounded-[2.3rem] flex flex-col items-center justify-center text-center px-6">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center mb-4">
                      <span className="text-3xl font-bold text-white">N</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">নাগরিক</h3>
                    <p className="text-green-200 text-xs">আপনার নাগরিক সেবা প্ল্যাটফর্ম</p>
                    <div className="mt-6 grid grid-cols-3 gap-2 w-full">
                      {[
                        { icon: "📢", label: "সমস্যা" },
                        { icon: "🚨", label: "জরুরি" },
                        { icon: "🩸", label: "রক্তদান" },
                        { icon: "📊", label: "জনমত" },
                        { icon: "💼", label: "চাকরি" },
                        { icon: "🕌", label: "নামাজ" }
                      ].map((item, i) => (
                        <div key={i} className="bg-white/10 rounded-xl p-2 text-center">
                          <span className="text-lg">{item.icon}</span>
                          <span className="block text-[9px] text-green-200 mt-0.5">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Floating badges */}
                <div className="absolute -left-16 top-20 bg-white rounded-xl shadow-xl px-4 py-3 animate-float">
                  <span className="text-2xl">🩸</span>
                  <span className="block text-xs font-semibold text-gray-800">রক্ত পাওয়া গেছে!</span>
                </div>
                <div className="absolute -right-12 bottom-32 bg-white rounded-xl shadow-xl px-4 py-3 animate-float-delay">
                  <span className="text-2xl">✅</span>
                  <span className="block text-xs font-semibold text-gray-800">সমস্যা সমাধান!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 80h1440V30c-200 30-400 50-720 30S200 0 0 30v50z" fill="white" /></svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
            <span className="inline-block bg-green-50 text-green-800 text-sm font-medium px-4 py-1.5 rounded-full mb-4">ফিচারসমূহ</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">একটি অ্যাপেই সব সেবা</h2>
            <p className="text-gray-500 text-base md:text-lg">নাগরিক অ্যাপে আপনি পাচ্ছেন ২৭টি+ ফিচার — সমস্যা সমাধান থেকে শুরু করে জরুরি সাহায্য পর্যন্ত।</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="group p-6 rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all duration-300">
                <div className={`w-12 h-12 ${f.color} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                  {f.icon}
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
            <span className="inline-block bg-amber-50 text-amber-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">কিভাবে কাজ করে</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">তিনটি সহজ ধাপে</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 md:gap-8">
            {steps.map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-20 h-20 mx-auto bg-white rounded-2xl shadow-md flex items-center justify-center text-4xl mb-6 relative">
                  {s.icon}
                  <span className="absolute -top-2 -right-2 w-7 h-7 bg-green-800 text-white rounded-full flex items-center justify-center text-sm font-bold">{s.num}</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organization Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <span className="inline-block bg-teal-50 text-teal-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">সংগঠন</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">সারাদেশে আমাদের সেবক নেটওয়ার্ক</h2>
              <p className="text-gray-500 text-base md:text-lg mb-6 leading-relaxed">কেন্দ্রীয় থেকে ওয়ার্ড পর্যায় পর্যন্ত সুসংগঠিত কমিটি কাঠামো। প্রতিটি এলাকায় নিবেদিত সেবক রয়েছে আপনার সেবায়।</p>

              <div className="space-y-3">
                {levels.map((level, i) => (
                  <div key={i} className="flex items-center gap-3" style={{ paddingLeft: `${Math.min(i * 10, 40)}px` }}>
                    <span className={`w-3 h-3 ${level.color} rounded-full shrink-0`}></span>
                    <span className="text-sm font-medium text-gray-800">{level.name}</span>
                    <span className="text-xs text-gray-400">({level.count})</span>
                  </div>
                ))}
              </div>

              <Link href="/organization" className="inline-flex items-center gap-2 mt-8 text-green-700 font-semibold hover:text-green-800 transition">
                সম্পূর্ণ কাঠামো দেখুন
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-3xl p-8">
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">সেবক ID কার্ড</h3>
                <p className="text-sm text-gray-500">QR স্ক্যান করে সেবকের পরিচয় যাচাই করুন</p>
              </div>
              {/* ID Card Mockup */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-xs mx-auto">
                <div className="bg-green-800 px-5 py-4 text-center">
                  <span className="text-white font-bold text-lg">নাগরিক সেবক</span>
                  <span className="block text-green-200 text-xs">বাংলাদেশ নাগরিক উন্নয়ন পরিষদ</span>
                </div>
                <div className="p-5 text-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                  <h4 className="font-bold text-gray-900">মোঃ আব্দুল করিম</h4>
                  <p className="text-xs text-gray-500">সাধারণ সদস্য</p>
                  <p className="text-xs text-green-700 font-medium mt-1">ঢাকা মহানগর কমিটি</p>
                  <div className="mt-3 w-24 h-24 bg-gray-100 rounded-lg mx-auto flex items-center justify-center border-2 border-dashed border-gray-200">
                    <span className="text-[10px] text-gray-400">QR Code</span>
                  </div>
                  <p className="text-[11px] text-gray-400 mt-2 font-mono uppercase">NXP-2026-00123</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 md:py-16 bg-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            {[
              { value: stats.citizens.toLocaleString() + "+", label: "নিবন্ধিত নাগরিক" },
              { value: stats.sebaks.toLocaleString() + "+", label: "সক্রিয় সেবক" },
              { value: stats.issues_resolved.toLocaleString() + "+", label: "সমস্যা সমাধান" },
              { value: stats.committees.toLocaleString(), label: "সক্রিয় কমিটি" },
            ].map((stat, i) => (
              <div key={i}>
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-400">{stat.value}</span>
                <span className="block text-xs sm:text-sm text-green-200 mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
            <span className="inline-block bg-purple-50 text-purple-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">মতামত</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">নাগরিকদের অভিজ্ঞতা</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-800 font-bold text-sm">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">{t.name}</h4>
                    <span className="text-xs text-gray-400">{t.role}, {t.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AppDownload />
      <Footer />
    </main>
  );
}
