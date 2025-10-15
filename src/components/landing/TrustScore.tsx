"use client";

import { Activity, BarChart3, Cable, Handshake, Sparkles } from "lucide-react";

const stages = [
  {
    title: "Connect data sources",
    description:
      "Upload monthly statements or sync GST, banking, and ERP data. Our connectors normalise every number in minutes.",
    icon: Cable,
    accent: "from-emerald-400 via-teal-400 to-emerald-500",
  },
  {
    title: "Diagnose and predict",
    description:
      "Our AI models benchmark you against sector peers, simulate cash scenarios, and anticipate compliance gaps before they hit.",
    icon: Activity,
    accent: "from-emerald-500 via-lime-400 to-emerald-600",
  },
  {
    title: "Reveal your Trust Score",
    description:
      "A single forward-looking score distils liquidity, profitability, receivables discipline, and compliance posture.",
    icon: BarChart3,
    accent: "from-teal-400 via-emerald-400 to-emerald-600",
  },
  {
    title: "Activate opportunities",
    description:
      "Share verified insights with investors, unlock tailored recommendations, and auto-generate banker-ready updates.",
    icon: Handshake,
    accent: "from-emerald-400 via-green-400 to-emerald-600",
  },
];

const signalHighlights = [
  {
    label: "Cash stress",
    value: "-₹6.5L in 21 days",
    tone: "text-emerald-200",
  },
  {
    label: "Collections alert",
    value: "4 invoices slipping",
    tone: "text-teal-200",
  },
  {
    label: "Growth move",
    value: "Ramp marketing 12%",
    tone: "text-lime-200",
  },
];

export default function TrustScore() {
  return (
    <section id="trust-score" className="bg-[#f2faf4] py-24 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-emerald-700">
              The Trust Score loop
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
                Every signal feeds a living score your stakeholders can trust.
              </h2>
              <p className="max-w-2xl text-base text-slate-600">
                SahayakAI transforms messy operational data into an always-fresh
                Trust Score. It reveals where you stand today, what could go
                wrong tomorrow, and the safest path to growth capital.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {signalHighlights.map((signal) => (
                <div
                  key={signal.label}
                  className="rounded-3xl border border-emerald-200/70 bg-white p-5 shadow-sm shadow-emerald-500/5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-600">
                    {signal.label}
                  </p>
                  <p className={`mt-3 text-lg font-semibold ${signal.tone}`}>
                    {signal.value}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    AI action plan ready
                  </p>
                </div>
              ))}
            </div>
            <div className="rounded-[2.5rem] border border-emerald-200/70 bg-white p-6 shadow-xl shadow-emerald-500/10">
              <div className="flex items-start gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                  <Sparkles className="h-6 w-6" />
                </span>
                <div className="space-y-2">
                  <p className="text-sm font-semibold uppercase tracking-[0.32em] text-emerald-600">
                    Investor-ready in one click
                  </p>
                  <p className="text-sm text-slate-600">
                    Generate a concise update with your latest Trust Score,
                    movement over time, and the actions taken so far. Share it
                    securely with your banker, CA, or investors.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            {stages.map((stage) => (
              <div
                key={stage.title}
                className="group overflow-hidden rounded-[2rem] border border-emerald-200/70 bg-white p-6 shadow-xl shadow-emerald-500/10 transition hover:-translate-y-1 hover:shadow-emerald-500/20"
              >
                <div
                  className={`h-1 w-full rounded-full bg-gradient-to-r ${stage.accent}`}
                />
                <div className="mt-5 flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                    <stage.icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {stage.title}
                    </h3>
                    <p className="text-sm leading-6 text-slate-600">
                      {stage.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
