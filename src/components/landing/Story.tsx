"use client";

import {
  ArrowUpRight,
  Building2,
  HeartHandshake,
  ShieldCheck,
} from "lucide-react";

const pillars = [
  {
    title: "Built for Indian MSMEs",
    description:
      "Trained on Indian market data, GST flows, and case studies from manufacturing, retail, and services.",
    icon: Building2,
  },
  {
    title: "Trust-first approach",
    description:
      "Translates your operational data into a verified Trust Score that investors and banks can understand instantly.",
    icon: ShieldCheck,
  },
  {
    title: "Human guidance, AI speed",
    description:
      "Pairs automation with an always-on AI coach so every recommendation is contextual and actionable.",
    icon: HeartHandshake,
  },
];

const proofPoints = [
  "Daily health monitoring across cash, sales, and compliance",
  "Predictive Trust Score dashboards shared with advisors",
  "Investor-ready narratives without hiring analysts",
];

export default function Story() {
  return (
    <section
      id="story"
      className="relative overflow-hidden bg-gradient-to-br from-[#0f2b1d] via-[#082f21] to-[#041d15] py-24 text-emerald-50 sm:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_55%)]" />
      <div className="absolute inset-y-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-emerald-200">
              What is SahayakAI?
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-[2.9rem]">
                The co-pilot that turns reactive firefighting into proactive
                growth.
              </h2>
              <p className="text-base leading-7 text-emerald-100/90">
                SahayakAI is an AI-powered co-pilot designed to help Indian
                MSMEs move from reactive firefighting to proactive growth. It
                transforms daily business data into a predictive Trust
                Score—your new digital collateral. By forecasting risks,
                prescribing solutions, and translating your performance into
                investor confidence, we keep your business steady and
                investment-ready.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-3xl border border-emerald-400/30 bg-white/5 p-6 backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-emerald-200">
                  Our intention
                </p>
                <p className="mt-3 text-sm leading-6 text-emerald-100/90">
                  Help founders see what is coming, not just what has happened.
                  Every alert, insight, and plan is tuned to Indian realities so
                  you can make confident decisions faster.
                </p>
                <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-emerald-300">
                  See the growth blueprint
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
              <div className="space-y-4 rounded-3xl border border-emerald-400/20 bg-white/5 p-6">
                {proofPoints.map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-3 text-sm text-emerald-100/85"
                  >
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-emerald-300/40 bg-emerald-300/20 text-[10px] font-semibold text-emerald-200">
                      •
                    </span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6 rounded-[2.75rem] border border-emerald-400/20 bg-white/5 p-8 shadow-[0_35px_120px_-45px_rgba(16,185,129,0.6)] backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-200/90">
              Why it matters
            </p>
            <div className="grid gap-6">
              {pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="group flex items-start gap-4 rounded-3xl border border-emerald-400/10 bg-white/5 p-5 transition hover:border-emerald-300/40 hover:bg-emerald-300/10"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-200 shadow-inner shadow-emerald-500/5">
                    <pillar.icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base font-semibold text-white">
                      {pillar.title}
                    </h3>
                    <p className="text-sm leading-6 text-emerald-100/80">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-3xl border border-emerald-400/10 bg-emerald-500/10 p-6 text-sm text-emerald-100/85">
              SahayakAI synthesises operational data, compliance milestones, and
              market signals into one living Trust Score. It is the bridge
              between your everyday hustle and the capital partners who want
              verifiable proof of resilience.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
