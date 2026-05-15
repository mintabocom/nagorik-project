import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Download() {
  const apps = [
    {
      id: "nagorik",
      name: "নাগরিক",
      icon: "🏛️",
      role: "সাধারণ নাগরিকদের জন্য",
      desc: "সমস্যা রিপোর্ট, জরুরি সাহায্য, রক্তদান, নামাজের সময় এবং সরকারি সেবার তথ্য এক অ্যাপেই।",
      features: ['🚨 জরুরি SOS', '📋 সমস্যা রিপোর্ট', '🩸 রক্তদান', '🕌 নামাজের সময়', '📊 জনমত জরিপ'],
      color: "from-green-900 to-green-800",
      accent: "green",
      apkUrl: "/downloads/nagorik.apk"
    },
    {
      id: "sebak",
      name: "সেবক",
      icon: "🛡️",
      role: "কমিটি মেম্বারদের জন্য",
      desc: "কমিটি মেম্বার হিসেবে নাগরিকদের সমস্যা গ্রহণ, সমাধান, মিটিং পরিচালনা — সব কাজ এক অ্যাপ থেকে।",
      features: ['📥 সমস্যা গ্রহণ', '✅ সমস্যা সমাধান', '📅 মিটিং', '👥 সদস্য ব্যবস্থাপনা', '📢 ঘোষণা'],
      color: "from-teal-900 to-teal-800",
      accent: "teal",
      apkUrl: "/downloads/sebak.apk",
      badge: "কমিটি মেম্বার"
    },
    {
      id: "jonosebak",
      name: "জনসেবক",
      icon: "⚖️",
      role: "জনপ্রতিনিধিদের জন্য",
      desc: "ইউপি চেয়ারম্যান, মেয়র, সংসদ সদস্য — জনপ্রতিনিধিরা তাদের এলাকার সমস্যা সরাসরি দেখতে ও সমাধান করতে পারবেন।",
      features: ['📊 ড্যাশবোর্ড', '📋 সমস্যা পর্যবেক্ষণ', '📈 পারফরম্যান্স', '🗳️ জনমত', '🏗️ উন্নয়ন প্রকল্প'],
      color: "from-indigo-900 to-indigo-800",
      accent: "indigo",
      apkUrl: "/downloads/jonosebak.apk"
    }
  ];

  const comparison = [
    { title: 'সমস্যা রিপোর্ট করা', nagorik: true, sebak: false, jonosebak: false },
    { title: 'সমস্যা গ্রহণ ও সমাধান', nagorik: false, sebak: true, jonosebak: true },
    { title: 'জরুরি সাহায্য (SOS)', nagorik: true, sebak: true, jonosebak: false },
    { title: 'রক্তদান নেটওয়ার্ক', nagorik: true, sebak: true, jonosebak: false },
    { title: 'নামাজের সময়', nagorik: true, sebak: true, jonosebak: false },
    { title: 'মিটিং পরিচালনা', nagorik: false, sebak: true, jonosebak: true },
    { title: 'সদস্য ব্যবস্থাপনা', nagorik: false, sebak: true, jonosebak: true },
    { title: 'এলাকার ড্যাশবোর্ড', nagorik: false, sebak: false, jonosebak: true },
    { title: 'পারফরম্যান্স রিপোর্ট', nagorik: false, sebak: false, jonosebak: true },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-gray-950 via-green-950 to-gray-950 text-white overflow-hidden py-24">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-[10%] w-80 h-80 bg-green-500/20 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-teal-500/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 text-sm mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              তিনটি অ্যাপ — এক মিশন
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              আপনার <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">ভূমিকা</span> বেছে নিন
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              নাগরিক, সেবক নাকি জনসেবক? প্রতিটি ভূমিকার জন্য আলাদা অ্যাপ — আলাদা ক্ষমতা।
            </p>
          </div>
        </div>
      </section>

      {/* App Cards */}
      <section className="py-24 bg-white -mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {apps.map((app) => (
              <div key={app.id} className="group relative flex flex-col bg-white rounded-[2.5rem] border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${app.color}`}></div>
                <div className="p-8 md:p-10 flex-1 flex flex-col">
                  {app.badge && (
                    <div className="absolute top-6 right-6 bg-amber-400 text-gray-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                      {app.badge}
                    </div>
                  )}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-inner bg-gray-50 group-hover:scale-110 transition-transform`}>
                    {app.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{app.name} <span className="text-gray-400 font-medium">অ্যাপ</span></h3>
                  <p className={`text-sm font-bold uppercase tracking-wider mb-4 ${app.accent === 'green' ? 'text-green-600' : app.accent === 'teal' ? 'text-teal-600' : 'text-indigo-600'}`}>
                    {app.role}
                  </p>
                  <p className="text-gray-500 mb-8 leading-relaxed">
                    {app.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-10">
                    {app.features.map((f, i) => (
                      <span key={i} className="bg-gray-50 text-gray-600 text-xs px-3 py-1.5 rounded-full border border-gray-100">
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto space-y-4">
                    <Link href={app.apkUrl} className={`flex items-center justify-center gap-3 w-full py-4.5 rounded-2xl text-white font-bold transition shadow-lg hover:shadow-xl ${app.accent === 'green' ? 'bg-green-800 hover:bg-green-700' : app.accent === 'teal' ? 'bg-teal-700 hover:bg-teal-600' : 'bg-indigo-800 hover:bg-indigo-700'}`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                      APK ডাউনলোড
                    </Link>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-black text-white py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold hover:bg-gray-900 transition">
                        Google Play
                      </button>
                      <button className="flex-1 bg-black text-white py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold hover:bg-gray-900 transition">
                        App Store
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">সুবিধার তুলনা</h2>
            <p className="text-gray-500">কোন অ্যাপটি আপনার জন্য সঠিক তা এক নজরে দেখে নিন।</p>
          </div>
          <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left py-6 px-8 text-gray-700 font-bold uppercase tracking-wider text-xs">সুবিধা</th>
                    <th className="text-center py-6 px-4 text-green-700 font-bold uppercase tracking-wider text-xs">নাগরিক</th>
                    <th className="text-center py-6 px-4 text-teal-700 font-bold uppercase tracking-wider text-xs">সেবক</th>
                    <th className="text-center py-6 px-4 text-indigo-700 font-bold uppercase tracking-wider text-xs">জনসেবক</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {comparison.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50/50 transition">
                      <td className="py-5 px-8 text-gray-700 font-medium">{row.title}</td>
                      <td className="text-center py-5 px-4">
                        {row.nagorik ? <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg></div> : <span className="text-gray-300">—</span>}
                      </td>
                      <td className="text-center py-5 px-4">
                        {row.sebak ? <div className="w-8 h-8 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg></div> : <span className="text-gray-300">—</span>}
                      </td>
                      <td className="text-center py-5 px-4">
                        {row.jonosebak ? <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg></div> : <span className="text-gray-300">—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
