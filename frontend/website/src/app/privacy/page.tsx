import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Privacy() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="bg-gray-50 py-12 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">গোপনীয়তা নীতি (Privacy Policy)</h1>
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 prose prose-green max-w-none">
            <p className="text-gray-600 leading-relaxed mb-6">
              বাংলাদেশ নাগরিক উন্নয়ন পরিষদ (BCRC) আপনার ব্যক্তিগত তথ্যের সুরক্ষায় প্রতিশ্রুতিবদ্ধ। আমাদের 'নাগরিক', 'সেবক' এবং 'জনসেবক' অ্যাপ ও ওয়েবসাইট ব্যবহারের ক্ষেত্রে আমরা কীভাবে আপনার তথ্য সংগ্রহ, ব্যবহার এবং সংরক্ষণ করি তা এখানে বিস্তারিত জানানো হয়েছে।
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">১. তথ্য সংগ্রহ</h2>
            <p className="text-gray-600 mb-4">আমরা নিচের তথ্যগুলো সংগ্রহ করতে পারি:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li>নাম এবং মোবাইল নম্বর (রেজিস্ট্রেশনের জন্য)</li>
              <li>ঠিকানা ও লোকেশন ডেটা (সমস্যা রিপোর্ট এবং SOS সেবার জন্য)</li>
              <li>রক্তের গ্রুপ (রক্তদান নেটওয়ার্কের জন্য)</li>
              <li>প্রোফাইল ছবি (ঐচ্ছিক)</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">২. তথ্যের ব্যবহার</h2>
            <p className="text-gray-600 mb-4">সংগৃহীত তথ্য নিচের উদ্দেশ্যে ব্যবহৃত হয়:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li>আপনার এলাকার সমস্যা সমাধানে সংশ্লিষ্ট সেবকদের কাছে তথ্য পৌঁছানো।</li>
              <li>জরুরি প্রয়োজনে (SOS) আপনার লোকেশন কাছের সেবকদের জানানো।</li>
              <li>রক্তের প্রয়োজনে আপনার সাথে যোগাযোগ করা (যদি আপনি রক্তদাতা হিসেবে নিবন্ধিত থাকেন)।</li>
              <li>সংগঠনের প্রয়োজনীয় নোটিশ বা আপডেট জানানো।</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">৩. তথ্য সুরক্ষা</h2>
            <p className="text-gray-600 mb-6">
              আপনার তথ্য এনক্রিপ্টেড সার্ভারে সংরক্ষিত থাকে। আমরা কোনো অবস্থাতেই আপনার ব্যক্তিগত তথ্য তৃতীয় কোনো বাণিজ্যিক প্রতিষ্ঠানের কাছে বিক্রি বা বিনিময় করি না। শুধুমাত্র আইনগত বাধ্যবাধকতা থাকলে বা নাগরিক অধিকার সুরক্ষায় প্রশাসনিক প্রয়োজনে তথ্য শেয়ার করা হতে পারে।
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">৪. আপনার অধিকার</h2>
            <p className="text-gray-600 mb-6">
              আপনি যেকোনো সময় আপনার প্রোফাইল তথ্য আপডেট বা ডিলিট করার আবেদন করতে পারেন। এছাড়া অ্যাপের সেটিংস থেকে আপনি চাইলে লোকেশন পারমিশন অফ করে রাখতে পারেন (তবে এতে জরুরি সেবা বিঘ্নিত হতে পারে)।
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
