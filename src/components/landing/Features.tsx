"use client";

import {
  Bot,
  CalendarCheck,
  Gauge,
  Handshake,
  ReceiptText,
} from "lucide-react";

const features = [
  {
    title: "Predictive health dashboard",
    description:
      "Live Business Health Score with scenario modelling and early warnings for cash, sales, and margins.",
    icon: Gauge,
  },
  {
    title: "AI business coach",
    description:
      "Ask anything and receive playbooks grounded in Indian market data, policies, and subsidies.",
    icon: Bot,
  },
  {
    title: "Smart receivables manager",
    description:
      "Forecast delayed collections, prioritise invoices, and auto-draft professional reminders.",
    icon: ReceiptText,
  },
  {
    title: "Compliance co-pilot",
    description:
      "Personalised statutory calendar for GST, PF, ESI, and more, complete with proactive nudges.",
    icon: CalendarCheck,
  },
  {
    title: "Investor connect & Trust Score",
    description:
      "Share a verified Trust Score narrative with investors and lenders—your new digital collateral.",
    icon: Handshake,
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-white py-20 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-600">
            Why SahayakAI
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Practical intelligence tailored for MSME growth
          </h2>
          <p className="mt-4 text-base text-slate-600">
            We focus on the four capabilities every owner needs to monitor
            health, anticipate risk, and act on time.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group flex h-full flex-col gap-4 rounded-3xl border border-emerald-100/80 bg-[#f5f9f5] p-6 shadow-lg shadow-emerald-500/5 transition hover:-translate-y-1 hover:border-emerald-200 hover:bg-white"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm shadow-emerald-500/10 group-hover:text-emerald-700">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                {feature.title}
              </h3>
              <p className="text-sm leading-6 text-slate-600">
                {feature.description}
              </p>
              <div className="mt-auto h-px w-full bg-gradient-to-r from-transparent via-emerald-200/70 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
