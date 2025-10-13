"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

const inclusions = [
  "Full business health dashboard",
  "Predictive risk alerts (30-day outlook)",
  "AI business advisor with Indian context",
  "GST & compliance reminders",
  "Email and WhatsApp notifications",
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-white py-20 sm:py-24">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-600">
            Pricing
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Free for now. Pay only when you start seeing value.
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Early access founders get the entire platform—including risk
            predictions and the AI advisor—at no cost while we onboard MSMEs
            across India.
          </p>
        </div>

        <div className="mt-16 rounded-3xl border border-emerald-100 bg-[#f5f9f5] p-8 shadow-xl shadow-emerald-500/10 sm:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-emerald-500">
                Early access plan
              </p>
              <h3 className="text-2xl font-semibold text-slate-900">
                SahayakAI Complete Suite
              </h3>
              <p className="max-w-md text-sm text-slate-600">
                Everything you need to monitor financial health, spot risks
                ahead of time, and respond confidently.
              </p>
            </div>
            <div className="flex items-baseline gap-2 text-slate-900">
              <span className="text-4xl font-semibold">₹0</span>
              <span className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-600">
                Free for now
              </span>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {inclusions.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 text-sm text-slate-600"
              >
                <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Button
              asChild
              size="lg"
              className="h-12 w-full rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 px-6 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:shadow-emerald-500/30 sm:w-auto"
            >
              <Link href="/signup">Sign up and secure your spot</Link>
            </Button>
            <p className="text-xs text-slate-500">
              No credit card required. Export your data anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
