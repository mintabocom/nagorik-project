import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppDownload from "@/components/AppDownload";
import Link from "next/link";

export default function Organization() {
  const orgLevelConfig = [
    { name: 'কেন্দ্রীয় কমিটি', nameEn: 'Central Committee', desc: 'দলের সর্বোচ্চ নীতি নির্ধারণী সংস্থা।', color: 'bg-green-900', lightColor: 'bg-green-50 border-green-200', textColor: 'text-green-900', icon: '🏛️', committees: 1, members: 21 },
    { name: 'বিভাগীয় কমিটি', nameEn: 'Divisional Committee', desc: '৮টি বিভাগে সমন্বয় ও তত্ত্বাবধান।', color: 'bg-green-700', lightColor: 'bg-teal-50 border-teal-200', textColor: 'text-green-700', icon: '🗺️', committees: 8, members: 160 },
    { name: 'জেলা কমিটি', nameEn: 'District Committee', desc: 'জেলা পর্যায়ে সাংগঠনিক কার্যক্রম পরিচালনা।', color: 'bg-green-600', lightColor: 'bg-green-50 border-green-200', textColor: 'text-green-700', icon: '🏢', committees: 64, members: 1300 },
    { name: 'মহানগর কমিটি', nameEn: 'Metropolitan Committee', desc: 'সিটি কর্পোরেশন এলাকার কার্যক্রম পরিচালনা।', color: 'bg-green-800', lightColor: 'bg-emerald-50 border-emerald-200', textColor: 'text-green-800', icon: '🏙️', committees: 12, members: 240 },
    { name: 'উপজেলা কমিটি', nameEn: 'Upazila Committee', desc: 'উপজেলা পর্যায়ে মাঠ পর্যায়ের কাজ সমন্বয়।', color: 'bg-green-500', lightColor: 'bg-lime-50 border-lime-200', textColor: 'text-green-600', icon: '🏘️', committees: 495, members: 9900 },
    { name: 'পৌরসভা কমিটি', nameEn: 'Municipality Committee', desc: 'পৌরসভা এলাকায় সাংগঠনিক কার্যক্রম পরিচালনা।', color: 'bg-green-500', lightColor: 'bg-emerald-50 border-emerald-200', textColor: 'text-green-600', icon: '🏘️', committees: 330, members: 6600 },
    { name: 'ইউনিয়ন কমিটি', nameEn: 'Union Committee', desc: 'ইউনিয়ন পর্যায়ে তৃণমূল সংগঠন পরিচালনা।', color: 'bg-green-400', lightColor: 'bg-green-50 border-green-200', textColor: 'text-green-600', icon: '🏡', committees: 4571, members: 45000 },
    { name: 'ওয়ার্ড কমিটি', nameEn: 'Ward Committee', desc: 'সরাসরি জনগণের সাথে কাজ করার মূল ইউনিট।', color: 'bg-green-300', lightColor: 'bg-green-50 border-green-100', textColor: 'text-green-600', icon: '🏠', committees: 40000, members: 200000 },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-br from-green-900 to-green-950 text-white py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-green-700/50 text-green-200 text-sm font-medium px-4 py-1.5 rounded-full mb-4">সংগঠন</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">সাংগঠনিক কাঠামো</h1>
          <p className="text-green-200 text-lg max-w-2xl mx-auto">
            কেন্দ্র থেকে ওয়ার্ড পর্যন্ত — বাংলাদেশ নাগরিক উন্নয়ন পরিষদের সুসংগঠিত কমিটি কাঠামো।
          </p>
        </div>
      </section>

      {/* Organization Tree */}
      <section className="py-12 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-green-200"></div>

            {orgLevelConfig.map((org, i) => (
              <div key={i} className={`relative mb-12 last:mb-0 ${i % 2 === 0 ? 'md:pr-[calc(50%+2rem)]' : 'md:pl-[calc(50%+2rem)]'}`}>
                {/* Dot */}
                <div className={`absolute left-4 md:left-1/2 md:-translate-x-1/2 top-6 w-5 h-5 ${org.color} rounded-full border-4 border-white shadow-md z-10`}></div>

                {/* Card */}
                <div className={`ml-14 md:ml-0 ${org.lightColor} border rounded-2xl p-6 md:p-8 hover:shadow-lg transition-all duration-300 group`}>
                  <div className="flex items-start gap-5">
                    <span className="text-4xl shrink-0 group-hover:scale-110 transition-transform">{org.icon}</span>
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold ${org.textColor}`}>{org.name}</h3>
                      <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">{org.nameEn}</p>
                      <p className="text-gray-600 mb-4 leading-relaxed">{org.desc}</p>
                      <div className="flex flex-wrap gap-3">
                        <span className="inline-flex items-center gap-1.5 text-xs bg-white rounded-full px-3 py-1.5 text-gray-700 shadow-sm border border-gray-100">
                          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                          {org.committees.toLocaleString()} টি কমিটি
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs bg-white rounded-full px-3 py-1.5 text-gray-700 shadow-sm border border-gray-100">
                          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                          {org.members.toLocaleString()} জন সদস্য
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become Sebak CTA */}
      <section className="py-12 md:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-[2.5rem] p-8 sm:p-12 md:p-20 border border-green-100/50">
            <span className="text-6xl block mb-6 animate-bounce">🛡️</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">সেবক হতে চান?</h2>
            <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              আপনার এলাকায় নাগরিকদের সেবায় কাজ করতে চান? নাগরিক অ্যাপ ডাউনলোড করে সেবক হিসেবে আবেদন করুন।
            </p>
            <Link href="/download" className="inline-flex items-center gap-3 bg-green-800 hover:bg-green-700 text-white font-bold px-10 py-4.5 rounded-2xl transition shadow-xl hover:scale-105 active:scale-95">
              সেবক হিসেবে যোগ দিন
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      <AppDownload />
      <Footer />
    </main>
  );
}
