"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppDownload from "@/components/AppDownload";
import Link from "next/link";

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  const plans = [
    {
      name: "নাগরিক অ্যাপ",
      badge: "ঐচ্ছিক",
      icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      desc: "সাধারণ নাগরিকদের জন্য। বেসিক সুবিধা সম্পূর্ণ বিনামূল্যে।",
      freeTier: {
        price: "বিনামূল্যে",
        label: "সারাজীবনের জন্য",
        features: ["সমস্যা জমা দেওয়া ও ট্র্যাকিং", "জরুরি SOS সাহায্য", "রক্তদান নেটওয়ার্ক", "সরকারি সেবা গাইড"]
      },
      premiumTier: {
        monthly: 10,
        yearly: 100,
        features: ["ফ্রি প্ল্যানের সব সুবিধা", "জনমত জরিপ তৈরি", "প্রায়োরিটি সমস্যা সাপোর্ট", "কমিউনিটি ব্যাজ ও পুরস্কার"]
      },
      buttonText: "বিনামূল্যে শুরু করুন",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      accentColor: "border-blue-100",
      isPopular: false
    },
    {
      name: "সেবক অ্যাপ",
      badge: "কমিটি সদস্য",
      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
      iconBg: "bg-green-100",
      iconColor: "text-green-700",
      desc: "কমিটি সদস্যদের জন্য আলাদা অ্যাপ — সংগঠন পরিচালনার পূর্ণ টুলস।",
      isMandatory: true,
      monthly: 100,
      yearly: 1000,
      features: [
        "কমিটি ড্যাশবোর্ড ও ম্যানেজমেন্ট",
        "নাগরিকদের সমস্যা গ্রহণ ও সমাধান",
        "সভা, ইভেন্ট ও ঘোষণা পরিচালনা",
        "সদস্য তালিকা, পদ ও ই-কার্ড",
        "মাসিক কার্যক্রম রিপোর্ট",
        "নাগরিক অ্যাপের সব সুবিধা বিনামূল্যে"
      ],
      buttonText: "সেবক অ্যাপ ডাউনলোড",
      buttonColor: "bg-green-700 hover:bg-green-800",
      accentColor: "border-green-600",
      isPopular: true
    },
    {
      name: "জনসেবক অ্যাপ",
      badge: "নির্বাচিত ও প্রার্থী",
      icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      desc: "ওয়ার্ড সদস্য থেকে এমপি পর্যন্ত — সকল নির্বাচিত প্রতিনিধি ও নির্বাচনী প্রার্থীদের জন্য।",
      monthly: 500,
      yearly: 5000,
      features: [
        "এলাকার সমস্যার রিয়েলটাইম ফিড",
        "সমস্যা সরাসরি সমাধান ও রেসপন্স",
        "ওয়ার্ড/ইউনিয়ন ভিত্তিক পরিসংখ্যান",
        "নাগরিকদের সাথে সরাসরি যোগাযোগ",
        "ভেরিফাইড অফিশিয়াল প্রোফাইল",
        "নির্বাচনী ইস্যু ট্র্যাকার"
      ],
      buttonText: "অ্যাক্সেসের জন্য আবেদন",
      buttonColor: "bg-amber-500 hover:bg-amber-600",
      accentColor: "border-amber-100",
      isPopular: false
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-900 to-green-950 text-white py-12 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-green-700/50 text-green-200 text-sm font-medium px-4 py-1.5 rounded-full mb-4">তিনটি আলাদা অ্যাপ</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">সবার জন্য সঠিক প্ল্যান</h1>
          <p className="text-green-200 text-lg">নাগরিক, সেবক ও জনসেবক — প্রতিটি অ্যাপ আলাদা, প্রতিটির পেমেন্টের কারণও আলাদা।</p>
        </div>
      </section>

      {/* Billing Toggle */}
      <section className="py-12 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-4 mb-0">
            <span className={`text-sm font-bold ${!yearly ? 'text-gray-900' : 'text-gray-400'}`}>মাসিক</span>
            <button
              onClick={() => setYearly(!yearly)}
              className={`relative w-14 h-7 rounded-full transition-colors duration-200 focus:outline-none ${yearly ? 'bg-green-600' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${yearly ? 'translate-x-7' : 'translate-x-0'}`} />
            </button>
            <span className={`text-sm font-bold flex items-center gap-2 ${yearly ? 'text-gray-900' : 'text-gray-400'}`}>
              বার্ষিক <span className="bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 rounded-full">২ মাস ফ্রি</span>
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="py-12 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`flex flex-col bg-white rounded-3xl border ${plan.isPopular ? 'border-green-600 ring-4 ring-green-50 shadow-2xl scale-105 z-10' : 'border-gray-200 shadow-sm'} overflow-hidden relative transition-transform hover:scale-[1.02]`}
              >
                {plan.isPopular && (
                  <div className="bg-green-600 text-white text-[10px] font-bold text-center py-1.5 tracking-widest uppercase">
                    সংগঠনের চাঁদা — বাধ্যতামূলক
                  </div>
                )}
                <div className="p-8 flex-1">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 ${plan.iconBg} rounded-xl flex items-center justify-center`}>
                      <svg className={`w-6 h-6 ${plan.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={plan.icon} />
                      </svg>
                    </div>
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase ${plan.iconBg} ${plan.iconColor}`}>
                      {plan.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed">{plan.desc}</p>

                  {/* Price */}
                  <div className="mb-8">
                    {plan.freeTier ? (
                      <div className="space-y-6">
                        <div className="bg-blue-50 rounded-2xl p-4">
                          <span className="text-3xl font-bold text-gray-900">{plan.freeTier.price}</span>
                          <span className="block text-xs text-blue-600 font-medium mt-1">{plan.freeTier.label}</span>
                        </div>
                        <div className="text-center text-gray-400 text-xs font-bold uppercase tracking-widest">অথবা প্রিমিয়াম</div>
                        <div>
                          <span className="text-3xl font-bold text-blue-600">
                            ৳{yearly ? plan.premiumTier.yearly : plan.premiumTier.monthly}
                          </span>
                          <span className="text-gray-500 text-sm font-medium">/{yearly ? 'বছর' : 'মাস'}</span>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <span className={`text-4xl font-bold ${plan.iconColor}`}>
                          ৳{yearly ? plan.yearly : plan.monthly}
                        </span>
                        <span className="text-gray-500 text-sm font-medium">/{yearly ? 'বছর' : 'মাস'}</span>
                        {yearly && (
                          <p className="text-green-600 text-xs font-medium mt-2">২ মাস সাশ্রয় হবে!</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {(plan.freeTier ? plan.premiumTier.features : plan.features).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${plan.iconBg} ${plan.iconColor}`}>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-8 pt-0">
                  <Link
                    href="/download"
                    className={`block w-full text-center text-white font-bold py-4 rounded-2xl transition shadow-lg hover:shadow-xl ${plan.buttonColor}`}
                  >
                    {plan.buttonText}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discounts */}
      <section className="py-12 md:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-green-100 text-green-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">বিশেষ ছাড়</span>
            <h2 className="text-3xl font-bold text-gray-900">সকলের নাগালে</h2>
            <p className="text-gray-500 mt-2">কিছু বিশেষ শ্রেণির জন্য আমরা বিনামূল্যে বা বিশেষ ছাড়ে সেবা দিচ্ছি।</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🎓", title: "শিক্ষার্থী", discount: "৫০% ছাড়", color: "bg-blue-50 text-blue-600" },
              { icon: "👴", title: "প্রবীণ (৬০+)", discount: "৫০% ছাড়", color: "bg-orange-50 text-orange-600" },
              { icon: "♿", title: "প্রতিবন্ধী", discount: "বিনামূল্যে", color: "bg-purple-50 text-purple-600" },
              { icon: "🎖️", title: "মুক্তিযোদ্ধা", discount: "বিনামূল্যে", color: "bg-green-50 text-green-600" },
            ].map((item, i) => (
              <div key={i} className={`${item.color.split(' ')[0]} rounded-3xl p-6 text-center border border-white/50 shadow-sm`}>
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
                <div className={`text-xl font-black mt-1 ${item.color.split(' ')[1]}`}>{item.discount}</div>
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
