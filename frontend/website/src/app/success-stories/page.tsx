import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppDownload from "@/components/AppDownload";

export default function SuccessStories() {
  const stories = [
    {
      title: "মিরপুরের জরাজীর্ণ রাস্তা সংস্কার",
      category: "রাস্তাঘাট",
      location: "মিরপুর-১০, ঢাকা",
      desc: "নাগরিক অ্যাপে ছবিসহ অভিযোগ করার মাত্র ৭ দিনের মধ্যে স্থানীয় সেবকদের তৎপরতায় সংশ্লিষ্ট কর্তৃপক্ষের মাধ্যমে রাস্তাটি সংস্কার করা হয়।",
      date: "১৫ মে, ২০২৪",
      icon: "🛣️"
    },
    {
      title: "জরুরি রক্তদান - ১ ঘণ্টার মধ্যে সমাধান",
      category: "রক্তদান",
      location: "চট্টগ্রাম মেডিকেল",
      desc: "এবি নেগেটিভ (AB-) রক্তের জরুরি প্রয়োজনে অ্যাপে আবেদন করার ৪৫ মিনিটের মধ্যে একজন সেবক রক্তদাতা খুঁজে দেন এবং রোগীর প্রাণ রক্ষা পায়।",
      date: "১০ মে, ২০২৪",
      icon: "🩸"
    },
    {
      title: "অন্ধকার রাস্তায় বাতি স্থাপন",
      category: "আলো ও বিদ্যুৎ",
      location: "রাজশাহী উপশহর",
      desc: "এলাকার স্ট্রিট লাইট নষ্ট থাকায় চুরির ভয় ছিল। অ্যাপে রিপোর্ট করার পর সেবকরা সিটি কর্পোরেশনের সাথে সমন্বয় করে ২ দিনের মধ্যে বাতি সচল করেন।",
      date: "০৫ মে, ২০২৪",
      icon: "💡"
    },
    {
      title: "অবৈধ স্থাপনা উচ্ছেদ",
      category: "জননিরাপত্তা",
      location: "বনানী বাজার",
      desc: "ফুটপাত দখল করে অবৈধ দোকান বসানো হয়েছিল। নাগরিকদের গণ-রিপোর্টের ভিত্তিতে প্রশাসনের সহায়তায় ফুটপাত মুক্ত করা হয়েছে।",
      date: "২৮ এপ্রিল, ২০২৪",
      icon: "👮"
    },
    {
      title: "পানির পাম্প মেরামত",
      category: "ওয়াসা ও পানি",
      location: "খুলনা সদর",
      desc: "টানা ৩ দিন পানি না থাকায় দুর্ভোগে ছিল ৫০০ পরিবার। অ্যাপের মাধ্যমে অভিযোগ করার ২৪ ঘণ্টার মধ্যে পাম্পটি মেরামত করা হয়।",
      date: "২০ এপ্রিল, ২০২৪",
      icon: "🚰"
    },
    {
      title: "হারানো শিশুর সন্ধান",
      category: "জরুরি সাহায্য",
      location: "বরিশাল লঞ্চ ঘাট",
      desc: "লঞ্চ ঘাটে হারিয়ে যাওয়া একটি শিশুকে অ্যাপের নেটওয়ার্ক ব্যবহার করে ২ ঘণ্টার মধ্যে তার পরিবারের কাছে হস্তান্তর করা হয়।",
      date: "১০ এপ্রিল, ২০২৪",
      icon: "👶"
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-br from-green-900 to-green-950 text-white py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-green-700/50 text-green-200 text-sm font-medium px-4 py-1.5 rounded-full mb-4">সফলতার গল্প</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">নাগরিকদের বিজয় গাঁথা</h1>
          <p className="text-green-200 text-lg max-w-2xl mx-auto">
            আপনার একটি ছোট রিপোর্ট কীভাবে একটি বড় পরিবর্তন আনতে পারে, তার বাস্তব কিছু উদাহরণ।
          </p>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-12 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story, i) => (
              <div key={i} className="group flex flex-col bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="bg-green-50 p-10 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform">
                  {story.icon}
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">{story.category}</span>
                    <span className="text-gray-400 text-xs">{story.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors">{story.title}</h3>
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                    {story.desc}
                  </p>
                  <div className="mt-auto pt-6 border-t border-gray-50 flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {story.location}
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
