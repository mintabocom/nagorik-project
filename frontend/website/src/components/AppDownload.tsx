import Link from "next/link";

export default function AppDownload() {
  return (
    <section id="download" className="py-20 bg-gradient-to-br from-green-800 to-green-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-400 rounded-full blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">আজই নাগরিক অ্যাপ ডাউনলোড করুন</h2>
          <p className="text-green-100 text-lg mb-8">
            আপনার এলাকার সমস্যা জানান, জরুরি সাহায্য পান, রক্তদান করুন — সব এক অ্যাপেই।
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Google Play */}
            <Link
              href="/download"
              className="inline-flex items-center gap-3 bg-black hover:bg-gray-900 text-white px-6 py-3.5 rounded-xl transition shadow-lg"
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.523 2.039l-4.975 8.6 5.07 5.564L21.997 2.3a.5.5 0 00-.723-.576l-3.751.315zM12.088 11.9L2.05 22.462a.5.5 0 00.577.724l16.94-9.773-5.07-5.564-.002.001-2.407 4.05zM1.56 1.882L6.18 10.8l5.548-3.203L2.137 1.159a.5.5 0 00-.577.723zM6.64 11.7L2.019 20.62a.5.5 0 00.118.558l.001.001 9.5-9.939L6.64 11.7z"/>
              </svg>
              <div className="text-left">
                <span className="text-[10px] text-gray-400 uppercase">Get it on</span>
                <span className="block text-base font-semibold -mt-0.5">Google Play</span>
              </div>
            </Link>

            {/* App Store */}
            <Link
              href="/download"
              className="inline-flex items-center gap-3 bg-black hover:bg-gray-900 text-white px-6 py-3.5 rounded-xl transition shadow-lg"
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <div className="text-left">
                <span className="text-[10px] text-gray-400 uppercase">Download on the</span>
                <span className="block text-base font-semibold -mt-0.5">App Store</span>
              </div>
            </Link>
          </div>
          <p className="text-green-200 text-sm mt-6">সাবস্ক্রিপশন মাত্র ১০ টাকা/মাস | ছাত্র ও প্রবীণদের ৫০% ছাড়</p>
        </div>
      </div>
    </section>
  );
}
