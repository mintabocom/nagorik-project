import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppDownload from "@/components/AppDownload";

export default function About() {
  const identity = [
    { label: "প্রতিষ্ঠা", value: "জানুয়ারি, ২০২৪" },
    { label: "ধরন", value: "অরাজনৈতিক নাগরিক সংগঠন" },
    { label: "সদর দপ্তর", value: "ঢাকা, বাংলাদেশ" },
    { label: "কার্যক্ষেত্র", value: "সমগ্র বাংলাদেশ" },
  ];

  const mission = [
    "নাগরিকদের অধিকার সচেতন করা",
    "স্থানীয় সমস্যা সমাধানে সেতুবন্ধন তৈরি",
    "জরুরি সেবার সহজলভ্যতা নিশ্চিত করা",
    "স্বেচ্ছাসেবী মনোভাব গড়ে তোলা",
  ];

  const principles = [
    { icon: "🤝", title: "একতা", desc: "দল-মতের ঊর্ধ্বে উঠে নাগরিক স্বার্থে ঐক্যবদ্ধ হওয়া।" },
    { icon: "🛡️", title: "সততা", desc: "প্রতিটি কার্যক্রমে স্বচ্ছতা ও জবাবদিহিতা নিশ্চিত করা।" },
    { icon: "⚡", title: "তৎপরতা", desc: "যেকোনো জরুরি প্রয়োজনে দ্রুত সাড়া প্রদান করা।" },
    { icon: "🌱", title: "সেবা", desc: "নিঃস্বার্থভাবে মানুষের কল্যাণে কাজ করা।" },
    { icon: "⚖️", title: "ন্যায়বিচার", desc: "নাগরিক অধিকার আদায়ে সোচ্চার থাকা।" },
    { icon: "🌐", title: "অন্তর্ভুক্তি", desc: "ধর্ম-বর্ণ নির্বিশেষে সবার জন্য সমান সুযোগ।" },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-br from-green-900 to-green-950 text-white py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-green-700/50 text-green-200 text-sm font-medium px-4 py-1.5 rounded-full mb-4">আমাদের সম্পর্কে</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">বাংলাদেশ নাগরিক উন্নয়ন পরিষদ</h1>
          <p className="text-green-200 text-lg max-w-2xl mx-auto">
            আমরা একটি অরাজনৈতিক ও অলাভজনক সংগঠন, যা বাংলাদেশের নাগরিকদের জীবনমান উন্নয়নে নিবেদিত।
          </p>
        </div>
      </section>

      {/* Identity */}
      <section className="py-10 md:py-16 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">সংগঠনের পরিচয়</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {identity.map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-4 border border-green-100 shadow-sm">
                <span className="text-xs text-green-600 font-medium">{item.label}</span>
                <p className="text-gray-900 font-semibold mt-1">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-green-50 rounded-3xl p-8 md:p-12">
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-3xl mb-6">🎯</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">আমাদের লক্ষ্য (Mission)</h2>
              <ul className="space-y-4">
                {mission.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-green-800">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-gray-700 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50 rounded-3xl p-8 md:p-12">
              <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-3xl mb-6">🔭</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">আমাদের স্বপ্ন (Vision)</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                একটি আদর্শ ডিজিটাল বাংলাদেশ গড়ে তোলা যেখানে প্রতিটি নাগরিক তাদের অধিকার সম্পর্কে সচেতন থাকবে এবং যেকোনো সমস্যায় দ্রুত সমাধান পাবে। আমরা চাই প্রতিটি ওয়ার্ড পর্যায়ে একটি শক্তিশালী মানবিক নেটওয়ার্ক তৈরি করতে।
              </p>
              <div className="flex items-center gap-4 text-amber-700 font-semibold">
                <span>১০০% ডিজিটাল সেবা</span>
                <span>•</span>
                <span>০% দুর্নীতি</span>
                <span>•</span>
                <span>১০০% নাগরিক সচেতনতা</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-12 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">দর্শন ও মূলনীতি</h2>
            <p className="text-gray-500">আমাদের প্রতিটি কাজ পরিচালিত হয় এই আদর্শগুলোর ওপর ভিত্তি করে।</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition">
                <span className="text-4xl block mb-4">{item.icon}</span>
                <h3 className="font-bold text-gray-900 text-xl mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
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
