"use client";

import { BrainCircuit, FileSpreadsheet, Lightbulb } from "lucide-react";

const steps = [
  {
    title: "Input your numbers",
    description:
      "Enter monthly revenue, expenses, and cash on hand or upload a CSV from your accounting tool.",
    icon: FileSpreadsheet,
  },
  {
    title: "Let the AI run diagnostics",
    description:
      "SahayakAI benchmarks your metrics against industry peers and learns from your historical performance.",
    icon: BrainCircuit,
  },
  {
    title: "Get a forward-looking plan",
    description:
      "Receive a risk score, projected issues, and a checklist of actions tailored to Indian MSME realities.",
    icon: Lightbulb,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-gradient-to-b from-[#e6f2ea] via-white to-[#f3f7f3] py-20 sm:py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-600">
            How it works
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Three clear steps from data entry to decisions
          </h2>
          <p className="mt-4 text-base text-slate-600">
            You don't need a finance team. SahayakAI gives you clarity within
            minutes of signing up.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative flex h-full flex-col gap-4 rounded-3xl border border-emerald-100 bg-white/90 p-6 shadow-lg shadow-emerald-500/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <step.icon className="h-5 w-5" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-500">
                  Step {index + 1}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="text-sm leading-6 text-slate-600">
                {step.description}
              </p>
              <div className="absolute inset-x-6 bottom-6 h-px bg-gradient-to-r from-transparent via-emerald-200/70 to-transparent" />
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-slate-600">
          <p className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Setup takes less than 5 minutes
          </p>
          <p className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-teal-500" />
            Predictions look 30 days ahead
          </p>
          <p className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-lime-500" />
            Advisor available 24/7
          </p>
        </div>
      </div>
    </section>
  );
}
