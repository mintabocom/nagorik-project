import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Terms() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="bg-gray-50 py-12 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">ব্যবহারের শর্তাবলী (Terms of Service)</h1>
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 prose prose-green max-w-none">
            <p className="text-gray-600 leading-relaxed mb-6">
              নাগরিক অ্যাপ ও ওয়েবসাইট ব্যবহারের মাধ্যমে আপনি নিচের শর্তাবলী মেনে নিচ্ছেন বলে গণ্য হবে। অনুগ্রহ করে শর্তগুলো মনোযোগ সহকারে পড়ুন।
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">১. সঠিক তথ্য প্রদান</h2>
            <p className="text-gray-600 mb-6">
              অ্যাপে রেজিস্ট্রেশন করার সময় অবশ্যই আপনার নিজের সঠিক নাম ও মোবাইল নম্বর ব্যবহার করতে হবে। অন্যের পরিচয় ব্যবহার করে অ্যাকাউন্ট খোলা দণ্ডনীয় অপরাধ। ভুয়া তথ্য দিলে আপনার অ্যাকাউন্টটি যেকোনো সময় স্থায়ীভাবে বন্ধ করে দেওয়া হতে পারে।
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">২. সমস্যা রিপোর্টিং</h2>
            <p className="text-gray-600 mb-6">
              এলাকার সমস্যা রিপোর্ট করার সময় অবশ্যই বাস্তব ও সঠিক চিত্র তুলে ধরতে হবে। কাউকে সামাজিকভাবে হেয় করার উদ্দেশ্যে বা উদ্দেশ্যপ্রণোদিতভাবে মিথ্যা অভিযোগ বা গুজব ছড়ানো যাবে না। এ জাতীয় কার্যক্রমের জন্য আপনি ব্যক্তিগতভাবে দায়ী থাকবেন।
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">৩. সেবক ও কমিটির আচরণ</h2>
            <p className="text-gray-600 mb-6">
              সেবক হিসেবে দায়িত্ব পালনের সময় নাগরিকদের সাথে সৌজন্যমূলক আচরণ করতে হবে। কোনো প্রকার ব্যক্তিগত স্বার্থ বা অনৈতিক লেনদেনের প্রমাণ পাওয়া গেলে সদস্যপদ বাতিল করা হবে।
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">৪. পেমেন্ট ও সাবস্ক্রিপশন</h2>
            <p className="text-gray-600 mb-6">
              সেবক অ্যাপের জন্য নির্ধারিত মাসিক চাঁদা সময়মতো পরিশোধ করতে হবে। বকেয়া চাঁদা না দিলে সেবক হিসেবে আপনার আইডিটি নিষ্ক্রিয় হয়ে যেতে পারে। পেমেন্টের জন্য আমরা বিকাশ, নগদ ও রকেটের মতো নিরাপদ মাধ্যম ব্যবহার করি।
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">৫. দায়বদ্ধতা</h2>
            <p className="text-gray-600 mb-6">
              সংগঠন আপনার এলাকার সমস্যা সমাধানে সহায়কের ভূমিকা পালন করে। তবে সকল সমস্যা সমাধানের নিশ্চয়তা বা সময়সীমা প্রশাসনের ওপর নির্ভর করে। সংগঠন কোনো প্রকার উস্কানিমূলক বা বেআইনি কার্যকলাপের দায়ভার গ্রহণ করবে না।
            </p>

            <div className="mt-12 pt-8 border-t border-gray-100 text-sm text-gray-400 italic">
              শেষ আপডেট: ১ জানুয়ারি, ২০২৪
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
