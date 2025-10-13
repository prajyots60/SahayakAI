"use client";

import { BellRing, LineChart, ShieldCheck, Sparkles } from "lucide-react";

const features = [
  {
    title: "Predictive risk score",
    description:
      "Spot cash dips and revenue slowdowns up to 30 days in advance with clear severity levels.",
    icon: LineChart,
  },
  {
    title: "AI business advisor",
    description:
      "Ask questions any time and get answers tuned to Indian MSME policies, schemes, and realities.",
    icon: Sparkles,
  },
  {
    title: "Interactive trend analysis",
    description:
      "Visualise revenue, expenses, and profit trends in a single view that your team can act on immediately.",
    icon: BellRing,
  },
  {
    title: "Personalised alerts",
    description:
      "Receive nudges on WhatsApp and email before small issues become big problems that impact cash flow.",
    icon: ShieldCheck,
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

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
