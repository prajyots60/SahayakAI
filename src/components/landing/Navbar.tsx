"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Story", href: "#story" },
  { label: "Trust Score", href: "#trust-score" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-emerald-100 bg-white/90 shadow-sm backdrop-blur"
          : "border-b border-transparent bg-white/70 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 text-base font-semibold text-white shadow-lg shadow-emerald-500/20">
            SA
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
              SahayakAI
            </span>
            <span className="-mt-1 text-base font-semibold text-slate-900">
              Financial Co-Pilot
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-emerald-700"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Button
            variant="ghost"
            asChild
            className="text-sm font-medium text-slate-700 hover:text-emerald-700"
          >
            <Link href="/login">Login</Link>
          </Button>
          <Button
            asChild
            className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:shadow-emerald-500/30"
          >
            <Link href="/signup">Sign Up for Free</Link>
          </Button>
        </div>

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-100 bg-white text-slate-700 shadow-sm lg:hidden"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-emerald-100 bg-white/95 backdrop-blur transition-[max-height] duration-300 lg:hidden ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 sm:px-6 lg:px-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-2 flex flex-col gap-2 border-t border-emerald-100 pt-4">
            <Button
              variant="outline"
              asChild
              className="text-sm font-medium text-slate-700 hover:border-emerald-300 hover:text-emerald-700"
            >
              <Link href="/login" onClick={() => setIsOpen(false)}>
                Login
              </Link>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-sm font-semibold text-white hover:shadow-lg hover:shadow-emerald-500/25"
            >
              <Link href="/signup" onClick={() => setIsOpen(false)}>
                Sign Up for Free
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
