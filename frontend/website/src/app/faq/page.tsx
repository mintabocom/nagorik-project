"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppDownload from "@/components/AppDownload";
import Link from "next/link";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const faqGroups = [
    {
      category: "সাধারণ তথ্য",
      icon: "📌",
      items: [
        { q: "নাগরিক অ্যাপ কি?", a: "নাগরিক অ্যাপ হলো সাধারণ মানুষের জন্য একটি ডিজিটাল প্ল্যাটফর্ম যার মাধ্যমে তারা তাদের এলাকার সমস্যা সরাসরি রিপোর্ট করতে পারে, জরুরি সাহায্য পেতে পারে এবং বিভিন্ন নাগরিক সেবার তথ্য এক জায়গায় পায়।" },
        { q: "বাংলাদেশ নাগরিক উন্নয়ন পরিষদ কি একটি রাজনৈতিক দল?", a: "না। এটি সম্পূর্ণ অরাজনৈতিক ও অলাভজনক একটি নাগরিক সংগঠন যা সামাজিক উন্নয়ন ও নাগরিক অধিকার আদায়ে কাজ করে।" },
      ]
    },
    {
      category: "সেবক ও সদস্যপদ",
      icon: "🛡️",
      items: [
        { q: "সেবক হিসেবে কীভাবে যুক্ত হওয়া যায়?", a: "নাগরিক অ্যাপ ডাউনলোড করে 'সেবক হিসেবে আবেদন করুন' বাটনে ক্লিক করে ফরম পূরণ করুন। আপনার এলাকার কমিটি আপনার সাথে যোগাযোগ করবে।" },
        { q: "সেবক অ্যাপের চাঁদা দেওয়া কি বাধ্যতামূলক?", a: "হ্যাঁ। সংগঠনের পরিচালনা খরচ ও বিভিন্ন সেবা কার্যক্রম চালানোর জন্য প্রতিটি সদস্যকে মাসিক ১০০ টাকা চাঁদা প্রদান করতে হয়।" },
      ]
    },
    {
      category: "নিরাপত্তা ও গোপনীয়তা",
      icon: "🔒",
      items: [
        { q: "আমার রিপোর্ট করা তথ্যের গোপনীয়তা কতটুকু?", a: "আমরা ব্যবহারকারীর তথ্যের সর্বোচ্চ নিরাপত্তা নিশ্চিত করি। আপনি চাইলে বেনামেও দুর্নীতির রিপোর্ট প্রদান করতে পারেন।" },
        { q: "SOS বাটন কীভাবে কাজ করে?", a: "SOS বাটন চাপলে আপনার বর্তমান লোকেশন স্বয়ংক্রিয়ভাবে নিকটস্থ সেবক নেটওয়ার্ক ও আপনার জরুরি কন্টাক্ট লিস্টে চলে যায়।" },
      ]
    }
  ];

  const toggle = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-br from-green-900 to-green-950 text-white py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">সাধারণ প্রশ্নোত্তর</h1>
          <p className="text-green-200 text-lg max-w-xl mx-auto">নাগরিক অ্যাপ ও বাংলাদেশ নাগরিক উন্নয়ন পরিষদ সম্পর্কে সচরাচর জিজ্ঞাসিত প্রশ্নের উত্তর।</p>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {faqGroups.map((group, groupIdx) => (
              <div key={groupIdx}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">{group.icon}</span>
                  <h2 className="text-2xl font-bold text-gray-900">{group.category}</h2>
                </div>

                <div className="space-y-3">
                  {group.items.map((item, itemIdx) => {
                    const id = `${groupIdx}-${itemIdx}`;
                    const isOpen = openIndex === id;
                    return (
                      <div key={itemIdx} className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-green-200 bg-green-50/30' : 'border-gray-100'}`}>
                        <button
                          onClick={() => toggle(id)}
                          className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition"
                        >
                          <span className={`font-semibold text-lg pr-4 ${isOpen ? 'text-green-800' : 'text-gray-800'}`}>{item.q}</span>
                          <svg className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-6 animate-in fade-in slide-in-from-top-2 duration-300">
                            <p className="text-gray-600 leading-relaxed text-lg pt-2 border-t border-green-100">
                              {item.a}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Still have questions */}
          <div className="mt-20 text-center bg-green-900 rounded-[2.5rem] p-10 md:p-16 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-800 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50"></div>
            <div className="relative z-10">
              <span className="text-6xl block mb-6">🤔</span>
              <h3 className="text-3xl font-bold mb-4">আরও প্রশ্ন আছে?</h3>
              <p className="text-green-200 mb-8 text-lg">আপনার মনে যদি আরও কোনো জিজ্ঞাসা থাকে, সরাসরি আমাদের সাথে যোগাযোগ করতে পারেন।</p>
              <Link href="/contact" className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold px-10 py-4.5 rounded-2xl transition shadow-lg hover:scale-105 active:scale-95">
                যোগাযোগ করুন
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <AppDownload />
      <Footer />
    </main>
  );
}
