"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden" id="home">
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 via-white to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(20,83,45,0.2),_transparent_50%)]" />
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-20 sm:py-24 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:py-28 lg:px-8">
        <div className="relative z-10 space-y-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/70 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600 shadow-sm">
            Financial health monitor for MSMEs
          </div>
          <div className="space-y-7">
            <h1 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl lg:text-[3.25rem]">
              Stop reacting to business problems.
              <span className="block bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 bg-clip-text text-transparent">
                Start predicting them.
              </span>
            </h1>
            <p className="max-w-xl text-lg text-slate-600">
              SahayakAI continuously tracks your revenue, expenses, cash flow,
              and compliance milestones to surface risks early and hand you a
              precise, actionable playbook tailored for India.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="h-12 w-full rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 px-6 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:shadow-emerald-500/30 sm:w-auto"
            >
              <Link href="/signup">
                Get your free business health score
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Link
              href="#how-it-works"
              className="flex h-12 items-center justify-center rounded-xl border border-emerald-200 px-6 text-sm font-semibold text-emerald-700 transition hover:border-emerald-300 hover:text-emerald-800"
            >
              See how it works
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Cash alerts",
                description: "Forecasts 30 days ahead",
              },
              {
                title: "Advisor on call",
                description: "24/7 AI guidance",
              },
              {
                title: "Built for India",
                description: "Works with GST & MSME data",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-emerald-100 bg-white/90 p-4 shadow-sm"
              >
                <p className="text-sm font-semibold text-slate-900">
                  {item.title}
                </p>
                <p className="text-sm text-slate-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <div className="rounded-3xl border border-emerald-50 bg-slate-900/95 p-6 text-slate-100 shadow-2xl shadow-emerald-500/10">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-400">Business health</p>
                <p className="mt-2 text-3xl font-semibold text-white">
                  87 / 100
                </p>
              </div>
              <div className="rounded-xl bg-emerald-500/15 px-3 py-1 text-sm font-medium text-emerald-300">
                Stable outlook
              </div>
            </div>
            <div className="mt-8 grid gap-4 text-sm">
              {[
                {
                  label: "Cash runway",
                  value: "42 days",
                  color: "text-emerald-300",
                },
                {
                  label: "Sales trend",
                  value: "+18%",
                  color: "text-teal-300",
                },
                {
                  label: "Expense efficiency",
                  value: "76%",
                  color: "text-lime-200",
                },
              ].map((metric) => (
                <div
                  key={metric.label}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <span className="text-slate-300">{metric.label}</span>
                  <span className={`text-base font-semibold ${metric.color}`}>
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <ShieldCheck className="h-5 w-5 text-emerald-300" />
                <p>
                  Cash flow risk identified for 18 October. Preventive plan
                  shared with you and flagged for your banker.
                </p>
              </div>
            </div>
          </div>

          <div className="absolute -left-8 -top-8 hidden rounded-2xl border border-emerald-100 bg-white/95 p-4 shadow-lg shadow-emerald-500/10 sm:flex sm:max-w-xs">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  10,000+ reports
                </p>
                <p className="text-xs text-slate-500">
                  Generated for MSMEs across India
                </p>
              </div>
            </div>
          </div>

          <div className="absolute -right-6 bottom-12 hidden rounded-2xl border border-emerald-100 bg-white/95 p-4 shadow-lg shadow-emerald-500/10 sm:flex sm:max-w-xs">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                <TrendingUp className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  3x faster action
                </p>
                <p className="text-xs text-slate-500">
                  Teams resolve issues before they escalate
                </p>
              </div>
            </div>
          </div>

          <div className="absolute inset-x-8 -bottom-10 hidden rounded-3xl border border-emerald-100 bg-white px-5 py-4 shadow-xl shadow-emerald-500/10 sm:block">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Image src="/globe.svg" alt="Globe" width={24} height={24} />
                <p>Connected bank accounts</p>
              </div>
              <p className="font-semibold text-emerald-700">4 of 4 synced</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
