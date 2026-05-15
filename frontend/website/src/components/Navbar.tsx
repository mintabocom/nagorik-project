"use client";
import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "হোম" },
  { href: "/about", label: "আমাদের সম্পর্কে" },
  { href: "/organization", label: "সংগঠন" },
  { href: "/pricing", label: "মূল্য তালিকা" },
  { href: "/faq", label: "প্রশ্নোত্তর" },
  { href: "/success-stories", label: "সফলতার গল্প" },
  { href: "/contact", label: "যোগাযোগ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-green-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <div>
                <span className="text-xl font-bold text-green-900">নাগরিক</span>
                <span className="text-[10px] block -mt-1 text-gray-500">BCRC</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-green-800 hover:bg-gray-50 transition"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/download"
              className="ml-2 px-4 py-2 bg-green-800 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition shadow-sm"
            >
              অ্যাপ ডাউনলোড
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-50"
              aria-label="মেনু"
            >
              {open ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-green-800 hover:bg-gray-50 transition"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/download"
              onClick={() => setOpen(false)}
              className="block px-3 py-2 bg-green-800 text-white rounded-lg text-sm font-medium text-center mt-2 hover:bg-green-700 transition"
            >
              অ্যাপ ডাউনলোড
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
